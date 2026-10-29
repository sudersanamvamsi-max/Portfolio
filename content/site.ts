// Transcribed by hand from content.md, which stays the source of truth.
// "TODO" strings render visibly on the page.

export const email = "sudersanamvamsi@gmail.com";

// Drop a photo in /public (e.g. /public/vamsi.jpg) and set this to
// { src: "/vamsi.jpg", alt: "Vamsi Sudersanam" }.
export const photo = { src: "/vamsi.jpg", alt: "Vamsi Sudersanam" };
export const oneLiner =
  "I build machine learning for critical care: models that predict when a patient on non-invasive breathing support is about to need a ventilator, and the pipelines that make those predictions trustworthy.";

export const goals =
  "I am applying to PhD programs in biomedical informatics for Fall 2027.";

export const passion: string | null =
  "Growing up in India, I saw a public health system stretched by the sheer number of patients it serves every day. I want to build responsible, safe AI that helps give every patient the accurate, unbiased care they deserve.";
export const passionTodo = "a sentence or two, in your own words, on what you are passionate about";

export const aboutIntro: string | null =
  "I've always loved computer science for how much it makes possible, and from my first projects I gravitated toward problems with real-world impact. In my junior year I joined a project at the Medical College of Wisconsin grading intervertebral disc degeneration from MRI on the Pfirrmann scale. The goal was to reduce the subjectivity in that grading and give radiologists a second check on their own diagnoses, cutting down on false negatives. That's where my passion for clinical AI started, and I carried it into my next project: predicting when non-invasive ventilation fails in patients with hypoxemic respiratory failure.";
export const aboutIntroTodo = "how you got into clinical ML and where you are going, 3–4 sentences";

export const interests: string[] | null = [
  "Basketball",
  "Hiking",
  "The gym",
  "Cooking, and eating, which go hand in hand: loving good food makes me a perfectionist in the kitchen, which is a double-edged sword",
];
export const interestsTodo = "a short list of interests/hobbies outside research and code";

export const openTo =
  "I'm open to PhD conversations and to research engineer or research assistant roles in clinical informatics.";

// Set when the Formspree form exists (https://formspree.io/f/...). Until then the contact
// form falls back to opening the visitor's mail app.
export const formspreeEndpoint: string | null = null;

// Opens in a new tab from the nav. Drop the PDF at this path in /public.
export const cvHref = "/cv/vamsi-sudersanam-cv.pdf";

export const bio =
  "Computer Science graduate (Milwaukee School of Engineering, 2026). First author on a critical-care survival-analysis manuscript in preparation for submission and co-author on a radiomics preprint, from research at the Medical College of Wisconsin. Also a software engineer: production test automation at Real Time Automation and a full-stack deep RL training platform.";

export const skills: [string, string][] = [
  [
    "ML and statistics",
    "survival analysis (RSF, XGBoost AFT/Cox, DeepHit), calibration and discrimination metrics, SHAP, Bayesian optimization, deep learning, reinforcement learning",
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
