// Decorative step function. Hard-coded for visual balance; not real data.
const STEPS: ReadonlyArray<readonly [number, number]> = [
  [0, 20],
  [90, 45],
  [200, 75],
  [300, 95],
  [430, 125],
  [560, 140],
  [700, 165],
];
const END_X = 800;
const CENSOR_TICKS: ReadonlyArray<readonly [number, number]> = [
  [50, 20],
  [260, 75],
  [370, 95],
  [620, 140],
];

const path =
  `M${STEPS[0][0]} ${STEPS[0][1]}` +
  STEPS.slice(1)
    .map(([x, y]) => ` H${x} V${y}`)
    .join("") +
  ` H${END_X}`;

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
        strokeWidth="4"
      />
      {CENSOR_TICKS.map(([x, y], i) => (
        <line
          key={x}
          x1={x}
          y1={y - 8}
          x2={x}
          y2={y + 8}
          className="curve-tick"
          style={{ animationDelay: `${1.3 + i * 0.15}s` }}
          stroke="var(--cohort-a)"
          strokeWidth="4"
        />
      ))}
    </svg>
  );
}
