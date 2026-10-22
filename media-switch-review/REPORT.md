# Optimized-media switch — review handoff

Implemented locally only. No commit or deployment. Existing design, project/media ordering, captions, alt text, SEO copy, navigation, animations, and player behavior were not intentionally changed. Original media, both optimized media sets, and the prior image/video review work were not edited.

## What now loads

- 478 verified image mappings select public/projects-optimized/; five extension changes select AVIF rather than the old WebP extension.
- 17 verified video mappings select public/videos-optimized/. The two Pillars primary copies are the -high-quality.mp4 variants, not the earlier CRF 18 candidates. No WebM alternatives were prepared, so existing MP4 source declarations remain correct.
- Covers, heroes, gallery previews, native-image zoom lightbox, slide/fullscreen/thumbnail viewers, Snapchat viewer, social galleries, video posters, Work/Home cards, project OG/Twitter images, and CreativeWork structured-data images resolve through the shared switch.
- SVG vectors and non-project/remote/brand media retain their original paths. Unknown or unverified media IDs are left unchanged rather than constructing a nonexistent optimized path.
- Authoring strings may still contain /projects/ as stable logical IDs; exported project cover/SEO data and rendering entry points resolve these to the verified optimized URLs. Already-resolved URLs are unchanged. No fs/report parsing is shipped to the browser; the client shares only an availability allowlist and path exceptions.
- Existing cache policy (public, max-age=3600, must-revalidate) is also applied to the two new media prefixes; no duration/security-policy change.

## Modified files in this pass

- src/app/motion-video/page.tsx
- src/components/case-study/AlsallalDevelopmentsCaseStudy.tsx
- src/components/case-study/CaseStudyImage.tsx
- src/components/case-study/DolatoCaseStudy.tsx
- src/components/case-study/LapeFacebookPage.tsx
- src/components/case-study/OrientaCollagenCaseStudy.tsx
- src/components/case-study/PresentationDeckViewer.tsx
- src/components/case-study/PrintDesignCaseStudy.tsx
- src/components/case-study/RilamCaseStudy.tsx
- src/components/case-study/SnapchatStoryViewer.tsx
- src/components/case-study/SocialMediaCampaignCaseStudy.tsx
- src/components/case-study/VideoPlayer.tsx
- src/components/case-study/ZoomableCaseStudyImage.tsx
- src/components/SelectedWorkGridClient.tsx
- src/components/WorkCard.tsx
- src/data/projects.ts
- src/data/work.ts
- src/lib/structuredData.ts
- next.config.ts

New application files:

- src/components/OptimizedImage.tsx
- src/lib/optimized-media.ts
- src/lib/optimized-media-manifest.ts

The media-switch-review/ directory contains this handoff, pre-change snapshot, exact mapping, and diagnostics. Pre-existing unrelated worktree changes were preserved. No stylesheet, page layout, typography, caption, animation, footer, navigation, or project-order edit was made by this switch.

## Collections switched

All 13 case-study routes plus the Motion & Video showcase passed HTTP diagnostics. Homepage featured work and Work listing passed too. Mappings include unused prepared files; counts below are mapping coverage, not claims that every file is downloaded on a page visit.

| Project asset folder | Images | Primary videos |
| --- | ---: | ---: |
| 3d-exhibition | 25 | 0 |
| alsallal-developments | 32 | 0 |
| dolato-warm-winter-marvels | 18 | 0 |
| mena-law-reporters | 45 | 1 |
| orienta-collagen | 11 | 0 |
| orin | 15 | 0 |
| pillars-pr | 81 | 3 |
| presentations | 48 | 0 |
| print | 50 | 0 |
| renovofix | 22 | 8 |
| rilam | 17 | 0 |
| social-media-campaign-design | 52 | 0 |
| videos-reels | 6 | 4 |
| x-factor-interior-design | 56 | 1 |

## Media remaining original / missing matches

- /projects/presentations/alsallal-pitch-deck/slides/alsallal-developments-pitch-deck-source-page-07.webp
  - Optimized target absent; original exists. Source pages 07 and 08 are not in the current displayed Alsallal deck. No missing target was forced into the site.
- /projects/presentations/alsallal-pitch-deck/slides/alsallal-developments-pitch-deck-source-page-08.webp
  - Optimized target absent; original exists. Source pages 07 and 08 are not in the current displayed Alsallal deck. No missing target was forced into the site.

14 distinct project SVG URLs were observed in the rendered pages, all present. They have no raster-optimization counterpart and remain on original vector files:

