interface BadgeProps {
  label: string;
  className?: string;
}

const TAG_PALETTE: Record<string, string> = {
  gastronomia: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  saude:       'bg-sky-500/15    text-sky-300    border-sky-500/25',
  juridico:    'bg-violet-500/15 text-violet-300 border-violet-500/25',
  beleza:      'bg-pink-500/15   text-pink-300   border-pink-500/25',
  educacao:    'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
  tecnologia:  'bg-cyan-500/15   text-cyan-300   border-cyan-500/25',
};

export function Badge({ label, className = '' }: BadgeProps) {
  const color =
    TAG_PALETTE[label.toLowerCase()] ??
    'bg-la-green/10 text-la-green border-la-green/20';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-full border ${color} ${className}`}
    >
      {label}
    </span>
  );
}
