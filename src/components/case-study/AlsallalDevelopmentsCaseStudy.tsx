import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import ZoomableCaseStudyImage from "./ZoomableCaseStudyImage";

const base = "/projects/alsallal-developments";
const fullSize = "(min-width: 1152px) 1104px, calc(100vw - 48px)";
const halfSize = "(min-width: 1152px) 540px, (min-width: 768px) calc((100vw - 72px) / 2), calc(100vw - 48px)";

type Visual = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const visuals = {
  hero: {
    src: `${base}/cover/alsallal-developments-brand-applications-hero.webp`,
    alt: "Alsallal Developments ivory presentation folder with copper architectural linework and the supplied corporate logo.",
    width: 4000,
    height: 2250,
  },
  copperSignature: {
    src: `${base}/digital/alsallal-developments-copper-email-signature.webp`,
    alt: "Ivory and copper Alsallal Developments email signature designed for executive correspondence.",
    width: 5121,
    height: 2881,
  },
  lightSignature: {
    src: `${base}/digital/alsallal-developments-light-email-signature.webp`,
    alt: "Slate blue and light gray Alsallal Developments email signature with portrait and contact information.",
    width: 2667,
    height: 1500,
  },
  charcoalSignature: {
    src: `${base}/digital/alsallal-developments-charcoal-email-signature.webp`,
    alt: "Charcoal Alsallal Developments email signature with portrait, role, and corporate contact details.",
    width: 2667,
    height: 1500,
  },
  photoSignature: {
    src: `${base}/digital/alsallal-developments-photo-email-signature.webp`,
    alt: "Monochrome Alsallal Developments email signature combining the supplied logo with architectural photography.",
    width: 2667,
    height: 1500,
  },
  blueDocument: {
    src: `${base}/documents/alsallal-developments-blue-purchase-order-mockup.webp`,
    alt: "Slate blue Alsallal Developments purchase order template presented with an approval stamp.",
    width: 5688,
    height: 3200,
  },
  bronzeDocument: {
    src: `${base}/documents/alsallal-developments-bronze-purchase-order-mockup.webp`,
    alt: "Warm bronze Alsallal Developments purchase order template presented with an approval stamp.",
    width: 5688,
    height: 3200,
  },
  charcoalDocument: {
    src: `${base}/documents/alsallal-developments-charcoal-purchase-order-mockup.webp`,
    alt: "Charcoal Alsallal Developments purchase order template with structured project and approval information.",
    width: 5689,
    height: 3200,
  },
  whiteDocument: {
    src: `${base}/documents/alsallal-developments-white-purchase-order-mockup.webp`,
    alt: "Monochrome Alsallal Developments purchase order template with a restrained gray architectural treatment.",
    width: 5688,
    height: 3200,
  },
  lightDirection: {
    src: `${base}/identity/alsallal-developments-light-visual-direction.webp`,
    alt: "Open Alsallal Developments presentation folder in the skyline silver visual application concept.",
    width: 4500,
    height: 3000,
  },
  charcoalDirection: {
    src: `${base}/identity/alsallal-developments-charcoal-copper-visual-direction.webp`,
    alt: "Open Alsallal Developments presentation folder in the charcoal and copper visual application concept.",
    width: 4500,
    height: 3000,
  },
  architecturalFolder: {
    src: `${base}/identity/alsallal-developments-architectural-brand-folder.webp`,
    alt: "Open Alsallal Developments presentation folder in the architectural monochrome visual application concept.",
    width: 4500,
    height: 3000,
  },
  lightCards: {
    src: `${base}/stationery/alsallal-developments-light-business-card-system.webp`,
    alt: "Warm neutral Alsallal Developments business card system shown front and back.",
    width: 4500,
    height: 3000,
  },
  whiteCards: {
    src: `${base}/stationery/alsallal-developments-white-business-card-system.webp`,
    alt: "Ivory Alsallal Developments business card system with copper geometric forms.",
    width: 4500,
    height: 3000,
  },
  silverCards: {
    src: `${base}/stationery/alsallal-developments-silver-business-card-mockup.webp`,
    alt: "Slate silver Alsallal Developments business cards using layered skyline geometry.",
    width: 3000,
    height: 2250,
  },
  charcoalCards: {
    src: `${base}/stationery/alsallal-developments-charcoal-business-card-mockup.webp`,
    alt: "Charcoal Alsallal Developments business cards with copper accents and modular building forms.",
    width: 4500,
    height: 3000,
  },
  grayCards: {
    src: `${base}/stationery/alsallal-developments-gray-business-card-mockup.webp`,
    alt: "Monochrome gray Alsallal Developments business cards using a dimensional architectural pattern.",
    width: 3000,
    height: 2250,
  },
  bronzeLetterhead: {
    src: `${base}/stationery/alsallal-developments-bronze-letterhead-mockup.webp`,
    alt: "Alsallal Developments letterhead with warm bronze framing and formal corporate typography.",
    width: 3000,
    height: 2250,
  },
  copperLetterhead: {
    src: `${base}/stationery/alsallal-developments-copper-letterhead-mockup.webp`,
    alt: "Ivory Alsallal Developments letterhead with copper corner details and generous document space.",
    width: 3000,
    height: 2250,
  },
  charcoalLetterhead: {
    src: `${base}/stationery/alsallal-developments-charcoal-letterhead-mockup.webp`,
    alt: "Slate and white Alsallal Developments letterhead using the skyline silver application concept.",
    width: 3000,
    height: 2250,
  },
  blackLetterhead: {
    src: `${base}/stationery/alsallal-developments-black-letterhead-stack.webp`,
    alt: "Black and white Alsallal Developments letterhead stack with a bold charcoal border system.",
    width: 3000,
    height: 2250,
  },
  copperEnvelope: {
    src: `${base}/stationery/alsallal-developments-copper-envelope-mockup.webp`,
    alt: "Ivory Alsallal Developments envelope with a copper architectural pattern inside the flap.",
    width: 3000,
    height: 2250,
  },
  flatCopperEnvelope: {
    src: `${base}/stationery/alsallal-developments-flat-copper-envelope-mockup.webp`,
    alt: "Flat ivory Alsallal Developments envelope with a solid burnished copper flap.",
    width: 3000,
    height: 2250,
  },
  silverEnvelope: {
    src: `${base}/stationery/alsallal-developments-silver-envelope-mockup.webp`,
    alt: "Minimal Alsallal Developments envelope with a warm metallic flap and compact address block.",
    width: 3000,
    height: 2250,
  },
  whiteBlackEnvelope: {
    src: `${base}/stationery/alsallal-developments-white-black-envelope-mockup.webp`,
    alt: "White Alsallal Developments envelope with copper linework and a contrasting flap.",
    width: 3000,
    height: 2250,
  },
  lightGrayEnvelope: {
    src: `${base}/stationery/alsallal-developments-light-gray-envelope-mockup.webp`,
    alt: "Light gray Alsallal Developments envelope with a slate flap and geometric corner linework.",
    width: 3000,
    height: 2250,
  },
  charcoalEnvelope: {
    src: `${base}/stationery/alsallal-developments-charcoal-envelope-mockup.webp`,
    alt: "Open slate and white Alsallal Developments envelope using layered skyline geometry.",
    width: 3000,
    height: 2250,
  },
  charcoalPatternEnvelope: {
    src: `${base}/stationery/alsallal-developments-charcoal-pattern-envelope.webp`,
    alt: "Closed charcoal Alsallal Developments envelope with fine copper architectural linework.",
    width: 3000,
    height: 2250,
  },
  architecturalEnvelope: {
    src: `${base}/stationery/alsallal-developments-charcoal-architectural-envelope.webp`,
    alt: "Open charcoal Alsallal Developments envelope with a repeating geometric building pattern.",
    width: 3000,
    height: 2250,
  },
  monochromeEnvelopeBack: {
    src: `${base}/stationery/alsallal-developments-monochrome-dl-envelope-back-mockup.webp`,
    alt: "Rear view of an Alsallal Developments DL envelope with a black flap, centered monochrome logo, Dubai address, and contact details.",
    width: 3000,
    height: 2250,
  },
  monochromeArchitecturalEnvelope: {
    src: `${base}/stationery/alsallal-developments-monochrome-architectural-dl-envelope-mockup.webp`,
    alt: "Perspective view of an Alsallal Developments DL envelope with a black flap and layered grayscale building graphics.",
    width: 3000,
    height: 2250,
  },
} satisfies Record<string, Visual>;

