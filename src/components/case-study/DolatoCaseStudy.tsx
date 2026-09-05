import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import Reveal from "@/components/Reveal";
import { CaseStudyBackLink, CaseStudyClosingCta, CaseStudySection } from "./CaseStudyLayout";

const base = "/projects/dolato-warm-winter-marvels";
const fullSize = "(min-width: 1152px) 1104px, calc(100vw - 48px)";
const halfSize = "(min-width: 1152px) 540px, (min-width: 768px) calc((100vw - 72px) / 2), calc(100vw - 48px)";
const visuals = {
  hero: { file: "cover/dolato-warm-winter-marvels-hero.webp", width: 3500, height: 2336, alt: "Stacked Dolato gelato cup mockups featuring the Warm Winter Marvels seasonal pattern and character." },
  mark: { file: "visual-system/dolato-warm-winter-marvels-theme-mark.webp", width: 4201, height: 3001, alt: "Cream Warm Winter Marvels theme mark and a snowflake symbol made from Dolato Minis on burgundy." },
  pattern: { file: "pattern/dolato-winter-pattern.webp", width: 5601, height: 4001, alt: "Warm Winter Marvels repeat pattern combining Minis-inspired snowflakes, gelato motifs, and cream dots on burgundy." },
  window: { file: "environmental/dolato-store-window-display.webp", width: 5601, height: 4001, alt: "Store window concept applying Warm Winter Marvels lettering, a snow character, and the Colosseum across the Dolato Gelateria facade." },
  apron: { file: "applications/dolato-winter-apron.webp", width: 4000, height: 4000, alt: "Cream Dolato Gelateria apron mockup featuring Warm Winter Marvels lettering and an Italian-inspired snow character illustration." },
  apronBurgundy: { file: "applications/dolato-winter-apron-burgundy.webp", width: 4000, height: 4000, alt: "Burgundy Dolato Gelateria apron mockup featuring the Warm Winter Marvels theme mark and Italian-inspired winter illustration." },
  chocolate: { file: "applications/dolato-hot-chocolate-cup.webp", width: 3000, height: 2800, alt: "Two hands holding burgundy Dolato hot chocolate cups featuring the Warm Winter Marvels winter pattern." },
  gelato: { file: "applications/dolato-gelato-cup.webp", width: 3500, height: 2336, alt: "Three stacked cream Dolato gelato cup mockups with seasonal illustrations, a snow character, and campaign lettering." },
  backdrop: { file: "environmental/dolato-photo-backdrop.webp", width: 5601, height: 4001, alt: "Dolato photo backdrop concept featuring a chocolate-colored snow character above the Colosseum, beside the campaign theme mark." },
  cart: { file: "environmental/dolato-winter-events-cart.webp", width: 2200, height: 1572, alt: "Dolato event cart mockup with a striped canopy and Warm Winter Marvels seasonal artwork wrapped around its body." },
  technical: { file: "environmental/dolato-events-cart-technical-application.webp", width: 5601, height: 4001, alt: "Dimensioned front, side, and top views showing the proposed Warm Winter Marvels artwork on a Dolato events cart." },
} as const;

type VisualKey = keyof typeof visuals;
function Visual({ name, label, half = false, repeated = false, preload = false }: {
  name: VisualKey; label?: string; half?: boolean; repeated?: boolean; preload?: boolean;
}) {
  const visual = visuals[name];
  return (
    <figure className="min-w-0">
      {label ? <figcaption className="mb-4 text-xs uppercase tracking-[0.15em] text-ink-faint">{label}</figcaption> : null}
      <Image src={`${base}/${visual.file}`} alt={repeated ? "" : visual.alt} width={visual.width} height={visual.height} quality={100} preload={preload} sizes={half ? halfSize : fullSize} className="h-auto w-full rounded-2xl" />
    </figure>
  );
}

function GallerySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-edge py-16 md:py-24">
      <h2 id={`${id}-title`} className="mb-8 text-2xl font-semibold text-ink md:mb-12 md:text-3xl">{title}</h2>
      <div className="space-y-10 md:space-y-16">{children}</div>
    </section>
  );
}

