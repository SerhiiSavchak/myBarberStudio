"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { HeroMediaState } from "@/lib/hero-media-types";
import { HERO_MEDIA_CONSTANTS } from "@/lib/hero-media-types";

const MOBILE_MQ = "(max-width: 767px)";

/**
 * iOS (and some mobile engines) can show a black/blank frame at the native `loop` seam.
 * Skipping the last ~0.2s jumps before that gap / baked-in black tail. Desktop path does not use this.
 */
const MOBILE_LOOP_HEADROOM_SEC = 0.2;

export interface UseHeroMediaLifecycleOptions {
  loadDelayMs?: number;
  fallbackMs?: number;
}

/**
 * Hero background: poster-first, delayed load, one active &lt;video&gt; (mobile or desktop).
 * Readiness: loadeddata, canplay, canplaythrough, or playing.
 */
export function useHeroMediaLifecycle(options: UseHeroMediaLifecycleOptions = {}) {
  const {
    loadDelayMs = HERO_MEDIA_CONSTANTS.VIDEO_LOAD_DELAY_MS,
    fallbackMs = HERO_MEDIA_CONSTANTS.FALLBACK_MS,
  } = options;

  const [isNarrow, setIsNarrow] = useState(false);
  const mobileRef = useRef<HTMLVideoElement | null>(null);
  const desktopRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<HeroMediaState>("loading");
  const [refsVersion, setRefsVersion] = useState(0);
  /**
   * Latched: true after first `playing` for the current active element + breakpoint.
   * Drives CSS poster — never false on `ended`/`waiting`/loop; only false on error or breakpoint change.
   * Fixes poster flashing when `state` briefly leaves `"playing"` (e.g. second attach on ref order, `el.load()`).
   */
  const [hasRevealedVideo, setHasRevealedVideo] = useState(false);
  const lastIsN = useRef<boolean | null>(null);

  const mobileCallbackRef = useCallback((el: HTMLVideoElement | null) => {
    mobileRef.current = el;
    if (el) setRefsVersion((v) => v + 1);
  }, []);

  const desktopCallbackRef = useCallback((el: HTMLVideoElement | null) => {
    desktopRef.current = el;
    if (el) setRefsVersion((v) => v + 1);
  }, []);

  useLayoutEffect(() => {
    const mm = window.matchMedia(MOBILE_MQ);
    let lifecycleTeardown: (() => void) | null = null;

    const attachLifecycle = (isN: boolean) => {
      lifecycleTeardown?.();
      lifecycleTeardown = null;

      setIsNarrow(isN);
      if (lastIsN.current !== null && lastIsN.current !== isN) {
        setHasRevealedVideo(false);
      }
      lastIsN.current = isN;

      const el = isN ? mobileRef.current : desktopRef.current;
      if (!el) return;

      const loadDelayRef: { r: ReturnType<typeof setTimeout> | null } = { r: null };
      const timeoutRef: { r: ReturnType<typeof setTimeout> | null } = { r: null };
      let effectActive = true;
      const loadTriggeredRef = { current: false };
      const startOnceRef = { current: false };
      const signaledRef = { current: false };

      setState("loading");

      const clearTimers = () => {
        if (loadDelayRef.r) {
          clearTimeout(loadDelayRef.r);
          loadDelayRef.r = null;
        }
        if (timeoutRef.r) {
          clearTimeout(timeoutRef.r);
          timeoutRef.r = null;
        }
      };

      const attemptPlay = async () => {
        if (!effectActive) return;
        setState("attempting_play");
        try {
          await el.play();
        } catch {
          if (effectActive) {
            setState("fallback");
            signaledRef.current = true;
          }
        }
      };

      const startPlaybackOnce = () => {
        if (!loadTriggeredRef.current || !effectActive) return;
        if (startOnceRef.current) return;
        if (el.readyState < 2) return;
        startOnceRef.current = true;
        setState("canplay");
        void attemptPlay();
      };

      const onPlaying = () => {
        if (!effectActive) return;
        setState("playing");
        signaledRef.current = true;
      };

      /** Re-assert on every `playing` (including each loop) so UI never reverts if state flickers. */
      const onPlayingAny = () => {
        if (!effectActive) return;
        setHasRevealedVideo(true);
      };

      const onError = () => {
        if (effectActive) {
          console.error("[Hero video] load/playback error", {
            error: el.error
              ? { code: el.error.code, message: el.error.message }
              : "unknown",
            networkState: el.networkState,
            activeVideo: isN ? "mobile" : "desktop",
          });
          setHasRevealedVideo(false);
          setState("fallback");
          signaledRef.current = true;
        }
      };

      const onVisibility = () => {
        if (document.visibilityState === "visible" && el.paused && el.readyState >= 2) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      };

      document.addEventListener("visibilitychange", onVisibility);

      const mediaListeners: Array<{ ev: string; fn: () => void }> = [];

      loadDelayRef.r = setTimeout(() => {
        loadDelayRef.r = null;
        loadTriggeredRef.current = true;

        const onCanPlay = () => startPlaybackOnce();
        const onLoadedData = () => startPlaybackOnce();
        const onCanPlayThrough = () => startPlaybackOnce();

        el.addEventListener("canplay", onCanPlay, { once: true });
        el.addEventListener("loadeddata", onLoadedData, { once: true });
        el.addEventListener("canplaythrough", onCanPlayThrough, { once: true });
        el.addEventListener("playing", onPlaying, { once: true });
        el.addEventListener("playing", onPlayingAny);
        el.addEventListener("error", onError, { once: true });
        mediaListeners.push(
          { ev: "canplay", fn: onCanPlay },
          { ev: "loadeddata", fn: onLoadedData },
          { ev: "canplaythrough", fn: onCanPlayThrough },
          { ev: "playing", fn: onPlaying },
          { ev: "playing", fn: onPlayingAny },
          { ev: "error", fn: onError }
        );

        if (isN) {
          const onMobileSeamlessLoop = () => {
            if (!effectActive) return;
            const d = el.duration;
            if (!d || !Number.isFinite(d) || d < MOBILE_LOOP_HEADROOM_SEC * 2) return;
            if (el.currentTime < d - MOBILE_LOOP_HEADROOM_SEC) return;
            el.currentTime = 0;
          };
          el.addEventListener("timeupdate", onMobileSeamlessLoop);
          mediaListeners.push({ ev: "timeupdate", fn: onMobileSeamlessLoop });
        }

        el.load();
        if (el.readyState >= 2) {
          startPlaybackOnce();
        }
      }, loadDelayMs);

      timeoutRef.r = setTimeout(() => {
        timeoutRef.r = null;
        if (!signaledRef.current && effectActive) {
          setState("fallback");
          signaledRef.current = true;
        }
      }, fallbackMs);

      lifecycleTeardown = () => {
        effectActive = false;
        document.removeEventListener("visibilitychange", onVisibility);
        for (const { ev, fn } of mediaListeners) {
          el.removeEventListener(ev, fn);
        }
        clearTimers();
      };
    };

    const onViewport = () => {
      attachLifecycle(mm.matches);
    };

    onViewport();
    mm.addEventListener("change", onViewport);

    return () => {
      mm.removeEventListener("change", onViewport);
      lifecycleTeardown?.();
    };
  }, [refsVersion, loadDelayMs, fallbackMs]);

  return {
    mobileCallbackRef,
    desktopCallbackRef,
    state,
    isNarrow,
    /** When true, CSS shows video and hides still poster; latched, not tied to `ended`/loop. */
    hasRevealedVideo,
    isVisualReady: state === "playing" || state === "fallback",
  };
}
