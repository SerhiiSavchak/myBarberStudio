"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_DISPLAY_MS = 2200;

export default function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let timeoutId: ReturnType<typeof setTimeout>;

    const hide = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      timeoutId = setTimeout(() => setIsVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Уровень 1: Внешний круг с вращением */}
          <motion.div
            className="absolute h-64 w-64 rounded-full border border-foreground/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute h-64 w-64 rounded-full border border-foreground/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Уровень 2: Сегменты прогресса */}
          <div className="absolute flex h-48 w-48 items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-24 w-px origin-bottom bg-gradient-to-t from-transparent via-neon-accent/60 to-neon-accent"
                style={{ rotate: i * 30 }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: [0, 1, 0.3],
                  scaleY: [0, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </div>

          {/* Уровень 3: Внутренние кольца */}
          <motion.div
            className="absolute h-32 w-32 rounded-full border-2 border-neon-accent/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute h-24 w-24 rounded-full border border-neon-warm/40"
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [0, 180],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Уровень 4: Центральный шестиугольник */}
          <motion.div
            className="absolute flex h-16 w-16 items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <svg
              viewBox="0 0 64 64"
              className="h-full w-full"
              fill="none"
              stroke="hsl(var(--foreground) / 0.3)"
              strokeWidth="1.5"
            >
              <motion.path
                d="M32 4 L58 18 L58 46 L32 60 L6 46 L6 18 Z"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>

          {/* Уровень 5: Текст с анимацией */}
          <motion.div
            className="absolute bottom-[20%] flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              M&Y Barber Studio
            </motion.span>
            <motion.div
              className="h-px w-20 bg-gradient-to-r from-transparent via-neon-accent/50 to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            />
          </motion.div>

          {/* Уровень 6: Угловые маркеры */}
          {[
            { style: { top: "20%", left: "20%" }, className: "border-l border-t" },
            { style: { top: "20%", right: "20%" }, className: "border-r border-t" },
            { style: { bottom: "20%", left: "20%" }, className: "border-l border-b" },
            { style: { bottom: "20%", right: "20%" }, className: "border-r border-b" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute h-8 w-8 border-foreground/20 ${pos.className}`}
              style={pos.style}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0, 1, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
