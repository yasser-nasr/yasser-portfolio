"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
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

export default function Capabilities() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <HeadingReveal as="h2" className="text-3xl font-semibold text-ink md:text-4xl">
          Capabilities
        </HeadingReveal>

        <Reveal variants={container} className="mt-12 border-t border-edge">
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
                <h3 className="text-xl text-ink md:text-2xl">{capability.title}</h3>
                <p className="mt-2 max-w-xl text-sm text-ink-soft md:text-base">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
