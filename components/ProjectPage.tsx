import Link from "next/link";
import type { ResearchProject } from "@/content/research";
import DataTable from "./DataTable";
import Inline from "./Inline";
import MarginRow from "./MarginRow";

export default function ProjectPage({ project }: { project: ResearchProject }) {
  const meta: [string, string][] = [
    ["Dates", project.dates],
    ["Venue", project.venue],
    ["Status", project.status],
    ["Stack", project.stack],
  ];

  return (
    <article>
      <p className="font-sans text-sm">
        <Link href="/research">Back to research</Link>
      </p>
      <h1 className="mt-6 max-w-measure text-4xl font-medium leading-tight">{project.title}</h1>
      {project.whyThisWork && <p className="mt-3 max-w-measure">{project.whyThisWork}</p>}
      <div className="mt-8">
        <MarginRow
          margin={
            <dl className="flex flex-col gap-3">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-medium text-ink">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          }
        >
          <div className="flex flex-col gap-10">
            {project.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="text-2xl font-medium leading-snug">
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-4">
                  {section.blocks.map((block, i) => {
                    switch (block.kind) {
                      case "p":
                        return (
                          <p key={i}>
                            <Inline text={block.text} />
                          </p>
                        );
                      case "h3":
                        return (
                          <h3 key={i} className="mt-2 text-xl font-medium">
                            {block.text}
                          </h3>
                        );
                      case "ul":
                        return (
                          <ul key={i} className="flex list-disc flex-col gap-3 pl-5">
                            {block.items.map((item) => (
                              <li key={item}>
                                <Inline text={item} />
                              </li>
                            ))}
                          </ul>
                        );
                      case "table":
                        return <DataTable key={i} {...block} />;
                    }
                  })}
                </div>
              </section>
            ))}
          </div>
        </MarginRow>
      </div>
      <p className="mt-12 font-sans text-sm">
        <Link href="/research">Back to research</Link>
      </p>
    </article>
  );
}
