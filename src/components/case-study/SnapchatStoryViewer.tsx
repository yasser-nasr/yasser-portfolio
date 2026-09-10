"use client";

import Image from "next/image";
import { useState } from "react";

type Story = { src: string; alt: string };

export default function SnapchatStoryViewer({ stories }: { stories: readonly Story[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const previous = () => setActiveIndex((index) => Math.max(0, index - 1));
  const next = () => setActiveIndex((index) => Math.min(stories.length - 1, index + 1));

  const story = stories[activeIndex];

  return (
    <div
      className="mt-10"
      role="region"
      aria-label="Snapchat story viewer"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[23rem] overflow-hidden rounded-[1.75rem] bg-black shadow-2xl shadow-black/35 ring-1 ring-black/20">
        <Image src={story.src} alt={story.alt} fill priority sizes="(min-width: 640px) 368px, calc(100vw - 72px)" className="object-cover" />

        <div className="absolute inset-x-0 top-0 z-20 px-3 pt-3 text-white">
          <div className="flex gap-1" aria-label={`Story ${activeIndex + 1} of ${stories.length}`}>
            {stories.map((item, index) => (
              <span key={item.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/40">
                <span className={`block h-full bg-white ${index <= activeIndex ? "w-full" : "w-0"}`} />
              </span>
            ))}
          </div>
        </div>

        <button type="button" onClick={previous} disabled={activeIndex === 0} aria-label="Previous Snapchat story" className="absolute inset-y-20 left-0 z-10 w-1/3 disabled:cursor-default" />
        <button type="button" onClick={next} disabled={activeIndex === stories.length - 1} aria-label="Next Snapchat story" className="absolute inset-y-20 right-0 z-10 w-1/3 disabled:cursor-default" />

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 bg-gradient-to-t from-black/75 to-transparent px-3 pb-4 pt-16 text-white">
          <span className="flex h-11 flex-1 items-center rounded-full border border-white/80 px-4 text-sm text-white/90">Send a Chat</span>
          <button type="button" aria-label="React to story" className="grid h-11 w-11 place-items-center rounded-full bg-black/25 text-2xl">♡</button>
          <button type="button" aria-label="Share story" className="grid h-11 w-11 place-items-center rounded-full bg-black/25 text-xl">↗</button>
        </div>
      </div>
    </div>
  );
}
