import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Loader2, RefreshCw, LogOut, MessageSquare, Send, Copy, X,
  Building2, Home as HomeIcon, MailOpen, ClipboardList
} from 'lucide-react';
import { toast } from 'sonner';
import { ADMIN_TOKEN_KEY } from './AdminLoginPage';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fmtDate = (iso) => {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
};

const firstName = (fullName) => (fullName || '').trim().split(/\s+/)[0] || 'there';

const buildInvite = (contact) => {
  const first = firstName(contact.name);
  const type = contact.serviceType === 'residential' ? 'residential' : 'commercial';
  const link = `${window.location.origin}/feedback?type=${type}`;
  const text =
    `Hi ${first}, thank you again for choosing The Angel House Cleaning. We'd truly appreciate your feedback here: ${link}`;
  const emailSubject = "We'd Love Your Feedback";
  const emailBody =
    `Hi ${first},\n\n` +
    `Thank you again for choosing The Angel House Cleaning. We value your feedback and would appreciate it if you took a moment to share your experience here:\n\n` +
    `${link}\n\n` +
    `Thank you,\n` +
    `The Angel House Cleaning Team`;
  return { link, text, emailSubject, emailBody, type, first };
};

const AdminContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [inviteFor, setInviteFor] = useState(null); // contact currently being invited

  const token = typeof window !== 'undefined' ? localStorage.getItem(ADMIN_TOKEN_KEY) : null;

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const handleUnauth = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    toast.error('Session expired. Please sign in again.');
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/admin/contacts`, { headers: authHeaders() });
      setContacts(data);
    } catch (err) {
      if (err?.response?.status === 401) return handleUnauth();
      toast.error('Could not load contacts.');
    } finally {
      setLoading(false);
    }
  }, [authHeaders, handleUnauth]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    fetchContacts();
  }, [token, navigate, fetchContacts]);

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    navigate('/admin/login', { replace: true });
  };

  const filtered = contacts.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'commercial') return c.serviceType === 'commercial';
    if (filter === 'residential') return c.serviceType === 'residential';
    if (filter === 'partner') return c.isPartnerInquiry;
    return true;
  });

  const counts = contacts.reduce(
    (acc, c) => ({
      all: acc.all + 1,
      commercial: acc.commercial + (c.serviceType === 'commercial' ? 1 : 0),
      residential: acc.residential + (c.serviceType === 'residential' ? 1 : 0),
      partner: acc.partner + (c.isPartnerInquiry ? 1 : 0),
    }),
    { all: 0, commercial: 0, residential: 0, partner: 0 }
  );

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-24 px-6" data-testid="admin-contacts-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Contacts</h1>
            <p className="text-[#a0a0b0] text-sm mt-1">Quote / walk-through requests and partner inquiries.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchContacts} className="btn-secondary py-2 px-4 text-sm" data-testid="admin-contacts-refresh-btn">
              <RefreshCw size={16} /> Refresh
            </button>
            <button onClick={logout} className="btn-secondary py-2 px-4 text-sm" data-testid="admin-contacts-logout-btn">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        {/* Admin cross-nav */}
        <div className="flex items-center gap-2 mb-6" data-testid="admin-nav">
          <Link to="/admin/contacts" className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#66CC33] text-[#0a0a1a]">
            <ClipboardList size={14} className="inline mr-1.5" /> Contacts
          </Link>
          <Link to="/admin/reviews" className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-[#191970] border border-[#66CC33]/20 hover:border-[#66CC33]/60 transition-colors">
            <MessageSquare size={14} className="inline mr-1.5" /> Reviews
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'commercial', label: 'Commercial' },
            { key: 'residential', label: 'Residential' },
            { key: 'partner', label: 'Partner Inquiries' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-[#66CC33] text-[#0a0a1a]'
                  : 'bg-[#191970] text-white border border-[#66CC33]/20 hover:border-[#66CC33]/60'
              }`}
              data-testid={`admin-contacts-filter-${f.key}`}
            >
              {f.label} ({counts[f.key]})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-[#a0a0b0]"><Loader2 className="animate-spin" size={18} /> Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="card-dark p-10 text-center text-[#a0a0b0]">No contacts in this view.</div>
        ) : (
          <div className="space-y-3" data-testid="admin-contacts-list">
            {filtered.map((c) => (
              <article
                key={c.id}
                className="card-dark p-5 flex flex-wrap items-start justify-between gap-4"
                data-testid={`admin-contact-${c.id}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-white font-semibold">{c.name}</span>
                    {c.businessName && (
                      <span className="text-[#66CC33] text-sm">· {c.businessName}</span>
                    )}
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#12122a] text-[#66CC33] border border-[#66CC33]/20 capitalize inline-flex items-center gap-1">
                      {c.serviceType === 'commercial' ? <Building2 size={12} /> : <HomeIcon size={12} />}
                      {c.serviceType}
                    </span>
                    {c.isPartnerInquiry && (
                      <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 border border-amber-500/30">
                        Partner
                      </span>
                    )}
                  </div>
                  <div className="text-[#a0a0b0] text-sm flex flex-wrap gap-x-4 gap-y-1">
                    <span><span className="text-white/70">Email:</span> {c.email}</span>
                    <span><span className="text-white/70">Phone:</span> {c.phone}</span>
                    {c.propertyType && <span><span className="text-white/70">Type:</span> {c.propertyType}</span>}
                    {c.squareFootage && <span><span className="text-white/70">Sq ft:</span> {c.squareFootage}</span>}
                    {c.frequency && <span><span className="text-white/70">Frequency:</span> {c.frequency}</span>}
                  </div>
                  {c.message && (
                    <p className="text-white/80 text-sm mt-2 italic border-l-2 border-[#66CC33]/30 pl-3">"{c.message}"</p>
                  )}
                  <div className="text-[#a0a0b0]/70 text-xs mt-2">Submitted {fmtDate(c.createdAt)}</div>
                </div>
                <button
                  onClick={() => setInviteFor(c)}
                  className="btn-primary text-sm py-2 px-4 flex-shrink-0"
                  data-testid={`generate-invite-${c.id}`}
                >
                  <Send size={14} /> Generate Review Invite
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {inviteFor && <InviteModal contact={inviteFor} onClose={() => setInviteFor(null)} />}
    </div>
  );
};

const CopyButton = ({ value, label, testid }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Copy failed — please select the text manually.');
    }
  };
  return (
    <button
      onClick={onCopy}
      className="btn-primary text-xs py-2 px-3 flex-shrink-0"
      data-testid={testid}
    >
      <Copy size={14} /> {copied ? 'Copied' : `Copy ${label}`}
    </button>
  );
};

const InviteModal = ({ contact, onClose }) => {
  const { link, text, emailSubject, emailBody, type, first } = buildInvite(contact);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      data-testid="invite-modal"
    >
      <div
        className="bg-[#12122a] border border-[#66CC33]/30 rounded-2xl w-full max-w-2xl shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h2 className="text-white font-display text-xl font-bold flex items-center gap-2">
              <MailOpen className="text-[#66CC33]" size={20} /> Review Invite
            </h2>
            <p className="text-[#a0a0b0] text-xs mt-1">
              Prefilled for <span className="text-white">{contact.name}</span> · <span className="capitalize">{type}</span> · First name: <span className="text-[#66CC33]">{first}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#a0a0b0] hover:text-white p-1"
            aria-label="Close"
            data-testid="invite-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Link */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white font-semibold text-sm">Review Link</label>
              <CopyButton value={link} label="Link" testid="copy-link-btn" />
            </div>
            <div className="input-dark text-sm text-[#66CC33] font-mono break-all px-3 py-2.5" data-testid="invite-link-value">
              {link}
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white font-semibold text-sm">Text Message</label>
              <CopyButton value={text} label="Text" testid="copy-text-btn" />
            </div>
            <textarea
              readOnly
              rows={3}
              value={text}
              className="input-dark w-full resize-none font-mono text-xs text-white"
              data-testid="invite-text-value"
            />
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white font-semibold text-sm">Email</label>
              <div className="flex gap-2">
                <CopyButton value={emailSubject} label="Subject" testid="copy-email-subject-btn" />
                <CopyButton value={emailBody} label="Body" testid="copy-email-body-btn" />
              </div>
            </div>
            <div className="text-xs text-[#a0a0b0] mb-1">Subject</div>
            <div className="input-dark text-sm text-white px-3 py-2 mb-3" data-testid="invite-email-subject-value">{emailSubject}</div>
            <div className="text-xs text-[#a0a0b0] mb-1">Body</div>
            <textarea
              readOnly
              rows={7}
              value={emailBody}
              className="input-dark w-full resize-none font-mono text-xs text-white"
              data-testid="invite-email-body-value"
            />
          </div>

          <div className="flex flex-wrap justify-between gap-3 pt-2 border-t border-white/5">
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
              className="btn-secondary text-sm py-2.5 px-4"
              data-testid="invite-open-mail-btn"
            >
              <MailOpen size={14} /> Open in Mail
            </a>
            <button onClick={onClose} className="btn-primary text-sm py-2.5 px-5" data-testid="invite-done-btn">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactsPage;
