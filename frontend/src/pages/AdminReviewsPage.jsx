import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, CheckCircle2, XCircle, Flag, LogOut, Filter, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { ADMIN_TOKEN_KEY } from './AdminLoginPage';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_STYLES = {
  pending: 'bg-[#191970] text-white border border-[#66CC33]/30',
  approved: 'bg-[#66CC33] text-[#0a0a1a]',
  rejected: 'bg-red-900/40 text-red-200 border border-red-500/30',
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
};

const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? 'fill-[#66CC33] text-[#66CC33]' : 'text-[#a0a0b0]/40'} />
    ))}
  </div>
);

const AdminReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem(ADMIN_TOKEN_KEY) : null;

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }),
    [token]
  );

  const handleUnauth = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    toast.error('Session expired. Please sign in again.');
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter === 'all' ? {} : { status: filter };
      const { data } = await axios.get(`${API_BASE}/admin/reviews`, { params, headers: authHeaders() });
      setReviews(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        handleUnauth();
        return;
      }
      toast.error('Could not load reviews.');
    } finally {
      setLoading(false);
    }
  }, [authHeaders, filter, handleUnauth]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    fetchReviews();
  }, [token, navigate, fetchReviews]);

  const patchReview = async (id, body, label) => {
    setBusyId(id);
    try {
      await axios.patch(`${API_BASE}/admin/reviews/${id}`, body, { headers: authHeaders() });
      toast.success(label);
      fetchReviews();
    } catch (err) {
      if (err?.response?.status === 401) return handleUnauth();
      toast.error('Update failed.');
    } finally {
      setBusyId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    navigate('/admin/login', { replace: true });
  };

  const counts = reviews.reduce(
    (acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1, all: (acc.all || 0) + 1 }),
    { all: 0, pending: 0, approved: 0, rejected: 0 }
  );

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-24 px-6" data-testid="admin-reviews-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Review Moderation</h1>
            <p className="text-[#a0a0b0] text-sm mt-1">Approve, reject, or flag for follow-up.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchReviews} className="btn-secondary py-2 px-4 text-sm" data-testid="admin-refresh-btn">
              <RefreshCw size={16} /> Refresh
            </button>
            <button onClick={logout} className="btn-secondary py-2 px-4 text-sm" data-testid="admin-logout-btn">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap mb-6" data-testid="admin-filter-bar">
          <Filter size={16} className="text-[#66CC33]" />
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-[#66CC33] text-[#0a0a1a]'
                  : 'bg-[#191970] text-white hover:bg-[#191970]/80 border border-[#66CC33]/20'
              }`}
              data-testid={`admin-filter-${f}`}
            >
              {f} {f !== 'all' && counts[f] ? `(${counts[f]})` : f === 'all' ? `(${counts.all})` : ''}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center gap-2 text-[#a0a0b0]"><Loader2 className="animate-spin" size={18} /> Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="card-dark p-10 text-center text-[#a0a0b0]">No reviews in this view.</div>
        ) : (
          <div className="space-y-4" data-testid="admin-review-list">
            {reviews.map((r) => (
              <article key={r.id} className="card-dark p-6" data-testid={`admin-review-${r.id}`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <StarRow rating={r.rating} />
                      <span className="text-white/70 text-xs">{r.rating}/5</span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_STYLES[r.status] || ''}`}
                        data-testid={`review-status-${r.id}`}
                      >
                        {r.status}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#12122a] text-[#66CC33] border border-[#66CC33]/20 capitalize">
                        {r.serviceType}
                      </span>
                      {r.followUp && (
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 border border-amber-500/30 flex items-center gap-1">
                          <Flag size={12} /> Follow-up
                        </span>
                      )}
                    </div>
                    <div className="text-white font-semibold text-lg">
                      {r.firstName} {r.lastInitialOrCompany}
                    </div>
                    <div className="text-[#a0a0b0] text-xs mt-1">
                      Submitted {fmtDate(r.createdAt)}
                      {r.reviewedAt ? ` · Reviewed ${fmtDate(r.reviewedAt)}` : ''}
                    </div>
                  </div>
                  <div className="text-right text-xs text-[#a0a0b0] leading-relaxed">
                    <div><span className="text-white/80">Email:</span> {r.email}</div>
                    <div><span className="text-white/80">Phone:</span> {r.phone}</div>
                    <div className="mt-1 flex gap-3 justify-end">
                      <span>{r.consentPublish ? '✓ may publish' : '✗ no publish'}</span>
                      <span>{r.consentContact ? '✓ may contact' : '—'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed whitespace-pre-wrap border-l-2 border-[#66CC33]/30 pl-4 italic">
                  "{r.text}"
                </p>

                {/* Moderation actions */}
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/5">
                  <button
                    onClick={() => patchReview(r.id, { status: 'approved' }, 'Approved — now public.')}
                    disabled={busyId === r.id || r.status === 'approved'}
                    className="btn-primary text-sm py-2 px-4 disabled:opacity-40"
                    data-testid={`admin-approve-${r.id}`}
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button
                    onClick={() => patchReview(r.id, { status: 'rejected' }, 'Rejected.')}
                    disabled={busyId === r.id || r.status === 'rejected'}
                    className="btn-secondary text-sm py-2 px-4 disabled:opacity-40"
                    data-testid={`admin-reject-${r.id}`}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button
                    onClick={() => patchReview(r.id, { followUp: !r.followUp }, r.followUp ? 'Follow-up cleared.' : 'Marked for follow-up.')}
                    disabled={busyId === r.id}
                    className={`text-sm py-2 px-4 rounded-full border transition-colors ${
                      r.followUp
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-200 hover:bg-amber-500/30'
                        : 'bg-transparent border-[#66CC33]/30 text-white hover:border-[#66CC33]'
                    }`}
                    data-testid={`admin-followup-${r.id}`}
                  >
                    <Flag size={16} className="inline mr-1.5" />
                    {r.followUp ? 'Clear Follow-up' : 'Mark Follow-up'}
                  </button>
                  {r.status !== 'pending' && (
                    <button
                      onClick={() => patchReview(r.id, { status: 'pending' }, 'Moved back to pending.')}
                      disabled={busyId === r.id}
                      className="text-sm py-2 px-4 rounded-full border border-white/20 text-white hover:border-white/40 transition-colors"
                      data-testid={`admin-reopen-${r.id}`}
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
