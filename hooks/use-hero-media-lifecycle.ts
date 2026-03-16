"use client";

import { useCallback, useRef, useState } from "react";
import type { HeroMediaState } from "@/lib/hero-media-types";
import { HERO_MEDIA_CONSTANTS } from "@/lib/hero-media-types";

export interface UseHeroMediaLifecycleOptions {
  /** Called once when hero is visually safe to reveal (playing or fallback) */
  onVisualReady: () => void;
  /** Max wait before forcing fallback — defaults to HERO_MEDIA_CONSTANTS.FALLBACK_MS */
  fallbackMs?: number;
}

/**
 * Deterministic hero background video lifecycle.
 * Uses callback ref for robust attachment — no reliance on first effect run.
 * Signals onVisualReady only when: playing OR fallback (poster safe).
 */
export function useHeroMediaLifecycle(options: UseHeroMediaLifecycleOptions) {
  const { onVisualReady, fallbackMs = HERO_MEDIA_CONSTANTS.FALLBACK_MS } = options;
  const [state, setState] = useState<HeroMediaState>("idle");
  const signaledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const onVisualReadyRef = useRef(onVisualReady);
  onVisualReadyRef.current = onVisualReady;

  const signal = useCallback(() => {
    if (signaledRef.current) return;
    signaledRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onVisualReadyRef.current();
  }, []);

  const videoCallbackRef = useCallback(
    (el: HTMLVideoElement | null) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (!el) {
        setState("idle");
        return;
      }

      setState("loading");

      const onCanPlay = () => {
        setState("canplay");
        attemptPlay();
      };

      const attemptPlay = async () => {
        setState("attempting_play");
        try {
          await el.play();
          setState("playing");
          signal();
        } catch {
          setState("fallback");
          signal();
        }
      };

      const onError = () => {
        setState("fallback");
        signal();
      };

      const onPlaying = () => {
        setState("playing");
        signal();
      };

      const onVisibility = () => {
        if (document.visibilityState === "visible" && el.paused && !signaledRef.current) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      };

      el.addEventListener("canplay", onCanPlay, { once: true });
      el.addEventListener("error", onError, { once: true });
      el.addEventListener("playing", onPlaying, { once: true });
      document.addEventListener("visibilitychange", onVisibility);

      if (el.readyState >= 3) {
        onCanPlay();
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        if (!signaledRef.current) {
          setState("fallback");
          signal();
        }
      }, fallbackMs);

      cleanupRef.current = () => {
        document.removeEventListener("visibilitychange", onVisibility);
        el.removeEventListener("canplay", onCanPlay);
        el.removeEventListener("error", onError);
        el.removeEventListener("playing", onPlaying);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    },
    [fallbackMs, signal]
  );

  return {
    videoCallbackRef,
    state,
    isVisualReady: state === "playing" || state === "fallback",
  };
}
