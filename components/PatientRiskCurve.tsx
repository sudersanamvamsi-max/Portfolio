"use client";

import { useEffect, useRef, useState } from "react";

// Live hero visual: a synthetic patient's risk score, generated in code and updated once a
// second, scrolling like a bedside monitor. No value is ever a real reading — every vital
// is a mean-reverting random walk, and the risk score is a toy logistic function of them,
// not my model's output.
const WINDOW = 30; // minutes of monitoring visible at once
const TICK_MS = 1000; // one simulated minute arrives per second
const CX1 = 700; // risk curve plot area (viewBox 800x200)
const CEND = 800;
const CTOP = 20;
const CSCALE = 155;
const CBASE = 192;
const SW = 100; // sparkline viewBox width
const SH = 28; // sparkline viewBox height
const PAD = 3;

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

type Tile = {
  label: string;
  value: string;
  status: string;
  color: string;
  series: number[];
  lo: number;
  hi: number;
  band?: [number, number]; // target range shaded behind the line
};

function Sparkline({ tile }: { tile: Tile }) {
  const y = (v: number) => PAD + (1 - (clamp(v, tile.lo, tile.hi) - tile.lo) / (tile.hi - tile.lo)) * (SH - 2 * PAD);
  const pts: [number, number][] = tile.series.map((v, i) => [(i / (WINDOW - 1)) * SW, y(v)]);
  return (
    <svg viewBox={`0 0 ${SW} ${SH}`} preserveAspectRatio="none" aria-hidden="true" className="block h-8 w-full">
      {tile.band && (
        <rect x="0" y={y(tile.band[1])} width={SW} height={y(tile.band[0]) - y(tile.band[1])} fill="var(--grid)" opacity="0.6" />
      )}
      <path
        d={smoothPath(pts)}
        fill="none"
        stroke={tile.color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function riskStatus(r: number) {
  return r >= 0.5 ? "Elevated" : r >= 0.3 ? "Moderate" : "Low";
}

function spo2Status(v: number) {
  return v >= 94 ? "In range" : v >= 90 ? "Watch" : "Low";
}

function fio2Status(series: number[]) {
  const d = series[series.length - 1] - series[Math.max(0, series.length - 6)];
  return Math.abs(d) < 0.03 ? "Stable" : d > 0 ? "Rising" : "Falling";
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

  const latest = history[history.length - 1];
  const fio2Series = history.map((h) => h.fio2);
  const tiles: Tile[] = [
    {
      label: "Risk",
      value: `${Math.round(latest.risk * 100)}%`,
      status: riskStatus(latest.risk),
      color: "var(--cohort-a)",
      series: history.map((h) => h.risk),
      lo: 0,
      hi: 1,
    },
    {
      label: "SpO2",
      value: `${latest.spo2.toFixed(0)}%`,
      status: spo2Status(latest.spo2),
      color: "var(--cohort-b)",
      series: history.map((h) => h.spo2),
      lo: 80,
      hi: 100,
      band: [94, 100],
    },
    {
      label: "FiO2",
      value: `${(latest.fio2 * 100).toFixed(0)}%`,
      status: fio2Status(fio2Series),
      color: "var(--muted)",
      series: fio2Series,
      lo: 0.2,
      hi: 0.9,
    },
  ];

  const cx = (i: number) => (i / (WINDOW - 1)) * CX1;
  const cy = (r: number) => CTOP + (1 - r) * CSCALE;
  const curve: [number, number][] = history.map((h, i) => [cx(i), cy(h.risk)]);
  const tip = curve[curve.length - 1];

  return (
    <figure>
      <p className="font-sans text-sm text-muted">Live synthetic patient monitor</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="border border-grid p-4">
            <div className="flex items-baseline justify-between gap-2 font-sans text-sm">
              <span className="text-muted">{t.label}</span>
              <span className="text-muted">{t.status}</span>
            </div>
            <p className="mt-1 mb-2 font-sans text-2xl font-medium leading-tight">{t.value}</p>
            <Sparkline tile={t} />
          </div>
        ))}
      </div>
      <svg
        viewBox="0 0 800 200"
        preserveAspectRatio="xMinYMid meet"
        role="img"
        aria-label={`Simulated risk over the last ${WINDOW} minutes, currently ${Math.round(latest.risk * 100)}%`}
        className="mt-4 h-24 w-full sm:h-40 md:h-52"
      >
        <line x1="0" y1={CBASE} x2={CEND} y2={CBASE} stroke="var(--grid)" strokeWidth="1.5" />
        <path d={smoothPath(curve)} fill="none" stroke="var(--cohort-a)" strokeWidth="3" strokeLinecap="round" />
        <circle cx={tip[0]} cy={tip[1]} r={4.5} fill="var(--cohort-a)" />
      </svg>
      <figcaption className="mt-3 max-w-measure font-sans text-sm text-muted">
        A synthetic patient generated in code, updated every second. Risk is a toy function of
        the vitals for illustration.
      </figcaption>
    </figure>
  );
}
