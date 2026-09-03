import Image from "@/components/case-study/CaseStudyImage";
import SocialMediaShowcase from "@/components/case-study/SocialMediaShowcase";
import VideoPlayer from "@/components/case-study/VideoPlayer";
import RenovoFixTypographySpecimen from "@/components/case-study/RenovoFixTypographySpecimen";
import RenovoFixLogoBreakdown from "@/components/case-study/RenovoFixLogoBreakdown";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const base = "/projects/renovofix";
const colors = [
  ["Primary Blue", "#4366B0"],
  ["Dark Navy", "#1E2A38"],
  ["Teal", "#14B7A5"],
  ["Light Teal", "#D6EEEE"],
  ["White", "#FFFFFF"],
  ["Soft Grey", "#F5F7F9"],
  ["Medium Grey", "#9CA3AF"],
  ["Dark Grey", "#4C5563"],
] as const;
const transformations = [1, 2, 3, 4].map((number) => `renovofix-ai-renovation-transformation-0${number}.mp4`);
const episodes = [
  ["Lighting", "lighting"], ["Bathroom", "bathroom"], ["Ceiling", "ceiling"], ["Flooring", "flooring"],
] as const;
const pillars = ["Problem Recognition", "Trust & Execution", "Education", "Speed & Response", "Before & After", "Easy Contact"];
const process = ["Business Direction", "Brand System", "Content & Campaigns", "Digital Experience", "Motion & Launch"];
const decisions = [
  ["Position Above Price", "Build the communication around reliability and peace of mind rather than low-cost maintenance."],
  ["Keep It Real", "Use recognizable UAE environments, believable situations, and realistic visual production."],
  ["Build Repeatable Systems", "Create reusable structures for campaigns, educational content, social media, and service communication."],
  ["Connect Every Touchpoint", "Maintain continuity from social content and visual identity through the website and enquiry journey."],
] as const;

function Heading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return <div><p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">{eyebrow}</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-ink md:text-5xl">{children}</h2></div>;
}

function Video({ src, label, poster, vertical = false }: { src: string; label: string; poster?: string; vertical?: boolean }) {
  return <figure className="min-w-0"><div className={`overflow-hidden rounded-xl bg-black ${vertical ? "aspect-[9/16]" : "aspect-video"}`}><VideoPlayer src={src} poster={poster} label={label} /></div><figcaption className="mt-3 text-sm leading-6 text-ink-faint">{label}</figcaption></figure>;
}

