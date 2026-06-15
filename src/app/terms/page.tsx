"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, FileText } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';

export default function Terms() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Legal &amp; Policies</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
              Terms &amp; <span className="text-[#009B3A]">Privacy</span>.
            </h1>
            <p className="text-base text-[#4B5563]">
              Please read our terms of service, privacy policy, and private third-party service disclosure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="prose prose-emerald max-w-none space-y-10">
            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex gap-4 text-[#EF3340]">
              <Info size={24} className="shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base mb-1">Third-Party Agency Disclosure</h3>
                <p className="text-xs text-red-900 leading-relaxed">
                  EmiratesVisa.ae is operated by 800 DOCS LLC SOC, a private service provider. We are not a government agency, immigration authority, or GDRFA/ICP department. We assist clients with professional document translations, attestation, visa application preparation, and typing center entries for submission via official government systems.
                </p>
              </div>
            </div>

            {/* Terms of Service */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-[#009B3A]" size={20} />
                <h2 className="text-xl font-bold text-[#111827]">1. Terms of Service</h2>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                By using EmiratesVisa.ae and requesting our legal, translation, or visa typing services, you agree to provide complete and accurate documents. All submissions are processed through official UAE government portals. We are not responsible for delays, application rejections, or policy updates issued by government departments (such as GDRFA or ICP).
              </p>
            </div>

            {/* Privacy Policy */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-[#009B3A]" size={20} />
                <h2 className="text-xl font-bold text-[#111827]">2. Privacy &amp; Data Security</h2>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                We collect and store your personal data, passports, Emirates IDs, and relationship certificates solely for the purpose of executing the requested visa or legal service. Your documents are handled with the highest level of security and confidentiality and are never shared with any unauthorized third parties.
              </p>
            </div>

            {/* Refund Policy */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-[#009B3A]" size={20} />
                <h2 className="text-xl font-bold text-[#111827]">3. Fees &amp; Refund Policy</h2>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Government visa application fees are non-refundable once typing has been completed and submitted to the government channels, as mandated by GDRFA and ICP guidelines. Service fees charged by EmiratesVisa.ae are fully earned upon completion of document checking and typing services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
