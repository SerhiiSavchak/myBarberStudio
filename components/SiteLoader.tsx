"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Minimum loader display time — avoids flash, feels intentional */
const MIN_DURATION_MS = 800;
/** Exit fade duration */
const EXIT_DURATION = 0.4;

/**
 * Readiness detection:
 * - document.readyState === "complete" — DOM + all subresources (images, fonts, scripts) loaded
 * - window "load" event — fires when readyState becomes "complete"
 * Loader hides as soon as page is ready, but never before MIN_DURATION_MS.
 */
export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const start = performance.now();

    // Phases — full sequence ~700ms
    timersRef.current = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 250),
      setTimeout(() => setPhase(3), 450),
      setTimeout(() => setPhase(4), 600),
    ];

    const scheduleHide = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);
      timersRef.current.push(setTimeout(() => setVisible(false), remaining));
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background cyber-grid"
        >
          {/* Faint red grid bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          {/* Corner brackets */}
          <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-neon-red/20" />
          <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-neon-red/20" />
          <div className="absolute bottom-6 left-6 h-10 w-10 border-l border-b border-neon-red/20" />
          <div className="absolute right-6 bottom-6 h-10 w-10 border-r border-b border-neon-red/20" />

          {/* Top-left district tag */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.3 : 0 }}
            className="absolute left-6 top-20 font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/40"
          >
            LVIV DISTRICT 07
          </motion.span>

          {/* Center: Logo outline draws in red */}
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <motion.path
                  d="M50 8 L92 88 L8 88 Z"
                  fill="none"
                  stroke="hsl(var(--neon-red))"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    filter: "drop-shadow(0 0 8px hsl(var(--neon-red) / 0.5))",
                  }}
                />
              </svg>

              {/* Inner red glow pulse */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? [0, 0.4, 0.15, 0.3, 0.1] : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div
                  className="h-16 w-16"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--neon-red) / 0.4) 0%, transparent 70%)",
                  }}
                />
              </motion.div>

              {/* Logo text */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-neon-red"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ textShadow: "0 0 10px hsl(var(--neon-red) / 0.6)" }}
              >
                {"M&Y"}
              </motion.span>
            </div>

            {/* Subtitle */}
            <motion.span
              className="font-mono text-[9px] uppercase tracking-[0.6em] text-foreground/40"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 5 }}
              transition={{ duration: 0.25 }}
            >
              Barber Studio
            </motion.span>

            {/* System initializing text */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 3 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-neon-cyan/40">
                SYSTEM INITIALIZING...
              </span>
              {/* Loading bar */}
              <div className="mt-2 h-px w-40 overflow-hidden bg-border/30">
                <motion.div
                  className="h-full bg-neon-red/60"
                  initial={{ width: "0%" }}
                  animate={{ width: phase >= 3 ? "100%" : "0%" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ boxShadow: "0 0 8px hsl(var(--neon-red) / 0.4)" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Horizontal scanline pass */}
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, hsl(var(--neon-red) / 0.5) 50%, transparent 90%)",
            }}
            initial={{ top: "20%" }}
            animate={{ top: phase >= 2 ? "80%" : "20%" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          />

          {/* Secondary cyan scanline */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 20%, hsl(var(--neon-cyan) / 0.3) 50%, transparent 80%)",
            }}
            initial={{ top: "70%" }}
            animate={{ top: phase >= 3 ? "30%" : "70%" }}
            transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
          />

          {/* Glitch flash */}
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? [0, 0.12, 0, 0.06, 0] : 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            style={{ background: "hsl(var(--neon-red) / 0.2)" }}
          />

          {/* Bottom-right serial number */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
            className="absolute bottom-6 right-6 font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            SN-2077-MYB-001
          </motion.span>

          {/* Signal indicator dots */}
          <motion.div
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
          >
            {[0, 1, 2].map((d) => (
              <motion.div
                key={d}
                className="h-1 w-1 bg-neon-red/50"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, delay: d * 0.2, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
