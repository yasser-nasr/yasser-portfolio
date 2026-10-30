"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageProps } from "next/image";
import Image from "@/components/media/CaseStudyImage";

const emptyPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const waiting = new Map<Element, () => void>();
let viewportObserver: IntersectionObserver | undefined;

function observeImage(image: Element, activate: () => void) {
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
export default function ViewportImage(props: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [nearby, setNearby] = useState(false);
  // The loaded 1x1 placeholder otherwise overrides width/height attributes and
  // makes intrinsic artwork square until its real source arrives.
  const reservedStyle = !props.fill && props.width && props.height
    ? { aspectRatio: `${props.width} / ${props.height}`, ...props.style }
    : props.style;
  useEffect(() => {
    const image = ref.current;
    if (!image) return;
    if (!("IntersectionObserver" in window)) { setNearby(true); return; }
    return observeImage(image, () => setNearby(true));
  }, []);

  return <>
    <Image {...props} style={reservedStyle} ref={ref} data-viewport-image="" src={nearby ? props.src : emptyPixel} unoptimized={nearby ? props.unoptimized : true} loading="lazy" />
    <noscript>
      <style>{"img[data-viewport-image] { display: none; }"}</style>
      <Image {...props} loading="lazy" />
    </noscript>
  </>;
}
