"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { useScrollSafeTap } from "@/hooks/use-scroll-safe-tap";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";
import { useLockBodyScroll, setPendingScrollTo } from "@/hooks/use-lock-body-scroll";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { SECTION_IDS } from "@/constants/routes";

const GALLERY_IMAGES: { src: string; altKey: "gallery.work01" | "gallery.work02" | "gallery.work03" | "gallery.work04" | "gallery.work05" | "gallery.work06"; tag: string }[] = [
  { src: "/gallery/gallery-1.png", altKey: "gallery.work01", tag: "IMG-001" },
  { src: "/gallery/gallery-2.png", altKey: "gallery.work02", tag: "IMG-002" },
  { src: "/gallery/gallery-3.png", altKey: "gallery.work03", tag: "IMG-003" },
  { src: "/gallery/gallery-6.png", altKey: "gallery.work06", tag: "IMG-004" },
  { src: "/gallery/gallery-5.png", altKey: "gallery.work05", tag: "IMG-005" },
  { src: "/gallery/gallery-4.png", altKey: "gallery.work04", tag: "IMG-006" },
];

/* Cinematic lightbox modal */
function GalleryModal({
  image,
  onClose,
  t,
}: {
  image: (typeof GALLERY_IMAGES)[0] | null;
  onClose: () => void;
  t: (key: TranslationKey) => string;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(!!image);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
          <div className="pointer-events-none absolute inset-0 cyber-grid opacity-10" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-6 max-h-[85vh] max-w-5xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-0 z-20 border border-neon-red/30"
              style={{ boxShadow: "0 0 30px hsl(var(--neon-red) / 0.15), inset 0 0 30px hsl(var(--neon-red) / 0.05)" }}
            />

            <div className="pointer-events-none absolute inset-0 z-20">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-neon-red/50" />
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-neon-red/50" />
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-neon-red/50" />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-neon-red/50" />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 0% 0% / 0.03) 3px, hsl(0 0% 0% / 0.03) 6px)",
              }}
            />

            <Image
              src={image.src}
              alt={t(image.altKey)}
              width={1920}
              height={1280}
              quality={95}
              className="h-auto max-h-[85vh] w-full object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            <div className="absolute bottom-0 right-0 z-20 p-2">
              <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/40">{image.tag}</span>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-[101] flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center border border-neon-red/20 bg-background/50 text-foreground transition-all duration-300 hover:border-neon-red/50 hover:text-neon-red backdrop-blur-sm cursor-pointer select-none"
            aria-label={t("gallery.closeModal")}
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

function GalleryItem({
  img,
  index,
  inView,
  onSelect,
  alt,
}: {
  img: (typeof GALLERY_IMAGES)[0];
  index: number;
  inView: boolean;
  onSelect: () => void;
  alt: string;
}) {
  const { ref, tapHandlers } = useScrollSafeTap();

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={cn(
        "tron-edge holo-shimmer group relative aspect-square cursor-pointer overflow-hidden bg-card select-none touch-manipulation scroll-reveal-scale",
        inView && "in-view"
      )}
      style={{ transitionDelay: inView ? `${index * 0.1}s` : "0s" }}
      {...tapHandlers}
    >
      <Image
        src={img.src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
        quality={90}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/30" />
      <div className="absolute inset-0 bg-neon-red/0 transition-all duration-500 group-hover:bg-neon-red/[0.04] mix-blend-overlay" />

      <span className="absolute top-3 right-3 font-mono text-[7px] uppercase tracking-[0.3em] text-neon-red/0 transition-all duration-500 group-hover:text-neon-red/30">
        {img.tag}
      </span>

      <div className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded border border-neon-red/25 bg-background/70 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 group-hover:border-neon-red/50">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-neon-red">
          <path d="M10 2h4v4M6 14H2v-4M14 2L9 7M2 14l5-5" />
        </svg>
      </div>

      <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30" />
      <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30" />
    </div>
  );
}

export default function Gallery() {
  const { ref, inView } = useSectionInView();
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);
  const { t } = useLocale();

  return (
    <section id={SECTION_IDS.gallery} className="relative px-6 py-12 md:py-16 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("gallery.tag")}
          title={t("gallery.title")}
          description={t("gallery.description")}
        />

        <div ref={ref} className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img, i) => (
            <GalleryItem
              key={img.src}
              img={img}
              index={i}
              inView={inView}
              onSelect={() => setSelectedImage(img)}
              alt={t(img.altKey)}
            />
          ))}
        </div>
      </div>

      <GalleryModal
        image={selectedImage}
        t={t}
        onClose={() => {
          setPendingScrollTo(null);
          setSelectedImage(null);
        }}
      />
    </section>
  );
}
