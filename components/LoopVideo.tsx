"use client";

import { useEffect, useRef } from "react";

// Clips shorter than this play at 2x; longer ones at 1x unless `speed` is given.
const FAST_BELOW_S = 20;

// Muted looping clip. With prefers-reduced-motion it stays paused on the first frame/poster
// and shows native controls instead of autoplaying.
export default function LoopVideo({
  src,
  poster,
  label,
  speed,
}: {
  src: string;
  poster?: string;
  label?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const apply = () => {
      v.playbackRate = speed ?? (v.duration < FAST_BELOW_S ? 2 : 1);
    };
    if (v.readyState >= 1) apply();
    v.addEventListener("loadedmetadata", apply);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true;
    } else {
      v.play().catch(() => {});
    }
    return () => v.removeEventListener("loadedmetadata", apply);
  }, [speed]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      muted
      loop
      playsInline
      preload="metadata"
      className="size-full object-cover"
    />
  );
}
