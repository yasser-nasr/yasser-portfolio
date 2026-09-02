"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import WorkCard from "@/components/WorkCard";
import type { WorkProject } from "@/data/work";
import { workCategoryOptions, type ProjectCategory } from "@/data/workCategories";

type ActiveFilter = "all" | ProjectCategory;

export default function WorkFilter({ projects, className = "" }: {
  projects: WorkProject[];
  className?: string;
}) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const prefersReducedMotion = useReducedMotion();
  const availableFilters = workCategoryOptions.filter(({ key }) =>
    projects.some((project) => project.categories.includes(key)),
  );
  const filteredProjects = useMemo(
    () => activeFilter === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter)),
    [activeFilter, projects],
  );

  return (
    <section aria-label="Filter work by capability" className={className}>
      <div
        role="group"
        aria-label="Project capability filters"
        className="flex flex-wrap gap-2 border-y border-edge py-4"
      >
        {[{ key: "all" as const, label: "All" }, ...availableFilters].map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(key)}
              className={`min-h-10 rounded-full border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-sm ${
                isActive
                  ? "border-ink bg-ink text-surface"
                  : "border-edge text-ink-soft hover:border-ink-faint hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}.
      </p>

      {filteredProjects.length ? (
        <motion.div layout={!prefersReducedMotion} className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout={!prefersReducedMotion}
                key={project.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
              >
                <WorkCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="mt-14 text-sm text-ink-soft">No projects yet.</p>
      )}
    </section>
  );
}
