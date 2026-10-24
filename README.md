# Yasser Nasr Portfolio

Portfolio and case-study website built with Next.js, React, TypeScript, Tailwind CSS, Motion, and Resend. The interface uses Poppins plus the local Alpharush display font.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and configure the required values.
3. Start the site with `npm run dev`.
4. Open `http://localhost:3000`.

## Environment variables

- `RESEND_API_KEY`: Resend API key used by the contact route.
- `CONTACT_TO_EMAIL`: Inbox that receives contact submissions.
- `CONTACT_FROM_EMAIL`: Verified Resend sender address.
- `NEXT_PUBLIC_GA_ID`: Optional Google Analytics measurement ID.
- `NEXT_PUBLIC_CLARITY_ID`: Optional Microsoft Clarity project ID.

The contact form will return a configuration error until all three email variables are set.

Canonical metadata, sitemap URLs, and the robots sitemap reference use the fixed production origin `https://yassernasr.com` in `src/lib/site.ts`. `NEXT_PUBLIC_SITE_URL` is no longer used.

## Validation

Run these checks before committing or deploying:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## Production

Configure the environment variables in the deployment platform before building. Static project assets are served from `public/`, while the contact form is handled by `/api/contact`.

## Project organization

```text
src/
  app/                 Routes, metadata, global styles and the contact API
  components/          Grouped layout, animation, media, galleries and page sections
  data/                Portfolio content and project records
  hooks/               Reusable dialog-focus and reduced-motion hooks
  lib/                 Shared helpers, site configuration and media resolution
  fonts/               Project specimen fonts used by next/font
public/
  brand/               Identity assets and mascot
  icons/               App icons
  projects/            All active project images/videos, vectors, fonts and retained documents
docs/                  Website brief, brand context, technical and project documentation
scripts/               audit/, performance/, media/ and maintenance/ tools
reports/               Ignored local audit datasets and recovery records
```

Project media is consolidated under `public/projects/`. The resolver in `src/lib/optimized-media.ts` keeps logical IDs, AVIF overrides and selected video variants intact. Old `/projects-optimized/` and `/videos-optimized/` URLs are compatibility aliases in `next.config.ts`, not separate active media locations. Their empty former directory trees remain pending removal after the command runner blocked empty-folder deletion. Project pages have individual `src/app/work/<slug>/page.tsx` server entries to preserve route-specific client bundles.

Start with [the documentation index](docs/README.md), [the website brief](docs/website-brief.md), [brand context](docs/brand/personal-brand-context.md), [media-location guide](docs/assets/project-media.md), and [tooling guide](scripts/README.md).

Components are grouped into `layout`, `animation`, `media`, `galleries`, `ui`, `seo`, `home`, `about`, `capabilities`, `contact`, `resume`, `work`, and the existing client-specific `case-study` folder. Import leaf modules directly rather than adding an all-project barrel, which could recouple route bundles.

Reports belong outside `public/`. Both Git and Vercel ignore local audit output; Vercel also excludes authoring documents and diagnostic scripts. Required fonts stay in their current paths, including fonts under `public/projects/` referenced by `next/font`.

The 24 October 2026 organization audit preserved original Pillars source exports and an obsolete one-time cleanup driver in:

`D:\Personal\Branding\yasser-portfolio-organization-archive-2026-10-24`

Recovery hashes, exact moves, retained uncertain files and validation results are recorded in the local `reports/organization-2026-10-24/` folder. The earlier sibling cleanup backup and both Git repositories were left untouched. No environment secrets were moved.

### Diagnostic tools

- `node scripts/audit/audit-site.mjs` inspects an **existing** production build's route, SEO and media declarations without building again. Its results describe that build, not a fresh browser run.
- `node scripts/audit/audit-project-organization.mjs --after` inventories source references, candidate duplicates and organization without deleting anything.
- `scripts/media/project-performance-audit.mjs` and `scripts/media/project-image-transfer.mjs` inspect media/routes against a separately running server on port 3000.
- The `measure-site-performance`, `summarize-site-performance`, `profile-production-payloads`, `audit-production-media` and `profile-presentations-lighthouse` tools retain the dated 22 October datasets under `reports/site-2026-10-22/`. Their historical snapshots intentionally contain original paths. Review input/output paths before using them for a new baseline; do not overwrite recorded evidence casually. Production payload tools expect port 3010; the presentations tool expects port 3011.

All tools are opt-in. None runs during application startup or deployment. No cleanup script should be run against an old deletion plan.
