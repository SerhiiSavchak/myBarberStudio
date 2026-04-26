"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseInViewOptions {
  once?: boolean;
  amount?: number;
  margin?: string;
  root?: Element | null;
}

/**
 * Native IntersectionObserver hook — no framer-motion dependency.
 * Use for scroll-triggered reveals that can be done with CSS + class toggles.
 *
 * The returned `ref` is a **callback ref** (not useRef) so the observer re-attaches when the
 * DOM node mounts after conditional render (e.g. mobile-only blocks). A plain ref can stay null
 * on the first effect run and never observe the element.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { once = true, amount = 0, margin = "0px", root = null } = options;
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  const setRef = useCallback((el: T | null) => {
    setNode(el);
  }, []);

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
    } else if (!once) {
      setInView(false);
    }
  }, [once]);

  useEffect(() => {
    if (!node) {
      if (!once) {
        setInView(false);
      }
      return;
    }

    syncInView(node);
    const raf = requestAnimationFrame(() => syncInView(node));

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
    observer.observe(node);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [node, handleIntersect, margin, amount, root, once, syncInView]);

  return { ref: setRef, inView };
}
