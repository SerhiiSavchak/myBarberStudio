"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import CategoryCard from "./CategoryCard";
import PricingModal from "./PricingModal";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { BOOKING_URL, SECTION_IDS, TATTOO_BOOKING_URL } from "@/constants/routes";
import { PRICING_CATEGORIES, getServicesByIds } from "@/data/services";
import {
  formatCategoryPriceRange,
  formatServicePrice,
  formatServicesCount,
} from "@/lib/service-price";

export default function Services() {
  const { ref, inView } = useSectionInView();
  const { t, locale } = useLocale();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const inquiry = t("pricing.priceInquiry");
    return PRICING_CATEGORIES.map((cat) => {
      const defs = getServicesByIds(cat.serviceIds);
      return {
        id: cat.id,
        protocolId: cat.protocolId,
        title: t(cat.labelKey),
        description: t(cat.descKey),
        priceRange:
          cat.summaryPriceOverride?.[locale] ??
          formatCategoryPriceRange(defs, locale, inquiry),
        servicesCount: formatServicesCount(defs.length, locale),
        useTattooBookingUrl: cat.useTattooBookingUrl ?? false,
        modalItems: defs.map((def) => ({
          id: def.id,
          name: def.title[locale],
          price: formatServicePrice(def, locale, inquiry),
          duration: def.duration[locale],
          description: def.shortDescription[locale],
        })),
      };
    });
  }, [locale, t]);

  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : null;

  const bookingUrl =
    activeCategory?.useTattooBookingUrl === true
      ? TATTOO_BOOKING_URL
      : BOOKING_URL;

  return (
    <section id={SECTION_IDS.services} className="relative px-6 py-12 md:py-16 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("pricing.tag")}
          title={t("pricing.title")}
          description={t("pricing.description")}
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              protocolId={cat.protocolId}
              name={cat.title}
              description={cat.description}
              priceRange={cat.priceRange}
              servicesCount={cat.servicesCount}
              index={i}
              inView={inView}
              onClick={() => setActiveCategoryId(cat.id)}
            />
          ))}
        </div>

        <div
          className={cn(
            "mt-12 flex flex-col items-center gap-3 text-center scroll-reveal",
            inView && "in-view"
          )}
          style={{ transitionDelay: inView ? "0.4s" : "0s" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            {t("pricing.note")}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            {t("pricing.noteOffHours")}
          </p>
          <p className="max-w-2xl font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed text-muted-foreground/60">
            {t("pricing.noteSpa")}
          </p>
        </div>
      </div>

      <PricingModal
        isOpen={!!activeCategory}
        onClose={() => setActiveCategoryId(null)}
        title={activeCategory?.title ?? ""}
        items={activeCategory?.modalItems ?? []}
        bookingUrl={bookingUrl}
      />
    </section>
  );
}
