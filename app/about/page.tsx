import HobbyMedia from "@/components/HobbyMedia";
import { aboutIntro, aboutIntroTodo, bio, goals, hobbies } from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("About", "Computer Science graduate from MSOE: clinical ML research on ICU data at the Medical College of Wisconsin, plus the things I do off the clock.", "/about");

export default function About() {
  // Text and photo sides alternate across every row on the page, not per hobby.
  let rowIndex = 0;
  return (
    <>
      <h1 className="text-4xl font-medium leading-tight">About me</h1>
      <p className="mt-3 max-w-measure">
        {aboutIntro ?? (
          <span className="font-sans text-sm text-muted">TODO: {aboutIntroTodo}</span>
        )}
      </p>
      <p className="mt-3 max-w-measure">{bio}</p>
      <p className="mt-3 max-w-measure">{goals}</p>

      <hr
        className="my-12 w-full min-w-40 border-0 border-t"
        style={{ borderColor: "var(--grid)" }}
      />

      <section aria-labelledby="off-the-clock">
        <h2 id="off-the-clock" className="text-3xl font-medium leading-snug">
          Off the clock
        </h2>
        {hobbies.map((h, i) => (
          <div
            key={h.slug}
            id={h.slug}
            className={`scroll-mt-6 ${i === 0 ? "mt-10" : "mt-10 border-t border-grid pt-10"}`}
          >
            <h3 className="text-2xl font-medium leading-snug">{h.title}</h3>
            {h.rows.map((row) => {
              const photoRight = rowIndex++ % 2 === 0;
              return (
                <div
                  key={row.photo.src}
                  className="mt-6 grid grid-cols-1 items-center gap-x-10 gap-y-3 md:grid-cols-2"
                >
                  <div className={photoRight ? "order-first md:order-last" : "order-first"}>
                    <HobbyMedia media={row.photo} />
                  </div>
                  <p className="max-w-measure">{row.text}</p>
                </div>
              );
            })}
          </div>
        ))}
      </section>
    </>
  );
}
