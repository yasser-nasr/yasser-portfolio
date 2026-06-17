"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

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
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {children}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)` }}
        >
          {Array.from({ length: CELL_COUNT }).map((_, index) => (
            <motion.span
              key={index}
              className="bg-surface"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.15 + staggerDelay(index),
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
