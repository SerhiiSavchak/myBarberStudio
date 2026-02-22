"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import { useLocale } from "@/lib/locale-context";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { SECTION_IDS } from "@/constants/routes";
import type { TranslationKey } from "@/lib/i18n";

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCategory {
  labelKey: TranslationKey;
  items: ServiceItem[];
}

const PRICING_DATA: {
  labelKey: TranslationKey;
  items: { name: { uk: string; en: string; ru: string }; price: string }[];
}[] = [
  {
    labelKey: "pricing.cat.haircuts",
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
    labelKey: "pricing.cat.beard",
    items: [
      { name: { uk: "Стрижка бороди", en: "Beard trim", ru: "Стрижка бороды" }, price: "400-800 грн" },
      { name: { uk: "Королівське гоління", en: "Royal shave", ru: "Королевское бритьё" }, price: "525-850 грн" },
    ],
  },
  {
    labelKey: "pricing.cat.toning",
    items: [
      { name: { uk: "Тонування волосся", en: "Hair toning", ru: "Тонирование волос" }, price: "500-700 грн" },
      { name: { uk: "Тонування бороди", en: "Beard toning", ru: "Тонирование бороды" }, price: "450-650 грн" },
    ],
  },
  {
    labelKey: "pricing.cat.combo",
    items: [
      { name: { uk: "Стрижка + корекція бороди", en: "Haircut + beard trim", ru: "Стрижка + коррекция бороды" }, price: "1000-1800 грн" },
      { name: { uk: "Тато + син", en: "Father + son", ru: "Отец + сын" }, price: "1100-2000 грн" },
    ],
  },
  {
    labelKey: "pricing.cat.tattoo",
    items: [
      { name: { uk: "Консультація", en: "Consultation", ru: "Консультация" }, price: "0 грн" },
      { name: { uk: "Виконання роботи", en: "Tattoo work", ru: "Выполнение работы" }, price: "від 1000 грн" },
    ],
  },
  {
    labelKey: "pricing.cat.care",
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

  const categories: ServiceCategory[] = PRICING_DATA.map((cat) => ({
    labelKey: cat.labelKey,
    items: cat.items.map((item) => ({
      name: item.name[locale],
      price: item.price,
    })),
  }));

  let globalIndex = 0;

  return (
    <section id={SECTION_IDS.services} className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("pricing.tag")}
          title={t("pricing.title")}
          description={t("pricing.description")}
        />

        <div ref={ref} className="flex flex-col gap-16">
          {categories.map((cat) => (
            <div key={cat.labelKey}>
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-3"
              >
                <span
                  className="block h-px w-8"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)",
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-red/60">
                  {t(cat.labelKey)}
                </span>
              </motion.div>

              {/* Cards grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.items.map((item) => {
                  const idx = globalIndex++;
                  return (
                    <ServiceCard
                      key={`${cat.labelKey}-${item.name}`}
                      name={item.name}
                      price={item.price}
                      index={idx}
                      inView={inView}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60"
        >
          {t("pricing.note")}
        </motion.p>
      </div>
    </section>
  );
}
