import type { CSSProperties } from "react";

const COLUMNS = 8;
const ROWS = 12;
const CELL_COUNT = COLUMNS * ROWS;

function staggerDelay(index: number) {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  const centerCol = (COLUMNS - 1) / 2;
  const centerRow = (ROWS - 1) / 2;
  const distance = Math.hypot(col - centerCol, row - centerRow);
  return distance * 0.035;
}

export default function PixelReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {children}
        <div
          aria-hidden="true"
          className="pixel-reveal-grid pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)` }}
        >
          {Array.from({ length: CELL_COUNT }).map((_, index) => (
            <span
              key={index}
              className="pixel-reveal-cell bg-surface"
              style={{ "--pixel-delay": `${0.15 + staggerDelay(index)}s` } as CSSProperties}
            />
          ))}
        </div>
    </div>
  );
}
