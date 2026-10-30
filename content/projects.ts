// Transcribed by hand from content.md, which stays the source of truth.
// "TODO" strings render visibly on the page.
//
// Thumbnails: drop a file in /public/projects/ and set `media` (e.g. src: "/projects/rl-studio.gif").
// For a clip, set `video` (e.g. "/projects/rl-studio.mp4"); `src` is then unused, `still` is the poster.
// Projects without `media` show a labelled placeholder.

export type Project = {
  slug: string;
  title: string;
  dates: string;
  role?: string;
  stack?: string;
  summary: string;
  built?: string[];
  // `still` is a static frame shown to visitors who prefer reduced motion.
  media?: { src: string; alt: string; still?: string; video?: string };
  mediaTodo: string;
  link?: { href: string; label: string };
  linkTodo?: string;
  // A sentence or two in your own words on why you built it or what you enjoyed about it.
  // Not in content.md yet, so it renders as a visible TODO until filled in.
  whyBuilt?: string;
  whyBuiltTodo: string;
};

export const projectsFraming =
  "Production test automation at Real Time Automation and a full-stack deep RL training platform.";

export const projects: Project[] = [
  {
    slug: "rl-studio",
    title: "RL Studio",
    dates: "May 2025 – Mar 2026",
    role: "MSOE senior design",
    stack: "Next.js, TypeScript, Tailwind, FastAPI, PyTorch, Stable-Baselines3, Gymnasium, VisX, GitHub Actions",
    summary:
      "An educational web app for configuring and launching Atari agent training with DQN, Rainbow, and PPO, playing the same games live in the browser, and viewing training analytics.",
    built: [
      "FastAPI backend with REST endpoints to create, reset, step, and render Gymnasium environments, plus a WebSocket stream for live frames and rewards during training.",
      "Config-driven training service wrapping Stable-Baselines3, with user-configurable hyperparameters, eval/checkpoint callbacks, and JSON progress logging.",
      "Next.js + React + TypeScript + Tailwind frontend with guided hyperparameter tuning, real-time training charts, and live game playback; GitHub Actions CI for ESLint, Prettier, and TypeScript checks.",
    ],
    mediaTodo: "short screen recording or GIF of training and live playback",
    linkTodo: "link to repo or demo",
    whyBuilt:
      "I chose RL Studio for my team because reinforcement learning is showing up in almost every field, yet its jargon scares a lot of people away before they ever try it. We built a platform where anyone, technical or not, can learn by doing: configure hyperparameters, train real agents, and get help from a built-in LLM assistant and plain-language pop-ups for every term.",
    whyBuiltTodo: "why you took this on / what you enjoyed about building it",
  },
  {
    slug: "regression-pipeline",
    title: "Automated regression pipeline",
    dates: "May 2025 – May 2026",
    role: "Software Engineer Intern, Real Time Automation",
    summary:
      "Designed an unattended nightly pipeline (crontab + Allure) running 300+ regression tests across 7 industrial protocols and publishing trend reports to engineers' network drives, viewable in Azure DevOps, replacing manual test runs for 30+ engineers and enabling failure analysis across releases.",
    built: [
      "Wrote the majority of the regression suite (MQTT, HTTP/S, SQL, FTP, WebSockets, email, Modbus, PLC read/write, Selenium front-end checks) for the company's IoT Historian product; took part in weekly code review on Azure DevOps.",
    ],
    mediaTodo: "a screenshot of an Allure trend report with no company data, or a diagram of the nightly flow",
    whyBuilt:
      "The Historian had 300+ tests and a full run took over six hours, so every code change meant a long wait to find out whether it broke something. I built a pipeline that runs the full suite overnight (8 pm to 6 am), stores results in MongoDB, and publishes Allure reports to each engineer's network drive and to Azure DevOps, so the team can see exactly what failed, rerun individual tests, and filter by product area.",
    whyBuiltTodo: "why you took this on / what you enjoyed about building it",
  },
  {
    slug: "gpt-from-scratch",
    title: "GPT from scratch",
    dates: "Sep 2026",
    stack: "Python, PyTorch",
    summary:
      "A GPT-style decoder-only transformer implemented from scratch in PyTorch, following Andrej Karpathy's *Let's build GPT* lecture (token and positional embeddings, multi-head causal self-attention, pre-norm residual blocks, feed-forward layers with dropout) without high-level transformer libraries.",
    built: [
      "Trained character-level with AdamW, tracking train/validation loss to diagnose overfitting; scaled from a bigram baseline to a multi-layer transformer.",
    ],
    mediaTodo: "a sample of generated text and a loss-curve image",
    linkTodo: "GitHub repo URL",
    whyBuilt:
      "I wanted to actually understand how transformers work, the algorithm underneath every LLM, instead of just calling everything \"AI\" or \"GPT.\"",
    whyBuiltTodo: "why you took this on / what you enjoyed about building it",
  },
  {
    slug: "repair-workflow",
    title: "Repair workflow automation",
    dates: "Feb 2023 – May 2026",
    role: "Student Manager, MSOE IT Help Desk",
    stack: "Power Automate, SharePoint",
    summary:
      "Built a Power Automate + SharePoint pipeline that takes laptop asset tags, pulls device metadata from a central tracker, and drafts vendor repair emails, saving 4 hours of manual work each week. Managed scheduling, training, and device QA for 20+ student technicians.",
    mediaTodo: "a screenshot or short clip of the flow running on dummy asset tags",
    whyBuilt:
      "Automating vendor repair requests saved four hours of manual work every week. It also gave me a reason to learn a new stack, and I put the time it freed up into my research.",
    whyBuiltTodo: "why you took this on / what you enjoyed about building it",
  },
];
