"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { useIsMobile } from "@/hooks/use-media-query";
import { useScrollSafeTap } from "@/hooks/use-scroll-safe-tap";
import { SECTION_IDS } from "@/constants/routes";
import { useInView } from "@/hooks/use-in-view";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/lib/i18n";
import { useScrollSnapCarousel } from "@/hooks/use-scroll-snap-carousel";
import { SliderArrowButton } from "./SliderArrowButton";

/** Minimal dark blur placeholder */
const MASTER_IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AkwA/2Q==";

type MasterDef = {
  nameKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  image: string;
  altKey: TranslationKey;
  posNarrow: string;
  posWide: string;
};

const MASTER_LIST: readonly MasterDef[] = [
  { nameKey: "masters.n.myroslav", titleKey: "masters.myroslav.title", descKey: "masters.myroslav.desc", image: "/masters/miroslav.png", altKey: "masters.portrait.miroslav", posNarrow: "50% 8%", posWide: "50% 14%" },
  { nameKey: "masters.n.oleh", titleKey: "masters.oleh.title", descKey: "masters.oleh.desc", image: "/masters/oleg.png", altKey: "masters.portrait.oleh", posNarrow: "50% 7%", posWide: "50% 13%" },
  { nameKey: "masters.n.roman", titleKey: "masters.roman.title", descKey: "masters.roman.desc", image: "/masters/roman.png", altKey: "masters.portrait.roman", posNarrow: "50% 8%", posWide: "50% 14%" },
  { nameKey: "masters.n.vita", titleKey: "masters.vita.title", descKey: "masters.vita.desc", image: "/masters/vita.png", altKey: "masters.portrait.vita", posNarrow: "50% 10%", posWide: "50% 14%" },
  { nameKey: "masters.n.danya", titleKey: "masters.danya.title", descKey: "masters.danya.desc", image: "/masters/danya.png", altKey: "masters.portrait.danya", posNarrow: "50% 15%", posWide: "50% 22%" },
  { nameKey: "masters.n.illia", titleKey: "masters.illia.title", descKey: "masters.illia.desc", image: "/masters/illia.png", altKey: "masters.portrait.illia", posNarrow: "50% 8%", posWide: "50% 14%" },
  { nameKey: "masters.n.serhii", titleKey: "masters.serhii.title", descKey: "masters.serhii.desc", image: "/masters/sergiy.png", altKey: "masters.portrait.serhii", posNarrow: "50% 7%", posWide: "50% 12%" },
  { nameKey: "masters.n.mariia", titleKey: "masters.mariia.title", descKey: "masters.mariia.desc", image: "/masters/mariia.png", altKey: "masters.portrait.mariia", posNarrow: "50% 4%", posWide: "50% 10%" },
  { nameKey: "masters.n.iryna", titleKey: "masters.iryna.title", descKey: "masters.iryna.desc", image: "/masters/iryna.png", altKey: "masters.portrait.iryna", posNarrow: "50% 4%", posWide: "50% 10%" },
] as const;

/** Card flex-grow when open — lower = subtler width expansion, less “zoomed” look */
const FLEX_OPEN = 2.2;
const FLEX_CLOSED = 1;

