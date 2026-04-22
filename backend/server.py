from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from services.email_service import send_contact_notification


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ---------------------------------------------------------------------------
# Contact / Quote Request
# ---------------------------------------------------------------------------

class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    serviceType: str = Field(pattern="^(commercial|residential)$")
    propertyType: Optional[str] = ""
    frequency: Optional[str] = ""
    message: Optional[str] = ""
    isPartnerInquiry: bool = False


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    email: EmailStr
    phone: str
    serviceType: str
    propertyType: Optional[str] = ""
    frequency: Optional[str] = ""
    message: Optional[str] = ""
    isPartnerInquiry: bool = False
    emailSent: bool = False
    createdAt: datetime


class ContactResponse(BaseModel):
    id: str
    status: str
    message: str


@api_router.post("/contact", response_model=ContactResponse, status_code=201)
async def create_contact(payload: ContactCreate):
    # Partner inquiries must include a message describing their company.
    if payload.isPartnerInquiry and not (payload.message or "").strip():
        raise HTTPException(
            status_code=422,
            detail="Please tell us about your company in the message field.",
        )

    now = datetime.now(timezone.utc)
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "phone": payload.phone.strip(),
        "serviceType": payload.serviceType,
        "propertyType": (payload.propertyType or "").strip(),
        "frequency": (payload.frequency or "").strip(),
        "message": (payload.message or "").strip(),
        "isPartnerInquiry": payload.isPartnerInquiry,
        "emailSent": False,  # Flip to True once Resend integration is added.
        "createdAt": now.isoformat(),
    }

    try:
        await db.contacts.insert_one(doc)
    except Exception as exc:
        logger.exception("Failed to persist contact submission: %s", exc)
        raise HTTPException(
            status_code=500,
            detail="We couldn't save your request. Please try again or call us directly.",
        )

    # Best-effort email notification. Disabled automatically when RESEND_API_KEY
    # is empty; never blocks the user-facing response.
    email_ok = await send_contact_notification(doc)
    if email_ok:
        try:
            await db.contacts.update_one({"id": doc["id"]}, {"$set": {"emailSent": True}})
        except Exception as exc:  # noqa: BLE001
            logger.warning("Could not flag emailSent for %s: %s", doc["id"], exc)

    logger.info(
        "New contact submission %s (%s, partner=%s)",
        doc["id"], doc["serviceType"], doc["isPartnerInquiry"],
    )

    thank_you = (
        "Thanks for your interest in partnering — our team will reach out within 1-2 business days."
        if payload.isPartnerInquiry
        else "Thank you! A team member will follow up within 24 hours."
    )
    return ContactResponse(id=doc["id"], status="received", message=thank_you)


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts(limit: int = 100):
    items = await db.contacts.find({}, {"_id": 0}).sort("createdAt", -1).to_list(limit)
    for item in items:
        if isinstance(item.get("createdAt"), str):
            item["createdAt"] = datetime.fromisoformat(item["createdAt"])
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()