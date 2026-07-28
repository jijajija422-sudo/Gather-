import type { ReactNode } from "react";

interface DataBoxProps {
  title?: string;
  children: ReactNode;
}

export default function DataBox({ title, children }: DataBoxProps) {
  return (
    <div className="my-8 rounded-2xl bg-cream-dark border border-ink/5 overflow-hidden" id="data-box">
      {title && (
        <div className="px-6 py-3 border-b border-ink/5 bg-cream-dark">
          <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
        </div>
      )}
      <div className="px-6 py-5 text-ink">
        {children}
      </div>
    </div>
  );
}
