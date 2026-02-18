"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// TODO: Replace with real video/poster paths
const VIDEO_SRC = "/hero-video.mp4";
const POSTER_SRC = "/hero-poster.jpg";
const BOOKING_URL = "#book";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mobileVideoRequested, setMobileVideoRequested] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop autoplay
  useEffect(() => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile, videoLoaded]);

  // GSAP cinematic intro (desktop only, dynamically imported)
  useEffect(() => {
    if (isMobile) {
      setIntroComplete(true);
      return;
    }

    let ctx: { revert: () => void } | null = null;

    const runIntro = async () => {
      try {
        const gsapModule = await import("gsap");
        const gsap = gsapModule.default || gsapModule;

        const section = sectionRef.current;
        if (!section) return;

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            onComplete: () => setIntroComplete(true),
          });

          tl.fromTo(
            ".hero-title-line",
            { y: 60, opacity: 0, filter: "blur(8px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            }
          )
            .fromTo(
              ".hero-subtitle",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
              "-=0.3"
            )
            .fromTo(
              ".hero-cta",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
              "-=0.2"
            )
            .fromTo(
              ".hero-hud",
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "power1.inOut" },
              "-=0.6"
            );
        }, section);
      } catch {
        setIntroComplete(true);
      }
    };

    runIntro();

    return () => {
      ctx?.revert();
    };
  }, [isMobile]);

  const handleMobilePlay = useCallback(() => {
    setMobileVideoRequested(true);
    if (videoRef.current) {
      videoRef.current.src = VIDEO_SRC;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="grain scanline-overlay relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {isMobile && !mobileVideoRequested ? (
          /* Mobile: poster image + play button */
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${POSTER_SRC})` }}
            />
            <div className="absolute inset-0 bg-background/70" />
            <button
              onClick={handleMobilePlay}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full border border-neon-cyan/40 bg-background/60 backdrop-blur-sm transition-all hover:scale-110 hover:border-neon-cyan/80"
              aria-label="Play video"
            >
              <svg
                viewBox="0 0 24 24"
                fill="hsl(var(--neon-cyan))"
                className="ml-1 h-6 w-6"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        ) : (
          /* Desktop: autoplay video */
          <>
            <video
              ref={videoRef}
              autoPlay={!isMobile}
              muted
              loop
              playsInline
              preload="metadata"
              poster={POSTER_SRC}
              onLoadedData={() => setVideoLoaded(true)}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {!isMobile && <source src={VIDEO_SRC} type="video/mp4" />}
            </video>
            <div className="absolute inset-0 bg-background/60" />
          </>
        )}
      </div>

      {/* HUD Overlay Grid */}
      <div
        className="hero-hud pointer-events-none absolute inset-0 z-10"
        style={{ opacity: isMobile || introComplete ? 1 : 0 }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
        {/* Corner accents */}
        <div className="absolute left-6 top-24 h-16 w-16 border-l border-t border-neon-cyan/20 md:left-12 md:top-32 md:h-24 md:w-24" />
        <div className="absolute bottom-12 right-6 h-16 w-16 border-b border-r border-neon-violet/20 md:bottom-16 md:right-12 md:h-24 md:w-24" />
        {/* Scan line */}
        <div className="absolute left-0 right-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          <span
            className="hero-title-line block"
            style={{ opacity: isMobile ? 1 : 0 }}
          >
            <span className="text-foreground">YOUR</span>{" "}
            <span className="neon-glow-violet text-neon-violet">STYLE</span>
          </span>
          <span
            className="hero-title-line block"
            style={{ opacity: isMobile ? 1 : 0 }}
          >
            <span className="text-foreground">OUR</span>{" "}
            <span className="neon-glow-cyan text-neon-cyan">CRAFT</span>
          </span>
        </h1>

        <p
          className="hero-subtitle mx-auto mb-10 max-w-xl font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground md:text-base"
          style={{ opacity: isMobile ? 1 : 0 }}
        >
          Premium barbershop in the heart of Lviv
        </p>

        <div
          className="hero-cta flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ opacity: isMobile ? 1 : 0 }}
        >
          <a
            href={BOOKING_URL}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm border border-neon-violet/60 bg-neon-violet/10 px-8 py-4 font-mono text-sm uppercase tracking-widest text-neon-violet transition-all duration-300 hover:bg-neon-violet/20 hover:shadow-[0_0_30px_hsl(var(--neon-violet)/0.3)]"
          >
            {/* Animated border sweep */}
            <span className="absolute inset-0 -z-10 animate-border-sweep bg-gradient-to-r from-transparent via-neon-violet/20 to-transparent bg-[length:200%_100%]" />
            Book Your Session
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore Services
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
            >
              <path d="M8 3v10m0 0l-3-3m3 3l3-3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
