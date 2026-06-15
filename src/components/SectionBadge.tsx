interface Props {
  number?: string;
  text: string;
  gold?: boolean;
}

export default function SectionBadge({ number, text, gold }: Props) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {number && (
        <span className={`text-xs font-bold ${gold ? 'text-[#009B3A]' : 'text-[#EF3340]'}`}>
          {number}
        </span>
      )}
      <span className={`text-xs font-semibold uppercase tracking-wider ${gold ? 'text-[#009B3A]' : 'text-[#6B7280]'}`}>
        {text}
      </span>
    </div>
  );
}
