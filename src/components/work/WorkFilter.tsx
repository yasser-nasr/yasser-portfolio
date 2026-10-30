"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import WorkCard from "@/components/work/WorkCard";
import type { WorkProject } from "@/data/work";
import { workCategoryOptions, type ProjectCategory } from "@/data/workCategories";
import { industries, type Industry } from "@/data/markets";
import DropdownField from "@/components/ui/DropdownField";

type ActiveFilter = "all" | ProjectCategory;

export default function WorkFilter({ projects, className = "" }: {
  projects: WorkProject[];
  className?: string;
}) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [activeIndustry, setActiveIndustry] = useState<Industry | "all">("all");
  const prefersReducedMotion = useReducedMotion();
  const disciplineMatches = projects.filter(project => activeIndustry === "all" || project.industries.includes(activeIndustry));
  const industryMatches = projects.filter(project => activeFilter === "all" || project.categories.includes(activeFilter));
  const disciplineOptions = [
    { key: "all" as ActiveFilter, label: "All disciplines", count: disciplineMatches.length },
    ...workCategoryOptions.map(option => ({ ...option, count: disciplineMatches.filter(project => project.categories.includes(option.key)).length })).filter(option => option.count > 0),
  ];
  const industryOptions = [
    { key: "all" as Industry | "all", label: "All industries", count: industryMatches.length },
    ...industries.map(industry => ({ key: industry, label: industry, count: industryMatches.filter(project => project.industries.includes(industry)).length })).filter(option => option.count > 0),
  ];
  const filteredProjects = useMemo(
    () => projects.filter(project =>
      (activeFilter === "all" || project.categories.includes(activeFilter)) &&
      (activeIndustry === "all" || project.industries.includes(activeIndustry)),
    ),
    [activeFilter, activeIndustry, projects],
  );
  const resetFilters = () => { setActiveFilter("all"); setActiveIndustry("all"); };

  return (
    <section aria-label="Filter work by capability and industry" className={className}>
      <div className="border-y border-edge py-5 sm:py-6">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <DropdownField
            id="work-discipline" label="Design discipline" options={disciplineOptions}
            value={disciplineOptions.find(option => option.key === activeFilter) ?? null}
            onChange={option => setActiveFilter(option.key)}
            getKey={option => option.key} getSearchText={option => option.label}
            renderValue={option => option.label}
            renderOption={option => <span className="flex items-center justify-between gap-4"><span>{option.label}</span><span className="shrink-0 tabular-nums text-ink-faint" aria-label={`${option.count} projects`}>{option.count}</span></span>}
            placeholder="All disciplines" searchable searchPlaceholder="Search disciplines"
            listClassName="max-h-64"
          />
          <DropdownField
            id="work-industry" label="Industry" options={industryOptions}
            value={industryOptions.find(option => option.key === activeIndustry) ?? null}
            onChange={option => setActiveIndustry(option.key)}
            getKey={option => option.key} getSearchText={option => option.label}
            renderValue={option => option.label}
            renderOption={option => <span className="flex items-center justify-between gap-4"><span>{option.label}</span><span className="shrink-0 tabular-nums text-ink-faint" aria-label={`${option.count} projects`}>{option.count}</span></span>}
            placeholder="All industries" searchable searchPlaceholder="Search industries"
            listClassName="max-h-64"
          />
        </div>
        <div className="mt-3 flex min-h-11 items-center justify-between gap-4 text-sm text-ink-soft">
          <p role="status" aria-live="polite" aria-atomic="true">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}{activeFilter === "all" && activeIndustry === "all" ? " to explore" : " found"}
          </p>
          {activeFilter !== "all" || activeIndustry !== "all" ? <button type="button" onClick={resetFilters} className="min-h-11 shrink-0 underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Clear filters</button> : null}
        </div>
      </div>

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
        <p className="mt-14 text-sm text-ink-soft">No projects match these filters. Choose another industry or clear the filters to see all work.</p>
      )}
    </section>
  );
}
