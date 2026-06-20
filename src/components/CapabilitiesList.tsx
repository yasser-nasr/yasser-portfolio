"use client";

import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/data/capabilities";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cell: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function CapabilitiesList({ className = "" }: { className?: string }) {
  return (
    <Reveal
      variants={container}
      className={`relative grid grid-cols-1 overflow-hidden rounded-2xl border border-edge sm:grid-cols-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-ink-soft/50 sm:block"
      />

      {capabilities.map((capability, index) => {
        const emphasized = index < 2;
        const isSecondColumn = index % 2 === 1;
        const isSecondRow = index >= 2;
        const isFirst = index === 0;

        return (
          <motion.div
            key={capability.number}
            variants={cell}
            className={`group relative border-edge p-5 transition-colors duration-300 hover:bg-surface-card/40 md:p-7 ${
              emphasized ? "bg-surface-card/30" : "bg-surface-card/15"
            } ${!isFirst ? "border-t" : ""} ${isSecondRow ? "sm:border-t" : "sm:border-t-0"} ${
              isSecondColumn ? "sm:border-l" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute right-4 top-4 h-1.5 w-1.5 scale-0 rounded-sm bg-ink-soft/50 transition-transform duration-300 group-hover:scale-100"
            />

            <span className="font-display text-xl text-ink-faint transition-colors group-hover:text-ink md:text-2xl">
              {capability.number}
            </span>
            <h3
              className={`mt-3 text-ink ${emphasized ? "text-lg md:text-xl" : "text-base md:text-lg"}`}
            >
              {capability.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
              {capability.description}
            </p>
          </motion.div>
        );
      })}
    </Reveal>
  );
}
