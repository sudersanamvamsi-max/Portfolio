export default function StepDivider() {
  return (
    <svg
      viewBox="0 0 600 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-4 w-full"
    >
      <path
        d="M0 1 H120 V5 H240 V8 H360 V11 H480 V15 H600"
        fill="none"
        stroke="var(--grid)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
