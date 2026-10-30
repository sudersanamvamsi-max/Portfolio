// Transcribed by hand from content.md, which stays the source of truth.
// Inline markup: *emphasis* and **strong**. "TODO" strings render visibly on the page.

export type TableCell = { text: string; colSpan?: number };

export type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; caption: string; columns: string[]; rows: TableCell[][] }
  | { kind: "h3"; text: string };

export type Section = {
  id: string;
  heading: string;
  blocks: Block[];
};

export type ResearchProject = {
  slug: string;
  title: string;
  venue: string;
  dates: string;
  status: string;
  stack: string;
  indexMargin: string[];
  indexSummary: string;
  sections: Section[];
  // A sentence or two in your own words on why this problem drew you in. If neither field
  // is set, the project page shows nothing in that slot.
  whyThisWork?: string;
  whyThisWorkTodo?: string;
};

export type Publication = {
  authors: string;
  year?: string;
  title: string;
  venue: string;
  doi?: string;
};

export const researchFraming =
  "First author on a critical-care survival-analysis manuscript in preparation for submission and co-author on a radiomics preprint, from research at the Medical College of Wisconsin.";

export const niv: ResearchProject = {
  slug: "niv",
  title: "Predicting failure of non-invasive respiratory support",
  venue: "Medical College of Wisconsin and MSOE",
  dates: "Jul 2025 – present",
  status:
    "First author; manuscript in preparation for submission. Co-authors: Yiyang Wang (MSOE), Rahul S. Nanchal (MCW).",
  stack: "Python, SQL, scikit-survival, XGBoost, PyTorch (DeepHit), SHAP, Optuna, CUDA",
  indexMargin: ["Jul 2025 – present", "MCW", "Manuscript in preparation for submission"],
  indexSummary:
    "Survival models that predict, at the start of non-invasive support, which ICU patients will need a ventilator within 72 hours.",
  whyThisWork:
    "Non-invasive support fails often, and a large number of patients are affected by that every day. The data made it even more interesting: the Salzburg ICU database is massive and documented in German.",
  sections: [
    {
      id: "problem",
      heading: "The problem",
      blocks: [
        {
          kind: "p",
          text: "When a patient in the ICU has acute hypoxemic respiratory failure, clinicians first try non-invasive support: high-flow nasal cannula or non-invasive ventilation. It often fails, and the timing of the switch to a ventilator matters in both directions. Delaying intubation in a patient who is failing is associated with worse outcomes; intubating a patient who would have recovered exposes them to the risks of an invasive airway. Existing tools are either single thresholds like the ROX index or general severity scores like SAPS-3, and neither integrates the full clinical picture over time.",
        },
      ],
    },
    {
      id: "approach",
      heading: "The approach",
      blocks: [
        {
          kind: "p",
          text: "I framed failure as a time-to-event problem rather than a yes/no label, so that patients who improve and come off support still contribute information instead of being discarded.",
        },
        {
          kind: "ul",
          items: [
            "Cohort: 8,489 adults started on non-invasive support for acute hypoxemic respiratory failure, drawn from SICdb (27,000+ ICU admissions, 2013–2021). 2,589 (30.5%) were intubated within 72 hours. Failure happens early: 77.1% of intubations occurred within the first 2 hours.",
            "Every feature window is anchored to t0, the moment support starts, and bounded to prevent temporal leakage. Feature selection combined a missingness filter, domain-informed exclusions, and iterative VIF removal.",
            "Two experiments: prediction at t0 using only prior data; and the same design with the blood gas window extended 30 minutes, which is an early-reassessment model rather than a baseline one.",
            "Four model families (Random Survival Forest, XGBoost AFT, XGBoost Cox, DeepHit) across both experiments, evaluated with C-index, time-dependent AUC, Brier score and IBS, risk tertiles with log-rank tests, permutation importance, and SHAP.",
          ],
        },
      ],
    },
    {
      id: "results",
      heading: "Results",
      blocks: [
        {
          kind: "p",
          text: "At t0, XGBoost AFT reached 0.914 AUROC (95% CI 0.898–0.930) and 0.868 C-index, with 86.5% sensitivity and 83.8% specificity at the Youden-optimal threshold. RSF and DeepHit were close behind, and the confidence intervals overlapped, so no model is statistically distinguishable as best.",
        },
        {
          kind: "table",
          caption: "Prediction at t0. Sensitivity and specificity at the Youden-optimal threshold.",
          columns: ["Model", "AUROC (95% CI)", "C-index", "Sensitivity", "Specificity"],
          rows: [
            [
              { text: "XGBoost AFT" },
              { text: "0.914 (0.898–0.930)" },
              { text: "0.868" },
              { text: "86.5%" },
              { text: "83.8%" },
            ],
            [{ text: "RSF" }, { text: "—", colSpan: 4 }],
            [{ text: "DeepHit" }, { text: "—", colSpan: 4 }],
            [{ text: "ROX index (continuous)" }, { text: "0.555" }, { text: "—", colSpan: 3 }],
          ],
        },
        { kind: "h3", text: "The ROX baseline" },
        {
          kind: "p",
          text: "The ROX index at its published cutoff of 4.88 caught 3.6% of patients who went on to be intubated in this cohort. As a continuous predictor it reached 0.555 AUROC. The multivariable models were substantially better.",
        },
        { kind: "h3", text: "Risk tertiles" },
        {
          kind: "ul",
          items: [
            "Risk tertiles separated cleanly: high-risk patients were intubated within 2 hours about 60% of the time, low-risk patients about 1%.",
          ],
        },
      ],
    },
    {
      id: "unexpected",
      heading: "The finding I didn't expect",
      blocks: [
        {
          kind: "p",
          text: "The strongest predictors under strict pre-t0 extraction were not measured physiology but missingness itself: whether a ventilator trigger-sensitivity setting was recorded, and whether a blood gas was drawn before support started. Absence of a pre-t0 blood gas was associated with *higher* risk, which is the opposite of the \"they weren't sick enough to test\" hypothesis. Rapid deterioration plausibly leaves no time to draw one. The trigger-sensitivity indicator is partly a proxy for modality, since HFNC has no such setting, so it mixes treatment type with acuity. These models exploit documentation patterns specific to one hospital system, and external validation is needed before claiming they generalize.",
        },
      ],
    },
    {
      id: "in-progress",
      heading: "In progress",
      blocks: [{ kind: "p", text: "Extending the work to MIMIC-IV and eICU." }],
    },
  ],
};

