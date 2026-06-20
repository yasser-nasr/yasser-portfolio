"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SelectedWorkGrid({ className = "" }: { className?: string }) {
  return (
    <Reveal
      variants={container}
      className={`grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-5 lg:gap-10 ${className}`}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          variants={item}
          className={project.featured ? "lg:col-span-3" : "lg:col-span-2"}
        >
          <ProjectCard project={project} index={index} />
        </motion.div>
      ))}
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View case study: ${project.title}`}
      className="group block"
    >
      <div
        className={`relative overflow-hidden rounded-xl border border-edge transition-colors duration-300 group-hover:border-ink/25 ${
          project.featured ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        <ProjectVisual project={project} index={index} />

        <span
          aria-hidden="true"
          className="absolute right-4 top-4 h-2 w-2 scale-0 rounded-sm bg-ink-soft/60 transition-transform duration-300 group-hover:scale-100"
        />

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-surface/70 px-4 py-3 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
          <span className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            {project.category}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium text-ink md:text-xl">{project.title}</h3>
        <span className="text-sm text-ink-soft">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">{project.category}</p>
      <p className="mt-2 max-w-md text-sm text-ink-soft">{project.statement}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm text-ink">
        View Case Study
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.04]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 75% 10%, var(--bg-card) 0%, transparent 70%), radial-gradient(ellipse 50% 45% at 15% 95%, var(--bg-deep) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span
          className={`font-display text-ink-soft/25 ${
            project.featured ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-ink-soft/50">
          {project.category}
        </span>
      </div>
    </div>
  );
}
