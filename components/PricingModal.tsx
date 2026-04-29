"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { BOOKING_URL } from "@/constants/routes";
import { useLocale } from "@/lib/locale-context";

export interface PricingModalServiceRow {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: PricingModalServiceRow[];
  /** Defaults to main booking; e.g. tattoo category uses TATTOO_BOOKING_URL */
  bookingUrl?: string;
}

export default function PricingModal({
  isOpen,
  onClose,
  title,
  items,
  bookingUrl = BOOKING_URL,
}: PricingModalProps) {
  const { t } = useLocale();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pricing-modal-title"
        >
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
            style={{ touchAction: "none" }}
            aria-hidden="true"
          />

          {/* Modal panel — bottom sheet on mobile, centered on desktop */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-2xl border border-neon-red/20 bg-card shadow-2xl sm:max-h-[80vh] sm:rounded-xl sm:mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 40px hsl(var(--neon-red) / 0.1)",
            }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-neon-red/10 px-6 py-4">
              <h2
                id="pricing-modal-title"
                className="min-w-0 font-display text-lg font-semibold uppercase tracking-wide text-foreground break-words"
              >
                {title}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/50"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-neon-red/5 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <span className="min-w-0 font-body text-sm font-medium text-foreground break-words">
                        {item.name}
                      </span>
                      <span
                        className="shrink-0 font-mono text-sm font-semibold whitespace-nowrap text-neon-red/80 sm:text-right"
                        style={{ textShadow: "0 0 8px hsl(var(--neon-red) / 0.25)" }}
                      >
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/85">
                      {item.duration}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">
                      {item.description}
                    </p>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex font-body text-[10px] font-medium uppercase tracking-[0.2em] text-neon-red/90 underline-offset-4 transition-colors hover:text-neon-red hover:underline"
                    >
                      {t("pricing.book")}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
                {t("pricing.note")}
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0 border-t border-neon-red/10 px-6 py-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn flex w-full items-center justify-center gap-2 px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.2em]"
              >
                {t("pricing.book")}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
