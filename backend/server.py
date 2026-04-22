from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ReturnDocument
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from services.email_service import send_contact_notification, send_review_notification
from auth import verify_admin_credentials, create_admin_token, require_admin


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
    businessName: Optional[str] = ""
    propertyType: Optional[str] = ""
    squareFootage: Optional[str] = ""
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
    businessName: Optional[str] = ""
    propertyType: Optional[str] = ""
    squareFootage: Optional[str] = ""
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
        "businessName": (payload.businessName or "").strip(),
        "propertyType": (payload.propertyType or "").strip(),
        "squareFootage": (payload.squareFootage or "").strip(),
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
async def list_contacts(limit: int = 100, current=Depends(require_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("createdAt", -1).to_list(limit)
    for item in items:
        if isinstance(item.get("createdAt"), str):
            item["createdAt"] = datetime.fromisoformat(item["createdAt"])
    return items


@api_router.get("/admin/contacts", response_model=List[Contact])
async def list_admin_contacts(limit: int = 500, current=Depends(require_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("createdAt", -1).to_list(limit)
    for item in items:
        if isinstance(item.get("createdAt"), str):
            item["createdAt"] = datetime.fromisoformat(item["createdAt"])
    return items


# ---------------------------------------------------------------------------
# Reviews — public submission + admin moderation
# ---------------------------------------------------------------------------

ALLOWED_STATUSES = {"pending", "approved", "rejected"}


class ReviewCreate(BaseModel):
    firstName: str = Field(min_length=1, max_length=60)
    lastInitialOrCompany: str = Field(min_length=1, max_length=80)
    phone: str = Field(min_length=5, max_length=40)
    email: EmailStr
    serviceType: str = Field(pattern="^(commercial|residential)$")
    rating: int = Field(ge=1, le=5)
    text: str = Field(min_length=10, max_length=2000)
    consentPublish: bool = False
    consentContact: bool = False


class ReviewPublic(BaseModel):
    """Privacy-stripped review for the public testimonials grid."""
    id: str
    firstName: str
    lastInitialOrCompany: str
    serviceType: str
    rating: int
    text: str
    createdAt: datetime


class ReviewAdmin(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    firstName: str
    lastInitialOrCompany: str
    phone: str
    email: EmailStr
    serviceType: str
    rating: int
    text: str
    consentPublish: bool
    consentContact: bool
    status: str
    followUp: bool
    emailSent: bool = False
    createdAt: datetime
    reviewedAt: Optional[datetime] = None


class ReviewModerate(BaseModel):
    status: Optional[str] = None  # approved | rejected | pending
    followUp: Optional[bool] = None


class ReviewSubmitResponse(BaseModel):
    id: str
    rating: int
    routing: str  # "promote" | "followup"
    message: str


@api_router.post("/reviews", response_model=ReviewSubmitResponse, status_code=201)
async def create_review(payload: ReviewCreate):
    now = datetime.now(timezone.utc)
    needs_follow_up = payload.rating <= 3
    doc = {
        "id": str(uuid.uuid4()),
        "firstName": payload.firstName.strip(),
        "lastInitialOrCompany": payload.lastInitialOrCompany.strip(),
        "phone": payload.phone.strip(),
        "email": payload.email.lower().strip(),
        "serviceType": payload.serviceType,
        "rating": payload.rating,
        "text": payload.text.strip(),
        "consentPublish": payload.consentPublish,
        "consentContact": payload.consentContact,
        "status": "pending",
        "followUp": needs_follow_up,
        "emailSent": False,
        "createdAt": now.isoformat(),
        "reviewedAt": None,
    }

    try:
        await db.reviews.insert_one(doc)
    except Exception as exc:
        logger.exception("Failed to persist review: %s", exc)
        raise HTTPException(status_code=500, detail="We couldn't save your review. Please try again.")

    email_ok = await send_review_notification(doc)
    if email_ok:
        try:
            await db.reviews.update_one({"id": doc["id"]}, {"$set": {"emailSent": True}})
        except Exception as exc:  # noqa: BLE001
            logger.warning("Could not flag emailSent for review %s: %s", doc["id"], exc)

    logger.info(
        "New review %s rating=%s status=pending followUp=%s", doc["id"], doc["rating"], doc["followUp"]
    )

    if payload.rating >= 4 and payload.consentPublish:
        routing = "promote"
        message = "Thank you for your kind words! Would you share them on Google too?"
    elif payload.rating >= 4:
        routing = "thanks"
        message = "Thank you for sharing your experience with us."
    else:
        routing = "followup"
        message = "Thank you for the honest feedback. A team member will reach out personally."

    return ReviewSubmitResponse(id=doc["id"], rating=payload.rating, routing=routing, message=message)


@api_router.get("/reviews/public", response_model=List[ReviewPublic])
async def list_public_reviews(limit: int = 30):
    """Approved, publish-consented reviews only. No phone/email exposed."""
    cursor = db.reviews.find(
        {"status": "approved", "consentPublish": True},
        {"_id": 0, "phone": 0, "email": 0, "consentContact": 0, "followUp": 0, "emailSent": 0, "reviewedAt": 0},
    ).sort("createdAt", -1)
    items = await cursor.to_list(limit)
    for item in items:
        if isinstance(item.get("createdAt"), str):
            item["createdAt"] = datetime.fromisoformat(item["createdAt"])
    return items


# ---------- Admin: login + moderation ----------


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminLoginResponse(BaseModel):
    token: str
    email: EmailStr
    expiresInHours: int = 12


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(payload: AdminLogin, request: Request):
    verify_admin_credentials(payload.email, payload.password, request)
    token = create_admin_token(payload.email.lower().strip())
    return AdminLoginResponse(token=token, email=payload.email.lower().strip())


@api_router.get("/admin/me")
async def admin_me(current=Depends(require_admin)):
    return current


@api_router.get("/admin/reviews", response_model=List[ReviewAdmin])
async def list_all_reviews(
    status: Optional[str] = None,
    limit: int = 200,
    current=Depends(require_admin),
):
    query = {}
    if status and status in ALLOWED_STATUSES:
        query["status"] = status
    cursor = db.reviews.find(query, {"_id": 0}).sort("createdAt", -1)
    items = await cursor.to_list(limit)
    for item in items:
        for key in ("createdAt", "reviewedAt"):
            if isinstance(item.get(key), str):
                item[key] = datetime.fromisoformat(item[key])
    return items


@api_router.patch("/admin/reviews/{review_id}", response_model=ReviewAdmin)
async def moderate_review(
    review_id: str,
    payload: ReviewModerate,
    current=Depends(require_admin),
):
    update: dict = {}
    if payload.status is not None:
        if payload.status not in ALLOWED_STATUSES:
            raise HTTPException(status_code=422, detail=f"Invalid status. Allowed: {sorted(ALLOWED_STATUSES)}")
        update["status"] = payload.status
        update["reviewedAt"] = datetime.now(timezone.utc).isoformat()
    if payload.followUp is not None:
        update["followUp"] = bool(payload.followUp)
    if not update:
        raise HTTPException(status_code=422, detail="Nothing to update.")

    result = await db.reviews.find_one_and_update(
        {"id": review_id},
        {"$set": update},
        projection={"_id": 0},
        return_document=ReturnDocument.AFTER,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Review not found.")
    for key in ("createdAt", "reviewedAt"):
        if isinstance(result.get(key), str):
            result[key] = datetime.fromisoformat(result[key])
    logger.info("Review %s moderated by %s: %s", review_id, current["email"], update)
    return result


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