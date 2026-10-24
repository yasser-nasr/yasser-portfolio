import NextImage, { type ImageProps } from "next/image";
import { optimizedMediaSrc } from "@/lib/optimized-media";

/** Resolve verified media URLs and normalize the legacy preload alias without changing presentation. */
export default function OptimizedImage(props: ImageProps) {
  // Next 16 calls this preload. Keep existing callers' semantics without
  // forwarding the deprecated priority prop to the framework component.
  const { priority, preload, ...imageProps } = props;
  return <NextImage {...imageProps} preload={preload ?? priority} src={optimizedMediaSrc(props.src)} />;
}
