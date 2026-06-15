import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { FAQItem } from '@/data/faq';

interface Props {
  faqs: FAQItem[];
  initialCount?: number;
}

export default function FAQSection({ faqs, initialCount = 5 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialCount);

  return (
    <div className="space-y-3">
      {visibleFaqs.map((faq, index) => (
        <div
          key={index}
          className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
            openIndex === index 
              ? 'border-[#EF3340]/40 bg-red-50/10 shadow-xs' 
              : 'border-gray-100 hover:border-gray-250'
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#111827] text-sm sm:text-base pr-4">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0"
            >
              <Plus size={20} className="text-[#6B7280]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
              >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                  <p className="text-sm text-[#4B5563] leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {!showAll && faqs.length > initialCount && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-3 text-sm font-medium text-[#EF3340] hover:text-[#D62B35] transition-colors"
        >
          Load more questions
        </button>
      )}
    </div>
  );
}
