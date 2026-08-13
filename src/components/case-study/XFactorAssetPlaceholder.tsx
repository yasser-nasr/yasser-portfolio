const ratios = {
  landscape: "aspect-[16/9]",
  wide: "aspect-[2/1]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  reel: "aspect-[9/16]",
  og: "aspect-[1200/630]",
} as const;

export default function XFactorAssetPlaceholder({
  label,
  ratio = "landscape",
  className = "",
}: {
  label: string;
  ratio?: keyof typeof ratios;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — temporary asset placeholder`}
      className={`relative grid min-w-0 w-full place-items-center overflow-hidden rounded-xl border border-dashed border-edge bg-surface-card/40 p-5 text-center ${ratios[ratio]} ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative max-w-[18rem]">
        <span className="font-display text-xs uppercase tracking-[0.2em] text-ink-faint">
          Visual pending
        </span>
        <p className="mt-3 text-sm leading-6 text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
