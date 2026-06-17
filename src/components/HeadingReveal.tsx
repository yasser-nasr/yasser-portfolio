"use client";

import { motion, type Variants } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

// clip-path self-mask rather than an overflow-hidden wrapper + transform:
// the latter breaks IntersectionObserver's initial-intersection check when
// the heading is already in the viewport at mount (no scroll occurs), so
// whileInView never fires and the element stays stuck at its hidden state.
const maskVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type HeadingTag = "h1" | "h2" | "h3";

export default function HeadingReveal({
  children,
  as = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: HeadingTag;
  className?: string;
}) {
  const prefersReducedMotion = useSafeReducedMotion();
  const skip = prefersReducedMotion === true;
  const Component = as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;

  return (
    <Component
      key={skip ? "static" : "animated"}
      className={className}
      initial={skip ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={maskVariants}
    >
      {children}
    </Component>
  );
}
