"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
      } else {
        // Force header update and redirect
        window.dispatchEvent(new CustomEvent('auth-change'));
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="2" width="24" height="28" rx="3" fill="#EF3340" />
              <path d="M12 8h8M12 13h8M12 18h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 2v4a2 2 0 002 2h4" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M20 22c0-3.3 2.7-6 6-6v6h-6z" fill="white" opacity="0.3" />
            </svg>
            <span className="text-xl font-bold text-[#111827]">
              EmiratesVisa<span className="text-[#EF3340]">.ae</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-[#111827]">Admin Login</h2>
          <p className="text-sm text-[#6B7280] mt-1">Access the leads dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-[#EF3340] text-sm p-4 rounded-xl border border-red-100 mb-6 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340] text-sm transition-all"
              placeholder="admin@emiratesvisa.ae"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340] text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#EF3340] hover:bg-[#D62B35] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
