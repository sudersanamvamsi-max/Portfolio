import HobbyMedia from "@/components/HobbyMedia";
import { aboutIntro, goals, hobbies, hobbiesIntro } from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("About", "Computer Science graduate from MSOE: clinical ML research on ICU data at the Medical College of Wisconsin, plus the things I do off the clock.", "/about");

export default function About() {
  // Text and photo sides alternate across every row on the page, not per hobby.
  let rowIndex = 0;
  return (
    <>
      <h1 className="text-4xl font-medium leading-tight">About me</h1>
      {aboutIntro.map((para, i) => (
        <p key={i} className="mt-3 max-w-measure">
          {para}
        </p>
      ))}
      <p className="mt-3 max-w-measure">
        {goals} {hobbiesIntro}
      </p>

      <hr
        className="my-12 w-full min-w-40 border-0 border-t"
        style={{ borderColor: "var(--grid)" }}
      />

      <section>
        {hobbies.map((h, i) => (
          <div
            key={h.slug}
            id={h.slug}
            className={`scroll-mt-6 ${i === 0 ? "mt-10" : "mt-10 border-t border-grid pt-10"}`}
          >
            <h2 className="border-b border-ink/25 pb-2 text-2xl font-medium leading-snug">{h.title}</h2>
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
