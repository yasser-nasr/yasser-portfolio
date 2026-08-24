"use client";

import Image from "@/components/case-study/CaseStudyImage";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

export default function ZoomableCaseStudyImage({ src, alt, label, width, height, className = "" }: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useDialogFocus(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <figure className={`min-w-0 ${className}`} style={{ paddingTop: "4rem" }}>
        <figcaption
          className="text-xs uppercase tracking-[0.14em] text-ink-faint"
          style={{ display: "block", marginBottom: "1rem" }}
        >
          {label}
        </figcaption>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Open high-resolution view: ${label}`}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-[#0b2014] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
            className="block h-auto w-full"
          />
          <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            View details
          </span>
        </button>
      </figure>

      {isOpen && createPortal(
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} high-resolution view`}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close enlarged image"
            className="fixed right-4 top-4 z-[110] grid h-11 w-11 place-items-center rounded-full bg-black/80 text-2xl text-white transition hover:bg-black sm:right-6 sm:top-6"
          >
            ×
          </button>
          <div
            className="mx-auto flex max-h-[calc(100vh-3rem)] max-w-[calc(100vw-3rem)] items-center justify-center"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              style={{
                display: "block",
                width: "auto",
                height: "auto",
                maxWidth: "calc(100vw - 3rem)",
                maxHeight: "calc(100vh - 3rem)",
                objectFit: "contain",
              }}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
