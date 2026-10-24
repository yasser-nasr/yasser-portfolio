import {
  optimizedImageOverrides,
  optimizedImagePaths,
  optimizedVideoPaths,
} from "./optimized-media-manifest";

function optimizedPath(pathname: string) {
  // Accept old saved URLs, but emit the single canonical media root.
  pathname = pathname.replace(/^\/(?:projects-optimized|videos-optimized)\//, "/projects/");
  const video = optimizedVideoPaths[pathname];
  if (video) return video;
  if (!pathname.startsWith("/projects/")) return pathname;
  const relative = pathname.slice("/projects/".length);
  return optimizedImagePaths.has(relative)
    ? `/projects/${optimizedImageOverrides[relative] ?? relative}`
    : pathname;
}

export function optimizedMediaSrc(src: string): string;
export function optimizedMediaSrc<T>(src: T): T;
export function optimizedMediaSrc(src: unknown): unknown {
  if (typeof src !== "string") return src;
  if (/^https?:\/\//i.test(src)) {
    const url = new URL(src);
    if (!["yassernasr.com", "www.yassernasr.com"].includes(url.hostname)) return src;
    const pathname = optimizedPath(url.pathname);
    if (pathname === url.pathname) return src;
    url.pathname = pathname;
    return url.toString();
  }
  const boundary = src.search(/[?#]/);
  const pathname = boundary < 0 ? src : src.slice(0, boundary);
  const suffix = boundary < 0 ? "" : src.slice(boundary);
  return optimizedPath(pathname) + suffix;
}
