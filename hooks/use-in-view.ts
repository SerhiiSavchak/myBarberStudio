"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface UseInViewOptions {
  once?: boolean;
  amount?: number;
  margin?: string;
  root?: Element | null;
}

/**
 * Native IntersectionObserver hook — no framer-motion dependency.
 * Use for scroll-triggered reveals that can be done with CSS + class toggles.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { once = true, amount = 0, margin = "0px", root = null } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry) return;
      if (entry.isIntersecting) {
        setInView(true);
      } else if (!once) {
        setInView(false);
      }
    },
    [once]
  );

  const syncInView = useCallback((el: T) => {
    const r = el.getBoundingClientRect();
    const vh = typeof window !== "undefined" ? window.innerHeight : 0;
    const intersectsY = r.top < vh && r.bottom > 0;
    const intersectsX = r.left < (typeof window !== "undefined" ? window.innerWidth : 0) && r.right > 0;
    if (intersectsX && intersectsY) {
      setInView(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    syncInView(el);
    const raf = requestAnimationFrame(() => syncInView(el));

    const threshold =
      amount === 0
        ? 0
        : amount <= 1
          ? [0, amount, 1]
          : amount;

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin: margin,
      threshold: threshold as number | number[],
    });
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [handleIntersect, margin, amount, root, syncInView]);

  return { ref, inView };
}
