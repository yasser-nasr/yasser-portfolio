"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

type Slide = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export default function PrintDocumentSlides({ slides, ariaLabel, spread = false, compact = false }: {
  slides: readonly Slide[];
  ariaLabel: string;
  spread?: boolean;
  compact?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const frames: readonly (readonly Slide[])[] = spread
    ? [
        slides.slice(0, 1),
        ...Array.from(
          { length: Math.ceil(Math.max(slides.length - 1, 0) / 2) },
          (_, index) => slides.slice(index * 2 + 1, index * 2 + 3),
        ),
      ]
    : slides.map((slide) => [slide]);
  const frameCount = frames.length;
  const activeSlides = frames[activeIndex];
  const displaySlides = spread && activeSlides?.length === 2
    ? [...activeSlides].reverse()
    : activeSlides;
  const dialogRef = useDialogFocus(isOpen);

  const previous = useCallback(() => {
    setActiveIndex((index) => (index - 1 + frameCount) % frameCount);
  }, [frameCount]);
  const next = useCallback(() => {
    setActiveIndex((index) => (index + 1) % frameCount);
  }, [frameCount]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, next, previous]);

  if (!activeSlides?.length || !displaySlides?.length) return null;

  const firstPageIndex = slides.indexOf(activeSlides[0]);
  const lastPageIndex = firstPageIndex + activeSlides.length - 1;
  const pageLabel = activeSlides.length === 1
    ? `${firstPageIndex + 1} / ${slides.length}`
    : `${firstPageIndex + 1}–${lastPageIndex + 1} / ${slides.length}`;
  const activeLabel = activeSlides.map((slide) => slide.label).join(" and ");

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") previous();
          if (event.key === "ArrowRight") next();
        }}
        className={`relative mx-auto py-3 outline-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-ink sm:py-6 ${compact ? "max-w-4xl" : ""}`}
      >
        <div aria-hidden="true" className="absolute inset-x-[8%] bottom-0 h-10 rounded-[50%] bg-black/25 blur-2xl" />
        <div className="relative overflow-hidden rounded-xl border-[6px] border-[#262522] bg-[#262522] shadow-[0_24px_55px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.2)] [transform:rotateX(1deg)] sm:border-[10px]">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Open high-resolution view: ${activeLabel}`}
            className="group relative block w-full cursor-zoom-in overflow-hidden bg-[#e8e8ea] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          >
            <span className={`mx-auto grid ${activeSlides.length === 2 ? "grid-cols-2" : "grid-cols-1"} ${spread && activeSlides.length === 1 ? "max-w-[50%]" : ""}`}>
              {displaySlides.map((slide) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  sizes={spread ? "(min-width: 1024px) 384px, 45vw" : "(min-width: 1152px) 1104px, calc(100vw - 48px)"}
                  className="h-auto w-full"
                />
              ))}
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
              {pageLabel}
            </span>
          </button>

          <div className="flex items-center justify-between border-t border-white/10 bg-[#262522] px-3 py-2 text-white sm:px-4">
            <button type="button" onClick={previous} aria-label="Show previous document slide" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
              &#8592;
            </button>
            <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 py-2" aria-label="Choose a document slide">
              {frames.map((frame, index) => (
                <button
                  key={frame.map((slide) => slide.src).join("|")}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show document ${spread ? "spread" : "slide"} ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  className={`h-1.5 shrink-0 rounded-full transition-all ${activeIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <button type="button" onClick={next} aria-label="Show next document slide" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
              &#8594;
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="mx-auto h-2 w-[92%] rounded-b-lg bg-gradient-to-b from-[#8d8980] to-[#514e49] shadow-lg" />
        <p className="sr-only" aria-live="polite">{spread ? "Spread" : "Slide"} {activeIndex + 1} of {frameCount}, pages {pageLabel}</p>
      </div>

      {isOpen && createPortal(
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}
        >
          <div className="relative flex max-h-[94vh] w-full max-w-7xl items-center justify-center">
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close document presentation" className="fixed right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/75 text-2xl text-white transition hover:bg-black sm:right-6 sm:top-6">
              &times;
            </button>
            <div className={`relative overflow-hidden rounded-xl bg-black shadow-2xl ${spread ? "w-auto max-w-5xl" : "w-full"}`}>
              <div className={`mx-auto grid ${activeSlides.length === 2 ? "grid-cols-2" : "grid-cols-1"} ${spread && activeSlides.length === 1 ? "max-w-[44vh]" : ""}`}>
                {displaySlides.map((slide) => (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    sizes={spread ? "48vw" : "96vw"}
                    className="h-auto max-h-[88vh] w-full object-contain"
                    priority
                  />
                ))}
              </div>
              <button type="button" onClick={previous} aria-label="Show previous document slide" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-xl text-white transition hover:bg-black">
                &#8592;
              </button>
              <button type="button" onClick={next} aria-label="Show next document slide" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-xl text-white transition hover:bg-black">
                &#8594;
              </button>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-sm font-medium text-white">
                {pageLabel}
              </span>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
