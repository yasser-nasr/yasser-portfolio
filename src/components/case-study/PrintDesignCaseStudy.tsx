import Image from "next/image";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import ZoomableCaseStudyImage from "./ZoomableCaseStudyImage";
import PrintDocumentSlides from "./PrintDocumentSlides";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const base = "/projects/print";

type Visual = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

const karawiaPages: Visual[] = [
  {
    src: `${base}/karawia-pack/karawia-pack-stretch-wrap-data-sheet-overview.webp`,
    alt: "Front page of the Karawia Pack stretch wrap technical data sheet with a product roll, key measurements, and product description.",
    label: "Product overview",
    width: 2480,
    height: 3508,
  },
  {
    src: `${base}/karawia-pack/karawia-pack-stretch-wrap-specifications.webp`,
    alt: "Karawia Pack technical data sheet page organizing stretch wrap applications, properties, specifications, and product icons.",
    label: "Applications and specifications",
    width: 2480,
    height: 3508,
  },
  {
    src: `${base}/karawia-pack/karawia-pack-stretch-wrap-packaging-storage.webp`,
    alt: "Karawia Pack technical data sheet page presenting stretch wrap packaging, storage guidance, labeling, and contact details.",
    label: "Packaging and storage",
    width: 2480,
    height: 3508,
  },
];

const referenceBooklet: Visual[] = [
  {
    src: `${base}/reference/reference-medical-training-booklet-standing-cover.jpg`,
    alt: "Standing mockup of the Reference Arabic health-education booklet with its anniversary identity on the white cover.",
    label: "Standing cover",
    width: 4500,
    height: 3000,
  },
  {
    src: `${base}/reference/reference-medical-training-booklet-flat-cover.jpg`,
    alt: "Flat-lay mockup of the Reference Arabic health-education booklet cover.",
    label: "Cover detail",
    width: 4500,
    height: 3000,
  },
  {
    src: `${base}/reference/reference-medical-training-booklet-interior-spread-01.jpg`,
    alt: "Open Reference booklet spread with Arabic health guidance, blue editorial shapes, red highlights, and medical imagery.",
    label: "Editorial spread 01",
    width: 4500,
    height: 3000,
  },
  {
    src: `${base}/reference/reference-medical-training-booklet-interior-spread-02.jpg`,
    alt: "Open Reference booklet spread showing structured Arabic health information with blue dividers and red section headings.",
    label: "Editorial spread 02",
    width: 4500,
    height: 3000,
  },
  {
    src: `${base}/reference/reference-medical-training-booklet-interior-spread-03.jpg`,
    alt: "Open Reference booklet spread combining Arabic health content, medical staff photography, icons, and contact information.",
    label: "Editorial spread 03",
    width: 4500,
    height: 3000,
  },
  {
    src: `${base}/reference/reference-medical-training-booklet-open-cover.jpg`,
    alt: "Open-cover mockup of the Reference Arabic health-education booklet showing the front and back cover system.",
    label: "Front and back cover",
    width: 4500,
    height: 3000,
  },
];

const trustProfilePageDescriptions = [
  "Trust Group Arabic company profile cover",
  "Arabic contents page",
  "Trust Group industrial introduction",
  "Trust Group corporate overview",
  "Group mission and vision",
  "Core corporate values",
  "Industrial services overview",
  "Group capabilities and sectors",
  "Trust Group company structure",
  "Trust Steel division introduction",
  "Trust Steel fabrication capabilities",
  "Trust Steel products and services",
  "Trust Steel project portfolio",
  "Trust Engineering division introduction",
  "Trust Engineering capabilities",
  "Trust Engineering services",
  "Trust Engineering project portfolio",
  "Trust Crane's division introduction",
  "Trust Crane's lifting capabilities",
  "Trust Crane's equipment and services",
  "Trust Crane's project portfolio",
  "Trust Construction division introduction",
  "Trust Construction capabilities",
  "Trust Construction services",
  "Trust Construction project portfolio",
  "Integrated group solutions",
  "Industrial project presentation",
  "Engineering project presentation",
  "Steel fabrication project presentation",
  "Construction project presentation",
  "Trust Group closing statement",
  "Trust Group Cairo contact details",
] as const;

const trustGroupProfile: Visual[] = trustProfilePageDescriptions.map((description, index) => {
  const pageNumber = String(index + 1).padStart(2, "0");

  return {
    src: `${base}/trust/pages/trust-group-arabic-company-profile-${pageNumber}.webp`,
    alt: `${description}, page ${index + 1} of the corporate publication.`,
    label: description,
    width: 1241,
    height: 1754,
  };
});

