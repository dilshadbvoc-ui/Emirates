export default function FeaturedLogos() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">As featured in</span>
      <div className="flex items-center gap-4 sm:gap-6 opacity-60">
        <span className="text-sm font-bold text-[#111827]">GULF NEWS</span>
        <span className="text-sm font-bold text-[#111827] italic">Khaleej Times</span>
        <span className="text-sm font-bold text-[#111827]">The National</span>
      </div>
    </div>
  );
}
