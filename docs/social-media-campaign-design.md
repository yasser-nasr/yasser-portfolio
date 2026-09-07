# Social Media & Campaign Design

Production route: https://yassernasr.com/work/social-media-campaign-design

## Curation

The prepared folder contains connected campaigns for Sand Circus (3 designs), Memo Travel (6), SBH (4), and LAPE (3). Seven additional designs are grouped under six client labels in the selected gallery. LAPE's supplied cover and avatar form the Facebook presentation. None of these featured clients has a dedicated current portfolio route, so no speculative case-study links were added. No standalone LinkedIn header was supplied; post filenames mentioning LinkedIn are treated as posts, not covers.

25 artworks were optimized to sRGB WebP without cropping or upscaling; typography is retained at quality 90. A 1600x1000 cover composition and 1200x630 JPEG OG image use the supplied artwork without redesigning it. All 27 delivery assets total 5.71 MB. Original files remain untouched. Repetitive language, destination, product, and pricing variants were skipped; the Moeen technical assignment was also omitted.

## Implementation and validation

- Existing publication flag is `publishable: true`, the equivalent of the brief's published:true. No second publication flag was introduced.
- Uses the existing Work card/filter, route, static parameters, sitemap, metadata, CreativeWork, BreadcrumbList, image zoom dialog, back navigation, and closing CTA.
- Page has exactly the requested five sections, one H1, and no Motion/Reels or Final Visual Mix section.
- All 25 selected artwork URLs and the OG image returned 200 in the production build.
- /work includes the new route; sitemap now has 16 canonical public pages.
- Canonical, index/follow, 1200x630 OG, summary_large_image Twitter, one CreativeWork, and three-item breadcrumb all verified in rendered HTML. Person ID preserved; no duplicate Person entity.
- Meaningful images have descriptive alt text. The hero composition and detailed artwork views have different presentation roles; interface decorations use aria-hidden.
- Intrinsic image dimensions, responsive sizes, lazy loading below the hero, unclipped artwork, flexible grids, and wrapping profile text are implemented. Only the hero is preloaded.
- TypeScript, lint (zero warnings), production build, and diff whitespace checks passed.
- Browser provider was unavailable, so desktop/mobile screenshot review, interactive zoom QA, and measured horizontal-overflow checks could not be completed. Responsive layout was reviewed in source; it is not recorded as browser-tested.
- No existing case study, shared component, stylesheet, dependency, or existing project record was changed. The existing production GitHub/Vercel workflow is used; no hosting migration.

## Files changed

- src/data/projects.ts
- src/app/work/[slug]/page.tsx

## Files created

- src/components/case-study/SocialMediaCampaignCaseStudy.tsx
- src/data/socialMediaCampaign.ts
- content/social-media-campaign-asset-mapping.json
- docs/social-media-campaign-design.md
- public/projects/social-media-campaign-design/cover/social-media-campaign-design-cover.webp
- public/projects/social-media-campaign-design/featured/lape/lape-climate-action.webp
- public/projects/social-media-campaign-design/featured/lape/lape-climate-initiative.webp
- public/projects/social-media-campaign-design/featured/lape/lape-cop28-goals.webp
- public/projects/social-media-campaign-design/featured/memo-travel/memo-travel-dahab.webp
- public/projects/social-media-campaign-design/featured/memo-travel/memo-travel-honeymoon.webp
- public/projects/social-media-campaign-design/featured/memo-travel/memo-travel-hurghada.webp
- public/projects/social-media-campaign-design/featured/memo-travel/memo-travel-istanbul.webp
- public/projects/social-media-campaign-design/featured/memo-travel/memo-travel-sinai.webp
- public/projects/social-media-campaign-design/featured/memo-travel/memo-travel-snorkeling.webp
- public/projects/social-media-campaign-design/featured/sand-circus/sand-circus-national-day.webp
- public/projects/social-media-campaign-design/featured/sand-circus/sand-circus-next-step.webp
- public/projects/social-media-campaign-design/featured/sand-circus/sand-circus-talent-brand.webp
- public/projects/social-media-campaign-design/featured/sbh/sbh-leasing-services.webp
- public/projects/social-media-campaign-design/featured/sbh/sbh-property-management.webp
- public/projects/social-media-campaign-design/featured/sbh/sbh-property-sales.webp
- public/projects/social-media-campaign-design/featured/sbh/sbh-real-estate-services.webp
- public/projects/social-media-campaign-design/og/social-media-campaign-design-og.jpg
- public/projects/social-media-campaign-design/profile-branding/lape-facebook-avatar.webp
- public/projects/social-media-campaign-design/profile-branding/lape-facebook-cover.webp
- public/projects/social-media-campaign-design/selected/alsallal-property-launch.webp
- public/projects/social-media-campaign-design/selected/cultural-development-fund-craft.webp
- public/projects/social-media-campaign-design/selected/cultural-development-fund-culinary.webp
- public/projects/social-media-campaign-design/selected/el-masrya-cookware-handle.webp
- public/projects/social-media-campaign-design/selected/madina-womens-hospital.webp
- public/projects/social-media-campaign-design/selected/saudi-council-of-engineers.webp
- public/projects/social-media-campaign-design/selected/skytrack-cargo-tracking.webp

## Files renamed

None. Semantic output names are new optimized copies. Source-to-output mapping is recorded in content/social-media-campaign-asset-mapping.json.

## Source files skipped

- 17-Mar-24_Webinar.png
- 200.png
- 203.png
- 302.png
- 7-May-25_Dahab_2.jpg
- 8-May-25_Sharm.jpg
- Artboard 1.jpg
- Artboard 2.jpg
- Jan-25_Istanbul_Memo.png
- Jan-25_Sinai_Memo_2.png
- Jan-25_Sinai_Memo_4.png
- Jan-25_Umra Pricing 10 Days.png
- Jan-25_Umra Pricing 15 Days.png
- Jan-25_Umra Pricing 7 Days.png
- Post_3.jpg
- Pro Crew Technical Task Assignment for Moeen - Yasser Nasr_3.png
- Saudi National Day_2025_Beyond.jpg
- Services_04.jpg
- Services_06.jpg
- Services_07.jpg
- Services_08.jpg
- Snap.jpg
- Talent × Brand_English_IG.jpg
