import type { Project } from "@/content/projects";

export default function ProjectMedia({ project }: { project: Project }) {
  const { media, mediaTodo } = project;
  return (
    <div className="aspect-video w-full max-w-[68ch] overflow-hidden rounded-lg border border-grid bg-grid/30">
      {media ? (
        <picture>
          {media.still && (
            <source media="(prefers-reduced-motion: reduce)" srcSet={media.still} />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            className="size-full object-cover"
          />
        </picture>
      ) : (
        <div className="flex size-full items-center justify-center p-6 text-center font-sans text-sm text-muted">
          TODO: {mediaTodo}
        </div>
      )}
    </div>
  );
}
