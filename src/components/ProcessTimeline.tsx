import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { ProcessStep } from '@/data/processSteps';

interface Props {
  steps: ProcessStep[];
  stickyCta?: React.ReactNode;
}

export default function ProcessTimeline({ steps, stickyCta }: Props) {
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNum = parseInt(entry.target.getAttribute('data-step') || '0');
            setActiveSteps((prev) => [...new Set([...prev, stepNum])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = containerRef.current?.querySelectorAll('[data-step]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [steps]);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical Line */}
      <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="space-y-6 sm:space-y-8">
        {steps.map((step) => {
          const isActive = activeSteps.includes(step.number);
          return (
            <motion.div
              key={step.number}
              data-step={step.number}
              initial={{ opacity: 0, y: 15 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative flex gap-4 sm:gap-6"
            >
              {/* Number Circle */}
              <div
                className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-colors duration-300 z-10 ${
                  isActive
                    ? 'bg-[#EF3340] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="pt-1 sm:pt-2 flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-1.5">{step.title}</h4>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-3">{step.description}</p>

                {step.details && step.details.length > 0 && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EF3340] mt-2 shrink-0" />
                        <p className="text-sm text-[#4B5563]">{detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky CTA */}
      {stickyCta}
    </div>
  );
}
