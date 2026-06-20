"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { experienceEntries } from "@/data/resume";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ResumeExperience() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Experience / 05
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Professional Experience
      </HeadingReveal>

      <Reveal
        variants={container}
        className="mt-12 space-y-12 border-l border-edge pl-6 md:space-y-14"
      >
        {experienceEntries.map((entry) => (
          <motion.div key={entry.company} variants={item} className="group relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.65rem] top-2 h-1.5 w-1.5 rounded-sm bg-ink-soft/50 transition-transform duration-300 group-hover:scale-150"
            />
            <h3 className="text-xl font-semibold text-ink md:text-2xl">{entry.company}</h3>
            <p className="mt-1 text-base text-ink-soft">{entry.title}</p>
            <p className="mt-1 text-sm text-ink-faint">
              {entry.location} &middot; {entry.date}
            </p>

            <ul className="mt-4 max-w-2xl space-y-2">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-ink-soft/40"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </Reveal>
    </div>
  );
}
