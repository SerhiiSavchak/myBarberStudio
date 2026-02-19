"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const GALLERY_IMAGES = [
  { src: "/gallery/gallery-1.jpg", alt: "Фейд стрижка", tag: "IMG-001" },
  { src: "/gallery/gallery-2.jpg", alt: "Оформлення бороди", tag: "IMG-002" },
  { src: "/gallery/gallery-3.jpg", alt: "Текстурна стрижка", tag: "IMG-003" },
  { src: "/gallery/gallery-4.jpg", alt: "Інтер'єр студії", tag: "IMG-004" },
  { src: "/gallery/gallery-5.jpg", alt: "Інструменти барбера", tag: "IMG-005" },
  { src: "/gallery/gallery-6.jpg", alt: "Класична зачіска", tag: "IMG-006" },
];

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
      className="tron-edge relative aspect-[16/10] cursor-ew-resize overflow-hidden bg-card"
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
      role="slider"
      aria-label="Порівняння до та після"
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
    >
      <Image src="/gallery/gallery-1.jpg" alt="Після" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <Image src="/gallery/gallery-3.jpg" alt="До" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-left" />
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
        До
      </span>
      <span className="absolute right-4 bottom-4 z-10 border border-neon-red/20 bg-background/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-neon-red/60 backdrop-blur-sm">
        Після
      </span>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="gallery" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Галерея"
          title="Наші роботи"
          description="Кожна стрижка розповідає свою історію."
        />

        {/* Image Grid */}
        <div ref={ref} className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="tron-edge holo-shimmer group relative aspect-square overflow-hidden bg-card"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/40" />
              {/* Red overlay wash on hover */}
              <div className="absolute inset-0 bg-neon-red/0 transition-all duration-500 group-hover:bg-neon-red/[0.04] mix-blend-overlay" />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/70">
                  {img.alt}
                </span>
              </div>

              {/* Tag */}
              <span className="absolute top-3 right-3 font-mono text-[7px] uppercase tracking-[0.3em] text-neon-red/0 transition-all duration-500 group-hover:text-neon-red/30">
                {img.tag}
              </span>

              {/* TRON corner glow on hover */}
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
              До / Після
            </span>
          </div>
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
  );
}
