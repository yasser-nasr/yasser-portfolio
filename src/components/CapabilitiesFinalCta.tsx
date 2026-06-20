import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

export default function CapabilitiesFinalCta() {
  return (
    <div className="relative mt-24 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-surface-card opacity-50 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <HeadingReveal
          as="h2"
          className="text-3xl font-semibold leading-tight text-ink md:text-5xl"
        >
          Need a designer who can connect the full visual experience?
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 text-lg text-ink-soft">
            Explore selected work or start a conversation about your next
            role, project, or collaboration.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              View Selected Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card"
            >
              Start a Conversation
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
