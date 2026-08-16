import Image from "next/image";
import { Montserrat, Playfair_Display } from "next/font/google";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import XFactorSocialMediaShowcase from "./XFactorSocialMediaShowcase";
import XFactorStationeryShowcase from "./XFactorStationeryShowcase";
import XFactorCompanyProfileShowcase from "./XFactorCompanyProfileShowcase";
import XFactorBrandGuidelinesShowcase from "./XFactorBrandGuidelinesShowcase";
import XFactorLogoShowcase from "./XFactorLogoShowcase";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500"] });
const base = "/projects/x-factor-interior-design";
const colors = [
  ["Charcoal", "#1C1C1C"],
  ["Warm Stone", "#F3F1EC"],
  ["Soft Concrete", "#D6D3CE"],
  ["Bronze", "#8A7A63"],
] as const;
const decisions = [
  ["Restraint Over Decoration", "Luxury was communicated through proportion, typography, materials, and space rather than decorative excess."],
  ["Design + Execution", "The identity needed to represent both creative refinement and technical confidence."],
  ["Editorial, Not Corporate", "Sophisticated editorial hierarchy gives the system character without becoming cold or institutional."],
  ["One Connected System", "The same principles extend across identity, corporate communication, stationery, and social media."],
] as const;

function Heading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return <div><p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">{eyebrow}</p><h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">{children}</h2></div>;
}

function OverviewTile({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`relative min-h-64 overflow-hidden bg-[#F3F1EC] ${className}`}><Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>;
}

