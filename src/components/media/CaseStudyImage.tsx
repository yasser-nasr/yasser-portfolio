import type { ImageProps } from "next/image";
import type { Ref } from "react";
import NextImage from "@/components/media/OptimizedImage";

export default function CaseStudyImage(props: ImageProps & { ref?: Ref<HTMLImageElement> }) {
  return (
    <NextImage
      quality={100}
      sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
      {...props}
    />
  );
}
