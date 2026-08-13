import Image from "next/image";
import Link from "next/link";
import SocialMediaShowcase from "@/components/case-study/SocialMediaShowcase";
import VideoPlayer from "@/components/case-study/VideoPlayer";
import RenovoFixTypographySpecimen from "@/components/case-study/RenovoFixTypographySpecimen";
import RenovoFixLogoBreakdown from "@/components/case-study/RenovoFixLogoBreakdown";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";

const base = "/projects/renovofix";

const transformationVideos = [
  "renovofix-ai-renovation-transformation-01.mp4",
  "renovofix-ai-renovation-transformation-02.mp4",
  "renovofix-ai-renovation-transformation-03.mp4",
  "renovofix-ai-renovation-transformation-04.mp4",
];

const episodes = [
  ["Lighting", "renovofix-lighting-educational-reel-cover.webp", "renovofix-lighting-educational-reel.mp4"],
  ["Bathroom", "renovofix-bathroom-educational-reel-cover.webp", "renovofix-bathroom-educational-reel.mp4"],
  ["Ceiling", "renovofix-ceiling-educational-reel-cover.webp", "renovofix-ceiling-educational-reel.mp4"],
  ["Flooring", "renovofix-flooring-educational-reel-cover.webp", "renovofix-flooring-educational-reel.mp4"],
] as const;

const colors = [
  ["Primary Blue", "#4366B0", "CTAs, buttons, highlights"],
  ["Dark Navy", "#1E2A38", "Headlines, uniforms, primary brand presence"],
  ["Teal", "#14B7A5", "Icons, secondary highlights, supporting accents"],
  ["Light Teal", "#D6EEEE", "Soft branded sections and backgrounds"],
  ["White", "#FFFFFF", "Clean layouts and readability"],
  ["Soft Grey", "#F5F7F9", "Page sections and UI surfaces"],
  ["Medium Grey", "#9CA3AF", "Secondary text"],
  ["Dark Grey", "#4C5563", "Supporting text and darker details"],
];

const responsibilities = [
  "Brand positioning", "Naming and logo design", "Visual identity", "Color and typography systems",
  "Social-media strategy and content design", "Campaign design", "Bilingual content direction",
  "AI-assisted visual production", "Before-and-after visualization", "Website strategy and information architecture",
  "UI/UX and website design", "Copywriting", "Domain and deployment setup", "Contact forms and WhatsApp integration",
  "Website testing and launch", "Motion and video direction", "Reel editing and SFX direction",
];

const deliverables = [
  "Brand naming and logo design", "Brand positioning and visual identity system", "Color palette and typography direction",
  "Social-media visual system", "Content-pillar strategy", "Campaign concepts", "Educational content series",
  "Before-and-after visuals", "AI-assisted proposed visualizations", "Bilingual copy direction",
  "Website strategy and information architecture", "UI/UX and website design", "Website copy", "Responsive website",
  "Contact forms and WhatsApp integration", "Domain and deployment", "Website testing and launch",
  "Reels, AI-assisted videos, motion editing, and SFX direction",
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-edge py-16 md:py-24" id={id}>
      <Reveal className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          {eyebrow ? <p className="font-display text-base uppercase tracking-[0.2em] text-ink-faint md:text-lg">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
        </div>
        <div className="min-w-0 space-y-5 text-base leading-8 text-ink-soft md:text-lg">{children}</div>
      </Reveal>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />{item}</li>)}</ul>;
}

function MediaGrid() {
  return <SocialMediaShowcase />;
}

