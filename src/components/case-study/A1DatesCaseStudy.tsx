import type { Project } from "@/data/projects";
import { a1DatesCover, a1DatesDirections, type A1DatesVisual } from "@/data/a1Dates";
import { a1DatesPremiumConcepts, a1DatesSnackConcepts, type A1DatesConcept } from "@/data/a1DatesConcepts";
import Image from "@/components/media/CaseStudyImage";
import ProjectArtwork from "@/components/media/ProjectArtwork";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const fullSizes = "(min-width: 1152px) 1104px, calc(100vw - 48px)";
const twoColumnSizes = "(min-width: 1152px) 540px, calc((100vw - 72px) / 2)";
const thirdSizes = "(min-width: 1152px) 352px, (min-width: 640px) calc((100vw - 96px) / 3), calc((100vw - 72px) / 2)";
const mobileLeadSizes = "(min-width: 1152px) 352px, (min-width: 640px) calc((100vw - 96px) / 3), calc(100vw - 48px)";
const formatSizes = "(min-width: 1152px) 352px, (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 640px) calc((100vw - 72px) / 2), calc((100vw - 64px) / 2)";
const formatLeadSizes = "(min-width: 1152px) 540px, (min-width: 1024px) calc((100vw - 72px) / 2), calc(100vw - 48px)";

const conceptNotes: Record<string, string> = {
  Tamoura: "Ivory, forest green and dune illustrations placed Saudi provenance at the centre of the gifting concept.",
  Oasira: "Deep blue connected a contemporary premium identity across carton, plastic and metal formats.",
  Aseela: "Cream and burgundy explored authenticity and a more established, traditional character.",
  D8: "Electric lime, bold lettering and digital cues brought an energetic snack personality.",
  "Date Me": "Playful romantic graphics evolved into more mature typography and controlled colour blocking.",
  YUMR: "Saturated colour and heavy lettering explored appetite, flavour and everyday snack appeal.",
};

function Artwork({ visual, sizes = fullSizes }: { visual: A1DatesVisual; sizes?: string }) {
  return <ProjectArtwork {...visual} sizes={sizes} />;
}

function ConceptGallery({ visuals }: { visuals: readonly A1DatesVisual[] }) {
  const boards = visuals.filter(visual => visual.width > visual.height);
  const portraits = visuals.filter(visual => visual.width <= visual.height);
  return <div className="space-y-5">
    {boards.map(visual => <div key={visual.src} className="mx-auto max-w-4xl"><Artwork visual={visual} sizes="(min-width: 1024px) 896px, calc(100vw - 48px)" /></div>)}
    {portraits.length ? <div className={`grid grid-cols-2 gap-4 sm:gap-6 ${portraits.length === 3 ? "sm:grid-cols-3" : ""}`}>
      {portraits.map((visual, index) => {
        const lead = portraits.length === 3 && index === 0;
        return <div key={visual.src} className={lead ? "col-span-2 sm:col-span-1" : ""}><Artwork visual={visual} sizes={portraits.length === 3 ? (lead ? mobileLeadSizes : thirdSizes) : twoColumnSizes} /></div>;
      })}
    </div> : null}
  </div>;
}

function Concept({ concept }: { concept: A1DatesConcept }) {
  return <article className="mt-12 md:mt-16" aria-label={`${concept.name} brand concept`}>
    <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-12">
      <div><h3 className="text-2xl font-semibold text-ink md:text-3xl">{concept.name}</h3><p className="mt-1 text-sm text-ink-faint">{concept.positioning}</p></div>
      <p className="max-w-lg text-base leading-7 text-ink-soft">{conceptNotes[concept.name]}</p>
    </div>
    {concept.earlyVisual && concept.refinementBoard ? <div className="mb-6 grid items-start gap-6 md:grid-cols-[0.7fr_1.3fr]">
      <div><p className="mb-3 text-sm text-ink-faint">Early study</p><Artwork visual={concept.earlyVisual} sizes="(min-width: 1152px) 378px, (min-width: 768px) 35vw, calc(100vw - 48px)" /></div>
      <div><p className="mb-3 text-sm text-ink-faint">Refined directions</p><Artwork visual={concept.refinementBoard} sizes="(min-width: 1152px) 702px, (min-width: 768px) 65vw, calc(100vw - 48px)" /></div>
    </div> : null}
    <ConceptGallery visuals={concept.visuals} />
  </article>;
}

