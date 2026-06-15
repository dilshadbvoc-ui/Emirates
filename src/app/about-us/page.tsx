"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calculator, MessageCircle, ArrowRight, Shield, Clock, Globe, Award } from 'lucide-react';
import FeaturedLogos from '@/components/FeaturedLogos';
import GoogleReviews from '@/components/GoogleReviews';
import SectionBadge from '@/components/SectionBadge';
import FinalCTA from '@/components/FinalCTA';

export default function AboutUs() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Official DET-Licensed Provider</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Family visas, processed from your <span className="text-[#EF3340]">living room</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                We&apos;ve replaced outdated typing-centre queues with a premium, secure, 100% digital concierge service for UAE residents.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/" className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3">
                  <Calculator size={18} /> Calculate visa cost <ArrowRight size={18} />
                </Link>
                <a href="https://wa.me/773690993" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-semibold transition-colors flex items-center justify-center gap-3">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <FeaturedLogos />
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <GoogleReviews compact />
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-red-50 to-white aspect-[4/3] relative">
                <img src="/images/about-us.jpg" alt="EmiratesVisa.ae team" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                  <p className="text-xs font-semibold text-[#111827]">100% Online</p>
                  <p className="text-xs text-[#6B7280]">via WhatsApp</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionBadge text="Our story" gold />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">We created the service we wished existed in <span className="text-[#EF3340]">Dubai</span>.</h2>
            </div>
            <div>
              <p className="text-[#4B5563] leading-relaxed mb-4">
                For years, expatriates in the UAE have relied on physical Amer typing centres. While essential, they demand taking time off work, navigating traffic, and waiting in unpredictable queues to hand over highly sensitive documents to a stranger behind a glass counter.
              </p>
              <p className="text-[#4B5563] leading-relaxed">
                We knew there had to be a better, more secure way. EmiratesVisa.ae was born out of a desire to modernise this process. By acting as your dedicated private third-party provider, we process your applications entirely remotely through the official GDRFA and ICP portals — no queues, no paper copies, no stress.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={24} />, value: '100%', label: 'Online Process' },
              { icon: <Clock size={24} />, value: '5-10', label: 'Days Average' },
              { icon: <Award size={24} />, value: '1,000+', label: 'Visas Monthly' },
              { icon: <Shield size={24} />, value: '5.0', label: 'Google Rating' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#009B3A] mx-auto mb-3">{stat.icon}</div>
                <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
                <p className="text-sm text-[#4B5563]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onCalculator={() => {}} />
    </div>
  );
}
