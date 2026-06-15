"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, RefreshCw, FileText, Search, User, Phone, Mail, Tag, Settings, Save, CheckCircle } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'leads' | 'fees' | 'questions'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [fees, setFees] = useState<any>(null);
  const [questions, setQuestions] = useState<any>(null);

  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchLeads = async () => {
    setLoadingLeads(true);
    setError('');
    try {
      const res = await fetch('/api/leads');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to load leads');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred fetching leads');
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchConfig = async () => {
    setLoadingConfig(true);
    try {
      const res = await fetch('/api/calculator/config');
      if (res.ok) {
        const data = await res.json();
        setFees(data.fees);
        setQuestions(data.questions);
      }
    } catch (err) {
      console.error('Error fetching config:', err);
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchConfig();
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

  const handleSaveConfig = async () => {
    setSavingConfig(true);
    setSuccessMsg('');
    setError('');
    try {
      const res = await fetch('/api/calculator/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fees, questions }),
      });
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to save configuration');
      setSuccessMsg('Configuration saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save configuration');
    } finally {
      setSavingConfig(false);
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

  // Helper to handle nested fee updates
  const updateFeeField = (path: string[], value: number) => {
    setFees((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let current = copy;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return copy;
    });
  };

  // Helper to handle question title/description updates
  const updateQuestionField = (qId: string, field: 'title' | 'description', value: string) => {
    setQuestions((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[qId][field] = value;
      return copy;
    });
  };

  // Helper to handle option title/description updates
  const updateOptionField = (qId: string, optId: string, field: 'title' | 'description', value: string) => {
    setQuestions((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[qId].options[optId][field] = value;
      return copy;
    });
  };

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
            {activeTab !== 'leads' && (
              <button
                onClick={handleSaveConfig}
                disabled={savingConfig}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-75 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save size={16} />
                {savingConfig ? 'Saving...' : 'Save Changes'}
              </button>
            )}
            <button
              onClick={() => {
                if (activeTab === 'leads') fetchLeads();
                else fetchConfig();
              }}
              className="p-2.5 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} className={(loadingLeads || loadingConfig) ? 'animate-spin' : ''} />
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

        {/* Success/Error Alerts */}
        {successMsg && (
          <div className="bg-emerald-50 text-emerald-800 text-sm p-4 rounded-xl border border-emerald-100 mb-6 font-medium flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-600" />
            {successMsg}
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-[#EF3340] text-sm p-4 rounded-xl border border-red-100 mb-6 font-medium">
            {error}
          </div>
        )}

        {/* Tab Selection */}
        <div className="bg-gray-100 p-1.5 rounded-2xl flex inline-flex mb-8 gap-1 shadow-sm border border-gray-200/50">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'leads' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-850'
            }`}
          >
            Leads Submission
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'fees' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-855'
            }`}
          >
            Visa Charges (Fees)
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'questions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-855'
            }`}
          >
            Questions & Options
          </button>
        </div>

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <>
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

            {loadingLeads ? (
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
          </>
        )}

        {/* FEES TAB */}
        {activeTab === 'fees' && (
          <div className="space-y-8">
            {loadingConfig || !fees ? (
              <div className="text-center py-20">
                <RefreshCw size={36} className="text-[#EF3340] animate-spin mx-auto mb-3" />
                <p className="text-sm text-[#6B7280]">Loading fees config...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Fees */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#111827] mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <Settings size={18} className="text-[#EF3340]" /> General Services Fees
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Family File Opening (AED)</label>
                      <input
                        type="number"
                        value={fees.familyFile}
                        onChange={(e) => updateFeeField(['familyFile'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Medical - Normal (AED)</label>
                      <input
                        type="number"
                        value={fees.medical.normal}
                        onChange={(e) => updateFeeField(['medical', 'normal'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Medical - VIP (AED)</label>
                      <input
                        type="number"
                        value={fees.medical.vip}
                        onChange={(e) => updateFeeField(['medical', 'vip'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dependent Stamping (Family) (AED)</label>
                      <input
                        type="number"
                        value={fees.stampFamily}
                        onChange={(e) => updateFeeField(['stampFamily'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status Change Fee (AED)</label>
                      <input
                        type="number"
                        value={fees.changeStatus}
                        onChange={(e) => updateFeeField(['changeStatus'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permit - Inside (AED)</label>
                        <input
                          type="number"
                          value={fees.entryInside}
                          onChange={(e) => updateFeeField(['entryInside'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permit - Outside (AED)</label>
                        <input
                          type="number"
                          value={fees.entryOutside}
                          onChange={(e) => updateFeeField(['entryOutside'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Family Visa 2-Year Dependent */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#111827] mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <Settings size={18} className="text-[#EF3340]" /> Family Visa (2-Year Employee Dep)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permit - Inside (AED)</label>
                      <input
                        type="number"
                        value={fees.fv.entryInside}
                        onChange={(e) => updateFeeField(['fv', 'entryInside'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permit - Outside (AED)</label>
                      <input
                        type="number"
                        value={fees.fv.entryOutside}
                        onChange={(e) => updateFeeField(['fv', 'entryOutside'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Change Status (AED)</label>
                      <input
                        type="number"
                        value={fees.fv.changeStatus}
                        onChange={(e) => updateFeeField(['fv', 'changeStatus'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Visa Stamping (AED)</label>
                      <input
                        type="number"
                        value={fees.fv.stamp}
                        onChange={(e) => updateFeeField(['fv', 'stamp'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Emirates ID (AED)</label>
                      <input
                        type="number"
                        value={fees.fv.eid}
                        onChange={(e) => updateFeeField(['fv', 'eid'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                  </div>
                </div>

                {/* Newborn Visa */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#111827] mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <Settings size={18} className="text-[#EF3340]" /> Newborn Visa Fees
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Birth Cert Arabic (AED)</label>
                        <input
                          type="number"
                          value={fees.newborn.bcArabic}
                          onChange={(e) => updateFeeField(['newborn', 'bcArabic'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Birth Cert English (AED)</label>
                        <input
                          type="number"
                          value={fees.newborn.bcEnglish}
                          onChange={(e) => updateFeeField(['newborn', 'bcEnglish'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">MOFA Attestation (AED)</label>
                      <input
                        type="number"
                        value={fees.newborn.mofa}
                        onChange={(e) => updateFeeField(['newborn', 'mofa'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Birth Cert Delivery (AED)</label>
                        <input
                          type="number"
                          value={fees.newborn.bcDelivery}
                          onChange={(e) => updateFeeField(['newborn', 'bcDelivery'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">MOFA Delivery (AED)</label>
                        <input
                          type="number"
                          value={fees.newborn.mofaDelivery}
                          onChange={(e) => updateFeeField(['newborn', 'mofaDelivery'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Golden Visa Stamping (AED)</label>
                      <input
                        type="number"
                        value={fees.newborn.goldenStamp}
                        onChange={(e) => updateFeeField(['newborn', 'goldenStamp'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                  </div>
                </div>

                {/* Amer Center Comparison Fees */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#111827] mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <Settings size={18} className="text-[#EF3340]" /> Amer Center (Comparison Prices)
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Medical Normal (AED)</label>
                        <input
                          type="number"
                          value={fees.amer.medNormal}
                          onChange={(e) => updateFeeField(['amer', 'medNormal'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Medical VIP (AED)</label>
                        <input
                          type="number"
                          value={fees.amer.medVip}
                          onChange={(e) => updateFeeField(['amer', 'medVip'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Family File Fee (AED)</label>
                      <input
                        type="number"
                        value={fees.amer.familyFile}
                        onChange={(e) => updateFeeField(['amer', 'familyFile'], parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permit - Inside (AED)</label>
                        <input
                          type="number"
                          value={fees.amer.fvEntryInside}
                          onChange={(e) => updateFeeField(['amer', 'fvEntryInside'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permit - Outside (AED)</label>
                        <input
                          type="number"
                          value={fees.amer.fvEntryOutside}
                          onChange={(e) => updateFeeField(['amer', 'fvEntryOutside'], parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Change Status</label>
                        <input
                          type="number"
                          value={fees.amer.fvChangeStatus}
                          onChange={(e) => updateFeeField(['amer', 'fvChangeStatus'], parseFloat(e.target.value))}
                          className="w-full px-2 py-2 rounded-lg border border-gray-200 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Stamping</label>
                        <input
                          type="number"
                          value={fees.amer.fvStamp}
                          onChange={(e) => updateFeeField(['amer', 'fvStamp'], parseFloat(e.target.value))}
                          className="w-full px-2 py-2 rounded-lg border border-gray-200 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Emirates ID</label>
                        <input
                          type="number"
                          value={fees.amer.fvEid}
                          onChange={(e) => updateFeeField(['amer', 'fvEid'], parseFloat(e.target.value))}
                          className="w-full px-2 py-2 rounded-lg border border-gray-200 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUESTIONS TAB */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {loadingConfig || !questions ? (
              <div className="text-center py-20">
                <RefreshCw size={36} className="text-[#EF3340] animate-spin mx-auto mb-3" />
                <p className="text-sm text-[#6B7280]">Loading questions config...</p>
              </div>
            ) : (
              Object.keys(questions).map((qId) => {
                const q = questions[qId];
                return (
                  <div key={qId} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <h3 className="font-bold text-lg text-[#111827]">
                        Question Screen #{qId}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Question Title</label>
                        <input
                          type="text"
                          value={q.title}
                          onChange={(e) => updateQuestionField(qId, 'title', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Question Description</label>
                        <input
                          type="text"
                          value={q.description}
                          onChange={(e) => updateQuestionField(qId, 'description', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EF3340]/20 focus:border-[#EF3340]"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Options Config</h4>
                      <div className="space-y-4">
                        {Object.keys(q.options).map((optId) => {
                          const opt = q.options[optId];
                          return (
                            <div key={optId} className="bg-gray-50 rounded-xl p-4 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                              <span className="font-semibold text-sm text-[#EF3340] uppercase tracking-wider">
                                {optId}
                              </span>
                              <div>
                                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Option Label</label>
                                <input
                                  type="text"
                                  value={opt.title}
                                  onChange={(e) => updateOptionField(qId, optId, 'title', e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Option Description</label>
                                <input
                                  type="text"
                                  value={opt.description}
                                  onChange={(e) => updateOptionField(qId, optId, 'description', e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none text-sm"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
