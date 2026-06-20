import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { resumeProfile } from "@/data/resume";

export default function ResumeProfile() {
  return (
    <div className="mt-24">
      <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
        Profile / 03
      </p>

      <HeadingReveal
        as="h2"
        className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
      >
        {resumeProfile.heading}
      </HeadingReveal>

      <Reveal className="mt-6 max-w-3xl space-y-5">
        {resumeProfile.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-ink-soft">
            {paragraph}
          </p>
        ))}
      </Reveal>
    </div>
  );
}
