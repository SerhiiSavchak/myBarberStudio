"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefCallback } from "react";

export type ScrollSnapCarouselGoToOptions = {
  /** When true, does not push back the autoplay resume time (used by the autoplay tick only). */
  fromAutoplay?: boolean;
};

const DEFAULT_AUTOPLAY_MS = 3000;
const DEFAULT_RESUME_AFTER_MS = 5000;

/**
 * Equal-width scroll-snap track: one slide per scrollport (or per child width).
 * Updates activeIndex from scroll position; goTo / goNext / goPrev use smooth scroll.
 * activeIndexRef stays in sync for button navigation.
 *
 * Optional autoplay: advances every `autoplayIntervalMs`, loops to slide 0 after the last,
 * pauses for `autoplayResumeAfterMs` after any user interaction (not after autoplay ticks).
 * Disabled when `prefersReducedMotion` is true or `slideCount` < 2.
 *
 * Uses a callback ref + layout effect so scroll listeners attach when the scroll
 * node mounts (e.g. mobile-only Masters layout after isMobile flips) — a plain ref
 * + effect with [updateIndex] only would miss a ref that is null on first run.
 */
export function useScrollSnapCarousel(
  slideCount: number,
  options?: {
    prefersReducedMotion?: boolean;
    autoplay?: boolean;
    autoplayIntervalMs?: number;
    autoplayResumeAfterMs?: number;
  }
) {
  const {
    prefersReducedMotion = false,
    autoplay: autoplayEnabled = false,
    autoplayIntervalMs = DEFAULT_AUTOPLAY_MS,
    autoplayResumeAfterMs = DEFAULT_RESUME_AFTER_MS,
  } = options ?? {};
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [scrollerNode, setScrollerNode] = useState<HTMLDivElement | null>(null);

  const setScrollerRef: RefCallback<HTMLDivElement> = useCallback((node) => {
    scrollerRef.current = node;
    setScrollerNode(node);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const resumeAutoplayAfterRef = useRef(0);

  const markUserNavigated = useCallback(() => {
    resumeAutoplayAfterRef.current = Date.now() + autoplayResumeAfterMs;
  }, [autoplayResumeAfterMs]);

  const updateIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || slideCount < 1) return;
    const w = el.clientWidth;
    if (w <= 0) return;

    let idx = 0;
    const children = el.children;
    if (children.length > 0) {
      const mid = el.scrollLeft + w / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < children.length; i++) {
        const c = children[i] as HTMLElement;
        const cMid = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      idx = best;
    } else {
      idx = Math.round(el.scrollLeft / w);
    }

    idx = Math.min(slideCount - 1, Math.max(0, idx));
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, [slideCount]);

  useLayoutEffect(() => {
    const el = scrollerNode;
    if (!el) return;

    const onScroll = () => updateIndex();
    const onScrollEnd = () => updateIndex();
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateIndex);
    });
    ro.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd, { passive: true } as AddEventListenerOptions);
    requestAnimationFrame(updateIndex);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
    };
  }, [scrollerNode, updateIndex]);

  const goTo = useCallback(
    (index: number, scrollOpts?: ScrollSnapCarouselGoToOptions) => {
      if (!scrollOpts?.fromAutoplay) {
        markUserNavigated();
      }
      const el = scrollerRef.current;
      if (!el) return;
      const i = Math.min(slideCount - 1, Math.max(0, index));
      const child = el.children[i] as HTMLElement | undefined;
      const left = child != null ? child.offsetLeft : i * el.clientWidth;
      activeIndexRef.current = i;
      el.scrollTo({
        left,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [slideCount, prefersReducedMotion, markUserNavigated]
  );

  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  const goNext = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  useLayoutEffect(() => {
    const el = scrollerNode;
    if (!el || !autoplayEnabled) return;
    const onInteract = () => {
      markUserNavigated();
    };
    el.addEventListener("pointerdown", onInteract, { passive: true });
    el.addEventListener("touchstart", onInteract, { passive: true });
    /* Resume delay is measured from release; keeps drag/swipe from resuming too soon. */
    el.addEventListener("pointerup", onInteract, { passive: true });
    el.addEventListener("touchend", onInteract, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onInteract);
      el.removeEventListener("touchstart", onInteract);
      el.removeEventListener("pointerup", onInteract);
      el.removeEventListener("touchend", onInteract);
    };
  }, [scrollerNode, autoplayEnabled, markUserNavigated]);

  useEffect(() => {
    if (!autoplayEnabled || prefersReducedMotion || slideCount < 2) return;

    const id = window.setInterval(() => {
      if (Date.now() < resumeAutoplayAfterRef.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const cur = activeIndexRef.current;
      const next = cur >= slideCount - 1 ? 0 : cur + 1;
      goToRef.current(next, { fromAutoplay: true });
    }, autoplayIntervalMs);

    return () => {
      clearInterval(id);
    };
  }, [autoplayEnabled, prefersReducedMotion, slideCount, autoplayIntervalMs, scrollerNode]);

  return { scrollerRef: setScrollerRef, activeIndex, goTo, goNext, goPrev, updateIndex };
}
