"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

const VIDEO_SRC = "/hero-video.mp4";
const POSTER_SRC = "/hero-poster.jpg";
const BOOKING_URL = "https://mybarber.com.ua/";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLocale();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.95]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => { video.play().catch(() => {}); };
    if (video.readyState >= 3) play();
    else video.addEventListener("canplay", play, { once: true });
    return () => { video.removeEventListener("canplay", play); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="grain vignette scanlines relative flex min-h-[100dvh] min-h-[100svh] items-end overflow-hidden pb-20 md:items-center md:pb-0"
    >
      {/* Video Background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          className="absolute inset-0 h-full w-full object-cover scale-110"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-neon-red/[0.03] mix-blend-overlay" />
      </motion.div>

      {/* Decorative: cyber grid overlay */}
      <div className="absolute inset-0 z-[1] cyber-grid opacity-30" />

      {/* Decorative: side TRON lines */}
      <div className="absolute left-0 top-0 bottom-0 z-[2] w-px bg-gradient-to-b from-transparent via-neon-red/10 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-[2] w-px bg-gradient-to-b from-transparent via-neon-red/10 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8"
        style={{ y: contentY }}
      >
        <div className="max-w-4xl w-full">
          {/* District tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex items-center gap-3"
          >
            <span
              className="block h-px w-12"
              style={{
                background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.7), transparent)",
                boxShadow: "0 0 6px hsl(var(--neon-red) / 0.3)",
              }}
            />
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/50">
              {t("hero.tag")}
            </span>
          </motion.div>

          {/* Cinematic masked title reveal — responsive clamped sizes, no overflow */}
          <div className="mb-2 overflow-visible">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-[clamp(2.25rem,8vw,6.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-foreground"
              style={{ textWrap: "balance" }}
            >
              {t("hero.line1")}
            </motion.h1>
          </div>
          <div className="mb-2 overflow-visible">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-[clamp(2.25rem,8vw,6.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-foreground/40 hero-subtitle-line"
            >
              {t("hero.line2")}
            </motion.h1>
          </div>
          <div className="mb-8 overflow-visible">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="neon-glow-red font-heading text-[clamp(2.25rem,8vw,6.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-neon-red"
            >
              {t("hero.line3")}
            </motion.h1>
          </div>

          {/* Neon underline animation below title */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            className="mb-8 h-[2px] w-48 origin-left md:w-64"
            style={{
              background: "linear-gradient(90deg, hsl(var(--neon-red)), hsl(var(--neon-red) / 0.2), transparent)",
              boxShadow: "0 0 15px hsl(var(--neon-red) / 0.4), 0 0 40px hsl(var(--neon-red) / 0.15)",
            }}
          />

          {/* Subtitle — improved contrast on video background */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hero-subtitle mb-10 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn neon-flicker inline-flex items-center justify-center gap-2 px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em]"
            >
              {t("hero.cta")}
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-neon-red"
            >
              {t("hero.services")}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M8 3v10m0 0l-3-3m3 3l3-3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Bottom industrial markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex items-center justify-between md:mt-24"
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/15">
            SYSTEM ONLINE
          </span>
          <div
            className="hidden h-px flex-1 mx-4 md:block"
            style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.1), transparent, hsl(var(--neon-red) / 0.1))" }}
          />
          <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/15">
            EST. LVIV
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Glitch divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 glitch-divider" />
    </section>
  );
}
