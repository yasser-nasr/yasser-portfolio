"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { industryGroups, markets } from "@/data/markets";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const group: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function MarketsIndustries() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-surface-card opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
          Exposure / 05
        </p>

        <HeadingReveal
          as="h2"
          className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          Markets &amp; Industries
        </HeadingReveal>

        <Reveal>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Experience shaped by working across different markets, business
            environments, audiences, and communication needs.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-soft md:text-base">
              Markets
            </p>

            <Reveal
              variants={container}
              className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-edge sm:grid-cols-4"
            >
              {markets.map((market, index) => {
                const isSecondColumn = index % 2 === 1;
                const isSecondRow = index >= 2;

                return (
                  <motion.div
                    key={market}
                    variants={chip}
                    className={`px-4 py-6 text-center transition-colors duration-300 hover:bg-surface-card/45 ${
                      isSecondColumn ? "border-l" : ""
                    } ${isSecondRow ? "border-t sm:border-t-0 sm:border-l" : ""} border-edge bg-surface-card/20`}
                  >
                    <span className="font-display text-base uppercase tracking-wide text-ink md:text-lg">
                      {market}
                    </span>
                  </motion.div>
                );
              })}
            </Reveal>
          </div>

          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-soft md:text-base">
              Industries
            </p>

            <Reveal variants={container} className="mt-4 space-y-7 border-l border-edge pl-6">
              {industryGroups.map((industryGroup) => (
                <motion.div key={industryGroup.category} variants={group} className="group relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.65rem] top-2 h-1.5 w-1.5 rounded-sm bg-ink-soft/50 transition-transform duration-300 group-hover:scale-150"
                  />
                  <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-soft transition-colors duration-300 group-hover:text-ink md:text-base">
                    {industryGroup.category}
                  </p>
                  <p className="mt-2 text-base text-ink md:text-lg">
                    {industryGroup.items.join(" · ")}
                  </p>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
