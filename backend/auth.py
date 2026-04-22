"""
Single-admin JWT authentication.

Credentials come from .env (ADMIN_EMAIL / ADMIN_PASSWORD). There is no users
collection — we compare the submitted password against the env value using
bcrypt and issue a short-lived JWT on success.

Brute-force protection: 5 failed login attempts from the same IP lock it out
for 15 minutes (in-process, process-local, sufficient for a single small site).
"""

from __future__ import annotations

import os
import time
from datetime import datetime, timedelta, timezone
from typing import Dict

import bcrypt
import jwt
from fastapi import HTTPException, Request

JWT_ALGORITHM = "HS256"
TOKEN_TTL_HOURS = 12
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_SECONDS = 15 * 60

# ip -> [first_attempt_ts, failed_count]
_failed_attempts: Dict[str, list] = {}
# cached bcrypt hash of the current ADMIN_PASSWORD (recomputed if env changes)
_password_cache: Dict[str, str] = {"plain": "", "hash": ""}


def _secret() -> str:
    secret = os.environ.get("ADMIN_JWT_SECRET", "").strip()
    if not secret:
        raise HTTPException(status_code=500, detail="Admin auth is not configured.")
    return secret


def _get_admin_password_hash() -> str:
    """Hash the current env password once and reuse it."""
    plain = os.environ.get("ADMIN_PASSWORD", "").strip()
    if not plain:
        raise HTTPException(status_code=500, detail="Admin password is not configured.")
    if _password_cache["plain"] != plain:
        _password_cache["plain"] = plain
        _password_cache["hash"] = bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    return _password_cache["hash"]


def _client_ip(request: Request) -> str:
    return (request.headers.get("x-forwarded-for") or request.client.host or "unknown").split(",")[0].strip()


def _check_lockout(ip: str) -> None:
    entry = _failed_attempts.get(ip)
    if not entry:
        return
    first_ts, count = entry
    if count >= MAX_FAILED_ATTEMPTS and (time.time() - first_ts) < LOCKOUT_SECONDS:
        remaining = int(LOCKOUT_SECONDS - (time.time() - first_ts))
        raise HTTPException(
            status_code=429,
            detail=f"Too many failed attempts. Try again in {remaining // 60} minute(s).",
        )
    if (time.time() - first_ts) >= LOCKOUT_SECONDS:
        _failed_attempts.pop(ip, None)


def _record_failure(ip: str) -> None:
    entry = _failed_attempts.get(ip)
    if not entry:
        _failed_attempts[ip] = [time.time(), 1]
    else:
        entry[1] += 1


def _clear_failures(ip: str) -> None:
    _failed_attempts.pop(ip, None)


def verify_admin_credentials(email: str, password: str, request: Request) -> None:
    """Raise HTTPException if credentials are bad or caller is locked out."""
    ip = _client_ip(request)
    _check_lockout(ip)

    expected_email = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    if not email or email.strip().lower() != expected_email:
        _record_failure(ip)
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if not bcrypt.checkpw(password.encode("utf-8"), _get_admin_password_hash().encode("utf-8")):
        _record_failure(ip)
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    _clear_failures(ip)


def create_admin_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_TTL_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, _secret(), algorithm=JWT_ALGORITHM)


async def require_admin(request: Request) -> dict:
    """FastAPI dependency: validates Authorization: Bearer <token>."""
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated.")
    token = auth_header[7:].strip()
    try:
        payload = jwt.decode(token, _secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please sign in again.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid session token.")
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden.")
    return {"email": payload.get("sub")}
