"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

const GRID_SIZE = 8;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018 } },
};

// Each cell starts slightly offset (a loose scatter) and settles into its
// grid position — pixels "organizing" into a system rather than a plain
// fade-in. Offsets are derived from the index (not Math.random()) so the
// markup is identical on server and client.
function cellVariants(index: number): Variants {
  const col = index % GRID_SIZE;
  const row = Math.floor(index / GRID_SIZE);
  const jitterX = ((index * 53) % 17) - 8;
  const jitterY = ((index * 29) % 17) - 8;
  return {
    hidden: { opacity: 0, scale: 0.3, x: jitterX, y: jitterY },
    visible: {
      opacity: (col + row) % 3 === 0 ? 0.9 : 0.35,
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
}

export default function PixelPhilosophy() {
  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
              Philosophy / 07
            </p>

            <HeadingReveal
              as="h2"
              className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
            >
              The Pixel Philosophy
            </HeadingReveal>

            <Reveal>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                Every digital experience begins with a pixel—the smallest
                decision that shapes the complete system. It reflects how I
                work: with clarity, intention, and attention to every
                detail.
              </p>
            </Reveal>

            <Reveal>
              <p className="mt-6 font-display text-xl uppercase tracking-[0.1em] text-ink md:text-2xl">
                Every Great Visual Starts with a Pixel.
              </p>
            </Reveal>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 scale-125 rounded-full bg-surface-card opacity-40 blur-3xl"
            />
            <Reveal
              variants={container}
              aria-hidden="true"
              className="relative grid h-full w-full grid-cols-8 gap-1.5 overflow-hidden rounded-2xl border border-ink/10 bg-surface-card/30 p-5 shadow-2xl backdrop-blur-md"
            >
              {Array.from({ length: CELL_COUNT }).map((_, index) => (
                <motion.span
                  key={index}
                  variants={cellVariants(index)}
                  className="aspect-square rounded-[2px] bg-ink-soft"
                />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
