"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";

/* Animated cyberpunk counter — glitch build-up + segmented digits */
function CyberCounter({
  target,
  suffix = "",
  inView,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState("0");
  const [glitching, setGlitching] = useState(false);
  const [done, setDone] = useState(false);

  const scramble = useCallback((final: string) => {
    const chars = "0123456789#$%&@!";
    return final
      .split("")
      .map((ch) => {
        if (/\d/.test(ch)) return chars[Math.floor(Math.random() * chars.length)];
        return ch;
      })
      .join("");
  }, []);

  useEffect(() => {
    if (!inView) return;
    const finalStr = `${target}${suffix}`;
    let frame = 0;
    const totalFrames = 30;
    const delayMs = delay * 1000;

    const timeout = setTimeout(() => {
      setGlitching(true);
      const interval = setInterval(() => {
        frame++;
        if (frame < totalFrames * 0.6) {
          // Glitch phase — random characters
          setDisplay(scramble(finalStr));
        } else if (frame < totalFrames * 0.85) {
          // Settling phase — mix real + glitch
          const progress = (frame - totalFrames * 0.6) / (totalFrames * 0.25);
          const revealed = Math.floor(progress * finalStr.length);
          const result = finalStr
            .split("")
            .map((ch, i) => {
              if (i < revealed) return ch;
              if (/\d/.test(ch)) return chars[Math.floor(Math.random() * chars.length)];
              return ch;
            })
            .join("");
          const chars = "0123456789#$%&";
          setDisplay(result);
        } else {
          setDisplay(finalStr);
          setGlitching(false);
          setDone(true);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [inView, target, suffix, delay, scramble]);

  return (
    <span
      className={`relative inline-block font-heading text-4xl font-bold tabular-nums text-neon-red md:text-5xl ${glitching ? "animate-glitch" : ""}`}
      style={{
        textShadow: done
          ? "0 0 20px hsl(var(--neon-red) / 0.4), 0 0 60px hsl(var(--neon-red) / 0.15)"
          : "0 0 30px hsl(var(--neon-red) / 0.6)",
      }}
    >
      {display}
      {/* Glow pulse ring when done */}
      {done && (
        <span
          className="absolute -inset-2 animate-pulse-red pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--neon-red) / 0.08) 0%, transparent 70%)",
          }}
        />
      )}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLocale();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const stats = [
    { target: 5, suffix: "+", label: t("about.stat.years") },
    { target: 4, suffix: "", label: t("about.stat.experts") },
    { target: 1, suffix: "K+", label: t("about.stat.clients") },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag={t("about.tag")}
          title={t("about.title")}
          description={t("about.description")}
        />

        <div ref={ref} className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image with parallax + TRON frame */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src="/gallery/gallery-4.jpg"
                alt="Interior M&Y Barber Studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute inset-0 bg-neon-red/[0.03] mix-blend-overlay" />

            {/* TRON corner brackets */}
            <div className="absolute left-3 top-3 h-8 w-8 border-l border-t border-neon-red/25" />
            <div className="absolute right-3 top-3 h-8 w-8 border-r border-t border-neon-red/25" />
            <div className="absolute bottom-3 left-3 h-8 w-8 border-l border-b border-neon-red/25" />
            <div className="absolute bottom-3 right-3 h-8 w-8 border-b border-r border-neon-red/25" />

            {/* HUD decoration */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="h-1 w-1 animate-pulse-red bg-neon-red/40" style={{ boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)" }} />
              <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/20">SCAN ACTIVE</span>
            </div>

            <span className="absolute bottom-6 left-6 font-mono text-[8px] uppercase tracking-[0.4em] text-neon-red/25">
              INTERIOR // LVIV-07
            </span>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.text1")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.text2")}
            </p>

            {/* Stats with animated cyberpunk counters */}
            <div className="mt-4 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="tron-edge relative p-3"
                >
                  <CyberCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    inView={inView}
                    delay={0.6 + i * 0.2}
                  />
                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
                    {stat.label}
                  </span>
                  {/* Bottom neon edge */}
                  <div
                    className="absolute bottom-0 left-0 h-px w-full"
                    style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.3), transparent)" }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-2 h-px w-32 origin-left"
              style={{
                background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)",
                boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
