// Preserve old WebP URLs while using higher-fidelity AVIF for detailed A1 graphics.
const preferredAvif = new Set<string>([
  "/projects/a1-dates/a1-dates-colourful-medium-box-packaging-mockup.webp",
  "/projects/a1-dates/a1-dates-colourful-pouch-packaging-mockup.webp",
  "/projects/a1-dates/a1-dates-colourful-small-box-packaging-mockup.webp",
  "/projects/a1-dates/development/d8/d8-lime-carton-concept.webp",
  "/projects/a1-dates/development/d8/d8-lime-clear-container-concept.webp",
  "/projects/a1-dates/development/d8/d8-three-flexible-packaging-directions.webp",
  "/projects/a1-dates/development/date-me/date-me-early-playful-pouch-concept.webp",
  "/projects/a1-dates/development/date-me/date-me-refined-carton-concept.webp",
  "/projects/a1-dates/development/date-me/date-me-refined-clear-container-concept.webp",
  "/projects/a1-dates/development/date-me/date-me-refined-packaging-directions.webp",
  "/projects/a1-dates/development/yumr/yumr-orange-clear-container-concept.webp",
  "/projects/a1-dates/development/yumr/yumr-purple-carton-concept.webp"
]);

export function a1DatesImageSrc(src: string): string {
  return preferredAvif.has(src) ? src.replace(/\.webp$/, ".avif") : src;
}
