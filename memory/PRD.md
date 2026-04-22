# The Angel House Cleaning — PRD

## Product
5-page conversion-optimized website for a cleaning company serving the Dallas-Fort Worth (DFW) metroplex. Brand colors: green `#66CC33`, navy `#191970`. Company address: 5465 Legacy Drive Suite 650, Plano, TX 75024. Inquiries go to `theangelhc@gmail.com`.

Pages: Home, Commercial, Residential, About, Contact.

## Core Requirements
- Modern, responsive 5-page landing site (DONE)
- Brand-aligned visual design (DONE)
- Partner CTA to recruit other cleaning companies (DONE)
- Contact/Quote form capturing both commercial & residential leads (DONE — persisted in DB)
- Email notification of new submissions to `theangelhc@gmail.com` (PENDING — needs Resend API key)

## Implemented (2026-02-18)
- Frontend: 5 pages, Header/Footer/Layout, brand palette, hero image, address, partner CTA.
- Backend `POST /api/contact`: validates payload, persists to MongoDB `contacts` collection (UUID id, `createdAt` ISO string, `emailSent:false`).
- Backend `GET /api/contact`: lists submissions (excludes `_id`).
- Frontend `ContactPage.jsx`: submits via axios to `${REACT_APP_BACKEND_URL}/api/contact`, shows success/error toasts, clears form on success.
- API contract documented at `/app/contracts.md`.

## Roadmap / Backlog
- **P0** — Resend email integration: when user provides `RESEND_API_KEY`, send notification email to `theangelhc@gmail.com` after DB insert; set `emailSent:true`. Env vars planned: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFICATION_EMAIL`.
- **P1** — Admin view for submissions (protected).
- **P2** — Google Analytics / conversion tracking; sitemap + SEO metadata per page.
- **P2** — Testimonials CMS / dynamic content.

## Data Model — `contacts`
```
id (uuid str, pk)
name, email, phone (required)
serviceType ("commercial"|"residential")
propertyType, frequency (optional)
message (required only when isPartnerInquiry=true)
isPartnerInquiry (bool)
emailSent (bool, flips to true after Resend send)
createdAt (ISO str)
```

## Integrations
- MongoDB (existing env: `MONGO_URL`, `DB_NAME`).
- Resend — PENDING API key from user.

## Key Files
- `/app/backend/server.py` — contact endpoints.
- `/app/frontend/src/pages/ContactPage.jsx` — form + axios call.
- `/app/contracts.md` — API contract & Resend plan.
