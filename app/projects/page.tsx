import Inline from "@/components/Inline";
import MarginRow from "@/components/MarginRow";
import ProjectMedia from "@/components/ProjectMedia";
import StepDivider from "@/components/StepDivider";
import { projectsFraming, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("Projects", "Production test automation at Real Time Automation, a full-stack deep RL training platform, a GPT built from scratch, and a repair workflow automation.", "/projects");

export default function Projects() {
  return (
    <>
      <h1 className="text-4xl font-medium leading-tight">Projects</h1>
      <p className="mt-3 max-w-measure">{projectsFraming}</p>

      <section aria-label="Projects" className="mt-12 flex flex-col gap-12">
        {projects.map((p, i) => (
          <div key={p.slug} id={p.slug} className="flex scroll-mt-6 flex-col gap-12">
            {i > 0 && <StepDivider />}
            <MarginRow
              margin={
                <>
                  <p>{p.dates}</p>
                  {p.role && <p>{p.role}</p>}
                </>
              }
            >
              <ProjectMedia project={p} />
              <h2 className="mt-5 text-2xl font-medium leading-snug">{p.title}</h2>
              <p className="mt-2">
                <Inline text={p.summary} />
              </p>
              {p.built && (
                <ul className="mt-4 flex list-disc flex-col gap-3 pl-5">
                  {p.built.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <p className="mt-4">{p.whyBuilt}</p>
              {p.link ? (
                <p className="mt-2 font-sans text-sm">
                  <a href={p.link.href}>{p.link.label}</a>
                </p>
              ) : (
                p.linkTodo && (
                  <p className="mt-2 font-sans text-sm text-muted">TODO: {p.linkTodo}</p>
                )
              )}
            </MarginRow>
          </div>
        ))}
      </section>
    </>
  );
}
