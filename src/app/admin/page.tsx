"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, RefreshCw, FileText, Search, User, Phone, Mail, Tag } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source: string;
  calculatorSummary?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to load leads');
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred fetching leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.dispatchEvent(new CustomEvent('auth-change'));
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const term = search.toLowerCase();
    return (
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      (lead.phone && lead.phone.toLowerCase().includes(term)) ||
      (lead.service && lead.service.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Leads Dashboard</h1>
            <p className="text-sm text-[#6B7280]">Manage contact submissions and visa calculation leads</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2.5 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full focus:outline-none text-sm text-[#111827]"
          />
        </div>

        {/* Content */}
        {error && (
          <div className="bg-red-50 text-[#EF3340] text-sm p-4 rounded-xl border border-red-100 mb-6 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <RefreshCw size={36} className="text-[#EF3340] animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20 px-4">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#111827] mb-1">No leads found</h3>
            <p className="text-sm text-[#6B7280]">
              {leads.length === 0 ? "You haven't received any leads yet." : "No leads matches your search query."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-red-50 text-[#EF3340] text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {lead.source}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
                    <User size={18} className="text-[#EF3340]" /> {lead.name}
                  </h3>

                  <div className="space-y-2.5 text-sm text-[#4B5563] mb-6">
                    <div className="flex items-center gap-2.5">
                      <Mail size={15} className="text-gray-400 shrink-0" />
                      <a href={`mailto:${lead.email}`} className="hover:underline hover:text-[#EF3340]">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2.5">
                        <Phone size={15} className="text-gray-400 shrink-0" />
                        <a href={`tel:${lead.phone}`} className="hover:underline hover:text-[#EF3340]">
                          {lead.phone}
                        </a>
                      </div>
                    )}
                    {lead.service && (
                      <div className="flex items-center gap-2.5">
                        <Tag size={15} className="text-gray-400 shrink-0" />
                        <span className="font-semibold text-gray-700">{lead.service}</span>
                      </div>
                    )}
                  </div>

                  {lead.message && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Message</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{lead.message}</p>
                    </div>
                  )}

                  {lead.calculatorSummary && (
                    <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#FDE8EA]">
                      <p className="text-xs text-[#EF3340] font-semibold uppercase tracking-wider mb-1">Calculator Summary</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{lead.calculatorSummary}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
