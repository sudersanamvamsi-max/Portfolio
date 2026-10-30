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

export type HobbyPhoto = { src: string; alt: string; caption: string };
export type Hobby = {
  slug: string;
  title: string;
  text: string | null;
  textTodo: string;
  photos?: HobbyPhoto[];
  photosTodo?: string;
};

// Cooking photos: add files to /public/about/cooking/ and list them in `photos`.
export const hobbies: Hobby[] = [
  {
    slug: "cooking",
    title: "Cooking",
    text: "I cook whatever I'm craving in the moment, and I love cooking for family and friends, who sometimes send in special requests. I love eating as much as I love cooking, and the two go hand in hand: it makes me a perfectionist in the kitchen, which is a double-edged sword.",
    textTodo: "a few sentences on cooking",
    photosTodo: "photos of your cooking, with captions (files go in public/about/cooking/)",
  },
  {
    slug: "basketball",
    title: "Basketball",
    text: "I started playing in school and was captain of my team. The workload at university pulled me away for a while, but I've picked it back up and now play in leagues.",
    textTodo: "a few sentences on basketball",
  },
  {
    slug: "outside",
    title: "Getting outside",
    text: "Mostly walking and running along the lake here in Wisconsin. Anywhere with some nature, and I'm in.",
    textTodo: "a few sentences on getting outside",
  },
  {
    slug: "gym",
    title: "The gym",
    text: "For me it's about my own goals: staying healthy and athletic.",
    textTodo: "a few sentences on the gym",
  },
];

export const openTo =
  "I'm open to PhD conversations and to research engineer or research assistant roles in clinical informatics.";

// Set when the Formspree form exists (https://formspree.io/f/...). Until then the contact
// form falls back to opening the visitor's mail app.
export const formspreeEndpoint: string | null = null;

// Opens in a new tab from the nav. Drop the PDF at this path in /public.
export const cvHref = "/cv/vamsi-sudersanam-cv.pdf";

export const bio =
  "Computer Science graduate (Milwaukee School of Engineering, 2026). First author on a critical-care survival-analysis manuscript in preparation for submission and co-author on a radiomics preprint, from research at the Medical College of Wisconsin. Also a software engineer: production test automation at Real Time Automation and a full-stack deep RL training platform.";

// Shown on /about as typed JSON (serialized with 2-space indentation). Include a "certified"
// key for the AWS certifications. Dates stay out until confirmed (see content.md).
export const skillsJson: Record<string, unknown> | null = {
  ml_and_statistics: [
    "survival analysis (RSF, XGBoost AFT/Cox, DeepHit)",
    "calibration and discrimination metrics",
    "SHAP",
    "Bayesian optimization",
    "deep learning",
    "reinforcement learning",
  ],
  clinical_data: {
    databases: ["SICdb", "MIMIC-IV", "eICU"],
    methods: ["cohort extraction", "time-anchored feature engineering", "missing-data handling"],
  },
  languages: ["Python", "SQL", "TypeScript", "Java", "C/C++", "R"],
  tools: ["PyTorch", "FastAPI", "Next.js/React", "Docker", "Git", "AWS", "Databricks", "MLflow", "Azure DevOps"],
  certified: ["AWS Certified AI Practitioner", "AWS Certified Cloud Practitioner"],
};
export const skillsJsonTodo = "the skills JSON object, including the \"certified\" key";

// Credly profile listing the AWS badges, linked from the caption on /about.
export const certVerifyUrl: string | null = "https://www.credly.com/users/vamsi-sudersanam";
export const certVerifyTodo = "Credly profile URL for the AWS certifications";
