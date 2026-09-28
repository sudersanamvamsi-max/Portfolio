// Every value in SYNTHETIC_RECORD is invented for illustration. Field names mirror the
// study's tabular schema; no value comes from any patient record.
const DATA = {
  about_me: {
    name: "Vamsi Sudersanam",
    focus: "Machine learning for critical care ",
    also: "Researcher",
    applying_to: "PhD, biomedical informatics, Fall 2027",
  },
  synthetic_example_record: {
    _note: "Synthetic Data.",
    t0: 0,
    first_modality: "NIV",
    AgeOnAdmission: 64,
    saps3: 51,
    ROX_at_t0: 7.4,
    SpO2: 94.1,
    BGA_pH: 7.36,
    BGA_Lactate: 1.2,
    intub_72h: 0,
  },
};

const LINE = /^(\s*)(?:"([^"]+)": )?(.*)$/;

function Line({ text }: { text: string }) {
  const [, indent, key, rest] = text.match(LINE)!;
  const isValue = key !== undefined && !/^[{[]$/.test(rest);
  return (
    <div>
      {indent}
      {key !== undefined && <>&quot;{key}&quot;: </>}
      {isValue ? <span className="text-[#8fa9ff]">{rest.replace(/,$/, "")}</span> : rest}
      {isValue && rest.endsWith(",") ? "," : ""}
    </div>
  );
}

export default function CodeWindow() {
  const lines = JSON.stringify(DATA, null, 2).split("\n");
  return (
    <figure className="max-w-[68ch] overflow-hidden rounded-lg bg-[#101a22] text-[#e6edf1]">
      <div aria-hidden="true" className="flex gap-2 px-4 pt-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <pre
        tabIndex={0}
        aria-label="Profile as JSON, with an example record of synthetic values"
        className="overflow-x-auto px-4 pb-4 pt-3 font-mono text-[0.9375rem] leading-relaxed"
      >
        <code>
          {lines.map((l, i) => (
            <Line key={i} text={l} />
          ))}
        </code>
      </pre>
      <figcaption className="border-t border-white/10 px-4 py-2 font-sans text-sm text-[#9fb0bd]">
        Synthetic illustration. Field names follow my study tables; no values are patient data.
      </figcaption>
    </figure>
  );
}
