"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useState } from "react";
import SocialMediaGrid, { type SocialMediaGridItem } from "./SocialMediaGrid";
import VideoPlayer from "./VideoPlayer";

const base = "/projects/x-factor-interior-design/social-media";
const logo = "/projects/x-factor-interior-design/logo/x-factor-interior-design-icon-logo.svg";
const reelCover = "x-factor-interior-design-dubai-penthouse-reel-cover.webp";
const reel = "x-factor-interior-design-dubai-residential-reel.mp4";
const beforeAfterBase = `${base}/before-after`;

type SocialPost = {
  filename: string;
  alt: string;
  caption: string;
};

type CarouselPost = {
  type: "carousel";
  title: string;
  alt: string;
  caption: string;
  slides: readonly SocialPost[];
};

type GridPost = (SocialPost & { type: "static" }) | CarouselPost;

const staticPosts: readonly SocialPost[] = [
  {
    filename: "x-factor-interior-design-dubai-bespoke-home.webp",
    alt: "Bespoke Dubai home interior design social media campaign by X Factor Interior Design",
    caption: "Are you looking for interior design in Dubai? A bespoke home is designed around the way you live.",
  },
  {
    filename: "x-factor-interior-design-dubai-bespoke-interiors.webp",
    alt: "Bespoke luxury home interior design social media graphic by X Factor Interior Design in Dubai",
    caption: "Bespoke luxury interiors, designed around the way you live.",
  },
  {
    filename: "x-factor-interior-design-dubai-villa-interiors.webp",
    alt: "Luxury villa interior design social media graphic for Dubai homeowners",
    caption: "Own a villa? Make every room feel considered, personal, and complete.",
  },
  {
    filename: "x-factor-interior-design-dubai-turnkey-service.webp",
    alt: "Turnkey interior design and fit-out social media graphic by X Factor Interior Design, Dubai",
    caption: "From concept to completion, one considered turnkey interior design service.",
  },
  {
    filename: "x-factor-interior-design-dubai-villa-renovation-budget.webp",
    alt: "Turnkey villa interior design social media graphic about renovation budgets in Dubai",
    caption: "A thoughtful interior process brings greater clarity to budgets and decisions.",
  },
  {
    filename: "x-factor-interior-design-dubai-designed-comfort.webp",
    alt: "Luxury residential interior design social media graphic about carefully designed comfort in Dubai",
    caption: "Comfort is carefully designed through proportion, material, and light.",
  },
  {
    filename: "x-factor-interior-design-dubai-interiors-lasting-value.webp",
    alt: "Luxury interior design social media graphic about adding lasting value to Dubai homes",
    caption: "Thoughtful design adds value that lasts beyond the first impression.",
  },
  {
    filename: "x-factor-interior-design-islamic-new-year-greeting.webp",
    alt: "Islamic New Year social media graphic from X Factor Interior Design, a Dubai luxury interior design studio",
    caption: "An Islamic New Year greeting from X Factor Interior Design.",
  },
];

