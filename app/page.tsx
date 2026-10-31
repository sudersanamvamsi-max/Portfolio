import Inline from "@/components/Inline";
import PatientRiskCurve from "@/components/PatientRiskCurve";
import Photo from "@/components/Photo";
import TypedJson from "@/components/TypedJson";
import {
  certVerifyUrl,
  homeGoals,
  homeIntro,
  passion,
  presenting,
  presentingText,
  skillsJson,
} from "@/content/site";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-12">
        <div className="max-w-measure">
          <h1 className="sr-only">Vamsi Sudersanam</h1>
          {homeIntro.map((para, i) => (
            <p key={i} className={i === 0 ? undefined : "mt-3"}>
              <Inline text={para} />
            </p>
          ))}
          <p className="mt-3">{passion}</p>
          <p className="mt-3">{homeGoals}</p>
        </div>
        <Photo />
      </div>
      <div className="mt-10">
        <PatientRiskCurve />
      </div>

      <figure className="mt-10 max-w-[68ch]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={presenting.src}
          alt={presenting.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-lg border border-grid object-cover"
        />
        <figcaption className="mt-3 text-base">
          {presentingText}
        </figcaption>
      </figure>

      <section aria-labelledby="skills" className="mt-12">
        <h2 id="skills" className="text-2xl font-medium leading-snug">
          Skills
        </h2>
        <div className="mt-4">
          <TypedJson
            data={skillsJson}
            label="Skills and certifications as JSON"
            caption={
              <a href={certVerifyUrl} target="_blank" rel="noopener noreferrer" className="underline">
                AWS certifications: verify on Credly
              </a>
            }
          />
        </div>
      </section>
    </section>
  );
}
