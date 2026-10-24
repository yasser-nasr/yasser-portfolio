# Project media locations and URL preservation

All active project media was consolidated under `public/projects/` on 24 October 2026. Files were moved without recompression; the currently selected optimized images and videos remain byte-identical.

| Purpose | Location |
| --- | --- |
| Personal identity, portrait, mascot and CV | `public/brand/` |
| App/touch icons | `public/icons/` |
| Active optimized project images and videos | `public/projects/<project>/` |
| Required vectors, specimen fonts, identity/OG endpoints and retained source documents | Their existing project subfolders under `public/projects/` |
| RenovoFix local specimen fonts | `src/fonts/renovofix/` |
| Main display font | `src/app/fonts/` |

## Project directories

Image folders are `3d-exhibition`, `alsallal-developments`, `dolato-warm-winter-marvels`, `mena-law-reporters`, `orienta-collagen`, `orin`, `pillars-pr`, `presentations`, `print`, `renovofix`, `rilam`, `social-media-campaign-design`, `videos-reels`, and `x-factor-interior-design`. The gallery collections `presentations`, `print`, and `social-media-campaign-design` retain their existing client/document subfolders.

Motion collections now use the corresponding folder inside `public/projects/`: `mena-law-reporters`, `pillars-pr`, `renovofix`, `videos-reels`, and `x-factor-interior-design`. Their existing subfolders and filenames are retained.

`src/lib/optimized-media-manifest.ts` is the exact mapping of logical originals to 478 image and 17 video targets, including AVIF overrides. `src/lib/optimized-media.ts` resolves those IDs. Shared wrappers are now in `src/components/media/`; galleries are in `src/components/galleries/`.

The media resolver now emits `/projects/` URLs. Compatibility rewrites keep old `/projects-optimized/` and `/videos-optimized/` links, cached Next Image requests and video range requests working. Do not remove those rewrites just because the former directories hold no files.

Nineteen identical collision copies and two different older versions were preserved outside the app at `D:\Personal\Branding\yasser-portfolio-organization-archive-2026-10-24\media-merge-2026-10-24`. The optimized versions previously used by the website remain active. No original was silently overwritten. The two former source directory trees are empty but remain present because their removal command was blocked.

A missing direct import is not proof that an asset can be removed. Public originals retained for URL compatibility, fonts or unique authoring work still require a separate reviewed retirement decision.
