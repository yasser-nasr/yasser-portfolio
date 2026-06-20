import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { workProjects } from "@/data/work";

export function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} | Yasser Nasr`,
    description: project.statement,
  };
}

// Case study structure per the brand context doc (Context, Challenge, Role,
// Strategy, Visual Direction, System Built, Applications, Outcome) — filled
// with clearly marked placeholders until real case studies are approved.
const caseStudySections = [
  {
    label: "Context",
    placeholder: "Context for this project will go here once the case study is approved.",
  },
  {
    label: "Challenge",
    placeholder: "The challenge this project addressed will go here.",
  },
  {
    label: "Role",
    placeholder: "Yasser's role and ownership on this project will go here.",
  },
  {
    label: "Strategy",
    placeholder: "The strategic approach will go here.",
  },
  {
    label: "Visual Direction",
    placeholder: "The visual direction and design language will go here.",
  },
  {
    label: "System Built",
    placeholder: "The system or set of deliverables built will go here.",
  },
  {
    label: "Applications",
    placeholder: "Where and how the system was applied will go here.",
  },
  {
    label: "Outcome / Value",
    placeholder: "The outcome or value delivered will go here.",
  },
];

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 pt-36 pb-24 md:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/work" className="text-sm text-ink-soft transition-colors hover:text-ink">
          ← Back to Work
        </Link>

        <HeadingReveal as="h1" className="mt-6 text-4xl font-semibold text-ink md:text-5xl">
          {project.name}
        </HeadingReveal>

        <Reveal>
          <p className="mt-4 text-sm uppercase tracking-[0.15em] text-ink-soft">
            {project.category} · {project.industry} · {project.year}
          </p>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">{project.statement}</p>
        </Reveal>

        <div
          aria-hidden="true"
          className="mt-12 aspect-[16/10] rounded-lg border border-dashed border-edge bg-surface-card"
        />

        <div className="mt-16 space-y-12 border-t border-edge pt-12">
          {caseStudySections.map((section) => (
            <Reveal key={section.label}>
              <h2 className="font-display text-base uppercase tracking-[0.2em] text-ink-soft md:text-lg">
                {section.label}
              </h2>
              <p className="mt-3 max-w-xl text-base text-ink-soft">{section.placeholder}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
