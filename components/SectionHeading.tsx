"use client";

import { cn } from "@/lib/utils";
import { useSectionInView } from "@/hooks/use-section-in-view";

interface SectionHeadingProps {
  tag: string;
  title: string;
  description?: string;
  id?: string;
}

export default function SectionHeading({ tag, title, description, id }: SectionHeadingProps) {
  const { ref, inView } = useSectionInView();
  const inViewClass = inView ? "in-view" : "";

  return (
    <div ref={ref} id={id} className="ui-decorative mb-10 flex w-full min-w-0 flex-col items-start pb-6">
      {/*
        Full-width moving accent: parent section’s .glitch-divider (globals.css).
        Short line by the tag: static only.
      */}
      <div className="mb-4 flex w-full min-w-0 items-center gap-3">
        <div className="section-top-tag-line section-line-wrap section-line-wrap--sm shrink-0" aria-hidden>
          <div className="section-line-base section-top-tag-line__base" />
        </div>
        <div className={cn("flex min-w-0 items-center gap-3 scroll-reveal-x", inViewClass)}>
          <span className="section-tag font-mono text-[9px] uppercase tracking-[0.5em] text-neon-red/60 select-none">
            {tag}
          </span>
          <span className={cn("h-1 w-1 shrink-0 bg-neon-red/40", inView && "animate-pulse-red")} />
        </div>
      </div>

      <h2
        className={cn(
          "section-heading font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.2] tracking-[0.03em] text-foreground scroll-reveal select-none",
          inViewClass
        )}
        style={{ textWrap: "balance", transitionDelay: inView ? "0.1s" : "0s" }}
      >
        <span className="glitch-heading" data-text={title}>
          {title}
        </span>
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 max-w-lg font-body text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.65] text-muted-foreground scroll-reveal",
            inViewClass
          )}
          style={{ transitionDelay: inView ? "0.3s" : "0s" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
