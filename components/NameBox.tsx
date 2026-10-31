"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Stage = "bin" | "scr" | "hex" | "letter";
type Plan = { stage: Stage; until: number }[];

const ROWS = [
  { text: "Vamsi", stagger: 140 },
  { text: "Sudersanam", stagger: 70 },
];

const TICK_MS = 60;
const MIN_FONT = 9; // px; below this the binary stage is skipped
const BIN_FONT = 9.1; // px; 8 bits at 0.6em each fill one 44 px slot
const BIN_SLOT_W = 44;
const PAD = 8; // px, each side
const ROW_H = 34; // px
const BOX_W = BIN_SLOT_W * ROWS[0].text.length + PAD * 2;
const BOX_H = ROW_H * ROWS.length + PAD * 2;
// While animating, letters are 18 px; once it ends they grow to FINAL_FONT so that
// "Sudersanam" (10 chars at 0.6em) fills the box width.
const FONT: Record<Stage, number> = { bin: BIN_FONT, scr: 14, hex: 14, letter: 18 };
const FINAL_FONT = 34; // px

// "scr" is scrambling hex pairs; it stands in for the binary stage where eight bits per
// character cannot fit (the long second row, or any row on a very narrow screen).
// Every slot runs the plan, starting `stagger` ms after the previous one, so the last letter
// lands at about 3.4 s.
const BIN_PLAN: Plan = [
  { stage: "bin", until: 2000 },
  { stage: "hex", until: 2800 },
];
const HEX_PLAN: Plan = [
  { stage: "scr", until: 2000 },
  { stage: "hex", until: 2800 },
];

function noise(tick: number, a: number, b: number) {
  return ((((tick * 7 + a * 13 + b * 5) * 2654435761) >>> 31) & 1) as 0 | 1;
}

function slotText(row: number, i: number, plan: Plan, elapsed: number, tick: number) {
  const ch = ROWS[row].text[i];
  const code = ch.charCodeAt(0);
  const t = elapsed - i * ROWS[row].stagger;
  const first = plan[0].stage;
  if (t < 0) return { stage: first, text: first === "bin" ? "00000000" : "00" };
  const cur = plan.find((p) => t < p.until);
  if (!cur) return { stage: "letter" as Stage, text: ch };
  const hex = code.toString(16).toUpperCase().padStart(2, "0");
  if (cur.stage === "hex") return { stage: "hex" as Stage, text: hex };
  if (cur.stage === "scr") {
    const d = (n: number) => "0123456789ABCDEF"[(tick * 5 + i * 3 + row * 7 + n * 11) % 16];
    return { stage: "scr" as Stage, text: d(0) + d(1) };
  }
  // Binary: bits settle left to right across the stage while the rest keep scrambling.
  const final = code.toString(2).padStart(8, "0");
  const settled = Math.floor((t / cur.until) * 8 * 1.6);
  let out = "";
  for (let b = 0; b < 8; b++) out += b < settled ? final[b] : String(noise(tick, i + row * 17, b));
  return { stage: "bin" as Stage, text: out };
}

export default function NameBox() {
  const pathname = usePathname();
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [plans, setPlans] = useState<Plan[]>([BIN_PLAN, HEX_PLAN]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const binaryFits = BIN_FONT >= MIN_FONT && BOX_W <= document.documentElement.clientWidth - 40;
    setPlans([binaryFits ? BIN_PLAN : HEX_PLAN, HEX_PLAN]);

    const end = 2800 + ROWS[0].stagger * (ROWS[0].text.length - 1) + 400;
    const t0 = performance.now();
    setElapsed(0);
    const id = window.setInterval(() => {
      const e = performance.now() - t0;
      if (e >= end) {
        window.clearInterval(id);
        setElapsed(null);
      } else {
        setElapsed(e);
      }
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const tick = elapsed === null ? 0 : Math.floor(elapsed / TICK_MS);

  return (
    <Link
      href="/"
      aria-label="Vamsi Sudersanam, home"
      aria-current={pathname === "/" ? "page" : undefined}
      className="block shrink-0 self-start overflow-hidden whitespace-nowrap border border-header-fg font-mono font-medium text-header-fg no-underline hover:bg-header-fg/10"
      style={{ width: BOX_W, height: BOX_H, padding: PAD }}
    >
      {ROWS.map((row, r) => (
        <span key={row.text} aria-hidden="true" className="flex items-center leading-none" style={{ height: ROW_H }}>
          {row.text.split("").map((ch, i) => {
            const s = elapsed === null ? { stage: "letter" as Stage, text: ch } : slotText(r, i, plans[r], elapsed, tick);
            const size = elapsed === null ? FINAL_FONT : FONT[s.stage];
            return (
              <span key={i} className="motion-safe:transition-[font-size] motion-safe:duration-500" style={{ fontSize: size }}>
                {s.text}
              </span>
            );
          })}
        </span>
      ))}
    </Link>
  );
}
