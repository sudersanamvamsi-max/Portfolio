import Link from "next/link";
import HeroCurve from "@/components/HeroCurve";
import MarginRow from "@/components/MarginRow";
import StepDivider from "@/components/StepDivider";

export default function Home() {
  return (
    <>
      <section>
        <h1 className="text-4xl font-medium leading-tight md:text-5xl">Vamsi Sudersanam</h1>
        <p className="mt-3 max-w-measure">
          I build machine learning for critical care: models that predict when a patient on
          non-invasive breathing support is about to need a ventilator, and the pipelines that make
          those predictions trustworthy.
        </p>
        <div className="mt-6">
          <HeroCurve />
        </div>
        <nav aria-label="Sections" className="mt-4 flex flex-col gap-2 font-sans sm:flex-row sm:gap-8">
          <Link href="/research">Research</Link>
          <Link href="/engineering">Engineering</Link>
        </nav>
      </section>

      <div className="my-12">
        <StepDivider />
      </div>

      <section aria-label="Featured" className="flex flex-col gap-12">
        <MarginRow
          margin={
            <>
              <p>Jul 2025 – present</p>
              <p>MCW</p>
              <p>Manuscript under review</p>
            </>
          }
        >
          <h2 className="text-2xl font-medium leading-snug">
            Predicting failure of non-invasive respiratory support
          </h2>
          <p className="mt-2">
            I framed failure as a time-to-event problem rather than a yes/no label, so that
            patients who improve and come off support still contribute information instead of being
            discarded.
          </p>
        </MarginRow>
        <MarginRow
          margin={
            <>
              <p>May 2025 – Mar 2026</p>
              <p>MSOE</p>
            </>
          }
        >
          <h2 className="text-2xl font-medium leading-snug">RL Studio</h2>
          <p className="mt-2">
            An educational web app for configuring and launching Atari agent training with DQN,
            Rainbow, and PPO, playing the same games live in the browser, and viewing training
            analytics.
          </p>
        </MarginRow>
        <MarginRow
          margin={
            <>
              <p>Jan 2025 – May 2025</p>
              <p>MCW</p>
              <p>medRxiv preprint (2026)</p>
            </>
          }
        >
          <h2 className="text-2xl font-medium leading-snug">Disc degeneration grading from MRI</h2>
          <p className="mt-2">
            Graded intervertebral disc degeneration from quantitative MRI radiomics across 277
            multi-site, multi-field-strength scans, reaching up to 0.89 AUC with an interpretable
            XGBoost classifier.
          </p>
        </MarginRow>
      </section>
    </>
  );
}
