import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-surface-card opacity-50 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <HeadingReveal as="h2" className="text-3xl font-semibold leading-tight text-ink md:text-5xl">
          Have a role, project, or idea in mind?
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 text-lg text-ink-soft">
            Let&rsquo;s turn it into a clear, meaningful, and memorable visual experience.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Start a Conversation
            </Link>
            <span
              aria-disabled="true"
              title="LinkedIn URL not yet provided"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-edge px-6 py-3 text-sm text-ink-faint"
            >
              Connect on LinkedIn
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
