import CodeWindow from "@/components/CodeWindow";
import MarginRow from "@/components/MarginRow";
import {
  aboutIntro,
  aboutIntroTodo,
  bio,
  certifications,
  goals,
  interests,
  interestsTodo,
  skills,
} from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("About", "Computer Science graduate from MSOE: clinical ML research on ICU data at the Medical College of Wisconsin, plus skills, certifications and interests.", "/about");

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
      <div className="mt-6">
        <CodeWindow />
      </div>

      <hr
        className="my-12 w-full min-w-40 border-0 border-t"
        style={{ borderColor: "var(--grid)" }}
      />

      <section aria-labelledby="skills" className="flex flex-col gap-6">
        <h2 id="skills" className="text-2xl font-medium leading-snug">
          Skills
        </h2>
        {skills.map(([label, items]) => (
          <MarginRow key={label} margin={<p>{label}</p>}>
            <p>{items}</p>
          </MarginRow>
        ))}
      </section>

      <section aria-labelledby="certs" className="mt-12">
        <h2 id="certs" className="text-2xl font-medium leading-snug">
          Certifications
        </h2>
        <ul className="mt-3 list-disc pl-5">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="interests" className="mt-12">
        <h2 id="interests" className="text-2xl font-medium leading-snug">
          Outside of work
        </h2>
        {interests ? (
          <ul className="mt-3 list-disc pl-5">
            {interests.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 font-sans text-sm text-muted">TODO: {interestsTodo}</p>
        )}
      </section>
    </>
  );
}