export const disc: ResearchProject = {
  slug: "disc-degeneration",
  title: "A Systematic Evaluation of MRI Normalization for Multi-Site Radiomics-Based Disc Degeneration Classification",
  venue: "Medical College of Wisconsin",
  dates: "Jan 2025 – May 2025",
  status: "Co-author, medRxiv preprint (2026)",
  stack: "Python, Pyradiomics, XGBoost, scikit-learn",
  indexMargin: ["Jan 2025 – May 2025", "MCW", "medRxiv preprint"],
  indexSummary:
    "Built the radiomics pipeline and benchmarked MRI normalization strategies so features hold up across sites and scanners.",
  sections: [
    {
      id: "summary",
      heading: "Summary",
      blocks: [
        {
          kind: "p",
          text: "Graded intervertebral disc degeneration from quantitative MRI radiomics across 277 multi-site, multi-field-strength scans, reaching up to 0.89 AUC with an interpretable XGBoost classifier.",
        },
      ],
    },
    {
      id: "contribution",
      heading: "My contribution",
      blocks: [
        {
          kind: "p",
          text: "Built the Pyradiomics feature-extraction pipeline and benchmarked 8 image-normalization strategies. Ran repeated-scan stability analysis (one-sample t-tests on feature deltas) to keep reproducible biomarkers, more than doubling the stable-feature count compared with no normalization.",
        },
      ],
    },
  ],
};

export const projects = [niv, disc];

export const publications: Publication[] = [
  {
    authors:
      "Muftuler, L. T., Drobek, A., Bukowy, J. D., Duwe, K., **Sudersanam, V.**, Harrington, J., Van Zant, E., Duenweg, S. R., & Shanbhag, D. D.",
    year: "2026",
    title: "A Systematic Evaluation of MRI Normalization for Multi-Site Radiomics-Based Disc Degeneration Classification",
    venue: "medRxiv",
    doi: "10.64898/2026.01.13.26343807",
  },
];