function MasterCard({
  master,
  posNarrow,
  posWide,
  name,
  title,
  index,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isNarrow,
}: {
  master: { description: string; image: string; imageAlt: string };
  posNarrow: string;
  posWide: string;
  name: string;
  title: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isNarrow: boolean;
}) {
  const { ref, tapHandlers } = useScrollSafeTap();
  const objectPosition = isNarrow ? posNarrow : posWide;

  const ease = [0.4, 0, 0.2, 1] as const;
  const expandMs = 0.7;

  return (
    <motion.div
      ref={ref}
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isOpen ? "true" : undefined}
      initial={false}
      animate={
        isNarrow
          ? {}
          : {
              flexGrow: isOpen ? FLEX_OPEN : FLEX_CLOSED,
              flexBasis: 0,
            }
      }
      transition={{ type: "tween", duration: expandMs, ease }}
      className={cn(
        "group masters-group ui-decorative relative w-full min-w-0 min-h-0",
        "cursor-pointer touch-manipulation overflow-hidden rounded-none bg-zinc-950",
        "min-h-[min(30rem,92svh)] md:min-h-[min(34rem,70vh)] lg:min-h-[min(36rem,72vh)]",
        "z-0 data-[active=true]:z-20 md:group-hover:z-20",
        !isNarrow && "min-w-0 shrink"
      )}
      style={
        isNarrow
          ? undefined
          : {
              flexShrink: 1,
            }
      }
      {...tapHandlers}
    >
      <div className="relative h-full min-h-0 w-full">
        {/* Photo — tall on mobile; fills expanded flex on desktop */}
        <div
          className={cn(
            "relative w-full flex-shrink-0 overflow-hidden bg-zinc-950",
            "h-[min(30rem,92svh)] min-h-0",
            "md:absolute md:inset-0 md:h-full md:min-h-0"
          )}
        >
          <Image
            src={master.image}
            alt={master.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
            quality={95}
            placeholder="blur"
            blurDataURL={MASTER_IMAGE_BLUR}
            className="masters-card-image object-cover [backface-visibility:hidden] transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] md:group-hover:scale-[1.02] motion-reduce:md:group-hover:scale-100"
            style={{ objectPosition }}
            priority={index < 2}
          />
          <div className="masters-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/10 to-zinc-950/0 transition-colors duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] md:from-zinc-950/60 md:via-zinc-950/0 md:group-hover:from-zinc-950/70" />
          <div
            className="masters-hover-wash pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[active=true]:from-black/55 md:opacity-0 md:group-hover:from-black/45 md:group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <div className="pointer-events-none absolute inset-0 border border-white/0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[active=true]:border-neon-red/35 md:group-hover:border-neon-red/20" />
        <div className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-white/0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[active=true]:border-neon-red/50 md:group-hover:border-neon-red/30" />
        <div className="pointer-events-none absolute right-2 bottom-2 h-5 w-5 border-r border-b border-white/0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[active=true]:border-neon-red/50 md:group-hover:border-neon-red/30" />

        {/* Bottom overlay: one content group — meta, name, role, divider, then bio in grid 0fr→1fr (no reserved space when closed; bio below divider in DOM) */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="masters-bottom-panel relative bg-gradient-to-t from-zinc-950/95 from-0% via-zinc-950/50 to-transparent px-5 pb-7 pt-10 md:px-7 md:pb-8 md:pt-14">
            <div
              className={cn(
                "masters-bottom-dim pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-500 ease-[cubic-bezier(0.33,0,0.2,1)]",
                isOpen ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
            <div
              className={cn(
                "relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] will-change-transform motion-reduce:duration-200",
                isOpen && "-translate-y-2.5 md:-translate-y-3 motion-reduce:translate-y-0"
              )}
            >
              <h3 className="masters-name font-body text-xl font-bold uppercase leading-tight tracking-wider text-white md:text-2xl">
                {name}
              </h3>
              <p
                className="masters-title mt-2 line-clamp-2 font-mono text-[10px] uppercase leading-snug tracking-[0.26em] text-neon-red/90 sm:text-xs sm:tracking-[0.24em] md:tracking-[0.22em]"
                style={{ textShadow: "0 0 10px hsl(var(--neon-red) / 0.2)" }}
              >
                {title}
              </p>
              <div
                className="mt-3 h-px w-full max-w-none origin-left bg-gradient-to-r from-white/30 via-white/12 to-transparent"
                aria-hidden
              />
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] motion-reduce:duration-200",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={cn(
                      "master-description-flash max-h-[11rem] overflow-y-auto text-left text-sm leading-[1.75] text-zinc-50/95",
                      "pt-4",
                      "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.28,0,0.2,1)] motion-reduce:duration-150",
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-4 opacity-0",
                      "md:max-h-[9rem]"
                    )}
                    style={{ textShadow: "0 1px 16px rgba(0,0,0,0.55)" }}
                  >
                    {master.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-px w-0 transition-[width,opacity] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[active=true]:w-full md:group-hover:w-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.45), transparent)", boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)" }}
        />
      </div>
    </motion.div>
  );
}

