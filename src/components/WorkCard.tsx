import Link from "next/link";
import type { WorkProject } from "@/data/work";

export default function WorkCard({ project }: { project: WorkProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View case study: ${project.name}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-dashed border-edge bg-surface-card">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-6 opacity-40 transition-transform duration-500 group-hover:scale-105"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="border border-edge/40" />
          ))}
        </div>
        <span className="absolute inset-0 flex items-center justify-center text-center text-xs uppercase tracking-[0.2em] text-ink-faint">
          Case study placeholder
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg text-ink">{project.name}</h3>
        <span className="font-display text-sm text-ink-faint">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {project.category} · {project.industry}
      </p>
      <p className="mt-2 text-sm text-ink-soft">{project.statement}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm text-ink underline-offset-4 group-hover:underline">
        View Case Study <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
