"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import PixelReveal from "@/components/animation/PixelReveal";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { profile } from "@/data/profile";

const PIXEL_FRAGMENTS = [
  { top: "2%", left: "-8%", size: 10 },
  { top: "14%", left: "94%", size: 7 },
  { top: "82%", left: "-6%", size: 8 },
  { top: "92%", left: "90%", size: 9 },
];

const PARALLAX_RANGE = 14;

export default function HeroPortrait() {
  const prefersReducedMotion = useSafeReducedMotion();
  // Keep the existing pointer spring; the pixel entrance honors reduced motion in CSS.
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
        <div
          className="relative mx-auto w-44 md:w-56 lg:w-full lg:max-w-xs"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Restrained radial light field behind the portrait */}
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
            {/* Restrained glass composition framing the portrait */}
            <div
              aria-hidden="true"
              className="absolute inset-[-12%] rounded-[2rem] border border-ink/10 bg-surface-card/30 shadow-2xl backdrop-blur-md"
            />
            <PixelReveal className="p-4 md:p-6">
              <Image
                src="/brand/yasser-nasr-portrait.webp"
                alt={`${profile.name}, Graphic and Multimedia Designer`}
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 224px, 176px"
                className="h-auto w-full rounded-xl"
              />
            </PixelReveal>
          </motion.div>
        </div>
  );
}
