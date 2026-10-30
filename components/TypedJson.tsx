"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const DURATION_MS = 3000;

type Token = { text: string; cls: string };

const TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}[\],:]|\s+/g;

// Colors are chosen per token first, so they stay correct while the text is revealed.
function tokenize(json: string): Token[] {
  const tokens: Token[] = [];
  for (const m of json.matchAll(TOKEN)) {
    const [text, str, colon] = m;
    if (str !== undefined && colon !== undefined) {
      tokens.push({ text: str, cls: "text-[#9fd3c7]" });
      tokens.push({ text: colon, cls: "text-[#9fb0bd]" });
    } else if (str !== undefined) {
      tokens.push({ text, cls: "text-[#8fa9ff]" });
    } else if (/^(true|false|null|-?\d)/.test(text)) {
      tokens.push({ text, cls: "text-[#e0b85c]" });
    } else {
      tokens.push({ text, cls: "text-[#9fb0bd]" });
    }
  }
  return tokens;
}

function render(tokens: Token[], count: number): ReactNode[] {
  const out: ReactNode[] = [];
  let left = count;
  for (let i = 0; i < tokens.length && left > 0; i++) {
    const { text, cls } = tokens[i];
    out.push(
      <span key={i} className={cls}>
        {left >= text.length ? text : text.slice(0, left)}
      </span>,
    );
    left -= text.length;
  }
  return out;
}

export default function TypedJson({
  data,
  label,
  caption,
}: {
  data: unknown;
  label: string;
  caption: ReactNode;
}) {
  const json = JSON.stringify(data, null, 2);
  const tokens = tokenize(json);
  const total = json.length;

  const [count, setCount] = useState(0);
  const [animated, setAnimated] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const started = useRef(false);

  const finish = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    started.current = true;
    setCount(total);
  }, [total]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimated(false);
      setCount(total);
      return;
    }
    const box = boxRef.current;
    if (!box) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        observer.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - t0) / DURATION_MS);
          setCount(Math.ceil(progress * total));
          frame.current = progress < 1 ? requestAnimationFrame(step) : null;
        };
        frame.current = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(box);

    return () => {
      observer.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [total]);

  return (
    <figure className="max-w-[68ch] overflow-hidden rounded-lg bg-[#101a22] text-[#e6edf1]">
      <div aria-hidden="true" className="flex gap-2 px-4 pt-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <div
        ref={boxRef}
        tabIndex={0}
        role="group"
        aria-label={label}
        onClick={finish}
        onKeyDown={finish}
        className="relative overflow-x-auto px-4 pb-4 pt-3 font-mono text-[0.9375rem] leading-relaxed"
      >
        {/* Full text, invisible: sets the final size and is what screen readers read. */}
        <pre className="whitespace-pre opacity-0">
          <code>{json}</code>
        </pre>
        <pre aria-hidden="true" className="absolute left-4 top-3 whitespace-pre">
          <code>
            {render(tokens, count)}
            {animated && <span className="typed-cursor" />}
          </code>
        </pre>
      </div>
      <figcaption className="border-t border-white/10 px-4 py-2 font-sans text-sm text-[#9fb0bd]">
        {caption}
      </figcaption>
    </figure>
  );
}