const carouselPosts: readonly CarouselPost[] = [
  {
    type: "carousel",
    title: "Villa Owners",
    alt: "Dubai villa interior design carousel for X Factor Interior Design's turnkey renovation campaign",
    caption: "A carousel for villa owners planning a refined turnkey interior.",
    slides: [
      { filename: "carousels/x-factor-interior-design-dubai-villa-interiors-01.webp", alt: "Dubai villa interior design carousel cover for a turnkey renovation campaign by X Factor Interior Design", caption: "A carousel for villa owners planning a refined turnkey interior." },
      { filename: "carousels/x-factor-interior-design-dubai-villa-interiors-02.webp", alt: "Luxury villa interior design carousel slide about personalised services for Dubai homeowners", caption: "Every villa starts with the people who will call it home." },
      { filename: "carousels/x-factor-interior-design-dubai-villa-interiors-03.webp", alt: "Turnkey villa interior design carousel slide about coordinating design and delivery in Dubai", caption: "A clear process brings design, coordination, and delivery together." },
      { filename: "carousels/x-factor-interior-design-dubai-villa-interiors-04.webp", alt: "Luxury villa interior design carousel closing slide by X Factor Interior Design in Dubai", caption: "A refined home, resolved from the first idea to the final detail." },
    ],
  },
  {
    type: "carousel",
    title: "The Feeling of Luxury",
    alt: "Luxury residential interior design carousel by X Factor Interior Design in Dubai",
    caption: "The feeling of luxury begins with how a space makes you feel.",
    slides: [
      { filename: "carousels/x-factor-interior-design-dubai-feeling-of-luxury-01.webp", alt: "Luxury residential interior design carousel cover by X Factor Interior Design in Dubai", caption: "The feeling of luxury begins with how a space makes you feel." },
      { filename: "carousels/x-factor-interior-design-dubai-feeling-of-luxury-02.webp", alt: "Dubai luxury interior design carousel slide featuring warm materials and refined home details", caption: "Warm materials and thoughtful details shape an enduring interior." },
      { filename: "carousels/x-factor-interior-design-dubai-feeling-of-luxury-03.webp", alt: "Luxury residential interiors carousel slide about creating a calm, personal Dubai home", caption: "Luxury is a calm, personal experience—not simply a visual style." },
      { filename: "carousels/x-factor-interior-design-dubai-feeling-of-luxury-04.webp", alt: "Luxury villa interior design carousel slide featuring tailored spaces and craftsmanship", caption: "Tailored spaces and skilled craftsmanship create lasting comfort." },
      { filename: "carousels/x-factor-interior-design-dubai-feeling-of-luxury-05.webp", alt: "Luxury residential interior design carousel closing slide by X Factor Interior Design, Dubai", caption: "Discover an interior designed for the way you want to live." },
    ],
  },
  {
    type: "carousel",
    title: "The Genesis of Luxury",
    alt: "Luxury interior design campaign carousel by X Factor Interior Design in Dubai",
    caption: "The genesis of luxury: a home shaped by considered design decisions.",
    slides: [
      { filename: "carousels/x-factor-interior-design-dubai-luxury-interiors-01.webp", alt: "Luxury interior design campaign carousel cover by X Factor Interior Design in Dubai", caption: "The genesis of luxury: a home shaped by considered design decisions." },
      { filename: "carousels/x-factor-interior-design-dubai-luxury-interiors-02.webp", alt: "Luxury interior design carousel slide about planning a refined Dubai home", caption: "A refined home starts with a clear idea of how it should work and feel." },
      { filename: "carousels/x-factor-interior-design-dubai-luxury-interiors-03.webp", alt: "Dubai residential interior design carousel slide featuring a considered material and lighting palette", caption: "Material, light, and proportion work together to set the atmosphere." },
      { filename: "carousels/x-factor-interior-design-dubai-luxury-interiors-04.webp", alt: "Luxury villa interior design carousel slide about the details that define a home", caption: "The details that matter most are the ones that make a home feel complete." },
      { filename: "carousels/x-factor-interior-design-dubai-luxury-interiors-05.webp", alt: "Luxury interior design campaign carousel closing slide by X Factor Interior Design, Dubai", caption: "A quieter, more personal expression of luxury interior design." },
    ],
  },
  {
    type: "carousel",
    title: "Sculpting with Light",
    alt: "Residential lighting design carousel by X Factor Interior Design in Dubai",
    caption: "Sculpting with light: the element that gives every interior its depth.",
    slides: [
      { filename: "carousels/x-factor-interior-design-dubai-lighting-design-01.webp", alt: "Residential lighting design carousel cover by X Factor Interior Design in Dubai", caption: "Sculpting with light: the element that gives every interior its depth." },
      { filename: "carousels/x-factor-interior-design-dubai-lighting-design-02.webp", alt: "Dubai luxury interior design carousel slide featuring architectural lighting in a residential space", caption: "Lighting reveals the architecture and changes the way a room is experienced." },
      { filename: "carousels/x-factor-interior-design-dubai-lighting-design-03.webp", alt: "Luxury villa lighting design carousel slide about mood, texture, and material", caption: "Mood, texture, and material become more expressive in the right light." },
      { filename: "carousels/x-factor-interior-design-dubai-lighting-design-04.webp", alt: "Residential interior lighting design carousel slide for refined homes in Dubai", caption: "Layered lighting creates a home that adapts gracefully throughout the day." },
      { filename: "carousels/x-factor-interior-design-dubai-lighting-design-05.webp", alt: "Residential lighting design carousel closing slide by X Factor Interior Design, Dubai", caption: "Light is not an afterthought—it is part of the interior design itself." },
    ],
  },
];

