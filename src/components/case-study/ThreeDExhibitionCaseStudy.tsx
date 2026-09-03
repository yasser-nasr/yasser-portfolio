import type { ReactNode } from "react";
import ZoomableCaseStudyImage from "@/components/case-study/ZoomableCaseStudyImage";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const base = "/projects/3d-exhibition";

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">{children}</h2>
    </div>
  );
}

function Visual({ src, alt, label, width, height, priority = false, hero = false }: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  priority?: boolean;
  hero?: boolean;
}) {
  return (
    <ZoomableCaseStudyImage
      src={src}
      alt={alt}
      label={label}
      width={width}
      height={height}
      priority={priority}
      compact
      frameRadiusClassName={hero ? "rounded-[1.5rem]" : undefined}
      sizes="(min-width: 1152px) 1152px, 100vw"
    />
  );
}

export default function ThreeDExhibitionCaseStudy() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />

        <section aria-labelledby="case-study-title" className="pt-6">
          <Visual
            src={`${base}/rta/stage/rta-eid-al-etihad-stage-front-view.webp`}
            alt="Front 3D visualization of the RTA Eid Al Etihad event stage with audience seating, central display, illuminated heritage-inspired graphics, and branded elements."
            label="RTA Dubai — Eid Al Etihad stage design"
            width={1920}
            height={1080}
            priority
            hero
          />
          <header className="py-14 md:py-20">
            <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">
              Booth, Stage &amp; Branded Environment Design
            </p>
            <h1 id="case-study-title" className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">
              3D Exhibition &amp; Experiential Design
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
              Spatial Concepts for Live Events &amp; Branded Experiences
            </p>
            <div className="mt-7">
              <p className="text-xs uppercase tracking-[0.16em] text-ink-faint">Scope</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {["Booth Design", "3D Exhibition Design", "Experiential Design", "Spatial Visualization", "Stage Design"].map((item) => (
                  <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">{item}</li>
                ))}
              </ul>
            </div>
          </header>
        </section>

        <section id="introduction" className="border-t border-edge py-16 md:py-24">
          <SectionHeading eyebrow="Overview">Brand → Function → Space → Experience</SectionHeading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            Selected exhibition and experiential design work translating brand identities, event briefs, and functional requirements into spatial concepts, branded environments, and presentation-ready 3D visualizations.
          </p>
        </section>

        <section id="rta-dubai" className="border-t border-edge py-16 md:py-24">
          <SectionHeading eyebrow="Dubai, UAE">RTA Dubai / Eid Al Etihad</SectionHeading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            The supplied Eid Al Etihad identity was translated into a complete event environment across exhibition areas, stage design, entrance installations, visitor zones, and branded spatial elements.
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-faint">
            The RTA and Eid Al Etihad identity assets were supplied; the contribution shown here is the spatial interpretation and 3D environment.
          </p>
          <div className="mt-10 space-y-5">
            <Visual src={`${base}/rta/overview/rta-eid-al-etihad-exhibition-overview.webp`} alt="Wide 3D overview of the RTA Eid Al Etihad exhibition showing branded walls, visitor areas, meeting counters, and display screens." label="Exhibition overview" width={1672} height={941} />
            <Visual src={`${base}/rta/planning/rta-eid-al-etihad-exhibition-top-view.webp`} alt="Top-down 3D view of the RTA Eid Al Etihad exhibition layout showing meeting counters, central seating, circulation, display walls, and presentation zones." label="Spatial planning — zoning, circulation, and visitor areas" width={1920} height={1080} />
            <div className="grid gap-5 md:grid-cols-2 md:items-start">
              <Visual src={`${base}/rta/stage/rta-eid-al-etihad-stage-front-view.webp`} alt="Front 3D visualization of the RTA Eid Al Etihad event stage with audience seating, central display, illuminated heritage-inspired graphics, and branded elements." label="Stage design" width={1920} height={1080} />
              <Visual src={`${base}/rta/overview/rta-eid-al-etihad-exhibition-corner-view.webp`} alt="Corner 3D view of the RTA Eid Al Etihad exhibition with branded graphic walls, wood-slat panels, display screens, and visitor meeting areas." label="Exhibition environment — corner view" width={1672} height={941} />
              <Visual src={`${base}/rta/overview/rta-eid-al-etihad-exhibition-interior-view.webp`} alt="Elevated interior 3D view of the RTA Eid Al Etihad exhibition showing the central interaction counter, meeting tables, seating, and branded walls." label="Interior interaction and meeting zones" width={1254} height={1254} />
              <Visual src={`${base}/rta/installations/rta-eid-al-etihad-entrance-installation-front-view.webp`} alt="Front 3D view of the RTA Eid Al Etihad entrance installation with illuminated RTA branding, palm forms, cultural motifs, and a sculptural 54 element." label="Entrance installation" width={1672} height={941} />
              <Visual src={`${base}/rta/installations/rta-eid-al-etihad-entrance-installation-wide-view.webp`} alt="Wide 3D view of the RTA Eid Al Etihad entrance installation with illuminated RTA branding, cultural motifs, and a sculptural 54 element." label="Entrance installation — wide view" width={1672} height={941} />
              <Visual src={`${base}/rta/installations/rta-eid-al-etihad-entrance-installation-angle-view.webp`} alt="Angled 3D view of the RTA Eid Al Etihad entrance installation showing illuminated branding, cultural silhouettes, and the freestanding 54 form." label="Entrance installation — supporting angle" width={1672} height={941} />
              <Visual src={`${base}/rta/installations/rta-eid-al-etihad-heritage-photo-installation.webp`} alt="RTA Eid Al Etihad heritage photo installation with an illuminated backdrop, sculptural 54, Dubai landmark silhouettes, and a central traditional chair." label="Heritage photo installation" width={1672} height={941} />
              <Visual src={`${base}/rta/installations/rta-eid-al-etihad-branded-display-cubes.webp`} alt="Three RTA Eid Al Etihad branded display cubes featuring illuminated logos and a sculptural 54 element." label="Branded display elements" width={1448} height={1086} />
              <Visual src={`${base}/rta/supporting/rta-eid-al-etihad-digital-invitation-mockup.webp`} alt="RTA Eid Al Etihad digital event invitation displayed on an iPhone mockup against a dark textured background." label="Digital invitation" width={4000} height={3000} />
            </div>
          </div>
        </section>

        <section id="riyadh-chamber" className="border-t border-edge py-16 md:py-24">
          <SectionHeading eyebrow="Riyadh, Saudi Arabia">Riyadh Chamber</SectionHeading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            Riyadh Chamber required a branded exhibition environment balancing visibility, visitor interaction, and functional use. The concept uses two reception points, illuminated architectural framing, integrated signage, and a compact visitor lounge within one structured booth.
          </p>
          <div className="mt-10 space-y-5">
            <Visual src={`${base}/riyadh-chamber/riyadh-chamber-exhibition-booth-overview.webp`} alt="Wide 3D overview of the Riyadh Chamber exhibition booth with two reception desks, illuminated blue framing, wood finishes, and integrated branding." label="Exhibition booth overview" width={3840} height={2160} />
            <div className="grid gap-5 md:grid-cols-2 md:items-start">
              <Visual src={`${base}/riyadh-chamber/riyadh-chamber-exhibition-booth-front-view.webp`} alt="Front 3D view of the Riyadh Chamber exhibition booth with twin reception desks, illuminated blue framing, wood finishes, and central branding." label="Front view" width={3840} height={2160} />
              <Visual src={`${base}/riyadh-chamber/riyadh-chamber-exhibition-booth-right-angle.webp`} alt="Right-angle 3D view of the Riyadh Chamber booth showing twin reception points, illuminated structural bands, and the branded wood backdrop." label="Reception and architectural framing" width={3840} height={2160} />
              <Visual src={`${base}/riyadh-chamber/riyadh-chamber-exhibition-booth-left-angle.webp`} alt="Left-angle 3D view of the Riyadh Chamber exhibition booth showing illuminated blue framing, reception desks, and integrated digital panels." label="Left-angle view" width={3840} height={2160} />
              <Visual src={`${base}/riyadh-chamber/riyadh-chamber-exhibition-booth-alternative-view.webp`} alt="Alternative 3D view of the Riyadh Chamber booth with a light branded backdrop, two reception points, and illuminated blue framing." label="Alternative booth view" width={3840} height={2160} />
              <Visual src={`${base}/riyadh-chamber/riyadh-chamber-reception-desk-detail.webp`} alt="Close 3D detail of the Riyadh Chamber reception desk showing curved white cabinetry, wood surfaces, and integrated lighting." label="Reception desk detail" width={3840} height={2160} />
              <Visual src={`${base}/riyadh-chamber/riyadh-chamber-visitor-lounge.webp`} alt="Riyadh Chamber visitor lounge with two pod chairs, a central table, illuminated dividers, and wall branding inside the exhibition booth." label="Visitor interaction lounge" width={3840} height={2160} />
            </div>
          </div>
        </section>

        <section id="makkah-chamber" className="border-t border-edge py-16 md:py-24">
          <SectionHeading eyebrow="Makkah, Saudi Arabia">Makkah Chamber</SectionHeading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            The Makkah Chamber concept combines reception, visitor hospitality, and a meeting area within one connected environment. Blue and warm metallic finishes, integrated lighting, and branded architectural elements create a consistent identity across the zones.
          </p>
          <div className="mt-10 space-y-5">
            <Visual src={`${base}/makkah-chamber/makkah-chamber-exhibition-overview.webp`} alt="Wide 3D overview of the Makkah Chamber exhibition environment with a branded reception, visitor lounge, illuminated screens, and an upper-level space." label="Exhibition overview" width={1672} height={941} />
            <div className="grid gap-5 md:grid-cols-2 md:items-start">
              <Visual src={`${base}/makkah-chamber/makkah-chamber-exhibition-zoning-plan.webp`} alt="Makkah Chamber exhibition zoning plan identifying reception, meeting, and hospitality areas within the spatial layout." label="Functional zoning plan" width={2382} height={3368} />
              <Visual src={`${base}/makkah-chamber/makkah-chamber-meeting-room.webp`} alt="Makkah Chamber meeting room and storage area with an illuminated conference table, warm metallic walls, blue display storage, and branded signage." label="Meeting room and storage" width={1672} height={941} />
              <Visual src={`${base}/makkah-chamber/makkah-chamber-illuminated-signage.webp`} alt="Illuminated Makkah Chamber logo and bilingual signage mounted on a warm metallic exhibition wall beside integrated display storage." label="Illuminated signage" width={1672} height={941} />
            </div>
          </div>
        </section>

        <CaseStudyClosingCta
          title="Planning an exhibition or branded event experience?"
          body="I translate supplied brand systems and functional briefs into clear spatial concepts, branded environments, stages, and presentation-ready 3D visualizations."
          primaryLabel="Start a project"
        />
      </article>
    </main>
  );
}
