import Image from "next/image";
import Link from "next/link";
import type { WorkProject } from "@/data/work";

export default function WorkCard({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const imageFirst = index % 2 === 0;
  const href = `/work/${project.slug}`;

  return (
    <article className="group grid min-w-0 grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-16">
      <Link
        href={href}
        aria-label={`View ${project.name} case study`}
        className={`relative col-span-7 block aspect-[4/3] min-w-0 overflow-hidden rounded-xl bg-surface-card ${
          imageFirst ? "md:order-1" : "md:order-2"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div
            role="img"
            aria-label={`${project.imageAlt} Approved cover image pending.`}
            className="absolute inset-0 grid place-items-center p-8 text-center"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-ink-faint">
                Preview visual
              </span>
              <p className="mt-3 max-w-xs text-sm leading-6 text-ink-soft">
                {project.name} cover pending
              </p>
            </div>
          </div>
        )}
      </Link>

      <div
        className={`col-span-5 min-w-0 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        {!project.publishable && process.env.NODE_ENV === "development" ? (
          <span className="text-xs uppercase tracking-[0.15em] text-ink-faint">
            Preview
          </span>
        ) : null}

        <h2 className="mt-5 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
          <Link href={href} className="transition-opacity hover:opacity-75">
            {project.name}
          </Link>
        </h2>
        <p className="mt-3 text-base uppercase tracking-[0.12em] text-ink-soft md:text-lg">
          {project.subtitle}
        </p>
        <p className="mt-6 max-w-lg text-base leading-8 text-ink-soft">
          {project.statement}
        </p>

        <ul aria-label={`${project.name} disciplines`} className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
          {project.tags.map((tag) => (
            <li key={tag} className="text-sm text-ink-faint">
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="mt-8 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-ink"
        >
          View Case Study
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
