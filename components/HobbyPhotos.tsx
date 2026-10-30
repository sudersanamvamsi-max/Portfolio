import type { Hobby } from "@/content/site";

export default function HobbyPhotos({ hobby }: { hobby: Hobby }) {
  const { photos, photosTodo } = hobby;

  if (photos && photos.length > 0) {
    return (
      <ul className="mt-6 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          <li key={p.src}>
            <figure>
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-grid bg-grid/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="mt-2 font-sans text-sm text-muted">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  }

  if (photosTodo) {
    return (
      <div className="mt-6 flex aspect-[4/3] w-full max-w-sm items-center justify-center overflow-hidden rounded-lg border border-grid bg-grid/30 p-6 text-center font-sans text-sm text-muted">
        TODO: {photosTodo}
      </div>
    );
  }

  return null;
}
