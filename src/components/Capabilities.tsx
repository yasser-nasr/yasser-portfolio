import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import CapabilitiesList from "@/components/CapabilitiesList";

export default function Capabilities() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
          Capabilities / 04
        </p>
        <HeadingReveal
          as="h2"
          className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          Connected Capabilities
        </HeadingReveal>
        <Reveal>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            Four connected capabilities supporting complete brand and digital
            experiences.
          </p>
        </Reveal>

        <CapabilitiesList className="mt-12" />

        <Link
          href="/capabilities"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          Explore All Capabilities
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
