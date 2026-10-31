// Transcribed by hand from content.md, which stays the source of truth.
// "TODO" strings render visibly on the page.

export const email = "sudersanamvamsi@gmail.com";

// Landing graphics live in /public/landing/.
export const photo = { src: "/landing/vamsi.jpg", alt: "Vamsi Sudersanam" };
export const oneLiner =
  "I build machine learning for critical care: models that predict when a patient on non-invasive breathing support is about to need a ventilator, and the pipelines that make those predictions trustworthy.";

// `goals` is used on About; `homeGoals` on Home.
export const goals =
  "I am applying to PhD programs in biomedical informatics for Fall 2027.";
export const homeGoals =
  "I graduated in Computer Science from MSOE and am applying to PhD programs in biomedical informatics for Fall 2027.";

// One paragraph per entry; supports Inline markup, including [text](/path) links.
export const homeIntro: string[] = [
  "Hi, I'm Vamsi. I'm a visiting scholar at the Medical College of Wisconsin, where I build data pipelines and machine learning models that support clinical decision-making.",
  "My latest project predicts, early on, when non-invasive ventilation will fail in patients with acute hypoxemic respiratory failure. I'm first author on the manuscript, now in preparation for submission. You can read about the work on my [research page](/research/niv), and if it interests you, [reach out](/contact). I'd love to talk about it.",
];

export const passion =
  "I'm passionate about bringing new AI into clinical care in ways that are responsible, safe and make it more accurate.";

// One paragraph per entry.
export const aboutIntro: string[] = [
  "Now to the more interesting information about me. I was born and raised in Delhi, India, one of the most densely populated cities in the world, so you never really feel alone. I chose computer science because I watched too many sci-fi movies as a kid. Some would say that's a rash decision, but I would argue otherwise.",
  "I fell in love with it quickly, and since then I've held every project to two principles: it should push me to learn something new, and it should matter in the real world. The universe (or MSOE) must have heard my thoughts, because in my junior year I got the chance to work with clinicians at the Medical College of Wisconsin. The project graded intervertebral disc degeneration from MRI on the Pfirrmann scale. The goal was to reduce the subjectivity in that grading and give radiologists a second check on their own diagnoses, cutting down on false negatives. That's where my passion for clinical AI started, and I carried it into my next project: predicting when non-invasive ventilation fails in patients with acute respiratory failure.",
  "I stayed in the field because, growing up in Delhi, I saw a public health system stretched by the sheer number of patients it serves every day. Having studied AI, I know its dangers as well as its potential. Its ability to process information and recognize complex patterns can't be denied, and I want to build responsible, safe AI that helps give every patient the accurate, unbiased care they deserve.",
];

// Photo or video (.mp4/.webm). Files live in /public/about/. A missing file shows a visible
// TODO placeholder; an undefined `alt` shows a visible TODO under the media (use "" for a
// decorative image whose row text already describes it).
// `speed` overrides the playback rate of a video (default: 2x under 20 s, otherwise 1x).
export type HobbyMedia = { src: string; alt?: string; speed?: number };
export type HobbyRow = { text: string; photo: HobbyMedia };
export const hobbiesIntro = "I also try to lead a balanced life and touch grass once in a while. To do this, I have some hobbies.";

export type Hobby = { slug: string; title: string; rows: HobbyRow[] };

export const hobbies: Hobby[] = [
  {
    slug: "cooking",
    title: "Cooking",
    rows: [
      {
        text: "I fell in love with eating long before cooking. I'm a big foodie and a self-proclaimed food critic, so after one too many \"I've had better\"s, I challenged myself to actually start making those dishes. Now, after enough burnt dishes and pans, I can say I know how to cook!",
        photo: { src: "/about/cooking-1.jpeg", alt: "" },
      },
      {
        text: "Sticky toffee pudding, with ice cream from the store. I added a little more baking powder than I should have, but the toffee turned out great though!",
        photo: { src: "/about/cooking-2.mp4", alt: "" },
      },
      {
        text: "I got the inspiration to make churrasco with chimichurri after going to a Brazilian steakhouse, and I have to say, this dish is definitely a top 10. The chimichurri plays a very, very important part. Mine was a bit bitter... (probably the red wine).",
        photo: { src: "/about/cooking-3.jpg", alt: "" },
      },
    ],
  },
  {
    slug: "basketball",
    title: "Basketball",
    rows: [
      {
        text: "I started playing at 12 and fell completely in love with the sport watching LeBron James dominate the 2016 playoffs for the Cavs. I captained my school team, stepped away during college, and picked it right back up after. Now I play in leagues around me.",
        photo: { src: "/about/basketball.mp4", alt: "Luka Doncic playing against the Bucks!", speed: 1 },
      },
    ],
  },
  {
    slug: "outdoors-gym",
    title: "Getting outside and the gym",
    rows: [
      {
        text: "Mostly walking and running along Lake Michigan. Anywhere with some nature, and I'm in. I find walks by the lake super calming, and they help me reflect :) The gym is about my own goals: staying healthy and athletic.",
        photo: { src: "/about/outdoors-gym.jpg", alt: "Washington Island" },
      },
    ],
  },
];

// Photo under the live patient monitor on the home page.
export const presenting = { src: "/landing/me_presenting.jpg", alt: "Vamsi presenting" };
export const presentingText = "Presenting my Capstone project (RL Studio) at the Senior Design Symposium";

export const openTo =
  "I'm open to PhD conversations and to research engineer or research assistant roles in clinical informatics.";

// Form endpoint (currently a Jotform URL; the name is historical). When null, the contact
// form falls back to opening the visitor's mail app.
export const formspreeEndpoint: string | null = "https://form.jotform.com/263026921100039";

// The PDF embedded and offered for download on /cv. The file lives at this path in /public.
export const cvHref = "/cv/Vamsi_Sudersanam_SWE.pdf";


// Shown on the home page as typed JSON (serialized with 2-space indentation). Dates stay out
// until confirmed (see content.md).
export const skillsJson = {
  computational_medicine_and_ml: [
    "Time-Series Modeling",
    "Deep Survival Frameworks",
    "Gradient Boosted Trees",
    "Explainable AI (SHAP)",
    "Signal Processing",
    "Reinforcement Learning",
  ],
  survival_analysis: {
    frameworks: [
      "Non-Linear Survival Models",
      "AFT & Cox Extensions",
      "DeepHit Estimators",
      "Random Survival Forests",
    ],
    impact: "NIV Failure Stratification",
  },
  clinical_informatics: [
    "EHR Data Mining",
    "MIMIC-IV Database",
    "eICU Database",
    "SICdb Database",
    "Cohort Selection Analytics",
  ],
  research_languages: ["Python (PyTorch)", "SQL (Cohort Extraction)", "R (Bioconductor)", "C/C++"],
  research_engineering: [
    "Cloud Compute (AWS)",
    "Docker Containerization",
    "FastAPI Architectures",
    "Git/GitHub Workflows",
  ],
  certifications: ["AWS Certified AI Prac.", "AWS Cloud Prac."],
};

// Credly profile listing the AWS badges, linked from the caption under the skills panel.
export const certVerifyUrl = "https://www.credly.com/users/vamsi-sudersanam";
