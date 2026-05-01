"use client";

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useScrollSuppressed } from "@/hooks/use-scroll-suppressed";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { ABOUT_SLIDES } from "@/constants/media";
import { useScrollSnapCarousel } from "@/hooks/use-scroll-snap-carousel";
import { SliderArrowButton } from "./SliderArrowButton";

const scrambleChars = "0123456789#$%&@!";

/** Mouse drag: scroll moves faster than the pointer (1 = 1:1, needs full width drag per slide). */
const ABOUT_CAROUSEL_DRAG_MULTIPLIER = 2.25;
/** 0–1: how fast the track catches the pointer (higher = snappier, lower = more “float”). */
const ABOUT_DRAG_FOLLOW_SMOOTHING = 0.26;
/** Snap after release (ms), ease-out; not used when prefers-reduced-motion. */
const ABOUT_SNAP_EASE_MS = 450;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/* Animated count-up with IntersectionObserver, prefers-reduced-motion, single run */
function CyberCounter({
  target,
  suffix = "",
  inView,
  delay = 0,
  reducedMotion,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
  delay?: number;
  reducedMotion?: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const [glitching, setGlitching] = useState(false);
  const [done, setDone] = useState(false);
  const hasAnimated = useRef(false);

  const scramble = useCallback((final: string) => {
    return final
      .split("")
      .map((ch) => {
        if (/\d/.test(ch)) return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        return ch;
      })
      .join("");
  }, []);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    const finalStr = `${target}${suffix}`;

    if (reducedMotion) {
      setDisplay(finalStr);
      setDone(true);
      hasAnimated.current = true;
      return;
    }

    let frame = 0;
    const totalFrames = 30;
    const delayMs = delay * 1000;

    const timeout = setTimeout(() => {
      hasAnimated.current = true;
      setGlitching(true);
      const interval = setInterval(() => {
        frame++;
        if (frame < totalFrames * 0.6) {
          setDisplay(scramble(finalStr));
        } else if (frame < totalFrames * 0.85) {
          const progress = (frame - totalFrames * 0.6) / (totalFrames * 0.25);
          const revealed = Math.floor(progress * finalStr.length);
          const result = finalStr
            .split("")
            .map((ch, i) => {
              if (i < revealed) return ch;
              if (/\d/.test(ch)) return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              return ch;
            })
            .join("");
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
  }, [inView, target, suffix, delay, scramble, reducedMotion]);

  return (
    <span
      className={`relative inline-block font-display text-4xl font-bold tabular-nums text-neon-red md:text-5xl ${glitching ? "animate-glitch" : ""}`}
      style={{
        textShadow: done
          ? "0 0 20px hsl(var(--neon-red) / 0.4), 0 0 60px hsl(var(--neon-red) / 0.15)"
          : "0 0 30px hsl(var(--neon-red) / 0.6)",
      }}
    >
      {display}
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
  const { ref, inView } = useSectionInView();
  const { ref: statsRef, inView: statsInView } = useInView({
    once: true,
    amount: 0.15,
    margin: "80px 0px 0px 0px",
  });
  const sectionRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScrollSuppressed({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const aboutSlideCount = ABOUT_SLIDES.length;
  const { scrollerRef: registerScroller, activeIndex, goTo, goNext, goPrev, updateIndex } = useScrollSnapCarousel(
    aboutSlideCount,
    {
      prefersReducedMotion: reducedMotion,
      autoplay: true,
      autoplayIntervalMs: 3000,
      autoplayResumeAfterMs: 5000,
    }
  );

  const [isPtrDragging, setIsPtrDragging] = useState(false);
  const [scrollerEl, setScrollerEl] = useState<HTMLDivElement | null>(null);
  const aboutDragRef = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
  } | null>(null);
  const aboutSlideCountRef = useRef(aboutSlideCount);
  aboutSlideCountRef.current = aboutSlideCount;
  const updateIndexRef = useRef(updateIndex);
  updateIndexRef.current = updateIndex;
  const winListenersCleanupRef = useRef<(() => void) | null>(null);
  const aboutDragTargetScrollRef = useRef(0);
  const aboutDragLerpRafRef = useRef(0);
  const aboutSnapRafRef = useRef(0);

  const setScrollerRef = useCallback(
    (node: HTMLDivElement | null) => {
      setScrollerEl(node);
      registerScroller(node);
    },
    [registerScroller]
  );

  /**
   * Native pointer listeners on the real scroll node + window (capture).
   * Framer Motion on the parent can steal hit targets; that parent is pointer-events-none
   * and the scroller is pointer-events-auto. React's delegated pointer events are bypassed
   * so mouse drag always updates scrollLeft.
   * Touch: handler returns early — horizontal swipe stays native; touch-action pan-x pan-y so
   * vertical drags scroll the page (pan-x alone traps vertical scrolling on mobile).
   * During mouse drag, scroll-snap is disabled — otherwise the browser fights scrollLeft and it stutters.
   * Pointer target is smoothed (lerp); release uses eased scroll (not only native "smooth") for a softer landing.
   */
  useLayoutEffect(() => {
    const el = scrollerEl;
    if (!el) return;

    const cancelDragLerp = () => {
      if (aboutDragLerpRafRef.current) {
        cancelAnimationFrame(aboutDragLerpRafRef.current);
        aboutDragLerpRafRef.current = 0;
      }
    };

    const cancelSnapAnim = () => {
      if (aboutSnapRafRef.current) {
        cancelAnimationFrame(aboutSnapRafRef.current);
        aboutSnapRafRef.current = 0;
      }
    };

    const runDragLerp = () => {
      aboutDragLerpRafRef.current = 0;
      if (!aboutDragRef.current || reducedMotion) return;
      const target = aboutDragTargetScrollRef.current;
      const cur = el.scrollLeft;
      const a = ABOUT_DRAG_FOLLOW_SMOOTHING;
      const next = cur + (target - cur) * a;
      if (Math.abs(target - next) < 0.4) {
        el.scrollLeft = target;
      } else {
        el.scrollLeft = next;
      }
      if (aboutDragRef.current && Math.abs(el.scrollLeft - target) > 0.45) {
        aboutDragLerpRafRef.current = requestAnimationFrame(runDragLerp);
      }
    };

    const snapToNearest = () => {
      const w = el.clientWidth;
      if (w <= 0) return;
      const n = aboutSlideCountRef.current;
      const children = el.children;
      const mid = el.scrollLeft + w / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < n && i < children.length; i++) {
        const c = children[i] as HTMLElement;
        const cMid = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      const child = el.children[best] as HTMLElement | undefined;
      const left = child != null ? child.offsetLeft : best * w;
      const from = el.scrollLeft;
      if (Math.abs(from - left) < 0.5) {
        el.scrollLeft = left;
        updateIndexRef.current();
        return;
      }
      if (reducedMotion) {
        el.scrollLeft = left;
        updateIndexRef.current();
        return;
      }
      cancelSnapAnim();
      const t0 = performance.now();
      const fromScroll = from;
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / ABOUT_SNAP_EASE_MS);
        const e = easeOutCubic(t);
        el.scrollLeft = fromScroll + (left - fromScroll) * e;
        if (t < 1) {
          aboutSnapRafRef.current = requestAnimationFrame(step);
        } else {
          aboutSnapRafRef.current = 0;
          el.scrollLeft = left;
          updateIndexRef.current();
        }
      };
      aboutSnapRafRef.current = requestAnimationFrame(step);
    };

    const endDrag = (pointerId: number) => {
      cancelDragLerp();
      winListenersCleanupRef.current?.();
      winListenersCleanupRef.current = null;
      aboutDragRef.current = null;
      setIsPtrDragging(false);
      document.body.style.removeProperty("user-select");
      document.body.style.removeProperty("-webkit-user-select");
      try {
        if (el.hasPointerCapture(pointerId)) {
          el.releasePointerCapture(pointerId);
        }
      } catch {
        /* */
      }
      el.style.removeProperty("scroll-snap-type");
      snapToNearest();
    };

    const onWindowMove = (ev: globalThis.PointerEvent) => {
      const d = aboutDragRef.current;
      if (!d || ev.pointerId !== d.pointerId) return;
      ev.preventDefault();
      const rawDelta = (ev.clientX - d.startX) * ABOUT_CAROUSEL_DRAG_MULTIPLIER;
      const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      const next = Math.max(0, Math.min(maxLeft, d.startScroll - rawDelta));
      if (reducedMotion) {
        el.scrollLeft = next;
        return;
      }
      aboutDragTargetScrollRef.current = next;
      if (!aboutDragLerpRafRef.current) {
        aboutDragLerpRafRef.current = requestAnimationFrame(runDragLerp);
      }
    };

    const onWindowUp = (ev: globalThis.PointerEvent) => {
      const d = aboutDragRef.current;
      if (!d || ev.pointerId !== d.pointerId) return;
      endDrag(ev.pointerId);
    };

    const onDown = (e: globalThis.PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      cancelSnapAnim();
      if (winListenersCleanupRef.current) {
        winListenersCleanupRef.current();
        winListenersCleanupRef.current = null;
      }
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
      aboutDragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startScroll: el.scrollLeft,
      };
      aboutDragTargetScrollRef.current = el.scrollLeft;
      setIsPtrDragging(true);
      document.body.style.setProperty("user-select", "none");
      document.body.style.setProperty("-webkit-user-select", "none");
      const moveOpts: AddEventListenerOptions = { capture: true, passive: false };
      window.addEventListener("pointermove", onWindowMove, moveOpts);
      window.addEventListener("pointerup", onWindowUp, { capture: true });
      window.addEventListener("pointercancel", onWindowUp, { capture: true });
      winListenersCleanupRef.current = () => {
        window.removeEventListener("pointermove", onWindowMove, true);
        window.removeEventListener("pointerup", onWindowUp, true);
        window.removeEventListener("pointercancel", onWindowUp, true);
      };
    };

    el.addEventListener("pointerdown", onDown, { capture: true, passive: false });

    return () => {
      cancelDragLerp();
      cancelSnapAnim();
      el.removeEventListener("pointerdown", onDown, true);
      winListenersCleanupRef.current?.();
      winListenersCleanupRef.current = null;
      aboutDragRef.current = null;
      el.style.removeProperty("scroll-snap-type");
    };
  }, [scrollerEl, reducedMotion]);

  const stats = [
    { target: 5, suffix: "+", label: t("about.stat.years") },
    { target: 5, suffix: "K+", label: t("about.stat.haircuts") },
    { target: 1, suffix: "K+", label: t("about.stat.clients") },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-12 md:py-16 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("about.tag")}
          title={t("about.title")}
          description={t("about.description")}
        />

        <div ref={ref} className="grid min-w-0 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image with parallax + TRON frame — same nav pattern as Masters: side arrows on slide, bar+dots below */}
          <div className="flex min-w-0 flex-col gap-3">
            <div
              className="group/about-slider relative aspect-[4/5] min-h-0 w-full overflow-hidden"
              style={{
                clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                opacity: inView ? 1 : 0,
                transition: "clip-path 1s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              role="region"
              aria-roledescription="carousel"
              aria-label={t("about.carouselRegion")}
            >
              <motion.div className="pointer-events-none absolute inset-0 min-h-0" style={{ y: imageY }}>
                <div
                  ref={setScrollerRef}
                  className={cn(
                    "pointer-events-auto relative z-[1] h-full w-full max-w-full",
                    "flex snap-x snap-mandatory flex-nowrap overflow-x-auto overflow-y-hidden",
                    !isPtrDragging && "scroll-smooth",
                    "overscroll-x-contain",
                    "select-none touch-[pan-x_pan-y] scrollbar-hide",
                    isPtrDragging && "md:cursor-grabbing",
                    !isPtrDragging && "md:cursor-grab"
                  )}
                >
                  {ABOUT_SLIDES.map((slide, i) => (
                    <div
                      key={slide.src}
                      className="relative h-full w-full min-h-0 min-w-full shrink-0 snap-center [scroll-snap-stop:normal]"
                    >
                      <Image
                        src={slide.src}
                        alt={t(slide.altKey)}
                        fill
                        draggable={false}
                        sizes="(max-width: 768px) 100vw, 960px"
                        quality={90}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="pointer-events-none object-cover"
                        style={{ objectPosition: slide.objectPosition }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="about-image-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="about-image-tint pointer-events-none absolute inset-0 bg-neon-red/[0.03] mix-blend-overlay" />

              {/* TRON corner brackets */}
              <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l border-t border-neon-red/25" />
              <div className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r border-t border-neon-red/25" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 border-l border-b border-neon-red/25" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b border-r border-neon-red/25" />

              {/* HUD decoration */}
              <div className="pointer-events-none absolute top-6 right-6 z-[15] flex items-center gap-2">
                <span className="h-1 w-1 animate-pulse-red bg-neon-red/40" style={{ boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)" }} />
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/20">SCAN ACTIVE</span>
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 z-[28] flex w-10 min-w-10 items-center justify-center pl-1 sm:w-11">
                <SliderArrowButton
                  direction="prev"
                  disabled={activeIndex <= 0}
                  aria-label={t("carousel.prevSlide")}
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="pointer-events-auto h-9 w-9 sm:h-10 sm:w-10"
                />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 z-[28] flex w-10 min-w-10 items-center justify-end pr-1 sm:w-11">
                <SliderArrowButton
                  direction="next"
                  disabled={activeIndex >= aboutSlideCount - 1}
                  aria-label={t("carousel.nextSlide")}
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="pointer-events-auto h-9 w-9 sm:h-10 sm:w-10"
                />
              </div>

              <span className="pointer-events-none absolute bottom-3 left-3 z-20 max-w-[40%] font-mono text-[7px] uppercase leading-tight tracking-[0.35em] text-neon-red/25 sm:bottom-3 sm:left-4 sm:max-w-[50%] sm:text-[8px] sm:tracking-[0.4em]">
                INTERIOR // LVIV-07
              </span>
            </div>
            <div
              className={cn(
                "mx-auto w-full max-w-md rounded border px-2 py-2.5 backdrop-blur-sm",
                "border-neon-red/20 bg-white/[0.02] shadow-none",
                "dark:border-neon-red/10 dark:bg-zinc-950/45 dark:shadow-[0_0_0_1px_hsl(0_0%_0%/0.35)_inset]"
              )}
              role="group"
              aria-label={t("about.carouselNavLabel")}
            >
              <div className="mb-1.5 text-center font-mono text-[9px] tabular-nums tracking-widest text-neon-red/50 dark:text-neon-red/45">
                {String(activeIndex + 1).padStart(2, "0")} / {String(aboutSlideCount).padStart(2, "0")}
              </div>
              <div className="space-y-1.5">
                <div
                  className="h-px w-full overflow-hidden rounded-full bg-neon-red/12 dark:bg-zinc-600/30"
                  aria-hidden
                >
                  <div
                    className="h-full origin-left bg-gradient-to-r from-neon-red/30 via-neon-red/60 to-neon-red/25 transition-transform duration-300 ease-out"
                    style={{
                      width: "100%",
                      transform: `scaleX(${(activeIndex + 1) / aboutSlideCount})`,
                    }}
                  />
                </div>
                <div
                  className="flex max-h-8 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto py-0.5 scrollbar-hide"
                  role="group"
                  aria-label={t("about.cardDotsLabel")}
                >
                  {ABOUT_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${i + 1} / ${aboutSlideCount}`}
                      aria-pressed={activeIndex === i}
                      onClick={() => goTo(i)}
                      className="flex h-8 min-w-[2rem] shrink-0 items-center justify-center rounded p-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-neon-red/45"
                    >
                      <span
                        className={cn(
                          "h-1 rounded-full border transition",
                          activeIndex === i
                            ? "w-4 border-neon-red/45 bg-neon-red/50 shadow-[0_0_6px_hsl(var(--neon-red)/0.2)]"
                            : "w-1 border-neon-red/20 bg-neon-red/10 opacity-70 hover:opacity-100 dark:border-zinc-600/30 dark:bg-zinc-600/40"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            className={cn(
              "flex flex-col gap-6 scroll-reveal",
              inView && "in-view"
            )}
            style={{ transitionDelay: inView ? "0.3s" : "0s" }}
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.text1")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.text2")}
            </p>

            {/* Stats with animated cyberpunk counters — trigger when 45% visible */}
            <div ref={statsRef} className="mt-4 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "tron-edge relative p-3 select-none scroll-reveal",
                    statsInView && "in-view"
                  )}
                  style={{ transitionDelay: statsInView ? `${0.3 + i * 0.15}s` : "0s" }}
                >
                  <CyberCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    inView={statsInView}
                    delay={0.3 + i * 0.15}
                    reducedMotion={reducedMotion}
                  />
                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
                    {stat.label}
                  </span>
                  {/* Bottom neon edge */}
                  <div
                    className="absolute bottom-0 left-0 h-px w-full"
                    style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.3), transparent)" }}
                  />
                </div>
              ))}
            </div>

            <div
              className={cn(
                "mt-2 h-px w-32 origin-left scroll-reveal-scale-x",
                inView && "in-view"
              )}
              style={{
                background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)",
                boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
                transitionDelay: inView ? "0.8s" : "0s",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
