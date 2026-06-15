"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, FileText, Landmark, ShieldAlert, Heart } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';

export default function Wills() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello! I'd like to ask about Will & Last Testament services in the UAE from EmiratesVisa.ae.");
    window.open(`https://wa.me/773690993?text=${text}`, '_blank');
  };

  const faqItems = [
    { question: "Why do expatriates need a registered will in the UAE?", answer: "Without a registered will, UAE inheritance laws (based on local frameworks) may apply to your assets by default. A registered will ensures that your property, bank accounts, and corporate shares are distributed according to your wishes." },
    { question: "Can I register a will through the DIFC Wills Service Centre?", answer: "Yes. The DIFC Wills Service Centre allows non-Muslim expatriates to register wills in English to protect their assets across all emirates of the UAE, as well as specify guardianship preferences for minor children." },
    { question: "How does minor guardianship work in UAE wills?", answer: "If you have minor children (under 18) residing in the UAE, you can designate both interim and permanent guardians in your will to avoid any administrative custody uncertainty." },
    { question: "What documents are required to draft a will?", answer: "Typically, we need copies of your passport and Emirates ID, details of the beneficiaries and guardians, and copies of property title deeds or corporate share certificates to be included in the asset registry." }
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Estate &amp; Custody Protection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Last Testament &amp; <span className="text-[#009B3A]">Wills Registration</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Ensure peace of mind and protect your family. We coordinate professional drafting and legal registration of wills (DIFC Wills, Local Courts) for UAE expats, property owners, and parents.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={openWhatsApp} className="px-8 py-4 bg-[#009B3A] hover:bg-[#007A2F] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3">
                  Protect My Assets <ArrowRight size={18} />
                </button>
                <button onClick={openCalculator} className="px-8 py-4 border-2 border-gray-200 hover:border-gray-300 text-[#111827] rounded-full font-semibold transition-colors flex items-center justify-center gap-3">
                  <Calculator size={18} /> Visa Calculator
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['DIFC & Court Options', 'Guardianship Clauses', 'Asset Registry'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-red-50 text-[#EF3340] text-xs font-medium rounded-full border border-red-100">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-white aspect-[4/3] relative flex items-center justify-center p-8 border border-emerald-100">
                <div className="text-center">
                  <Landmark size={80} className="text-[#009B3A] mx-auto mb-4" />
                  <p className="text-lg font-bold text-[#111827]">Bilingual Registration</p>
                  <p className="text-sm text-[#6B7280] mt-2">DIFC Wills &amp; Abu Dhabi Courts</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Why It Matters" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Why wills registration is <span className="text-[#009B3A]">important</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Registering a will is the only way to avoid the automatic application of default local inheritance laws on your assets.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <ShieldAlert size={22} />, title: 'Asset Distribution Control', desc: 'Specify exactly who inherits your properties, bank accounts, and shares in the UAE, avoiding disputes.' },
              { icon: <Heart size={22} />, title: 'Child Guardianship Protection', desc: 'Secure custody arrangements by legally registering interim and permanent guardians for children under 18.' },
              { icon: <FileText size={22} />, title: 'Corporate Share Continuity', desc: 'Ensure company shares and trade license ownership transfer smoothly without business freeze.' }
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
            <SectionBadge number="2" text="Process" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">How the <span className="text-[#EF3340]">process works</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">We guide you step-by-step from asset listing to the final court or DIFC registry appointment.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Consultation', desc: 'We assess your family status, assets (properties, accounts), and registration goals.' },
              { step: '2', title: 'Gather Docs', desc: 'Collect ownership title deeds, passports, EIDs, and guardian identity papers.' },
              { step: '3', title: 'Drafting & Review', desc: 'Your bilingual will draft is written by experienced lawyers and carefully revised.' },
              { step: '4', title: 'Registration', desc: 'We coordinate submission and schedule the final video verification with the registrar.' }
            ].map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#EF3340] text-white flex items-center justify-center font-bold text-sm mb-4">{item.step}</div>
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
            <SectionBadge number="3" text="Requirements" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Commonly <span className="text-[#009B3A]">required documents</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Depending on your assets and family status, you will need to compile these basic documents.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Personal Identity Papers', desc: 'Clear copies of passports, residence visas, and Emirates IDs of the testator, spouse, and guardians.' },
              { title: 'Real Estate Ownership', desc: 'Copies of Property Title Deeds or Oqood certificates for any real estate held in the UAE.' },
              { title: 'Corporate Records', desc: 'Trade Licenses, Memorandums of Association (MOAs), and share certificates for companies.' }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100">
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
