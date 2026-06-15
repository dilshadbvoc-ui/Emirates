"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Check, FileText, Video, Award, Shield } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';

export default function PowerOfAttorney() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello! I'd like to set up a UAE Power of Attorney with EmiratesVisa.ae.");
    window.open(`https://wa.me/9718003627?text=${text}`, '_blank');
  };

  const faqItems = [
    { question: "Can I notarise my UAE Power of Attorney from abroad?", answer: "Yes. The UAE remote notary system allows video call notarisation from anywhere in the world. You do not need to be physically present in the UAE or visit a notary office." },
    { question: "Is a template-based POA safe to use?", answer: "No. Generic templates are often rejected by banks, developers, and government departments for lacking specific clauses. Every POA we draft is written by qualified lawyers for your exact purpose." },
    { question: "How long does the remote notarisation take?", answer: "Once the draft is approved, the remote video notarisation session typically takes 10 to 15 minutes, with the final digitally-signed POA issued the same day." },
    { question: "Do you write POAs in both English and Arabic?", answer: "Yes. All UAE Powers of Attorney are prepared as bilingual documents (Arabic and English) to meet the mandatory requirements of UAE courts, notaries, and departments." }
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Lawyer-Drafted POA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Lawyer-drafted. <span className="text-[#009B3A]">Notarised by video call</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Bilingual, legally valid, and done without leaving home. Every Power of Attorney is prepared by qualified lawyers to fit your exact needs and notarised remotely via secure video call.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={openWhatsApp} className="px-8 py-4 bg-[#009B3A] hover:bg-[#007A2F] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3">
                  Start My POA Online <ArrowRight size={18} />
                </button>
                <button onClick={openCalculator} className="px-8 py-4 border-2 border-gray-200 hover:border-gray-300 text-[#111827] rounded-full font-semibold transition-colors flex items-center justify-center gap-3">
                  <Calculator size={18} /> Visa Calculator
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Lawyer-Drafted', 'Bilingual', '100% Online'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-red-50 text-[#EF3340] text-xs font-medium rounded-full border border-red-100">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-white aspect-[4/3] relative flex items-center justify-center p-8 border border-emerald-100">
                <div className="text-center">
                  <Video size={80} className="text-[#009B3A] mx-auto mb-4" />
                  <p className="text-lg font-bold text-[#111827]">Digital Notarisation</p>
                  <p className="text-sm text-[#6B7280] mt-2">Accepted by UAE Banks &amp; GDRFA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Situations" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">When you&apos;ll need a <span className="text-[#009B3A]">POA</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">A Power of Attorney lets someone you trust act on your behalf in the UAE when you can&apos;t be present physically.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <FileText size={22} />, title: 'Property Transactions', desc: 'Buy, sell, mortgage, lease, or manage UAE property without having to travel or attend in person.' },
              { icon: <Award size={22} />, title: 'Business Management', desc: 'Appoint a manager to handle trade license setup, sign contracts, and complete PRO/licensing steps.' },
              { icon: <Shield size={22} />, title: 'Financial & Banking', desc: 'Authorize representation to open or close bank accounts, manage funds, and handle transactions.' },
              { icon: <Check size={22} />, title: 'Court Representation', desc: 'Appoint a legal advocate or representative to coordinate in UAE courts and official hearings.' }
            ].map((card, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#009B3A] mb-4">{card.icon}</div>
                <h3 className="text-base font-semibold text-[#111827] mb-2">{card.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="2" text="POA Types" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Types of <span className="text-[#EF3340]">POA we draft</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Every Power of Attorney is prepared by qualified lawyers with the precise scope needed for the task.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'General POA', desc: 'Broad powers for someone to manage multiple legal, administrative, and company affairs on your behalf.' },
              { title: 'Special POA', desc: 'Limited strictly to a single transaction, such as selling a specific vehicle or representing in one case.' },
              { title: 'Property POA', desc: 'Tailored powers to buy, sell, rent, mortgage, or manage property and real estate in the UAE.' },
              { title: 'Corporate POA', desc: 'Designed for company owners to authorize managers to sign contracts and manage business licensing.' }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-base font-semibold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="3" text="Digital Process" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Notarised online, <span className="text-[#009B3A]">no notary visit</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">The remote notarisation process is fully digital, officially recognized, and secure.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: '1', title: 'Lawyer Consultation & Drafting', desc: 'Tell us who you want to authorize and what powers they need. A qualified lawyer drafts it bilingually.' },
              { step: '2', title: 'Video Call Notarisation', desc: 'We coordinate the online notary appointment. Sign and verify identity securely with a notary over video call.' },
              { step: '3', title: 'Digital POA Issued', desc: 'Receive your officially notarized POA in digital format, ready to use immediately across the UAE.' }
            ].map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#009B3A] text-white flex items-center justify-center font-bold text-sm mb-4">{item.step}</div>
                <h3 className="text-base font-semibold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge text="FAQs" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">Frequently asked <span className="text-[#EF3340]">questions</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FAQSection faqs={faqItems} />
          </motion.div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
