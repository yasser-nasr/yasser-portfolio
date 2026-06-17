"use client";

import { motion, type Variants } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type ReuseDivProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "children" | "className" | "variants" | "initial" | "whileInView" | "viewport" | "key"
>;

export default function Reveal({
  children,
  className,
  variants = defaultVariants,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
} & ReuseDivProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const skip = prefersReducedMotion === true;

  return (
    <motion.div
      key={skip ? "static" : "animated"}
      className={className}
      initial={skip ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