export default function Masters() {
  const { ref: sectionRef } = useSectionInView();
  const { ref: mastersMobileSliderInViewRef, inView: isMastersMobileSliderInView } = useInView<HTMLDivElement>({
    once: false,
    amount: 0.12,
    margin: "0px",
  });
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredDesktop, setHoveredDesktop] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLocale();

  const { scrollerRef, activeIndex, goTo, goNext, goPrev } = useScrollSnapCarousel(MASTER_LIST.length, {
    prefersReducedMotion: reducedMotion,
    autoplay: isMobile && isMastersMobileSliderInView,
    autoplayIntervalMs: 4000,
    autoplayResumeAfterMs: 5000,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const MASTERS = MASTER_LIST.map((m) => ({
    ...m,
    name: t(m.nameKey),
    title: t(m.titleKey),
    description: t(m.descKey),
    imageAlt: t(m.altKey),
  }));

  const getIsOpen = (i: number) => {
    if (isMobile) return expanded === i;
    return hoveredDesktop === i;
  };

  return (
    <section
      id={SECTION_IDS.masters}
      className="masters-section relative px-6 pt-12 pb-8 md:pt-16 md:pb-10 lg:px-8"
    >
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("masters.tag")}
          title={t("masters.title")}
          description={t("masters.description")}
        />

        {isMobile ? (
          <div
            ref={sectionRef}
            className="flex flex-col gap-3"
            role="region"
            aria-label={t("masters.carouselRegion")}
          >
            <div
              ref={mastersMobileSliderInViewRef}
              className="relative w-full min-w-0 min-h-0"
            >
              <div
                ref={scrollerRef}
                className={cn(
                  "flex w-full min-w-0 max-w-full snap-x snap-mandatory flex-nowrap gap-0",
                  "overflow-x-auto overflow-y-visible scroll-smooth overscroll-x-contain",
                  "touch-[pan-x_pan-y] scrollbar-hide"
                )}
              >
                {MASTERS.map((master, i) => {
                  const isOpen = getIsOpen(i);
                  return (
                    <div
                      key={master.nameKey}
                      className="min-w-full w-full max-w-full shrink-0 snap-center snap-always [scroll-snap-stop:always]"
                    >
                      <div className="w-full min-w-0">
                        <MasterCard
                          master={{
                            description: master.description,
                            image: master.image,
                            imageAlt: master.imageAlt,
                          }}
                          posNarrow={master.posNarrow}
                          posWide={master.posWide}
                          name={master.name}
                          title={master.title}
                          index={i}
                          isOpen={isOpen}
                          isNarrow
                          onToggle={() => setExpanded(isOpen ? null : i)}
                          onMouseEnter={() => undefined}
                          onMouseLeave={() => undefined}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[28] flex w-10 min-w-10 items-center justify-center pl-1 sm:w-11">
                <SliderArrowButton
                  direction="prev"
                  disabled={activeIndex <= 0}
                  aria-label={t("carousel.prevSlide")}
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="pointer-events-auto h-9 w-9 sm:h-10 sm:w-10"
                />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 z-[28] flex w-10 min-w-10 items-center justify-end pr-1 sm:w-11">
                <SliderArrowButton
                  direction="next"
                  disabled={activeIndex >= MASTERS.length - 1}
                  aria-label={t("carousel.nextSlide")}
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="pointer-events-auto h-9 w-9 sm:h-10 sm:w-10"
                />
              </div>
            </div>
            <div
              className={cn(
                "mx-auto w-full max-w-md rounded border px-2 py-2.5 backdrop-blur-sm",
                "border-neon-red/20 bg-white/[0.02] shadow-none",
                "dark:border-neon-red/10 dark:bg-zinc-950/45 dark:shadow-[0_0_0_1px_hsl(0_0%_0%/0.35)_inset]"
              )}
              role="group"
              aria-label={t("masters.carouselNavLabel")}
            >
              <div className="mb-1.5 text-center font-mono text-[9px] tabular-nums tracking-widest text-neon-red/50 dark:text-neon-red/45">
                {String(activeIndex + 1).padStart(2, "0")} / {String(MASTERS.length).padStart(2, "0")}
              </div>
              <div className="space-y-1.5">
                <div
                  className="h-px w-full overflow-hidden rounded-full bg-neon-red/12 dark:bg-zinc-600/30"
                  aria-hidden
                >
                  <div
                    className="h-full origin-left bg-gradient-to-r from-neon-red/30 via-neon-red/60 to-neon-red/25 transition-transform duration-300 ease-out"
                    style={{
                      width: "100%",
                      transform: `scaleX(${(activeIndex + 1) / MASTERS.length})`,
                    }}
                  />
                </div>
                <div
                  className="flex max-h-8 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto py-0.5 scrollbar-hide"
                  role="group"
                  aria-label={t("masters.cardDotsLabel")}
                >
                  {MASTERS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${i + 1} / ${MASTERS.length}`}
                      aria-pressed={activeIndex === i}
                      onClick={() => goTo(i)}
                      className="flex h-8 min-w-[2rem] shrink-0 items-center justify-center rounded p-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-neon-red/45"
                    >
                      <span
                        className={cn(
                          "h-1 rounded-full border transition",
                          activeIndex === i
                            ? "w-4 border-neon-red/45 bg-neon-red/50 shadow-[0_0_6px_hsl(var(--neon-red)/0.2)]"
                            : "w-1 border-neon-red/20 bg-neon-red/10 opacity-70 hover:opacity-100 dark:border-zinc-600/30 dark:bg-zinc-600/40"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div ref={sectionRef} className="flex flex-col gap-5 md:min-h-0 md:gap-7">
            <div
              className="flex w-full min-h-0 flex-col gap-5 md:flex md:flex-row md:gap-6"
              style={{ minHeight: 0 }}
            >
              {MASTERS.slice(0, 3).map((master, i) => {
                const isOpen = getIsOpen(i);
                return (
                  <MasterCard
                    key={master.nameKey}
                    master={{
                      description: master.description,
                      image: master.image,
                      imageAlt: master.imageAlt,
                    }}
                    posNarrow={master.posNarrow}
                    posWide={master.posWide}
                    name={master.name}
                    title={master.title}
                    index={i}
                    isOpen={isOpen}
                    isNarrow={isMobile}
                    onToggle={() => isMobile && setExpanded(isOpen ? null : i)}
                    onMouseEnter={() => !isMobile && setHoveredDesktop(i)}
                    onMouseLeave={() => !isMobile && setHoveredDesktop(null)}
                  />
                );
              })}
            </div>
            <div
              className="flex w-full min-h-0 flex-col gap-5 md:flex md:flex-row md:gap-6"
              style={{ minHeight: 0 }}
            >
              {MASTERS.slice(3, 6).map((master, i) => {
                const globalIndex = 3 + i;
                const isOpen = getIsOpen(globalIndex);
                return (
                  <MasterCard
                    key={master.nameKey}
                    master={{
                      description: master.description,
                      image: master.image,
                      imageAlt: master.imageAlt,
                    }}
                    posNarrow={master.posNarrow}
                    posWide={master.posWide}
                    name={master.name}
                    title={master.title}
                    index={globalIndex}
                    isOpen={isOpen}
                    isNarrow={isMobile}
                    onToggle={() => isMobile && setExpanded(isOpen ? null : globalIndex)}
                    onMouseEnter={() => !isMobile && setHoveredDesktop(globalIndex)}
                    onMouseLeave={() => !isMobile && setHoveredDesktop(null)}
                  />
                );
              })}
            </div>
            <div
              className="flex w-full min-h-0 flex-col gap-5 md:flex md:flex-row md:gap-6"
              style={{ minHeight: 0 }}
            >
              {MASTERS.slice(6, 9).map((master, i) => {
                const globalIndex = 6 + i;
                const isOpen = getIsOpen(globalIndex);
                return (
                  <MasterCard
                    key={master.nameKey}
                    master={{
                      description: master.description,
                      image: master.image,
                      imageAlt: master.imageAlt,
                    }}
                    posNarrow={master.posNarrow}
                    posWide={master.posWide}
                    name={master.name}
                    title={master.title}
                    index={globalIndex}
                    isOpen={isOpen}
                    isNarrow={isMobile}
                    onToggle={() => isMobile && setExpanded(isOpen ? null : globalIndex)}
                    onMouseEnter={() => !isMobile && setHoveredDesktop(globalIndex)}
                    onMouseLeave={() => !isMobile && setHoveredDesktop(null)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
