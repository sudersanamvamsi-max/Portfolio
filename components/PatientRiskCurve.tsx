"use client";

import { useEffect, useRef, useState } from "react";

// Live hero visual: a synthetic patient's risk score, generated in code and updated once a
// second, scrolling like a bedside monitor. No value is ever a real reading — every vital
// is a mean-reverting random walk, and the risk score is a toy logistic function of them,
// not my model's output.
const WINDOW = 30; // minutes of monitoring visible at once
const TICK_MS = 1000; // one simulated minute arrives per second
const X0 = 0;
const X1 = 700;
const END_X = 800;
const Y_TOP = 20;
const Y_SCALE = 155;
const BASELINE_Y = 192;

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

type Vitals = { spo2: number; fio2: number; pH: number; lactate: number };
type Reading = { risk: number; spo2: number; fio2: number };

function risk(v: Vitals) {
  const z = 0.09 * (96 - v.spo2) + 6 * (v.fio2 - 0.3) + 0.35 * v.lactate + 9 * (7.4 - v.pH) - 2.6;
  return 1 / (1 + Math.exp(-z));
}

// One mean-reverting random-walk step toward the current clinical-course target.
function step(v: Vitals, target: Vitals, rand: () => number): Vitals {
  return {
    spo2: clamp(v.spo2 + (target.spo2 - v.spo2) * 0.15 + (rand() - 0.5) * 1.4, 80, 99),
    fio2: clamp(v.fio2 + (target.fio2 - v.fio2) * 0.1 + (rand() - 0.5) * 0.02, 0.21, 0.9),
    pH: clamp(v.pH + (target.pH - v.pH) * 0.1 + (rand() - 0.5) * 0.008, 7.15, 7.45),
    lactate: clamp(v.lactate + (target.lactate - v.lactate) * 0.1 + (rand() - 0.5) * 0.12, 0.5, 6),
  };
}

// Every so often the simulated "clinical course" shifts to a new target the vitals drift
// toward, so the trajectory trends up and down instead of just wandering around one point.
function randomTarget(rand: () => number): Vitals {
  return {
    spo2: 88 + rand() * 10,
    fio2: 0.3 + rand() * 0.4,
    pH: 7.28 + rand() * 0.14,
    lactate: 0.8 + rand() * 2.5,
  };
}

function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]} ${pts[0][1]}` : "";
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    d += ` Q${x0.toFixed(1)} ${y0.toFixed(1)} ${((x0 + x1) / 2).toFixed(1)} ${((y0 + y1) / 2).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

// Seeds a full window of readings from a fixed seed, so the exported HTML (before any JS
// runs) already shows a complete chart instead of one dot growing into a line.
function seedState() {
  const rand = rng(7);
  let vitals: Vitals = { spo2: 95, fio2: 0.32, pH: 7.38, lactate: 1.1 };
  let target = randomTarget(rand);
  const history: Reading[] = [];
  for (let i = 0; i < WINDOW; i++) {
    vitals = step(vitals, target, rand);
    if (rand() < 0.08) target = randomTarget(rand);
    history.push({ risk: risk(vitals), spo2: vitals.spo2, fio2: vitals.fio2 });
  }
  return { history, vitals, target };
}

export default function PatientRiskCurve() {
  const seed = useRef<ReturnType<typeof seedState> | null>(null);
  if (seed.current === null) seed.current = seedState();

  const [history, setHistory] = useState<Reading[]>(seed.current.history);
  const [running, setRunning] = useState(true);
  const sim = useRef({ vitals: seed.current.vitals, target: seed.current.target });

  // Respect prefers-reduced-motion: start paused for anyone who asked for less motion.
  // Checked in an effect (client-only) rather than in useState's initializer, so the
  // server-rendered and first client render stay identical and hydration doesn't warn.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (document.hidden) return; // don't burn cycles in a background tab
      const s = sim.current;
      if (Math.random() < 0.08) s.target = randomTarget(Math.random);
      s.vitals = step(s.vitals, s.target, Math.random);
      const reading: Reading = { risk: risk(s.vitals), spo2: s.vitals.spo2, fio2: s.vitals.fio2 };
      setHistory((prev) => [...prev.slice(-(WINDOW - 1)), reading]);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  const x = (i: number) => X0 + (i / (WINDOW - 1)) * (X1 - X0);
  const y = (r: number) => Y_TOP + (1 - r) * Y_SCALE;
  const linePoints: [number, number][] = history.map((h, i) => [x(i), y(h.risk)]);
  const path = smoothPath(linePoints);
  const latest = history[history.length - 1];
  const lastPoint = linePoints[linePoints.length - 1];

  return (
    <figure>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-sans text-sm text-muted">Live synthetic patient monitor</p>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="font-sans text-sm text-cohort-a underline underline-offset-2 hover:no-underline"
        >
          {running ? "Pause" : "Resume"}
        </button>
      </div>
      <svg
        viewBox="0 0 800 200"
        preserveAspectRatio="xMinYMid meet"
        aria-hidden="true"
        className="mt-2 h-24 w-full sm:h-40 md:h-52"
      >
        <line x1="0" y1={BASELINE_Y} x2={END_X} y2={BASELINE_Y} stroke="var(--grid)" strokeWidth="1.5" />
        <path d={path} fill="none" stroke="var(--cohort-a)" strokeWidth="3" strokeLinecap="round" />
        {lastPoint && <circle cx={lastPoint[0]} cy={lastPoint[1]} r={4.5} fill="var(--cohort-a)" />}
      </svg>
      <figcaption className="mt-2 max-w-measure font-sans text-sm text-muted">
        {latest && (
          <>
            Simulated risk {Math.round(latest.risk * 100)}%, SpO2 {latest.spo2.toFixed(0)}%, FiO2{" "}
            {(latest.fio2 * 100).toFixed(0)}%.{" "}
          </>
        )}
        A synthetic patient generated in code, updated every second. Risk is a toy function of
        the vitals for illustration, not my model&apos;s output, and no value is patient data.
      </figcaption>
    </figure>
  );
}
