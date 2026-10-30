import HobbyPhotos from "@/components/HobbyPhotos";
import TypedJson from "@/components/TypedJson";
import {
  aboutIntro,
  aboutIntroTodo,
  bio,
  certVerifyTodo,
  certVerifyUrl,
  goals,
  hobbies,
  skillsJson,
  skillsJsonTodo,
} from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("About", "Computer Science graduate from MSOE: clinical ML research on ICU data at the Medical College of Wisconsin, plus skills, certifications and hobbies.", "/about");

export default function About() {
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

      <section aria-labelledby="skills">
        <h2 id="skills" className="text-2xl font-medium leading-snug">
          Skills
        </h2>
        <div className="mt-4">
          {skillsJson ? (
            <TypedJson
              data={skillsJson}
              label="Skills and certifications as JSON"
              caption={
                certVerifyUrl ? (
                  <a href={certVerifyUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    AWS certifications: verify on Credly
                  </a>
                ) : (
                  <>AWS certifications: verify on Credly (TODO: {certVerifyTodo})</>
                )
              }
            />
          ) : (
            <p className="font-sans text-sm text-muted">TODO: {skillsJsonTodo}</p>
          )}
        </div>
      </section>

      <section aria-labelledby="off-the-clock" className="mt-12">
        <h2 id="off-the-clock" className="text-2xl font-medium leading-snug">
          Off the clock
        </h2>
        {hobbies.map((h) => (
          <div key={h.slug} id={h.slug} className="mt-8 scroll-mt-6">
            <h3 className="text-xl font-medium leading-snug">{h.title}</h3>
            <p className="mt-2 max-w-measure">
              {h.text ?? (
                <span className="font-sans text-sm text-muted">TODO: {h.textTodo}</span>
              )}
            </p>
            <HobbyPhotos hobby={h} />
          </div>
        ))}
      </section>
    </>
  );
}
