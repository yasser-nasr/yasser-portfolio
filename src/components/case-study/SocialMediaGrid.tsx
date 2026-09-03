"use client";

import Image from "@/components/case-study/CaseStudyImage";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "@/lib/useDialogFocus";

export type SocialMediaSlide = {
  src: string;
  alt: string;
  caption: string;
};

export type SocialMediaGridItem = {
  id: string;
  preview: SocialMediaSlide;
  slides?: readonly SocialMediaSlide[];
};

const Heart = ({ filled = false }: { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-6 w-6"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
    />
  </svg>
);
const Comment = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.8 9.8 0 0 1-3.8-.8L3 21l1.7-5A8.7 8.7 0 1 1 21 11.5Z"
    />
  </svg>
);
const Send = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m22 2-7 20-4-9-9-4 20-7Z"
    />
    <path d="M22 2 11 13" />
  </svg>
);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction * 96,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction === 0 ? 0 : direction * -96,
    opacity: 0,
  }),
};

export default function SocialMediaGrid({
  brandName,
  username,
  subtitle,
  logo,
  logoAlt,
  logoBackground = "#FFFFFF",
  logoRingClassName = "from-ink-faint via-edge to-white",
  logoClassName = "object-contain p-2",
  accentColor = "#8A7A63",
  stats,
  items,
  previewAspect = "portrait",
  showProfileHeader = true,
  showEngagement = true,
  showEngagementCount = true,
}: {
  brandName: string;
  username: string;
  subtitle: string;
  logo: string;
  logoAlt: string;
  logoBackground?: string;
  logoRingClassName?: string;
  logoClassName?: string;
  accentColor?: string;
  stats?: readonly [string, string, string];
  items: readonly SocialMediaGridItem[];
  previewAspect?: "portrait" | "square";
  showProfileHeader?: boolean;
  showEngagement?: boolean;
  showEngagementCount?: boolean;
}) {
  const [activeItem, setActiveItem] = useState<SocialMediaGridItem | null>(
    null,
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [liked, setLiked] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useDialogFocus(Boolean(activeItem));
  const activeSlides = activeItem?.slides?.length
    ? activeItem.slides
    : activeItem
      ? [activeItem.preview]
      : [];
  const activeSlide = activeSlides[activeSlideIndex];

  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveItem(null);
      if (event.key === "ArrowLeft") {
        setSlideDirection(-1);
        setActiveSlideIndex(
          (index) => (index - 1 + activeSlides.length) % activeSlides.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSlideDirection(1);
        setActiveSlideIndex((index) => (index + 1) % activeSlides.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, activeSlides.length]);

  const openItem = (item: SocialMediaGridItem) => {
    setActiveSlideIndex(0);
    setSlideDirection(0);
    setLiked(false);
    setActiveItem(item);
  };

  const previousSlide = () => {
    setSlideDirection(-1);
    setActiveSlideIndex(
      (index) => (index - 1 + activeSlides.length) % activeSlides.length,
    );
  };
  const nextSlide = () => {
    setSlideDirection(1);
    setActiveSlideIndex((index) => (index + 1) % activeSlides.length);
  };

  const handleSwipe = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -500) nextSlide();
    if (info.offset.x > 50 || info.velocity.x > 500) previousSlide();
  };

  return (
    <>
      <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-edge bg-surface-card/45 shadow-2xl shadow-black/10">
        {showProfileHeader ? (
          <div className="flex items-center gap-4 border-b border-edge px-5 py-5 sm:px-8">
            <div
              className={`rounded-full bg-gradient-to-tr p-[2px] ${logoRingClassName}`}
            >
              <div
                className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-surface"
                style={{ backgroundColor: logoBackground }}
              >
                <Image
                  src={logo}
                  alt={logoAlt}
                  fill
                  sizes="56px"
                  className={logoClassName}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-ink sm:text-lg">
                {username} <span style={{ color: accentColor }}>●</span>
              </h3>
              <p className="text-sm leading-6 text-ink-soft">{subtitle}</p>
            </div>
            <span
              className="hidden rounded-lg px-5 py-2 text-sm font-semibold text-white sm:inline-flex"
              style={{ backgroundColor: accentColor }}
            >
              Follow
            </span>
          </div>
        ) : null}

        {stats ? (
          <div className="grid grid-cols-3 border-b border-edge py-4 text-center text-sm text-ink-soft">
            <p>
              <strong className="block text-base text-ink">{stats[0]}</strong>{" "}
              posts
            </p>
            <p>
              <strong className="block text-base text-ink">{stats[1]}</strong>{" "}
              followers
            </p>
            <p>
              <strong className="block text-base text-ink">{stats[2]}</strong>{" "}
              following
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-[2px] bg-edge sm:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(item)}
              aria-label={`Open design: ${item.preview.alt}`}
              className={`group relative cursor-zoom-in overflow-hidden bg-surface focus-visible:z-10 ${previewAspect === "square" ? "aspect-square" : "aspect-[3/4]"}`}
            >
              <Image
                src={item.preview.src}
                alt={item.preview.alt}
                fill
                sizes="(min-width: 768px) 24vw, 50vw"
                className="object-cover transition duration-300 group-hover:brightness-75"
              />
              {item.slides && item.slides.length > 1 ? (
                <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium text-white">
                  {item.slides.length} slides
                </span>
              ) : null}
              <span className="absolute inset-0 grid place-items-center bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
                View design
              </span>
            </button>
          ))}
        </div>
        <p className="px-5 py-4 text-center text-sm text-ink-soft">
          Select any post to explore the visual.
        </p>
      </div>

      {activeItem &&
        activeSlide &&
        createPortal(
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${brandName} social media design`}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) =>
              event.target === event.currentTarget && setActiveItem(null)
            }
          >
            <div className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-surface shadow-2xl md:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close design"
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/65 text-2xl text-white hover:bg-black/85"
              >
                ×
              </button>
              <div
                className={`relative overflow-hidden bg-black ${
                  previewAspect === "square"
                    ? "aspect-square min-h-0"
                    : "min-h-[55vh] md:min-h-[82vh]"
                }`}
              >
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div
                    key={activeSlide.src}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    drag={
                      activeSlides.length > 1 && !prefersReducedMotion
                        ? "x"
                        : false
                    }
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    dragMomentum={false}
                    onDragEnd={handleSwipe}
                    className={`absolute inset-0 touch-pan-y ${
                      activeSlides.length > 1 ? "cursor-grab active:cursor-grabbing" : ""
                    }`}
                  >
                    <Image
                      src={activeSlide.src}
                      alt={activeSlide.alt}
                      fill
                      sizes="(min-width: 768px) 65vw, 100vw"
                      priority
                      draggable={false}
                      className="select-none object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                {activeSlides.length > 1 ? (
                  <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={previousSlide}
                      aria-label="Show previous slide"
                      className="grid h-10 w-10 place-items-center rounded-full bg-black/65 text-xl text-white hover:bg-black/85"
                    >
                      ←
                    </button>
                    <span className="rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white">
                      {activeSlideIndex + 1} / {activeSlides.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Show next slide"
                      className="grid h-10 w-10 place-items-center rounded-full bg-black/65 text-xl text-white hover:bg-black/85"
                    >
                      →
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="flex min-h-0 flex-col">
                <div className="flex items-center gap-3 border-b border-edge p-4">
                  <div
                    className="relative h-10 w-10 overflow-hidden rounded-full border border-edge"
                    style={{ backgroundColor: logoBackground }}
                  >
                    <Image
                      src={logo}
                      alt=""
                      fill
                      sizes="40px"
                  className={logoClassName}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {username} <span style={{ color: accentColor }}>●</span>
                    </p>
                    <p className="text-xs text-ink-soft">{subtitle}</p>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <p className="text-sm leading-6 text-ink-soft">
                    <strong className="mr-2 text-ink">{username}</strong>
                    {activeSlide.caption}
                  </p>
                </div>
                {showEngagement ? (
                <div className="border-t border-edge p-4">
                  <div className="flex items-center gap-4 text-ink">
                    <button
                      type="button"
                      onClick={() => setLiked(!liked)}
                      aria-label={liked ? "Unlike post" : "Like post"}
                      aria-pressed={liked}
                      className={liked ? "text-red-500" : "hover:text-ink-soft"}
                    >
                      <Heart filled={liked} />
                    </button>
                    <span aria-hidden="true">
                      <Comment />
                    </span>
                    <span aria-hidden="true">
                      <Send />
                    </span>
                  </div>
                  {showEngagementCount ? (
                    <p className="mt-3 text-sm font-semibold text-ink">
                      {liked ? "1,249" : "1,248"} likes
                    </p>
                  ) : null}
                  <p
                    className={`${showEngagementCount ? "mt-1" : "mt-3"} text-[11px] uppercase tracking-wide text-ink-faint`}
                  >
                    View the visual system
                  </p>
                </div>
                ) : null}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
