"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { journeyStages, mentoringHighlight } from "@/data/journey";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function AboutCareerJourney() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Journey / 04
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Built Through Experience
      </HeadingReveal>

      <Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          My path has developed through independent work, agency
          collaboration, multidisciplinary projects, GCC market experience,
          and design education.
        </p>
      </Reveal>

      <Reveal
        variants={container}
        className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6"
      >
        {journeyStages.map((stage, index) => (
          <motion.div key={stage.title} variants={item} className={index % 2 === 1 ? "md:mt-8" : ""}>
            <div className="border-t border-edge pt-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-ink/15 bg-surface-card/50 font-display text-xs text-ink-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.description}</p>
            </div>
          </motion.div>
        ))}
      </Reveal>

      <Reveal className="mt-12 rounded-2xl border border-ink/10 bg-surface-card/40 p-6 backdrop-blur-sm md:p-8">
        <p className="text-lg leading-relaxed text-ink md:text-xl">{mentoringHighlight}</p>
      </Reveal>
    </div>
  );
}
