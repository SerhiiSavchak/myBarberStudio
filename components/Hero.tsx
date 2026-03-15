"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { useHeroReady } from "@/lib/hero-ready-context";
import { BOOKING_URL, SECTION_IDS } from "@/constants/routes";

const VIDEO_SRC = "/hero-video.mp4";
const POSTER_SRC = "/hero-poster.jpg";

/** Max wait before signaling ready (poster fallback if video fails or autoplay blocked) */
const VIDEO_READY_TIMEOUT_MS = 4000;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLocale();
  const { setHeroReady } = useHeroReady();

  /* Native scroll-based parallax — no Framer Motion, reduces main bundle */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = rect.top <= 0 ? Math.min(-rect.top / viewportH, 1) : 0;
      setScrollProgress(progress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const bgY = `${scrollProgress * 50}%`;
  const contentY = `${scrollProgress * 30}%`;
  const overlayOpacity = 0.55 + scrollProgress * 0.8;

  /* Video: autoplay when ready, signal loader when playing or fallback. No play button — poster only if blocked. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let readySignaled = false;
    const signalReady = () => {
      if (readySignaled) return;
      readySignaled = true;
      setHeroReady();
    };

    const tryPlayAndSignal = async () => {
      try {
        await video.play();
        signalReady();
      } catch {
        /* Autoplay blocked: poster stays visible, no play icon. Still signal so loader hides. */
        signalReady();
      }
    };

    const onCanPlay = () => tryPlayAndSignal();
    const onError = () => signalReady();

    if (video.readyState >= 3) {
      tryPlayAndSignal();
    } else {
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.addEventListener("error", onError, { once: true });
    }

    const timeout = setTimeout(signalReady, VIDEO_READY_TIMEOUT_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [setHeroReady]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="grain vignette scanlines relative flex min-h-[100dvh] min-h-[100svh] items-end overflow-hidden pb-28 pt-6 md:items-center md:pb-0 md:pt-0"
    >
      {/* Video Background — CSS fade in, then parallax on scroll. No play button — poster only if autoplay blocked. */}
      <div
        data-hero-video
        className="hero-entrance-video absolute inset-0 z-0"
        style={{ transform: `translateY(${bgY})` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          width={1920}
          height={1080}
          className="hero-video absolute inset-0 h-full w-full object-cover scale-110"
          aria-hidden
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>
        <div
          className="hero-video-overlay absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"
          style={{ opacity: overlayOpacity }}
        />
        <div className="hero-video-tint absolute inset-0 bg-neon-red/[0.03] mix-blend-overlay" />
        <div className="hero-video-light-cinematic pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      </div>

      {/* Decorative: cyber grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] cyber-grid opacity-30" />

      {/* Decorative: side TRON lines */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-[2] w-px bg-gradient-to-b from-transparent via-neon-red/10 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-[2] w-px bg-gradient-to-b from-transparent via-neon-red/10 to-transparent" />

      {/* Content — z-30 above gradient/glitch so buttons stay clickable when scrolled */}
      <div
        className="relative z-30 mx-auto w-full max-w-7xl px-6 lg:px-8"
        style={{ transform: `translateY(${contentY})` }}
      >
        <div className="hero-content-block relative max-w-3xl w-full min-w-0">
          {/* District tag */}
          <div className="hero-entrance-tag mb-6 md:mb-8 flex items-center gap-3">
            <span
              className="block h-px w-12"
              style={{
                background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.7), transparent)",
                boxShadow: "0 0 6px hsl(var(--neon-red) / 0.3)",
              }}
            />
            <span className="hero-tag font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/50">
              {t("hero.tag")}
            </span>
          </div>

          {/* Title — overflow-visible on mobile so entrance animation isn't clipped */}
          <div className="mb-2 overflow-visible md:overflow-hidden">
            <h1
              className="hero-entrance-line1 font-display text-[clamp(1.9rem,min(6.5vw,5rem),7rem)] font-bold uppercase leading-[1.2] tracking-[0.02em] text-foreground break-words"
              style={{ textWrap: "balance", overflowWrap: "anywhere" }}
            >
              {t("hero.line1")}
            </h1>
          </div>
          <div className="mb-2 overflow-visible md:overflow-hidden">
            <h1
              className="hero-entrance-line2 font-display text-[clamp(1.9rem,min(6.5vw,5rem),7rem)] font-bold uppercase leading-[1.2] tracking-[0.02em] text-foreground/60 hero-subtitle-line break-words"
              style={{ overflowWrap: "anywhere" }}
            >
              {t("hero.line2")}
            </h1>
          </div>
          <div className="mb-6 md:mb-8 overflow-visible md:overflow-hidden">
            <h1
              className="hero-entrance-line3 neon-glow-red font-display text-[clamp(1.9rem,min(6.5vw,5rem),7rem)] font-bold uppercase leading-[1.2] tracking-[0.02em] text-neon-red break-words"
              style={{ overflowWrap: "anywhere" }}
            >
              {t("hero.line3")}
            </h1>
          </div>

          {/* Neon underline */}
          <div
            className="hero-entrance-underline mb-6 md:mb-8 h-[2px] w-48 md:w-64"
            style={{
              background: "linear-gradient(90deg, hsl(var(--neon-red)), hsl(var(--neon-red) / 0.2), transparent)",
              boxShadow: "0 0 15px hsl(var(--neon-red) / 0.4), 0 0 40px hsl(var(--neon-red) / 0.15)",
            }}
          />

          {/* Subtitle */}
          <p
            className="hero-entrance-subtitle hero-subtitle mb-8 md:mb-10 max-w-md font-body text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.65] text-muted-foreground/90 break-words"
            style={{ overflowWrap: "anywhere" }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="hero-entrance-ctas flex flex-col gap-4 sm:flex-row sm:items-center md:gap-6">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn neon-flicker inline-flex items-center justify-center gap-2 px-10 py-4 font-body text-[13px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
            >
              {t("hero.cta")}
            </a>
            <a
              href={`#${SECTION_IDS.services}`}
              className="hero-cta-secondary inline-flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-neon-red cursor-pointer"
            >
              {t("hero.services")}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M8 3v10m0 0l-3-3m3 3l3-3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom industrial markers */}
        <div className="hero-entrance-markers mt-16 flex items-center justify-between md:mt-24">
          <span className="hero-markers font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/15">
            SYSTEM ONLINE
          </span>
          <div
            className="hidden h-px flex-1 mx-4 md:block"
            style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.1), transparent, hsl(var(--neon-red) / 0.1))" }}
          />
          <span className="hero-markers font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/15">
            EST. LVIV
          </span>
        </div>
      </div>

      {/* Hero-to-section transition: film frame + soft blur edge + subtle shadow */}
      <div
        className="hero-to-section-transition pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        aria-hidden
      />
    </section>
  );
}
