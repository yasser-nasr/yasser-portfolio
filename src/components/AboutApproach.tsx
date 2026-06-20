"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { approachStages, whatIBring } from "@/data/approach";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function AboutApproach() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Approach / 05
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        From Understanding to Visual Experience
      </HeadingReveal>

      <Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          I combine communication thinking, creative craft, and
          multidisciplinary execution to build connected design systems
          rather than isolated visuals.
        </p>
      </Reveal>

      <Reveal
        variants={container}
        className="mt-14 flex flex-col gap-10 md:flex-row md:items-start md:gap-0"
      >
        {approachStages.map((stage, index) => (
          <Fragment key={stage.title}>
            <motion.div variants={item} className="md:flex-1 md:px-4 md:first:pl-0 md:last:pr-0">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-ink/15 bg-surface-card/50 font-display text-xs text-ink-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.description}</p>
            </motion.div>

            {index < approachStages.length - 1 && (
              <div aria-hidden="true" className="hidden md:flex md:items-center md:pt-4">
                <span className="h-px w-6 bg-edge" />
              </div>
            )}
          </Fragment>
        ))}
      </Reveal>

      <Reveal className="mt-14 rounded-2xl border border-ink/10 bg-surface-card/30 p-6 backdrop-blur-sm md:p-8">
        <h3 className="text-lg font-semibold text-ink">What I Bring</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whatIBring.map((entry) => (
            <li key={entry} className="flex items-start gap-3 text-sm text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-ink-soft/50"
              />
              {entry}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
