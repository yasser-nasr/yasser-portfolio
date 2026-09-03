"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

const base = "/projects/mena-law-reporters";
const gridBase = `${base}/social-media/facebook-grid-post`;

type FacebookPanel = readonly [src: string, alt: string];

type FacebookCampaign = {
  title: string;
  description: string;
  panels: readonly FacebookPanel[];
};

const campaigns: readonly FacebookCampaign[] = [
  {
    title: "Leading Universities for Legal Study",
    description:
      "A connected Facebook grid introducing universities associated with legal education across several international markets.",
    panels: [
      [
        "mena-law-reporters-best-law-universities-grid-01.webp",
        "Opening tile of a MENA Law Reporters Facebook grid about leading universities for studying law.",
      ],
      [
        "mena-law-reporters-best-law-universities-grid-02.webp",
        "MENA Law Reporters university guide featuring Yale, Harvard, and Oxford.",
      ],
      [
        "mena-law-reporters-best-law-universities-grid-03.webp",
        "MENA Law Reporters university guide featuring Stanford, Cambridge, and the London School of Economics.",
      ],
      [
        "mena-law-reporters-best-law-universities-grid-04.webp",
        "MENA Law Reporters university guide featuring New York University, Columbia, National University of Singapore, and Berkeley.",
      ],
    ],
  },
  {
    title: "Tips for New Lawyers",
    description:
      "A four-part professional-development grid covering preparation, continuous learning, and communication.",
    panels: [
      [
        "mena-law-reporters-new-lawyer-tips-grid-01.webp",
        "Opening tile of a MENA Law Reporters Facebook grid presenting tips for new lawyers.",
      ],
      [
        "mena-law-reporters-new-lawyer-tips-grid-02.webp",
        "MENA Law Reporters tip encouraging new lawyers to be prepared to work hard.",
      ],
      [
        "mena-law-reporters-new-lawyer-tips-grid-03.webp",
        "MENA Law Reporters tip encouraging continuous learning for new lawyers.",
      ],
      [
        "mena-law-reporters-new-lawyer-tips-grid-04.webp",
        "MENA Law Reporters tip about effective communication with clients, courts, and colleagues.",
      ],
    ],
  },
] as const;

const panels: readonly FacebookPanel[] = campaigns.flatMap(
  (campaign) => campaign.panels,
);

export default function MenaLawReportersFacebookPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useDialogFocus(activeIndex !== null);
  const activePanel = activeIndex === null ? null : panels[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + panels.length) % panels.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % panels.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const previousPanel = () =>
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + panels.length) % panels.length,
    );
  const nextPanel = () =>
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % panels.length,
    );

  return (
    <>
      <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-edge bg-surface-deep text-ink shadow-2xl shadow-black/10 md:mt-16">
        <div className="relative aspect-[2553/1080] bg-[#e8e6e3]">
          <Image
            src={`${base}/mena-law-reporters-facebook-cover.webp`}
            alt="Facebook cover design for MENA Law Reporters featuring legal publications, a red doorway, and scales of justice."
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="border-b border-edge bg-surface-card px-5 pb-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-5">
              <div className="relative -mt-12 h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-surface-card bg-white shadow-lg sm:-mt-20 sm:h-40 sm:w-40">
                <Image
                  src={`${base}/mena-law-reporters-facebook-profile.webp`}
                  alt="Facebook profile design for MENA Law Reporters featuring its globe, scales, and wordmark."
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="pb-2">
                <h3 className="text-2xl font-bold text-ink sm:text-3xl">
                  MENA Law Reporters
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Legal media &amp; education · Middle East &amp; North Africa
                </p>
              </div>
            </div>
            <div className="flex gap-2 pb-2">
              <span className="rounded-md bg-[#be1e2d] px-4 py-2 text-sm font-semibold text-white">
                Follow
              </span>
              <span className="rounded-md bg-surface-deep px-4 py-2 text-sm font-semibold text-ink">
                Message
              </span>
            </div>
          </div>
          <nav
            aria-label="Facebook page preview navigation"
            className="mt-5 flex gap-5 border-t border-edge pt-3 text-sm font-semibold text-ink-soft"
          >
            <span className="text-[#be1e2d]">Posts</span>
            <span>About</span>
            <span>Photos</span>
            <span>Videos</span>
          </nav>
        </div>

        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(15rem,0.64fr)_minmax(0,1.36fr)]">
          <aside className="space-y-4">
            <div className="rounded-xl bg-surface-card p-5 shadow-sm">
              <h4 className="text-xl font-bold text-ink">Intro</h4>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Legal news, educational content, professional development, and
                opportunities for legal audiences across the MENA region.
              </p>
              <p className="mt-4 text-sm text-ink-soft">Abu Dhabi, UAE</p>
            </div>
            <div className="rounded-xl bg-surface-card p-5 shadow-sm">
              <h4 className="text-xl font-bold text-ink">Connected grids</h4>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Each four-tile set is shown in its intended Facebook context,
                where the individual posts combine into one connected visual.
              </p>
            </div>
          </aside>

          <div className="space-y-5">
            {campaigns.map((campaign, campaignIndex) => {
              const campaignStartIndex = campaigns
                .slice(0, campaignIndex)
                .reduce((total, item) => total + item.panels.length, 0);

              return (
                <article key={campaign.title} className="overflow-hidden rounded-xl bg-surface-card shadow-sm">
                  <header className="flex items-center gap-3 p-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                      <Image
                        src={`${base}/mena-law-reporters-facebook-profile.webp`}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">MENA Law Reporters</p>
                      <p className="text-xs text-ink-soft">{campaign.title}</p>
                    </div>
                  </header>
                  <p className="px-4 pb-4 text-sm leading-6 text-ink">
                    {campaign.description}
                  </p>
                  <div className="grid grid-cols-2 gap-[2px] bg-edge">
                    {campaign.panels.map(([src, alt], index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveIndex(campaignStartIndex + index)}
                        aria-label={`Open image: ${alt}`}
                        className="group relative aspect-square cursor-zoom-in overflow-hidden bg-surface-card focus-visible:z-10"
                      >
                        <Image
                          src={`${gridBase}/${src}`}
                          alt={alt}
                          fill
                          sizes="(min-width: 1024px) 24vw, 50vw"
                          className="object-cover transition duration-300 group-hover:brightness-90"
                        />
                        <span className="absolute inset-0 grid place-items-center bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
                          View image
                        </span>
                      </button>
                    ))}
                  </div>
                  <footer className="flex items-center justify-around border-t border-edge px-4 py-3 text-sm font-semibold text-ink-soft">
                    <span>Like</span>
                    <span>Comment</span>
                    <span>Share</span>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {activePanel && activeIndex !== null
        ? createPortal(
            <div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="MENA Law Reporters Facebook grid image"
              className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
              onMouseDown={(event) =>
                event.target === event.currentTarget && setActiveIndex(null)
              }
            >
              <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-surface-card text-ink shadow-2xl">
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close image"
                  className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-2xl text-white hover:bg-black/90"
                >
                  ×
                </button>
                <div className="relative min-h-[60vh] flex-1 bg-black sm:min-h-[80vh]">
                  <Image
                    key={activePanel[0]}
                    src={`${gridBase}/${activePanel[0]}`}
                    alt={activePanel[1]}
                    fill
                    sizes="96vw"
                    priority
                    className="object-contain"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={previousPanel}
                      aria-label="Show previous Facebook grid image"
                      className="grid h-11 w-11 place-items-center rounded-full bg-black/70 text-xl text-white hover:bg-black/90"
                    >
                      ←
                    </button>
                    <span className="rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white">
                      {activeIndex + 1} / {panels.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextPanel}
                      aria-label="Show next Facebook grid image"
                      className="grid h-11 w-11 place-items-center rounded-full bg-black/70 text-xl text-white hover:bg-black/90"
                    >
                      →
                    </button>
                  </div>
                </div>
                <p className="p-4 text-sm leading-6 text-ink-soft">{activePanel[1]}</p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
