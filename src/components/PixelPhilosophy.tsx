"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const cell: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

// Decorative only — a small pixel cluster echoing the hero's pixel-reveal
// motif at a much smaller scale, not a literal mark.
const CELL_PATTERN = [
  1, 1, 0, 0, 1, 1,
  1, 0, 1, 1, 0, 1,
  0, 1, 1, 1, 1, 0,
  0, 1, 1, 1, 1, 0,
  1, 0, 1, 1, 0, 1,
  1, 1, 0, 0, 1, 1,
];

export default function PixelPhilosophy() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal
          variants={gridContainer}
          className="mx-auto mb-8 grid w-24 grid-cols-6 gap-1"
          aria-hidden="true"
        >
          {CELL_PATTERN.map((on, i) => (
            <motion.span
              key={i}
              variants={cell}
              className={`aspect-square rounded-sm ${on ? "bg-ink-soft" : "bg-transparent"}`}
            />
          ))}
        </Reveal>

        <HeadingReveal as="h2" className="text-3xl font-semibold text-ink md:text-4xl">
          The Pixel Philosophy
        </HeadingReveal>

        <Reveal>
          <p className="mt-6 text-lg text-ink-soft">
            Every digital experience begins with a single intentional decision —
            the smallest detail in a layout, a word, a color, a transition. The
            pixel is a reminder that clarity and connection start at the level
            of detail, long before they reach the level of a complete system.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
