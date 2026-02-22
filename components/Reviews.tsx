"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { SECTION_IDS } from "@/constants/routes";
import type { TranslationKey } from "@/lib/i18n";

const REVIEW_KEYS = [
  { nameKey: "reviews.items.0.name" as TranslationKey, textKey: "reviews.items.0.text" as TranslationKey, tag: "RVW-001" },
  { nameKey: "reviews.items.1.name" as TranslationKey, textKey: "reviews.items.1.text" as TranslationKey, tag: "RVW-002" },
  { nameKey: "reviews.items.2.name" as TranslationKey, textKey: "reviews.items.2.text" as TranslationKey, tag: "RVW-003" },
  { nameKey: "reviews.items.3.name" as TranslationKey, textKey: "reviews.items.3.text" as TranslationKey, tag: "RVW-004" },
  { nameKey: "reviews.items.4.name" as TranslationKey, textKey: "reviews.items.4.text" as TranslationKey, tag: "RVW-005" },
] as const;

export default function Reviews() {
  const { ref, inView } = useSectionInView();
  const { t } = useLocale();

  return (
    <section id={SECTION_IDS.reviews} className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("reviews.tag")}
          title={t("reviews.title")}
          description={t("reviews.description")}
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEW_KEYS.map((review, i) => (
            <motion.div
              key={review.tag}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="tron-edge holo-shimmer group relative flex flex-col bg-card p-8 transition-all duration-500 hover:bg-muted"
            >
              {/* Red edge glow on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ boxShadow: "inset 0 0 25px hsl(var(--neon-red) / 0.04), 0 0 15px hsl(var(--neon-red) / 0.04)" }}
              />

              {/* Top header bar */}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/25">
                  CLIENT LOG
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground/25">
                  {review.tag}
                </span>
              </div>

              {/* Corner brackets */}
              <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30 group-hover:h-6 group-hover:w-6" />
              <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/30 group-hover:h-6 group-hover:w-6" />

              {/* Quote mark */}
              <span
                className="mb-3 block font-display text-4xl leading-none text-neon-red/10"
                style={{ textShadow: "0 0 20px hsl(var(--neon-red) / 0.08)" }}
              >
                {"\u201C"}
              </span>

              {/* Review text */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {t(review.textKey)}
              </p>

              {/* Divider */}
              <div
                className="mb-4 h-px w-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.15), transparent)" }}
              />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center border border-neon-red/20 bg-muted font-body text-[11px] font-medium uppercase text-neon-red/50"
                  style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.1)" }}
                >
                  {t(review.nameKey).charAt(0)}
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                    {t(review.nameKey)}
                  </span>
                  {/* Rating dots */}
                  <div className="mt-1 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span
                        key={s}
                        className="h-1.5 w-1.5 bg-neon-red/50"
                        style={{ boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom neon line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)",
                  boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
