"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { useInView } from "@/hooks/use-in-view";
import { SECTION_IDS } from "@/constants/routes";
import type { TranslationKey } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-media-query";
import { useScrollSnapCarousel } from "@/hooks/use-scroll-snap-carousel";
import { SliderArrowButton } from "./SliderArrowButton";

const REVIEW_KEYS = [
  { nameKey: "reviews.items.0.name" as TranslationKey, textKey: "reviews.items.0.text" as TranslationKey, tag: "RVW-001" },
  { nameKey: "reviews.items.1.name" as TranslationKey, textKey: "reviews.items.1.text" as TranslationKey, tag: "RVW-002" },
  { nameKey: "reviews.items.2.name" as TranslationKey, textKey: "reviews.items.2.text" as TranslationKey, tag: "RVW-003" },
  { nameKey: "reviews.items.3.name" as TranslationKey, textKey: "reviews.items.3.text" as TranslationKey, tag: "RVW-004" },
  { nameKey: "reviews.items.4.name" as TranslationKey, textKey: "reviews.items.4.text" as TranslationKey, tag: "RVW-005" },
  { nameKey: "reviews.items.5.name" as TranslationKey, textKey: "reviews.items.5.text" as TranslationKey, tag: "RVW-006" },
] as const;

const REVIEW_BODY_FONT =
  'var(--font-body), system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

function ReviewCard({
  review,
  index,
  inView,
  t,
  carousel = false,
}: {
  review: (typeof REVIEW_KEYS)[number];
  index: number;
  inView: boolean;
  t: (key: TranslationKey) => string;
  /** Extra horizontal inset so overlay arrows don’t crowd the card on mobile carousel */
  carousel?: boolean;
}) {
  const text = t(review.textKey);
  const pRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  useLayoutEffect(() => {
    const el = pRef.current;
    if (!el) return;
    const measure = () => {
      if (expanded) return;
      setCanExpand(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, expanded]);

  return (
    <div
      className={cn(
        "tron-edge holo-shimmer group relative flex min-h-[min(22rem,70dvh)] flex-col bg-card py-8 transition-all duration-500 hover:bg-muted scroll-reveal md:min-h-0",
        carousel ? "px-11 sm:px-12" : "px-8",
        inView && "in-view"
      )}
      style={{ transitionDelay: inView ? `${index * 0.1}s` : "0s" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 25px hsl(var(--neon-red) / 0.04), 0 0 15px hsl(var(--neon-red) / 0.04)" }}
      />
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/25">CLIENT LOG</span>
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground/25">{review.tag}</span>
      </div>
      <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30 group-hover:h-6 group-hover:w-6" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30 group-hover:h-6 group-hover:w-6" />
      {/* Quote out of document flow so body copy keeps equal inset left/right */}
      <div className="relative mb-6 min-h-0 flex-1">
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 block font-display text-4xl leading-none text-neon-red/10"
          style={{ textShadow: "0 0 20px hsl(var(--neon-red) / 0.08)" }}
        >
          {"\u201C"}
        </span>
        <p
          ref={pRef}
          className={cn(
            "relative z-[1] mx-0 max-w-none pt-[1.125rem] text-left text-pretty text-sm leading-relaxed text-muted-foreground",
            !expanded && "line-clamp-6"
          )}
          style={{ fontFamily: REVIEW_BODY_FONT }}
        >
          {text}
        </p>
        {canExpand && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((x) => !x)}
            className="relative z-[1] mt-2 text-left font-mono text-[9px] uppercase tracking-[0.25em] text-neon-red/70 transition-colors hover:text-neon-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/35"
          >
            {expanded ? t("reviews.readLess") : t("reviews.readMore")}
          </button>
        )}
      </div>
      <div
        className="mb-4 h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--neon-red) / 0.16) 50%, transparent 100%)",
        }}
      />
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center border border-neon-red/20 bg-muted font-body text-[11px] font-medium uppercase text-neon-red/50"
          style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.1)" }}
        >
          {t(review.nameKey).charAt(0)}
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">{t(review.nameKey)}</span>
          <div className="mt-1 flex gap-1">
            {Array.from({ length: 5 }).map((_, s) => (
              <span key={s} className="h-1.5 w-1.5 bg-neon-red/50" style={{ boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)" }} />
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
        style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)", boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)" }}
      />
    </div>
  );
}

