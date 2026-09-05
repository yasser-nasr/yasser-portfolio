import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import Reveal from "@/components/Reveal";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const base = "/projects/orienta-collagen";

type Visual = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const selectedFront: Visual = {
  src: `${base}/orienta-collagen-selected-front.webp`,
  alt: "Front view of the selected purple, white, and gold Orienta Collagen packaging design.",
  width: 1225,
  height: 837,
};

const selectedHero: Visual = {
  src: `${base}/orienta-collagen-selected-english-perspective.webp`,
  alt: "Perspective mockup of the selected Orienta Collagen packaging showing the English front and nutrition panel.",
  width: 1225,
  height: 837,
};

const clinicalAlternative: Visual = {
  src: `${base}/orienta-collagen-alternative-clinical.webp`,
  alt: "Teal medical packaging direction presented as an alternative for Orienta Collagen.",
  width: 1335,
  height: 1178,
};

const directions = [
  {
    number: "01",
    title: "Clinical / Medical",
    description: "A health-led alternative using anatomical imagery and direct benefit communication.",
    visual: clinicalAlternative,
  },
  {
    number: "02",
    title: "Premium / Dark",
    description: "A high-contrast black and gold route focused on shelf presence and premium perception.",
    visual: {
      src: `${base}/orienta-collagen-alternative-premium-dark.webp`,
      alt: "Black and gold premium packaging direction for Orienta Collagen.",
      width: 1232,
      height: 809,
    },
  },
  {
    number: "03",
    title: "Minimal / Light",
    description: "A cleaner white and gold direction with more breathing room and a wellness-led character.",
    visual: {
      src: `${base}/orienta-collagen-alternative-minimal-light.webp`,
      alt: "White and gold minimal packaging direction for Orienta Collagen.",
      width: 1225,
      height: 837,
    },
  },
  {
    number: "04",
    title: "Selected Direction",
    description: "The chosen purple, white, and gold system balances recognition, clarity, and shelf presence.",
    visual: selectedFront,
  },
] as const;

function SectionHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
      {children ? <div className="mt-5 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">{children}</div> : null}
    </div>
  );
}

function VisualFrame({ visual, className = "", eager = false, decorative = false }: {
  visual: Visual;
  className?: string;
  eager?: boolean;
  decorative?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#d5d5d3] ${className}`}>
      <Image
        src={visual.src}
        alt={decorative ? "" : visual.alt}
        width={visual.width}
        height={visual.height}
        loading={eager ? "eager" : "lazy"}
        quality={100}
        sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
        className="h-auto w-full"
      />
    </div>
  );
}

