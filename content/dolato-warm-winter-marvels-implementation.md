# Dolato Warm Winter Marvels implementation

Rebuilt the existing Dolato entry at `/work/dolato-warm-winter-marvels`. The former route redirects permanently to the new URL. No duplicate work entry was added.

## Asset review

Reviewed all 12 original images before editing. Selected one apron and finished cup mockups; alternate apron and flat cup artwork remain available in the project asset folder but are omitted from the curated page. The cart technical drawing is included. Character and Italian references are shown through the supplied backdrop artwork; no standalone character asset was invented. The theme mark and pattern show the Minis motif. The color strip summarizes the visible warm palette.

The original source archive remains untouched at `../dolato-source-images/`.

## Every renamed asset

Old paths are relative to `public/projects/dolato/`; new paths are relative to `public/projects/dolato-warm-winter-marvels/`.

| Old filename | New path |
| --- | --- |
| `dolato-winter-theme-hero.webp` | `visual-system/dolato-warm-winter-marvels-theme-mark.webp` |
| `dolato-winter-theme-pattern.webp` | `pattern/dolato-winter-pattern.webp` |
| `dolato-uniform-design.webp` | `applications/dolato-winter-apron.webp` |
| `dolato-uniform-burgundy-design.webp` | `applications/dolato-winter-apron-burgundy.webp` |
| `dolato-hot-chocolate-cup.webp` | `applications/dolato-hot-chocolate-cup.webp` |
| `dolato-hot-chocolate-cup-artwork.webp` | `applications/dolato-hot-chocolate-cup-artwork.webp` |
| `dolato-gelato-cup.webp` | `applications/dolato-gelato-cup.webp` |
| `dolato-gelato-cup-artwork.webp` | `applications/dolato-gelato-cup-artwork.webp` |
| `dolato-store-window-display.webp` | `environmental/dolato-store-window-display.webp` |
| `dolato-photo-backdrop.webp` | `environmental/dolato-photo-backdrop.webp` |
| `dolato-events-cart.webp` | `environmental/dolato-winter-events-cart.webp` |
| `dolato-events-cart-layout.webp` | `environmental/dolato-events-cart-technical-application.webp` |

## Created files

- `public/projects/dolato-warm-winter-marvels/cover/dolato-warm-winter-marvels-hero.webp`
- `public/projects/dolato-warm-winter-marvels/og/dolato-warm-winter-marvels-og.jpg`
- `content/dolato-asset-mapping.json`
- `content/dolato-warm-winter-marvels-implementation.md`

Hero and 1200 ? 630 OG image were optimized from the original `365-ice-cream-mockup.png`. The OG crop preserves all three cups.

## Modified files

- `src/components/case-study/DolatoCaseStudy.tsx`
- `src/data/projects.ts`
- `src/app/work/[slug]/page.tsx`
- `next.config.ts`

The twelve renamed assets above are the complete additional file changes. The previous unused social image remains at `public/projects/dolato/dolato-winter-theme-og.jpg`; no current page references it.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Production route: HTTP 200. Old route: HTTP 308 to the new slug.
- 16 rendered project image instances: local paths, intrinsic dimensions, responsive sizes, and alt attributes checked. Decorative repeats use empty alt text.
- Exactly one H1.
- Canonical, title, descriptions, OG image, and CreativeWork use the new project data.
- CreativeWork creator: `https://yassernasr.com/#person`.
- Work card and sitemap use the new slug.
- Copy reviewed: competition submission only; no awards, placement, implementation, or client-commission claims.
- OG image visually inspected.
- Responsive source reviewed: 1152px outer container, 24px side padding, full-width images, mobile stacking, wrapping scope tags, two-column showcase from 768px. Desktop/mobile rendered review remains unverified: browser inventory returned no available browsers.