export default function XFactorCaseStudy({ project }: { project: Project }) {
  return <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40"><article className="mx-auto max-w-6xl px-6">
    <CaseStudyBackLink />

    <div className="relative mt-6 aspect-[4/5] overflow-hidden bg-[#F3F1EC] sm:aspect-[16/9]">
      <Image src={`${base}/x-factor-interior-design-plain-brand-identity-cover.webp`} alt="X Factor Interior Design vertical logo on a refined warm-stone brand identity cover." fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-contain" />
    </div>

    <header className="py-14 md:py-20">
      <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">Brand Identity & Visual System</p>
      <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">X Factor Interior Design</h1>
      <div className="mt-8 max-w-3xl space-y-3 text-lg leading-8 text-ink-soft md:text-xl md:leading-9"><p>X Factor Interior Design is a high-end residential design studio built around refined spaces, precise execution, and long-term value.</p><p>I developed a complete visual identity and communication system spanning the logo, typography, color, pattern, brand guidelines, company profile, stationery, and social media.</p></div>
      <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-3"><div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Project</dt><dd className="mt-2 text-sm leading-6 text-ink">X Factor Interior Design</dd></div><div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Market</dt><dd className="mt-2 text-sm leading-6 text-ink">Dubai, UAE</dd></div><div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.role}</dd></div></dl>
      <div className="mt-7"><p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p><ul className="mt-3 flex flex-wrap gap-2">{["Brand Identity", "Visual Direction", "Company Profile", "Stationery", "Social Media"].map((item) => <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>)}</ul></div>
    </header>

    <figure className="border-t border-edge py-14 md:py-20">
      <div className="grid gap-2 sm:grid-cols-2"><OverviewTile src={`${base}/brand-guidelines/x-factor-interior-design-brand-guidelines-primary-logo.webp`} alt="X Factor Interior Design primary logo presented in the brand guidelines." className="sm:row-span-2 sm:min-h-[34rem]" /><OverviewTile src={`${base}/company-profile/x-factor-interior-design-company-profile-cover.webp`} alt="X Factor Interior Design company profile cover." /><div className="grid grid-cols-2 gap-2"><OverviewTile src={`${base}/stationery/x-factor-interior-design-business-card-mockup.webp`} alt="X Factor Interior Design business card system." className="min-h-48" /><OverviewTile src={`${base}/social-media/x-factor-interior-design-dubai-bespoke-interiors.webp`} alt="X Factor Interior Design social media design for bespoke Dubai interiors." className="min-h-48" /></div></div>
      <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-ink-faint"><span>Logo</span><span>Identity</span><span>Company profile</span><span>Stationery</span><span>Social media</span></figcaption>
    </figure>

    <section id="context" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="01 / Context">Project Context</Heading><div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16"><div><h3 className="text-lg font-semibold text-ink">The Challenge</h3><p className="mt-4 leading-8 text-ink-soft">Luxury interior brands often rely on similar visual codes: decorative excess, polished renderings, and broad claims of exclusivity. X Factor needed a more distinctive expression that could communicate refined taste without becoming ornamental, and technical confidence without feeling corporate.</p></div><div><h3 className="text-lg font-semibold text-ink">The Approach</h3><p className="mt-4 leading-8 text-ink-soft">The project began by positioning X Factor at the intersection of refined design and precise execution.</p><p className="mt-5 text-sm text-ink-faint">Quiet luxury · Architectural clarity · Precise execution · Timeless communication</p></div></div><Image src={`${base}/x-factor-interior-design-bedroom-before-after.webp`} alt="Before-and-after view of an unfinished Dubai bedroom transformed into a refined residential interior." width={1600} height={1000} sizes="(min-width: 1152px) 1152px, 100vw" className="mt-12 h-auto w-full" /></section>

    <section id="brand-idea" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="02 / Positioning">Refined Design. Precise Execution.</Heading><div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-14"><div><p className={`${playfair.className} text-4xl leading-tight text-ink md:text-6xl`}>Refined<br />Design</p><p className="mt-5 text-sm leading-7 text-ink-soft">Interior sensitivity · Material restraint<br />Proportion · Comfort</p></div><span aria-hidden="true" className="font-display text-4xl text-[#8A7A63]">×</span><div><p className={`${montserrat.className} text-4xl font-medium uppercase leading-tight tracking-[-0.04em] text-ink md:text-6xl`}>Precise<br />Execution</p><p className="mt-5 text-sm leading-7 text-ink-soft">Detail · Coordination<br />Craft · Delivery</p></div></div></section>

    <section id="identity" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="03 / Identity">Logo & Identity</Heading><div className="mt-10 bg-[#F3F1EC] px-8 py-16 md:py-24"><Image src={`${base}/logo/x-factor-interior-design-vertical-logo.svg`} alt="Primary vertical X Factor Interior Design logo." width={720} height={720} sizes="(min-width: 768px) 620px, 75vw" className="mx-auto h-auto w-full max-w-xl" /></div><p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft">The primary mark balances a sharp geometric form representing structure and precision with a softer curve that introduces creativity and human sensitivity. Vertical, horizontal, icon, and wordmark variations allow the identity to move confidently across editorial and digital formats.</p><XFactorLogoShowcase /></section>

    <section id="brand-system" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="04 / System">Brand System</Heading>
      <div className="mt-12"><h3 className="text-xl font-semibold text-ink">Color</h3><p className="mt-4 max-w-3xl leading-8 text-ink-soft">A restrained neutral palette keeps the identity calm and architectural, allowing materials, interiors, and project imagery to remain visually dominant.</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{colors.map(([name, hex]) => <div key={hex} className="overflow-hidden rounded-xl border border-edge bg-surface-card"><div className="aspect-[2/1]" style={{ backgroundColor: hex }} aria-label={`${name} color swatch, ${hex}`} role="img" /><div className="flex justify-between border-t border-edge p-4 text-sm text-ink"><span>{name}</span><code>{hex}</code></div></div>)}</div></div>
      <div className="mt-16 border-t border-edge pt-14"><h3 className="text-xl font-semibold text-ink">Typography</h3><div className="mt-7 overflow-hidden rounded-xl border border-edge bg-[#F3F1EC] text-[#1C1C1C]"><div className="grid md:grid-cols-2"><div className="p-7 sm:p-10 md:p-12"><p className="text-xs uppercase tracking-[0.18em] text-[#8A7A63]">Display / Playfair</p><p className={`${playfair.className} mt-10 text-5xl leading-[0.98] sm:text-7xl`}>Designing<br />the Essential.</p><p className={`${playfair.className} mt-10 text-2xl`}>Aa Bb Cc Dd</p></div><div className="border-t border-[#1C1C1C]/15 bg-[#1C1C1C] p-7 text-[#F3F1EC] sm:p-10 md:border-l md:border-t-0 md:p-12"><p className="text-xs uppercase tracking-[0.18em] text-[#D6D3CE]">Structure / Montserrat</p><p className={`${montserrat.className} mt-10 text-3xl font-medium uppercase leading-tight tracking-[-0.03em] sm:text-5xl`}>Refined design.<br />Precise execution.</p><p className={`${montserrat.className} mt-8 max-w-md text-sm leading-7 text-[#F3F1EC]/70`}>Clear hierarchy for practical communication, captions, services, and detailed information.</p><p className={`${montserrat.className} mt-10 text-lg tracking-[0.12em]`}>0123456789</p></div></div></div><p className="mt-6 max-w-3xl leading-8 text-ink-soft">The serif display typography introduces editorial refinement, while the sans-serif system provides structure and clarity across practical brand communication.</p></div>
    </section>

    <section id="pattern" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="05 / Supporting Language">Pattern & Brand Guidelines</Heading><Image src={`${base}/brand-guidelines/x-factor-interior-design-brand-guidelines-supporting-pattern.webp`} alt="X Factor Interior Design supporting pattern shown across light, charcoal, and warm-neutral colorways." width={2880} height={1620} sizes="(min-width: 1152px) 1152px, 100vw" className="mt-10 h-auto w-full" /><p className="mt-6 max-w-3xl leading-8 text-ink-soft">The flowing pattern extends the contrast between structure and sensitivity into backgrounds, stationery, and editorial details without competing with typography or imagery.</p><div className="mt-10"><XFactorBrandGuidelinesShowcase /></div></section>

    <section id="company-profile" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="06 / Corporate Communication">Company Profile</Heading><p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">The identity was extended into a structured company profile that balanced editorial refinement with clear communication of the studio&apos;s philosophy, services, process, and capabilities.</p><div className="mt-10"><XFactorCompanyProfileShowcase /></div></section>

    <section id="stationery" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="07 / Applications">Stationery</Heading><p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">The identity was translated into a restrained stationery system using the same typographic hierarchy, neutral palette, supporting pattern, and precise spacing.</p><div className="mt-10"><XFactorStationeryShowcase /></div></section>

    <section id="social" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="08 / Content">Social Media System</Heading><p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">The social system extends the identity into repeatable content around design philosophy, turnkey service, process, execution, and residential detail—maintaining luxury through restraint rather than excess.</p><XFactorSocialMediaShowcase /></section>

    <section id="visual-direction" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="09 / Art Direction">Brand in Context</Heading><div className="mt-10 grid gap-2 sm:grid-cols-2"><div className="relative aspect-[4/5] overflow-hidden"><Image src={`${base}/social-media/x-factor-interior-design-dubai-designed-comfort.webp`} alt="X Factor social design connecting refined residential imagery with the Designed Comfort brand message." fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="relative aspect-[4/5] overflow-hidden"><Image src={`${base}/social-media/x-factor-interior-design-dubai-interiors-lasting-value.webp`} alt="X Factor social design communicating lasting value through restrained interior art direction." fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div></div><div className="mt-8 grid gap-5 text-sm leading-6 text-ink-soft sm:grid-cols-2 lg:grid-cols-4">{[["Quiet Luxury", "Restrained material and color choices rather than decorative excess."], ["Architectural Clarity", "Balanced composition, proportion, and negative space."], ["Detail-Led", "Close attention to material junctions, lighting, and execution."], ["Realistic Presentation", "Soft natural light and believable residential environments."]].map(([title, copy], index) => <p key={title}><strong className="block text-xs uppercase tracking-[0.14em] text-ink">0{index + 1} / {title}</strong>{copy}</p>)}</div></section>

    <section id="decisions" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="10 / Rationale">Key Design Decisions</Heading><div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">{decisions.map(([title, description], index) => <article key={title} className="border-t border-edge pt-5"><p className="font-display text-sm text-ink-faint">0{index + 1}</p><h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-7 text-ink-soft">{description}</p></article>)}</div></section>

    <section id="outcome" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="11 / Result">Outcome</Heading><p className="mt-8 max-w-4xl text-lg leading-8 text-ink-soft">The result was a cohesive identity system that positioned X Factor Interior Design around refined design and precise execution. The visual language remained consistent across corporate communication, stationery, and social media while giving the studio a more distinctive and restrained presence within the luxury interior market.</p></section>

    <section id="scope" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="12 / Contribution">Project Scope</Heading><div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8"><div><h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</h3><p className="mt-5 leading-8 text-ink">{project.role}</p></div><div><h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Responsibilities</h3><ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">{["Branding & Visual Direction", "Logo & Identity System", "Color & Typography", "Brand Guidelines", "Supporting Pattern", "Company Profile", "Stationery", "Social Media System"].map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Deliverables</h3><ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">{["Logo", "Visual Identity", "Brand Guidelines", "Pattern", "Company Profile", "Business Card", "Letterhead", "Envelope", "Social Media Designs"].map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

    <CaseStudyClosingCta title="Let’s build a brand that works as one system." body="If you need a brand identity and communication system that feels connected across every touchpoint, let’s talk." />
  </article></main>;
}
