import MarginRow from "@/components/MarginRow";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <MarginRow
        margin={
          <>
            <p>Jul 2025 – present</p>
            <p>Medical College of Wisconsin and MSOE</p>
            <p>Manuscript under review</p>
          </>
        }
      >
        <h2 className="text-2xl font-medium leading-snug">
          Predicting failure of non-invasive respiratory support
        </h2>
        <p className="mt-2">
          When a patient in the ICU has acute hypoxemic respiratory failure, clinicians first try
          non-invasive support: high-flow nasal cannula or non-invasive ventilation. It often
          fails, and the timing of the switch to a ventilator matters in both directions.
        </p>
      </MarginRow>
      <MarginRow
        margin={
          <>
            <p>Jan 2025 – May 2025</p>
            <p>Medical College of Wisconsin</p>
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
    </div>
  );
}