function Video({ src, label, poster, vertical = false }: { src: string; label: string; poster?: string; vertical?: boolean }) {
  return (
    <figure className="min-w-0">
      <div className={`overflow-hidden rounded-xl bg-black ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
        <VideoPlayer src={src} poster={poster} label={label} />
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-ink-faint">{label}</figcaption>
    </figure>
  );
}

function WebsiteScreenshot({
  file,
  title,
  width,
  height,
  mobile = false,
}: {
  file: string;
  title: string;
  width: number;
  height: number;
  mobile?: boolean;
}) {
  return (
    <figure className={mobile ? "mx-auto w-full max-w-[18rem]" : "min-w-0"}>
      <div className={`overflow-hidden border border-edge bg-surface-card shadow-xl shadow-black/10 ${mobile ? "rounded-[2rem] border-[5px] border-[#1E2A38]" : "rounded-xl"}`}>
        {mobile ? (
          <div className="relative z-10 mx-auto h-5 w-24 rounded-b-xl bg-[#1E2A38]" aria-hidden="true" />
        ) : (
          <div className="flex h-10 items-center gap-2 border-b border-edge bg-surface-deep px-4" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/45" />
            <span className="ml-3 h-5 flex-1 rounded-full bg-surface-card" />
          </div>
        )}
        <div className={`overflow-y-auto overscroll-contain bg-white ${mobile ? "h-[32rem]" : "h-[30rem] md:h-[38rem]"}`} tabIndex={0} aria-label={`Scrollable ${title} website screenshot`}>
          <Image
            src={`${base}/website/${file}`}
            alt={`RenovoFix ${title} website design.`}
            width={width}
            height={height}
            sizes={mobile ? "288px" : "(min-width: 768px) 58vw, 100vw"}
            className="h-auto w-full"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-ink-faint">{title} · Scroll to explore</figcaption>
    </figure>
  );
}

export default function RenovoFixCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <Link href="/work" className="text-sm text-ink-soft transition-colors hover:text-ink">← Back to Work</Link>

        <header className="py-12 md:py-20">
          <p className="font-display text-base uppercase tracking-[0.22em] text-ink-faint md:text-lg">{project.subtitle}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-7xl">{project.companyName}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-ink-soft md:text-2xl">RenovoFix is a UAE property maintenance brand created to make technical services feel professional, trustworthy, and easy to access.</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">I developed a connected brand and digital system covering visual identity, social content, campaigns, website design, UI/UX, copywriting, motion, and AI-assisted video production. The system positioned RenovoFix around reliable execution, clear communication, and peace of mind rather than price-led maintenance.</p>
          <dl className="mt-12 grid gap-7 border-t border-edge pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">Location</dt><dd className="mt-2 text-sm text-ink">{project.location}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">Role</dt><dd className="mt-2 text-sm text-ink">{project.role}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">Scope</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.scope?.join(", ")}</dd></div>
          </dl>
        </header>

        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-card sm:aspect-[16/9]">
          <Image
            src={`${base}/renovofix-case-study-hero-mobile.webp`}
            alt="RenovoFix property maintenance brand identity and digital design system displayed on a mobile case-study cover."
            fill
            priority
            sizes="100vw"
            className="object-cover sm:hidden"
          />
          <Image
            src={`${base}/renovofix-case-study-hero.webp`}
            alt="RenovoFix property maintenance brand identity, website, and social media system presented across branded applications."
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="hidden object-cover sm:block"
          />
        </div>

        <Section id="overview" title="Project overview">
          <p>RenovoFix provides property maintenance and technical services for homeowners, tenants, property managers, and small businesses in the UAE, with a primary focus on Dubai.</p>
          <p>The business covers services including AC maintenance, plumbing, electrical work, painting, renovation, refurbishment, flooring, water-tank cleaning, water-heater services, general maintenance, and annual maintenance contracts.</p>
          <p>The project required more than individual social-media designs. RenovoFix needed a complete visual and communication system that could connect its identity, content, website, campaigns, and customer journey.</p>
          <Image
            src={`${base}/renovofix-case-study-project-overview.webp`}
            alt="Overview of the connected RenovoFix brand, property-maintenance services, content, and digital experience."
            width={1672}
            height={941}
            sizes="(min-width: 1152px) 730px, 66vw"
            className="mt-8 h-auto w-full rounded-xl"
          />
        </Section>

        <Section id="challenge" title="The challenge">
          <p>RenovoFix needed to stand apart from price-led maintenance providers by making professional execution, reliability, and trust visible before a customer booked the service.</p>
          <p>The communication had to feel premium without becoming overly luxurious, technical without becoming complicated, and lead-focused without relying on aggressive sales language.</p>
          <p>It also needed to remain consistent across multiple services, campaigns, social content, bilingual communication, website pages, and customer contact points.</p>
        </Section>

        <Section id="approach" title="The Approach">
          <p>I translated RenovoFix’s business direction into one connected brand and digital system across visual identity, social content, campaigns, website experience, and motion.</p>
          <p>Each touchpoint was designed to communicate the same promise: professional execution, clear communication, reliable service, and an easy path to enquiry.</p>
          <p className="text-ink"><strong>Connected-system flow:</strong> Brand Strategy → Visual Identity → Content &amp; Campaigns → Website Experience → Motion &amp; Video</p>
          <p>This approach allowed RenovoFix to remain consistent across different services and platforms while building trust before the customer made contact.</p>
          <Image
            src="/projects/renovofix/approach/renovofix-case-study-approach.webp"
            alt="RenovoFix connected brand and digital system across brand strategy, visual identity, content and campaigns, website experience, and motion and video."
            width={1672}
            height={941}
            sizes="(min-width: 1152px) 730px, 66vw"
            className="mt-8 h-auto w-full rounded-xl"
          />
        </Section>

        <Section id="naming" title="Naming">
          <p>The name RenovoFix combines two ideas:</p>
          <ul><li><strong className="text-ink">Renovo</strong>, derived from renovation</li><li><strong className="text-ink">Fix</strong>, representing repair and property maintenance</li></ul>
          <p>The name reflects the two sides of the business: improving existing spaces and solving everyday property problems.</p>
        </Section>

        <Section id="positioning" title="Brand positioning">
          <p>RenovoFix was positioned above low-cost, inconsistent maintenance providers.</p>
          <p>Instead of competing primarily through price, the brand focuses on clean execution, reliable technicians, clear communication, fast response, attention to detail, respect for the customer’s property, and confidence that the work will be handled correctly.</p>
          <blockquote className="border-l-2 border-ink pl-6 text-xl leading-8 text-ink md:text-2xl">Peace of mind, not only maintenance.</blockquote>
          <p><strong className="text-ink">Positioning statement:</strong> Professional property maintenance that gives customers confidence, clarity, and peace of mind.</p>
          <Image
            src={`${base}/renovofix-case-study-brand-positioning.webp`}
            alt="RenovoFix brand positioning focused on professional property maintenance, confidence, clarity, and peace of mind."
            width={1672}
            height={941}
            sizes="(min-width: 1152px) 730px, 66vw"
            className="mt-8 h-auto w-full rounded-xl"
          />
        </Section>

        <Section id="identity" title="Logo and visual identity">
          <p>I created the RenovoFix logo to connect property care with technical maintenance through a direct, recognizable symbol.</p>
          <p>The mark combines a simplified house form with a hammer integrated into the roof structure. The house icon’s outer frame uses a painted-edge effect, referencing the act of painting and giving the symbol a more crafted, renovation-focused character. Together, these elements create an immediate connection between the property, repair, and improvement services.</p>
          <p>The final logo system includes horizontal and vertical lockups, dark-color and white versions, compact symbol application, and digital and uniform applications.</p>
          <RenovoFixLogoBreakdown />
        </Section>

        <Section id="color" title="Color system">
          <p>The palette was chosen to balance technical credibility with approachability. Dark navy creates a dependable, professional foundation and reflects the confidence customers expect from a property-maintenance provider. Primary blue supports trust and clarity while giving calls to action and service information a strong, recognizable presence.</p>
          <p>Teal introduces freshness and a sense of improvement, helping the brand communicate care, cleanliness, and positive transformation without feeling clinical. Light teal, white, and soft grey keep layouts spacious and easy to read, while medium and dark greys provide a practical hierarchy for supporting copy, interface details, and quieter information.</p>
          <p>Together, the colors help RenovoFix feel reliable, responsive, clean, and modern. Strong brand colors are used as controlled accents rather than heavy filters, allowing property imagery and real environments to remain natural, realistic, and locally relevant.</p>
          <div className="overflow-x-auto"><table className="w-full min-w-[36rem] text-left text-sm"><thead className="border-b border-edge text-ink"><tr><th className="py-3 font-medium">Color role</th><th className="py-3 font-medium">HEX</th><th className="py-3 font-medium">Usage</th></tr></thead><tbody>{colors.map(([role, hex, usage]) => <tr key={role} className="border-b border-edge/60"><td className="py-3"><span className="mr-3 inline-block h-3 w-3 rounded-full border border-black/10 align-middle" style={{ backgroundColor: hex }} />{role}</td><td className="py-3 font-mono text-xs">{hex}</td><td className="py-3">{usage}</td></tr>)}</tbody></table></div>
          <div className="mt-6 min-w-0 md:mt-8">
            <Image
              src={`${base}/renovofix-color-system-mobile.webp`}
              alt="RenovoFix color system showing all eight brand colors and HEX values in a mobile layout."
              width={864}
              height={1821}
              sizes="(max-width: 767px) calc(100vw - 64px), 0px"
              className="h-auto w-full rounded-lg object-contain md:hidden"
            />
            <Image
              src={`${base}/renovofix-color-system.webp`}
              alt="RenovoFix color system showing Primary Blue, Dark Navy, Teal, Light Teal, White, Soft Grey, Medium Grey, and Dark Grey with their HEX values."
              width={1672}
              height={941}
              sizes="(min-width: 1152px) 730px, (min-width: 768px) 66vw, 0px"
              className="hidden h-auto w-full rounded-xl object-contain md:block"
            />
          </div>
        </Section>

        <Section id="typography" title="Typography">
          <p>RenovoFix required a bilingual typography system that could feel modern, professional, and easy to read across social content, campaigns, and digital interfaces.</p>
          <p><strong className="text-ink">English typeface:</strong> Poppins</p>
          <p>Poppins was selected for English because its clean geometric structure supports the brand’s modern and technical character. Its clear letterforms work well across headlines, service names, website interfaces, and short campaign messages.</p>
          <p><strong className="text-ink">Arabic typeface:</strong> GE SS</p>
          <p>GE SS was selected for Arabic because it provides clear, professional Arabic letterforms while maintaining a visual weight and rhythm that pairs naturally with Poppins.</p>
          <p>Together, the two typefaces create a consistent bilingual hierarchy across headlines, service names, supporting copy, calls to action, website interfaces, and social-media layouts. The system prioritizes clarity and consistency rather than decorative typography.</p>
          <RenovoFixTypographySpecimen />
        </Section>

        <Section id="visual-language" title="Visual language">
          <p>The visual direction was built around realistic UAE residential environments and recognizable maintenance situations.</p>
          <p>Core imagery included Dubai apartments and villas, professional technicians, organized tools, clean service execution, AC, plumbing, and electrical problems, renovation and refurbishment, before-and-after comparisons, and customer contact moments.</p>
          <p>Art direction focused on natural lighting, realistic dimensions, balanced compositions, clear negative space, limited clutter, restrained brand-color accents, respectful UAE representation, and photographic rather than overly rendered results.</p>
        </Section>

        <Section id="social" title="Social media system">
          <p>Social media was designed as a scalable content and enquiry system rather than a collection of disconnected service advertisements.</p>
          <p>Every piece of content was created to support one or more of the following:</p>
          <BulletList items={["Recognize a real property problem", "Build trust in the service provider", "Explain the service or process", "Show professional execution", "Encourage timely action", "Move the audience toward DM or WhatsApp"]} />
          <h3 className="pt-4 text-lg font-semibold text-ink">Main content pillars</h3>
          <BulletList items={["Problem recognition", "Trust and execution", "Education", "Speed and response", "Before and after", "Low-friction contact"]} />
          <MediaGrid />
        </Section>

        <Section id="education" title="Educational content series, motion and video">
          <h3 className="text-xl font-semibold text-ink">What Makes a Home Feel Expensive?</h3>
          <p>This educational series expanded the RenovoFix communication beyond reactive maintenance. It connected renovation decisions with comfort, quality, visual value, and the everyday experience of a home.</p>
          <p><strong className="text-ink">Published episodes:</strong> Lighting, Bathroom, Ceiling, Flooring</p>
          <p>The visual system used a vertical 9:16 format, consistent episode structure, white typography, teal accent, blue episode badge, premium minimal composition, strong finished-space imagery, and short bilingual educational copy.</p>
          <p>Motion and video extended the series through reel concepts, AI-assisted video production, visual transitions, editing and pacing, vertical formatting, cover design, and visual consistency across frames.</p>
          <p>Instead of depending only on music, each reel uses sound effects connected to visible actions, transitions, surfaces, movement, and room ambience.</p>
          <p className="text-sm text-ink-faint">The videos start with sound enabled. Use the Sound On control if your browser or device has muted playback.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{episodes.map(([name, cover, video]) => <Video key={name} src={`${base}/reels/${video}`} poster={`${base}/reels/${cover}`} label={`RenovoFix ${name} educational reel.`} vertical />)}</div>
        </Section>

        <Section id="ai-visualization" title="Visualizing the outcome before completion">
          <p>During the early stage of the project, completed renovation photography and final before-and-after material were not yet available.</p>
          <p>To communicate the planned transformation and produce stronger lead-generation content, I developed AI-assisted visualizations based on the real site, work-in-progress photography, purchased materials, existing architecture, and planned renovation direction.</p>
          <p>The generated visuals were refined to preserve the room layout, camera perspective, proportions, and material choices while presenting a believable view of the intended result.</p>
          <p className="text-ink"><strong>Process:</strong> Actual site → Work in progress → Selected materials → AI-assisted visualization → Video transformation</p>
          <div className="mt-8 flex items-center gap-3"><span className="h-px w-10 bg-ink-faint" /><span className="text-xs font-medium uppercase tracking-[0.16em] text-ink">AI-Assisted Proposed Visualization</span></div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">{transformationVideos.map((file, index) => <Video key={file} src={`${base}/before-after/${file}`} label={`RenovoFix AI-assisted proposed renovation transformation ${index + 1}.`} />)}</div>
        </Section>

        <Section id="website" title="Website strategy">
          <p>The website extended the RenovoFix identity and content system into a practical service and enquiry experience.</p>
          <p>Its purpose was to establish credibility, explain available services, present professional execution, show previous work, promote annual maintenance contracts, support mobile visitors arriving from social media, and make contact through forms and WhatsApp simple.</p>
          <h3 className="pt-3 text-lg font-semibold text-ink">Final website structure</h3>
          <BulletList items={["Home", "About Us", "Services", "Annual Contracts", "Our Work", "Contact"]} />
          <p className="text-ink"><strong>Customer journey:</strong> Homepage → Service Selection → Service Information → Contact Form or WhatsApp → Enquiry</p>
          <div className="mt-8 overflow-hidden rounded-xl bg-[#F5F7F9]">
            <Image
            src={`${base}/website/renovofix-customer-journey-mobile.webp`}
              alt="RenovoFix website customer journey: 01 Homepage, 02 Service Selection, 03 Service Information, 04 Contact Form or WhatsApp, and 05 Enquiry."
              width={864}
              height={1821}
              sizes="100vw"
              className="h-auto w-full sm:hidden"
            />
            <Image
            src={`${base}/website/renovofix-customer-journey-desktop.webp`}
              alt="RenovoFix website customer journey: 01 Homepage, 02 Service Selection, 03 Service Information, 04 Contact Form or WhatsApp, and 05 Enquiry."
              width={1774}
              height={887}
              sizes="(min-width: 1152px) 730px, 66vw"
              className="hidden h-auto w-full sm:block"
            />
          </div>
        </Section>

        <Section id="website-design" title="Website design and UI/UX">
          <p>The website uses a clean, responsive interface aligned with RenovoFix’s professional positioning.</p>
          <p>The design direction uses clear navigation, strong service hierarchy, spacious layouts, dark navy for authority, blue for primary actions, teal for secondary emphasis, white and soft grey backgrounds, clear CTA sections, mobile-first contact access, and professional service imagery.</p>
          <p>Key conversion elements include service discovery, annual-contract information, project and work examples, contact forms, WhatsApp integration, and clear booking and quotation CTAs.</p>
          <h3 className="pt-3 text-lg font-semibold text-ink">Website responsibilities</h3>
          <p>I led the project from brand and content strategy through UI/UX design, copywriting, website implementation, deployment, domain setup, contact forms, WhatsApp integration, testing, and launch.</p>
          <a href="https://renovofix.ae" target="_blank" rel="noopener noreferrer" aria-label="Visit the live RenovoFix website (opens in a new tab)" className="inline-flex rounded-full border border-edge px-5 py-2.5 text-sm text-ink transition-colors hover:bg-surface-card">Visit renovofix.ae ↗</a>
          <div className="space-y-8 pt-5">
            <WebsiteScreenshot file="renovofix-website-home-desktop.webp" title="Home page · Desktop" width={1422} height={5554} />
            <WebsiteScreenshot file="renovofix-website-services-desktop.webp" title="Services page · Desktop" width={1422} height={6199} />
            <div className="grid gap-8 sm:grid-cols-2">
              <WebsiteScreenshot file="renovofix-website-annual-contracts-mobile.webp" title="Annual Contracts · Mobile" width={800} height={16383} mobile />
              <WebsiteScreenshot file="renovofix-website-our-work-mobile.webp" title="Our Work · Mobile" width={800} height={16383} mobile />
            </div>
          </div>
        </Section>

        <Section id="process" title="Design process">
          <ol className="grid gap-3 sm:grid-cols-2">
            {["Understand the business", "Reframe the value around reliability, clean execution, and peace of mind", "Build the visual identity", "Structure the content system", "Develop repeatable campaigns", "Build visual continuity across real and AI-assisted content", "Connect social media and the website", "Launch and test the website"].map((item, index) => (
              <li key={item} className="group relative overflow-hidden rounded-xl border border-edge bg-surface-card/45 p-5 transition-colors hover:border-ink/25 hover:bg-surface-card/70">
                <span className="font-display text-3xl text-ink-faint/45 transition-colors group-hover:text-ink-soft md:text-4xl">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-5 max-w-xs text-base font-medium leading-7 text-ink">{item}</p>
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ol>
        </Section>

        <Section id="decisions" title="Key design decisions"><BulletList items={["Position RenovoFix above low-cost providers", "Focus on peace of mind rather than only repair", "Use brand colors as controlled accents", "Maintain realistic and relatable UAE environments", "Keep bilingual copy short", "Use one main message per visual", "Avoid exaggerated fear-based imagery", "Create repeatable content systems", "Connect every touchpoint to a simple enquiry journey", "Use AI-assisted visualization transparently", "Use SFX-led motion instead of depending entirely on music", "Keep the website functional, responsive, and conversion-focused"]} /></Section>

        <Section id="outcome" title="Outcome">
          <p>The project created a consistent foundation for how RenovoFix looks, communicates, and guides customers across social media and the website.</p>
          <p>It established a clear professional position, recognizable visual identity, bilingual communication direction, repeatable social content pillars, scalable campaign formats, educational content systems, AI-assisted transformation content, a connected website experience, and a direct path from service awareness to enquiry.</p>
          <p>The RenovoFix website was launched successfully. No verified quantitative performance metrics are currently available, so the project is presented as a qualitative brand and digital system-building outcome rather than a performance claim.</p>
        </Section>

        <Section id="role" title="Role and responsibilities">
          <p><strong className="text-ink">Role:</strong> Brand & Digital Designer, UI/UX Designer</p>
          <p><strong className="text-ink">Responsibility summary:</strong> I led the project from brand and content strategy through UI/UX design, copywriting, website implementation, deployment, domain setup, contact forms, WhatsApp integration, testing, and launch.</p>
          <BulletList items={responsibilities} />
        </Section>

        <Section id="deliverables" title="Deliverables"><BulletList items={deliverables} /></Section>

        <section className="border-t border-edge py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight text-ink md:text-5xl">Building a brand that needs a clear visual and digital system?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft">I help businesses connect identity, content, websites, and multimedia into consistent brand experiences.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4"><Link href="/contact" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90">Let’s Work Together</Link><Link href="/work" className="rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card">Back to Work</Link></div>
        </section>
      </article>
    </main>
  );
}
