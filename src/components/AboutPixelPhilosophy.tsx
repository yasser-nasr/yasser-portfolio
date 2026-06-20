"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};

const block: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (targetOpacity: number) => ({
    opacity: targetOpacity,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  }),
};

// Modular blocks of varied size and opacity, arranged loosely rather than as
// a uniform grid -- a restrained nod to "pixels forming a whole" rather than
// literal pixel art.
const BLOCKS = [
  { top: "4%", left: "10%", size: 20, opacity: 0.85 },
  { top: "2%", left: "34%", size: 12, opacity: 0.45 },
  { top: "14%", left: "58%", size: 24, opacity: 0.65 },
  { top: "10%", left: "82%", size: 12, opacity: 0.5 },
  { top: "32%", left: "16%", size: 14, opacity: 0.4 },
  { top: "36%", left: "44%", size: 10, opacity: 0.6 },
  { top: "30%", left: "68%", size: 16, opacity: 0.3 },
  { top: "52%", left: "28%", size: 22, opacity: 0.75 },
  { top: "58%", left: "60%", size: 12, opacity: 0.4 },
  { top: "72%", left: "12%", size: 10, opacity: 0.35 },
  { top: "76%", left: "40%", size: 18, opacity: 0.55 },
  { top: "70%", left: "70%", size: 14, opacity: 0.45 },
  { top: "88%", left: "54%", size: 10, opacity: 0.4 },
];

export default function AboutPixelPhilosophy() {
  return (
    <div className="mt-24">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
            Philosophy / 03
          </p>

          <HeadingReveal
            as="h2"
            className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
          >
            Why Pixels?
          </HeadingReveal>

          <Reveal>
            <div className="mt-8 max-w-md space-y-5">
              <p className="text-lg leading-relaxed text-ink-soft">
                Every digital visual experience begins with a pixel — the
                smallest unit that contributes to the complete image.
              </p>
              <p className="text-lg leading-relaxed text-ink-soft">
                For me, the pixel represents detail, structure, and
                intention. My approach to design follows the same
                principle: start with the smallest decisions, build a clear
                system, and create a complete visual experience that people
                can understand, feel, and remember.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-8 font-display text-xl uppercase tracking-[0.1em] text-ink md:text-2xl">
              Every Great Visual Starts with a Pixel.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-125 rounded-full bg-surface-card opacity-50 blur-3xl"
          />
          <Reveal
            variants={container}
            className="relative h-full w-full overflow-hidden rounded-2xl border border-ink/10 bg-surface-card/30 shadow-2xl backdrop-blur-md"
          >
            {BLOCKS.map((b, index) => (
              <motion.span
                key={index}
                variants={block}
                custom={b.opacity}
                className="absolute rounded-sm bg-ink-soft"
                style={{ top: b.top, left: b.left, width: b.size, height: b.size }}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
