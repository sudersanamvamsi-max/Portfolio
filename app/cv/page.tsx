import { cvHref } from "@/content/site";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("CV", "Curriculum vitae of Vamsi Sudersanam: clinical machine learning research and software engineering.", "/cv");

export default function Cv() {
  return (
    <>
      <h1 className="sr-only">CV</h1>
      <p>
        <a
          href={cvHref}
          download
          className="block rounded bg-cohort-a px-5 py-3 text-center font-sans font-medium text-paper no-underline hover:opacity-90 sm:inline-block sm:py-2"
          style={{ color: "var(--paper)" }}
        >
          Download PDF
        </a>
      </p>

      <p className="mt-4 max-w-measure font-sans text-sm text-muted md:hidden">
        The PDF preview is hidden on small screens. Use the button above to open or download it.
      </p>

      <object
        data={cvHref}
        type="application/pdf"
        aria-label="CV, PDF"
        className="mt-6 hidden h-[85vh] w-full rounded-lg border border-grid md:block"
      >
        <p className="p-6 font-sans text-sm text-muted">
          Your browser can&apos;t show the PDF here. <a href={cvHref}>Download the CV</a> instead.
        </p>
      </object>
    </>
  );
}
