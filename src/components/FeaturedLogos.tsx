export default function FeaturedLogos() {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">As featured in</span>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-extrabold text-[#4B5563] bg-gray-50/50 border border-gray-100/80 px-3 py-1 rounded-md shadow-xs">GULF NEWS</span>
        <span className="text-[11px] font-extrabold text-[#4B5563] bg-gray-50/50 border border-gray-100/80 px-3 py-1 rounded-md shadow-xs italic">Khaleej Times</span>
        <span className="text-[11px] font-extrabold text-[#4B5563] bg-gray-50/50 border border-gray-100/80 px-3 py-1 rounded-md shadow-xs">The National</span>
      </div>
    </div>
  );
}
