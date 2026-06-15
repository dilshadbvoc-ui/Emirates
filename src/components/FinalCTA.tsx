import { Calculator, MessageCircle } from 'lucide-react';

interface Props {
  onCalculator: () => void;
}

export default function FinalCTA({ onCalculator }: Props) {
  return (
    <section className="py-20 bg-[#FFF5F6]">
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
          You&apos;re informed. What&apos;s next?
        </h2>
        <p className="text-[#4B5563] mb-8">
          You&apos;ve seen everything — eligibility, documents, process and cost. Take the path that fits.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onCalculator}
            className="px-8 py-3.5 bg-[#EF3340] hover:bg-[#D62B35] text-white rounded-full font-semibold transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Calculator size={18} /> Calculate Visa Cost
          </button>
          <a
            href="https://wa.me/9718003627"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
