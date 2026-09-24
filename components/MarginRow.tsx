import type { ReactNode } from "react";

type MarginRowProps = {
  margin: ReactNode;
  children: ReactNode;
};

export default function MarginRow({ margin, children }: MarginRowProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-1 md:grid-cols-[12rem_minmax(0,68ch)]">
      <div className="font-sans text-sm leading-6 text-muted md:pt-1.5">{margin}</div>
      <div className="max-w-[68ch]">{children}</div>
    </div>
  );
}
