import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

export default function AboutMentoring() {
  return (
    <div className="mt-24">
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
            Mentoring / 06
          </p>

          <HeadingReveal
            as="h2"
            className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
          >
            Designing Work. Developing Designers.
          </HeadingReveal>

          <Reveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Alongside my professional work, I have mentored 150+ students
              through graphic design programs and workshops, helping them
              strengthen their creative foundations, design thinking, and
              portfolio direction.
            </p>
          </Reveal>
        </div>

        <Reveal className="relative overflow-hidden rounded-2xl border border-ink/10 bg-surface-card/30 p-8 text-center shadow-2xl backdrop-blur-md md:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-125 rounded-full bg-surface-card opacity-40 blur-3xl"
          />
          <p className="font-display text-6xl text-ink md:text-7xl">150+</p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ink-soft">
            Students Mentored
          </p>
        </Reveal>
      </div>
    </div>
  );
}
