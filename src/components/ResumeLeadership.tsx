"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { leadershipItems } from "@/data/resume";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ResumeLeadership() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Leadership / 06
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        Leadership &amp; Community
      </HeadingReveal>

      <Reveal variants={container} className="mt-12 divide-y divide-edge border-t border-edge">
        {leadershipItems.map((entry) => (
          <motion.div key={entry.role + entry.organization} variants={row} className="py-8 first:pt-0">
            <h3 className="text-lg font-semibold text-ink">{entry.role}</h3>
            <p className="mt-1 text-sm text-ink-soft">{entry.organization}</p>
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
