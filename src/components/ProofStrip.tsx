"use client";

import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import { proofItems } from "@/data/proof";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProofStrip() {
  return (
    <section className="relative z-10 -mt-8 md:-mt-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          variants={container}
          className="proof-dock rounded-2xl backdrop-blur-md"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {proofItems.map((stat, index) => {
              const isSecondColumn = index % 2 === 1;
              const isSecondRow = index >= 2;

              return (
                <motion.div
                  key={stat.label}
                  variants={item}
                  className={`px-6 py-8 text-center md:py-9 md:text-left ${
                    isSecondColumn ? "border-l border-ink/10" : ""
                  } ${isSecondRow ? "border-t border-ink/10 md:border-t-0 md:border-l" : ""}`}
                >
                  <p className="font-display text-2xl text-ink md:text-3xl">{stat.lead}</p>
                  <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
