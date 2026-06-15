"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Building, Briefcase, User, Landmark, Users } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FeaturedLogos from '@/components/FeaturedLogos';
import GoogleReviews from '@/components/GoogleReviews';
import FAQSection from '@/components/FAQSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';
import { goldenEligibilityCards } from '@/data/eligibility';
import { goldenVisaSteps } from '@/data/processSteps';
import { goldenFAQs } from '@/data/faq';

export default function GoldenVisa() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const iconMap: Record<string, React.ReactNode> = {
    building: <Building size={22} />,
    briefcase: <Briefcase size={22} />,
    user: <User size={22} />,
    landmark: <Landmark size={22} />,
    users: <Users size={22} />,
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Free UAE Golden Visa Tool</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                The 10-Year UAE <span className="text-[#009B3A]">Golden Visa</span> — five ways to qualify.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Property, company, salary, or deposit — long-term residency for you and your whole family, with the exact government fees made clear.
              </p>
              <button onClick={openCalculator} className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center gap-3 mb-4">
                <Calculator size={18} /> Calculate Visa Cost <ArrowRight size={18} />
              </button>
              <div className="flex flex-wrap gap-2 mb-6">
                {['10-year residency', 'No 6-month entry rule', 'Sponsor family'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">{tag}</span>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <FeaturedLogos />
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <GoogleReviews compact />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-100 to-emerald-50 aspect-[4/3] relative">
                <img src="/images/golden-visa-hero.jpg" alt="UAE Golden Visa concept with Dubai skyline" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-[#009B3A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">Live gov fees</div>
              </div>
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white rounded-xl shadow-lg border border-gray-100 w-[280px] sm:w-[300px] overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-auto text-[10px] text-[#6B7280] uppercase tracking-wider">golden visa estimator</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-3">Example &middot; Company Owner</p>
                  {[
                    { label: 'Immigration & visa', amount: 2710 },
                    { label: 'Medical fitness', amount: 320 },
                    { label: 'Emirates ID', amount: 1185 },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-[#4B5563]">{item.label}</span>
                      <span className="text-sm font-medium text-[#111827]">{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 mt-2 border-t-2 border-[#111827]">
                    <span className="text-sm font-semibold text-[#111827]">Government fees</span>
                    <span className="text-lg font-bold text-[#EF3340]">AED 4,215</span>
                  </div>
                </div>
                <button onClick={openCalculator} className="w-full py-2.5 bg-[#EF3340] hover:bg-[#D62B35] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Calculator size={14} /> Get my exact figure
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Who is eligible" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Five ways to <span className="text-[#009B3A]">qualify</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">The UAE Golden Visa rewards people who add value to the country. There are five common routes — pick the one that fits you. Each grants the same 10-year residency.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {goldenEligibilityCards.map((card) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#009B3A] mb-4">{iconMap[card.icon]}</div>
                <h3 className="text-base font-semibold text-[#111827] mb-1">{card.title}</h3>
                <p className="text-sm font-bold text-[#009B3A] mb-2">{card.requirement}</p>
                <p className="text-sm text-[#4B5563] leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="2" text="Do-it-yourself guide" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">The full process, <span className="text-[#EF3340]">step by step</span>.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-8 text-sm text-[#6B7280]">
            <span className="bg-white px-3 py-1.5 rounded-full font-semibold text-[#111827]">Golden Visa</span>
            <span className="bg-white px-3 py-1.5 rounded-full text-xs font-medium">7 steps</span>
            <span className="bg-white px-3 py-1.5 rounded-full text-xs font-medium">10–15 days</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <ProcessTimeline steps={goldenVisaSteps} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-8 p-4 bg-white rounded-xl border border-gray-100">
            <p className="text-sm text-[#4B5563]"><strong>Total time:</strong> 10–15 working days depending on document readiness and medical appointment availability.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sticky bottom-4 mt-8 p-4 bg-[#EF3340]/95 backdrop-blur-sm rounded-xl flex flex-col sm:flex-row gap-3 justify-between items-center">
            <button onClick={openCalculator} className="px-6 py-2.5 bg-white text-[#EF3340] rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"><Calculator size={16} /> Calculate Golden Visa cost</button>
            <a href="https://wa.me/773690993" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white/20 text-white rounded-full font-medium text-sm hover:bg-white/30 transition-colors">Ask a question</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge text="Still wondering?" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Frequently asked <span className="text-[#EF3340]">questions</span></h2>
            <p className="text-[#4B5563] mb-8">Real questions from real customers. Tap to expand.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FAQSection faqs={goldenFAQs} />
          </motion.div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