export default function DolatoCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />
        <div className="mt-6"><Visual name="hero" preload /></div>
        <header className="py-14 md:py-20">
          <p className="font-display text-sm uppercase leading-7 tracking-[0.16em] text-ink-faint">SYNC x Dolato Winter Theme Competition 2023</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-ink-soft md:text-xl">{project.subtitle}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.15em] text-ink-faint">Competition Submission / 2023</p>
        </header>

        <section id="overview" aria-labelledby="overview-title" className="border-t border-edge py-16 md:py-24">
          <h2 id="overview-title" className="text-2xl font-semibold text-ink md:text-3xl">Project Overview</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">Warm Winter Marvels was a seasonal concept created for the SYNC x Dolato Winter Theme Competition 2023. The challenge was to translate Dolato’s premium Italian gelato experience into a warm, playful winter world that could scale across physical stores, packaging, uniforms, and event activations.</p>
          <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-2">
            {[["Role", project.role], ["Market", project.market]].map(([label, value]) => (
              <div key={label}><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">{label}</dt><dd className="mt-2 text-sm leading-6 text-ink">{value}</dd></div>
            ))}
          </dl>
          <div className="mt-7"><p id="dolato-scope" className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p><ul aria-labelledby="dolato-scope" className="mt-3 flex flex-wrap gap-2">{project.scope?.map((item) => <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>)}</ul></div>
        </section>

        <CaseStudySection id="challenge" title="The Challenge">
          <p>The campaign needed to feel unmistakably winter while avoiding a cold visual atmosphere. It also had to remain recognizable as Dolato and adapt consistently across very different formats, from cups and aprons to storefronts and event carts.</p>
          <div className="border-y border-edge py-6">
            <p className="text-xl font-semibold text-ink">Warm Winter Marvels</p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-3"><li>Winter + Warmth</li><li>Dolato Brand Recognition</li><li>Scalable Across Physical Touchpoints</li></ul>
            <p className="mt-5 text-xs leading-6 text-ink-faint">Storefront / Uniform / Cups / Backdrop / Event Cart</p>
          </div>
        </CaseStudySection>

        <CaseStudySection id="concept" title="The Concept">
          <p>The concept reimagines winter through Dolato’s world: an Italian-inspired snow character, warm earthy colors, hand-drawn illustration, and snowflake-like motifs built from Dolato’s signature Minis.</p>
          <p>Instead of treating winter as cold and icy, the system focuses on warmth, gatherings, playfulness, and shared memories.</p>
          <Visual name="backdrop" />
        </CaseStudySection>

        <GallerySection id="visual-system" title="Visual System">
          <Reveal><Visual name="mark" label="01 / Warm Winter Marvels theme mark" /></Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <Visual name="pattern" label="04 / Minis snowflake motif" half />
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.15em] text-ink-faint">05 / Warm seasonal color palette</p>
              <div className="grid min-h-56 grid-cols-3 overflow-hidden rounded-2xl md:h-[calc(100%-2rem)]">
                {[["Burgundy", "#792d20"], ["Cream", "#f9d5bf"], ["Ochre", "#ae752c"]].map(([name, hex]) => <div key={name} style={{ backgroundColor: hex }} className="flex items-end p-4"><span className={`text-xs ${name === "Cream" ? "text-[#792d20]" : "text-white"}`}>{name}</span></div>)}
              </div>
            </div>
          </div>
        </GallerySection>

        <GallerySection id="pattern" title="Pattern">
          <Reveal><Visual name="pattern" repeated /></Reveal>
          <p className="max-w-2xl text-base leading-8 text-ink-soft">A repeatable seasonal pattern combines the campaign motifs, Dolato Minis references, winter elements, and playful hand-drawn details.</p>
        </GallerySection>

        <GallerySection id="applications" title="Campaign Applications">
          <Reveal><Visual name="window" label="Store Window Display" /></Reveal>
          <Reveal>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.15em] text-ink-faint">Uniform / Apron</p>
              <div className="grid gap-6 md:grid-cols-2">
                <Visual name="apron" half />
                <Visual name="apronBurgundy" half />
              </div>
            </div>
          </Reveal>
          <Reveal><Visual name="chocolate" label="Hot Chocolate Cup" /></Reveal>
          <Reveal><Visual name="gelato" label="Gelato Cup" repeated /></Reveal>
        </GallerySection>

        <GallerySection id="environmental" title="Environmental / Retail Applications">
          <Reveal><Visual name="backdrop" label="Photo Backdrop" repeated /></Reveal>
        </GallerySection>

        <GallerySection id="events-cart" title="Events Cart">
          <Reveal><Visual name="technical" label="Technical Application" /></Reveal>
          <Reveal><Visual name="cart" label="Cart Mockup" /></Reveal>
        </GallerySection>

        <CaseStudyClosingCta title="Planning a seasonal campaign for your brand?" body="I develop campaign identities that connect packaging, retail spaces, and customer experiences." />
      </article>
    </main>
  );
}
