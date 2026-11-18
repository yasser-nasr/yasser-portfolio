"use client";

import { getImageProps, type ImageProps } from "next/image";
import { useCallback, type Ref } from "react";
import { optimizedMediaSrc } from "@/lib/optimized-media";
import { imageCandidates } from "@/lib/responsive-images";

function fallBackToOriginal(image: HTMLImageElement) {
  if (!image.hasAttribute("srcset")) return false;
  image.removeAttribute("srcset");
  return true;
}

export default function OptimizedImage({ priority, preload, ref, ...input }: ImageProps & { ref?: Ref<HTMLImageElement> }) {
  const critical = preload ?? priority;
  const { props } = getImageProps({
    ...input, src: optimizedMediaSrc(input.src), unoptimized: true,
    loading: input.loading ?? (critical ? "eager" : "lazy"),
    fetchPriority: input.fetchPriority ?? (critical ? "high" : undefined),
  });
  const srcSet = input.unoptimized ? undefined : imageCandidates(props.src);
  const sizes = input.sizes ?? (input.fill ? "100vw" : props.width ? String(props.width) + "px" : "100vw");
  const responsiveSizes = props.loading === "lazy" ? `auto, ${sizes}` : sizes;
  const attachImage = useCallback((image: HTMLImageElement | null) => {
    // A server-rendered hero can finish (or fail) before hydration attaches onError.
    if (image?.complete && image.currentSrc && !image.naturalWidth) fallBackToOriginal(image);
    if (typeof ref === "function") return ref(image);
    if (ref) ref.current = image;
  }, [ref]);
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} ref={attachImage} sizes={srcSet ? responsiveSizes : undefined} srcSet={srcSet} src={props.src}
    onError={event => {
      if (!fallBackToOriginal(event.currentTarget)) input.onError?.(event);
    }}
  />;
}
