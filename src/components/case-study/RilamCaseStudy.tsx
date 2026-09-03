import Image from "next/image";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const base = "/projects/rilam";

type Transformation = {
  title: string;
  original: string;
  originalAlt: string;
  final: string;
  finalAlt: string;
};

const campaignOneTransformations: Transformation[] = [
  {
    title: "Burgundy Velvet Abaya",
    original: `${base}/rilam-burgundy-velvet-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a burgundy velvet abaya against a plain studio background.",
    final: `${base}/rilam-burgundy-velvet-abaya-campaign-ad.webp`,
    finalAlt: "Final Rilam Saudi abaya campaign advertisement placing the burgundy velvet garment in a warm interior with pricing and product copy.",
  },
  {
    title: "Black Floral Abaya",
    original: `${base}/rilam-black-floral-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a black abaya with pink floral embroidery against a studio background.",
    final: `${base}/rilam-black-floral-abaya-campaign-ad.webp`,
    finalAlt: "Final Rilam Saudi fashion campaign advertisement featuring the black floral abaya in a warm interior with promotional information.",
  },
  {
    title: "Grey Tiered Abaya",
    original: `${base}/rilam-grey-tiered-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a light grey tiered abaya against a plain studio background.",
    final: `${base}/rilam-grey-tiered-abaya-campaign-ad.webp`,
    finalAlt: "Final Rilam Saudi abaya campaign advertisement featuring the light grey tiered garment in a softly lit interior with pricing and product copy.",
  },
  {
    title: "Black Layered Abaya",
    original: `${base}/rilam-black-layered-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a black layered abaya against a plain studio background.",
    final: `${base}/rilam-black-layered-abaya-campaign-ad.webp`,
    finalAlt: "Final Rilam Saudi abaya campaign advertisement featuring the black layered garment in a warm interior with pricing and product copy.",
  },
];

