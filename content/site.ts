// Transcribed by hand from content.md, which stays the source of truth.
// "TODO" strings render visibly on the page.

export const email = "sudersanamvamsi@gmail.com";

// Drop a photo in /public (e.g. /public/vamsi.jpg) and set this to
// { src: "/vamsi.jpg", alt: "Vamsi Sudersanam" }.
export const photo: { src: string; alt: string } | null = null;

export const oneLiner =
  "I build machine learning for critical care: models that predict when a patient on non-invasive breathing support is about to need a ventilator, and the pipelines that make those predictions trustworthy.";

export const goals =
  "I am applying to PhD programs in biomedical informatics for Fall 2027.";

export const passionTodo = "a sentence or two, in your own words, on what you are passionate about";

export const interests: string[] | null = null;
export const interestsTodo = "a short list of interests/hobbies outside research and code";

export const bio =
  "Computer Science graduate (Milwaukee School of Engineering, 2026). First author on a critical-care survival-analysis manuscript under review and co-author on a radiomics preprint, from research at the Medical College of Wisconsin. Also a software engineer: production test automation at Real Time Automation and a full-stack deep RL training platform.";

export const skills: [string, string][] = [
  [
    "ML and statistics",
    "survival analysis (RSF, XGBoost AFT/Cox, DeepHit), landmark modeling, calibration and discrimination metrics, SHAP, Bayesian optimization, deep learning, reinforcement learning",
  ],
  [
    "Clinical data",
    "SICdb, MIMIC-IV, eICU; cohort extraction, time-anchored feature engineering, missing-data handling",
  ],
  ["Languages", "Python, SQL, TypeScript, Java, C/C++, R"],
  ["Tools", "PyTorch, FastAPI, Next.js/React, Docker, Git, AWS, Databricks, MLflow, Azure DevOps"],
];

// Dates are unconfirmed in content.md ("Resolve before publishing"), so none are shown.
export const certifications = ["AWS Certified AI Practitioner", "AWS Certified Cloud Practitioner"];
