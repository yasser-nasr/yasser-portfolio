# Yasser Nasr Portfolio Website Brief

## 1. Strategic objective
Create a distinctive, career-first personal portfolio that presents Yasser Nasr as a senior multidisciplinary designer with strong brand and digital thinking. The primary audience is recruiters and creative directors; the secondary audience is agencies and direct clients. The structure must be ready to evolve into a service-led creative business later.

## 2. Desired visitor impression
Within the first minute, a visitor should understand:
- Yasser is a Senior Graphic Designer and Brand & Digital Designer.
- He builds connected visual systems rather than isolated assets.
- His work spans brand identity, digital experiences, campaigns, websites, motion, presentations, and print.
- He has 6+ years of experience and GCC market exposure.
- His approach combines detail, clarity, emotion, and communication.

## 3. Core messaging
### Main tagline
Every Great Visual Starts with a Pixel

### Secondary line
Pixel by Pixel, Message by Message

### Hero statement
I turn ideas into visual systems, digital experiences, and communication that people can understand, feel, and remember.

### Brand promise
Clear, consistent, and meaningful visual communication across every brand touchpoint.

### Positioning line
Senior Graphic Designer building brand and digital experiences that help businesses communicate clearly and connect with their audiences.

## 4. Visual concept
Every digital visual begins with a pixel. The pixel represents the smallest intentional detail from which a complete experience is built. The website should translate this concept through structure, motion, modularity, and detail—not through excessive pixel-art decoration.

## 5. Identity system
- Brand name: Yasser Nasr
- Primary symbol: pixel portrait mascot
- Wordmark: Yasser Nasr in Alpharush
- No YN monogram
- Display type: Alpharush, only for identity moments, short headlines, labels, and numbers
- Body type: Poppins
- Visual tone: dark-first, editorial, expressive, refined, reliable

## 6. Color tokens
Use the following starting tokens and refine only when contrast or implementation requires it:

- `--bg-main: #1D1D1B`
- `--bg-deep: #242424`
- `--bg-card: #2F2F2D`
- `--border: #3A3A38`
- `--text-main: #F2F0EA`
- `--text-secondary: #B8B8B2`
- `--text-muted: #7A7A76`
- `--bg-light: #E8E5DD`
- `--text-dark: #151515`

Never default to pure `#000000` or `#FFFFFF`.

## 7. Depth and glass direction
The website must have visual depth and must not feel like a flat black-and-white template.

Use a restrained system of:
- semi-transparent panels over layered backgrounds
- thin light borders with low opacity
- soft inset highlights
- backdrop blur where supported
- subtle gradients between charcoal tones
- large diffused radial highlights behind focal content
- faint grain/noise texture
- foreground/background separation through scale and blur

Glass should support hierarchy, not become the visual concept itself. Do not place every section inside a glass card.

## 8. Motion principles
Motion must reinforce the pixel-to-system idea.

Recommended behaviors:
- Mascot assembles from blocks/pixels on first load.
- Hero copy reveals in controlled staggered lines.
- Section headings use mask/clip reveals, not generic fade-only motion.
- Project cards use elegant image scale, light movement, and metadata reveal on hover.
- Background light fields move very subtly with pointer or scroll.
- Selected pixel/grid elements react lightly to interaction.
- Page transitions remain short and calm.

Accessibility:
- All essential information must remain visible without motion.
- Reduce or remove parallax, transforms, and long sequences under `prefers-reduced-motion`.

## 9. Homepage content hierarchy
1. Navigation
2. Hero
3. Professional proof strip
4. Selected work
5. Positioning statement
6. Capabilities preview
7. Experience, markets, and industries
8. About preview
9. Pixel philosophy
10. Final CTA
11. Footer

## 10. Homepage sections
### Navigation
- Pixel wordmark or compact identity lockup
- Work
- About
- Capabilities
- Contact
- Resume
- CTA: Let’s Connect

### Hero
- Tagline
- Yasser Nasr
- Senior Graphic Designer / Brand & Digital Designer
- Main hero statement
- Primary CTA: Explore Selected Work
- Secondary CTA: About Me
- Location/availability line
- Large mascot as a focal element

Desktop direction: text-left, mascot-right.
Mobile direction: text first, mascot after or integrated behind without harming readability.

### Proof strip
- 6+ Years of Experience
- GCC Market Experience
- Cross-Industry Design Experience
- 150+ Designers Mentored

### Selected work
Use placeholders until projects are approved. Each card will later contain:
- project name
- category
- industry
- year
- one-line value statement
- main image
- case-study link

### Positioning section
Headline: From the smallest detail to the complete system.
Explain that identity, web, campaign, motion, presentation, and print are connected parts of one communication system.

### Capabilities
1. Brand Identity & Visual Systems
2. Digital Design & Websites
3. Campaigns & Social Content
4. Motion, Presentations & Multimedia

Use numbered editorial sections or varied composition rather than four generic identical cards.

### Experience and markets
Mention work across Egypt, UAE, Saudi Arabia, and GCC markets, and experience in real estate, finance, legal, technology, education, home services, and development.

### About preview
Headline: The Designer Behind the Pixels
Combine professional positioning with a human introduction. The mascot may transition toward a real portrait later.

### Pixel philosophy
Explain the pixel concept briefly and clearly without repeating the full brand story.

### Final CTA
Headline: Have a role, project, or idea in mind?
Support: Let’s turn it into a clear, meaningful, and memorable visual experience.
Actions: Start a Conversation / Connect on LinkedIn

## 11. Responsive direction
- Use fluid type and spacing with sensible caps.
- Preserve hierarchy rather than simply reducing sizes.
- Avoid hover-dependent information on touch devices.
- Stack proof items as a 2×2 grid on smaller screens.
- Project cards become vertical and retain readable metadata.
- Capabilities become varied stacked sections or an accessible accordion if needed.
- Keep mascot detail readable but prevent it from overpowering small screens.

## 12. Content and marketing rules
- Recruiter-first, client-ready.
- Do not say or imply that Yasser is unemployed or urgently looking for work.
- Use Capabilities now; Services can be introduced later.
- Avoid generic claims such as “stunning design,” “out-of-the-box,” and “passionate creative.”
- Prefer language around clarity, systems, audience, detail, perception, consistency, experience, and connection.
- Never invent project outcomes or metrics.

## 13. Technical direction
- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion for React
- CSS variables for tokens
- Server components by default; client components only when interaction requires them
- `next/image` for image optimization
- Poppins via `next/font/google`
- Alpharush via `next/font/local` after licensed font file is placed in the project
- Avoid large UI libraries at launch

## 14. Definition of success for version one
The first version succeeds when it:
- feels unmistakably personal and not template-based
- communicates senior-level design positioning quickly
- has strong visual depth without reducing legibility
- works smoothly across mobile, tablet, laptop, and large desktop
- uses professional, purposeful animation
- loads quickly and maintains accessibility
- is structurally ready for real case studies and future services