export default function OrientaCollagenCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />

        <div className="mt-6">
          <VisualFrame visual={selectedFront} eager />
        </div>

        <header className="py-14 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">
            Packaging Design / Print Design
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">
            Orienta Collagen
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
            Packaging Design for a Nutritional Supplement
          </p>
          <dl className="mt-10 border-t border-edge pt-7">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</dt>
              <dd className="mt-2 text-sm leading-6 text-ink">Packaging Designer</dd>
            </div>
          </dl>
          <div className="mt-7">
            <p id="orienta-scope" className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p>
            <ul aria-labelledby="orienta-scope" className="mt-3 flex flex-wrap gap-2">
              {project.scope?.map((item) => (
                <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>
              ))}
            </ul>
          </div>
        </header>

        <section id="overview" className="border-t border-edge py-16 md:py-24">
          <Reveal className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold text-ink md:text-5xl">Project Overview</h2>
              <p className="mt-6 text-base leading-8 text-ink-soft md:text-lg">
                Orienta Collagen is a nutritional supplement packaging project focused on creating a clear and recognizable product presentation around joint support and everyday wellness.
              </p>
              <p className="mt-5 text-base leading-8 text-ink-soft md:text-lg">
                The packaging organizes product information across the front, side, and back panels while maintaining clear hierarchy across Arabic and English content.
              </p>
            </div>
            <VisualFrame visual={selectedHero} />
          </Reveal>
        </section>

        <section id="challenge" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="The Challenge">
              <p>The packaging needed to balance health-focused communication with enough visual presence to stand out as a consumer supplement.</p>
              <p className="mt-4">The main challenge was organizing benefits, ingredients, nutritional information, bilingual content, flavor, and pack quantity while keeping the product name and primary benefit immediately recognizable.</p>
            </SectionHeading>

            <figure className="mt-10">
              <div className="grid gap-4 md:grid-cols-3">
                {directions.slice(0, 3).map(({ title, visual }) => (
                  <div key={title} className="min-w-0">
                    <VisualFrame visual={visual} decorative />
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-faint">{title}</p>
                  </div>
                ))}
              </div>
              <figcaption className="mt-5 text-sm leading-6 text-ink-soft">
                Alternative directions presented to the client, exploring the balance between medical clarity, shelf presence, and information hierarchy.
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <section id="design-exploration" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="Design Exploration" />
            <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-2 md:gap-y-16">
              {directions.map(({ number, title, description, visual }) => (
                <figure key={number} className="min-w-0">
                  <VisualFrame visual={visual} decorative={number === "04"} />
                  <figcaption className="mt-5 grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                    <span className="font-display text-sm text-ink-faint">{number}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-ink md:text-2xl">{title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">{description}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="final-direction" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="Final Direction">
              <p>The selected purple, white, and gold direction creates a recognizable shelf block while keeping the product name, joint-support benefit, ingredients, flavor, and pack quantity easy to scan.</p>
            </SectionHeading>
            <div className="mt-10">
              <VisualFrame visual={selectedFront} decorative />
            </div>
          </Reveal>
        </section>

        <section id="packaging-system" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="Packaging System">
              <p>The chosen direction extends across the front and supporting panels as one connected packaging system.</p>
            </SectionHeading>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { label: "Front Panel", src: `${base}/orienta-collagen-selected-front.webp`, alt: "Front panel of the selected purple, white, and gold Orienta Collagen packaging." },
                { label: "Nutrition Panel", src: `${base}/orienta-collagen-selected-nutrition-panel.webp`, alt: "Selected Orienta Collagen packaging showing the Arabic front and nutrition information panel." },
                { label: "Product Information", src: `${base}/orienta-collagen-selected-product-information-panel.webp`, alt: "Selected Orienta Collagen packaging showing the Arabic front and bilingual product information panel." },
              ].map((item) => (
                <figure key={item.label} className="min-w-0">
                  <VisualFrame visual={{ ...item, width: 1225, height: 837 }} decorative={item.label === "Front Panel"} />
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-faint">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="information-hierarchy" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="Information Hierarchy" />
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
              <VisualFrame visual={selectedFront} decorative />
              <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ["01", "Product recognition", "The name leads the front panel at the largest scale."],
                  ["02", "Primary benefit", "The movement graphic and joint icons make the health focus immediately legible."],
                  ["03", "Formula cues", "Key ingredients are grouped into one easy-to-scan checklist."],
                  ["04", "Purchase details", "Flavor and pack quantity remain visible at the base."],
                ].map(([number, title, description]) => (
                  <li key={number} className="border-t border-edge pt-4">
                    <p className="font-display text-xs tracking-[0.16em] text-ink-faint">{number}</p>
                    <h3 className="mt-2 text-base font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        <section id="bilingual-layout" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="Bilingual Layout">
              <p>Arabic and English content are distributed by panel and reading priority, keeping dense regulatory information separate from the product story.</p>
            </SectionHeading>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <VisualFrame visual={{ src: `${base}/orienta-collagen-selected-arabic-perspective.webp`, alt: "Selected Orienta Collagen packaging showing the Arabic front beside the English nutrition panel.", width: 1225, height: 837 }} />
              <VisualFrame visual={{ src: `${base}/orienta-collagen-selected-english-perspective.webp`, alt: "Selected Orienta Collagen packaging showing the English front beside the nutrition panel.", width: 1225, height: 837 }} decorative />
            </div>
          </Reveal>
        </section>

        <section id="final-mockups" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <SectionHeading title="Final Mockups" />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <VisualFrame visual={{ src: `${base}/orienta-collagen-selected-product-information-panel.webp`, alt: "Front and side perspective mockup of the selected purple Orienta Collagen packaging.", width: 1225, height: 837 }} decorative />
              <VisualFrame visual={{ src: `${base}/orienta-collagen-selected-top-perspective.webp`, alt: "Elevated perspective mockup showing the top, front, and side panels of the selected Orienta Collagen packaging.", width: 1225, height: 837 }} />
              <VisualFrame visual={{ src: `${base}/orienta-collagen-selected-low-perspective.webp`, alt: "Low perspective mockup showing the front, side, and base panels of the selected Orienta Collagen packaging.", width: 1225, height: 837 }} className="md:col-span-2" />
            </div>
          </Reveal>
        </section>

        <CaseStudyClosingCta
          title="Need packaging that stays clear from shelf to final panel?"
          body="I build packaging systems that connect visual direction, information hierarchy, and production-ready communication."
        />
      </article>
    </main>
  );
}
