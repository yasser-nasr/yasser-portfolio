import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";

export default function SelectedWork() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Selected Work</h2>
          <Link href="/work" className="text-sm text-ink-soft transition-colors hover:text-ink">
            View All Work →
          </Link>
        </Reveal>

        <WorkGrid className="mt-12" />
      </div>
    </section>
  );
}