export default function A1DatesCaseStudy({ project }: { project: Project }) {
  const formatStudies = [...a1DatesDirections.colourful.applications, ...a1DatesDirections.natural.applications];
  return <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
    <article className="mx-auto max-w-6xl px-6">
      <CaseStudyBackLink />
      <header className="pb-12 pt-6 md:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Brand Identity &amp; Packaging</p>
            <h1 className="mt-5 text-5xl font-semibold leading-tight text-ink md:text-7xl">A1 Dates</h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-ink-soft">From premium gifting to everyday snacking. A brand development journey for Saudi dates in the UK.</p>
            <p className="mt-7 text-sm leading-7 text-ink-faint">{project.industry}<br />{project.market}</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-edge bg-surface-card">
            <Image {...a1DatesCover} loading="eager" fetchPriority="high" sizes="(min-width: 1152px) 650px, (min-width: 1024px) 60vw, calc(100vw - 48px)" className="block h-auto w-full" />
          </div>
        </div>
      </header>

      <section id="premium-market" className="border-t border-edge py-12 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
          <h2 className="max-w-lg text-3xl font-semibold leading-tight text-ink md:text-5xl">Heritage &amp; premium</h2>
          <p className="max-w-xl text-base leading-8 text-ink-soft">The first concepts explored Saudi provenance, gifting and a refined food presentation.</p>
        </div>
        {a1DatesPremiumConcepts.map(concept => <Concept key={concept.name} concept={concept} />)}
      </section>

      <section id="everyday-snacking" className="border-t border-edge py-12 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
          <h2 className="max-w-lg text-3xl font-semibold leading-tight text-ink md:text-5xl">Everyday snacking</h2>
          <p className="max-w-xl text-base leading-8 text-ink-soft">The brief shifted toward younger shoppers. Three identities explored energy, humour and appetite appeal.</p>
        </div>
        {a1DatesSnackConcepts.map(concept => <Concept key={concept.name} concept={concept} />)}
      </section>

      <section id="a1-direction" className="border-t border-edge py-12 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">A quieter direction for everyday retail.</h2>
          <p className="mt-6 text-base leading-8 text-ink-soft md:text-lg">A1 Dates brought the focus back to a broader audience: clear naming, natural colours and visible product.</p>
        </div>
        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <Artwork visual={a1DatesDirections.colourful.hero} sizes="(min-width: 1152px) 624px, (min-width: 768px) 60vw, calc(100vw - 48px)" />
          <div><h3 className="text-xl font-semibold text-ink">The expressive starting point</h3><p className="mt-4 text-base leading-8 text-ink-soft">Bold colour and oversized lettering gave way to a simpler wordmark and a more balanced, natural presentation.</p></div>
        </div>

        <div id="packaging-design" className="mt-12 md:mt-16">
          <h3 className="mb-6 text-xl font-semibold text-ink">Earlier format studies</h3>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-6">
            {formatStudies.map((visual, index) => <div key={visual.src} className={`${index < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${index === formatStudies.length - 1 ? "col-span-2 lg:col-span-3" : ""}`}>
              <Artwork visual={visual} sizes={index < 3 ? formatSizes : index === formatStudies.length - 1 ? formatLeadSizes : twoColumnSizes} />
            </div>)}
          </div>
        </div>

        <div id="design-refinement" className="mt-12 md:mt-20">
          <div className="mb-7 grid gap-4 md:grid-cols-2 md:gap-16">
            <h3 className="text-2xl font-semibold text-ink md:text-3xl">The developed direction</h3>
            <p className="max-w-xl text-base leading-8 text-ink-soft">The logo, Saudi-origin labelling, product scale and hierarchy were refined around an 800g carton. A 400g pack remained planned.</p>
          </div>
          <Artwork visual={a1DatesCover} />
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-ink-faint">Audience and commercial benefits are design hypotheses, not findings from consumer research or measured market results.</p>
      </section>

      <CaseStudyClosingCta title="A clear identity, from brand to packaging." body="Let’s talk about your next brand identity and packaging project." />
    </article>
  </main>;
}
