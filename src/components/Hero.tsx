"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
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

export default function Hero() {
  const prefersReducedMotion = useSafeReducedMotion();
  // `initial` is only read once at mount, so a prop change alone can't stop an
  // already-playing entrance. Once reduced motion is confirmed (post-mount,
  // never on the first/SSR-matching render), force a remount via `key` so the
  // fresh element mounts already-visible instead of animating in.
  const skipEntrance = prefersReducedMotion === true;

  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
        <motion.div
          key={skipEntrance ? "static" : "animated"}
          initial={skipEntrance ? "visible" : "hidden"}
          animate="visible"
          variants={container}
        >
          <motion.p
            variants={line}
            className="font-display text-xs uppercase tracking-[0.25em] text-ink-soft"
          >
            {heroContent.tagline}
          </motion.p>

          <motion.div variants={line} className="mt-6 max-w-md">
            <Image
              src="/brand/wordmark.svg"
              alt={heroContent.name}
              width={456}
              height={39}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          <motion.p variants={line} className="mt-6 text-base text-ink-soft md:text-lg">
            {heroContent.titles.join(" / ")}
          </motion.p>

          <motion.p variants={line} className="mt-6 max-w-lg text-lg text-ink md:text-xl">
            {heroContent.statement}
          </motion.p>

          <motion.div variants={line} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </motion.div>

          <motion.div
            variants={line}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-dashed border-edge px-4 py-2 text-xs text-ink-faint"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
            [Location] — open to GCC &amp; international remote opportunities
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-40 md:w-full md:max-w-xs">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-150 rounded-full bg-surface-card opacity-60 blur-3xl"
          />
          <PixelReveal>
            <Image
              src="/brand/mascot.svg"
              alt="Yasser Nasr pixel mascot"
              width={120}
              height={175}
              priority
              className="h-auto w-full"
            />
          </PixelReveal>
        </div>
      </div>
    </section>
  );
}
