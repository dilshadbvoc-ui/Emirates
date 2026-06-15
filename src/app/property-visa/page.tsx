"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Building, Check } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';
import { homeFAQs } from '@/data/faq';

export default function PropertyVisa() {
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Free UAE Property Visa Tool</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                UAE <span className="text-[#009B3A]">Property Visa</span> — own property, get residency.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Own property in Dubai worth AED 750,000 or more? You may qualify for a 2-year renewable residency visa. Calculate your exact government fees.
              </p>
              <button onClick={openCalculator} className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center gap-3 mb-6">
                <Calculator size={18} /> Calculate Visa Cost <ArrowRight size={18} />
              </button>
              <div className="flex flex-wrap gap-2">
                {['2-year residency', 'No minimum salary', 'Property-based'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-white aspect-[4/3] relative">
                <img src="/images/property-visa.jpg" alt="Dubai property skyline" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Who qualifies" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Property visa <span className="text-[#009B3A]">requirements</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">To qualify for a UAE property visa, you need to meet certain criteria related to your property ownership.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Building size={22} />, title: 'Property Value', req: 'AED 750,000+', desc: 'Own residential property in the UAE worth at least AED 750,000.' },
              { icon: <Check size={22} />, title: 'Title Deed', req: 'In your name', desc: 'The property must be registered in your name with the Dubai Land Department.' },
              { icon: <Check size={22} />, title: 'No Mortgage Block', req: 'Or NOC obtained', desc: 'If mortgaged, a bank NOC was previously required but is no longer needed as of 2026.' },
            ].map((card, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#009B3A] mb-4">{card.icon}</div>
                <h3 className="text-base font-semibold text-[#111827] mb-1">{card.title}</h3>
                <p className="text-sm font-bold text-[#009B3A] mb-2">{card.req}</p>
                <p className="text-sm text-[#4B5563] leading-relaxed">{card.desc}</p>
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
            <FAQSection faqs={homeFAQs.slice(0, 5)} />
          </motion.div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
