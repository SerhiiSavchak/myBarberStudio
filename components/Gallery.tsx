"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const GALLERY_IMAGES = [
  { src: "/gallery/gallery-1.jpg", alt: "Fresh fade haircut" },
  { src: "/gallery/gallery-2.jpg", alt: "Beard styling" },
  { src: "/gallery/gallery-3.jpg", alt: "Textured haircut" },
  { src: "/gallery/gallery-4.jpg", alt: "Barbershop interior" },
  { src: "/gallery/gallery-5.jpg", alt: "Barber tools" },
  { src: "/gallery/gallery-6.jpg", alt: "Pompadour style" },
];

/* Before/After Slider */
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePos(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
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
      className="relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded border border-border"
      onMouseDown={(e) => {
        dragging.current = true;
        updatePos(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        updatePos(e.touches[0].clientX);
      }}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
    >
      {/* After (full) */}
      <Image
        src="/gallery/gallery-1.jpg"
        alt="After styling"
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover"
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <Image
          src="/gallery/gallery-3.jpg"
          alt="Before styling"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
          style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }}
        />
      </div>
      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-neon-cyan shadow-[0_0_10px_hsl(var(--neon-cyan)/0.5)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-cyan/50 bg-background/80 backdrop-blur-sm">
          <svg viewBox="0 0 16 16" fill="none" stroke="hsl(var(--neon-cyan))" strokeWidth="1.5" className="h-4 w-4">
            <path d="M5 3L2 8l3 5M11 3l3 5-3 5" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute left-3 top-3 z-10 rounded-sm bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-sm bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        After
      </span>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="gallery" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="Portfolio"
          title="Our Work"
          description="Every cut tells a story. See the results."
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded border border-border bg-card"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" />

              {/* Hover label */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before / After Slider */}
        <div className="mx-auto mt-12 max-w-2xl">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
            {"// "}Before & After
          </p>
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
  );
}
