"use client";

import { type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type SliderArrowButtonProps = {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  "aria-label": string;
  className?: string;
};

export function SliderArrowButton({
  direction,
  disabled,
  onClick,
  "aria-label": ariaLabel,
  className,
}: SliderArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
        "border border-neon-red/40 bg-zinc-950/60 text-neon-red",
        "shadow-[0_2px_14px_hsl(0_0%_0%/0.45),0_0_0_1px_hsl(0_0%_100%/0.04)_inset]",
        "backdrop-blur-md transition-[border-color,background-color,box-shadow,color,opacity,transform] duration-200",
        "enabled:hover:border-neon-red/70 enabled:hover:bg-zinc-950/80 enabled:hover:text-neon-red enabled:hover:shadow-[0_0_20px_hsl(var(--neon-red)/0.15)]",
        "enabled:active:scale-[0.97] motion-reduce:enabled:active:scale-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/55 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950/90",
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none",
        className
      )}
    >
      {direction === "prev" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 -translate-x-px" aria-hidden>
          <path d="M14 6L8 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 translate-x-px" aria-hidden>
          <path d="M10 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