const gridPosts: readonly GridPost[] = [
  ...staticPosts.map((post) => ({ ...post, type: "static" as const })),
  ...carouselPosts,
];

const socialGridItems: readonly SocialMediaGridItem[] = gridPosts.map((post) => {
  if (post.type === "carousel") {
    const slides = post.slides.map((slide) => ({
      src: `${base}/${slide.filename}`,
      alt: slide.alt,
      caption: slide.caption,
    }));
    return { id: post.title, preview: slides[0], slides };
  }

  return {
    id: post.filename,
    preview: {
      src: `${base}/${post.filename}`,
      alt: post.alt,
      caption: post.caption,
    },
  };
});
const beforeAfterEditsAscending = [
  {
    number: "4",
    title: "Walk-in wardrobe · Light and perspective",
    before: "x-factor-dubai-walk-in-wardrobe-before-photo-editing.webp",
    after: "x-factor-dubai-walk-in-wardrobe-after-photo-retouching.webp",
    beforeAlt: "Dubai walk-in wardrobe interior before professional photo editing for X Factor Interior Design",
    afterAlt: "Retouched Dubai walk-in wardrobe interior with balanced lighting and corrected perspective for X Factor Interior Design",
    description: "Corrected vertical lines, reduced image noise, and balanced the integrated lighting to reveal the wardrobe's symmetry and material detail.",
  },
  {
    number: "3",
    title: "Luxury living room · Day-to-evening grade",
    before: "x-factor-dubai-luxury-living-room-before-color-grading.webp",
    after: "x-factor-dubai-luxury-living-room-after-evening-color-grading.webp",
    beforeAlt: "Dubai luxury living room before evening colour grading for X Factor Interior Design",
    afterAlt: "Dubai luxury living room after warm evening colour grading for X Factor Interior Design",
    description: "Shifted the daylight capture into an evening mood while preserving furniture detail, warm practical lighting, and the view beyond the windows.",
  },
  {
    number: "2",
    title: "Penthouse bedroom · Skyline enhancement",
    before: "x-factor-dubai-penthouse-bedroom-before-photo-editing.webp",
    after: "x-factor-dubai-penthouse-bedroom-after-sunset-photo-retouching.webp",
    beforeAlt: "Dubai penthouse bedroom and skyline before professional photo editing for X Factor Interior Design",
    afterAlt: "Retouched Dubai penthouse bedroom with enhanced sunset skyline for X Factor Interior Design social media",
    description: "Recovered the skyline, refined the sunset colour, and balanced interior highlights to create a stronger vertical image for social media.",
  },
  {
    number: "1",
    title: "Bedroom detail · Golden-hour finish",
    before: "x-factor-dubai-bedroom-interior-before-color-grading.webp",
    after: "x-factor-dubai-bedroom-interior-after-golden-hour-color-grading.webp",
    beforeAlt: "Dubai bedroom interior detail before golden-hour colour grading for X Factor Interior Design",
    afterAlt: "Dubai bedroom interior after golden-hour colour grading and professional photo retouching for X Factor Interior Design",
    description: "Introduced a warm golden-hour grade, controlled the window highlights, and enhanced reflections without losing the room's neutral palette.",
  },
] as const;