function SectionHeader({ id, eyebrow, title, metaLabel, metaValue, children }: {
  id: string;
  eyebrow: string;
  title: string;
  metaLabel: string;
  metaValue: string;
  children: string;
}) {
  return (
    <Reveal>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">{eyebrow}</p>
          <h2 id={id} className="mt-2 text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
        </div>
        <dl className="flex flex-wrap gap-x-7 gap-y-3 text-sm sm:justify-end">
          <div>
            <dt className="text-[0.65rem] uppercase tracking-[0.15em] text-ink-faint">{metaLabel}</dt>
            <dd className="mt-1 text-ink-soft">{metaValue}</dd>
          </div>
        </dl>
      </div>
      <p className="mb-7 max-w-3xl text-sm leading-7 text-ink-soft md:text-base">{children}</p>
    </Reveal>
  );
}

function VisualCard({ visual, priority = false, className = "" }: {
  visual: Visual;
  priority?: boolean;
  className?: string;
}) {
  return (
    <ZoomableCaseStudyImage
      {...visual}
      priority={priority}
      compact
      showLabel={false}
      className={className}
      sizes="(min-width: 1152px) 1104px, (min-width: 768px) 50vw, 100vw"
    />
  );
}

export default function PrintDesignCaseStudy({ project }: { project: Project }) {
  const hero: Visual = {
    src: `${base}/nestle-green-poster-design/nestle-sustainability-citylight-poster-mockup.webp`,
    alt: "Nestlé sustainability poster displayed in a freestanding citylight advertising mockup against a deep blue background.",
    label: "Sustainability campaign poster",
    width: 4000,
    height: 3000,
  };

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-36 md:pt-44">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />

        <header className="pt-8">
          <p className="font-display text-base uppercase tracking-[0.22em] text-ink-soft md:text-lg">
            Selected Print Work
          </p>
          <HeadingReveal
            as="h1"
            className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-6xl"
          >
            Print &amp; Editorial Design
          </HeadingReveal>
          <Reveal>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
              Selected work across posters, publications, technical literature, display graphics, and information-led print communication.
            </p>
            <ul aria-label="Print and editorial design capabilities" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-faint">
              {project.scope?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Reveal>
        </header>

        <section aria-label="Print and editorial design cover" className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-xl border border-edge bg-surface-card shadow-2xl shadow-black/10">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
              quality={100}
              sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
              className="block h-auto w-full"
            />
          </div>
        </section>

        <section id="karawia-pack" aria-labelledby="karawia-pack-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="karawia-pack-heading"
            eyebrow="Technical Literature / Information Design"
            title="Karawia Pack"
            metaLabel="Location"
            metaValue="10th of Ramadan City, Egypt"
          >
            A three-page stretch wrap data sheet turning technical specifications, applications, packaging details, and storage guidance into a clear visual system for industrial communication.
          </SectionHeader>
          <div>
            <VisualCard visual={{
              src: `${base}/karawia-pack/karawia-pack-stretch-wrap-data-sheet-mockup.webp`,
              alt: "Three-page Karawia Pack stretch wrap technical data sheet presented together in a wide mockup.",
              label: "Complete technical data sheet",
              width: 3000,
              height: 2250,
            }} />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3 sm:items-start">
            {karawiaPages.map((visual) => <VisualCard key={visual.src} visual={visual} />)}
          </div>
        </section>

        <section id="nestle-sustainability" aria-labelledby="nestle-sustainability-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="nestle-sustainability-heading"
            eyebrow="Environmental Advertising / Poster Design"
            title="Nestlé Sustainability Poster"
            metaLabel="Context"
            metaValue="Sustainability concept"
          >
            A high-impact poster concept connecting reduced consumption and waste with a direct environmental message, designed to remain legible from social scale through outdoor display.
          </SectionHeader>
          <div className="grid gap-5 md:grid-cols-[1.35fr_0.65fr] md:items-start">
            <VisualCard visual={hero} />
            <VisualCard visual={{
              src: `${base}/nestle-green-poster-design/nestle-reducing-consumption-waste-poster.png`,
              alt: "Green Nestlé sustainability poster with a light switch above a globe and the message Don't Let Our Future Be Grey.",
              label: "Final poster artwork",
              width: 1080,
              height: 1350,
            }} />
          </div>
        </section>

        <section id="ezz-elite" aria-labelledby="ezz-elite-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="ezz-elite-heading"
            eyebrow="Display Graphics / Bilingual Design"
            title="Ezz Elite / EquusLine"
            metaLabel="Location"
            metaValue="Saudi Arabia"
          >
            A bilingual roll-up display for a Saudi equine nutrition client, presenting EquusLine products through a restrained premium palette, clear product hierarchy, and event-ready brand visibility.
          </SectionHeader>
          <div className="grid gap-5 md:grid-cols-2 md:items-start">
            <VisualCard visual={{
              src: `${base}/ezz-elite/ezz-elite-equusline-roll-up-banner-front.jpg`,
              alt: "Front mockup of an Ezz Elite bilingual EquusLine horse nutrition roll-up banner with product packs and a championship trophy.",
              label: "Front presentation",
              width: 3000,
              height: 2500,
            }} />
            <VisualCard visual={{
              src: `${base}/ezz-elite/ezz-elite-equusline-roll-up-banner-perspective.jpg`,
              alt: "Perspective mockup of the Ezz Elite EquusLine roll-up banner for premium horse nutrition products.",
              label: "Perspective presentation",
              width: 3000,
              height: 2500,
            }} />
          </div>
        </section>

        <section id="madina-womens-hospital" aria-labelledby="madina-womens-hospital-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="madina-womens-hospital-heading"
            eyebrow="Healthcare Collateral / Bilingual Flyer"
            title="Madina Women’s Hospital"
            metaLabel="Location"
            metaValue="Alexandria, Egypt"
          >
            A bilingual front-and-back promotional flyer presenting the hospital’s women’s healthcare services, surgical capabilities, international accreditation, and contact information through a clear, approachable visual system.
          </SectionHeader>
          <VisualCard visual={{
            src: `${base}/madina-womens-hospital-bilingual-flyer-mockup.webp`,
            alt: "Front-and-back bilingual flyer mockup for Madina Women’s Hospital in Alexandria, featuring a female doctor, healthcare services, accreditation details, and contact information.",
            label: "Madina Women’s Hospital bilingual flyer",
            width: 4000,
            height: 2667,
          }} />
        </section>

        <section id="research-poster" aria-labelledby="research-poster-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="research-poster-heading"
            eyebrow="Academic Communication / Research Poster"
            title="Software Requirements Engineering"
            metaLabel="Event"
            metaValue="ACL 2025, Vienna"
          >
            A large-format academic poster organizing a dense research narrative into a clear reading path across the abstract, technical challenges, framework, findings, and conclusion.
          </SectionHeader>
          <div>
            <VisualCard visual={{
              src: `${base}/software-requirements-engineering-research-poster.webp`,
              alt: "Academic research poster about enhancing software requirements engineering with language models and prompting techniques.",
              label: "Research poster presentation",
              width: 4000,
              height: 3000,
            }} />
          </div>
        </section>

        <section id="reference-booklet" aria-labelledby="reference-booklet-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="reference-booklet-heading"
            eyebrow="Editorial Design / Arabic Publication"
            title="Reference Training Center"
            metaLabel="Location"
            metaValue="Oman"
          >
            An Arabic health-education editorial system for an Oman client, combining medical guidance, imagery, illustrations, page navigation, and contact information in a compact booklet designed for clear reading and practical use.
          </SectionHeader>
          <PrintDocumentSlides
            slides={referenceBooklet}
            ariaLabel="Reference Training Center booklet presentation"
          />
        </section>

        <section id="trust-group-profile" aria-labelledby="trust-group-profile-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
          <SectionHeader
            id="trust-group-profile-heading"
            eyebrow="Company Profile / Arabic Editorial Design"
            title="Trust Group"
            metaLabel="Location"
            metaValue="Cairo, Egypt"
          >
            A company profile bringing the group story, capabilities, services, and four specialized businesses into one clear corporate publication for steel, engineering, crane, and construction audiences.
          </SectionHeader>
          <PrintDocumentSlides
            slides={trustGroupProfile}
            ariaLabel="Trust Group Arabic company profile presentation"
            spread
            compact
          />
        </section>

        <div className="mt-20 md:mt-28">
          <CaseStudyClosingCta
            title="Need print communication that stays clear at every scale?"
            body="I design posters, publications, technical documents, and display graphics that connect visual character with production-ready information hierarchy."
            primaryLabel="Start a print project"
          />
        </div>
      </article>
    </main>
  );
}
