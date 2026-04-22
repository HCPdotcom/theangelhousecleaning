import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Star,
  Send,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Heart,
  ExternalLink,
  Phone,
  Building2,
  Home as HomeIcon,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { companyInfo } from '../data/mock';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

// --- Google Review CTA ---------------------------------------------------
// Shown only on 4-5 star submissions WITH publish consent (see backend
// routing === 'promote'). When you have the real review URL, set it once
// in /app/frontend/.env as REACT_APP_GOOGLE_REVIEW_URL and restart the
// frontend — no code change required. Until then the CTA falls back to a
// Google search for the business so the button still works.
const GOOGLE_REVIEW_URL =
  process.env.REACT_APP_GOOGLE_REVIEW_URL ||
  'https://www.google.com/search?q=The+Angel+House+Cleaning+Plano+reviews';
const GOOGLE_REVIEW_IS_PLACEHOLDER = !process.env.REACT_APP_GOOGLE_REVIEW_URL;

const emptyForm = {
  firstName: '',
  lastInitialOrCompany: '',
  phone: '',
  email: '',
  serviceType: 'commercial',
  rating: 0,
  text: '',
  consentPublish: false,
  consentContact: false
};

const StarPicker = ({ value, onChange, size = 32 }) => (
  <div className="flex items-center gap-2" data-testid="review-rating-picker" role="radiogroup" aria-label="Rating">
    {[1, 2, 3, 4, 5].map((n) => {
      const active = n <= value;
      return (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110 focus:outline-none"
          data-testid={`review-rating-${n}`}
        >
          <Star
            size={size}
            className={active ? 'fill-[#66CC33] text-[#66CC33]' : 'text-[#a0a0b0]'}
          />
        </button>
      );
    })}
  </div>
);

const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-[#66CC33] text-[#66CC33]' : 'text-[#a0a0b0]/40'}
      />
    ))}
  </div>
);

const ReviewsPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState(null); // { routing, message, rating }
  const [publicReviews, setPublicReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Read ?type= once on mount / when URL changes to pre-select service type
  // and swap the dynamic intro copy. Links used by the CTAs:
  //   /feedback?type=residential
  //   /feedback?type=commercial
  const typeParam = (new URLSearchParams(location.search).get('type') || '').toLowerCase();
  const initialType = typeParam === 'residential' || typeParam === 'commercial' ? typeParam : null;

  useEffect(() => {
    if (initialType) {
      setFormData((prev) => ({ ...prev, serviceType: initialType }));
    }
  }, [initialType]);

  const dynamicIntro =
    initialType === 'residential'
      ? 'How did we do in your home?'
      : initialType === 'commercial'
        ? 'How has our team supported your facility?'
        : "Your feedback helps us hold our team to a higher standard — and helps other Dallas and North Dallas businesses and homeowners choose with confidence.";

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_BASE}/reviews/public?limit=12`)
      .then(({ data }) => {
        if (mounted) setPublicReviews(data || []);
      })
      .catch(() => {
        if (mounted) setPublicReviews([]);
      })
      .finally(() => {
        if (mounted) setLoadingReviews(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.rating) {
      toast.error('Please choose a star rating.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${API_BASE}/reviews`, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });
      setSubmission(data);
      setFormData(emptyForm);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d) => d.msg).join(', ')
        : typeof detail === 'string'
          ? detail
          : 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSubmission = () => setSubmission(null);

  return (
    <div className="overflow-hidden" data-testid="reviews-page">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-[#0a0a1a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#191970] rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#66CC33]/20 border border-[#66CC33]/30 rounded-full px-4 py-2 mb-6">
              <MessageSquare size={16} className="text-[#66CC33]" />
              <span className="text-[#66CC33] text-sm font-medium" data-testid="reviews-type-label">
                {initialType === 'residential'
                  ? 'Residential Feedback'
                  : initialType === 'commercial'
                    ? 'Commercial Feedback'
                    : 'Client Feedback'}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Share Your <span className="text-[#66CC33]">Experience</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed" data-testid="reviews-intro-copy">
              {dynamicIntro}
            </p>
          </div>
        </div>
      </section>

      {/* Form / Picker / Thank-you state */}
      <section className="py-24 bg-[#12122a]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {submission ? (
            <ThankYou submission={submission} onReset={resetSubmission} />
          ) : !initialType ? (
            <ClientTypePicker />
          ) : (
            <div className="card-dark p-8 md:p-10" data-testid="review-form-card">
              <h2 className="font-display text-2xl font-bold text-white mb-2">Leave a Review</h2>
              <p className="text-[#a0a0b0] mb-8">We'll never publish your phone or email — and we only publish reviews you give us permission to share.</p>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="review-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">First Name *</label>
                    <input
                      type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                      className="input-dark w-full" placeholder="Sarah"
                      data-testid="review-first-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Last Initial or Company *</label>
                    <input
                      type="text" name="lastInitialOrCompany" value={formData.lastInitialOrCompany} onChange={handleChange} required
                      className="input-dark w-full" placeholder="M. or Acme Co."
                      data-testid="review-last-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Phone *</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      className="input-dark w-full" placeholder="(972) 555-1234"
                      data-testid="review-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="input-dark w-full" placeholder="you@example.com"
                      data-testid="review-email-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Service Type *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, serviceType: 'commercial' }))}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                        formData.serviceType === 'commercial'
                          ? 'bg-[#66CC33] border-[#66CC33] text-[#0a0a1a]'
                          : 'bg-transparent border-[#66CC33]/30 text-white hover:border-[#66CC33]'
                      }`}
                      data-testid="review-service-commercial-btn"
                    >
                      <Building2 size={18} /> Commercial
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, serviceType: 'residential' }))}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                        formData.serviceType === 'residential'
                          ? 'bg-[#66CC33] border-[#66CC33] text-[#0a0a1a]'
                          : 'bg-transparent border-[#66CC33]/30 text-white hover:border-[#66CC33]'
                      }`}
                      data-testid="review-service-residential-btn"
                    >
                      <HomeIcon size={18} /> Residential
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Your Rating *</label>
                  <StarPicker
                    value={formData.rating}
                    onChange={(n) => setFormData((p) => ({ ...p, rating: n }))}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Your Review *</label>
                  <textarea
                    name="text" value={formData.text} onChange={handleChange} required minLength={10} rows={5}
                    className="input-dark w-full resize-none" placeholder="Tell us how we did..."
                    data-testid="review-text-input"
                  />
                  <p className="text-[#a0a0b0] text-xs mt-1">10 characters minimum.</p>
                </div>

                <div className="space-y-3 border-t border-[#66CC33]/15 pt-6">
                  <label className="flex items-start gap-3 text-white cursor-pointer" data-testid="review-consent-publish">
                    <input
                      type="checkbox" name="consentPublish" checked={formData.consentPublish} onChange={handleChange}
                      className="mt-1 h-4 w-4 accent-[#66CC33] flex-shrink-0"
                      data-testid="review-consent-publish-input"
                    />
                    <span className="text-sm leading-relaxed">
                      I give The Angel House Cleaning permission to publish my review (first name + last initial or company only) on the website and in marketing materials.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-white cursor-pointer" data-testid="review-consent-contact">
                    <input
                      type="checkbox" name="consentContact" checked={formData.consentContact} onChange={handleChange}
                      className="mt-1 h-4 w-4 accent-[#66CC33] flex-shrink-0"
                      data-testid="review-consent-contact-input"
                    />
                    <span className="text-sm leading-relaxed">
                      (Optional) Please contact me if you have follow-up questions.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="review-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">Submitting…</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Review <Send size={20} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Public testimonials */}
      <section className="py-24 bg-[#0a0a1a]" data-testid="public-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#66CC33] font-semibold text-sm uppercase tracking-wider">What Clients Say</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">Recent Published Reviews</h2>
          </div>
          {loadingReviews ? (
            <p className="text-center text-[#a0a0b0]">Loading reviews…</p>
          ) : publicReviews.length === 0 ? (
            <div className="card-dark p-10 text-center max-w-xl mx-auto">
              <Sparkles className="mx-auto mb-4 text-[#66CC33]" size={32} />
              <p className="text-white/90">No published reviews yet — yours could be the first.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="public-reviews-grid">
              {publicReviews.map((r) => (
                <article key={r.id} className="card-dark p-8" data-testid={`public-review-${r.id}`}>
                  <StarRow rating={r.rating} />
                  <p className="text-white/90 mt-5 mb-6 leading-relaxed italic">"{r.text}"</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="text-white font-semibold">{r.firstName} {r.lastInitialOrCompany}</div>
                      <div className="text-[#66CC33] capitalize">{r.serviceType}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ThankYou = ({ submission, onReset }) => {
  const { routing, message, rating } = submission;
  const positive = routing === 'promote' || routing === 'thanks';
  return (
    <div className="card-dark p-10 md:p-12 text-center" data-testid="review-thank-you">
      <div className="w-16 h-16 rounded-full bg-[#66CC33]/15 flex items-center justify-center mx-auto mb-6">
        {positive ? <CheckCircle className="text-[#66CC33]" size={32} /> : <Heart className="text-[#66CC33]" size={32} />}
      </div>
      <h2 className="font-display text-3xl font-bold text-white mb-4">Thank you.</h2>
      <StarRow rating={rating} />
      <p className="text-[#a0a0b0] text-lg leading-relaxed mt-5 max-w-xl mx-auto">{message}</p>

      {routing === 'promote' && (
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-3 px-6"
            data-testid="leave-google-review-btn"
          >
            Leave a Google Review
            <ExternalLink size={18} />
          </a>
          <button onClick={onReset} className="btn-secondary py-3 px-6" data-testid="review-another-btn">
            Submit Another
          </button>
          {GOOGLE_REVIEW_IS_PLACEHOLDER && (
            <p className="text-[#a0a0b0] text-xs mt-4 w-full text-center" data-testid="google-review-placeholder-note">
              Google review link coming soon — this button currently routes to a Google search for our business.
            </p>
          )}
        </div>
      )}
      {routing === 'thanks' && (
        <div className="mt-8">
          <button onClick={onReset} className="btn-secondary py-3 px-6" data-testid="review-another-btn">
            Submit Another
          </button>
        </div>
      )}
      {routing === 'followup' && (
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${companyInfo.phone}`}
            className="btn-primary py-3 px-6"
            data-testid="thank-you-call-btn"
          >
            <Phone size={18} /> Call Us: {companyInfo.phone}
          </a>
          <Link to="/contact" className="btn-secondary py-3 px-6" data-testid="thank-you-contact-link">
            Contact Form
          </Link>
        </div>
      )}
    </div>
  );
};

const ClientTypePicker = () => (
  <div className="text-center" data-testid="client-type-picker">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
      Tell us about your experience
    </h2>
    <p className="text-[#a0a0b0] leading-relaxed max-w-xl mx-auto mb-10">
      A few quick questions help us route your feedback to the right team — residential and commercial flows are a little different. Pick whichever fits, and we'll take it from there.
    </p>

    <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
      <Link
        to="/feedback?type=residential"
        className="card-dark p-8 text-left hover:border-[#66CC33]/60 transition-all group"
        data-testid="client-type-residential-card"
      >
        <div className="w-14 h-14 rounded-xl bg-[#191970] flex items-center justify-center mb-5 group-hover:bg-[#66CC33] transition-colors">
          <HomeIcon className="text-[#66CC33] group-hover:text-[#0a0a1a] transition-colors" size={28} />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Residential Client</h3>
        <p className="text-[#a0a0b0] text-sm leading-relaxed mb-4">
          Share how we're doing in your home — recurring, deep, or move-in / move-out cleaning.
        </p>
        <span className="inline-flex items-center gap-2 text-[#66CC33] text-sm font-semibold group-hover:gap-3 transition-all">
          Continue <ArrowRight size={16} />
        </span>
      </Link>

      <Link
        to="/feedback?type=commercial"
        className="card-dark p-8 text-left hover:border-[#66CC33]/60 transition-all group"
        data-testid="client-type-commercial-card"
      >
        <div className="w-14 h-14 rounded-xl bg-[#191970] flex items-center justify-center mb-5 group-hover:bg-[#66CC33] transition-colors">
          <Building2 className="text-[#66CC33] group-hover:text-[#0a0a1a] transition-colors" size={28} />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Commercial Client</h3>
        <p className="text-[#a0a0b0] text-sm leading-relaxed mb-4">
          Tell us how our team has supported your facility — offices, medical, retail, or government.
        </p>
        <span className="inline-flex items-center gap-2 text-[#66CC33] text-sm font-semibold group-hover:gap-3 transition-all">
          Continue <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  </div>
);

export default ReviewsPage;
