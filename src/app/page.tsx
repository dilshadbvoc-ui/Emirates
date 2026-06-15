"use client";

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calculator, ArrowRight, Heart, Baby, Users, Briefcase,
  Check, X, MessageCircle, FileText
} from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';
import FeaturedLogos from '@/components/FeaturedLogos';
import GoogleReviews from '@/components/GoogleReviews';
import FAQSection from '@/components/FAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AuthorAttribution from '@/components/AuthorAttribution';
import BlogSection from '@/components/BlogSection';
import FinalCTA from '@/components/FinalCTA';
import ProcessTimeline from '@/components/ProcessTimeline';
import VisaCalculator from '@/components/VisaCalculator';
import { eligibilityCards } from '@/data/eligibility';
import { homeFAQs } from '@/data/faq';
import {
  newVisaSteps, renewVisaSteps, sponsorDocuments, dependentDocuments, renewDocuments
} from '@/data/processSteps';
import type { DocumentItem } from '@/data/processSteps';

const DocumentList = ({ items, label }: { items: DocumentItem[]; label: string }) => (
  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-semibold text-[#111827]">Documents you need</h4>
      <span className="text-xs text-[#6B7280] uppercase tracking-wider">{label}</span>
    </div>
    <div className="space-y-3">
      {items.map((doc) => (
        <div key={doc.title} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
            <FileText size={14} className="text-[#EF3340]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#111827]">{doc.title}</p>
            <p className="text-xs text-[#6B7280]">{doc.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [activeProcessTab, setActiveProcessTab] = useState<'new' | 'renew'>('new');
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  useEffect(() => {
    const handleHashAndTab = () => {
      const hash = window.location.hash;
      if (hash === '#pane-renew') {
        setActiveProcessTab('renew');
      } else if (hash === '#pane-new') {
        setActiveProcessTab('new');
      }
    };

    const handleCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'new' || detail === 'renew') {
        setActiveProcessTab(detail);
      }
    };

    // Run on mount
    handleHashAndTab();

    window.addEventListener('hashchange', handleHashAndTab);
    window.addEventListener('change-visa-tab', handleCustomEvent);
    return () => {
      window.removeEventListener('hashchange', handleHashAndTab);
      window.removeEventListener('change-visa-tab', handleCustomEvent);
    };
  }, []);

  const openCalculator = useCallback(() => setCalculatorOpen(true), []);
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  const iconMap: Record<string, React.ReactNode> = {
    heart: <Heart size={22} />,
    baby: <Baby size={22} />,
    users: <Users size={22} />,
    briefcase: <Briefcase size={22} />,
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">Free UAE Family Visa Tool</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4">
                Know your <span className="text-[#EF3340]">exact</span> family visa cost in under <span className="text-[#EF3340]">30s</span>.
              </h1>
              <p className="text-base text-[#4B5563] mb-6 max-w-md">
                Itemized government fees for a new visa or a renewal — no signup, no phone number, just clear answers.
              </p>

              <button onClick={openCalculator} className="w-full sm:w-auto px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-3 mb-4">
                <Calculator size={18} /> Calculate Visa Cost <ArrowRight size={18} />
              </button>

              <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-8">
                <Check size={16} className="text-green-600 shrink-0" />
                <span>Free &middot; No signup &middot; Itemized in under 30 seconds</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <FeaturedLogos />
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <GoogleReviews compact />
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative pb-10 sm:pb-0">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#FDE8EA] to-white aspect-[4/3] relative">
                  <img src="/images/hero-family.jpg" alt="Happy family on Dubai balcony with Burj Khalifa view" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-[#009B3A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">Live gov fees</div>
                </div>
                {/* Floating card — absolute on sm+, below image on mobile */}
                <div className="sm:absolute sm:-bottom-6 sm:left-4 bg-white rounded-xl shadow-lg border border-gray-100 w-full sm:w-[300px] overflow-hidden mt-4 sm:mt-0">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-auto text-[10px] text-[#6B7280] uppercase tracking-wider">visa cost estimator</span>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-3">Example &middot; Spouse (new visa)</p>
                    {[
                      { label: 'Entry permit', amount: 339 },
                      { label: 'Emirates ID', amount: 354 },
                      { label: 'Medical fitness', amount: 270 },
                      { label: 'Visa stamping', amount: 410 },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-[#4B5563]">{item.label}</span>
                        <span className="text-sm font-medium text-[#111827]">{item.amount}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3 mt-2 border-t-2 border-[#111827]">
                      <span className="text-sm font-semibold text-[#111827]">Government fees</span>
                      <span className="text-lg font-bold text-[#EF3340]">AED 1,373</span>
                    </div>
                  </div>
                  <button onClick={openCalculator} className="w-full py-2.5 bg-[#EF3340] hover:bg-[#D62B35] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                    <Calculator size={14} /> Get my exact figure
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="1" text="Check if you qualify" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">
              Who can you <span className="text-[#009B3A]">sponsor</span>?
            </h2>
            <p className="text-[#4B5563] mb-10 max-w-xl">
              A family visa lets you bring your spouse, children, or parents to live in the UAE under your sponsorship. Each category has its own minimum salary set by the government.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eligibilityCards.map((card) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#009B3A] mb-4">{iconMap[card.icon]}</div>
                <h3 className="text-lg font-semibold text-[#111827] mb-1">{card.title}</h3>
                <p className="text-sm font-bold text-[#009B3A] mb-2">{card.salary}</p>
                <p className="text-sm text-[#4B5563] leading-relaxed">{card.description}</p>
                {card.link && (
                  <Link href={card.link} className="inline-flex items-center gap-1 text-sm text-[#EF3340] hover:text-[#D62B35] mt-3 font-medium">
                    {card.linkLabel} <ArrowRight size={14} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Guide Section */}
      <section id="pane-new" className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="2" text="Do-it-yourself guide" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">
              The full process, <span className="text-[#EF3340]">step by step</span>.
            </h2>
            <p className="text-[#4B5563] mb-8 max-w-xl">
              Everything you need to do it yourself — every document and stage. The brand-new application is first, the renewal process follows below.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveProcessTab('new')} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeProcessTab === 'new' ? 'bg-[#EF3340] text-white' : 'bg-white text-[#4B5563] hover:bg-gray-100'}`}>New Visa</button>
            <button onClick={() => setActiveProcessTab('renew')} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeProcessTab === 'renew' ? 'bg-[#EF3340] text-white' : 'bg-white text-[#4B5563] hover:bg-gray-100'}`}>Renewal</button>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280] sm:ml-2">
              <span className="font-semibold text-[#111827]">{activeProcessTab === 'new' ? 'New Family Visa' : 'Family Visa Renewal'}</span>
              <span className="bg-white px-2.5 py-1 rounded-full text-xs font-medium">{activeProcessTab === 'new' ? '8 steps' : '5 steps'}</span>
              <span className="bg-white px-2.5 py-1 rounded-full text-xs font-medium">{activeProcessTab === 'new' ? '5–10 days' : '3–5 days'}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
            {activeProcessTab === 'new' ? (
              <><DocumentList items={sponsorDocuments} label="Sponsor — you" /><DocumentList items={dependentDocuments} label="Dependent — family member" /></>
            ) : (
              <><DocumentList items={renewDocuments} label="Sponsor & dependent" />
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"><Check size={14} className="text-emerald-600" /></div>
                    <div>
                      <p className="text-sm text-emerald-800"><strong>Renew within 30 days before expiry.</strong> After a visa expires there is a grace period, but staying beyond it triggers daily overstay fines. Renewing early avoids both fines and travel issues.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {activeProcessTab === 'new' && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-red-50 rounded-xl p-4 border border-red-100 mb-10 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#EF3340] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">!</div>
              <p className="text-sm text-red-800"><strong>Start attestation early.</strong> Foreign marriage and birth certificates must be attested by your home country and UAE MOFA. This usually takes longer than the visa itself. <Link href="/attestation" className="underline font-medium">See attestation &rarr;</Link></p>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <ProcessTimeline steps={activeProcessTab === 'new' ? newVisaSteps : renewVisaSteps} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-8 p-4 bg-white rounded-xl border border-gray-100">
            <p className="text-sm text-[#4B5563]"><strong>Total time:</strong> {activeProcessTab === 'new' ? 'Roughly 5–10 working days once documents (including attestation) are ready. Attestation itself can take much longer — start it as early as possible.' : '3–5 working days. Renew within 30 days before expiry to avoid overstay fines.'}</p>
          </motion.div>

          <div className="sticky bottom-4 mt-8 p-4 bg-[#EF3340]/95 backdrop-blur-sm rounded-xl flex flex-col sm:flex-row gap-3 justify-between items-center">
            <button onClick={openCalculator} className="px-6 py-2.5 bg-white text-[#EF3340] rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"><Calculator size={16} /> Calculate {activeProcessTab === 'new' ? 'new' : 'renewal'} visa cost</button>
            <a href="https://wa.me/773690993" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white/20 text-white rounded-full font-medium text-sm hover:bg-white/30 transition-colors">Ask a question</a>
          </div>
        </div>
      </section>

      {/* Cost Calculator CTA */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="3" text="What it costs" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Your exact cost in under <span className="text-[#EF3340]">30 seconds</span>.</h2>
            <p className="text-sm text-[#6B7280] uppercase tracking-wider mb-3">Free calculator &middot; estimate in AED</p>
            <p className="text-[#4B5563] mb-8">Answer a few questions about who you&apos;re sponsoring and whether it&apos;s new or a renewal, and see every fee broken down clearly. Use it as many times as you like.</p>
            <FeaturedLogos />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-8">
            <button onClick={openCalculator} className="px-8 py-4 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md inline-flex items-center gap-3">
              <Calculator size={18} /> Calculate Visa Cost <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="4" text="Your choice" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-10">Do it yourself, or <span className="text-[#EF3340]">we handle it</span>.</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#111827] mb-1">Path A</h3>
              <h4 className="text-lg font-bold text-[#111827] mb-4">Do it yourself</h4>
              <p className="text-sm text-[#4B5563] mb-6">You pay only the government fees, but you handle everything.</p>
              <ul className="space-y-3 mb-6">
                {['Apply via UAE Pass, GDRFA or ICP', 'Book your own medical & biometric appointments', 'Small document errors can cause rejection — you reapply', 'No support if something unexpected comes up'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5"><X size={16} className="text-red-500 shrink-0 mt-0.5" /><span className="text-sm text-[#4B5563]">{item}</span></li>
                ))}
              </ul>
              <a href="https://uaepass.ae/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#EF3340] hover:text-[#D62B35] transition-colors">Start with UAE Pass &rarr;</a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#EF3340] shadow-md relative">
              <div className="absolute top-4 right-4 bg-[#EF3340] text-white text-xs font-semibold px-3 py-1 rounded-full">Recommended</div>
              <h3 className="text-xl font-semibold text-[#111827] mb-1">Path B</h3>
              <h4 className="text-lg font-bold text-[#111827] mb-4">We handle it for you</h4>
              <p className="text-sm text-[#4B5563] mb-6">Government fees plus a service charge. We do the typing, booking and follow-ups.</p>
              <ul className="space-y-3 mb-6">
                {['100% on WhatsApp — no office visits', 'We pre-check documents to avoid rejection', 'Medical & biometric centres booked for you', '1,000+ visas / month — we know the edge cases', 'Rider service if originals are needed'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5"><Check size={16} className="text-green-600 shrink-0 mt-0.5" /><span className="text-sm text-[#4B5563]">{item}</span></li>
                ))}
              </ul>
              <a href="https://wa.me/773690993" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full text-sm font-semibold transition-colors inline-flex items-center gap-2"><MessageCircle size={16} /> Start on WhatsApp</a>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <AuthorAttribution />
      <BlogSection />

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge number="6" text="Still wondering?" gold />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">Frequently asked <span className="text-[#EF3340]">questions</span></h2>
            <p className="text-[#4B5563] mb-8">Real questions from real customers. Tap to expand.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FAQSection faqs={homeFAQs} />
          </motion.div>
        </div>
      </section>

      <FinalCTA onCalculator={openCalculator} />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
