"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAME = "VAMSI";
const SLOT_W = 44; // px; the box never changes size
const BOX_PAD = 8; // px, each side
const MIN_FONT = 9; // px; below this the binary stage is skipped
const STAGGER_MS = 100;
const TICK_MS = 60;

type Stage = "bin" | "hex" | "letter";

// Every slot runs the same stages; slot i starts i * STAGGER_MS later. The last letter lands
// at about 2.4 s.
const WITH_BINARY: { stage: Stage; until: number }[] = [
  { stage: "bin", until: 1400 },
  { stage: "hex", until: 2000 },
];
const HEX_ONLY: { stage: Stage; until: number }[] = [{ stage: "hex", until: 1000 }];

const FONT_PX: Record<Stage, number> = { bin: Math.floor((SLOT_W / (8 * 0.6)) * 10) / 10, hex: 18, letter: 24 };
const BOX_W = SLOT_W * NAME.length + BOX_PAD * 2;

function bits(code: number) {
  return code.toString(2).padStart(8, "0");
}

function slotText(i: number, elapsed: number, plan: typeof WITH_BINARY, tick: number) {
  const t = elapsed - i * STAGGER_MS;
  const code = NAME.charCodeAt(i);
  if (t < 0) return { stage: plan[0].stage, text: plan[0].stage === "bin" ? "".padEnd(8, "0") : "  " };
  const current = plan.find((p) => t < p.until);
  if (!current) return { stage: "letter" as Stage, text: NAME[i] };
  if (current.stage === "hex") {
    return { stage: "hex" as Stage, text: code.toString(16).toUpperCase().padStart(2, "0") };
  }
  // Binary: bits settle left to right across the stage while the rest keep scrambling.
  const settled = Math.floor((t / current.until) * 8 * 1.6);
  const final = bits(code);
  let out = "";
  for (let b = 0; b < 8; b++) {
    out += b < settled ? final[b] : String((((tick * 7 + i * 13 + b * 5) * 2654435761) >>> 31) & 1);
  }
  return { stage: "bin" as Stage, text: out };
}

export default function NameBox() {
  const pathname = usePathname();
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [plan, setPlan] = useState(WITH_BINARY);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const binaryFits =
      FONT_PX.bin >= MIN_FONT && BOX_W <= document.documentElement.clientWidth - 40;
    const chosen = binaryFits ? WITH_BINARY : HEX_ONLY;
    setPlan(chosen);

    const end = chosen[chosen.length - 1].until + STAGGER_MS * (NAME.length - 1) + 400;
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
      aria-current={pathname === "/" ? "page" : undefined}
      aria-label="Vamsi Sudersanam, home"
      className="group flex shrink-0 flex-col items-start gap-1.5 self-start text-ink no-underline"
    >
      <span
        className="inline-flex h-10 items-center overflow-hidden whitespace-nowrap border border-ink font-mono font-medium group-hover:bg-grid/40"
        style={{ width: BOX_W, paddingInline: BOX_PAD }}
      >
      {NAME.split("").map((letter, i) => {
        const s = elapsed === null ? { stage: "letter" as Stage, text: letter } : slotText(i, elapsed, plan, tick);
        return (
          <span
            key={i}
            aria-hidden="true"
            className="block text-center leading-none"
            style={{ width: SLOT_W, fontSize: FONT_PX[s.stage] }}
          >
            {s.text}
          </span>
        );
      })}
      </span>
      <span aria-hidden="true" className="font-sans text-sm font-medium leading-tight">
        Vamsi
        <br />
        Sudersanam
      </span>
    </Link>
  );
}
