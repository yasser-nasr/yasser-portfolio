"use client";

import { motion, type Variants } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const maskVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
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
  const Tag = as;

  return (
    <div className="overflow-hidden">
      <motion.div
        key={skip ? "static" : "animated"}
        initial={skip ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={maskVariants}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
