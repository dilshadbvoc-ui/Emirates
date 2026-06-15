import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import SectionBadge from './SectionBadge';
import GoogleReviews from './GoogleReviews';

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionBadge number="5" text="Real people" gold />
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">
          What <span className="text-[#EF3340]">customers</span> say
        </h2>
        <p className="text-[#4B5563] mb-8 max-w-lg">
          Verified reviews from UAE residents who used our service.
        </p>

        {/* Rating Bar */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-3xl font-bold text-[#111827]">5.0</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} className="text-[#C9963B]" fill="#C9963B" />
            ))}
          </div>
          <span className="text-sm text-[#6B7280]">
            <strong className="text-[#111827]">290</strong> verified reviews &middot; last 12 months
          </span>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover-shadow-premium"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-[#C9963B]" fill="#C9963B" />
                ))}
              </div>
              <p className="text-[#111827] mb-4 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-[#4B5563]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.timeAgo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="flex justify-center">
          <GoogleReviews />
        </div>
      </div>
    </section>
  );
}
