"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Check, AlertTriangle, Shield } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FeaturedLogos from '@/components/FeaturedLogos';
import GoogleReviews from '@/components/GoogleReviews';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';
import { maidFAQs } from '@/data/faq';

export default function MaidVisa() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Domestic Worker Visa</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Sponsor your nanny or maid. <span className="text-[#EF3340]">We&apos;ll handle the maid visa.</span>
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Get your domestic worker&apos;s UAE residency visa processed 100% online. Skip the typing centres and let our experts handle the GDRFA and MOHRE paperwork.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3">
                  <MessageCircle size={18} /> Get a free quote <ArrowRight size={18} />
                </a>
                <button onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 border-2 border-gray-200 text-[#4B5563] hover:border-gray-300 rounded-full font-semibold transition-colors flex items-center justify-center gap-2">See the process</button>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <FeaturedLogos />
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <GoogleReviews compact />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} className="text-[#EF3340]" />
                  <span className="text-sm font-semibold text-[#111827]">Domestic worker visa</span>
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-4">We handle it end-to-end</h4>
                {['Entry permit & status change', 'DHA medical + Emirates ID', 'MOHRE labour contract', 'GDRFA residency stamping'].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <Check size={16} className="text-green-600 shrink-0" />
                    <span className="text-sm text-[#111827]">{item}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-xs text-[#EF3340] font-medium">100% online &middot; stamping in 5–7 working days</p>
                </div>
                <a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" className="mt-4 w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={16} /> Get a free quote
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Important: salary & accommodation rules</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">
                To sponsor a maid in Dubai, the sponsor needs a minimum monthly salary of <strong>AED 25,000</strong> (or AED 22,000 with company-provided accommodation). Bachelors cannot sponsor a domestic worker — you must be living with your family, in a home with at least two bedrooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="How it works" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Maid visa <span className="text-[#EF3340]">process</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">We handle the entire process from start to finish — all through WhatsApp, with no office visits required.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Get a quote', desc: 'Send us your details on WhatsApp and receive an instant quote.' },
              { step: '2', title: 'Document collection', desc: 'Share digital copies of all required documents.' },
              { step: '3', title: 'Processing', desc: 'We handle MOHRE, GDRFA, medical bookings, and follow-ups.' },
              { step: '4', title: 'Visa complete', desc: 'Residency stamped in 5–7 working days. Done.' },
            ].map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#EF3340] text-white flex items-center justify-center font-bold text-sm mb-4">{item.step}</div>
                <h3 className="text-base font-semibold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge text="Still wondering?" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">Frequently asked <span className="text-[#EF3340]">questions</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FAQSection faqs={maidFAQs} />
          </motion.div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
