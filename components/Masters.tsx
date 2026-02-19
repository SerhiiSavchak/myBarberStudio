"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";

export default function Masters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredDesktop, setHoveredDesktop] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const MASTERS = [
    {
      name: "Мирослав",
      title: t("masters.myroslav.title"),
      description: t("masters.myroslav.desc"),
      image: "/masters/master-1.jpg",
      tag: "MYB-MASTER-001",
    },
    {
      name: "Олег",
      title: t("masters.oleh.title"),
      description: t("masters.oleh.desc"),
      image: "/masters/master-2.jpg",
      tag: "MYB-MASTER-002",
    },
    {
      name: "Роман",
      title: t("masters.roman.title"),
      description: t("masters.roman.desc"),
      image: "/masters/master-3.jpg",
      tag: "MYB-MASTER-003",
    },
    {
      name: "Сергій",
      title: t("masters.serhii.title"),
      description: t("masters.serhii.desc"),
      image: "/masters/master-1.jpg",
      tag: "MYB-MASTER-004",
    },
  ];

  const getIsOpen = (i: number) => {
    if (isMobile) return expanded === i;
    return hoveredDesktop === i;
  };

  return (
    <section id="masters" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("masters.tag")}
          title={t("masters.title")}
          description={t("masters.description")}
        />

        <div ref={ref} className="flex flex-col gap-1 md:flex-row">
          {MASTERS.map((master, i) => {
            const isOpen = getIsOpen(i);

            return (
              <motion.div
                key={master.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onClick={() => isMobile && setExpanded(isOpen ? null : i)}
                onMouseEnter={() => !isMobile && setHoveredDesktop(i)}
                onMouseLeave={() => !isMobile && setHoveredDesktop(null)}
                className="group relative cursor-pointer overflow-hidden bg-card transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] md:min-h-[520px]"
                style={{ flex: isOpen ? 3 : 1 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden md:absolute md:inset-0 md:h-auto">
                  <Image
                    src={master.image}
                    alt={`${master.name} - ${master.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent md:from-card md:via-card/30 md:to-card/10" />
                  <div className="absolute inset-0 bg-neon-red/0 transition-all duration-500 group-hover:bg-neon-red/[0.04] mix-blend-overlay" />
                </div>

                {/* TRON edge frame */}
                <div className="absolute inset-0 border border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/15 pointer-events-none" />

                {/* Red edge glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px hsl(var(--neon-red) / 0.05)" }}
                />

                {/* HUD corner brackets */}
                <div className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30" />
                <div className="pointer-events-none absolute right-2 bottom-2 h-5 w-5 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30" />

                {/* Content — фиксированный блок, описание оверлеем чтобы не подпрыгивал */}
                <div className="relative z-10 p-6 md:absolute md:inset-x-0 md:bottom-0 md:p-8">
                  <span className="mb-2 block font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/20">
                    {master.tag}
                  </span>

                  <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-foreground">
                    {master.name}
                  </h3>
                  <p
                    className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-neon-red/50"
                    style={{ textShadow: "0 0 6px hsl(var(--neon-red) / 0.2)" }}
                  >
                    {master.title}
                  </p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {master.description}
                        </p>
                        <div
                          className="mt-4 h-px w-20"
                          style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom neon line */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.6), transparent)",
                    boxShadow: "0 0 8px hsl(var(--neon-red) / 0.3)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
