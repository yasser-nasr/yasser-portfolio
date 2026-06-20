"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import PixelReveal from "@/components/PixelReveal";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Minimal, subtle pixel fragments scattered around the mascot — decorative
// only, hidden on the smallest screens to keep mobile simple.
const PIXEL_FRAGMENTS = [
  { top: "0%", left: "-10%", size: 10 },
  { top: "18%", left: "96%", size: 7 },
  { top: "86%", left: "-8%", size: 8 },
  { top: "94%", left: "92%", size: 9 },
];

export default function AboutHero() {
  const prefersReducedMotion = useSafeReducedMotion();
  const reduceMotion = prefersReducedMotion === true;

  return (
    <div>
      <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <motion.div
          key={reduceMotion ? "static" : "animated"}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={container}
        >
          <motion.p
            variants={line}
            className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg"
          >
            About / 01
          </motion.p>

          <motion.h1
            variants={line}
            className="mt-6 text-4xl font-semibold leading-tight text-ink md:text-5xl"
          >
            The Designer Behind the Pixels
          </motion.h1>

          <motion.div variants={line} className="mt-8 max-w-xl space-y-5">
            <p className="text-lg leading-relaxed text-ink-soft">
              I&rsquo;m Yasser Nasr, a Senior Graphic Designer and Brand
              &amp; Digital Designer with 6+ years of experience building
              brand systems, digital experiences, and visual communication
              across Egypt and GCC markets.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              I combine creative craft, business understanding, and
              multidisciplinary execution to turn ideas into clear,
              consistent, and memorable visual experiences.
            </p>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-48 sm:w-56 md:w-full md:max-w-sm">
          {/* Restrained radial light field behind the mascot */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-150 rounded-full bg-surface-card opacity-60 blur-3xl"
          />

          {/* Faint pixel-grid texture, local to the mascot composition */}
          <div
            aria-hidden="true"
            className="absolute inset-[-15%] -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Minimal pixel fragments */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
            {PIXEL_FRAGMENTS.map((fragment, index) => (
              <span
                key={index}
                className="absolute rounded-sm bg-ink-soft/20"
                style={{
                  top: fragment.top,
                  left: fragment.left,
                  width: fragment.size,
                  height: fragment.size,
                }}
              />
            ))}
          </div>

          <div className="relative">
            {/* Restrained glass frame, no conventional card box */}
            <div
              aria-hidden="true"
              className="absolute inset-[-10%] rounded-[2rem] border border-ink/10 bg-surface-card/30 shadow-2xl backdrop-blur-md"
            />
            <PixelReveal className="p-5 md:p-7">
              <Image
                src="/brand/mascot.svg"
                alt="Yasser Nasr"
                width={160}
                height={233}
                className="h-auto w-full"
              />
            </PixelReveal>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-20 border-t border-edge md:mt-28" />
    </div>
  );
}
