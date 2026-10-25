import { getImageProps, type ImageProps } from "next/image";
import { optimizedMediaSrc } from "@/lib/optimized-media";

type Connection = { saveData?: boolean; effectiveType?: string };
const warmed = new Set<string>();

export function canWarmMedia() {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  return !connection?.saveData && !/^(slow-)?2g$/.test(connection?.effectiveType ?? "");
}

function warm(props: { src: string; srcSet?: string; sizes?: string }, priority: "low" | "high" = "low") {
  if (typeof window === "undefined" || !canWarmMedia()) return;
  const key = `${props.src}|${props.sizes ?? ""}|${window.innerWidth}|${window.devicePixelRatio}|${priority}`;
  if (warmed.has(key)) return;
  if (warmed.size >= 64) warmed.delete(warmed.values().next().value!);
  warmed.add(key);
  const image = new window.Image();
  image.decoding = "async";
  image.fetchPriority = priority;
  image.onerror = () => warmed.delete(key);
  if (props.sizes) image.sizes = props.sizes;
  if (props.srcSet) image.srcset = props.srcSet;
  image.src = props.src;
}

/** Warm exactly the responsive variant the viewer will use, at unchanged quality. */
export function warmImage(src: ImageProps["src"], sizes: string, quality = 100, priority: "low" | "high" = "low") {
  if (typeof window === "undefined" || !canWarmMedia()) return;
  const { props } = getImageProps({ src: optimizedMediaSrc(src), alt: "", fill: true, sizes, quality });
  warm(props, priority);
}

/** For the existing lightboxes that deliberately render the original optimized file. */
export function warmOriginalImage(src: string) {
  warm({ src: optimizedMediaSrc(src) }, "high");
}
