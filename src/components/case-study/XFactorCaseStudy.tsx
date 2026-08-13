import Link from "next/link";
import Image from "next/image";
import { Montserrat, Playfair_Display } from "next/font/google";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import XFactorSocialMediaShowcase from "./XFactorSocialMediaShowcase";
import XFactorStationeryShowcase from "./XFactorStationeryShowcase";
import XFactorCompanyProfileShowcase from "./XFactorCompanyProfileShowcase";
import XFactorBrandGuidelinesShowcase from "./XFactorBrandGuidelinesShowcase";
import XFactorLogoShowcase from "./XFactorLogoShowcase";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500"] });

const responsibilities = [
  "Brand identity and visual direction", "Logo design", "Color and typography system",
  "Brand guidelines and supporting pattern", "Company-profile design",
  "Stationery design, including business card, letterhead, and envelope", "Social media design system",
];

const deliverables = [
  "Branding", "Logo", "Color system", "Typography system", "Brand guidelines",
  "Supporting pattern", "Company profile", "Business card", "Letterhead", "Envelope", "Social media designs",
];

const pillars = [
  ["Designing the Essential", "Meaningful design without excess."],
  ["Refined Residential Living", "Elevated spaces for everyday life."],
  ["Technical Confidence", "Clarity, coordination, and disciplined execution."],
  ["Material Intelligence", "Considered choices in texture, finish, lighting, and durability."],
  ["Personal Identity", "Interiors shaped around the client, context, and lifestyle."],
] as const;

const colors = [
  ["Charcoal", "#1C1C1C"], ["Warm Stone", "#F3F1EC"],
  ["Soft Concrete", "#D6D3CE"], ["Bronze", "#8A7A63"],
] as const;

const process = [
  "Define the audience, positioning, promise, personality, and communication pillars.",
  "Translate the strategy into an identity concept and editorial design language.",
  "Establish color, typography, composition, photography, and messaging rules.",
  "Document the system through clear brand guidelines.",
  "Extend the identity across the company profile and stationery.",
  "Translate the visual language into a consistent social media system.",
];

function Section({ id, title, children }: { id: string; number?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-edge py-16 md:py-24">
      <Reveal className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
        </div>
        <div className="min-w-0 space-y-5 text-base leading-8 text-ink-soft md:text-lg">{children}</div>
      </Reveal>
    </section>
  );
}

function DotList({ items }: { items: readonly string[] }) {
  return <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-[0.75em] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />{item}</li>)}</ul>;
}

