"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { expertiseGroups } from "@/data/resume";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ResumeExpertise() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Expertise / 04
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Core Expertise
      </HeadingReveal>

      <Reveal variants={container} className="mt-12 grid gap-6 sm:grid-cols-2">
        {expertiseGroups.map((group) => (
          <motion.div
            key={group.heading}
            variants={item}
            className="rounded-2xl border border-edge bg-surface-card/30 p-6 backdrop-blur-sm md:p-7"
          >
            <h3 className="text-lg font-semibold text-ink">{group.heading}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((entry) => (
                <li key={entry} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-ink-soft/50"
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </Reveal>
    </div>
  );
}
