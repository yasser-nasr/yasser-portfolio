# Project loading performance — 22 October 2026

## Scope and measurement limits

Reviewed homepage project cards, Work cards/filtering, and all 13 project case studies. Diagnostics used source inspection, Sharp asset metadata, rendered HTML from the running local development server, and actual local HTTP image responses. No lint, build, tests, or type-checking were run. No deployment was made.

These are byte-transfer and implementation findings, not production Lighthouse, Core Web Vitals, browser navigation, hydration, or visual-approval results. Local development compilation, HMR, cache state, and a fast loopback connection make response timings unsuitable for production comparisons. Visual review is the next step.

## Bottlenecks found

1. **The shared gallery component disabled optimization.** `CaseStudyImage` forced `unoptimized`, ignoring responsive size hints and serving original rasters even for small social-grid tiles and document previews. Explicit bypasses also appeared in Orin, RenovoFix, and X Factor.
2. **Large originals amplify this behavior.** The project directory contains 480 raster files totaling 316,864,706 bytes, with 77 over 1 MB. Being WebP alone does not make a 4000–6640 px original appropriate for a thumbnail. This inventory is stored source data, not the amount downloaded on a page visit.
3. **Oversized cover size hints.** Work and homepage project cards used viewport percentages without accounting for the 1152 px container cap. This can select unnecessarily large variants on wide screens. The first Work cover was lazy-loaded despite being the first project visual.
4. **Homepage client code imported the entire project catalog.** The animated selected-project grid imported and filtered `projects.ts` at runtime. This unnecessarily exposed catalog/SEO data to the client compilation graph. The filter and existing animation itself do not require redesign.
5. **Presentation thumbnail markup was excessive.** Small thumbnails used `fill` and a complete responsive gallery-width list, repeated for all 46 displayed pages. This inflated the presentation route's HTML and serialized image props.
6. **Duplicate Dolato media URLs.** The cover and gelato application were identical according to SHA-256 but used different URLs, preventing reuse of an otherwise identical image resource/optimizer cache entry when the size and quality match.
7. **A below-fold Snapchat viewer used priority loading.** It competed with the social case-study cover before the viewer was needed.

## Measured before and after

All image derivatives below use WebP at quality 100. Original files are untouched. The requested width is explicit; real browser downloads depend on screen width and device pixel ratio.

| Image / requested width | Original bytes | HTTP derivative bytes | Reduction |
| --- | ---: | ---: | ---: |
| Reference booklet standing cover / 384 px | 5,248,028 | 7,608 | 99.9% |
| Reference booklet standing cover / 1280 px | 5,248,028 | 191,698 | 96.3% |
| Dolato cover / 1280 px | 7,789,188 | 255,980 | 96.7% |
| RTA digital invitation / 1280 px | 9,910,592 | 559,006 | 94.4% |

The new responsive URL path was verified in served HTML. The social case study changed from 32 direct project images referencing 8,089,804 source bytes to zero direct raster images. The print route changed from two direct project images referencing 5,275,212 source bytes to zero. These are referenced source totals, not measured initial-viewport transfers; browser lazy loading means not every referenced image downloads immediately.

The presentation route's HTML changed from **266,625 bytes before the work to 161,548 bytes after**, a **39.4% reduction**, while still rendering the same 54 image elements (gallery covers, thumbnails, and shared site images). This is uncompressed local development HTML, not production compressed transfer size. Fixed thumbnail dimensions generate small 1x/2x variants rather than all gallery sizes. The intermediate configuration-only result was 295,134 bytes before this thumbnail refinement.

For the four sample derivatives, initial optimizer requests returned `MISS` and took 352–431 ms locally; repeated requests returned `HIT` and took 6–23 ms. The optimizer introduces a cold encode cost. These timings demonstrate working cache reuse, not a measured improvement in full-page loading speed. On loopback, downloading an original may even finish sooner despite its much larger payload.

Initial HTML response observations across five routes ranged from 99–630 ms. A later warm observation across the homepage, Work, and all 13 cases returned HTTP 200, with TTFB of 63–181 ms. These are different development/cache conditions and **must not be treated as before/after navigation gains**. Actual click-to-render and LCP remain unmeasured.

Responsive URLs add HTML markup on routes previously serving raw sources. For example, the social route's development HTML grew from 136,439 to 199,078 bytes while eliminating 8.09 MB of direct source-image references. The transfer benefit must ultimately be assessed with a browser waterfall on representative mobile and desktop connections.

## Implemented changes and files

