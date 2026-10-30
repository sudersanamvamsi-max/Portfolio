import { existsSync } from "node:fs";
import path from "node:path";
import LoopVideo from "@/components/LoopVideo";
import type { HobbyMedia as Media } from "@/content/site";

const VIDEO = /\.(mp4|webm)$/i;

// Photo or video in a fixed 4:3 frame. Runs at build time, so a file that is not in /public
// shows the visible TODO placeholder instead of a broken image.
export default function HobbyMedia({ media }: { media: Media }) {
  const { src, alt, caption } = media;
  const exists = existsSync(path.join(process.cwd(), "public", src));

  return (
    <figure>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-grid bg-grid/30">
        {!exists ? (
          <div className="flex size-full items-center justify-center p-6 text-center font-sans text-sm text-muted">
            TODO: add the file at public{src}
          </div>
        ) : VIDEO.test(src) ? (
          <LoopVideo src={src} label={alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="size-full object-cover" />
        )}
      </div>
      <figcaption className="mt-2 font-sans text-sm text-muted">
        {alt && caption
          ? caption
          : `TODO: ${[!alt && "alt text", !caption && "caption"].filter(Boolean).join(" and ")}`}
      </figcaption>
    </figure>
  );
}
