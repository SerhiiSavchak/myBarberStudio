"use client";

import { useEffect, useState, useRef } from "react";

/** Minimum loader display time — avoids flash, feels intentional */
const MIN_DURATION_MS = 800;
/** Exit fade duration */
const EXIT_DURATION = 400;

/**
 * Readiness detection:
 * - document.readyState === "complete" — DOM + all subresources loaded
 * Loader hides as soon as page is ready, but never before MIN_DURATION_MS.
 * CSS-only animations — no Framer Motion, reduces main bundle.
 */
export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const start = performance.now();

    const scheduleHide = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);
      timersRef.current.push(
        setTimeout(() => {
          setExiting(true);
          timersRef.current.push(
            setTimeout(() => setVisible(false), EXIT_DURATION)
          );
        }, remaining)
      );
    };

    if (document.readyState === "complete") {
      scheduleHide();
    } else {
      window.addEventListener("load", scheduleHide);
    }

    return () => {
      window.removeEventListener("load", scheduleHide);
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader fixed inset-0 z-[9999] flex items-center justify-center bg-background cyber-grid ${exiting ? "site-loader-exit" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-neon-red/20" />
      <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-neon-red/20" />
      <div className="absolute bottom-6 left-6 h-10 w-10 border-l border-b border-neon-red/20" />
      <div className="absolute right-6 bottom-6 h-10 w-10 border-r border-b border-neon-red/20" />

      <span className="site-loader-tag absolute left-6 top-20 font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/40">
        LVIV DISTRICT 07
      </span>

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <path
              d="M50 8 L92 88 L8 88 Z"
              fill="none"
              stroke="hsl(var(--neon-red))"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="site-loader-path"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--neon-red) / 0.5))",
              }}
            />
          </svg>

          <div className="site-loader-glow absolute inset-0 flex items-center justify-center">
            <div
              className="h-16 w-16"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--neon-red) / 0.4) 0%, transparent 70%)",
              }}
            />
          </div>

          <span className="site-loader-logo-text absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-neon-red">
            {"M&Y"}
          </span>
        </div>

        <span className="site-loader-subtitle font-mono text-[9px] uppercase tracking-[0.6em] text-foreground/40">
          Barber Studio
        </span>

        <div className="site-loader-init flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-neon-cyan/40">
            SYSTEM INITIALIZING...
          </span>
          <div className="mt-2 h-px w-40 overflow-hidden bg-border/30">
            <div
              className="site-loader-bar h-full bg-neon-red/60"
              style={{ boxShadow: "0 0 8px hsl(var(--neon-red) / 0.4)" }}
            />
          </div>
        </div>
      </div>

      <div
        className="site-loader-scanline absolute left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(var(--neon-red) / 0.5) 50%, transparent 90%)",
        }}
      />

      <div
        className="site-loader-scanline-2 absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 20%, hsl(var(--neon-cyan) / 0.3) 50%, transparent 80%)",
        }}
      />

      <div
        className="site-loader-flash absolute inset-0 mix-blend-screen"
        style={{ background: "hsl(var(--neon-red) / 0.2)" }}
      />

      <span className="site-loader-serial absolute bottom-6 right-6 font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground">
        SN-2077-MYB-001
      </span>

      <div className="site-loader-dots absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {[0, 1, 2].map((d) => (
          <div
            key={d}
            className="site-loader-dot h-1 w-1 bg-neon-red/50"
            style={{ animationDelay: `${d * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
