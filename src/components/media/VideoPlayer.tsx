"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { optimizedMediaSrc } from "@/lib/optimized-media";
import { canWarmMedia } from "@/lib/media-preload";

let warmingVideo: HTMLVideoElement | undefined;

export default function VideoPlayer({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const metadataStartedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const warmMetadata = useCallback((intent = false) => {
    const video = videoRef.current;
    if (!video || !canWarmMedia() || metadataStartedRef.current || video.readyState > 0 || !video.paused) return;
    if (!intent && warmingVideo && warmingVideo !== video) return;
    warmingVideo = video;
    metadataStartedRef.current = true;
    video.preload = "metadata";
    video.load();
  }, []);

  useEffect(() => {
    metadataStartedRef.current = false;
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window) || !canWarmMedia()) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.intersectionRatio >= 0.5) {
        timer = setTimeout(() => {
          if (document.visibilityState === "visible") warmMetadata();
        }, 800);
      }
    }, { threshold: [0, 0.5] });
    observer.observe(video);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (warmingVideo === video) warmingVideo = undefined;
    };
  }, [src, warmMetadata]);

  const prepareSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (warmingVideo === video) warmingVideo = undefined;
    video.muted = false;
    video.volume = 1;
    setMuted(false);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 1;
    setMuted(nextMuted);
  };

  return (
    <div className="relative h-full w-full">
      <video
        {...{ loading: "lazy" }}
        ref={videoRef}
        controls
        playsInline
        preload="none"
        poster={optimizedMediaSrc(poster)}
        onPointerEnter={() => warmMetadata(true)}
        onFocus={() => warmMetadata(true)}
        onPointerDown={() => warmMetadata(true)}
        onError={() => {
          metadataStartedRef.current = false;
          if (warmingVideo === videoRef.current) warmingVideo = undefined;
        }}
        aria-label={label}
        onLoadedMetadata={prepareSound}
        onPlay={prepareSound}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        className="h-full w-full object-contain"
      >
        <source src={optimizedMediaSrc(src)} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-3 top-3 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/90"
        aria-label={muted ? "Turn video sound on" : "Turn video sound off"}
      >
        {muted ? "Sound off" : "Sound on"}
      </button>
    </div>
  );
}
