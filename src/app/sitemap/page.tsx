"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Map, ChevronRight } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import VisaCalculator from '@/components/VisaCalculator';

export default function Sitemap() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const sitemapGroups = [
    {
      title: 'Residence Visas',
      links: [
        { label: 'Visa Cost Calculator (Home)', href: '/' },
        { label: 'Golden Visa (10-Year)', href: '/golden-visa' },
        { label: 'Property Visa (Residency)', href: '/property-visa' },
        { label: 'Newborn Visa Service', href: '/new-born' },
        { label: 'Maid & Domestic Worker Visa', href: '/maid-visa' }
      ]
    },
    {
      title: 'Documents & Legal Services',
      links: [
        { label: 'Document Attestation', href: '/attestation' },
        { label: 'Certified Legal Translation', href: '/legal-translation' },
        { label: 'Power of Attorney (POA) Drafting', href: '/poa' },
        { label: 'Wills & Testament Registration', href: '/wills' }
      ]
    },
    {
      title: 'Support & Company',
      links: [
        { label: 'DLD Property Trustee Support', href: '/dld-trustee' },
        { label: 'About EmiratesVisa.ae', href: '/about-us' },
        { label: 'Informational Articles', href: '/articles' },
        { label: 'Contact Support Team', href: '/contact-us' },
        { label: 'Terms of Service & Privacy Policy', href: '/terms' }
      ]
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Navigation Map</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4">
              Site <span className="text-[#009B3A]">Map</span>.
            </h1>
            <p className="text-base text-[#4B5563]">
              Quick links to navigate through all pages, visas, and legal services offered on EmiratesVisa.ae.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sitemapGroups.map((group, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#F7F8FA] rounded-3xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <Map className="text-[#009B3A]" size={20} />
                  <h3 className="text-lg font-bold text-[#111827]">{group.title}</h3>
                </div>
                <ul className="space-y-4">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link href={link.href} className="flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#009B3A] font-semibold transition-colors group">
                        <ChevronRight size={14} className="text-[#EF3340] shrink-0 transition-transform group-hover:translate-x-1" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
