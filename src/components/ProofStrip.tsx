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
    <Reveal variants={container} className="border-y border-edge">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-12 md:grid-cols-4 md:gap-y-0 md:py-10">
        {proofItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={item}
            className={`text-center md:text-left md:px-6 ${
              index > 0 ? "md:border-l md:border-edge" : ""
            }`}
          >
            <p className="font-display text-2xl text-ink md:text-3xl">{stat.lead}</p>
            <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
}
