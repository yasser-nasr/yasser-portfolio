"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { contributionAreas } from "@/data/contribution";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function CapabilitiesContribution() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Contribution / 03
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        How I Add Value
      </HeadingReveal>

      <Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          I contribute beyond individual design deliverables by connecting
          creative thinking, business understanding, and multidisciplinary
          execution across the full visual experience.
        </p>
      </Reveal>

      <Reveal
        variants={container}
        className="mt-14 rounded-2xl border border-ink/10 bg-surface-card/20 p-8 backdrop-blur-sm md:p-10"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-0">
          {contributionAreas.map((area, index) => (
            <Fragment key={area.title}>
              <motion.div
                variants={item}
                className={`group md:flex-1 md:px-6 md:first:pl-0 md:last:pr-0 ${
                  index === 1 ? "md:mt-10" : ""
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-ink/15 bg-surface-card/50 font-display text-xs text-ink-soft transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.description}</p>
              </motion.div>

              {index < contributionAreas.length - 1 && (
                <div aria-hidden="true" className="hidden md:flex md:items-center md:pt-4">
                  <span className="h-px w-6 bg-edge" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
