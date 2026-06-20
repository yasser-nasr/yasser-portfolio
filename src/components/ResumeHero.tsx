import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { resumeHero } from "@/data/resume";

export default function ResumeHero() {
  return (
    <div>
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        {resumeHero.eyebrow}
      </p>

      <HeadingReveal
        as="h1"
        className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-5xl"
      >
        {resumeHero.headline}
      </HeadingReveal>

      <Reveal>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {resumeHero.supportingText}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={resumeHero.primaryCta.href}
            download
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            {resumeHero.primaryCta.label}
          </a>
          {resumeHero.secondaryCtas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card"
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
