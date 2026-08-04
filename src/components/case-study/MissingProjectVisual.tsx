export default function MissingProjectVisual({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div
      role="img"
      aria-label={`${label} visual is awaiting approved assets.`}
      className={`relative grid min-h-56 place-items-center overflow-hidden rounded-xl border border-dashed border-edge bg-surface-card/40 p-8 text-center ${className}`}
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
      <div className="relative">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-ink-faint">
          Unpublished preview · Visual pending
        </p>
        <p className="mt-3 text-base text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
