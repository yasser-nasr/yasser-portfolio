"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { awardItems } from "@/data/resume";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ResumeAwards() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Awards / 07
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Awards &amp; Recognition
      </HeadingReveal>

      <Reveal variants={container} className="mt-12 grid gap-4 sm:grid-cols-2">
        {awardItems.map((award) => (
          <motion.div
            key={award.title}
            variants={item}
            className="rounded-2xl border border-edge bg-surface-card/30 p-6 backdrop-blur-sm"
          >
            <p className="text-base font-semibold text-ink">{award.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{award.subtitle}</p>
          </motion.div>
        ))}
      </Reveal>
    </div>
  );
}
