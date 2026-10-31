import { photo } from "@/content/site";

export default function Photo() {
  return (
    <div className="aspect-square w-48 shrink-0 overflow-hidden rounded-lg border border-grid bg-grid/30 md:w-64">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} alt={photo.alt} className="size-full object-cover" />
    </div>
  );
}
