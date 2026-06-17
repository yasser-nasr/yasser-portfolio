"use client";

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

export default function WorkGrid({
  className = "",
  cardHeadingLevel = "h3",
}: {
  className?: string;
  cardHeadingLevel?: "h2" | "h3";
}) {
  return (
    <Reveal
      variants={container}
      className={`grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 ${className}`}
    >
      {workProjects.map((project) => (
        <motion.div key={project.slug} variants={item}>
          <WorkCard project={project} headingLevel={cardHeadingLevel} />
        </motion.div>
      ))}
    </Reveal>
  );
}
