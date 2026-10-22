import type { ImageProps } from "next/image";
import NextImage from "@/components/OptimizedImage";

export default function CaseStudyImage(props: ImageProps) {
  return (
    <NextImage
      quality={100}
      sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
      {...props}
    />
  );
}
