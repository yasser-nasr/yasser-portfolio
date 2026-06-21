import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import { resumeFinalCta } from "@/data/resume";

export default function ResumeFinalCta() {
  return (
    <div className="relative mt-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-surface-card opacity-50 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="relative mx-auto max-w-2xl rounded-3xl border border-ink/10 bg-surface-card/30 p-10 text-center shadow-2xl backdrop-blur-md md:p-14">
        <HeadingReveal
          as="h2"
          className="text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          {resumeFinalCta.heading}
        </HeadingReveal>

        <Reveal>
          <p className="mt-5 text-lg text-ink-soft">{resumeFinalCta.text}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={resumeFinalCta.primaryCta.href}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              {resumeFinalCta.primaryCta.label}
            </Link>
            <Link
              href={resumeFinalCta.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card"
            >
              {resumeFinalCta.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
