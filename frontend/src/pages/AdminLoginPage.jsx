import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const ADMIN_TOKEN_KEY = 'angel_admin_token';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/admin/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      toast.success('Signed in.');
      navigate('/admin/reviews', { replace: true });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = typeof detail === 'string' ? detail : 'Sign in failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] px-6 py-24" data-testid="admin-login-page">
      <div className="max-w-md w-full card-dark p-10">
        <div className="w-14 h-14 rounded-xl bg-[#66CC33]/15 flex items-center justify-center mb-6">
          <Shield className="text-[#66CC33]" size={28} />
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-2">Admin Sign-In</h1>
        <p className="text-[#a0a0b0] mb-8 text-sm">Moderate review submissions for The Angel House Cleaning.</p>
        <form onSubmit={handleSubmit} className="space-y-5" data-testid="admin-login-form">
          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="input-dark w-full" placeholder="theangelhc@gmail.com"
              data-testid="admin-login-email-input"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="input-dark w-full" placeholder="••••••••"
              data-testid="admin-login-password-input"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="admin-login-submit-btn"
          >
            {loading ? 'Signing in…' : (<span className="flex items-center justify-center gap-2"><Lock size={18} /> Sign In</span>)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
