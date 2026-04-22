# Test Credentials — The Angel House Cleaning

## Admin (single-admin JWT auth)

| Field | Value |
|---|---|
| Login URL | `/admin/login` |
| Email | `admin@theangelhousecleaning.com` |
| Password | `ChangeMeAngel2026!` |

These are defined in `/app/backend/.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`).

> **Owner action required:** change `ADMIN_PASSWORD` in `/app/backend/.env` to a value only you know, then run `sudo supervisorctl restart backend`. The site hashes it fresh in-memory each start — no DB migration needed.

## Admin API Endpoints

- `POST /api/admin/login` — returns `{ token, email, expiresInHours }`
- `GET  /api/admin/me` — requires `Authorization: Bearer <token>`
- `GET  /api/admin/reviews?status=pending|approved|rejected` — list
- `PATCH /api/admin/reviews/{id}` — body `{ status?: "approved"|"rejected"|"pending", followUp?: boolean }`

## Public Review API

- `POST /api/reviews` — submit (no auth)
- `GET  /api/reviews/public` — approved + publish-consented only, PII stripped

Admin routes are intentionally NOT linked from the public nav.
