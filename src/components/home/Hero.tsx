import Link from "next/link";
import HeroPortrait from "@/components/home/HeroPortrait";
import { heroContent } from "@/data/hero";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Layered charcoal depth + a very faint pixel-grid texture, local to the hero */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.85,
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 0%, var(--bg-card) 0%, transparent 70%), radial-gradient(ellipse 50% 45% at 8% 100%, var(--bg-deep) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
        <div>
          <p
            className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg"
          >
            {heroContent.tagline}
          </p>

          <h1
            className="mt-6 font-display text-4xl uppercase leading-[0.95] text-ink sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {heroContent.name}
          </h1>

          <p className="mt-6 text-base text-ink-soft md:text-lg">
            {heroContent.title}
          </p>

          <p className="mt-6 max-w-lg text-lg text-ink md:text-xl">
            {heroContent.statement}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={heroContent.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              {heroContent.primaryCta.label}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface-card/40 px-6 py-3 text-sm text-ink backdrop-blur-sm transition-colors hover:bg-surface-card/70"
            >
              {heroContent.secondaryCta.label}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div
            className="mt-8 inline-flex items-center gap-2 text-xs text-ink-soft md:text-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-soft" />
            {heroContent.availability}
          </div>
        </div>

        <HeroPortrait />
      </div>
    </section>
  );
}