- /projects/mena-law-reporters/mena-law-reporters-logo.svg
- /projects/alsallal-developments/identity/alsallal-developments-logo.svg
- /projects/rilam/rilam-saudi-abaya-brand-logo.svg
- /projects/orin/orin-business-consultancy-logo.svg
- /projects/pillars-pr/pillars-icons/pillars-pr-logo-foundation-pillar-icon.svg
- /projects/pillars-pr/pillars-icons/pillars-pr-logo-connected-pillars-icon.svg
- /projects/pillars-pr/pillars-icons/pillars-pr-logo-ascending-growth-pillars-icon.svg
- /projects/pillars-pr/pillars-icons/pillars-pr-logo-detailed-white-pillars-icon.svg
- /projects/x-factor-interior-design/logo/x-factor-interior-design-vertical-logo.svg
- /projects/x-factor-interior-design/logo/x-factor-interior-design-horizontal-logo.svg
- /projects/x-factor-interior-design/logo/x-factor-interior-design-icon-logo.svg
- /projects/x-factor-interior-design/logo/x-factor-interior-design-wordmark-logo.svg
- /projects/renovofix/logo/renovofix-horizontal-logo.svg
- /projects/renovofix/logo/renovofix-vertical-logo.svg

Brand assets, flags, fonts, and unrelated non-project assets were not in the prepared optimization sets and were not rerouted. No active rendered raster/video URL with a verified optimized match was missed. All 17 selected primary videos were available. Eleven prepared image exceptions retain original-quality bytes in the optimized directory; switching their URL does not make those individual images smaller. Three primary videos are lossless remuxes, with little/no size change. The small RenovoFix transformation-03 saving remains marginal, as documented in the prior approved experiment.

## Validation performed (not lint/build/test/type-check commands)

- 16 route GETs: all HTTP 200; includes /, /work, /motion-video, and all 13 project routes.
- Server-rendered src/srcset/poster and OG/Twitter URLs inspected: zero mapped original URLs left at the rendering sinks. Logical IDs in serialized data are intentionally resolved at render time.
- 510 direct asset HEAD checks plus 33 representative responsive Next Image API HEAD checks: all HTTP 200. Every selected optimized target was checked directly; not every responsive width was generated.
- All 17 video range requests: HTTP 206, video/mp4, requested 1,024 bytes returned. This confirms file serving/seeking prerequisites, not actual browser playback.
- All 478 selected images have readable Sharp metadata and match the approved report dimensions. The representative Next Image API checks exercise actual derivative rendering; full decoding of every raster was not repeated. No extra resizing/cropping was performed in this pass; existing layout dimensions and object-fit props are untouched.
- Target SHA-256 hashes match the prepared reports before inclusion; the prior video report already records decoded frame counts, exact primary soundtrack hashes, and lossless-remux checks.
- 1282 media/review files verified byte-for-byte unchanged from this pass's baseline. No original or optimized asset was overwritten, deleted, renamed, or moved.
- Static lightbox/viewer path wiring is covered: native img src resolves explicitly, and every project Next Image entry point uses the shared URL wrapper. Existing open/close, focus, keyboard, slide order, and aspect-ratio logic was left unchanged.
- No final HTTP or asset-serving issue was found. A temporary development-HMR undefined-import error during editing was corrected before these final route checks; all final route responses are 200.

## Important review limitation

No browser surface was enabled in this session. Browser discovery returned no enabled browsers, and opening IAB returned “Browser is not available”. Actual visible quality, desktop/mobile rendering, lightbox interaction, and in-browser playback/audio cannot be certified by HTTP diagnostics. Those checks remain for manual review; no unsupported claim that they passed is made. If a visible/playback issue is found, keep that item on its original by excluding its mapping, without changing either media file.

## Expected loading impact

For the 478 image matches actually available at switch time, prepared source bytes are 314,607,404 → 203,943,724 (35.18% lower). The primary video set is 510,500,847 → 381,431,881 bytes (25.28% lower). This should reduce source-media transfer/storage requirements where re-encoded copies are used. Already-small exact copies and quality exceptions do not shrink. Actual responsive browser transfer, route-navigation timing, first-frame latency, and cache behavior were not benchmarked before/after. Next Image still applies its existing responsive behavior and quality settings; a cold image-optimization cache may temporarily mask the source-byte benefit.

## Review / rollback

Review localhost:3000 with a fresh reload. Open a gallery lightbox, advance presentation slides (including resized approved slides), inspect AVIF-backed images, and play the 17 videos on desktop/mobile browsers. Current playback settings including the existing sound behavior are unchanged.

Original directories remain complete relative to this pass's baseline. To retain one problematic original, remove its exact allowlist/video mapping entry (or its image override and availability entry); the resolver then leaves that original URL unchanged. For a full rollback, revert only this pass's source changes using the captured baseline while preserving unrelated edits. Do not use a broad git reset because the worktree already contained user changes.

Machine-readable evidence: [diagnostics.json](diagnostics.json), [mapping.json](mapping.json), [baseline.json](baseline.json). No lint, build, tests, or type-checking were run. Stop here for review; nothing has been published.
