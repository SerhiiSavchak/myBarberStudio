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
  const { once = true, amount = 0.25, margin = "-50px 0px", root = null } = options;
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin: margin,
      threshold: amount,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect, margin, amount, root]);

  return { ref, inView };
}
