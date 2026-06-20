import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import SelectedWorkGrid from "@/components/SelectedWorkGrid";

export default function SelectedWork() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
              Work / 02
            </p>
            <HeadingReveal
              as="h2"
              className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl"
            >
              Selected Work
            </HeadingReveal>
            <Reveal>
              <p className="mt-4 max-w-md text-lg text-ink-soft">
                A selection of brand systems, digital experiences, campaigns,
                and visual communication projects.
              </p>
            </Reveal>
          </div>
          <Link
            href="/work"
            className="shrink-0 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            View All Work →
          </Link>
        </div>

        <SelectedWorkGrid className="mt-12" />
      </div>
    </section>
  );
}