export default function XFactorCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <Link href="/work" className="inline-flex min-h-11 items-center text-sm text-ink-soft transition-colors hover:text-ink">← Back to Work</Link>

        <header className="py-12 md:py-20">
          <p className="font-display text-base uppercase tracking-[0.22em] text-ink-faint md:text-lg">{project.subtitle}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-7xl">{project.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-ink-soft md:text-2xl">X Factor is a Dubai interior design studio focused on refined residential spaces and turnkey delivery.</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">I developed a connected identity and communication system covering the logo, visual identity, brand guidelines, editorial collateral, stationery, and social media.</p>
          <dl className="mt-12 grid gap-7 border-t border-edge pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">Location</dt><dd className="mt-2 text-sm text-ink">{project.location}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">Role</dt><dd className="mt-2 text-sm text-ink">{project.role}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">Scope</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.scope?.join(", ")}</dd></div>
          </dl>
        </header>
        <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-surface-card">
          <Image
            src="/projects/x-factor-interior-design/x-factor-interior-design-cover.webp"
            alt="Black architectural moodboard flat lay with material, textile, and building samples for X Factor Interior Design."
            fill
            priority
            sizes="(min-width: 1280px) 1152px, calc(100vw - 3rem)"
            className="object-cover"
          />
        </figure>

        <Section id="overview" number="01" title="Project overview">
          <p>X Factor Interior Design is a high-end residential interior design and turnkey solutions studio in Dubai. The project brought its logo, visual identity, brand guidelines, editorial collateral, stationery, and social media into one coherent system.</p>
          <p>Built around the idea of Designing the Essential, the system presents luxury through proportion, material sensitivity, clarity, and restraint. It gives equal weight to creative vision and technical delivery, reflecting how the studio designs, coordinates, and executes refined residential environments.</p>
        </Section>

        <Section id="challenge" number="02" title="The challenge">
          <p>Luxury interior brands often communicate through similar visual codes: decorative excess, polished renderings, and broad claims of exclusivity. X Factor Interior Design needed a more distinctive expression, one that could communicate refined taste without becoming ornamental, and technical confidence without feeling corporate or impersonal.</p>
          <p>The wider challenge was consistency. Every touchpoint needed to connect the studio’s design sensitivity with the reassurance of a disciplined turnkey process.</p>
          <figure className="overflow-hidden rounded-xl bg-surface-card">
            <Image
              src="/projects/x-factor-interior-design/x-factor-interior-design-bedroom-before-after.webp"
              alt="Before-and-after view of an unfinished Dubai bedroom transformed into a refined, fully furnished interior by X Factor Interior Design."
              width={1600}
              height={1000}
              sizes="(min-width: 1280px) 736px, (min-width: 768px) 64vw, calc(100vw - 3rem)"
              className="h-auto w-full"
            />
          </figure>
        </Section>

        <Section id="approach" number="03" title="The Approach">
          <p className="text-xl leading-9 text-ink md:text-2xl">The project began by positioning X Factor at the intersection of refined design and precise execution.</p>
          <p>This idea shaped the logo, color system, typography, pattern, editorial layouts, stationery, company profile, and social media design. Each element was designed to feel calm, assured, and precise, allowing material detail, architectural light, and clear information to carry the experience.</p>
        </Section>

        <Section id="positioning" number="04" title="Brand positioning">
          <p>X Factor Interior Design is positioned for discerning residential clients seeking a home that feels personal, resolved, and built to endure. Its communication responds to practical concerns such as fragmented coordination, unclear timelines, generic concepts, and the gap between a design proposal and the finished space.</p>
          <p>Five messaging pillars organize the brand:</p>
          <ol className="divide-y divide-edge border-y border-edge">{pillars.map(([name, copy], index) => <li key={name} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-5"><span className="font-display text-xl font-medium leading-none text-ink-soft md:text-2xl">0{index + 1}</span><strong className="text-base font-medium text-ink">{name}</strong><span>{copy}</span></li>)}</ol>
        </Section>

        <Section id="identity" number="05" title="Identity system">
          <p>The identity is designed to feel closer to a luxury design monograph than a conventional interiors service brand.</p>
          <p>The primary mark combines an X symbol with the wordmark. Within the symbol, a sharp geometric form represents structure, precision, and discipline, while a softer curved form introduces creativity and human sensitivity. Their intersection captures the balance between artistic expression and technical execution.</p>
          <p>The wordmark carries the same idea through the relationship between precise geometric forms and subtle curved details. A primary vertical lockup, standalone icon, and horizontal wordmark allow the identity to adapt across editorial covers, social formats, favicons, and digital interfaces.</p>
          <p>Minimal layouts, generous whitespace, subtle geometry, and measured scale give the system an understated confidence across editorial and digital applications.</p>
          <XFactorLogoShowcase />
        </Section>

        <Section id="color" number="06" title="Color system">
          <p>The palette is built around Charcoal, Warm Stone, Soft Concrete, and a restrained Bronze accent.</p>
          <p>Charcoal provides authority and structure. Warm Stone brings calm and tactility, while Soft Concrete supports clarity across layouts and interfaces. Bronze is used sparingly to add material richness without turning luxury into decoration.</p>
          <div className="grid gap-4 sm:grid-cols-2">{colors.map(([name, hex]) => <div key={hex} className="overflow-hidden rounded-xl border border-edge bg-surface-card"><div className="aspect-[2/1]" style={{ backgroundColor: hex }} aria-label={`${name} color swatch, ${hex}`} role="img" /><div className="flex justify-between border-t border-edge p-4 text-sm text-ink"><span>{name}</span><code>{hex}</code></div></div>)}</div>
          <p>The system prioritizes clear combinations such as Charcoal on Warm Stone or Soft Concrete, with Bronze reserved for details, lines, icons, and selected interface highlights. A 60% Charcoal, 30% Warm Stone, and 10% Bronze balance provides a practical guide for keeping the identity restrained and consistent. Soft Concrete remains a supporting neutral outside that fixed ratio.</p>
        </Section>

        <Section id="typography" number="07" title="Typography">
          <p>Playfair Display brings an editorial voice to headlines and key statements. Its expressive contrast reflects the studio’s cultural and design-led character.</p>
          <p>Montserrat supports body copy, captions, interface elements, and practical communication. Its clarity balances the serif and keeps detailed information direct and accessible. Together, the two typefaces connect atmosphere with function.</p>
          <div className="rounded-xl border border-edge bg-surface-card/45 p-6 text-ink sm:p-10">
            <p className={`${playfair.className} text-5xl leading-tight sm:text-7xl`}>Designing the Essential</p>
            <p className={`${montserrat.className} mt-7 text-sm uppercase tracking-[0.2em]`}>Playfair Display × Montserrat</p>
            <p className={`${montserrat.className} mt-4 max-w-2xl text-sm leading-7`}>Montserrat keeps detailed information clear, modern, and accessible across practical communication.</p>
          </div>
          <p>The hierarchy uses Playfair Display Bold for primary headlines and Medium for section titles, supported by Montserrat Medium for subheadings and Montserrat Regular for body copy and captions.</p>
        </Section>

        <Section id="guidelines" number="08" title="Brand guidelines">
          <p>The brand guidelines document the logo, color, typography, composition, imagery, and supporting pattern as one coherent system, helping the identity remain clear and consistent across applications.</p>
          <p>A selected presentation of the most important standards shows how the identity moves from logo construction and approved variations to color, typography, and supporting pattern.</p>
          <XFactorBrandGuidelinesShowcase />
        </Section>

        <Section id="company-profile" number="09" title="Company profile">
          <p>The identity was extended into a company profile using the same restrained palette, editorial typography, generous spacing, and controlled pattern language.</p>
          <p>The company profile organizes the studio’s philosophy, design principles, material approach, values, and delivery process into a clear editorial narrative.</p>
          <XFactorCompanyProfileShowcase />
        </Section>

        <Section id="stationery" number="10" title="Stationery system">
          <p>The stationery system translates the identity into practical everyday touchpoints without losing its premium restraint.</p>
          <p>Business cards, an email signature, letterhead, and DL envelopes carry the same restrained typography, warm-neutral palette, and flowing graphic pattern across print and digital correspondence.</p>
          <XFactorStationeryShowcase />
        </Section>

        <Section id="social" number="11" title="Social media system">
          <p>The social system translates the brand into repeatable content rather than isolated posts. Its pillars cover design philosophy, material and detail, process and trust, lifestyle, and project proof.</p>
          <p>Campaigns use direct homeowner concerns as an entry point, from managing delays and budget pressure to coordinating a turnkey project. Clear editorial hooks are paired with calm visual sequences, process explanations, material studies, before-and-after narratives, and focused calls to consultation.</p>
          <p>Across static posts, carousels, and Reel covers, the system maintains a consistent balance of strong typography, warm imagery, negative space, and measured pacing.</p>
          <XFactorSocialMediaShowcase />
        </Section>

        <Section id="process" number="12" title="Process">
          <ol className="grid gap-3 sm:grid-cols-2">{process.map((item, index) => <li key={item} className="group relative overflow-hidden rounded-xl border border-edge bg-surface-card/45 p-5 transition-colors hover:border-ink/25 hover:bg-surface-card/70"><span className="font-display text-3xl text-ink-faint/45 transition-colors group-hover:text-ink-soft md:text-4xl">0{index + 1}</span><p className="mt-5 text-base font-medium leading-7 text-ink">{item}</p><span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-0 bg-ink transition-all duration-300 group-hover:w-full" /></li>)}</ol>
        </Section>

        <Section id="outcome" number="13" title="Outcome">
          <p>The result is a unified identity and communication system that presents X Factor Interior Design with greater clarity and consistency. Logo, color, typography, pattern, editorial collateral, stationery, and social media all reinforce one proposition: thoughtful residential design supported by disciplined delivery.</p>
          <p>Rather than treating luxury as excess, the system gives the brand a calmer and more ownable presence, one built around proportion, material intelligence, and confidence in execution.</p>
        </Section>

        <Section id="role" title="Role and responsibilities">
          <p><strong className="text-ink">Role:</strong> {project.role}</p>
          <DotList items={responsibilities} />
        </Section>

        <Section id="deliverables" title="Deliverables">
          <DotList items={deliverables} />
        </Section>

        <section className="border-t border-edge py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">Let’s build a brand that works as one system.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft">If you need a brand identity and communication system that feel connected across every touchpoint, let’s talk.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4"><Link href="/contact" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90">Start a conversation</Link><Link href="/work" className="inline-flex min-h-11 items-center rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card">Back to Work</Link></div>
        </section>
      </article>
    </main>
  );
}