function WebsiteScreenshot({ file, title, width, height, mobile = false }: { file: string; title: string; width: number; height: number; mobile?: boolean }) {
  return <figure className={mobile ? "mx-auto w-full max-w-[18rem]" : "min-w-0"}>
    <div className={`overflow-hidden border border-edge bg-surface-card shadow-xl shadow-black/10 ${mobile ? "rounded-[2rem] border-[5px] border-[#1E2A38]" : "rounded-xl"}`}>
      {mobile ? <div className="relative z-10 mx-auto h-5 w-24 rounded-b-xl bg-[#1E2A38]" aria-hidden="true" /> : <div className="flex h-10 items-center gap-2 border-b border-edge bg-surface-deep px-4" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-ink-faint/45" /><span className="h-2.5 w-2.5 rounded-full bg-ink-faint/45" /><span className="h-2.5 w-2.5 rounded-full bg-ink-faint/45" /><span className="ml-3 h-5 flex-1 rounded-full bg-surface-card" /></div>}
      <div className={`overflow-y-auto overscroll-contain bg-white ${mobile ? "h-[32rem]" : "h-[30rem] md:h-[42rem]"}`} tabIndex={0} aria-label={`Scrollable ${title} website screenshot`}><Image src={`${base}/website/${file}`} alt={`RenovoFix ${title} website design.`} width={width} height={height} sizes={mobile ? "288px" : "(min-width: 1152px) 1152px, 100vw"} unoptimized className="h-auto w-full" /></div>
    </div><figcaption className="mt-3 text-sm text-ink-faint">{title} · Scroll to explore</figcaption>
  </figure>;
}

export default function RenovoFixCaseStudy({ project }: { project: Project }) {
  return <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40"><article className="mx-auto max-w-6xl px-6">
    <CaseStudyBackLink />

    <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-surface-card">
      <Image src={`${base}/renovofix-case-study-project-overview.webp`} alt="Overview of the connected RenovoFix identity, maintenance communication, social design, website, and motion system." fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
    </div>

    <header className="py-14 md:py-20">
      <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">{project.subtitle}</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-7xl">{project.companyName}</h1>
      <div className="mt-8 max-w-3xl space-y-3 text-lg leading-8 text-ink-soft md:text-xl md:leading-9"><p>RenovoFix is a UAE property maintenance brand created to make technical services feel professional, trustworthy, and easy to access.</p><p>I developed a connected brand and digital system spanning identity, social content, campaigns, website experience, motion, and AI-assisted visual production.</p></div>
      <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-3">
        <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Market</dt><dd className="mt-2 text-sm leading-6 text-ink">UAE</dd></div>
        <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Location</dt><dd className="mt-2 text-sm leading-6 text-ink">Dubai, UAE</dd></div>
        <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</dt><dd className="mt-2 text-sm leading-6 text-ink">Brand & Digital Designer, UI/UX Designer</dd></div>
      </dl>
      <div className="mt-7"><p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p><ul className="mt-3 flex flex-wrap gap-2">{["Brand Identity", "Social Media", "Campaigns", "Website", "Motion & Video", "Content Strategy"].map((item) => <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>)}</ul></div>
    </header>

    <section id="context" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Context">Project Context</Heading>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16"><div><h3 className="text-lg font-semibold text-ink">The Business</h3><p className="mt-4 leading-8 text-ink-soft">RenovoFix provides property maintenance and technical services for homeowners, tenants, property managers, and small businesses in the UAE, with a primary focus on Dubai.</p></div><div><h3 className="text-lg font-semibold text-ink">The Challenge</h3><p className="mt-4 leading-8 text-ink-soft">RenovoFix needed to stand apart from price-led maintenance providers by making professional execution, reliability, and trust visible before a customer booked the service.</p></div></div>
      <div className="mt-10 border-l-2 border-[#14B7A5] pl-6 md:max-w-4xl"><h3 className="text-lg font-semibold text-ink">The Approach</h3><p className="mt-3 leading-8 text-ink-soft">I translated the business direction into one connected brand and digital system across identity, content, campaigns, website experience, and motion.</p><p className="mt-4 text-sm text-ink-faint">Professional execution · Clear communication · Reliable service · Easy enquiry</p></div>
    </section>

    <section id="foundation" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Strategy">Brand Foundation</Heading>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16"><div><p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Naming</p><h3 className="mt-4 text-3xl font-semibold text-ink">Renovo + Fix</h3><dl className="mt-6 space-y-4 text-sm"><div><dt className="font-semibold text-ink">Renovo</dt><dd className="mt-1 text-ink-soft">Renovation and improvement</dd></div><div><dt className="font-semibold text-ink">Fix</dt><dd className="mt-1 text-ink-soft">Repair and maintenance</dd></div></dl><p className="mt-6 leading-7 text-ink-soft">The name connects the two sides of the business: improving spaces and solving everyday property problems.</p></div><div><p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Positioning</p><blockquote className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">Peace of mind,<br />not only maintenance.</blockquote><p className="mt-6 leading-8 text-ink-soft">RenovoFix was positioned above low-cost, inconsistent maintenance providers by emphasizing clean execution, reliability, clear communication, and respect for the customer&apos;s property.</p></div></div>
      <Image src={`${base}/renovofix-case-study-brand-positioning.webp`} alt="RenovoFix brand positioning focused on professional property maintenance, confidence, clarity, and peace of mind." width={1672} height={941} sizes="(min-width: 1152px) 1152px, 100vw" className="mt-12 h-auto w-full" />
    </section>

    <section id="identity" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Identity">Logo & Identity</Heading>
      <div className="mt-10 bg-[#F5F7F9] px-6 py-12 sm:px-10 md:py-16"><Image src={`${base}/logo/renovofix-horizontal-logo.svg`} alt="Final RenovoFix horizontal logo combining a home, hammer, and painted-edge treatment." width={720} height={215} sizes="(min-width: 768px) 720px, 85vw" className="mx-auto h-auto w-full max-w-3xl" /></div>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft">The RenovoFix mark combines a simplified home with maintenance and renovation references. A hammer is integrated into the roof structure, while the painted-edge treatment connects the symbol with property improvement and finishing.</p><RenovoFixLogoBreakdown />
    </section>

    <section id="brand-system" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="System">Brand System</Heading>
      <div className="mt-12"><h3 className="text-xl font-semibold text-ink">Color</h3><div className="mt-6 grid gap-4 sm:grid-cols-2">{colors.map(([name, hex]) => <div key={hex} className="overflow-hidden rounded-xl border border-edge bg-surface-card"><div className="aspect-[2/1]" style={{ backgroundColor: hex }} aria-label={`${name} color swatch, ${hex}`} role="img" /><div className="flex justify-between border-t border-edge p-4 text-sm text-ink"><span>{name}</span><code>{hex}</code></div></div>)}</div><p className="mt-6 max-w-3xl leading-8 text-ink-soft">Dark navy and blue establish professional trust and technical credibility, while teal introduces freshness and positive transformation. Neutral tones keep communication clear, spacious, and practical.</p></div>
      <div className="mt-16 border-t border-edge pt-14"><h3 className="text-xl font-semibold text-ink">Typography</h3><RenovoFixTypographySpecimen /><p className="mt-6 max-w-3xl leading-8 text-ink-soft">Poppins gives the English system a clean, modern structure, while GE SS provides clear professional Arabic typography with a compatible visual weight.</p></div>
    </section>

    <section id="social" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Content">Social Media System</Heading><p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">Social content was designed as a repeatable communication system that could recognize problems, build trust, explain services, and move the audience toward enquiry.</p><ul className="mt-7 flex flex-wrap gap-2">{pillars.map((pillar) => <li key={pillar} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{pillar}</li>)}</ul><SocialMediaShowcase />
      <div className="mt-8 grid gap-4 text-sm leading-6 text-ink-soft sm:grid-cols-3"><p><strong className="block text-xs uppercase tracking-[0.14em] text-ink">Real environments</strong>UAE homes and recognizable maintenance situations.</p><p><strong className="block text-xs uppercase tracking-[0.14em] text-ink">Controlled brand color</strong>Blue and teal support communication without overpowering photography.</p><p><strong className="block text-xs uppercase tracking-[0.14em] text-ink">Clean execution</strong>Organized environments reinforce professionalism and trust.</p></div>
    </section>

    <section id="video-production" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Video Production">AI-Generated Video Production</Heading><h3 className="mt-8 text-2xl font-semibold text-ink md:text-3xl">What Makes a Home Feel Expensive?</h3><div className="mt-4 max-w-3xl space-y-3 text-lg leading-8 text-ink-soft"><p>The series expanded RenovoFix beyond reactive maintenance by connecting renovation decisions with comfort, quality, and perceived value.</p><p>With no real footage, existing production materials, or previous-project library available, I created the visual production entirely with AI, then edited and assembled the covers, sequences, pacing, transitions, and sound into finished videos. This approach reduced the cost of traditional location shoots, staging, and production.</p></div><p className="mt-6 inline-flex border-l-2 border-[#14B7A5] pl-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink">AI-Generated Video · No real project footage or completed-project photography</p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{episodes.map(([name, slug]) => <Video key={name} src={`${base}/reels/renovofix-${slug}-educational-reel.mp4`} poster={`${base}/reels/renovofix-${slug}-educational-reel-cover.webp`} label={`${name} · RenovoFix educational reel`} vertical />)}</div>
    </section>

    <section id="ai-visualization" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Visualization">Visualizing the Outcome Before Completion</Heading><p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">Before completed renovation photography was available, I created AI-assisted proposed visualizations using the real site, purchased materials, existing architecture, and planned design direction. The output was refined to preserve layout, perspective, proportions, and material choices.</p>
      <ol className="mt-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-ink-soft">{["Actual Site", "Work in Progress", "Selected Materials", "Proposed Visualization", "Motion"].map((item, index) => <li key={item} className="flex items-center gap-2"><span className="rounded-full border border-edge px-3 py-2">{item}</span>{index < 4 && <span aria-hidden="true">→</span>}</li>)}</ol><p className="mt-8 inline-flex border-l-2 border-[#14B7A5] pl-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink">AI-Assisted Proposed Visualization</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">{transformations.map((file, index) => <Video key={file} src={`${base}/before-after/${file}`} label={`AI-assisted proposed renovation visualization ${index + 1}`} vertical={index > 0} />)}</div>
    </section>

    <section id="website" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Digital">Website Experience</Heading><p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">The website extended the RenovoFix identity into a practical service and enquiry experience, helping users understand services, review work, explore annual contracts, and contact the company through forms or WhatsApp.</p>
      <div className="mt-10 space-y-10"><WebsiteScreenshot file="renovofix-website-home-desktop.webp" title="Home · Desktop" width={2844} height={10454} /><div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.65fr)_minmax(15rem,0.65fr)]"><WebsiteScreenshot file="renovofix-website-services-desktop.webp" title="Services · Desktop" width={2844} height={12398} /><div className="grid gap-8"><WebsiteScreenshot file="renovofix-website-annual-contracts-mobile.webp" title="Annual Contracts · Mobile" width={800} height={16383} mobile /><WebsiteScreenshot file="renovofix-website-our-work-mobile.webp" title="Our Work · Mobile" width={800} height={16383} mobile /></div></div></div>
      <div className="mt-10 flex flex-col items-start gap-6 border-t border-edge pt-8 md:flex-row md:items-center md:justify-between"><p className="max-w-3xl text-sm leading-7 text-ink-soft">I led the project from brand and content strategy through UI/UX design, copywriting, website implementation, deployment, domain setup, contact forms, WhatsApp integration, testing, and launch.</p><a href="https://renovofix.ae" target="_blank" rel="noopener noreferrer" aria-label="Visit the live RenovoFix website (opens in a new tab)" className="inline-flex shrink-0 rounded-full border border-edge px-5 py-2.5 text-sm text-ink transition-colors hover:bg-surface-card">Visit renovofix.ae ↗</a></div><p className="mt-6 text-xs text-ink-faint">Homepage → Service selection → Service information → Contact form or WhatsApp → Enquiry</p>
    </section>

    <section id="decisions" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Rationale">Key Design Decisions</Heading><div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">{decisions.map(([title, description], index) => <article key={title} className="border-t border-edge pt-5"><p className="font-display text-sm text-ink-faint">0{index + 1}</p><h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-7 text-ink-soft">{description}</p></article>)}</div>
      <div className="mt-14 border-t border-edge pt-8"><p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Connected process</p><ol className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{process.map((item, index) => <li key={item} className="flex items-center gap-3"><span className="text-sm font-medium text-ink">{item}</span>{index < process.length - 1 && <span aria-hidden="true" className="text-ink-faint">→</span>}</li>)}</ol></div>
    </section>

    <section id="outcome" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Result">Outcome</Heading><div className="mt-8 max-w-4xl text-lg leading-8 text-ink-soft"><p>RenovoFix became one connected brand and digital system across identity, social content, campaigns, motion, AI-assisted visualization, and the website. The project established a consistent professional position and a clearer journey from service awareness to enquiry.</p></div></section>

    <section id="scope" className="border-t border-edge py-16 md:py-24"><Heading eyebrow="Contribution">Project Scope</Heading><div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8"><div><h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</h3><p className="mt-5 leading-8 text-ink">Brand & Digital Designer<br />UI/UX Designer</p></div><div><h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Responsibilities</h3><ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">{["Brand Strategy", "Identity Design", "Content & Campaigns", "UI/UX", "Website Implementation", "AI-Assisted Visual Production", "Motion & Video"].map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Deliverables</h3><ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">{["Logo & Identity", "Social Media System", "Campaigns", "Educational Series", "AI-Assisted Visualizations", "Website", "Reels & Motion"].map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

    <CaseStudyClosingCta title="Building a brand that needs a clear visual and digital system?" body="I help businesses connect identity, content, websites, and multimedia into consistent brand experiences." primaryLabel="Let’s Work Together" />
  </article></main>;
}
