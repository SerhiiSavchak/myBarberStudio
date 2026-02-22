"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";
import { useLockBodyScroll, setPendingScrollTo } from "@/hooks/use-lock-body-scroll";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { SECTION_IDS } from "@/constants/routes";

const GALLERY_IMAGES = [
  { src: "/gallery/gallery-1.jpg", alt: "Fade haircut", tag: "IMG-001" },
  { src: "/gallery/gallery-2.jpg", alt: "Beard styling", tag: "IMG-002" },
  { src: "/gallery/gallery-3.jpg", alt: "Textured cut", tag: "IMG-003" },
  { src: "/gallery/gallery-4.jpg", alt: "Studio interior", tag: "IMG-004" },
  { src: "/gallery/gallery-5.jpg", alt: "Barber tools", tag: "IMG-005" },
  { src: "/gallery/gallery-6.jpg", alt: "Classic style", tag: "IMG-006" },
];

/* Cinematic lightbox modal */
function GalleryModal({
  image,
  onClose,
}: {
  image: (typeof GALLERY_IMAGES)[0] | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(!!image);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, onClose]);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el || !image) return;
    const prevent = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchmove", prevent, { passive: false });
    return () => el.removeEventListener("touchmove", prevent);
  }, [image]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
          style={{ touchAction: "none" }}
          onClick={onClose}
        >
          {/* Cyberpunk grid backdrop */}
          <div className="pointer-events-none absolute inset-0 cyber-grid opacity-10" />

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-6 max-h-[85vh] max-w-5xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Neon border frame */}
            <div className="pointer-events-none absolute inset-0 z-20 border border-neon-red/30" style={{ boxShadow: "0 0 30px hsl(var(--neon-red) / 0.15), inset 0 0 30px hsl(var(--neon-red) / 0.05)" }} />

            {/* Corner brackets */}
            <div className="pointer-events-none absolute inset-0 z-20">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-neon-red/50" />
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-neon-red/50" />
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-neon-red/50" />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-neon-red/50" />
            </div>

            {/* Scanlines */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 0% 0% / 0.03) 3px, hsl(0 0% 0% / 0.03) 6px)",
              }}
            />

            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-full object-contain"
            />

            {/* Bottom label bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between bg-background/80 px-4 py-2 backdrop-blur-sm">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/60">{image.alt}</span>
              <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/40">{image.tag}</span>
            </div>
          </motion.div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-[101] flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center border border-neon-red/20 bg-background/50 text-foreground transition-all duration-300 hover:border-neon-red/50 hover:text-neon-red backdrop-blur-sm cursor-pointer select-none"
            aria-label="Закрити"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const BEFORE_AFTER_CASES = [
  { before: "/gallery/gallery-3.jpg", after: "/gallery/gallery-1.jpg", tag: "CASE-01" },
  { before: "/gallery/gallery-2.jpg", after: "/gallery/gallery-4.jpg", tag: "CASE-02" },
  { before: "/gallery/gallery-5.jpg", after: "/gallery/gallery-6.jpg", tag: "CASE-03" },
];

function BeforeAfterSlide({
  before,
  after,
  pos,
  onPosChange,
  containerRef,
  t,
}: {
  before: string;
  after: string;
  pos: number;
  onPosChange: (pct: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  t: (key: TranslationKey) => string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);

  const updatePos = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = Math.max(5, Math.min((x / rect.width) * 100, 95));
      onPosChange(pct);
    },
    [onPosChange, containerRef]
  );

  const handleDown = useCallback(
    (clientX: number) => {
      dragging.current = true;
      setIsDragging(true);
      updatePos(clientX);
    },
    [updatePos]
  );

  const handleUp = useCallback(() => {
    dragging.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      if ("touches" in e) e.preventDefault();
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePos(x);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [updatePos, handleUp]);

  return (
    <div
      ref={containerRef}
      className="tron-edge relative aspect-[16/10] cursor-ew-resize overflow-hidden bg-card select-none touch-manipulation"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handleDown(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) {
          e.preventDefault();
          updatePos(e.clientX);
        }
      }}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      role="slider"
      aria-label="Before/After comparison"
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
    >
      <Image src={after} alt="After" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth || 800}px`, maxWidth: "none" }}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 z-10 w-[2px]"
        style={{
          left: `${pos}%`,
          background: "hsl(var(--neon-red))",
          boxShadow: "0 0 10px hsl(var(--neon-red) / 0.5), 0 0 30px hsl(var(--neon-red) / 0.2)",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-neon-red/40 bg-background/80 backdrop-blur-sm"
          style={{ boxShadow: "0 0 10px hsl(var(--neon-red) / 0.2)" }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="hsl(var(--neon-red))" strokeWidth="1.5" className="h-4 w-4 opacity-70">
            <path d="M5 3L2 8l3 5M11 3l3 5-3 5" />
          </svg>
        </div>
      </div>
      <span className="absolute left-4 bottom-4 z-10 border border-neon-red/20 bg-background/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-neon-red/60 backdrop-blur-sm">
        {t("gallery.before")}
      </span>
      <span className="absolute right-4 bottom-4 z-10 border border-neon-red/20 bg-background/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-neon-red/60 backdrop-blur-sm">
        {t("gallery.after")}
      </span>
    </div>
  );
}

function BeforeAfterSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number } | null>(null);
  const { t } = useLocale();

  const goTo = useCallback((dir: -1 | 1) => {
    setActiveIndex((i) => Math.max(0, Math.min(BEFORE_AFTER_CASES.length - 1, i + dir)));
    setPos(50);
  }, []);

  const handleSwipeStart = useCallback((e: React.PointerEvent) => {
    const rect = (e.target as HTMLElement).closest(".overflow-hidden")?.getBoundingClientRect();
    if (!rect) return;
    const edgeZone = rect.width * 0.2;
    const x = e.clientX - rect.left;
    if (x < edgeZone || x > rect.width - edgeZone) {
      swipeStart.current = { x: e.clientX };
    }
  }, []);

  const handleSwipeEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!swipeStart.current) return;
      const dx = e.clientX - swipeStart.current.x;
      const threshold = 40;
      if (dx < -threshold) goTo(1);
      else if (dx > threshold) goTo(-1);
      swipeStart.current = null;
    },
    [goTo]
  );

  return (
    <div className="relative">
      <div
        className="overflow-hidden touch-pan-y"
        onPointerDown={handleSwipeStart}
        onPointerUp={handleSwipeEnd}
        onPointerCancel={handleSwipeEnd}
        onPointerLeave={handleSwipeEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <BeforeAfterSlide
              before={BEFORE_AFTER_CASES[activeIndex].before}
              after={BEFORE_AFTER_CASES[activeIndex].after}
              pos={pos}
              onPosChange={setPos}
              containerRef={containerRef}
              t={t}
            />
            <span className="absolute right-4 top-4 z-10 font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/40">
              {BEFORE_AFTER_CASES[activeIndex].tag}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel controls */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {BEFORE_AFTER_CASES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setPos(50);
              }}
              aria-label={`Case ${i + 1}`}
              className={`h-1.5 transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-neon-red/80" : "w-1.5 bg-neon-red/25 hover:bg-neon-red/40"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => goTo(-1)}
            disabled={activeIndex === 0}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center border border-neon-red/25 bg-background/60 text-neon-red/70 transition-colors hover:border-neon-red/50 hover:text-neon-red disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M10 12L6 8l4-4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            disabled={activeIndex === BEFORE_AFTER_CASES.length - 1}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center border border-neon-red/25 bg-background/60 text-neon-red/70 transition-colors hover:border-neon-red/50 hover:text-neon-red disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref, inView } = useSectionInView();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);
  const { t } = useLocale();

  return (
    <section id={SECTION_IDS.gallery} className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("gallery.tag")}
          title={t("gallery.title")}
          description={t("gallery.description")}
        />

        <div ref={ref} className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelectedImage(img)}
              className="tron-edge holo-shimmer group relative aspect-square cursor-pointer overflow-hidden bg-card select-none"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/40" />
              <div className="absolute inset-0 bg-neon-red/0 transition-all duration-500 group-hover:bg-neon-red/[0.04] mix-blend-overlay" />

              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/70">
                  {img.alt}
                </span>
              </div>

              <span className="absolute top-3 right-3 font-mono text-[7px] uppercase tracking-[0.3em] text-neon-red/0 transition-all duration-500 group-hover:text-neon-red/30">
                {img.tag}
              </span>

              {/* Expand icon — top right, larger, subtle hover animation */}
              <div className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded border border-neon-red/25 bg-background/70 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 group-hover:border-neon-red/50">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-neon-red">
                  <path d="M10 2h4v4M6 14H2v-4M14 2L9 7M2 14l5-5" />
                </svg>
              </div>

              <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30" />
              <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30" />
            </motion.div>
          ))}
        </div>

        {/* Before / After */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="block h-px w-8"
              style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)" }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-neon-red/40">
              {t("gallery.beforeAfter")}
            </span>
          </div>
          <BeforeAfterSlider />
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryModal image={selectedImage} onClose={() => { setPendingScrollTo(null); setSelectedImage(null); }} />
    </section>
  );
}
