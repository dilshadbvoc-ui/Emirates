"use client";

import { motion } from 'framer-motion';
import {
  MessageCircle, ArrowRight, Home, CreditCard, Smartphone,
  MessageSquare, Package, CheckCircle, FileCheck, Truck
} from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FinalCTA from '@/components/FinalCTA';

export default function Attestation() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-green-600">100% online service</span>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Home size={20} />, title: 'Doorstep pickup & delivery', desc: 'Our rider comes to your home or office — no typing-centre queues.' },
                  { icon: <CreditCard size={20} />, title: 'Pay only after delivery', desc: 'You settle up once your attested documents are back with you.' },
                  { icon: <Smartphone size={20} />, title: 'Track it all online', desc: 'Instant quote, confirm and follow progress from your phone.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#009B3A] shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#111827]">{item.title}</h3>
                      <p className="text-sm text-[#4B5563]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md inline-flex items-center gap-3">
                <MessageCircle size={18} /> Get a free quote <ArrowRight size={18} />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-green-50 aspect-[4/3] relative">
                <img src="/images/attestation.jpg" alt="Document attestation service" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="How it works" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">We come to you. You pay <span className="text-[#009B3A]">after</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">A 100% online service. Request in seconds, we collect from your door, attest everything through the official channels, and deliver it back — and you only pay once it&apos;s safely in your hands.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <MessageSquare size={22} />, step: '1', title: 'Request & quote', desc: 'Tell us what to attest on WhatsApp or the app — get an instant, itemised quote.' },
              { icon: <Truck size={22} />, step: '2', title: 'We collect', desc: 'Confirm, and our rider picks your documents up from your door.' },
              { icon: <FileCheck size={22} />, step: '3', title: 'We attest', desc: 'We complete the full attestation through the official channels.' },
              { icon: <Package size={22} />, step: '4', title: 'Delivered — pay after', desc: 'Your documents come back to you. You pay only on delivery.' },
            ].map((item) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#009B3A] mb-4">{item.icon}</div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-[#4B5563] mb-3">{item.step}</div>
                <h3 className="text-base font-semibold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="3" text="The documents" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Documents we <span className="text-[#009B3A]">attest</span>.</h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">Three families of documents, three slightly different paths. Find yours below.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { category: 'Category 1', title: 'Educational', desc: 'Academic and professional certificates attested for employment, licensing and university admission in the UAE.', examples: ['Degree certificates', 'Diplomas', 'Transcripts', 'Professional certificates'] },
              { category: 'Category 2', title: 'Personal', desc: 'Personal documents attested for family visa applications, legal matters, and identity verification.', examples: ['Marriage certificates', 'Birth certificates', 'Death certificates', 'Police clearance'] },
              { category: 'Category 3', title: 'Commercial', desc: 'Business documents attested for company setup, tenders, banking, and commercial transactions.', examples: ['Trade licenses', 'MOA documents', 'Power of attorney', 'Commercial invoices'] },
            ].map((cat) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">{cat.category}</span>
                <h3 className="text-xl font-semibold text-[#111827] mt-1 mb-3">{cat.title}</h3>
                <p className="text-sm text-[#4B5563] mb-4">{cat.desc}</p>
                <div className="space-y-2">
                  {cat.examples.map((ex, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-600 shrink-0" />
                      <span className="text-sm text-[#4B5563]">{ex}</span>
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/9718003627" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#EF3340] hover:text-[#D62B35] transition-colors">Get a quote <ArrowRight size={14} /></a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onCalculator={() => {}} />
    </div>
  );
}
