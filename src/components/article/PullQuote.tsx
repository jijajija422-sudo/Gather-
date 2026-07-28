import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

export default function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="my-8 pl-6 pr-4 py-4 border-l-4 border-sage bg-sage-muted rounded-r-xl" id="pull-quote">
      <p className="font-serif text-xl italic leading-relaxed text-ink">
        {children}
      </p>
      {attribution && (
        <cite className="mt-3 block text-sm font-sans text-ink-light not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}
