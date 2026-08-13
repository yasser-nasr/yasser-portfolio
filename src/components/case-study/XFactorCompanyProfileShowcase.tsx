"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

const base = "/projects/x-factor-interior-design/company-profile";
const pageWidth = 596;
const pageHeight = 842;

const profilePages = [
  { filename: "x-factor-interior-design-company-profile-cover.webp", alt: "X Factor Interior Design company profile cover for a luxury interior design studio in Dubai" },
  { filename: "x-factor-interior-design-company-profile-interior-depth.webp", alt: "X Factor Interior Design company profile editorial page about interior depth and refined precision" },
  { filename: "x-factor-interior-design-company-profile-brand-dna.webp", alt: "X Factor Interior Design company profile Brand DNA page combining art, nature, and architecture" },
  { filename: "x-factor-interior-design-company-profile-core-values.webp", alt: "X Factor Interior Design company profile core values page covering design integrity and turnkey reliability" },
  { filename: "x-factor-interior-design-company-profile-design-process.webp", alt: "X Factor Interior Design company profile process page from discovery and strategy to execution and handover" },
] as const;

const spreads = [
  [profilePages[1], profilePages[2]],
  [profilePages[3], profilePages[4]],
] as const;

export default function XFactorCompanyProfileShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePage = activeIndex === null ? null : profilePages[activeIndex];
  const dialogRef = useDialogFocus(activeIndex !== null);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + profilePages.length) % profilePages.length);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % profilePages.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const openPage = (filename: string) => setActiveIndex(profilePages.findIndex((page) => page.filename === filename));

  return <>
    <div className="space-y-8 sm:space-y-12">
      <div className="relative mx-auto max-w-sm px-8 py-7 [perspective:1200px] sm:px-12 sm:py-10">
        <div aria-hidden="true" className="absolute inset-x-[12%] bottom-3 h-8 rounded-[50%] bg-black/25 blur-xl" />
        <button type="button" onClick={() => setActiveIndex(0)} aria-label="Open X Factor Interior Design company profile cover" className="group relative block w-full origin-left cursor-zoom-in bg-[#ece9e1] p-[2px] shadow-[10px_14px_28px_rgba(0,0,0,0.28),3px_0_0_#d2cec4,6px_0_0_#bdb8ac] transition duration-500 [transform:rotateY(-7deg)_rotateX(2deg)] hover:[transform:rotateY(-2deg)_rotateX(0deg)_translateY(-4px)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
          <Image src={`${base}/${profilePages[0].filename}`} alt={profilePages[0].alt} width={pageWidth} height={pageHeight} sizes="(min-width: 640px) 320px, 68vw" className="h-auto w-full" />
        </button>
      </div>

      {spreads.map((spread, spreadIndex) => <div key={spread[0].filename} className="relative mx-auto max-w-4xl px-2 py-5 [perspective:1400px] sm:px-8 sm:py-8">
        <div aria-hidden="true" className="absolute inset-x-[6%] bottom-1 h-10 rounded-[50%] bg-black/25 blur-2xl" />
        <div className="relative grid grid-cols-2 bg-[#dedbd3] p-[2px] shadow-[0_20px_45px_rgba(0,0,0,0.22),0_4px_8px_rgba(0,0,0,0.12)] [transform:rotateX(2deg)]">
          {spread.map((page, pageIndex) => <button
            key={page.filename}
            type="button"
            onClick={() => openPage(page.filename)}
            aria-label={`Open company profile page ${spreadIndex * 2 + pageIndex + 2}`}
            className={`group relative block cursor-zoom-in overflow-hidden bg-[#f4f2ec] focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${pageIndex === 0 ? "origin-right [transform:rotateY(1.5deg)]" : "origin-left [transform:rotateY(-1.5deg)]"}`}
          >
            <Image src={`${base}/${page.filename}`} alt={page.alt} width={pageWidth} height={pageHeight} sizes="(min-width: 1280px) 365px, (min-width: 768px) 32vw, 47vw" className="h-auto w-full transition duration-500 group-hover:brightness-[0.97]" />
            <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 w-[10%] ${pageIndex === 0 ? "right-0 bg-gradient-to-l from-black/15 to-transparent" : "left-0 bg-gradient-to-r from-black/15 to-transparent"}`} />
          </button>)}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-black/25 shadow-[0_0_10px_3px_rgba(0,0,0,0.14)]" />
        </div>
        <div aria-hidden="true" className="mx-auto h-1.5 w-[96%] rounded-b bg-[#aaa59a] shadow-md" />
      </div>)}
    </div>

    {activePage && createPortal(<div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Company profile page enlarged view" className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && setActiveIndex(null)}>
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col items-center">
        <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close company profile page" className="absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-black">×</button>
        <div className="max-h-[90vh] overflow-auto rounded-xl bg-black/30">
          <Image src={`${base}/${activePage.filename}`} alt={activePage.alt} width={pageWidth} height={pageHeight} sizes="(min-width: 768px) 596px, 92vw" className="h-auto max-h-[90vh] w-auto max-w-full object-contain" priority />
        </div>
      </div>
    </div>, document.body)}
  </>;
}
