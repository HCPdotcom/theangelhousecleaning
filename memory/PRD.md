# The Angel House Cleaning — PRD

## Product
Conversion-optimized marketing + lead site for a Dallas / North Dallas cleaning company (Commercial + Residential, commercial-lead positioning). Brand: green `#66CC33`, navy `#191970`. HQ: 5465 Legacy Drive Suite 650, Plano, TX 75024. Inquiries → `theangelhc@gmail.com`.

## Pages
Home · Commercial · Residential · About · Client Feedback (`/feedback`) · Contact · Admin login (`/admin/login`, unlinked) · Admin Contacts (`/admin/contacts`, unlinked) · Admin Reviews (`/admin/reviews`, unlinked)

## Implemented
- **Public site**: 5 pages, Dallas / North Dallas positioning (no DFW/Fort Worth/Metroplex references anywhere), Woman-Owned / Minority-Owned / Insured badges, Capability Statement download.
- **Homepage H1**: *"Your Trusted Commercial & Residential Cleaning Partner Across Dallas & North Dallas"*.
- **Commercial page**: facility-level tone — *"Comprehensive Facility Services"* / *"Your Facility Deserves Professional Care"* / *"Consistent Service, In Writing"* / *"Zero Operational Disruption"* / *"customized cleaning plans"* / *"operations"*.
- **Contact form** (`POST /api/contact`): persisted to Mongo `contacts`; supports Commercial/Residential/Partner, businessName, squareFootage, propertyType (incl. Educational, Government/Municipal).
- **Review funnel**: `/feedback` picker → `/feedback?type=...` pre-tagged form with subtle `Residential Feedback` / `Commercial Feedback` label → rating routing (4-5★ + consent → Google review CTA; 1-3★ → follow-up tone); moderation-gated `/api/reviews/public` (PII stripped).
- **Admin system**: single-admin JWT (12h TTL, 5-attempt/IP lockout), Contacts dashboard with Generate Review Invite modal (Copy Link / Text / Email subject / Email body), Reviews moderation (Approve / Reject / Follow-up / Reopen, filter pills).
- **Footer CTA**: "Leave a Review" link → `/feedback`.
- **Contact page CTA**: "Share Your Experience" + per-type quick buttons → `/feedback?type=...`.
- **Email scaffolds**: contact + review notifications queued for `theangelhc@gmail.com` (disabled until `RESEND_API_KEY` added — flips on automatically).

## Credentials
`theangelhc@gmail.com` / `VaultRiver!CleanOps47` — see `/app/memory/test_credentials.md`.

## Integrations
- MongoDB — live.
- Resend — scaffolded, pending API key.

## Backlog (P0 → P2)
- **P0** — Paste `RESEND_API_KEY` in `/app/backend/.env` to activate notifications.
- **P1** — Replace `/capability-statement.txt` placeholder with final branded PDF at `/capability-statement.pdf`.
- **P1** — Set `REACT_APP_GOOGLE_REVIEW_URL` once Google Business Profile is verified (placeholder note auto-hides).
- **P2** — Dedicated `/government` landing page (NAICS/UEI/CAGE capture) for public-sector leads.
- **P2** — Admin CSV export of contacts or filtered reviews, follow-up-flag filter.
- **P2** — SEO: per-page meta, sitemap, analytics.

## QA Status (pre-publish)
- `iteration_2.json`: 26/26 backend pytest · 100% frontend flows · zero critical / minor / UI / integration issues.
- Database clean (zero real records at publish time).
- Testing suite at `/app/backend/tests/test_reviews_admin.py`.

## Key Files
- `/app/backend/server.py`, `/app/backend/auth.py`, `/app/backend/services/email_service.py`.
- `/app/frontend/src/pages/HomePage.jsx`, `CommercialPage.jsx`, `ResidentialPage.jsx`, `AboutPage.jsx`, `ContactPage.jsx`, `ReviewsPage.jsx`, `AdminLoginPage.jsx`, `AdminContactsPage.jsx`, `AdminReviewsPage.jsx`.
- `/app/frontend/src/data/mock.js` (nav links, serviceArea, testimonials).
- `/app/frontend/public/capability-statement.txt` (placeholder).
- `/app/memory/test_credentials.md` — current admin credentials.
- `/app/contracts.md` — API contract doc.
