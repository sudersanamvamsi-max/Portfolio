import Link from "next/link";
import Inline from "@/components/Inline";
import MarginRow from "@/components/MarginRow";
import StepDivider from "@/components/StepDivider";
import { projects, publications, researchFraming } from "@/content/research";

export default function Research() {
  return (
    <>
      <h1 className="text-4xl font-medium leading-tight">Research</h1>
      <p className="mt-3 max-w-measure">{researchFraming}</p>

      <section aria-label="Projects" className="mt-12 flex flex-col gap-12">
        {projects.map((p) => (
          <MarginRow
            key={p.slug}
            margin={p.indexMargin.map((line) => (
              <p key={line}>{line}</p>
            ))}
          >
            <h2 className="text-2xl font-medium leading-snug">
              <Link href={`/research/${p.slug}`}>{p.title}</Link>
            </h2>
          </MarginRow>
        ))}
      </section>

      <div className="my-12">
        <StepDivider />
      </div>

      <section aria-labelledby="publications">
        <h2 id="publications" className="text-2xl font-medium leading-snug">
          Publications
        </h2>
        <ul className="mt-4 flex max-w-measure flex-col gap-4">
          {publications.map((pub) => (
            <li key={`${pub.authors}-${pub.title}`}>
              <Inline text={pub.authors} />
              {pub.year ? ` (${pub.year}). ` : " "}
              {pub.title}. <em>{pub.venue}.</em>
              {pub.doi && (
                <>
                  {" DOI: "}
                  <a href={`https://doi.org/${pub.doi}`}>{pub.doi}</a>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
