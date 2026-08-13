"use client";

import { useRef, useState } from "react";

export default function VideoPlayer({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  const prepareSound = () => {
    const video = videoRef.current;
    if (!video) return;
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
        ref={videoRef}
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        onLoadedMetadata={prepareSound}
        onPlay={prepareSound}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        className="h-full w-full object-contain"
      >
        <source src={src} type="video/mp4" />
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
