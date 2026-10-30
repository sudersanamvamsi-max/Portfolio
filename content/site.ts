// Transcribed by hand from content.md, which stays the source of truth.
// "TODO" strings render visibly on the page.

export const email = "sudersanamvamsi@gmail.com";

// Landing graphics live in /public/landing/.
export const photo = { src: "/landing/vamsi.jpg", alt: "Vamsi Sudersanam" };
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

// Photo or video (.mp4/.webm). Files live in /public/about/. A missing file shows a visible
// TODO placeholder; a missing `alt` or `caption` shows a visible TODO under the media.
// `speed` overrides the playback rate of a video (default: 2x under 20 s, otherwise 1x).
export type HobbyMedia = { src: string; alt?: string; caption?: string; speed?: number };
export type HobbyRow = { text: string; photo: HobbyMedia };
export type Hobby = { slug: string; title: string; rows: HobbyRow[] };

export const hobbies: Hobby[] = [
  {
    slug: "cooking",
    title: "Cooking",
    rows: [
      {
        text: "I cook whatever I'm craving in the moment.",
        photo: { src: "/about/cooking-1.jpeg", caption: "Thai lemon soup with shrimp" },
      },
      {
        text: "I love cooking for family and friends, who sometimes send in special requests.",
        photo: { src: "/about/cooking-2.mp4", caption: "Sticky toffee pudding" },
      },
      {
        text: "I love eating as much as I love cooking, and the two go hand in hand: it makes me a perfectionist in the kitchen, which is a double-edged sword.",
        photo: { src: "/about/cooking-3.jpg", caption: "Churrasco with chimichurri" },
      },
    ],
  },
  {
    slug: "basketball",
    title: "Basketball",
    rows: [
      {
        text: "I started playing in school and was captain of my team. The workload at university pulled me away for a while, but I've picked it back up and now play in leagues.",
        photo: { src: "/about/basketball.mp4", speed: 1 },
      },
    ],
  },
  {
    slug: "outdoors-gym",
    title: "Getting outside and the gym",
    rows: [
      {
        text: "Mostly walking and running along the lake here in Wisconsin. Anywhere with some nature, and I'm in. The gym is about my own goals: staying healthy and athletic.",
        photo: { src: "/about/outdoors-gym.jpg" },
      },
    ],
  },
];

// Photo under the live patient monitor on the home page.
export const presenting = { src: "/landing/me_presenting.jpg", alt: "Vamsi presenting" };
export const presentingText: string | null = null;
export const presentingTextTodo = "a few sentences to go with the photo of you presenting";

export const openTo =
  "I'm open to PhD conversations and to research engineer or research assistant roles in clinical informatics.";

// Form endpoint (currently a Jotform URL; the name is historical). When null, the contact
// form falls back to opening the visitor's mail app.
export const formspreeEndpoint: string | null = "https://form.jotform.com/263026921100039";

// The PDF embedded and offered for download on /cv. The file lives at this path in /public.
export const cvHref = "/cv/Vamsi_Sudersanam_SWE.pdf";

export const bio =
  "Computer Science graduate (Milwaukee School of Engineering, 2026). First author on a critical-care survival-analysis manuscript in preparation for submission and co-author on a radiomics preprint, from research at the Medical College of Wisconsin. Also a software engineer: production test automation at Real Time Automation and a full-stack deep RL training platform.";

// Shown on the home page as typed JSON (serialized with 2-space indentation). Dates stay out
// until confirmed (see content.md).
export const skillsJson: Record<string, unknown> | null = {
  machine_learning: ["PyTorch", "scikit-learn", "XGBoost", "deep learning", "reinforcement learning", "SHAP"],
  survival_analysis: {
    models: ["Random Survival Forest", "XGBoost AFT/Cox", "DeepHit"],
    used_in: "NIV failure prediction",
  },
  clinical_data: ["MIMIC-IV", "eICU", "SICdb"],
  languages: ["Python", "SQL", "R", "TypeScript", "Java", "C/C++"],
  engineering: ["Git", "Docker", "AWS", "FastAPI", "React/Next.js"],
  certified: ["AWS Certified AI Practitioner", "AWS Certified Cloud Practitioner"],
};
export const skillsJsonTodo = "the skills JSON object, including the \"certified\" key";

// Credly profile listing the AWS badges, linked from the caption under the skills panel.
export const certVerifyUrl: string | null = "https://www.credly.com/users/vamsi-sudersanam";
export const certVerifyTodo = "Credly profile URL for the AWS certifications";
