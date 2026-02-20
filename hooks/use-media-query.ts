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
