"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";
import { featuredProjects, type Project } from "@/data/projects";

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
      className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 ${className}`}
    >
      {featuredProjects.map((project, index) => (
        <motion.div
          key={project.slug}
          variants={item}
          className={
            index === 0
              ? "md:col-span-2 lg:col-span-7"
              : index === 1
                ? "md:col-span-1 lg:col-span-5"
                : "md:col-span-1 lg:col-span-12"
          }
        >
          <ProjectCard project={project} index={index} />
        </motion.div>
      ))}
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardHeight =
    index === 0
      ? "min-h-[31rem] lg:min-h-[38rem]"
      : index === 1
        ? "min-h-[27rem] lg:min-h-[38rem]"
        : "min-h-[27rem] lg:min-h-[29rem]";

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View case study: ${project.title}`}
      className={`group relative isolate flex h-full ${cardHeight} overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-card shadow-[0_24px_70px_-40px_rgba(0,0,0,0.8)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_32px_90px_-42px_rgba(0,0,0,0.9)]`}
    >
      <ProjectVisual project={project} index={index} />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.1)_15%,rgba(10,10,10,0.35)_48%,rgba(10,10,10,0.94)_100%)] transition-opacity duration-500 group-hover:opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 ring-1 ring-inset ring-white/20 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex w-full flex-col justify-between p-5 text-white sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/15 font-display text-xs tracking-[0.16em] backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.market ?? project.location ? (
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
              {project.market ?? project.location}
            </span>
          ) : null}
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/65">
            {project.subtitle ?? project.category}
          </p>
          <div className="mt-3 flex items-end justify-between gap-5">
            <div>
              <h3
                className={`font-semibold leading-[1.05] tracking-[-0.025em] ${
                  index === 1 ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`mt-4 max-w-xl text-sm leading-6 text-white/70 ${
                  index === 1 ? "lg:max-w-sm" : ""
                }`}
              >
                {project.statement}
              </p>
              {project.tags?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} disciplines`}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-xl text-black transition-transform duration-500 group-hover:rotate-[-35deg] group-hover:scale-105">
              <span aria-hidden="true">↗</span>
              <span className="sr-only">View case study</span>
            </span>
          </div>
        </div>
      </div>
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
        sizes={
          index === 0
            ? "(min-width: 1024px) 58vw, 100vw"
            : index === 1
              ? "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
              : "(min-width: 1024px) 100vw, (min-width: 768px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        style={{
          objectFit: project.imageFit ?? "cover",
          objectPosition: project.imagePosition,
          backgroundColor: project.imageBackground,
          padding: project.imageFit === "contain" ? "12%" : undefined,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-[1.045]"
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
        <span className="font-display text-6xl text-ink-soft/25 md:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-ink-soft/50">
          {project.category}
        </span>
      </div>
    </div>
  );
}
