"use client";

import { motion, type Variants } from "motion/react";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { industries, markets } from "@/data/markets";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

function TagGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-[0.25em] text-ink-faint">{label}</p>
      <Reveal variants={container} className="mt-4 flex flex-wrap gap-3">
        {items.map((tagItem) => (
          <motion.span
            key={tagItem}
            variants={pill}
            className="rounded-full border border-edge px-4 py-2 text-sm text-ink-soft"
          >
            {tagItem}
          </motion.span>
        ))}
      </Reveal>
    </div>
  );
}

export default function MarketsIndustries() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <HeadingReveal as="h2" className="text-3xl font-semibold text-ink md:text-4xl">
          Markets &amp; Industries
        </HeadingReveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <TagGroup label="Markets" items={markets} />
          <TagGroup label="Industries" items={industries} />
        </div>
      </div>
    </section>
  );
}
