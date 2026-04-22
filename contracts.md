# The Angel House Cleaning — API Contracts

## Overview
This document defines the contract between the React frontend and FastAPI backend for the contact/quote submission flow.

---

## 1. Contact Form Submission

### Endpoint
`POST /api/contact`

### Purpose
Accept lead submissions (both residential, commercial, and partner inquiries) from the public contact page. Persist the submission in MongoDB and, once Resend is configured, email a notification to `theangelhc@gmail.com`.

### Request Body (JSON)
| Field              | Type    | Required                                           | Notes |
|--------------------|---------|----------------------------------------------------|-------|
| `name`             | string  | Yes                                                | Full name of contact. |
| `email`            | string  | Yes                                                | Must be a valid email. |
| `phone`            | string  | Yes                                                | Free-form phone number. |
| `serviceType`      | string  | Yes                                                | `commercial` \| `residential`. |
| `propertyType`     | string  | No                                                 | Depends on `serviceType` (e.g. `office`, `medical`, `house`, `apartment`). |
| `frequency`        | string  | No                                                 | `one-time` \| `weekly` \| `bi-weekly` \| `monthly` \| `custom`. |
| `message`          | string  | Required only when `isPartnerInquiry` is `true`    | Details about the inquiry. |
| `isPartnerInquiry` | boolean | No (defaults to `false`)                           | `true` when a cleaning company is applying to partner. |

### Success Response — `201 Created`
```json
{
  "id": "f4a…uuid",
  "status": "received",
  "message": "Thank you! We will contact you shortly."
}
```

### Error Responses
- `422 Unprocessable Entity` — validation errors from Pydantic.
- `500 Internal Server Error` — database or email failures.

---

## 2. MongoDB Schema — `contacts`
Collection: `contacts`

```json
{
  "id": "uuid4-string",            // primary key (string, we do NOT expose _id)
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(972) 555-1234",
  "serviceType": "commercial",
  "propertyType": "office",
  "frequency": "weekly",
  "message": "Need weekly office cleaning...",
  "isPartnerInquiry": false,
  "emailSent": false,              // set to true once Resend is integrated and succeeds
  "createdAt": "2026-02-18T14:23:11.912Z"  // ISO string
}
```

All reads must exclude `_id` from the projection.

---

## 3. Frontend Integration

**File:** `/app/frontend/src/pages/ContactPage.jsx`

- Remove the mocked `setTimeout` submit.
- Call `POST ${REACT_APP_BACKEND_URL}/api/contact` with the form payload.
- On success (2xx): clear form, show a success toast "Thank you! We'll be in touch within 24 hours."
- On failure: show error toast with a user-friendly message; keep form data intact for retry.

---

## 4. Environment Variables

### Current (already configured)
- `MONGO_URL` — MongoDB connection string.
- `DB_NAME` — database name.
- `REACT_APP_BACKEND_URL` — public backend URL used by the React app.

### Future (when Resend is added)
- `RESEND_API_KEY` — Resend API key (`re_...`). **Pending from user.**
- `RESEND_FROM_EMAIL` — verified sender, e.g. `quotes@theangelhousecleaning.com` (or `onboarding@resend.dev` for testing).
- `CONTACT_NOTIFICATION_EMAIL` — destination address (default `theangelhc@gmail.com`).

### How to Add Resend Later
1. Sign up at https://resend.com and verify the `theangelhousecleaning.com` domain.
2. Create an API key, set `RESEND_API_KEY` in `/app/backend/.env`.
3. Install the SDK: `pip install resend` and add to `requirements.txt`.
4. In the `/api/contact` handler, after the MongoDB insert, call `resend.Emails.send(...)` with an HTML template that contains the submission details, then set `emailSent: true` on the stored document.
5. Wrap the email call in a try/except — a Resend failure should still return 201 to the user (lead is saved), but logged server-side for follow-up.

---

## 5. Data Not Mocked After This Change
- Contact form submissions go to MongoDB `contacts` collection.
- Email notification remains unmocked **and not yet implemented** — acknowledged limitation until Resend key is supplied.
