# The Angel House Cleaning — PRD

## Product
Conversion-optimized marketing + lead site for a DFW commercial cleaning company (residential secondary). Brand: green `#66CC33`, navy `#191970`. HQ: 5465 Legacy Drive Suite 650, Plano, TX 75024. Inquiries → `theangelhc@gmail.com`.

## Pages
Home · Commercial · Residential · About · Client Feedback (`/reviews`) · Contact · Admin login (`/admin/login`, unlinked) · Admin review moderation (`/admin/reviews`, unlinked)

## Implemented
- **Frontend:** 5 public pages with brand palette, partner CTA, Capability Statement download, Industries Served, Contract-Ready Operations, 3-step Process, North Dallas service-area coverage, Woman-Owned / Minority-Owned / Insured visual identifiers.
- **Contact form:** persisted to MongoDB `contacts`; Business Name + Square Footage for commercial; validation live.
- **Reviews system (Feb 2026):** public `/reviews` page (heading "Share Your Experience"), star-rating form with publish + contact consent; routing logic — 4-5★+publish ⇒ Google review CTA; 1-3★ ⇒ follow-up message + auto `followUp=true` flag; public testimonials grid shows only approved + consent-granted (PII stripped).
- **Admin system:** single-admin JWT (12h TTL, 5-attempt/IP brute-force lockout); moderation dashboard with approve / reject / mark-follow-up actions and status filters; admin routes deliberately absent from nav.
- **Email scaffolds:** `send_contact_notification` + `send_review_notification` — both disabled while `RESEND_API_KEY` empty; destination `theangelhc@gmail.com` from env.
- **Capability statement:** placeholder served at `/capability-statement.txt`, linked from Home + Commercial pages.

## Data Models
- `contacts`: id, name, email, phone, serviceType, businessName, propertyType, squareFootage, frequency, message, isPartnerInquiry, emailSent, createdAt.
- `reviews`: id, firstName, lastInitialOrCompany, phone, email, serviceType, rating, text, consentPublish, consentContact, status (`pending|approved|rejected`), followUp, emailSent, createdAt, reviewedAt.

## API
- `POST /api/contact`, `GET /api/contact` (internal).
- `POST /api/reviews` (public), `GET /api/reviews/public` (approved+consent, PII stripped).
- `POST /api/admin/login`, `GET /api/admin/me`, `GET /api/admin/reviews`, `PATCH /api/admin/reviews/{id}`.

## Integrations
- MongoDB (live).
- Resend — scaffolded, awaiting `RESEND_API_KEY`.

## Roadmap / Backlog
- **P0** — Paste `RESEND_API_KEY` in `.env` to activate both contact + review email notifications (no code changes needed).
- **P1** — Finalized Capability Statement PDF replaces the `.txt` placeholder at `/capability-statement.pdf` (update link in HomePage + CommercialPage).
- **P1** — Real Google Business Profile URL (env var `REACT_APP_GOOGLE_REVIEW_URL`) — currently uses search fallback inside `ReviewsPage.jsx`.
- **P2** — Optional: dedicated `/government` landing page with NAICS / UEI / CAGE fields for public-sector leads.
- **P2** — Admin-side filter for `followUp=true` flagged reviews; export CSV.
- **P2** — SEO: per-page meta, sitemap, analytics.

## Security / Ops Notes
- `ADMIN_PASSWORD` is a placeholder (`ChangeMeAngel2026!`); **owner must change** in `/app/backend/.env` and restart backend.
- Brute-force counter is in-process (resets on restart, single-worker). Fine for current scale.
- Public reviews endpoint projection explicitly excludes `phone`, `email`, `consentContact`, `followUp`, `emailSent`, `reviewedAt`, `_id`.

## Key Files
- `/app/backend/server.py` — all endpoints.
- `/app/backend/auth.py` — admin JWT + lockout.
- `/app/backend/services/email_service.py` — Resend scaffolds (disabled without key).
- `/app/backend/tests/test_reviews_admin.py` — 21-test regression suite (testing-agent-authored).
- `/app/frontend/src/pages/ReviewsPage.jsx`, `AdminLoginPage.jsx`, `AdminReviewsPage.jsx`.
- `/app/frontend/src/data/mock.js` — nav links (includes "Client Feedback").
- `/app/memory/test_credentials.md` — current admin credentials.
- `/app/contracts.md` — API contract doc.
