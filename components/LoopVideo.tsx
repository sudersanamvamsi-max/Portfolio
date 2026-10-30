"use client";

import { useEffect, useRef } from "react";

// Muted looping clip played at `speed`. With prefers-reduced-motion it stays paused on the
// poster and shows native controls instead of autoplaying.
export default function LoopVideo({
  src,
  poster,
  label,
  speed = 2,
}: {
  src: string;
  poster?: string;
  label: string;
  speed?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = speed;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true;
      return;
    }
    v.play().catch(() => {});
  }, [speed]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className="size-full object-cover"
    />
  );
}
