"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";

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
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
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
            onClick={onClose}
            className="absolute right-6 top-6 z-[101] flex h-10 w-10 items-center justify-center border border-neon-red/20 bg-background/50 text-foreground transition-all duration-300 hover:border-neon-red/50 hover:text-neon-red backdrop-blur-sm"
            aria-label="Close"
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

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const { t } = useLocale();

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    // Clamp between 5% and 95% to prevent extreme positions
    const pct = Math.max(5, Math.min((x / rect.width) * 100, 95));
    setPos(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePos(x);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updatePos]);

  return (
    <div
      ref={containerRef}
      className="tron-edge relative aspect-[16/10] cursor-ew-resize overflow-hidden bg-card select-none"
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
      role="slider"
      aria-label="Before/After comparison"
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
    >
      {/* "After" image — full background, no scaling */}
      <Image src="/gallery/gallery-1.jpg" alt="After" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
      {/* "Before" image — clipped via overflow, pinned to container width */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/gallery-3.jpg"
          alt="Before"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth || 800}px`, maxWidth: "none" }}
        />
      </div>
      {/* Neon red divider line */}
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
      {/* Labels */}
      <span className="absolute left-4 bottom-4 z-10 border border-neon-red/20 bg-background/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-neon-red/60 backdrop-blur-sm">
        {t("gallery.before")}
      </span>
      <span className="absolute right-4 bottom-4 z-10 border border-neon-red/20 bg-background/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-neon-red/60 backdrop-blur-sm">
        {t("gallery.after")}
      </span>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);
  const { t } = useLocale();

  return (
    <section id="gallery" className="relative px-6 py-24 md:py-32 lg:px-8">
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
              className="tron-edge holo-shimmer group relative aspect-square cursor-pointer overflow-hidden bg-card"
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
      <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
