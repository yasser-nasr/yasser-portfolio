"use client";

import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/data/capabilities";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CapabilitiesList({
  className = "",
  headingLevel = "h3",
}: {
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Reveal variants={container} className={`border-t border-edge ${className}`}>
      {capabilities.map((capability) => (
        <motion.div
          key={capability.number}
          variants={row}
          className="group grid gap-2 border-b border-edge py-8 md:grid-cols-[100px_1fr] md:gap-8"
        >
          <span className="font-display text-2xl text-ink-faint transition-colors group-hover:text-ink md:text-3xl">
            {capability.number}
          </span>
          <div>
            <Heading className="text-xl text-ink md:text-2xl">{capability.title}</Heading>
            <p className="mt-2 max-w-xl text-sm text-ink-soft md:text-base">
              {capability.description}
            </p>
          </div>
        </motion.div>
      ))}
    </Reveal>
  );
}
