import type { Metadata } from "next";
import FinalCta from "@/components/FinalCta";
import HeadingReveal from "@/components/HeadingReveal";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import VideoPlayer from "@/components/case-study/VideoPlayer";
import { productionSiteUrl } from "@/lib/site";
import { motionVideoPageStructuredData } from "@/lib/structuredData";

const title = "Motion & Video Design Portfolio | Yasser Nasr";
const description =
  "Selected motion graphics, reels, video editing, campaign content, and multimedia work by Graphic & Multimedia Designer Yasser Nasr.";
const openGraphTitle = "Motion & Video | Yasser Nasr";
const openGraphDescription =
  "Selected reels, motion graphics, video editing, campaign content, and multimedia work by Yasser Nasr.";
const url = `${productionSiteUrl}/motion-video`;
const mediaBase = "/projects/videos-reels";
const socialImage = `${mediaBase}/yasser-nasr-motion-video-portfolio-og.jpg`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "motion graphics",
    "reels",
    "short-form content",
    "video editing",
    "campaign video",
    "branded content",
    "multimedia",
  ],
  category: "Motion & Video Design",
  creator: "Yasser Nasr",
  authors: [{ name: "Yasser Nasr", url: productionSiteUrl }],
  alternates: { canonical: url },
  openGraph: {
    title: openGraphTitle,
    description: openGraphDescription,
    url,
    siteName: "Yasser Nasr",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Motion and video portfolio by Yasser Nasr featuring Memo Travel reels and a Takeya Kitchen campaign video for the Multicultural Center in Houston",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: openGraphTitle,
    description: openGraphDescription,
    images: [{
      url: socialImage,
      alt: "Motion and video portfolio by Yasser Nasr featuring Memo Travel reels and a Takeya Kitchen campaign video for the Multicultural Center in Houston",
    }],
  },
};

const reels = [
  {
    title: "Dahab",
    src: `${mediaBase}/memo-travel-dahab-short-form-reel.mp4`,
    poster: `${mediaBase}/memo-travel-dahab-short-form-reel-poster.webp`,
    label: "Memo Travel Company Dahab short-form travel reel edited by Yasser Nasr",
  },
  {
    title: "Umrah",
    src: `${mediaBase}/memo-travel-umrah-short-form-reel.mp4`,
    poster: `${mediaBase}/memo-travel-umrah-short-form-reel-poster.webp`,
    label: "Memo Travel Company Umrah short-form travel reel edited by Yasser Nasr",
  },
  {
    title: "Sinai",
    src: `${mediaBase}/memo-travel-sinai-short-form-reel.mp4`,
    poster: `${mediaBase}/memo-travel-sinai-short-form-reel-poster.webp`,
    label: "Memo Travel Company Sinai short-form travel reel edited by Yasser Nasr",
  },
] as const;

const renovoFixReels = [
  ["Lighting", "lighting"],
  ["Bathroom", "bathroom"],
  ["Ceiling", "ceiling"],
  ["Flooring", "flooring"],
] as const;

const renovoFixTransformations = [
  {
    title: "Living Space",
    src: "/projects/renovofix/before-after/renovofix-ai-renovation-transformation-01.mp4",
    poster: "/projects/renovofix/before-after/renovofix-ai-renovation-transformation-01-cover.webp",
    aspect: "landscape" as const,
  },
  ...([2, 3, 4] as const).map((number) => ({
    title: `Renovation ${number.toString().padStart(2, "0")}`,
    src: `/projects/renovofix/before-after/renovofix-ai-renovation-transformation-0${number}.mp4`,
    poster: `/projects/renovofix/before-after/renovofix-ai-renovation-transformation-0${number}-cover.webp`,
    aspect: "portrait" as const,
  })),
] as const;

const pillarsVideos = [
  {
    title: "Logo Animation",
    src: "/projects/pillars-pr/social-media/web/videos/pillars-pr-logo-animation-intro.mp4",
    poster: "/projects/pillars-pr/social-media/web/videos/pillars-pr-ppr-logo-animation-intro-cover.webp",
    label: "Pillars PR animated logo intro revealing the PPR monogram and brand identity",
    aspect: "landscape",
  },
  {
    title: "Professional Online Presence",
    src: "/projects/pillars-pr/social-media/web/videos/pillars-pr-online-presence-video.mp4",
    poster: "/projects/pillars-pr/social-media/web/videos/pillars-pr-online-presence-video-cover.webp",
    label: "Pillars PR motion design about building a professional online presence for legal-sector clients",
    aspect: "portrait",
  },
  {
    title: "Uses of Public Relations",
    src: "/projects/pillars-pr/social-media/web/videos/pillars-pr-uses-of-public-relations-video.mp4",
    poster: "/projects/pillars-pr/social-media/web/videos/pillars-pr-public-relations-video-cover.webp",
    label: "Pillars PR educational video explaining uses of public relations for legal professionals and organizations",
    aspect: "portrait",
  },
] as const;