| File | Change |
| --- | --- |
| `src/components/case-study/CaseStudyImage.tsx` | Restored Next.js responsive optimization; quality 100 and a container-aware default `sizes`; existing explicit dimensions, size hints, and loading props remain supported. |
| `src/components/WorkCard.tsx` | Eager/high-priority first cover, lazy subsequent covers; size hints match the existing grid/container. |
| `src/components/SelectedWorkGrid.tsx` | Server wrapper selects only the featured card fields. |
| `src/components/SelectedWorkGridClient.tsx` | Existing animated grid moved intact into a client component receiving selected card data; corrected responsive size hints. |
| `src/components/case-study/OrinCaseStudy.tsx` | Removed explicit optimization bypasses from browser frames, mobile frames, full-page screenshots, and LinkedIn previews. |
| `src/components/case-study/RenovoFixCaseStudy.tsx` | Responsive delivery for scrollable website screenshots. |
| `src/components/case-study/XFactorBrandGuidelinesShowcase.tsx` | Responsive delivery for the guidelines viewer and enlarged slide. |
| `src/components/case-study/SnapchatStoryViewer.tsx` | Lazy loading for the below-fold active story. |
| `src/components/case-study/PresentationDeckViewer.tsx` | Small fixed intrinsic thumbnail dimensions; existing outer frame dimensions and layout retained. |
| `src/components/case-study/DolatoCaseStudy.tsx` | Identical cover/application imagery shares the cover URL; original application file retained. |
| `next.config.ts` | Added 1280, 1536, and 2560 px responsive candidates to avoid large width jumps; direct project assets receive a one-hour cache with revalidation. No immutable caching of replaceable asset paths. |
| `scripts/project-performance-audit.mjs` | Repeatable source inventory and local route diagnostics; `--pages-only` suppresses the large asset listing. |
| `scripts/project-image-transfer.mjs` | Repeatable local source-versus-derivative byte/cache measurements. |

No production bundle-size reduction is claimed for the homepage server/client split because a new production build was explicitly excluded. It removes the catalog import from that client entry; its final bundle effect must be measured after visual approval.

## Assets to watch

No source asset replacement is required for these fixes. Keep originals for enlarged inspection and future export. The highest-priority masters for any future offline derivative pipeline are:

| Asset | Source dimensions | Source size |
| --- | --- | ---: |
| `3d-exhibition/rta/supporting/rta-eid-al-etihad-digital-invitation-mockup.webp` | 4000 × 3000 | 9.91 MB |
| `dolato-warm-winter-marvels/cover/dolato-warm-winter-marvels-hero.webp` | 3500 × 2336 | 7.79 MB |
| `presentations/alsallal-pitch-deck/slides/alsallal-developments-pitch-deck-source-page-13.webp` | 6640 × 3735 | 6.75 MB |
| Reference booklet mockups under `print/reference/` | 4500 × 3000 | 5.25–5.76 MB each |
| Riyadh Chamber renders under `3d-exhibition/riyadh-chamber/` | 3840 × 2160 | Several around 4.8–5.7 MB |

Next.js now supplies appropriately sized derivatives for previews. Original-resolution zoom downloads can still be large when the user requests them. If production cold image generation remains a bottleneck, pre-generated, versioned derivatives are the next option; none were created or substituted during this pass.

## Navigation, rendering, and design decisions

- Existing `next/link` navigation and default production prefetching remain enabled. Disabling prefetch globally would trade background traffic for slower clicks; there is no production waterfall demonstrating that tradeoff is needed.
- Existing above-fold case covers already use priority/preload or eager loading. The homepage portrait remains prioritized; project cards further down the homepage remain lazy.
- Gallery images remain lazy by default. Dialog-only original images are mounted on demand; carousel/deck viewers render the active page rather than downloading every full slide.
- Existing `VideoPlayer` uses `preload="none"`. No video autoplay or preload changes were needed.
- No animation duration, reveal behavior, card order, labels, typography, crop mode, aspect-ratio frame, or section layout was changed. No animation bottleneck was demonstrated by the available diagnostics.
- No new loading screen was added: the measured problem is largely image payload, and a loader would not reduce that payload.
- Existing Next.js optimized-image caching is retained. Local development image responses reported `max-age=0` while the optimizer still returned cache HITs. Production CDN/browser cache behavior is not established by this observation. Replace changed source images with new URLs when cache freshness is essential.

## Ready for visual review

Review `/`, `/work`, and representative cases (Social, Print, Orin, RenovoFix, X Factor, Dolato, Presentations) on mobile and desktop. Compare text sharpness at native screen DPR, original aspect ratios, website screenshot scrolling, modal detail, thumbnail clarity, first-cover appearance, and unchanged animations. Then authorize production validation and production browser measurements separately.

The pre-existing deletion of the old Alsallal-specific presentation OG asset was not part of this work and was left untouched.
