"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { snapshotStats } from "@/data/resume";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ResumeSnapshot() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Snapshot / 02
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Professional Snapshot
      </HeadingReveal>

      <Reveal
        variants={container}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {snapshotStats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={item}
            className="rounded-2xl border border-edge bg-surface-card/30 p-6 backdrop-blur-sm"
          >
            <p className="font-display text-2xl text-ink">{stat.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{stat.description}</p>
          </motion.div>
        ))}
      </Reveal>
    </div>
  );
}
