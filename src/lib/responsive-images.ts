import manifest from "@/data/responsive-images.json";

type Entry = readonly [width: number, version: string, sharedPrefix: string | null, sizes: readonly number[]];
const entries = manifest as unknown as Readonly<Record<string, Entry>>;

function variant(src: string, entry: Entry, width: number) {
  const prefix = entry[2] ?? src.replace(/\.[^/.]+$/, "");
  return encodeURI(`/responsive${prefix}.${entry[1]}.${width}.webp`);
}

export function imageCandidates(src: string) {
  const entry = entries[src];
  if (!entry?.[3].length) return undefined;
  return [...entry[3].map(width => `${variant(src, entry, width)} ${width}w`), `${encodeURI(src)} ${entry[0]}w`].join(", ");
}

// Native video posters take a single URL. Use a moderate delivery size
// for large originals while keeping small posters at their source resolution.
export function posterImage(src: string | undefined) {
  if (!src) return undefined;
  const entry = entries[src];
  const width = entry?.[3].find(size => size >= 1024);
  return width ? variant(src, entry, width) : src;
}
