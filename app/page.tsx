import PatientRiskCurve from "@/components/PatientRiskCurve";
import Photo from "@/components/Photo";
import Link from "next/link";
import { niv } from "@/content/research";
import { projects } from "@/content/projects";
import { email, goals, oneLiner, passion, passionTodo } from "@/content/site";

const rlStudio = projects.find((p) => p.slug === "rl-studio")!;

export default function Home() {
  return (
    <section>
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-12">
        <div className="max-w-measure">
          <h1 className="text-4xl font-medium leading-tight md:text-5xl">Vamsi Sudersanam</h1>
          <p className="mt-3">{oneLiner}</p>
          <p className="mt-3">{goals}</p>
          {passion ? (
            <p className="mt-3">{passion}</p>
          ) : (
            <p className="mt-3 font-sans text-sm text-muted">TODO: {passionTodo}</p>
          )}
          <p className="mt-5 flex gap-6 font-sans">
            <Link href="/research">Research</Link>
            <Link href="/projects">Projects</Link>
          </p>
        </div>
        <Photo />
      </div>
      <div className="mt-10">
        <PatientRiskCurve />
      </div>

      <section aria-labelledby="featured" className="mt-12 max-w-measure">
        <h2 id="featured" className="text-2xl font-medium leading-snug">
          Featured
        </h2>
        <ul className="mt-4 flex flex-col gap-6">
          <li>
            <h3 className="text-xl font-medium">
              <Link href="/research/niv">{niv.title}</Link>
            </h3>
            <p className="mt-1">{niv.indexSummary}</p>
          </li>
          <li>
            <h3 className="text-xl font-medium">
              <Link href={`/projects#${rlStudio.slug}`}>{rlStudio.title}</Link>
            </h3>
            <p className="mt-1">{rlStudio.summary}</p>
          </li>
        </ul>
      </section>

      <p className="mt-12 max-w-measure">
        <a href={`mailto:${email}`}>{email}</a>
        {" · "}
        <Link href="/contact">Get in touch</Link>
      </p>
    </section>
  );
}
