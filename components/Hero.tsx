"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO_SRC = "/hero-video.mp4";
const POSTER_SRC = "/hero-poster.jpg";
const BOOKING_URL = "https://mybarber.com.ua/";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="grain vignette scanlines relative flex min-h-screen items-end overflow-hidden pb-20 md:items-center md:pb-0"
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
        {/* Cinematic overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40"
          style={{ opacity: overlayOpacity }}
        />
        {/* Warm color wash */}
        <div className="absolute inset-0 bg-background/20 mix-blend-multiply" />
      </motion.div>

      {/* Content with slower parallax */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8"
        style={{ y: contentY }}
      >
        <div className="max-w-2xl">
          {/* Industrial label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-neon-magenta/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {"Барбершоп / Львів / Session"}
            </span>
          </motion.div>

          {/* Title - cinematic masked reveal */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl font-bold leading-[0.92] tracking-tight md:text-7xl lg:text-8xl"
            >
              <span className="block text-foreground">Стиль</span>
            </motion.h1>
          </div>
          <div className="mb-6 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl font-bold leading-[0.92] tracking-tight text-foreground/40 md:text-7xl lg:text-8xl"
            >
              народжується
            </motion.h1>
          </div>
          <div className="mb-8 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl font-bold leading-[0.92] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            >
              тут
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground"
          >
            {"M&Y Barber Studio -- місце, де кожна стрижка стає мистецтвом. Преміум сервіс у серці Львова."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-foreground/15 bg-foreground/5 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-foreground/10 hover:border-neon-magenta/30"
            >
              Записатись
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Наші послуги
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
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex items-center justify-between md:mt-24"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/20">
            Session
          </span>
          <div className="hidden h-px flex-1 bg-foreground/5 mx-4 md:block" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/20">
            Est. Lviv
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
