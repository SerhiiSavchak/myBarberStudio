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
    <div ref={ref} id={id} className="mb-16 flex flex-col items-start">
      <div className={cn("mb-4 flex items-center gap-3 scroll-reveal-x", inViewClass)}>
        <span
          className={cn(
            "block h-px w-10 bg-neon-red/60 scroll-reveal-scale-x origin-left",
            inViewClass
          )}
          style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.3)", transitionDelay: inView ? "0.2s" : "0s" }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-neon-red/60">
          {tag}
        </span>
        <span className={cn("h-1 w-1 bg-neon-red/40", inView && "animate-pulse-red")} />
      </div>

      <div className="relative overflow-visible">
        <h2
          className={cn(
            "font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.2] tracking-[0.03em] text-foreground scroll-reveal",
            inViewClass
          )}
          style={{ textWrap: "balance", transitionDelay: inView ? "0.15s" : "0s" }}
        >
          <span className="glitch-heading" data-text={title}>
            {title}
          </span>
        </h2>
        <div
          className="absolute left-0 right-0 h-[2px] bg-neon-red/30 transition-all duration-[0.6s]"
          style={{
            boxShadow: "0 0 10px hsl(var(--neon-red) / 0.3)",
            top: inView ? "100%" : "0",
            opacity: inView ? 1 : 0,
            transitionDelay: inView ? "0.3s" : "0s",
          }}
        />
      </div>

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

      <div
        className={cn(
          "mt-10 h-px w-full max-w-xs origin-left scroll-reveal-scale-x",
          inViewClass
        )}
        style={{
          background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)",
          boxShadow: "0 0 8px hsl(var(--neon-red) / 0.15)",
          transitionDelay: inView ? "0.4s" : "0s",
        }}
      />
    </div>
  );
}
