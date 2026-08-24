"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

const webMediaBase = "/projects/pillars-pr/social-media/web";
const postPanels = [
  [
    "pillars-pr-facebook-professional-website-campaign-01.webp",
    "Pillars PR Facebook campaign panel explaining why lawyers need a professional website.",
  ],
  [
    "pillars-pr-facebook-professional-website-campaign-02.webp",
    "Pillars PR Facebook campaign panel about professional legal website credibility.",
  ],
  [
    "pillars-pr-facebook-professional-website-campaign-03.webp",
    "Pillars PR Facebook campaign panel promoting websites for lawyers and law firms.",
  ],
  [
    "pillars-pr-facebook-professional-website-campaign-04.webp",
    "Closing panel from the Pillars PR professional website Facebook campaign.",
  ],
] as const;

export default function PillarsFacebookPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useDialogFocus(activeIndex !== null);
  const activePanel = activeIndex === null ? null : postPanels[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft")
        setActiveIndex((index) =>
          index === null
            ? null
            : (index - 1 + postPanels.length) % postPanels.length,
        );
      if (event.key === "ArrowRight")
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % postPanels.length,
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const previousPanel = () =>
    setActiveIndex((index) =>
      index === null
        ? null
        : (index - 1 + postPanels.length) % postPanels.length,
    );
  const nextPanel = () =>
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % postPanels.length,
    );

  return (
    <>
      <div className="mt-16 overflow-hidden rounded-[1.5rem] border border-edge bg-surface-deep text-ink shadow-2xl shadow-black/10 transition-colors">
        <div className="relative aspect-[2553/1080] bg-surface-card">
          <Image
            src={`${webMediaBase}/facebook/pillars-pr-building-legal-excellence-brand-cover.webp`}
            alt="Pillars PR Facebook page cover featuring the Building Legal Excellence message and blue classical columns."
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="border-b border-edge bg-surface-card px-5 pb-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-5">
              <div className="relative -mt-12 h-32 w-32 shrink-0 overflow-hidden rounded-full bg-white sm:-mt-20 sm:h-40 sm:w-40">
                <Image
                  src={`${webMediaBase}/facebook/pillars-pr-social-media-profile-picture.webp`}
                  alt="Pillars PR profile picture featuring the centered PPR monogram and full brand name."
                  fill
                  sizes="160px"
                  className="scale-[0.88] object-cover"
                />
              </div>
              <div className="pb-2">
                <h3 className="text-2xl font-bold text-ink sm:text-3xl">
                  Pillars PR
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Legal marketing &amp; public relations · Abu Dhabi
                </p>
              </div>
            </div>
            <div className="flex gap-2 pb-2">
              <span className="rounded-md bg-[#0866ff] px-4 py-2 text-sm font-semibold text-white">
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
            <span className="text-[#3485ff]">Posts</span>
            <span>About</span>
            <span>Photos</span>
            <span>Videos</span>
          </nav>
        </div>
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)]">
          <aside className="space-y-4">
            <div className="rounded-xl bg-surface-card p-5 shadow-sm">
              <h4 className="text-xl font-bold text-ink">Intro</h4>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Specialist marketing and public relations communication for
                lawyers, law firms, and legal organizations across the MENA
                region.
              </p>
              <dl className="mt-4 space-y-2 text-sm text-ink-soft">
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd>Abu Dhabi, UAE</dd>
                </div>
                <div>
                  <dt className="sr-only">Region</dt>
                  <dd>UAE · Saudi Arabia · MENA</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl bg-surface-card p-5 shadow-sm">
              <h4 className="text-xl font-bold text-ink">Brand application</h4>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                The cover, profile image, page chrome, and campaign post work
                together as one recognizable Facebook presence.
              </p>
            </div>
          </aside>
          <article className="overflow-hidden rounded-xl bg-surface-card shadow-sm">
            <header className="flex items-center gap-3 p-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                <Image
                  src={`${webMediaBase}/facebook/pillars-pr-social-media-profile-picture.webp`}
                  alt=""
                  fill
                  sizes="48px"
                  className="scale-[0.82] object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-ink">Pillars PR</p>
                <p className="text-xs text-ink-soft">
                  Professional website campaign
                </p>
              </div>
            </header>
            <p className="px-4 pb-4 text-sm leading-6 text-ink">
              A connected Facebook grid showing why a professional website
              matters for lawyers, law firms, and legal organizations.
            </p>
            <div className="grid grid-cols-2 gap-[2px] bg-edge">
              {postPanels.map(([src, alt], index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open image: ${alt}`}
                  className="group relative aspect-square cursor-zoom-in overflow-hidden bg-surface-card focus-visible:z-10"
                >
                  <Image
                    src={`${webMediaBase}/facebook-posts/${src}`}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
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
        </div>
      </div>

      {activePanel && activeIndex !== null
        ? createPortal(
            <div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Pillars PR Facebook campaign image"
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
                    src={`${webMediaBase}/facebook-posts/${activePanel[0]}`}
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
                      aria-label="Show previous Facebook campaign image"
                      className="grid h-11 w-11 place-items-center rounded-full bg-black/70 text-xl text-white hover:bg-black/90"
                    >
                      ←
                    </button>
                    <span className="rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white">
                      {activeIndex + 1} / {postPanels.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextPanel}
                      aria-label="Show next Facebook campaign image"
                      className="grid h-11 w-11 place-items-center rounded-full bg-black/70 text-xl text-white hover:bg-black/90"
                    >
                      →
                    </button>
                  </div>
                </div>
                <p className="p-4 text-sm leading-6 text-ink-soft">
                  {activePanel[1]}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