const eidTransformations: Transformation[] = [
  {
    title: "Black Lace Abaya",
    original: `${base}/eid/rilam-eid-al-adha-black-lace-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a black lace abaya against a plain studio background.",
    final: `${base}/eid/rilam-eid-al-adha-black-lace-abaya-ad.webp`,
    finalAlt: "Final Rilam Eid Al-Adha advertisement placing the black lace abaya in a warm Saudi-inspired interior with the second-abaya offer.",
  },
  {
    title: "Black Embroidered Abaya",
    original: `${base}/eid/rilam-eid-al-adha-black-embroidered-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a black embroidered abaya ensemble against a plain studio background.",
    final: `${base}/eid/rilam-eid-al-adha-black-embroidered-abaya-ad.webp`,
    finalAlt: "Final Rilam Eid Al-Adha advertisement integrating the black embroidered abaya into a warm architectural setting.",
  },
  {
    title: "Silver-Trim Abaya",
    original: `${base}/eid/rilam-eid-al-adha-silver-trim-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a black abaya with silver trim against a plain studio background.",
    final: `${base}/eid/rilam-eid-al-adha-silver-trim-abaya-ad.webp`,
    finalAlt: "Final Rilam Eid Al-Adha advertisement featuring the silver-trimmed abaya, offer, and price in a warm Saudi-inspired interior.",
  },
  {
    title: "Layered Black Abaya",
    original: `${base}/eid/rilam-eid-al-adha-layered-black-abaya-original-photography.webp`,
    originalAlt: "Original product photography for Rilam showing a layered black abaya against a plain studio background.",
    final: `${base}/eid/rilam-eid-al-adha-layered-black-abaya-ad.webp`,
    finalAlt: "Final Rilam Eid Al-Adha advertisement featuring the layered black abaya, promotional offer, and price in a warm Saudi-inspired interior.",
  },
];

function Heading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">{children}</h2>
    </div>
  );
}

function BeforeAfter({ transformation }: { transformation: Transformation }) {
  const images = [
    { step: "Before", label: "Original Photography", src: transformation.original, alt: transformation.originalAlt },
    { step: "After", label: "Final Campaign Visual", src: transformation.final, alt: transformation.finalAlt },
  ];

  return (
    <article className="border-t border-edge pt-8 md:pt-10">
      <div style={{ marginBottom: "3rem" }}>
        <h3 className="text-xl font-semibold text-ink md:text-2xl">{transformation.title}</h3>
      </div>
      <div className="grid gap-7 md:grid-cols-2 md:gap-8">
        {images.map((image) => (
          <figure key={image.step} className="min-w-0">
            <figcaption style={{ marginBottom: "2rem" }}>
              <span className="block text-base font-semibold uppercase tracking-[0.12em] text-ink">{image.step}</span>
              <span className="mt-2 block text-sm uppercase tracking-[0.1em] text-ink-soft md:text-base">{image.label}</span>
            </figcaption>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1a120f]">
              <Image src={image.src} alt={image.alt} width={1080} height={1920} sizes="(min-width: 1024px) 520px, (min-width: 768px) 46vw, 100vw" className="h-auto w-full" />
            </div>
          </figure>
        ))}
      </div>
    </article>
  );
}

function TransformationList({ items }: { items: Transformation[] }) {
  return <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">{items.map((item) => <BeforeAfter key={item.title} transformation={item} />)}</div>;
}

export default function RilamCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />

        <div className="relative mt-6 grid aspect-[4/5] place-items-center overflow-hidden rounded-[1.5rem] sm:aspect-[16/9]" style={{ backgroundColor: project.imageBackground }}>
          <Image src={`${base}/rilam-saudi-abaya-brand-logo.svg`} alt="Rilam Saudi abaya brand logo featuring a stylized gazelle above Arabic and English wordmarks." width={713} height={903} priority sizes="192px" className="block" style={{ width: "clamp(8rem, 16vw, 12rem)", height: "auto" }} />
        </div>

        <header className="py-14 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">Fashion Campaigns & Digital Art Direction</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">Rilam</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">Two campaign directions for a Saudi abaya brand, transforming supplied product photography into polished promotional imagery while keeping the garments clearly visible.</p>
          <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Market</dt><dd className="mt-2 text-sm leading-6 text-ink">Saudi Arabia</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Location</dt><dd className="mt-2 text-sm leading-6 text-ink">Saudi Arabia</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</dt><dd className="mt-2 text-sm leading-6 text-ink">Senior Graphic Designer<br />Brand & Digital Designer</dd></div>
          </dl>
          <div className="mt-7"><p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p><ul className="mt-3 flex flex-wrap gap-2">{project.scope?.map((item) => <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>)}</ul></div>
        </header>

        <section id="overview" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Overview">Product photography, developed for campaign use</Heading>
          <div className="mt-9 grid gap-8 text-base leading-8 text-ink-soft md:grid-cols-2 md:gap-16 md:text-lg">
            <p>Rilam is a Saudi women&apos;s fashion brand focused on abayas. The work required straightforward product photographs to become stronger campaign visuals without changing the garments or obscuring their fabric and decorative details.</p>
            <p>Each final composition combines environment development, perspective, lighting, shadows, tonal control, retouching, and space for promotional information. The comparisons below show that transformation directly.</p>
          </div>
        </section>

        <section id="campaign-01" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Campaign 01">Original photography → final campaign visual</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">A product-led campaign system combining full-length garment presentation with pricing, payment information, garment details, and concise Arabic campaign copy.</p>
          <TransformationList items={campaignOneTransformations} />
        </section>

        <section id="eid-al-adha" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Campaign 02">Eid Al-Adha Campaign</Heading>
          <div className="mt-8 grid gap-7 md:grid-cols-2 md:gap-16">
            <p className="text-2xl font-semibold leading-snug text-ink">Buy one abaya and get the second at 50% off.</p>
            <p className="leading-8 text-ink-soft">A warmer Saudi-inspired environment supports the Eid context while controlled hierarchy keeps the abaya, price, and offer easy to read. Architectural arches, patterned screens, and ambient light establish atmosphere without decorative excess.</p>
          </div>
          <TransformationList items={eidTransformations} />
        </section>

        <CaseStudyClosingCta title="Building a campaign around a product that needs to stay the hero?" body="I develop brand and digital campaign work through art direction, image development, compositing, and commercially focused design." />
      </article>
    </main>
  );
}
