"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, FileText, Landmark, Shield, FileCheck } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';

export default function DLDTrustee() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello! I'd like to check my property documents for a DLD Trustee transaction with EmiratesVisa.ae.");
    window.open(`https://wa.me/9718003627?text=${text}`, '_blank');
  };

  const faqItems = [
    { question: "What is a DLD Property Trustee Office?", answer: "DLD Trustee offices are private service centers licensed by the Dubai Land Department to complete property registrations, title deed transfers, and mortgage registrations, replacing the need to visit the main DLD headquarters." },
    { question: "Why do I need a document pre-check before going to a trustee?", answer: "Trustee transactions are highly document-sensitive. A single missing paper (such as an incorrect POA clause, expired NOC, or missing relationship proof) will delay the transfer. We pre-verify your file to ensure you complete the transaction in a single visit." },
    { question: "How does a family gift transfer (hiba) work?", answer: "A gift transfer is a property transfer between first-degree relatives (parents to children, or between spouses). It carries a reduced DLD fee of 0.125% of the property value, but requires verified birth/marriage certificates attested by MOFA and the courts." },
    { question: "Do you coordinate developer NOCs?", answer: "Yes. We assist you in coordinating and verifying Developer NOCs (No Objection Certificates) from Emaar, Nakheel, DAMAC, and others, ensuring they are valid and carry the correct buyer/seller information." }
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Property Transfer Support</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Trustee services without the <span className="text-[#009B3A]">paperwork headache</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Complete your Dubai property transfers and registrations smoothly. We pre-check your files, coordinate NOCs, verify POA clauses, and ensure your documents are transaction-ready before your trustee appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={openWhatsApp} className="px-8 py-4 bg-[#009B3A] hover:bg-[#007A2F] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3">
                  Check My Documents <ArrowRight size={18} />
                </button>
                <button onClick={openCalculator} className="px-8 py-4 border-2 border-gray-200 hover:border-gray-300 text-[#111827] rounded-full font-semibold transition-colors flex items-center justify-center gap-3">
                  <Calculator size={18} /> Visa Calculator
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Transfer Pre-check', 'NOC Verification', 'Bilingual Relationship Proofs'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-red-50 text-[#EF3340] text-xs font-medium rounded-full border border-red-100">{tag}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-white aspect-[4/3] relative flex items-center justify-center p-8 border border-emerald-100">
                <div className="text-center">
                  <Landmark size={80} className="text-[#009B3A] mx-auto mb-4" />
                  <p className="text-lg font-bold text-[#111827]">DLD Trustee Office Prep</p>
                  <p className="text-sm text-[#6B7280] mt-2">Sale Transfer &bull; Gifts &bull; Mortgages</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Why Pre-Check" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">A trustee visit should be the <span className="text-[#009B3A]">final step</span>, not the first confusion.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Many people visit a trustee office only to find their files are missing vital papers or carrying incorrect details. We review and compile the complete transaction-ready file beforehand.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <FileText size={22} />, title: 'Sale Transfers Support', desc: 'Verify buyer and seller IDs, title deeds, developer NOCs, and bank clearance letters.' },
              { icon: <Landmark size={22} />, title: 'Family Gift Transfers', desc: 'Guidance on relationship documents, MOFA attestation, and court relationship certificates for gift transfers.' },
              { icon: <Shield size={22} />, title: 'Mortgages & Releases', desc: 'Review bank NOCs, mortgage block documents, and bank liability letters for registration readiness.' },
              { icon: <FileCheck size={22} />, title: 'Title Deed Issuance', desc: 'Coordinating title deed registry, ownership record updates, and correcting registry typos.' }
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Simple <span className="text-[#EF3340]">pre-checking process</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Send us your documents online, and receive a complete transaction readiness guide.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Specify Transaction', desc: 'Let us know if you are doing a sale transfer, family gift transfer, or mortgage release.' },
              { step: '2', title: 'Upload Files', desc: 'Send clear scans or photographs of the title deeds, developer NOCs, and IDs on WhatsApp.' },
              { step: '3', title: 'We Pre-Verify', desc: 'We review signees, POA powers, developer letters, and confirm if anything is missing.' },
              { step: '4', title: 'Transaction Ready', desc: 'Proceed directly to the trustee center with a complete checklist and sign with 100% confidence.' }
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
            <SectionBadge number="3" text="Common Documents" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Commonly <span className="text-[#009B3A]">required documents</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Every transaction has specific document requirements. Here are the core items to prepare.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Properties & Deeds', desc: 'Original Title Deed or Oqood registration document, along with developer NOCs.' },
              { title: 'Buyer & Seller Credentials', desc: 'Passports, Emirates IDs, residence visas, and verified contact numbers of both parties.' },
              { title: 'Power of Attorney', desc: 'If any party is represented by POA, the POA must be notarized in the UAE and checked for specific transfer clauses.' }
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
