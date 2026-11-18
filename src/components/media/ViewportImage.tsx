"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageProps } from "next/image";
import Image from "@/components/media/CaseStudyImage";

const emptyPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const waiting = new Map<Element, () => void>();
let viewportObserver: IntersectionObserver | undefined;

function observeImage(image: Element, activate: () => void, preloadDistance: number) {
  // Opt-in lookahead for long case studies; retain the shared default elsewhere.
  if (preloadDistance !== 600) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); activate(); }
    }, { rootMargin: `${preloadDistance}px 0px` });
    observer.observe(image);
    return () => observer.disconnect();
  }
  if (!viewportObserver) {
    viewportObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const ready = waiting.get(entry.target);
        waiting.delete(entry.target);
        viewportObserver?.unobserve(entry.target);
        ready?.();
      }
    }, { rootMargin: "600px 0px" });
  }
  waiting.set(image, activate);
  viewportObserver.observe(image);
  return () => {
    waiting.delete(image);
    viewportObserver?.unobserve(image);
    if (!waiting.size) { viewportObserver?.disconnect(); viewportObserver = undefined; }
  };
}

// Gallery tiles have a fixed aspect-ratio parent. Keep the very same img box,
// but avoid the browser's multi-screen native lazy-loading lookahead.
export default function ViewportImage({ preloadDistance = 600, ...props }: ImageProps & { preloadDistance?: number }) {
  const ref = useRef<HTMLImageElement>(null);
  const [nearby, setNearby] = useState(false);
  // Match the artwork's intrinsic ratio without overriding responsive CSS crops.
  const placeholder = !props.fill && props.width && props.height
    ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${Number(props.width)}' height='${Number(props.height)}'/%3E`
    : emptyPixel;
  useEffect(() => {
    const image = ref.current;
    if (!image) return;
    if (!("IntersectionObserver" in window)) { setNearby(true); return; }
    return observeImage(image, () => setNearby(true), preloadDistance);
  }, [preloadDistance]);

  return <>
    {/* IntersectionObserver has already deferred the request. Opt-in galleries
        should not be gated a second time by browser-native lazy loading. */}
    <Image {...props} ref={ref} data-viewport-image="" src={nearby ? props.src : placeholder} unoptimized={nearby ? props.unoptimized : true} loading={nearby && preloadDistance !== 600 ? "eager" : "lazy"} fetchPriority={preloadDistance === 600 ? props.fetchPriority : "auto"} />
    <noscript>
      <style>{"img[data-viewport-image] { display: none; }"}</style>
      <Image {...props} loading="lazy" />
    </noscript>
  </>;
}
