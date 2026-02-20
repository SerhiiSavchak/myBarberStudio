"use client";

import { useEffect } from "react";

let lockCount = 0;

/** When set before unlock, scroll to this selector. Used by burger nav. */
let pendingScrollToSelector: string | null = null;

export function setPendingScrollTo(selector: string | null) {
  pendingScrollToSelector = selector;
}

/**
 * Overflow-only scroll lock — NO position:fixed, so NO scroll jump on iOS.
 * Uses overflow:hidden + touch-action. Overlays must add onTouchMove preventDefault for iOS.
 */
export function useLockBodyScroll(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    lockCount++;

    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";
    bodyStyle.overscrollBehavior = "none";
    htmlStyle.overflow = "hidden";

    return () => {
      lockCount--;
      if (lockCount <= 0) {
        lockCount = 0;
        const selector = pendingScrollToSelector;
        pendingScrollToSelector = null;

        bodyStyle.overflow = "";
        bodyStyle.touchAction = "";
        bodyStyle.overscrollBehavior = "";
        htmlStyle.overflow = "";

        if (selector) {
          requestAnimationFrame(() => {
            document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
          });
        }
      }
    };
  }, [isOpen]);
}
