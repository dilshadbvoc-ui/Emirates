"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Check, FileText, Clock } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';
import { homeFAQs } from '@/data/faq';

export default function NewbornVisa() {
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Newborn Visa Service</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                New baby? Add them to your <span className="text-[#EF3340]">family file</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Congratulations on your new arrival! We&apos;ll handle the newborn visa process so you can focus on what matters most — your family.
              </p>
              <button onClick={openCalculator} className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center gap-3 mb-6">
                <Calculator size={18} /> Calculate Visa Cost <ArrowRight size={18} />
              </button>
              <div className="flex flex-wrap gap-2">
                {['Under 60 days', 'No medical needed', 'Family file'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-red-50 to-white aspect-[4/3] relative">
                <img src="/images/newborn-visa.jpg" alt="Newborn baby with family" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Requirements" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Newborn visa <span className="text-[#009B3A]">requirements</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">You must apply within 60 days of the baby&apos;s birth to avoid fines. Here&apos;s what you need.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <FileText size={22} />, title: 'Birth Certificate', desc: 'Attested birth certificate from the hospital where the baby was born.' },
              { icon: <FileText size={22} />, title: 'Passport', desc: 'Baby passport (can be obtained after birth certificate).' },
              { icon: <FileText size={22} />, title: 'Photos', desc: 'Passport-size photos of the newborn (white background).' },
              { icon: <FileText size={22} />, title: 'Parent Documents', desc: 'Sponsor passport, Emirates ID, and valid residence visa copies.' },
              { icon: <Clock size={22} />, title: 'Apply within 60 days', desc: 'Important: Apply within 60 days of birth to avoid overstay fines.' },
              { icon: <Check size={22} />, title: 'No Medical Required', desc: 'Newborns under 18 are exempt from the medical fitness test.' },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Simple <span className="text-[#EF3340]">3-step</span> process.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">We make adding your newborn to the family file quick and stress-free.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: '1', title: 'Share documents', desc: 'Send us the birth certificate, passport, and your documents via WhatsApp.' },
              { step: '2', title: 'We process', desc: 'We handle the application, Emirates ID, and visa stamping through GDRFA.' },
              { step: '3', title: 'All done', desc: 'Receive your baby Emirates ID and residence visa. Usually 3–5 working days.' },
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
