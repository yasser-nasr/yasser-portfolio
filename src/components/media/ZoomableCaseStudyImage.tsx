"use client";

import Image from "@/components/media/OptimizedImage";
import ViewportImage from "@/components/media/ViewportImage";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { optimizedMediaSrc } from "@/lib/optimized-media";
import { warmImage, warmOriginalImage } from "@/lib/media-preload";

export default function ZoomableCaseStudyImage({
  src,
  alt,
  label,
  width,
  height,
  className = "",
  compact = false,
  priority = false,
  viewportOnly = false,
  preloadDistance = 600,
  responsiveLightbox = false,
  showLabel = true,
  frameRadiusClassName = "rounded-xl",
  sizes = "(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  className?: string;
  compact?: boolean;
  priority?: boolean;
  viewportOnly?: boolean;
  preloadDistance?: number;
  responsiveLightbox?: boolean;
  showLabel?: boolean;
  frameRadiusClassName?: string;
  sizes?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useDialogFocus(isOpen);
  const PreviewImage = viewportOnly && !priority ? ViewportImage : Image;
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lightboxSizes = `min(${width}px, calc(100vw - 3rem), calc((100vh - 3rem) * ${width / height}))`;
  const lightboxStyle: CSSProperties = {
    display: "block",
    width: responsiveLightbox ? lightboxSizes : "auto",
    height: "auto",
    aspectRatio: responsiveLightbox ? `${width} / ${height}` : undefined,
    maxWidth: "calc(100vw - 3rem)",
    maxHeight: "calc(100vh - 3rem)",
    objectFit: "contain",
  };
  const warmLightbox = () => {
    if (responsiveLightbox) warmImage(src, lightboxSizes, 100, "high");
    else warmOriginalImage(src);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

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
      <figure className={`min-w-0 ${className}`} style={compact ? undefined : { paddingTop: "4rem" }}>
        {!compact && showLabel ? (
          <figcaption
            className="text-xs uppercase tracking-[0.14em] text-ink-faint"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            {label}
          </figcaption>
        ) : null}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          onPointerEnter={() => {
            clearTimeout(hoverTimer.current);
            if (responsiveLightbox) hoverTimer.current = setTimeout(warmLightbox, 180);
            else warmLightbox();
          }}
          onPointerLeave={() => clearTimeout(hoverTimer.current)}
          onPointerDown={responsiveLightbox ? warmLightbox : undefined}
          onFocus={warmLightbox}
          aria-label={`Open high-resolution view: ${label}`}
          className={`group relative block w-full cursor-zoom-in overflow-hidden ${frameRadiusClassName} border text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${
            compact ? "border-edge bg-surface-card" : "border-white/10 bg-[#0b2014]"
          }`}
        >
          <PreviewImage
            {...(viewportOnly && !priority ? { preloadDistance } : {})}
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={100}
            priority={priority}
            sizes={sizes}
            className="block h-auto w-full"
          />
          <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            View details
          </span>
        </button>
        {compact && showLabel ? (
          <figcaption className="mt-3 text-sm leading-6 text-ink-faint">
            {label}
          </figcaption>
        ) : null}
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
            {responsiveLightbox ? <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              quality={100}
              sizes={lightboxSizes}
              loading="eager"
              fetchPriority="high"
              style={lightboxStyle}
              className="rounded-xl shadow-2xl"
            /> : (
            // Existing original-file viewers retain their source and behaviour.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={optimizedMediaSrc(src)}
              alt={alt}
              width={width}
              height={height}
              style={lightboxStyle}
              className="rounded-xl shadow-2xl"
            />)}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
