// Decorative Kaplan-Meier curve computed from synthetic time-to-event data with a fixed seed.
// Every subject is simulated in code; no value comes from any patient record.
const N = 60;
const HORIZON = 10;
const X0 = 0;
const X1 = 700;
const END_X = 800;
const Y_TOP = 20;
const Y_SCALE = 160;

// mulberry32: small seeded PRNG so server and client render the same curve.
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCurve() {
  const rand = rng(11);
  // Weibull event times with shape < 1 (hazard highest early), plus independent censoring.
  const subjects = Array.from({ length: N }, () => {
    const event = 8 * Math.pow(-Math.log(1 - rand()), 1 / 0.7);
    const censor = 1 + rand() * 13;
    return { t: Math.min(event, censor), failed: event <= censor };
  })
    .filter((s) => s.t <= HORIZON)
    .sort((a, b) => a.t - b.t);

  const x = (t: number) => X0 + (t / HORIZON) * (X1 - X0);
  const y = (s: number) => Y_TOP + (1 - s) * Y_SCALE;

  let atRisk = N;
  let surv = 1;
  let d = `M${X0} ${y(1)}`;
  const ticks: [number, number][] = [];
  for (const s of subjects) {
    if (s.failed) {
      surv *= 1 - 1 / atRisk;
      d += ` H${x(s.t).toFixed(1)} V${y(surv).toFixed(1)}`;
    } else {
      ticks.push([x(s.t), y(surv)]);
    }
    atRisk -= 1;
  }
  return { path: d + ` H${END_X}`, ticks };
}

const { path, ticks: CENSOR_TICKS } = buildCurve();

export default function HeroCurve() {
  return (
    <svg
      viewBox="0 0 800 200"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      className="h-24 w-full sm:h-40 md:h-52"
    >
      <line x1="0" y1="192" x2={END_X} y2="192" stroke="var(--grid)" strokeWidth="1.5" />
      <path
        d={path}
        pathLength={1}
        className="curve-path"
        fill="none"
        stroke="var(--cohort-a)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {CENSOR_TICKS.map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y - 7}
          x2={x}
          y2={y + 7}
          className="curve-tick"
          style={{ animationDelay: `${1.0 + (i / CENSOR_TICKS.length) * 0.5}s` }}
          stroke="var(--cohort-a)"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}
