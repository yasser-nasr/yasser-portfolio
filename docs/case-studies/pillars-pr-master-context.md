# Pillars PR case study: master context

## Status

- Case study status: unpublished development preview
- Publication state in project data: `publishable: false`
- Development URL: `/work/pillars-pr-brand-communication-design`
- Production behavior: route resolves as not found; the project is omitted from static params, public work listings, sitemap, and JSON-LD
- Indexing behavior: unpublished metadata is unavailable in production; development metadata includes `noindex, nofollow`

## Approved facts

| Field | Approved information |
| --- | --- |
| Project | Pillars PR |
| Existing logo lockup name | Pillars Public Relations; use only when explaining the lockup |
| Official tagline | Building Legal Excellence |
| Category | Legal Marketing & Public Relations |
| Company | Abu Dhabi, UAE-based marketing and public relations company specializing in the legal sector |
| Market | UAE · Saudi Arabia · MENA |
| Audience | Lawyers, law firms, legal professionals, legal institutions, law schools, and legal education organizations |
| Core positioning | A specialist bridge between legal expertise and modern marketing, public relations, and communication |
| Brand attributes | Credible, professional, structured, knowledgeable, modern, authoritative, clear, internationally aware, culturally sensitive, and specialist rather than generic |

## Project positioning

Pillars PR is presented as a specialist legal-sector partner, not a general marketing agency. The identity brings legal credibility and contemporary communication together in one recognizable system.

The sentence “Legal expertise, communicated with clarity.” is a case-study positioning summary. It is not an official company tagline.

## Role and ownership

Approved role titles:

- Brand & Digital Designer
- Graphic & Multimedia Designer

Confirmed work:

- Full visual identity
- Logo and identity system
- Brand visual direction
- Corporate documents
- Company-profile design
- Commercial and pricing documents
- Social-media design
- Logo animation and logo motion
- Motion graphics
- Video content and design
- Video editing where demonstrated by approved assets

Explicitly outside Yasser Nasr's role:

- Pillars PR website design
- UI/UX for the Pillars PR website
- Website or front-end development
- Deployment or domain setup
- Website implementation
- Ownership of website content strategy unless separately confirmed
- Marketing management or public-relations strategy

Website and website-content source material may be used only to understand company positioning, audience, services, mission, and communication context.

## Responsibilities used on the page

- Visual identity design
- Logo design
- Brand visual system
- Supporting graphic language and patterns
- Company-profile design
- Commercial and pricing-document design
- Social-media design system
- Logo motion
- Motion graphics
- Video design and editing

Color and typography systems must only be described in detail when specifications are verified from approved source assets. The current page refers only to the approved blue-led direction and does not publish color values or typeface names.

## Approved qualitative outcome

The result was a connected identity and communication system that gave Pillars PR a consistent presence across corporate documents, commercial material, social media, and motion.

The visual system helped express the company's specialist legal-market positioning while creating enough flexibility to support different communication formats and audiences across the region.

No quantitative business, revenue, acquisition, reach, engagement, or campaign-performance claims are approved.

## Asset inventory

No Pillars PR source or final artwork was found in the repository, its parent directory, or the wider `D:\Personal\Branding` tree on 15 August 2026.

| Asset group | Repository status | Page treatment |
| --- | --- | --- |
| Final logo files and lockups | Missing | Branded preview frame |
| Hero identity composition | Missing | Code-native unpublished preview visual |
| Brand-system overview | Missing | Branded preview frame |
| Company-profile spreads | Missing | Portrait preview frame |
| Commercial/pricing document spreads | Missing | Portrait preview frame |
| Social-media designs | Missing | Three square preview frames |
| Logo-animation master | Missing | Motion preview frame |
| Motion-graphics examples | Missing | Motion preview frame |
| Video-design/editing examples | Missing | Motion preview frame |
| Final case-study Open Graph image | Missing | Temporary 1200 × 630 SVG preview |

The working blue values used by the preview frames are presentation-only and are not documented as official Pillars PR brand specifications.

## File mappings

| Purpose | Current file | Final replacement target |
| --- | --- | --- |
| Case-study component | `src/components/case-study/PillarsPrCaseStudy.tsx` | Replace individual `PreviewVisual` instances with approved `next/image` or existing `VideoPlayer` media |
| Project data and SEO | `src/data/projects.ts` | Keep copy; update image path and set `publishable: true` only after approval |
| Dynamic route mapping | `src/app/work/[slug]/page.tsx` | No change expected |
| Temporary OG/work-card cover | `public/projects/pillars-pr/pillars-pr-og-preview.svg` | `public/projects/pillars-pr/pillars-pr-og.webp` or approved equivalent |
| Hero artwork | Not supplied | `public/projects/pillars-pr/pillars-pr-case-study-hero.webp` |
| Logo system | Not supplied | `public/projects/pillars-pr/identity/pillars-pr-logo-system.webp` |
| Visual-language overview | Not supplied | `public/projects/pillars-pr/identity/pillars-pr-visual-language.webp` |
| Company profile | Not supplied | `public/projects/pillars-pr/corporate/pillars-pr-company-profile-01.webp` onward |
| Commercial/pricing documents | Not supplied | `public/projects/pillars-pr/commercial/pillars-pr-commercial-document-01.webp` onward |
| Social media | Not supplied | `public/projects/pillars-pr/social-media/pillars-pr-social-media-01.webp` onward |
| Logo animation | Not supplied | `public/projects/pillars-pr/motion/pillars-pr-logo-animation.mp4` plus poster image |
| Motion/video reel | Not supplied | `public/projects/pillars-pr/motion/pillars-pr-motion-video-reel.mp4` plus poster image |

