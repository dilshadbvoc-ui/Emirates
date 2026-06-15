import { Quote } from 'lucide-react';

export default function AuthorAttribution() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
        <Quote size={24} className="text-[#009B3A] mx-auto mb-4" />
        <p className="text-sm text-[#4B5563] mb-3">
          Written by <strong className="text-[#111827]">Razeeb Abdulla</strong>, CEO &middot;{' '}
          <span className="font-semibold text-[#111827]">Emirates<span className="text-[#009B3A]">Visa</span><span className="text-[#EF3340]">.ae</span></span> &middot;{' '}
          <strong>800</strong> <span className="text-[#6B7280]">DOCS LLC SOC</span>
        </p>
        <p className="text-xs text-[#6B7280] max-w-xl mx-auto">
          &ldquo;We publish what we actually see at the counter — current rules, real fees, and the exceptions that matter. Updated within days when rules change.&rdquo; Last reviewed: <strong className="text-[#4B5563]">11 June 2026</strong>.
        </p>
      </div>
    </section>
  );
}
