"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { useIsMobile } from "@/hooks/use-media-query";
import { useScrollSafeTap } from "@/hooks/use-scroll-safe-tap";
import { SECTION_IDS } from "@/constants/routes";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { cn } from "@/lib/utils";

/** Minimal dark blur placeholder — prevents flash when image loads (matches card bg) */
const MASTER_IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AkwA/2Q==";

function MasterCard({
  master,
  index,
  inView,
  isOpen,
  isMobile,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  master: { name: string; title: string; description: string; image: string; tag: string };
  index: number;
  inView: boolean;
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { ref, tapHandlers } = useScrollSafeTap();

  return (
    <div
      ref={ref}
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isOpen ? "true" : undefined}
      className="group relative flex min-w-0 cursor-pointer select-none touch-manipulation transition-[flex] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] md:min-h-[520px]"
      style={{ flex: isOpen ? 3 : 1 }}
      {...tapHandlers}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-card scroll-reveal",
          inView && "in-view"
        )}
        style={{ transitionDelay: inView ? `${index * 0.12}s` : "0s" }}
      >
      <div className="masters-image-wrap relative isolate h-64 overflow-hidden bg-card md:absolute md:inset-0 md:h-auto">
        <Image
          src={master.image}
          alt={`${master.name} - ${master.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL={MASTER_IMAGE_BLUR}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04] group-data-[active=true]:scale-[1.04]"
        />
        <div className="masters-card-overlay absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent md:from-card md:via-card/30 md:to-card/10" />
        <div className="absolute inset-0 bg-neon-red/[0.04] opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100" aria-hidden />
      </div>
      <div className="absolute inset-0 border border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/15 group-data-[active=true]:border-neon-red/15 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100 pointer-events-none" style={{ boxShadow: "inset 0 0 30px hsl(var(--neon-red) / 0.05)" }} />
      <div className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30 group-data-[active=true]:border-neon-red/30" />
      <div className="pointer-events-none absolute right-2 bottom-2 h-5 w-5 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30 group-data-[active=true]:border-neon-red/30" />
      <div className="relative z-10 p-6 md:absolute md:inset-x-0 md:bottom-0 md:p-8">
        <span className="mb-2 block font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/20 select-none">{master.tag}</span>
        <h3 className="masters-name font-body text-xl font-bold uppercase tracking-wider text-foreground select-none">{master.name}</h3>
        <p className="masters-title mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-neon-red/50 select-none" style={{ textShadow: "0 0 6px hsl(var(--neon-red) / 0.2)" }}>{master.title}</p>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.28, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="master-description-flash text-sm leading-relaxed text-muted-foreground"
              >
                {master.description}
              </motion.p>
              <div className="mt-4 h-px w-20" style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full group-data-[active=true]:w-full" style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.6), transparent)", boxShadow: "0 0 8px hsl(var(--neon-red) / 0.3)" }} />
      </div>
    </div>
  );
}

export default function Masters() {
  const { ref, inView } = useSectionInView();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredDesktop, setHoveredDesktop] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { t } = useLocale();

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
    <section id={SECTION_IDS.masters} className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("masters.tag")}
          title={t("masters.title")}
          description={t("masters.description")}
        />

        <div ref={ref} className="flex flex-col gap-4 md:flex-row md:gap-1">
          {MASTERS.map((master, i) => {
            const isOpen = getIsOpen(i);
            return (
              <MasterCard
                key={master.name}
                master={master}
                index={i}
                inView={inView}
                isOpen={isOpen}
                isMobile={isMobile}
                onToggle={() => isMobile && setExpanded(isOpen ? null : i)}
                onMouseEnter={() => !isMobile && setHoveredDesktop(i)}
                onMouseLeave={() => !isMobile && setHoveredDesktop(null)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
