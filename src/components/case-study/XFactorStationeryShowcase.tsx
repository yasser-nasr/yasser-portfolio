"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

const base = "/projects/x-factor-interior-design/stationery";

const stationeryItems = [
  {
    filename: "x-factor-interior-design-business-card-mockup.webp",
    title: "Business card system",
    alt: "X Factor Interior Design business card branding mockup for a luxury interior design studio in Dubai",
    width: 4000,
    height: 3000,
  },
  {
    filename: "x-factor-interior-design-email-signature-design.webp",
    title: "Email signature",
    alt: "X Factor Interior Design branded email signature design with contact details and Dubai studio logo",
    width: 5121,
    height: 2881,
  },
  {
    filename: "x-factor-interior-design-letterhead-mockup.webp",
    title: "Letterhead design",
    alt: "X Factor Interior Design premium letterhead branding mockup for corporate correspondence in Dubai",
    width: 3000,
    height: 2250,
  },
  {
    filename: "x-factor-interior-design-envelope-front-mockup.webp",
    title: "Envelope front",
    alt: "X Factor Interior Design branded DL envelope front mockup with logo and Dubai contact details",
    width: 3000,
    height: 2250,
  },
  {
    filename: "x-factor-interior-design-envelope-pattern-back-mockup.webp",
    title: "Envelope pattern",
    alt: "X Factor Interior Design DL envelope back mockup featuring the luxury brand's flowing graphic pattern",
    width: 3000,
    height: 2250,
  },
] as const;

export default function XFactorStationeryShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : stationeryItems[activeIndex];
  const dialogRef = useDialogFocus(activeIndex !== null);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + stationeryItems.length) % stationeryItems.length);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % stationeryItems.length);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return <>
    <div className="grid gap-5 sm:grid-cols-2">
      {stationeryItems.map((item, index) => <figure key={item.filename} className={index === 0 ? "sm:col-span-2" : ""}>
        <button
          type="button"
          onClick={() => setActiveIndex(index)}
          aria-label={`Open ${item.title}`}
          className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-edge bg-surface-card/45 text-left shadow-lg shadow-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <Image
            src={`${base}/${item.filename}`}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes={index === 0 ? "(min-width: 1280px) 736px, (min-width: 768px) 64vw, 92vw" : "(min-width: 1280px) 356px, (min-width: 768px) 31vw, 92vw"}
            className="h-auto w-full"
          />
        </button>
        <figcaption className="mt-2 text-sm font-medium text-ink">{item.title}</figcaption>
      </figure>)}
    </div>

    {activeItem && createPortal(<div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.title} enlarged view`}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => event.target === event.currentTarget && setActiveIndex(null)}
    >
      <div className="relative flex max-h-[94vh] w-full max-w-7xl flex-col items-center">
        <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close stationery image" className="absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-black">×</button>
        <div className="max-h-[86vh] overflow-auto rounded-xl bg-black/30">
          <Image src={`${base}/${activeItem.filename}`} alt={activeItem.alt} width={activeItem.width} height={activeItem.height} sizes="94vw" className="h-auto max-h-[86vh] w-auto max-w-full object-contain" priority />
        </div>
        <p className="mt-3 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white">{activeItem.title} · {(activeIndex ?? 0) + 1} of {stationeryItems.length}</p>
      </div>
    </div>, document.body)}
  </>;
}
