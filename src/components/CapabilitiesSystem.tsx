"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const FLOW_STEPS = ["Brand System", "Digital Experience", "Campaign Communication", "Multimedia"];

export default function CapabilitiesSystem() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        System / 02
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Built to Work Together
      </HeadingReveal>

      <Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Strong visual communication does not happen through isolated
          deliverables. I connect identity, digital experiences, campaigns,
          and multimedia into one consistent system.
        </p>
      </Reveal>

      <Reveal
        variants={container}
        className="relative mt-14 rounded-2xl border border-ink/10 bg-surface-card/20 p-8 backdrop-blur-sm md:p-10"
      >
        <div
          aria-hidden="true"
          className="absolute left-10 right-10 top-11 hidden h-px bg-edge md:block"
        />
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-6">
          {FLOW_STEPS.map((step) => (
            <motion.div
              key={step}
              variants={item}
              className="relative flex items-center gap-3 md:flex-col md:items-start md:gap-4"
            >
              <span
                aria-hidden="true"
                className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-sm border border-ink/40 bg-surface-deep"
              />
              <span className="text-sm font-medium text-ink md:text-base">{step}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
