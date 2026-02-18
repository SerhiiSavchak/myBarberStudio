"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/hero-video.mp4";
const POSTER_SRC = "/hero-poster.jpg";
const BOOKING_URL = "https://mybarber.com.ua/";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVideoPlaying, setMobileVideoPlaying] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile]);

  const handleMobilePlay = useCallback(() => {
    setMobileVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = VIDEO_SRC;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="hero" className="grain vignette relative flex min-h-screen items-end overflow-hidden pb-20 md:items-center md:pb-0">
      {/* Video / Poster Background */}
      <div className="absolute inset-0 z-0">
        {isMobile && !mobileVideoPlaying ? (
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${POSTER_SRC})` }}
            />
            <div className="absolute inset-0 bg-background/65" />
            <button
              onClick={handleMobilePlay}
              className="absolute left-1/2 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-background/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-background/60"
              aria-label="Відтворити відео"
            >
              <svg viewBox="0 0 24 24" fill="hsl(var(--foreground))" className="ml-0.5 h-5 w-5 opacity-80">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay={!isMobile}
              muted
              loop
              playsInline
              preload="metadata"
              poster={POSTER_SRC}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {!isMobile && <source src={VIDEO_SRC} type="video/mp4" />}
            </video>
            {/* Cinematic overlay: gradient + subtle warm tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Industrial label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-neon-accent/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Барбершоп / Львів / Night Shift
            </span>
          </motion.div>

          {/* Title - cinematic reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="block text-foreground">Стиль</span>
            <span className="block text-foreground/50">народжується</span>
            <span className="block text-foreground">тут</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground"
          >
            M&Y Barber Studio -- місце, де кожна стрижка стає мистецтвом.
            Преміум сервіс у серці Львова.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-foreground/25 bg-foreground/5 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all duration-400 hover:bg-foreground/10 hover:border-foreground/50"
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

        {/* Bottom edge industrial markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex items-center justify-between md:mt-24"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30">
            Session
          </span>
          <div className="hidden h-px flex-1 bg-foreground/5 mx-4 md:block" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30">
            Est. Lviv
          </span>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
