# Portfolio UI/UX Guidelines

## System

- Use the existing Yasser Nasr UI/UX system and dark editorial visual language. Extend existing tokens, spacing, typography, motion, and case-study components before creating new patterns.
- Do not redesign the site or add unnecessary cards. Presentation UI must support the artwork, never overpower it.
- Preserve original source-asset dimensions, format, and quality. Do not compress, resize, convert, or replace used media with lower-quality versions.

## Case studies

- Keep case studies visual-first, generally around 80% visuals and 20% concise copy.
- Favor large imagery and varied editorial layouts while preserving responsive behavior and clear hierarchy.
- Present campaign systems as connected visual groups.
- Give clients with three or more related designs a dedicated subsection. Place clients with only one or two designs in a curated Selected Work section.
- Present Instagram work in a realistic profile/grid context without excessive fake UI. Present Facebook branding with realistic cover-and-profile context, and LinkedIn covers in realistic header/profile context.
- Motion and video may use a separate portfolio collection when that produces a clearer body of work.

## Loading performance — required for every new case study

- Keep the page and static narrative server-rendered. The hero, H1 and critical introduction must be visible before hydration; retain below-fold animations only where useful.
- Use `CaseStudyImage` for the actual above-fold hero, with its correct intrinsic dimensions, layout-specific `sizes`, and `loading="eager"` / `fetchPriority="high"`. Do not prioritize every image or add a duplicate preload.
- Use `ProjectArtwork` for new below-fold, clickable artwork. Supply the real width/height, descriptive alt text and accurate responsive `sizes`. It provides bounded viewport loading and a responsive, quality-100 lightbox without changing the source asset. Keep covers non-clickable unless requested.
- Preserve aspect ratios before **and** after image activation. A square transparent placeholder must not override the supplied image proportions. Use fixed-aspect parents for fill images; reserve intrinsic proportions for width/height images.
- Match `sizes` to actual columns, gaps, maximum widths and mobile spans. Keep full-resolution source files out of thumbnail requests. Preserve existing visual quality and original media; do not recompress already optimized assets unnecessarily.
- For new project assets, target less than 1 MB (1,000,000 bytes) per file without unnecessary resizing. Compare high-quality WebP and AVIF where useful; 10-bit 4:4:4 AVIF can retain coloured lettering better at the target size. Codec quality numbers are not directly comparable. Check native-size text, edges, gradients and colours, and flag exceptions instead of forcing visible damage. Keep verified originals outside `public/`; retain WebP compatibility for existing public URLs and social previews when changing formats.
- Warm only likely selections after clear intent. Avoid immediate full-file downloads while a pointer crosses a gallery. Lightbox preparation must request the same responsive variant as the opened viewer; respect Save-Data/slow connections.
- Use the existing `VideoPlayer` for MP4 clips: deferred offscreen posters, server-side `preload="none"`, bounded visible/intent metadata preparation, and existing controls/audio behaviour. Preserve autoplay/loop where deliberately implemented; never download every clip upfront. Verify MIME/source handling if adding other formats.
- Reuse `OptimizedImage`/`optimizedMediaSrc`, shared galleries and lightboxes. Add no heavy client dependency or extra font without a demonstrated need. Keep caching correct for unversioned URLs; do not apply immutable caching blindly.
- Before review, inspect initial requests, responsive variants, image-open/playback behaviour, placeholder geometry, aspect ratios and broken URLs on mobile and desktop. Compare before/after under the same conditions and distinguish bytes, interaction time, LCP and Network finish time.
- Report only measured gains. Local development diagnostics do not prove production Lighthouse or live Vercel improvements. Explain any necessary production build before running it; do not run lint/build/tests/type-checking during visual iterations or deploy automatically.

## Definition of done

- Public projects are published, indexable, and included in the sitemap by default.
- Every page has correct canonical, metadata, OG data, structured data, one H1, meaningful image alt text (or an intentionally empty alt for decorative/repeated images), valid internal links, and working assets.
- Verify desktop, tablet, and mobile layouts for overflow, cropping, spacing, layout shift, keyboard access, focus behavior, and reduced motion.
- Keep unpublished work out of public grids, static params, metadata, structured data, and the sitemap.
- Assign each new Work entry its supported industry tags in `src/data/workIndustries.ts`, using the shared names in `src/data/markets.ts`. Tag collections with the industries actually represented; do not infer industries from a location or a design capability. The Work industry and capability filters combine, and only industries with published work should appear as choices.
