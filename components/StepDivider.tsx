export default function StepDivider() {
  return (
    <svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-5 w-1/4 min-w-40"
    >
      <path
        d="M0 2 H50 V8 H100 V13 H150 V18 H200"
        fill="none"
        stroke="var(--grid)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
