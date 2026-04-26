"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { useHeroReady } from "@/lib/hero-ready-context";
import { useHeroMediaLifecycle } from "@/hooks/use-hero-media-lifecycle";
import { BOOKING_URL, SECTION_IDS } from "@/constants/routes";
import { HERO_MEDIA_CONSTANTS } from "@/lib/hero-media-types";
import {
  HERO_VIDEO_DESKTOP_SRC,
  HERO_VIDEO_MOBILE_SRC,
  HERO_VIDEO_POSTER_SRC,
} from "@/constants/media";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLocale();
  const { setHeroReady } = useHeroReady();

  /* Poster-first: signal ready only when poster image is actually loaded and visually ready */
  const signalReadyWhenPosterLoaded = useCallback(() => {
    setHeroReady();
  }, [setHeroReady]);

  const posterCallbackRef = useCallback(
    (el: HTMLImageElement | null) => {
      if (!el) return;
      if (el.complete && el.naturalWidth > 0) {
        signalReadyWhenPosterLoaded();
      }
    },
    [signalReadyWhenPosterLoaded]
  );

  const handlePosterLoad = useCallback(() => {
    signalReadyWhenPosterLoaded();
  }, [signalReadyWhenPosterLoaded]);

  /* Fallback: if poster fails to load, signal anyway to avoid infinite loader */
  const handlePosterError = useCallback(() => {
    signalReadyWhenPosterLoaded();
  }, [signalReadyWhenPosterLoaded]);

  const { mobileCallbackRef, desktopCallbackRef, state: videoState, hasRevealedVideo } =
    useHeroMediaLifecycle({
      loadDelayMs: HERO_MEDIA_CONSTANTS.VIDEO_LOAD_DELAY_MS,
    });

  /* Native scroll-based parallax — throttled via rAF */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const rect = section.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const progress = rect.top <= 0 ? Math.min(-rect.top / viewportH, 1) : 0;
        setScrollProgress(progress);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const bgY = `${scrollProgress * 50}%`;
  const contentY = `${scrollProgress * 30}%`;
  /* Subtle legibility only — was heavy (0.55+); stripes/grain/scanlines removed in markup */
  const overlayOpacity = 0.32 + scrollProgress * 0.22;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] min-h-[100svh] items-end overflow-hidden pb-28 pt-6 md:items-center md:pb-0 md:pt-0"
    >
      {/* Video Background — poster first, video fades in when ready */}
      <div
        data-hero-video
        data-video-ready={hasRevealedVideo && videoState !== "fallback"}
        className="hero-entrance-video absolute inset-0 z-0"
        style={{ transform: `translateY(${bgY})` }}
      >
        <img
          ref={posterCallbackRef}
          src={HERO_VIDEO_POSTER_SRC}
          alt=""
          className="hero-video-poster absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
          fetchPriority="high"
          onLoad={handlePosterLoad}
          onError={handlePosterError}
        />
        {/*
          No native poster on <video>: browser can flash it at loop boundary; the <img> is the only first-load poster.
        */}
        <video
          ref={mobileCallbackRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          width={1920}
          height={1080}
          disablePictureInPicture
          disableRemotePlayback
          className="hero-video absolute inset-0 h-full w-full object-cover object-center md:hidden"
          aria-hidden
        >
          <source src={HERO_VIDEO_MOBILE_SRC} type="video/mp4" />
        </video>
        <video
          ref={desktopCallbackRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          width={1920}
          height={1080}
          disablePictureInPicture
          disableRemotePlayback
          className="hero-video absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          aria-hidden
        >
          <source src={HERO_VIDEO_DESKTOP_SRC} type="video/mp4" />
        </video>
        <div
          className="hero-video-overlay pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-background/50 via-background/15 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
        {/* Readability: darkens under fixed header + upper title, both themes; no video texture */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[min(55vh,36rem)] bg-gradient-to-b from-black/[0.68] from-[0%] via-black/30 via-[42%] to-transparent to-[100%]"
          aria-hidden
        />
      </div>

      {/* Decorative: side TRON lines */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-[2] w-px bg-gradient-to-b from-transparent via-neon-red/10 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-[2] w-px bg-gradient-to-b from-transparent via-neon-red/10 to-transparent" />

      {/* Content */}
      <div
        className="relative z-30 mx-auto w-full max-w-7xl px-6 lg:px-8"
        style={{ transform: `translateY(${contentY})` }}
      >
        <div className="hero-content-block relative max-w-3xl w-full min-w-0">
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

          <div
            className="hero-entrance-underline mb-6 md:mb-8 h-[2px] w-48 md:w-64"
            style={{
              background: "linear-gradient(90deg, hsl(var(--neon-red)), hsl(var(--neon-red) / 0.2), transparent)",
              boxShadow: "0 0 15px hsl(var(--neon-red) / 0.4), 0 0 40px hsl(var(--neon-red) / 0.15)",
            }}
          />

          <p
            className="hero-entrance-subtitle hero-subtitle mb-8 md:mb-10 max-w-md font-body text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.65] text-muted-foreground/90 break-words"
            style={{ overflowWrap: "anywhere" }}
          >
            {t("hero.subtitle")}
          </p>

          <div className="hero-entrance-ctas flex flex-col gap-4 sm:flex-row sm:items-center md:gap-6">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary neon-btn neon-flicker inline-flex items-center justify-center gap-2 px-10 py-4 font-body text-[13px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
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

      <div
        className="hero-to-section-transition pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        aria-hidden
      />
    </section>
  );
}
