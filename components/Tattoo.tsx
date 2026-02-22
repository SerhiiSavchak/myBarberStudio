"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { BOOKING_URL } from "@/constants/routes";

const BULLET_KEYS = [
  "tattoo.point1",
  "tattoo.point2",
  "tattoo.point3",
  "tattoo.point4",
] as const;

export default function Tattoo() {
  const { ref, inView } = useSectionInView();
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Ink reveal: clip from 0% to 100% as user scrolls in
  const clipProgress = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.15, 1]);

  return (
    <section id="tattoo" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("tattoo.tag")}
          title={t("tattoo.title")}
        />

        <div ref={ref} className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Ink Reveal Image */}
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
            {/* Neon frame accent */}
            <div
              className="pointer-events-none absolute inset-0 z-20 border border-neon-red/20"
              style={{
                boxShadow:
                  "0 0 20px hsl(var(--neon-red) / 0.1), inset 0 0 20px hsl(var(--neon-red) / 0.03)",
              }}
            />

            {/* Image with mask reveal */}
            <motion.div
              className="absolute inset-0"
              style={{
                clipPath: useTransform(
                  clipProgress,
                  (v) => `inset(0 0 ${v}% 0)`
                ),
                scale: imageScale,
              }}
            >
              <Image
                src="/tattoo-preview.jpg"
                alt="Tattoo work preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/40 to-transparent" />

            {/* TRON corner brackets */}
            <div className="absolute left-3 top-3 z-20 h-8 w-8 border-l border-t border-neon-red/25" />
            <div className="absolute right-3 top-3 z-20 h-8 w-8 border-r border-t border-neon-red/25" />
            <div className="absolute bottom-3 left-3 z-20 h-8 w-8 border-l border-b border-neon-red/25" />
            <div className="absolute bottom-3 right-3 z-20 h-8 w-8 border-b border-r border-neon-red/25" />

            {/* HUD tag */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <span
                className="h-1 w-1 animate-pulse-red bg-neon-red/40"
                style={{
                  boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)",
                }}
              />
              <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/20">
                INK SESSION
              </span>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Intro text */}
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("tattoo.intro")}
            </p>

            {/* Bullet points */}
            <ul className="flex flex-col gap-3">
              {BULLET_KEYS.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="h-1 w-1 flex-shrink-0 bg-neon-red/50"
                    style={{
                      boxShadow: "0 0 6px hsl(var(--neon-red) / 0.3)",
                    }}
                  />
                  <span className="font-body text-sm text-foreground/80">
                    {t(key)}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Neon divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px w-32 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)",
                boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
              }}
            />

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn inline-flex items-center justify-center gap-2 px-8 py-3 font-body text-[11px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
              >
                {t("tattoo.bookConsult")}
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-neon-red cursor-pointer"
              >
                {t("tattoo.portfolio")}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-3.5 w-3.5"
                >
                  <path d="M3 8h10m0 0l-3-3m3 3l-3 3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
