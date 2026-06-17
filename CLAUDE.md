# Claude Code Project Instructions — Yasser Nasr Portfolio

## Mandatory context
Before planning, coding, or changing the visual direction, read these files in the repository root:

1. `Yasser_Nasr_Personal_Brand_Context.md`
2. `WEBSITE-BRIEF.md`

Treat both documents as the source of truth. Do not replace brand decisions with generic portfolio conventions.

## Project goal
Build a career-first personal portfolio for Yasser Nasr that attracts recruiters, creative directors, agencies, and later premium clients. The website must feel distinctive, artistic, modern, and senior-level while remaining clear, usable, responsive, accessible, and fast.

## Technology
- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion for React (`motion/react`) for purposeful animations
- CSS custom properties for design tokens
- `next/image` for images
- Poppins for body copy through `next/font/google`
- Alpharush for selected display use through `next/font/local` after the licensed font file is supplied

Do not introduce a component library, CMS, database, authentication, GSAP, Three.js, or other large dependency unless the user approves it first.

## Working method
- Build one section or system at a time.
- Before a major implementation, explain the plan in plain language.
- Do not invent projects, client names, metrics, testimonials, or case-study results.
- Use clearly marked placeholders where real content is not available.
- Keep components reusable and data-driven.
- Keep content separate from layout where practical.
- After meaningful changes, run lint and production build.
- Never delete working content without explaining why.
- Preserve responsive behavior at all breakpoints.
- Prefer semantic HTML and accessible interactions.
- Respect `prefers-reduced-motion` and provide reduced-motion alternatives.

## Brand rules
- Primary name: Yasser Nasr
- Primary market title: Senior Graphic Designer
- Strategic descriptor: Brand & Digital Designer
- Main tagline: Every Great Visual Starts with a Pixel
- Secondary line: Pixel by Pixel, Message by Message
- Hero message: I turn ideas into visual systems, digital experiences, and communication that people can understand, feel, and remember.
- Main visual signature: the pixel mascot
- No YN monogram
- Display font: Alpharush, used selectively
- Body font: Poppins
- Dark-first grayscale identity; never use pure black or pure white
- The brand frame remains grayscale; portfolio work supplies most color

## Visual direction
The site must not look like a generic monochrome portfolio. Create depth using:
- layered near-black surfaces
- restrained translucent glass panels
- soft radial light fields
- subtle borders and highlights
- controlled blur and backdrop filtering
- mild grain/noise texture
- editorial grids and strong spacing
- large project imagery
- small, deliberate pixel details

Avoid:
- excessive glassmorphism
- neon gaming aesthetics
- heavy glitch effects
- constant pixel-art decoration
- generic template cards
- animation for decoration only
- poor contrast or unreadable text

## Motion direction
Motion should feel polished and intentional:
- pixel assembly/reveal for the mascot or selected headings
- staggered text reveals
- scroll-triggered section entrances
- subtle depth/parallax for background layers
- elegant card hover and image transitions
- smooth page/section transitions where performance allows

Keep motion fast enough to preserve usability. Do not animate every element.

## Responsive and quality rules
- Mobile-first behavior must be considered in every component.
- Test at approximately 360px, 768px, 1024px, and 1440px widths.
- Do not simply shrink desktop layouts; rethink stacking, spacing, typography, and interaction.
- Maintain keyboard navigation, visible focus states, contrast, alt text, and reduced-motion support.
- Prioritize stable layout, optimized imagery, and minimal client-side JavaScript.

## Initial sitemap
- `/` Home
- `/work` Work index
- `/work/[slug]` Project case study template
- `/about` About
- `/capabilities` Capabilities
- `/contact` Contact
- Resume PDF link/download

## Initial development order
1. Foundation: tokens, fonts, global styles, page shell
2. Navigation and responsive menu
3. Homepage hero
4. Proof strip
5. Selected work placeholders and card system
6. Positioning section
7. Capabilities preview
8. Markets/industries section
9. About preview
10. Pixel philosophy section
11. Final CTA and footer
12. Remaining pages
13. SEO, accessibility, performance, forms, and deployment
