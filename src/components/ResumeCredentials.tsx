import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { education, languages, tools } from "@/data/resume";

export default function ResumeCredentials() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Credentials / 08
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
        <div>
          <HeadingReveal as="h2" className="text-xl font-semibold text-ink md:text-2xl">
            Education
          </HeadingReveal>
          <Reveal className="mt-5">
            <p className="text-base font-medium text-ink">{education.degree}</p>
            <p className="mt-1 text-sm text-ink-soft">{education.institution}</p>
            <p className="mt-1 text-sm text-ink-faint">{education.dates}</p>
          </Reveal>
        </div>

        <div>
          <HeadingReveal as="h2" className="text-xl font-semibold text-ink md:text-2xl">
            Languages
          </HeadingReveal>
          <Reveal className="mt-5 space-y-2">
            {languages.map((entry) => (
              <p key={entry.language} className="text-sm text-ink-soft">
                <span className="text-ink">{entry.language}</span>: {entry.level}
              </p>
            ))}
          </Reveal>
        </div>

        <div>
          <HeadingReveal as="h2" className="text-xl font-semibold text-ink md:text-2xl">
            Tools
          </HeadingReveal>
          <Reveal className="mt-5 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-edge px-3 py-1 text-xs text-ink-soft"
              >
                {tool}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
