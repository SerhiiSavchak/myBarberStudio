"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Returns true when viewport width < 768px.
 * Debounced to avoid excessive re-renders on resize.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let rafId: number | undefined;
    const check = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const onResize = () => {
      rafId = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);

  return isMobile;
}

/**
 * Returns true when the device has no hover capability (touch primary).
 * Use for mobile-specific interaction alternatives (tap vs hover).
 */
export function useHoverNone() {
  const [hoverNone, setHoverNone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const handler = () => setHoverNone(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return hoverNone;
}
