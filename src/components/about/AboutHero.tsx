import Image from "next/image";
import PixelReveal from "@/components/animation/PixelReveal";
import { profile } from "@/data/profile";
import { heroContent } from "@/data/hero";

// Minimal, subtle pixel fragments scattered around the mascot — decorative
// only, hidden on the smallest screens to keep mobile simple.
const PIXEL_FRAGMENTS = [
  { top: "0%", left: "-10%", size: 10 },
  { top: "18%", left: "96%", size: 7 },
  { top: "86%", left: "-8%", size: 8 },
  { top: "94%", left: "92%", size: 9 },
];

export default function AboutHero() {
  return (
    <div>
      <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <div>
          <p
            className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg"
          >
            About
          </p>

          <h1
            className="mt-6 text-4xl font-semibold leading-tight text-ink md:text-5xl"
          >
            The Designer Behind the Pixels
          </h1>

          <div className="mt-8 max-w-xl space-y-5">
            <p className="text-lg leading-relaxed text-ink-soft">
              I&rsquo;m {profile.name}, a {profile.primaryTitle}. {heroContent.statement}
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              I combine creative craft, business understanding, and
              multidisciplinary execution to turn ideas into clear,
              consistent, and memorable visual experiences.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-48 sm:w-56 md:w-full md:max-w-sm md:-translate-x-[10%]">
          {/* Restrained radial light field behind the mascot */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-150 rounded-full bg-surface-card opacity-60 blur-3xl"
          />

          {/* Faint pixel-grid texture, local to the mascot composition */}
          <div
            aria-hidden="true"
            className="absolute inset-[-15%] -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Minimal pixel fragments */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
            {PIXEL_FRAGMENTS.map((fragment, index) => (
              <span
                key={index}
                className="absolute rounded-sm bg-ink-soft/20"
                style={{
                  top: fragment.top,
                  left: fragment.left,
                  width: fragment.size,
                  height: fragment.size,
                }}
              />
            ))}
          </div>

          <div className="relative">
            {/* Restrained glass frame, no conventional card box */}
            <div
              aria-hidden="true"
              className="absolute inset-[-10%] rounded-[2rem] border border-ink/10 bg-surface-card/30 shadow-2xl backdrop-blur-md"
            />
            <PixelReveal className="p-5 md:p-7">
              <Image
                src="/brand/mascot.svg"
                loading="eager"
                fetchPriority="high"
                alt=""
                aria-hidden="true"
                width={160}
                height={233}
                className="h-auto w-full"
              />
            </PixelReveal>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-20 border-t border-edge md:mt-28" />
    </div>
  );
}
