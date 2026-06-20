"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { coreValues } from "@/data/values";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function AboutPrinciples() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Principles / 02
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        The Principles Behind the Work
      </HeadingReveal>

      <Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          These principles guide how I think, design, communicate, and build
          visual systems across every project.
        </p>
      </Reveal>

      <Reveal variants={container} className="mt-12 grid gap-4 sm:grid-cols-2">
        {coreValues.map((value, index) => {
          const emphasized = value.title === "Detail";
          return (
            <motion.div
              key={value.title}
              variants={item}
              className={`group relative overflow-hidden rounded-2xl border border-edge bg-surface-card/40 backdrop-blur-sm transition-colors duration-200 hover:border-ink/20 hover:bg-surface-card/60 ${
                emphasized ? "p-7 sm:row-span-2 md:p-8" : "p-6"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 h-1.5 w-1.5 rounded-sm bg-ink-soft/25 transition-transform duration-200 group-hover:scale-125"
              />

              <div className={emphasized ? "flex h-full flex-col justify-between" : ""}>
                <p
                  className={`font-display text-ink-soft/40 ${
                    emphasized ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className={emphasized ? "" : "mt-4"}>
                  <h3
                    className={`font-semibold text-ink ${
                      emphasized ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={`mt-3 text-ink-soft ${
                      emphasized ? "max-w-sm text-base leading-relaxed" : "text-sm leading-relaxed"
                    }`}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Reveal>
    </div>
  );
}
