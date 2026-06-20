"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

const TOUCHPOINTS = ["Identity", "Digital", "Campaign", "Motion", "Presentation", "Print"];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const lineX: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const lineY: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const finalBlock: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Positioning() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
              System / 03
            </p>

            <HeadingReveal
              as="h2"
              className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
            >
              From the Smallest Detail to the Complete System.
            </HeadingReveal>

            <Reveal>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                Identity, websites, campaigns, motion, presentations, and
                print should not feel like separate deliverables. I connect
                them into one clear visual system—built around the same
                message, audience, and experience.
              </p>
            </Reveal>
          </div>

          <Reveal
            variants={container}
            className="relative overflow-hidden rounded-2xl border border-ink/10 bg-surface-card/20 p-6 backdrop-blur-sm md:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-48 w-48 rounded-full bg-surface-card opacity-40 blur-3xl" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TOUCHPOINTS.map((point) => (
                <motion.div
                  key={point}
                  variants={chip}
                  className="rounded-lg border border-ink/10 bg-surface-card/40 px-3 py-3 text-center"
                >
                  <span className="font-display text-xs uppercase tracking-[0.15em] text-ink-soft md:text-sm">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={lineX}
              className="mx-auto mt-6 h-px w-full max-w-[70%] origin-center bg-edge"
            />

            <div className="mx-auto flex flex-col items-center">
              <motion.div variants={lineY} className="h-6 w-px origin-top bg-edge" />
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-sm bg-ink-soft/50" />
            </div>

            <motion.div
              variants={finalBlock}
              className="mx-auto mt-2 max-w-xs rounded-xl border border-ink/15 bg-surface-card/60 px-6 py-4 text-center shadow-xl backdrop-blur-md"
            >
              <span className="text-base font-medium text-ink md:text-lg">One Visual System</span>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
