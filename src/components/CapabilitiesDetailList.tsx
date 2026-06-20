"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import { capabilitiesDetail, type CapabilityDetail } from "@/data/capabilitiesDetail";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CapabilitiesDetailList({ className = "" }: { className?: string }) {
  return (
    <Reveal variants={container} className={`border-t border-edge ${className}`}>
      {capabilitiesDetail.map((capability) => (
        <CapabilityRow key={capability.number} capability={capability} />
      ))}
    </Reveal>
  );
}

function CapabilityRow({ capability }: { capability: CapabilityDetail }) {
  const [expanded, setExpanded] = useState(false);
  const tagsId = `capability-tags-${capability.number}`;

  return (
    <motion.div
      variants={row}
      className="group relative border-b border-edge transition-colors duration-300 hover:bg-surface-card/25"
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={tagsId}
        aria-label={`${expanded ? "Hide" : "Show"} tags for ${capability.title}`}
        className="absolute right-2 top-8 flex items-center gap-2 text-ink-soft transition-colors hover:text-ink md:right-6"
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-sm bg-ink-soft/40 transition-colors group-hover:bg-ink-soft/70"
        />
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-300 ${
            expanded ? "rotate-90" : ""
          } md:group-hover:rotate-90`}
        >
          →
        </span>
      </button>

      <div className="grid gap-2 py-8 pr-12 md:grid-cols-[100px_1fr] md:gap-8 md:pr-16">
        <span className="font-display text-2xl text-ink-faint transition-colors group-hover:text-ink md:text-3xl">
          {capability.number}
        </span>

        <div>
          <h2 className="text-xl text-ink md:text-2xl">{capability.title}</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft md:text-base">
            {capability.description}
          </p>

          <div
            id={tagsId}
            className={`grid overflow-hidden transition-all duration-300 ease-out ${
              expanded
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0 md:group-hover:mt-4 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100"
            }`}
          >
            <div className="flex flex-wrap gap-2 overflow-hidden">
              {capability.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-edge px-3 py-1 text-xs text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