function ShowcaseVideo({
  title,
  src,
  poster,
  label,
  aspect = "portrait",
}: {
  title: string;
  src: string;
  poster: string;
  label: string;
  aspect?: "portrait" | "landscape";
}) {
  return (
    <figure className={aspect === "portrait" ? "mx-auto w-full max-w-[24rem]" : "w-full"}>
      <div
        className={`overflow-hidden rounded-xl border border-edge bg-black shadow-2xl shadow-black/10 ${
          aspect === "portrait" ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <VideoPlayer src={src} poster={poster} label={label} />
      </div>
      <figcaption className="mt-4 flex items-start justify-between gap-4">
        <span className="font-medium text-ink">{title}</span>
        <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-ink-faint">
          {aspect === "portrait" ? "Vertical Video" : "Motion Video"}
        </span>
      </figcaption>
    </figure>
  );
}

export default function MotionVideoPage() {
  return (
    <>
      <JsonLd data={motionVideoPageStructuredData(description)} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-36 md:pt-44">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-base uppercase tracking-[0.22em] text-ink-soft md:text-lg">
            Selected Motion Work
          </p>
          <HeadingReveal
            as="h1"
            className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-6xl"
          >
            Motion &amp; Video
          </HeadingReveal>
          <Reveal>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
              Selected work across short-form content, motion graphics, video
              editing, and multimedia storytelling.
            </p>
            <ul
              aria-label="Motion and video capabilities"
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-faint"
            >
              <li>Motion Graphics</li>
              <li>Reels / Short-form Content</li>
              <li>Video Editing</li>
              <li>Campaign Video</li>
              <li>Branded Content</li>
              <li>Multimedia</li>
            </ul>
          </Reveal>

          <section aria-labelledby="campaign-video-heading" className="mt-16 border-t border-edge pt-12 md:mt-20 md:pt-16">
            <Reveal>
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                    Campaign Video · Motion Graphics · Multimedia
                  </p>
                  <h2 id="campaign-video-heading" className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                    Takeya Kitchen of Houston
                  </h2>
                </div>
                <dl className="flex flex-wrap gap-x-7 gap-y-3 text-sm sm:justify-end">
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.15em] text-ink-faint">Client</dt>
                    <dd className="mt-1 text-ink-soft">Multicultural Center</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.15em] text-ink-faint">Location</dt>
                    <dd className="mt-1 text-ink-soft">Houston, Texas, United States</dd>
                  </div>
                </dl>
              </div>
              <p className="mb-7 max-w-3xl text-sm leading-7 text-ink-soft md:text-base">
                A campaign video introducing a community kitchen nearing
                completion, created to build awareness around its mission to
                prepare and distribute fresh meals across Houston.
              </p>
              <div className="aspect-video overflow-hidden rounded-xl border border-edge bg-black shadow-2xl shadow-black/10">
                <VideoPlayer
                  src={`${mediaBase}/multicultural-center-takeya-kitchen-houston-community-meals-campaign-video.mp4`}
                  poster={`${mediaBase}/multicultural-center-takeya-kitchen-houston-campaign-video-poster.webp`}
                  label="Multicultural Center Takeya Kitchen of Houston campaign video with motion graphics and editing by Yasser Nasr"
                />
              </div>
            </Reveal>
          </section>

          <section aria-labelledby="reels-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
            <Reveal>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                    Reels · Short-form Content · Video Editing
                  </p>
                  <h2 id="reels-heading" className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                    Memo Travel Company
                  </h2>
                </div>
                <p className="text-sm text-ink-soft">Egypt</p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
              {reels.map((reel) => (
                <Reveal key={reel.title}>
                  <figure className="mx-auto w-full max-w-[24rem]">
                    <div className="aspect-[9/16] overflow-hidden rounded-xl border border-edge bg-black shadow-2xl shadow-black/10">
                      <VideoPlayer
                        src={reel.src}
                        poster={reel.poster}
                        label={reel.label}
                      />
                    </div>
                    <figcaption className="mt-4 flex items-center justify-between gap-4">
                      <span className="font-medium text-ink">{reel.title}</span>
                      <span className="text-xs uppercase tracking-[0.14em] text-ink-faint">
                        Reel
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="renovofix-video-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
            <Reveal>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                    Educational Reels · AI-assisted Video · Editing
                  </p>
                  <h2 id="renovofix-video-heading" className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                    RenovoFix
                  </h2>
                </div>
                <p className="text-sm text-ink-soft">Dubai, United Arab Emirates</p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {renovoFixReels.map(([title, slug]) => (
                <Reveal key={slug}>
                  <ShowcaseVideo
                    title={title}
                    src={`/projects/renovofix/reels/renovofix-${slug}-educational-reel.mp4`}
                    poster={`/projects/renovofix/reels/renovofix-${slug}-educational-reel-cover.webp`}
                    label={`${title} RenovoFix educational reel with AI-generated visual production and video editing by Yasser Nasr`}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 border-t border-edge pt-10">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                AI-assisted Renovation Transformations
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink md:text-2xl">
                Visualizing the outcome before completion
              </h3>
            </Reveal>
            <div className="mt-8 grid items-start gap-10 md:grid-cols-2 lg:grid-cols-3">
              {renovoFixTransformations.map((video) => (
                <Reveal
                  key={video.src}
                  className={video.aspect === "landscape" ? "md:col-span-2 lg:col-span-3" : ""}
                >
                  <ShowcaseVideo
                    title={video.title}
                    src={video.src}
                    poster={video.poster}
                    label={`${video.title} AI-assisted proposed renovation transformation video for RenovoFix by Yasser Nasr`}
                    aspect={video.aspect}
                  />
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="pillars-video-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
            <Reveal>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                    Logo Animation · Motion Graphics · Educational Video
                  </p>
                  <h2 id="pillars-video-heading" className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                    Pillars PR
                  </h2>
                </div>
                <p className="text-sm text-ink-soft">Abu Dhabi, United Arab Emirates</p>
              </div>
            </Reveal>
            <div className="mt-8 grid items-start gap-10 md:grid-cols-2">
              {pillarsVideos.map((video) => (
                <Reveal key={video.src} className={video.aspect === "landscape" ? "md:col-span-2" : ""}>
                  <ShowcaseVideo {...video} />
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="selected-project-reels-heading" className="mt-20 border-t border-edge pt-12 md:mt-28 md:pt-16">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                Event Content · Branded Reels · Video Editing
              </p>
              <h2 id="selected-project-reels-heading" className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                Selected Project Reels
              </h2>
            </Reveal>
            <div className="mt-8 grid items-start gap-12 md:grid-cols-2 md:gap-10">
              <Reveal>
                <article>
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold text-ink">MENA Law Reporters</h3>
                    <p className="mt-1 text-sm text-ink-faint">COP28 UAE · Abu Dhabi, United Arab Emirates</p>
                  </div>
                  <ShowcaseVideo
                    title="COP28 Highlights"
                    src="/projects/mena-law-reporters/social-media/mena-law-reporters-cop28-highlights-video.mp4"
                    poster="/projects/mena-law-reporters/social-media/mena-law-reporters-cop28-highlights-video-cover.webp"
                    label="MENA Law Reporters vertical event video featuring highlights from COP28 UAE"
                  />
                </article>
              </Reveal>
              <Reveal>
                <article>
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold text-ink">X Factor Interior Design</h3>
                    <p className="mt-1 text-sm text-ink-faint">Cayan Tower · Dubai, United Arab Emirates</p>
                  </div>
                  <ShowcaseVideo
                    title="Penthouse Living"
                    src="/projects/x-factor-interior-design/social-media/x-factor-interior-design-dubai-residential-reel.mp4"
                    poster="/projects/x-factor-interior-design/social-media/x-factor-interior-design-dubai-penthouse-reel-cover.webp"
                    label="Dubai Cayan Tower penthouse interior design reel by X Factor Interior Design"
                  />
                </article>
              </Reveal>
            </div>
          </section>
        </div>

        <div className="mt-20 md:mt-28">
          <FinalCta />
        </div>
      </main>
    </>
  );
}