const beforeAfterEdits = [...beforeAfterEditsAscending].reverse();

export default function XFactorSocialMediaShowcase() {
  const [activeEditIndex, setActiveEditIndex] = useState(0);

  const activeEdit = beforeAfterEdits[activeEditIndex];

  return <>
    <SocialMediaGrid
      brandName="X Factor Interior Design"
      username="xfactorinteriordesign"
      subtitle="Luxury interiors · Dubai, UAE"
      logo={logo}
      logoAlt="X Factor Interior Design Dubai logo icon"
      logoBackground="#F3F1EC"
      logoRingClassName="from-[#A28D72] via-[#D8CDBE] to-[#F8F5EF]"
      accentColor="#8A7A63"
      stats={["13", "3.8K", "214"]}
      items={socialGridItems}
    />

    <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-edge bg-surface-card/45 p-5 shadow-2xl shadow-black/10 sm:p-8" aria-labelledby="x-factor-editing-heading">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Image post-production</p>
          <h3 id="x-factor-editing-heading" className="mt-2 text-xl font-semibold text-ink sm:text-2xl">Dubai interior photography: before and after editing</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">A selection of X Factor Interior Design photographs transformed through professional retouching, perspective correction, colour grading, light shaping, and social media reframing.</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Choose a before and after comparison">
          {beforeAfterEdits.map((edit, index) => <button
            key={edit.title}
            type="button"
            onClick={() => setActiveEditIndex(index)}
            aria-pressed={activeEditIndex === index}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${activeEditIndex === index ? "border-ink bg-ink text-surface" : "border-edge text-ink-soft hover:border-ink-faint hover:text-ink"}`}
          >{edit.number}</button>)}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-4">
        <figure>
          <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-black">
            <Image src={`${beforeAfterBase}/${activeEdit.before}`} alt={activeEdit.beforeAlt} fill sizes="(min-width: 1280px) 440px, 46vw" className="object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-xs">Before</span>
          </div>
        </figure>
        <figure>
          <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-black">
            <Image src={`${beforeAfterBase}/${activeEdit.after}`} alt={activeEdit.afterAlt} fill sizes="(min-width: 1280px) 440px, 46vw" className="object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-[#8A7A63]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-xs">After</span>
          </div>
        </figure>
      </div>
      <div className="mx-auto mt-4 max-w-2xl text-center">
        <p className="text-sm font-semibold text-ink">{activeEdit.title}</p>
        <p className="mt-1 text-sm leading-6 text-ink-soft">{activeEdit.description}</p>
      </div>
    </section>

    <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-edge bg-surface-card/45 p-5 shadow-2xl shadow-black/10 sm:p-8" aria-labelledby="x-factor-reel-heading">
      <div className="max-w-2xl"><p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Featured Reel</p><h3 id="x-factor-reel-heading" className="mt-2 text-xl font-semibold text-ink sm:text-2xl">Penthouse living at Cayan Tower</h3><p className="mt-2 text-sm leading-6 text-ink-soft">The Reel cover and the finished Cayan Tower video are shown together as a distinct 9:16 social format.</p></div>
      <div className="mt-6 grid items-start gap-5 sm:grid-cols-2">
        <figure className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-xl border border-edge bg-black"><Image src={`${base}/${reelCover}`} alt="Luxury Dubai penthouse interior design Reel cover by X Factor Interior Design" width={1080} height={1920} sizes="(min-width: 640px) 320px, 86vw" className="h-auto w-full" /></figure>
        <div className="mx-auto aspect-[9/16] w-full max-w-[22rem] overflow-hidden rounded-xl border border-edge bg-black"><VideoPlayer src={`${base}/${reel}`} poster={`${base}/${reelCover}`} label="Dubai high-rise residence interior design Reel by X Factor Interior Design" /></div>
      </div>
    </section>

  </>;
}
