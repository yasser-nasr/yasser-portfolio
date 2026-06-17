"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";
import { workProjects } from "@/data/work";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SelectedWork() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Selected Work</h2>
          <Link href="/work" className="text-sm text-ink-soft transition-colors hover:text-ink">
            View All Work →
          </Link>
        </Reveal>

        <Reveal
          variants={container}
          className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16"
        >
          {workProjects.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <WorkCard project={project} />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
