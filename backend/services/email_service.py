"""
Resend email notifications for The Angel House Cleaning.

Scaffolded and intentionally disabled-by-default:
  • If RESEND_API_KEY is missing or empty, send_contact_notification() is a no-op
    and returns False. The calling code should NOT fail — the lead is already
    saved in MongoDB.
  • Once the user pastes their key into /app/backend/.env and restarts the
    backend, emails start flowing automatically. No other code changes needed.

Env vars (see /app/backend/.env):
  RESEND_API_KEY              re_********************  (required to enable)
  SENDER_EMAIL                verified sender, e.g. quotes@theangelhousecleaning.com
                              or onboarding@resend.dev for testing
  CONTACT_NOTIFICATION_EMAIL  destination address (default: theangelhc@gmail.com)
"""

from __future__ import annotations

import asyncio
import logging
import os
from html import escape
from typing import Any, Mapping

import resend

logger = logging.getLogger(__name__)

DEFAULT_NOTIFICATION_EMAIL = "theangelhc@gmail.com"


def _is_enabled() -> bool:
    """Resend is enabled only when an API key is present."""
    key = (os.environ.get("RESEND_API_KEY") or "").strip()
    return bool(key) and key.lower() != "changeme"


def _build_html(submission: Mapping[str, Any]) -> str:
    kind = "Partner Inquiry" if submission.get("isPartnerInquiry") else "Quote Request"
    rows = [
        ("Name", submission.get("name", "")),
        ("Email", submission.get("email", "")),
        ("Phone", submission.get("phone", "")),
        ("Service Type", submission.get("serviceType", "")),
        ("Property Type", submission.get("propertyType", "") or "—"),
        ("Frequency", submission.get("frequency", "") or "—"),
        ("Partner Inquiry", "Yes" if submission.get("isPartnerInquiry") else "No"),
        ("Submitted At", submission.get("createdAt", "")),
    ]
    row_html = "".join(
        f"""<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#191970;font-weight:600;width:170px;">{escape(str(k))}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#222;">{escape(str(v))}</td>
            </tr>"""
        for k, v in rows
    )
    message = escape(str(submission.get("message") or "(no additional details)")).replace("\n", "<br/>")

    return f"""<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6fb;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(25,25,112,0.08);">
        <tr><td style="background:#191970;padding:20px 28px;">
          <div style="color:#66CC33;font-size:13px;letter-spacing:2px;text-transform:uppercase;">The Angel House Cleaning</div>
          <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:4px;">New {escape(kind)}</div>
        </td></tr>
        <tr><td style="padding:24px 28px;">
          <p style="margin:0 0 16px 0;color:#333;font-size:14px;">You have a new submission from the website contact form.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;">
            {row_html}
          </table>
          <div style="margin-top:20px;padding:14px 16px;background:#f7faf3;border-left:4px solid #66CC33;border-radius:6px;color:#222;font-size:14px;line-height:1.5;">
            <div style="font-weight:600;color:#191970;margin-bottom:6px;">Message</div>
            {message}
          </div>
        </td></tr>
        <tr><td style="padding:16px 28px 24px;color:#8a8aa0;font-size:12px;">
          Reply directly to this email to respond to the customer.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


async def send_contact_notification(submission: Mapping[str, Any]) -> bool:
    """Send a lead-notification email. Returns True on success, False otherwise.

    Never raises — callers treat the email step as best-effort.
    """
    if not _is_enabled():
        logger.info("Resend disabled (no RESEND_API_KEY set); skipping email for %s", submission.get("id"))
        return False

    resend.api_key = os.environ["RESEND_API_KEY"].strip()
    sender = (os.environ.get("SENDER_EMAIL") or "onboarding@resend.dev").strip()
    to_addr = (os.environ.get("CONTACT_NOTIFICATION_EMAIL") or DEFAULT_NOTIFICATION_EMAIL).strip()

    subject_prefix = "Partner Inquiry" if submission.get("isPartnerInquiry") else "New Quote Request"
    params = {
        "from": sender,
        "to": [to_addr],
        "reply_to": submission.get("email") or sender,
        "subject": f"[{subject_prefix}] {submission.get('name', 'Website lead')}",
        "html": _build_html(submission),
    }

    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Resend email sent for submission %s (id=%s)", submission.get("id"), (result or {}).get("id"))
        return True
    except Exception as exc:  # noqa: BLE001
        logger.exception("Resend email failed for submission %s: %s", submission.get("id"), exc)
        return False
