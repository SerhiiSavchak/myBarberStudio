"use client";

import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile";
}

export default function ThemeToggle({ variant = "desktop" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle-mobile flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded border border-neon-red/20 bg-card/80 px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-neon-red/40 hover:bg-neon-red/5 active:border-neon-red/50 cursor-pointer select-none touch-manipulation"
        aria-label={theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
      >
        <span className={cn("transition-colors duration-300", theme === "dark" ? "text-muted-foreground" : "text-neon-red")}>
          DARK
        </span>
        <span className="relative h-4 w-7 rounded-full border border-neon-red/25 bg-muted transition-colors duration-300">
          <span
            className={cn(
              "absolute top-1 h-2 w-2 rounded-full bg-neon-red transition-all duration-300",
              theme === "dark" ? "left-1" : "left-3.5"
            )}
            style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }}
          />
        </span>
        <span className={cn("transition-colors duration-300", theme === "light" ? "text-neon-red" : "text-muted-foreground")}>
          LIGHT
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle flex items-center gap-1.5 rounded border border-neon-red/15 bg-background/60 px-2.5 py-1.5 transition-all duration-300 hover:border-neon-red/30 hover:bg-background/80 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/50"
      aria-label={theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded transition-colors duration-300",
          theme === "dark" ? "bg-neon-red/15 text-neon-red" : "text-muted-foreground"
        )}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M13.36 11.36a6 6 0 01-8.72-8.72A6 6 0 1013.36 11.36z" />
        </svg>
      </span>
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded transition-colors duration-300",
          theme === "light" ? "bg-neon-red/15 text-neon-red" : "text-muted-foreground"
        )}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
        </svg>
      </span>
    </button>
  );
}
