"use client";

import Image from "@/components/media/OptimizedImage";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { warmImage } from "@/lib/media-preload";

export type PresentationSlide = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

function stageImageSizes(slide: PresentationSlide) {
  const ratio = slide.width / slide.height;
  return ratio <= 0.62
    ? "(min-width: 768px) 448px, calc(100vw - 64px)"
    : ratio < 1
      ? "(min-width: 1024px) 672px, calc(100vw - 64px)"
      : "(min-width: 1152px) 1056px, calc(100vw - 64px)";
}

function SlideImage({ slide, priority = false, sizes, onLoad }: {
  slide: PresentationSlide;
  priority?: boolean;
  sizes: string;
  onLoad?: () => void;
}) {
  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      width={slide.width}
      height={slide.height}
      sizes={sizes}
      quality={100}
      priority={priority}
      onLoad={onLoad}
      className="h-auto max-h-full w-full object-contain"
    />
  );
}

export default function PresentationDeckViewer({ slides, ariaLabel, prioritizeCover = false }: {
  slides: readonly PresentationSlide[];
  ariaLabel: string;
  prioritizeCover?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const hasNavigated = useRef(false);
  const thumbnailRailRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useDialogFocus(isOpen);
  const activeSlide = slides[activeIndex];

  const showSlide = useCallback((index: number) => {
    hasNavigated.current = true;
    setActiveIndex((index + slides.length) % slides.length);
  }, [slides.length]);
  const previous = useCallback(() => showSlide(activeIndex - 1), [activeIndex, showSlide]);
  const next = useCallback(() => showSlide(activeIndex + 1), [activeIndex, showSlide]);

  useEffect(() => {
    const rail = thumbnailRailRef.current;
    const thumbnail = thumbnailRefs.current[activeIndex];
    if (!rail || !thumbnail) return;
    rail.scrollTo({
      left: rail.scrollLeft + thumbnail.getBoundingClientRect().left - rail.getBoundingClientRect().left - (rail.clientWidth - thumbnail.clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) event.preventDefault();
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key === "Home") showSlide(0);
      if (event.key === "End") showSlide(slides.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, next, previous, showSlide, slides.length]);

  if (!activeSlide || slides.length === 0) return null;

  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  const activeAspectRatio = activeSlide.width / activeSlide.height;
  const stageMaxWidth = activeAspectRatio <= 0.62
    ? "28rem"
    : activeAspectRatio < 1
      ? "42rem"
      : undefined;
  const stageSizes = stageImageSizes(activeSlide);
  const modalWidth = `min(94vw, ${(88 * activeAspectRatio).toFixed(2)}vh, 1600px)`;
  const warmSlide = (index: number) => {
    const slide = slides[(index + slides.length) % slides.length];
    warmImage(slide.src, isOpen ? "94vw" : stageImageSizes(slide));
  };
  const warmNext = () => {
    if (hasNavigated.current || isOpen) warmSlide(activeIndex + 1);
  };

  return (
    <>
      <section
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(event) => {
          if (isOpen) return;
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) event.preventDefault();
          if (event.key === "ArrowLeft") previous();
          if (event.key === "ArrowRight") next();
          if (event.key === "Home") showSlide(0);
          if (event.key === "End") showSlide(slides.length - 1);
        }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_30px_90px_rgba(0,0,0,0.28)] outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white/55 sm:px-5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#665177]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <p className="max-w-[55%] truncate font-display text-[0.62rem] uppercase tracking-[0.2em] sm:text-xs">{ariaLabel}</p>
          <span className="font-mono text-[0.65rem] tabular-nums sm:text-xs">{counter}</span>
        </div>

        <div className="bg-black p-2 sm:p-4 lg:p-6">
          <div className="relative mx-auto w-full" style={{ maxWidth: stageMaxWidth }}>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              onPointerEnter={() => warmImage(activeSlide.src, "94vw")}
              onFocus={() => warmImage(activeSlide.src, "94vw")}
              aria-label={`Open slide ${activeIndex + 1} in full-screen view: ${activeSlide.title}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-[#0a0a0a] shadow-[0_18px_50px_rgba(0,0,0,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ aspectRatio: `${activeSlide.width} / ${activeSlide.height}` }}
            >
              <SlideImage slide={activeSlide} priority={hasNavigated.current || (prioritizeCover && activeIndex === 0)} sizes={stageSizes} onLoad={warmNext} />
              <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-[0.65rem] text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs">
                Full-screen view
              </span>
            </button>
            <button type="button" onClick={previous} aria-label="Show previous slide" className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 text-xl text-white backdrop-blur-sm transition hover:bg-black focus-visible:outline-2 focus-visible:outline-white sm:left-4 sm:h-12 sm:w-12">
              &#8592;
            </button>
            <button type="button" onClick={next} aria-label="Show next slide" className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 text-xl text-white backdrop-blur-sm transition hover:bg-black focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:h-12 sm:w-12">
              &#8594;
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#181818] p-3 sm:p-4">
          <div ref={thumbnailRailRef} className="flex gap-2.5 overflow-x-auto pb-1" aria-label="Choose a slide">
            {slides.map((slide, index) => {
              const thumbnailAspectRatio = slide.width / slide.height;
              const thumbnailImageWidth = thumbnailAspectRatio < 1 ? 96 : 144;
              const thumbnailWidth = thumbnailAspectRatio <= 0.62
                ? "w-16 sm:w-20"
                : thumbnailAspectRatio < 1
                  ? "w-20 sm:w-24"
                  : "w-28 sm:w-36";
              // Match the existing button's content width (minus its two 2px
              // borders), so the browser can select a sharp, DPR-aware candidate
              // instead of sizing every thumbnail from its intrinsic dimensions.
              const thumbnailSizes = thumbnailAspectRatio <= 0.62
                ? "(min-width: 640px) 76px, 60px"
                : thumbnailAspectRatio < 1
                  ? "(min-width: 640px) 92px, 76px"
                  : "(min-width: 640px) 140px, 108px";

              return (
                <button
                  key={slide.src}
                  ref={(element) => { thumbnailRefs.current[index] = element; }}
                  type="button"
                  onClick={() => showSlide(index)}
                  onPointerEnter={() => warmSlide(index)}
                  onFocus={() => warmSlide(index)}
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  aria-pressed={activeIndex === index}
                  className={`relative shrink-0 overflow-hidden rounded-md border-2 bg-black transition ${thumbnailWidth} ${activeIndex === index ? "border-[#aa8abe] opacity-100" : "border-transparent opacity-45 hover:opacity-80"}`}
                  style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    width={thumbnailImageWidth}
                    height={Math.round(thumbnailImageWidth / thumbnailAspectRatio)}
                    sizes={thumbnailSizes}
                    quality={75}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[0.58rem] text-white">{String(index + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {slides.length}: {activeSlide.title}</p>
      </section>

      {isOpen && createPortal(
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${ariaLabel}: full-screen slide view`}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-3 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}
        >
          <div
            className="relative overflow-hidden bg-black shadow-2xl"
            style={{
              aspectRatio: `${activeSlide.width} / ${activeSlide.height}`,
              width: modalWidth,
            }}
          >
            <SlideImage slide={activeSlide} priority sizes="94vw" onLoad={warmNext} />
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close full-screen presentation" className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/75 text-2xl text-white transition hover:bg-black sm:right-6 sm:top-6">
              &times;
            </button>
            <button type="button" onClick={previous} aria-label="Show previous slide" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-xl text-white transition hover:bg-black sm:left-4">
              &#8592;
            </button>
            <button type="button" onClick={next} aria-label="Show next slide" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 text-xl text-white transition hover:bg-black sm:right-4">
              &#8594;
            </button>
            <span aria-live="polite" aria-atomic="true" className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/75 px-4 py-2 font-mono text-xs text-white sm:bottom-5 sm:text-sm"><span className="sr-only">{activeSlide.title}, slide </span>{counter}</span>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
