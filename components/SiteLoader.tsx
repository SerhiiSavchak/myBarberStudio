"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 2000;

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let tid: ReturnType<typeof setTimeout>;

    const hide = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, DURATION_MS - elapsed);
      tid = setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(tid);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Film grain */}
          <div className="grain absolute inset-0" />

          {/* Triangle logo outline - stroke reveal */}
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute h-full w-full">
              <motion.path
                d="M50 10 L90 85 L10 85 Z"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </svg>

            {/* Inner glow pulse */}
            <motion.div
              className="absolute h-20 w-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0.05, 0.12, 0] }}
              transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(circle, hsl(var(--neon-magenta) / 0.4) 0%, transparent 70%)",
              }}
            />

            {/* Logo text inside triangle */}
            <motion.span
              className="relative font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {"M&Y"}
            </motion.span>
          </div>

          {/* Horizontal scanline */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--neon-cyan) / 0.5), transparent)",
            }}
            initial={{ top: "30%" }}
            animate={{ top: "70%" }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
          />

          {/* Glitch flash */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.08, 0, 0.05, 0] }}
            transition={{ duration: 0.4, delay: 1.3, ease: "linear" }}
            style={{ background: "hsl(var(--neon-cyan) / 0.15)" }}
          />

          {/* Bottom text */}
          <motion.div
            className="absolute bottom-[15%] flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50">
              Barber Studio
            </span>
            <motion.div
              className="h-px w-16"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--neon-magenta) / 0.3), transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>

          {/* Corner marks */}
          <div className="absolute left-8 top-8 h-6 w-6 border-l border-t border-foreground/8" />
          <div className="absolute right-8 top-8 h-6 w-6 border-r border-t border-foreground/8" />
          <div className="absolute bottom-8 left-8 h-6 w-6 border-l border-b border-foreground/8" />
          <div className="absolute right-8 bottom-8 h-6 w-6 border-r border-b border-foreground/8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
