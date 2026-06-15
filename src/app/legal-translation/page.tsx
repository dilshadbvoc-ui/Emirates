"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Check, FileText, Globe, Clock, Languages } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';

export default function LegalTranslation() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello! I'd like to get a quote for certified legal translation services from EmiratesVisa.ae.");
    window.open(`https://wa.me/773690993?text=${text}`, '_blank');
  };

  const faqItems = [
    { question: "Are your translations certified for UAE government departments?", answer: "Yes. All translations are done by Ministry of Justice (MOJ) licensed legal translators, stamped with the official legal translation seal, and are accepted by all UAE ministries, courts, notaries, and official bodies." },
    { question: "How long does the legal translation take?", answer: "Standard turnaround is 1 to 2 working days. If you have an urgent court deadline or last-minute filing, we can prioritize and deliver on the same day." },
    { question: "Do I need to bring physical documents to your office?", answer: "No. The entire process is handled 100% online. You can simply upload a clear photo or scan of your documents via WhatsApp, and we will translate and send you the stamped certified copies." },
    { question: "Which languages do you support?", answer: "We support Arabic and English as the core translation pair for all UAE courts and ministries. We also translate French, Russian, German, Chinese, Urdu, Hindi, Tagalog, and many more on request." }
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Certified Document Translation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Send it over. <span className="text-[#009B3A]">We do the rest</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Certified legal translation in the UAE, done properly. Court documents, contracts, and certificates — translated by MOJ-licensed translators, stamped and accepted by courts, ministries, and notaries. Handled 100% online.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={openWhatsApp} className="px-8 py-4 bg-[#009B3A] hover:bg-[#007A2F] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3">
                  Get a Free Quote <ArrowRight size={18} />
                </button>
                <button onClick={openCalculator} className="px-8 py-4 border-2 border-gray-200 hover:border-gray-300 text-[#111827] rounded-full font-semibold transition-colors flex items-center justify-center gap-3">
                  <Calculator size={18} /> Visa Calculator
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['MOJ Stamped', '100% Online', 'Accepted Everywhere'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-red-50 text-[#EF3340] text-xs font-medium rounded-full border border-red-100">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-white aspect-[4/3] relative flex items-center justify-center p-8 border border-emerald-100">
                <div className="text-center">
                  <Languages size={80} className="text-[#009B3A] mx-auto mb-4" />
                  <p className="text-lg font-bold text-[#111827]">Arabic &bull; English &bull; Russian &bull; French</p>
                  <p className="text-sm text-[#6B7280] mt-2">Certified Legal Stamp Guaranteed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Use Cases" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">When you&apos;ll need <span className="text-[#009B3A]">legal translation</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Arabic is the official language of UAE courts and government. If your document is in another language, you&apos;ll need a certified translation.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <FileText size={22} />, title: 'Court Filings', desc: 'Pleadings, judgments, contracts, and evidence must be in Arabic to be filed and heard in UAE courts.' },
              { icon: <Globe size={22} />, title: 'Government Transactions', desc: 'Certificates and documents in other languages need certified Arabic translation for GDRFA, ICP, or MOHRE.' },
              { icon: <Languages size={22} />, title: 'Corporate Licensing', desc: 'MOAs, partner agreements, and corporate registry papers must carry official translation stamps.' },
              { icon: <Check size={22} />, title: 'Personal Certificates', desc: 'Birth, marriage, divorce, and death certificates translated for family visa sponsorships.' }
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
            <SectionBadge number="2" text="Documents" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Documents <span className="text-[#EF3340]">we translate</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">All documents are translated by MOJ-licensed legal translators and stamped for official use.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Contracts & Corporate', desc: 'Contracts, powers of attorney, MOAs, wills, affidavits, trade licenses, and court pleadings stamped for notaries and courts.' },
              { title: 'Personal & Legal Certificates', desc: 'Birth, marriage, divorce, death certificates, passports, driving licenses, police clearances, and medical reports for sponsorship and official transactions.' },
              { title: 'Academic Degrees', desc: 'Degrees, diplomas, educational transcripts, and school certificates translated and certified for employment, visas, and university admissions.' }
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
            <SectionBadge number="3" text="Timing & Turnaround" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Languages &amp; <span className="text-[#009B3A]">turnaround</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">We support most major languages and offer urgent same-day processing for tight deadlines.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: <Languages size={20} className="text-[#009B3A]" />, title: 'Arabic & English', desc: 'Core official pair for all ministries, courts, and notaries.' },
              { icon: <Globe size={20} className="text-[#009B3A]" />, title: 'Global Languages', desc: 'French, Russian, German, Chinese, Hindi, Urdu, Filipino, and more.' },
              { icon: <Clock size={20} className="text-[#009B3A]" />, title: '1-2 Day Delivery', desc: 'Standard turnaround is 24 to 48 hours.' },
              { icon: <Check size={20} className="text-[#009B3A]" />, title: 'Same Day Urgent', desc: 'Available on request for court or visa deadlines.' }
            ].map((box, idx) => (
              <div key={idx} className="bg-white p-5 border border-gray-100 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">{box.icon}</div>
                <h4 className="font-semibold text-sm text-[#111827] mb-1">{box.title}</h4>
                <p className="text-xs text-[#4B5563] leading-relaxed">{box.desc}</p>
              </div>
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