function VisualFrame({ visual, sizes = fullSize, priority = false, className = "", zoomable = true }: {
  visual: Visual;
  sizes?: string;
  priority?: boolean;
  className?: string;
  zoomable?: boolean;
}) {
  if (!zoomable) {
    return (
      <div className={`min-w-0 overflow-hidden rounded-2xl bg-[#d4d1cb] ${className}`}>
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          quality={100}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
    <ZoomableCaseStudyImage
      src={visual.src}
      alt={visual.alt}
      label={visual.alt}
      width={visual.width}
      height={visual.height}
      sizes={sizes}
      priority={priority}
      compact
      showLabel={false}
      frameRadiusClassName="rounded-2xl"
      className={className}
    />
  );
}

function Section({ id, eyebrow, title, description, children }: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-edge py-16 md:py-24">
      <Reveal>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
        {description ? <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">{description}</p> : null}
      </Reveal>
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  );
}

function ConceptBlock({ number, title, description, lead, supporting }: {
  number: string;
  title: string;
  description: string;
  lead: Visual;
  supporting: Visual[];
}) {
  return (
    <section aria-labelledby={`concept-${number}-heading`} className="border-t border-edge pt-12 first:border-0 first:pt-0 md:pt-16">
      <div className="grid gap-5 md:grid-cols-[0.35fr_1fr] md:gap-10">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Concept {number}</p>
        <div>
          <h3 id={`concept-${number}-heading`} className="text-2xl font-semibold text-ink md:text-4xl">{title}</h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink-soft">{description}</p>
        </div>
      </div>
      <div className="mt-8 md:mt-10">
        <VisualFrame visual={lead} />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {supporting.map((visual, index) => (
          <VisualFrame
            key={visual.src}
            visual={visual}
            sizes={supporting.length % 2 === 1 && index === supporting.length - 1 ? fullSize : halfSize}
            className={supporting.length % 2 === 1 && index === supporting.length - 1 ? "md:col-span-2" : ""}
          />
        ))}
      </div>
    </section>
  );
}

export default function AlsallalDevelopmentsCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 pt-32 md:pt-40">
      <article className="mx-auto w-full min-w-0 max-w-6xl px-6">
        <CaseStudyBackLink />

        <div className="mt-6">
          <VisualFrame visual={visuals.hero} priority zoomable={false} />
        </div>

        <header className="py-14 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">Brand Applications / Corporate Communication</p>
          <h1 className="mt-5 max-w-5xl break-words text-4xl font-semibold leading-tight text-ink md:text-7xl">Alsallal Developments</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">A complete corporate identity application system for a Dubai real estate developer, extending a supplied logo into four visual concepts and a coordinated set of print and digital business touchpoints.</p>
          <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Location</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.location}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Market</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.market}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.role}</dd></div>
          </dl>
          <div className="mt-7">
            <p id="alsallal-scope" className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p>
            <ul aria-labelledby="alsallal-scope" className="mt-3 flex flex-wrap gap-2">
              {project.scope?.map((item) => <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>)}
            </ul>
          </div>
        </header>

        <Section
          id="identity-foundation"
          eyebrow="Identity Foundation"
          title="A supplied logo, expanded into a practical brand system"
          description="The Alsallal logo was supplied by the client. My role focused on visual-direction exploration and translating the existing mark into a consistent system for corporate stationery, operational documents, folders, and digital correspondence."
        >
          <div className="grid items-center gap-8 rounded-2xl bg-[#ece9e2] p-7 sm:p-10 md:grid-cols-[0.7fr_1.3fr] md:p-14">
            <Image
              src={`${base}/identity/alsallal-developments-logo.svg`}
              alt="Supplied Alsallal Developments geometric building logo and wordmark."
              width={1080}
              height={1080}
              sizes="(min-width: 768px) 320px, 65vw"
              className="mx-auto h-auto w-full max-w-72"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#1c1d1e] md:text-3xl">Designed around an existing identity</h3>
              <p className="mt-4 text-base leading-8 text-[#1c1d1e]/70">Each direction keeps the supplied mark intact while testing a distinct palette, material character, architectural graphic language, and information hierarchy across the same set of business applications.</p>
            </div>
          </div>
        </Section>

        <Section
          id="application-concepts"
          eyebrow="Exploration"
          title="Four corporate application concepts"
          description="The four directions were developed as complete systems rather than isolated mockups. Each concept carries its own color logic from presentation folders through stationery, operational documents, and email signatures."
        >
          <div className="space-y-14 md:space-y-20">
            <ConceptBlock
              number="01"
              title="Warm Copper & Linen"
              description="Off-white linen, sand beige, charcoal, burnished copper, and soft natural tones create a refined direction that balances premium real estate positioning with approachable corporate communication."
              lead={visuals.hero}
              supporting={[
                visuals.lightCards,
                visuals.whiteCards,
                visuals.bronzeLetterhead,
                visuals.copperLetterhead,
                visuals.copperEnvelope,
                visuals.flatCopperEnvelope,
                visuals.silverEnvelope,
                visuals.whiteBlackEnvelope,
                visuals.bronzeDocument,
                visuals.copperSignature,
              ]}
            />
            <ConceptBlock
              number="02"
              title="Skyline Silver"
              description="Cool slate blue, silver, soft gray, and deep charcoal create a contemporary direction shaped by Dubai’s skyline. Layered geometric planes communicate clarity, ambition, stability, and forward movement."
              lead={visuals.lightDirection}
              supporting={[
                visuals.silverCards,
                visuals.lightGrayEnvelope,
                visuals.charcoalEnvelope,
                visuals.charcoalLetterhead,
                visuals.blueDocument,
                visuals.lightSignature,
              ]}
            />
            <ConceptBlock
              number="03"
              title="Charcoal & Copper"
              description="A high-contrast system pairs deep charcoal with burnished copper and warm neutrals. The direction gives formal documents and executive touchpoints a confident, premium character."
              lead={visuals.charcoalDirection}
              supporting={[
                visuals.charcoalCards,
                visuals.blackLetterhead,
                visuals.charcoalPatternEnvelope,
                visuals.architecturalEnvelope,
                visuals.charcoalDocument,
                visuals.charcoalSignature,
              ]}
            />
            <ConceptBlock
              number="04"
              title="Architectural Monochrome"
              description="Black, silver, and layered grays reduce the system to its architectural essentials. Dimensional building forms and restrained photography create a precise, urban presentation."
              lead={visuals.architecturalFolder}
              supporting={[
                visuals.grayCards,
                visuals.monochromeEnvelopeBack,
                visuals.monochromeArchitecturalEnvelope,
                visuals.whiteDocument,
                visuals.photoSignature,
              ]}
            />
          </div>
        </Section>

        <section id="outcome" aria-labelledby="outcome-heading" className="border-t border-edge py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
            <div><p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Outcome</p><h2 id="outcome-heading" className="mt-4 text-3xl font-semibold text-ink md:text-5xl">Four complete application concepts</h2></div>
            <p className="text-lg leading-9 text-ink-soft">The work demonstrates how an existing logo can support four distinct visual directions and a complete production-ready communication system. Every concept was tested across real business formats, making comparison and decision-making clear for the client.</p>
          </div>
        </section>

        <CaseStudyClosingCta
          title="Need an existing identity expanded into a complete system?"
          body="I develop practical brand applications that stay consistent across stationery, documents, presentations, and digital communication."
        />
      </article>
    </main>
  );
}