Recommended media conventions follow the existing portfolio: lowercase kebab-case names, WebP raster images, SVG for approved vector artwork when appropriate, MP4 for video, descriptive alt text, explicit dimensions, responsive `sizes`, and posters for video.

## Conflicts found and resolutions

| Conflict or risk | Resolution |
| --- | --- |
| “Pillars Public Relations” exists in the logo lockup, while the approved primary project title is “Pillars PR” | Use “Pillars PR” as the page title and project-card name. Reserve the expanded name for logo-lockup explanation if required by final assets. |
| “Designing the future today!” conflicts with the approved tagline | Excluded. Use “Building Legal Excellence.” |
| Website source material exists as contextual research but website work is not owned by Yasser | No website-design or website-development section, responsibility, deliverable, or metadata claim is included. |
| Exact palette and typography specifications are not verified | Do not state color values or typeface names. Preview-frame colors are explicitly temporary. |
| Page needs an OG image but final artwork is not approved | Use a clearly marked unpublished SVG preview; replace before publication. |
| No performance data is supplied | Use only the approved qualitative outcome. |

## Files and claims intentionally excluded

- “Designing the future today!” as a tagline or key message
- Any Pillars website screenshots as owned work
- Website design, UI/UX, development, deployment, domain, or implementation claims
- Website Developer, Front-End Developer, Web Developer, Marketing Manager, or PR Strategist as role titles
- Unverified audience segments beyond the approved legal-sector groups
- Unverified service lists
- Exact palette values and typography names
- Metrics, revenue, engagement, acquisition, reach, or campaign-performance claims
- Client testimonials, collaborator credits, launch dates, and engagement model until confirmed

## Confidential-source warnings

- Internal company, website-content, pricing, commercial, or strategic source files are research inputs only unless public-use permission is confirmed.
- Do not publish client pricing, commercial terms, private contact details, internal presentations, editable source files, or unreleased copy.
- Review every supplied document spread and video frame for confidential or personally identifiable information before export.
- Confirm public display rights for client-provided photography, footage, music, stock assets, fonts, and third-party marks.
- The public-copy file contains no confidential notes and is the only documentation file intended to supply page prose.

## Remaining missing assets

Publication-critical:

- Written confirmation that the Pillars PR work may be shown publicly
- Approved final hero composition
- Approved 1200 × 630 Open Graph image
- Final logo files or approved logo-system export
- At least one strong approved company-profile spread
- At least one approved commercial/pricing-document spread with confidential details removed
- A representative set of approved social-media designs
- Approved logo-animation and motion/video files with poster frames

Useful for case-study depth:

- Verified color specifications
- Verified typography specifications and web-display rights
- Supporting motif/pattern vector exports
- Additional corporate-document spreads
- Additional commercial-document spreads
- Motion breakdown frames or storyboard material

Facts requiring confirmation before publication:

- Public-display permission and any limitations
- Engagement dates or project year
- Engagement type
- Required collaborator or agency credits
- Client-approved description of the existing logo lockup if the expanded name is discussed
- Rights to all supplied visual and audio material

## Publication checklist

- [ ] Confirm client/publication permission.
- [ ] Confirm required credits and engagement details.
- [ ] Verify every public claim against approved source material.
- [ ] Confirm no website-design or development ownership is implied.
- [ ] Replace all `PreviewVisual` frames with approved project assets.
- [ ] Replace `pillars-pr-og-preview.svg` with the approved hero/OG image.
- [ ] Update the project `image`, dimensions, and alt text if the final cover changes.
- [ ] Add verified color/typography detail only if approved specifications are supplied.
- [ ] Remove or redact confidential pricing, contact, legal, and internal information.
- [ ] Confirm image, video, music, font, and third-party usage rights.
- [ ] Optimize images and videos; add descriptive alt text, video posters, and captions where needed.
- [ ] Check mobile, tablet, desktop, dark theme, keyboard navigation, and reduced-motion behavior.
- [ ] Validate metadata, canonical URL, OG/Twitter preview, and structured data.
- [ ] Change `publishable` to `true` only after content and assets receive final approval.
- [ ] Confirm the project then appears in static params, work listings, sitemap, and project JSON-LD.
- [ ] Run lint, typecheck, and production build before release.

## Approved SEO

- Slug: `/work/pillars-pr-brand-communication-design`
- SEO title: `Pillars PR Brand Identity & Communication Case Study | Yasser Nasr`
- Meta description: `A brand identity and visual communication case study for Pillars PR, covering corporate design, social media, commercial communication, logo motion, and multimedia for the legal sector.`
- Canonical: `https://yassernasr.com/work/pillars-pr-brand-communication-design`
- Open Graph title: `Pillars PR: Brand Identity & Communication System`
- Open Graph description: `Explore the identity, corporate communication, social media, and motion system created for an Abu Dhabi legal marketing and PR company.`
