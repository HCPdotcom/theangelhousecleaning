"""
End-to-end backend tests for the Angel House Cleaning review/admin system.
Covers: public review submission + routing, public listing PII-stripping,
admin login, admin listing/filtering/moderation, and regression on /api/contact.
"""
import os
import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else None
# Fallback: read from /app/frontend/.env
if not BASE_URL:
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().strip('"').rstrip('/')
                break

API = f"{BASE_URL}/api"

ADMIN_EMAIL = "theangelhc@gmail.com"
ADMIN_PASSWORD = "VaultRiver!CleanOps47"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(session):
    r = session.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data
    assert data.get("expiresInHours") == 12
    assert data.get("email") == ADMIN_EMAIL
    return data["token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


# --------------------------- Review submission ---------------------------

class TestReviewSubmission:
    def test_submit_5star_with_consent_routes_promote(self, session):
        payload = {
            "firstName": "TEST_Alice",
            "lastInitialOrCompany": "A.",
            "phone": "9725551234",
            "email": "test_alice@example.com",
            "serviceType": "residential",
            "rating": 5,
            "text": "Absolutely fantastic cleaning service, sparkled!",
            "consentPublish": True,
            "consentContact": False,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["routing"] == "promote"
        assert data["rating"] == 5
        assert "id" in data
        pytest.test_5star_consent_id = data["id"]

    def test_submit_4star_without_consent_routes_thanks(self, session):
        payload = {
            "firstName": "TEST_Bob",
            "lastInitialOrCompany": "B.",
            "phone": "9725552222",
            "email": "test_bob@example.com",
            "serviceType": "commercial",
            "rating": 4,
            "text": "Good job — minor miss on one baseboard.",
            "consentPublish": False,
            "consentContact": False,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 201, r.text
        assert r.json()["routing"] == "thanks"

    def test_submit_low_rating_routes_followup(self, session):
        payload = {
            "firstName": "TEST_Carol",
            "lastInitialOrCompany": "Acme Co.",
            "phone": "9725553333",
            "email": "test_carol@example.com",
            "serviceType": "commercial",
            "rating": 2,
            "text": "We expected a more thorough job, some areas missed.",
            "consentPublish": False,
            "consentContact": True,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["routing"] == "followup"
        pytest.test_lowstar_id = data["id"]

    def test_invalid_rating_rejected(self, session):
        payload = {
            "firstName": "TEST_X", "lastInitialOrCompany": "X.",
            "phone": "9725550000", "email": "test_x@example.com",
            "serviceType": "residential", "rating": 9,
            "text": "Rating is too high to accept.",
            "consentPublish": False, "consentContact": False,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 422

    def test_short_text_rejected(self, session):
        payload = {
            "firstName": "TEST_X", "lastInitialOrCompany": "X.",
            "phone": "9725550000", "email": "test_x@example.com",
            "serviceType": "residential", "rating": 5,
            "text": "short",
            "consentPublish": False, "consentContact": False,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 422

    def test_invalid_service_type_rejected(self, session):
        payload = {
            "firstName": "TEST_X", "lastInitialOrCompany": "X.",
            "phone": "9725550000", "email": "test_x@example.com",
            "serviceType": "industrial", "rating": 5,
            "text": "Nice enough experience today.",
            "consentPublish": False, "consentContact": False,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 422

    def test_bad_email_rejected(self, session):
        payload = {
            "firstName": "TEST_X", "lastInitialOrCompany": "X.",
            "phone": "9725550000", "email": "not-an-email",
            "serviceType": "residential", "rating": 5,
            "text": "This email is not valid.",
            "consentPublish": False, "consentContact": False,
        }
        r = session.post(f"{API}/reviews", json=payload)
        assert r.status_code == 422


# --------------------------- Admin auth ---------------------------

class TestAdminAuth:
    def test_wrong_password_401(self, session):
        r = session.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": "nope-wrong"})
        assert r.status_code == 401

    def test_unauthenticated_admin_reviews_401(self, session):
        r = session.get(f"{API}/admin/reviews")
        assert r.status_code == 401

    def test_admin_me_requires_token(self, session, auth_headers):
        r = session.get(f"{API}/admin/me", headers=auth_headers)
        assert r.status_code == 200
        assert r.json().get("email") == ADMIN_EMAIL


# --------------------------- Admin listing / filter / moderation ---------------------------

class TestAdminReviews:
    def test_list_all_reviews_includes_pii(self, session, auth_headers):
        r = session.get(f"{API}/admin/reviews", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) > 0
        # find our test review
        test_row = next((x for x in items if x.get("id") == getattr(pytest, "test_5star_consent_id", None)), None)
        assert test_row is not None, "5-star test review not found"
        for key in ("phone", "email", "consentContact", "followUp", "consentPublish", "status"):
            assert key in test_row

    def test_filter_pending(self, session, auth_headers):
        r = session.get(f"{API}/admin/reviews", headers=auth_headers, params={"status": "pending"})
        assert r.status_code == 200
        assert all(x["status"] == "pending" for x in r.json())

    def test_low_rating_auto_flagged_followup(self, session, auth_headers):
        r = session.get(f"{API}/admin/reviews", headers=auth_headers)
        low = next((x for x in r.json() if x["id"] == getattr(pytest, "test_lowstar_id", None)), None)
        assert low is not None
        assert low["followUp"] is True

    def test_approve_moves_to_approved_and_sets_reviewedAt(self, session, auth_headers):
        rid = pytest.test_5star_consent_id
        r = session.patch(f"{API}/admin/reviews/{rid}", headers=auth_headers, json={"status": "approved"})
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["status"] == "approved"
        assert body["reviewedAt"] is not None

    def test_invalid_status_422(self, session, auth_headers):
        rid = pytest.test_5star_consent_id
        r = session.patch(f"{API}/admin/reviews/{rid}", headers=auth_headers, json={"status": "garbage"})
        assert r.status_code == 422

    def test_followup_toggle(self, session, auth_headers):
        rid = pytest.test_lowstar_id
        r = session.patch(f"{API}/admin/reviews/{rid}", headers=auth_headers, json={"followUp": False})
        assert r.status_code == 200
        assert r.json()["followUp"] is False
        r2 = session.patch(f"{API}/admin/reviews/{rid}", headers=auth_headers, json={"followUp": True})
        assert r2.status_code == 200
        assert r2.json()["followUp"] is True

    def test_reject_review(self, session, auth_headers):
        rid = pytest.test_lowstar_id
        r = session.patch(f"{API}/admin/reviews/{rid}", headers=auth_headers, json={"status": "rejected"})
        assert r.status_code == 200
        assert r.json()["status"] == "rejected"

    def test_moderate_not_found_404(self, session, auth_headers):
        r = session.patch(f"{API}/admin/reviews/does-not-exist-id", headers=auth_headers, json={"status": "approved"})
        assert r.status_code == 404


# --------------------------- Public listing ---------------------------

class TestPublicReviews:
    def test_public_only_approved_consented_and_pii_stripped(self, session):
        r = session.get(f"{API}/reviews/public")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        approved_id = getattr(pytest, "test_5star_consent_id", None)
        if approved_id:
            assert any(x["id"] == approved_id for x in items), "Approved+consented review should be public"
        forbidden = {"phone", "email", "consentContact", "followUp", "consentPublish", "status"}
        for x in items:
            for k in forbidden:
                assert k not in x, f"Public review leaked field: {k}"


# --------------------------- Contact regression ---------------------------

class TestContactRegression:
    def test_contact_post(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "TEST_Contact Regression",
            "email": "test_contact@example.com",
            "phone": "9725550909",
            "serviceType": "commercial",
            "message": "Regression test for contact form.",
        })
        assert r.status_code == 201, r.text
        assert r.json().get("status") == "received"

    def test_contact_list(self, session, auth_headers):
        # GET /api/contact now requires admin per server.py
        r = session.get(f"{API}/contact", headers=auth_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_contact_expanded_payload_educational(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "TEST_Edu Contact",
            "email": "test_edu@example.com",
            "phone": "9725550111",
            "serviceType": "commercial",
            "businessName": "TEST Acme Schools",
            "propertyType": "educational",
            "squareFootage": "10000-25000",
            "frequency": "weekly",
            "message": "We need quarterly deep clean.",
        })
        assert r.status_code == 201, r.text
        assert r.json().get("status") == "received"

    def test_contact_expanded_payload_government(self, session):
        r = session.post(f"{API}/contact", json={
            "name": "TEST_Gov Contact",
            "email": "test_gov@example.com",
            "phone": "9725550222",
            "serviceType": "commercial",
            "businessName": "TEST Gov Office",
            "propertyType": "government",
            "squareFootage": "5000-10000",
            "frequency": "biweekly",
            "message": "Looking for vendor.",
        })
        assert r.status_code == 201, r.text

    def test_admin_contacts_endpoint(self, session, auth_headers):
        r = session.get(f"{API}/admin/contacts", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        # Should include our test contacts
        assert any("TEST_" in (c.get("name") or "") for c in items)

    def test_admin_contacts_requires_auth(self, session):
        r = session.get(f"{API}/admin/contacts")
        assert r.status_code == 401


# --------------------------- Capability Statement static file ---------------------------

class TestCapabilityStatement:
    def test_capability_statement_downloadable(self):
        # Static asset served by frontend, not via /api
        url = f"{BASE_URL}/capability-statement.txt"
        r = requests.get(url, timeout=10)
        assert r.status_code == 200, f"Expected 200 from {url}, got {r.status_code}"
        # Should be non-empty text
        assert len(r.text.strip()) > 50, "Capability statement appears empty"
