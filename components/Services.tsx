"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import CategoryCard from "./CategoryCard";
import PricingModal from "./PricingModal";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { SECTION_IDS } from "@/constants/routes";
import type { TranslationKey } from "@/lib/i18n";

interface ServiceItem {
  name: string;
  price: string;
}

interface Category {
  id: string;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  items: { name: { uk: string; en: string; ru: string }; price: string }[];
}

const PRICING_DATA: Category[] = [
  {
    id: "SVC-001",
    labelKey: "pricing.cat.haircuts",
    descKey: "services.haircuts.desc",
    items: [
      { name: { uk: "Стрижка", en: "Haircut", ru: "Стрижка" }, price: "500-1000 грн" },
      { name: { uk: "Стрижка на подовжене волосся", en: "Long hair cut", ru: "Стрижка на удлинённые волосы" }, price: "600-1100 грн" },
      { name: { uk: "Стрижка двома насадками", en: "Two-guard cut", ru: "Стрижка двумя насадками" }, price: "350-800 грн" },
      { name: { uk: "Укладка волосся", en: "Hair styling", ru: "Укладка волос" }, price: "250-350 грн" },
      { name: { uk: "Моделювання", en: "Modeling", ru: "Моделирование" }, price: "300-600 грн" },
      { name: { uk: "Хеір тату", en: "Hair tattoo", ru: "Хеір тату" }, price: "200 грн" },
      { name: { uk: "Дитяча стрижка", en: "Kids haircut", ru: "Детская стрижка" }, price: "500-1000 грн" },
    ],
  },
  {
    id: "SVC-002",
    labelKey: "pricing.cat.beard",
    descKey: "services.beard.desc",
    items: [
      { name: { uk: "Стрижка бороди", en: "Beard trim", ru: "Стрижка бороды" }, price: "400-800 грн" },
      { name: { uk: "Королівське гоління", en: "Royal shave", ru: "Королевское бритьё" }, price: "525-850 грн" },
    ],
  },
  {
    id: "SVC-003",
    labelKey: "pricing.cat.toning",
    descKey: "services.toning.desc",
    items: [
      { name: { uk: "Тонування волосся", en: "Hair toning", ru: "Тонирование волос" }, price: "500-700 грн" },
      { name: { uk: "Тонування бороди", en: "Beard toning", ru: "Тонирование бороды" }, price: "450-650 грн" },
    ],
  },
  {
    id: "SVC-004",
    labelKey: "pricing.cat.combo",
    descKey: "services.combo.desc",
    items: [
      { name: { uk: "Стрижка + корекція бороди", en: "Haircut + beard trim", ru: "Стрижка + коррекция бороды" }, price: "1000-1800 грн" },
      { name: { uk: "Тато + син", en: "Father + son", ru: "Отец + сын" }, price: "1100-2000 грн" },
    ],
  },
  {
    id: "SVC-005",
    labelKey: "pricing.cat.tattoo",
    descKey: "services.tattoo.desc",
    items: [
      { name: { uk: "Консультація", en: "Consultation", ru: "Консультация" }, price: "0 грн" },
      { name: { uk: "Виконання роботи", en: "Tattoo work", ru: "Выполнение работы" }, price: "від 1000 грн" },
    ],
  },
  {
    id: "SVC-006",
    labelKey: "pricing.cat.care",
    descKey: "services.care.desc",
    items: [
      { name: { uk: "СПА процедура для обличчя", en: "Face SPA", ru: "СПА процедура для лица" }, price: "300 грн" },
      { name: { uk: "СПА процедура DEPOT", en: "DEPOT SPA", ru: "СПА процедура DEPOT" }, price: "400 грн" },
      { name: { uk: "Патчі під очі", en: "Under-eye patches", ru: "Патчи под глаза" }, price: "100-200 грн" },
      { name: { uk: "Воскова депіляція", en: "Wax depilation", ru: "Восковая депиляция" }, price: "200-300 грн" },
    ],
  },
];

export default function Services() {
  const { ref, inView } = useSectionInView();
  const { t, locale } = useLocale();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const categories = PRICING_DATA.map((cat) => ({
    ...cat,
    title: t(cat.labelKey),
    description: t(cat.descKey),
    items: cat.items.map((item) => ({
      name: item.name[locale],
      price: item.price,
    })),
  }));

  const activeCategory = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)
    : null;

  return (
    <section id={SECTION_IDS.services} className="relative px-6 py-24 md:py-32 lg:px-8">
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
              id={cat.id}
              name={cat.title}
              description={cat.description}
              index={i}
              inView={inView}
              onClick={() => setActiveCategoryId(cat.id)}
            />
          ))}
        </div>

        {/* Notes */}
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

      {/* Modal with price list */}
      <PricingModal
        isOpen={!!activeCategory}
        onClose={() => setActiveCategoryId(null)}
        title={activeCategory?.title ?? ""}
        items={activeCategory?.items ?? []}
      />
    </section>
  );
}
