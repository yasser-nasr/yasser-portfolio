import NextImage, { type ImageProps } from "next/image";
import type { Ref } from "react";
import { optimizedMediaSrc } from "@/lib/optimized-media";

/** Resolve verified media URLs and normalize the legacy preload alias without changing presentation. */
export default function OptimizedImage(props: ImageProps & { ref?: Ref<HTMLImageElement> }) {
  // Next 16 calls this preload. Keep existing callers' semantics without
  // forwarding the deprecated priority prop to the framework component.
  const { priority, preload, ...imageProps } = props;
  const critical = preload ?? priority;
  // These callers already identify the single critical cover. Next 16 recommends
  // eager/high instead of combining preload and fetchPriority (duplicate hints).
  return <NextImage {...imageProps} loading={imageProps.loading ?? (critical ? "eager" : undefined)} fetchPriority={imageProps.fetchPriority ?? (critical ? "high" : undefined)} src={optimizedMediaSrc(props.src)} />;
}