export default function Reviews() {
  const { ref, inView } = useSectionInView();
  const { ref: reviewsMobileSliderInViewRef, inView: isReviewsMobileSliderInView } = useInView<HTMLDivElement>({
    once: false,
    amount: 0.12,
    margin: "0px",
  });
  const { t, locale } = useLocale();
  const isMobile = useIsMobile();
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollerRef, activeIndex, goTo, goNext, goPrev } = useScrollSnapCarousel(REVIEW_KEYS.length, {
    prefersReducedMotion: reducedMotion,
    autoplay: isMobile && isReviewsMobileSliderInView,
    autoplayIntervalMs: 3000,
    autoplayResumeAfterMs: 5000,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id={SECTION_IDS.reviews} className="relative px-6 py-12 md:py-16 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("reviews.tag")}
          title={t("reviews.title")}
          description={t("reviews.description")}
        />

        <div ref={ref}>
          {isMobile ? (
            <div
              className="flex flex-col gap-3"
              role="region"
              aria-label={t("reviews.carouselRegion")}
            >
              <div ref={reviewsMobileSliderInViewRef} className="relative w-full min-w-0">
                <div
                  ref={scrollerRef}
                  className={cn(
                    "flex w-full min-w-0 max-w-full snap-x snap-mandatory flex-nowrap gap-0",
                    "overflow-x-auto overflow-y-visible scroll-smooth overscroll-x-contain",
                    "touch-[pan-x_pan-y] scrollbar-hide"
                  )}
                >
                  {REVIEW_KEYS.map((review, i) => (
                    <div
                      key={`${review.tag}-${locale}`}
                      className="min-w-full w-full max-w-full shrink-0 snap-center snap-always [scroll-snap-stop:always]"
                    >
                      <ReviewCard review={review} index={i} inView={inView} t={t} carousel />
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 z-[28] flex w-10 min-w-10 items-center justify-center px-1.5">
                  <SliderArrowButton
                    direction="prev"
                    disabled={activeIndex <= 0}
                    aria-label={t("carousel.prevSlide")}
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="pointer-events-auto h-9 w-9"
                  />
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 z-[28] flex w-10 min-w-10 items-center justify-center px-1.5">
                  <SliderArrowButton
                    direction="next"
                    disabled={activeIndex >= REVIEW_KEYS.length - 1}
                    aria-label={t("carousel.nextSlide")}
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="pointer-events-auto h-9 w-9"
                  />
                </div>
              </div>

              <div
                className={cn(
                  "mx-auto w-full max-w-md rounded border px-2 py-2.5 backdrop-blur-sm",
                  "border-neon-red/20 bg-white/[0.02]",
                  "dark:border-neon-red/10 dark:bg-zinc-950/45 dark:shadow-[0_0_0_1px_hsl(0_0%_0%/0.35)_inset]"
                )}
                role="group"
                aria-label={t("reviews.carouselNavLabel")}
              >
                <div className="mb-1.5 text-center font-mono text-[9px] tabular-nums tracking-widest text-neon-red/50 dark:text-neon-red/45">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(REVIEW_KEYS.length).padStart(2, "0")}
                </div>
                <div className="space-y-1.5">
                  <div className="h-px w-full overflow-hidden rounded-full bg-neon-red/12 dark:bg-zinc-600/30" aria-hidden>
                    <div
                      className="h-full origin-left bg-gradient-to-r from-neon-red/30 via-neon-red/60 to-neon-red/25 transition-transform duration-300 ease-out"
                      style={{
                        width: "100%",
                        transform: `scaleX(${(activeIndex + 1) / REVIEW_KEYS.length})`,
                      }}
                    />
                  </div>
                  <div
                    className="flex max-h-8 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto py-0.5 scrollbar-hide"
                    role="group"
                    aria-label={t("reviews.cardDotsLabel")}
                  >
                    {REVIEW_KEYS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`${i + 1} / ${REVIEW_KEYS.length}`}
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEW_KEYS.map((review, i) => (
                <ReviewCard
                  key={`${review.tag}-${locale}`}
                  review={review}
                  index={i}
                  inView={inView}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
