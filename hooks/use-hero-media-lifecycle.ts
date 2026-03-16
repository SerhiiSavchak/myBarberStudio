"use client";

import { useCallback, useRef, useState } from "react";
import type { HeroMediaState } from "@/lib/hero-media-types";
import { HERO_MEDIA_CONSTANTS } from "@/lib/hero-media-types";

export interface UseHeroMediaLifecycleOptions {
  /** Delay before triggering full video load — lets critical resources load first */
  loadDelayMs?: number;
  /** Max wait before forcing fallback — defaults to HERO_MEDIA_CONSTANTS.FALLBACK_MS */
  fallbackMs?: number;
}

/**
 * Hero background video lifecycle — poster-first strategy.
 * Delays full video load until after delay, then attempts play.
 * Handles visibility change (tab focus) for replay.
 */
export function useHeroMediaLifecycle(options: UseHeroMediaLifecycleOptions = {}) {
  const {
    loadDelayMs = HERO_MEDIA_CONSTANTS.VIDEO_LOAD_DELAY_MS,
    fallbackMs = HERO_MEDIA_CONSTANTS.FALLBACK_MS,
  } = options;
  const [state, setState] = useState<HeroMediaState>("idle");
  const signaledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const videoCallbackRef = useCallback(
    (el: HTMLVideoElement | null) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (loadDelayRef.current) {
        clearTimeout(loadDelayRef.current);
        loadDelayRef.current = null;
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
          signaledRef.current = true;
        } catch {
          setState("fallback");
          signaledRef.current = true;
        }
      };

      const onError = () => {
        setState("fallback");
        signaledRef.current = true;
      };

      const onPlaying = () => {
        setState("playing");
        signaledRef.current = true;
      };

      const onVisibility = () => {
        if (document.visibilityState === "visible" && el.paused && el.readyState >= 2) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      };

      el.addEventListener("canplay", onCanPlay, { once: true });
      el.addEventListener("error", onError, { once: true });
      el.addEventListener("playing", onPlaying, { once: true });
      document.addEventListener("visibilitychange", onVisibility);

      /* Delay full video load — poster shows, critical resources load first */
      loadDelayRef.current = setTimeout(() => {
        loadDelayRef.current = null;
        el.load();
      }, loadDelayMs);

      /* Fallback timeout — if video never plays, poster stays visible */
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        if (!signaledRef.current) {
          setState("fallback");
          signaledRef.current = true;
        }
      }, fallbackMs);

      if (el.readyState >= 3) {
        onCanPlay();
      }

      cleanupRef.current = () => {
        document.removeEventListener("visibilitychange", onVisibility);
        el.removeEventListener("canplay", onCanPlay);
        el.removeEventListener("error", onError);
        el.removeEventListener("playing", onPlaying);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        if (loadDelayRef.current) {
          clearTimeout(loadDelayRef.current);
          loadDelayRef.current = null;
        }
      };
    },
    [loadDelayMs, fallbackMs]
  );

  return {
    videoCallbackRef,
    state,
    isVisualReady: state === "playing" || state === "fallback",
  };
}
