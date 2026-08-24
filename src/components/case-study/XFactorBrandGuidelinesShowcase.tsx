"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

const base = "/projects/x-factor-interior-design";
const slides = [
  { filename: "brand-guidelines/x-factor-interior-design-brand-guidelines-cover.webp", alt: "X Factor Interior Design brand guidelines book cover featuring the primary wordmark on a warm neutral background.", width: 1920, height: 1080 },
  { filename: "brand-guidelines/x-factor-interior-design-brand-guidelines-primary-logo.webp", alt: "X Factor Interior Design brand guidelines slide presenting the primary vertical logo and clear-space rules.", width: 2880, height: 1620 },
  { filename: "brand-guidelines/x-factor-interior-design-brand-guidelines-logo-variations.webp", alt: "X Factor Interior Design brand guidelines slide showing the vertical logo, standalone icon, horizontal lockup, and wordmark variations.", width: 2880, height: 1620 },
  { filename: "brand-guidelines/x-factor-interior-design-brand-guidelines-color-palette.webp", alt: "X Factor Interior Design color-palette guidelines featuring charcoal, warm stone, soft concrete, and bronze.", width: 2880, height: 1620 },
  { filename: "brand-guidelines/x-factor-interior-design-brand-guidelines-typeface-system.webp", alt: "X Factor Interior Design typography guidelines featuring Playfair Display for editorial headlines and Montserrat for supporting text.", width: 2880, height: 1620 },
  { filename: "brand-guidelines/x-factor-interior-design-brand-guidelines-supporting-pattern.webp", alt: "X Factor Interior Design guidelines showing the supporting pattern across light, charcoal, and warm-neutral colorways.", width: 2880, height: 1620 },
] as const;

export default function XFactorBrandGuidelinesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const activeSlide = slides[activeIndex];
  const dialogRef = useDialogFocus(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % slides.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const previous = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const next = () => setActiveIndex((index) => (index + 1) % slides.length);

  return <>
    <div className="relative mx-auto py-6 [perspective:1400px] sm:py-10">
      <div aria-hidden="true" className="absolute inset-x-[8%] bottom-1 h-10 rounded-[50%] bg-black/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-lg border-[6px] border-[#262522] bg-[#262522] shadow-[0_24px_55px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.2)] [transform:rotateX(2deg)] sm:border-[10px]">
        <button type="button" onClick={() => setIsOpen(true)} aria-label={`Open brand guidelines slide ${activeIndex + 1}`} className="group relative block w-full cursor-zoom-in overflow-hidden bg-[#f3f1ec] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white">
          <Image key={activeSlide.filename} src={`${base}/${activeSlide.filename}`} alt={activeSlide.alt} width={activeSlide.width} height={activeSlide.height} sizes="(min-width: 1280px) 736px, (min-width: 768px) 64vw, 92vw" unoptimized className="h-auto w-full" />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">{activeIndex + 1} / {slides.length}</span>
        </button>
        <div className="flex items-center justify-between border-t border-white/10 bg-[#262522] px-3 py-2 text-white sm:px-4">
          <button type="button" onClick={previous} aria-label="Show previous brand guidelines slide" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10">←</button>
          <div className="flex gap-1.5" aria-label="Choose a brand guidelines slide">
            {slides.map((slide, index) => <button key={slide.filename} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show slide ${index + 1}`} aria-pressed={activeIndex === index} className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"}`} />)}
          </div>
          <button type="button" onClick={next} aria-label="Show next brand guidelines slide" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10">→</button>
        </div>
      </div>
      <div aria-hidden="true" className="mx-auto h-2 w-[92%] rounded-b-lg bg-gradient-to-b from-[#8d8980] to-[#514e49] shadow-lg" />
    </div>

    {isOpen && createPortal(<div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="X Factor Interior Design brand guidelines presentation" className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
      <div className="relative flex max-h-[94vh] w-full max-w-7xl flex-col items-center">
        <button type="button" onClick={() => setIsOpen(false)} aria-label="Close brand guidelines presentation" className="absolute right-2 top-2 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-black">×</button>
        <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          <Image key={activeSlide.filename} src={`${base}/${activeSlide.filename}`} alt={activeSlide.alt} width={activeSlide.width} height={activeSlide.height} sizes="96vw" unoptimized className="h-auto max-h-[86vh] w-full object-contain" priority />
          <button type="button" onClick={previous} aria-label="Show previous brand guidelines slide" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-xl text-white transition hover:bg-black">←</button>
          <button type="button" onClick={next} aria-label="Show next brand guidelines slide" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-xl text-white transition hover:bg-black">→</button>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-sm font-medium text-white">{activeIndex + 1} / {slides.length}</span>
        </div>
      </div>
    </div>, document.body)}
  </>;
}
