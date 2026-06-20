"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import PixelReveal from "@/components/PixelReveal";
import { heroContent } from "@/data/hero";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Minimal, subtle pixel fragments scattered around the mascot — decorative
// only, hidden below md to keep mobile simple/performant.
const PIXEL_FRAGMENTS = [
  { top: "2%", left: "-8%", size: 10 },
  { top: "14%", left: "94%", size: 7 },
  { top: "82%", left: "-6%", size: 8 },
  { top: "92%", left: "90%", size: 9 },
];

const PARALLAX_RANGE = 14;

export default function Hero() {
  const prefersReducedMotion = useSafeReducedMotion();
  // `initial` is only read once at mount, so a prop change alone can't stop an
  // already-playing entrance. Once reduced motion is confirmed (post-mount,
  // never on the first/SSR-matching render), force a remount via `key` so the
  // fresh element mounts already-visible instead of animating in.
  const reduceMotion = prefersReducedMotion === true;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.4 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX * PARALLAX_RANGE);
    mouseY.set(relY * PARALLAX_RANGE);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

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
        <motion.div
          key={reduceMotion ? "static" : "animated"}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={container}
        >
          <motion.p
            variants={line}
            className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg"
          >
            {heroContent.tagline}
          </motion.p>

          <motion.h1
            variants={line}
            className="mt-6 font-display text-4xl uppercase leading-[0.95] text-ink sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {heroContent.name}
          </motion.h1>

          <motion.p variants={line} className="mt-6 text-base text-ink-soft md:text-lg">
            {heroContent.titles.join(" / ")}
          </motion.p>

          <motion.p variants={line} className="mt-6 max-w-lg text-lg text-ink md:text-xl">
            {heroContent.statement}
          </motion.p>

          <motion.div variants={line} className="mt-10 flex flex-wrap items-center gap-4">
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
          </motion.div>

          <motion.div
            variants={line}
            className="mt-8 inline-flex items-center gap-2 text-xs text-ink-soft md:text-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-soft" />
            {heroContent.availability}
          </motion.div>
        </motion.div>

        <div
          className="relative mx-auto w-44 md:w-56 lg:w-full lg:max-w-xs"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Restrained radial light field behind the mascot */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-150 rounded-full bg-surface-card opacity-60 blur-3xl"
          />

          {/* Minimal pixel fragments — subtle, tablet/desktop only */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
            {PIXEL_FRAGMENTS.map((fragment, index) => (
              <span
                key={index}
                className="absolute rounded-sm bg-ink-soft/20"
                style={{ top: fragment.top, left: fragment.left, width: fragment.size, height: fragment.size }}
              />
            ))}
          </div>

          <motion.div className="relative" style={{ x: springX, y: springY }}>
            {/* Restrained glass composition framing the mascot */}
            <div
              aria-hidden="true"
              className="absolute inset-[-12%] rounded-[2rem] border border-ink/10 bg-surface-card/30 shadow-2xl backdrop-blur-md"
            />
            <PixelReveal className="p-4 md:p-6">
              <Image
                src="/brand/mascot.svg"
                alt="Yasser Nasr pixel mascot"
                width={120}
                height={175}
                priority
                className="h-auto w-full"
              />
            </PixelReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
