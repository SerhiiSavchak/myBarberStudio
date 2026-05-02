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

/** Yields one paint before `cb` so the poster can commit without competing for bandwidth. */
function cancelableDoubleRaf(cb: () => void) {
  let raf1 = 0;
  let raf2 = 0;
  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(cb);
  });
  return () => {
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}

/**
 * Hero background: poster-first, one mounted &lt;video&gt; (mobile or desktop only).
 * Readiness: loadeddata, canplay, canplaythrough, or playing.
 */
export function useHeroMediaLifecycle(options: UseHeroMediaLifecycleOptions = {}) {
  const {
    loadDelayMs = HERO_MEDIA_CONSTANTS.VIDEO_LOAD_DELAY_MS,
    fallbackMs = HERO_MEDIA_CONSTANTS.FALLBACK_MS,
  } = options;

  const [bpNarrow, setBpNarrow] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<HeroMediaState>("loading");
  const [refsVersion, setRefsVersion] = useState(0);
  const [hasRevealedVideo, setHasRevealedVideo] = useState(false);
  const lastIsN = useRef<boolean | null>(null);

  const videoCallbackRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) setRefsVersion((v) => v + 1);
  }, []);

  useLayoutEffect(() => {
    const mm = window.matchMedia(MOBILE_MQ);
    const sync = () => setBpNarrow(mm.matches);
    sync();
    mm.addEventListener("change", sync);
    return () => mm.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (bpNarrow === null) return;

    const mm = window.matchMedia(MOBILE_MQ);
    let lifecycleTeardown: (() => void) | null = null;
    let cancelScheduled: (() => void) | null = null;

    const attachLifecycle = (isN: boolean) => {
      lifecycleTeardown?.();
      lifecycleTeardown = null;
      cancelScheduled?.();
      cancelScheduled = null;

      if (lastIsN.current !== null && lastIsN.current !== isN) {
        setHasRevealedVideo(false);
      }
      lastIsN.current = isN;

      const el = videoRef.current;
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

      const runLoad = () => {
        if (!effectActive) return;
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
      };

      if (loadDelayMs > 0) {
        loadDelayRef.r = setTimeout(runLoad, loadDelayMs);
      } else {
        cancelScheduled = cancelableDoubleRaf(runLoad);
      }

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
        cancelScheduled?.();
        cancelScheduled = null;
      };
    };

    const onViewport = () => attachLifecycle(mm.matches);

    attachLifecycle(mm.matches);
    mm.addEventListener("change", onViewport);

    return () => {
      mm.removeEventListener("change", onViewport);
      lifecycleTeardown?.();
      cancelScheduled?.();
    };
  }, [refsVersion, bpNarrow, loadDelayMs, fallbackMs]);

  return {
    videoCallbackRef,
    /** Null until client layout reads viewport — then `true` = mobile hero source */
    bpNarrowReady: bpNarrow,
    state,
    hasRevealedVideo,
    isVisualReady: state === "playing" || state === "fallback",
  };
}
