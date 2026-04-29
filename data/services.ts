/**
 * Єдине джерело правди: послуги та ціни (TOP Barber → нижня межа, Expert/Owner → верхня).
 *
 * TODO у коментарях — підтвердити відсутні ставки.
 */

import type { TranslationKey, Locale } from "@/lib/i18n";

export type ServiceItemDef = {
  id: string;
  /** Нижня межа (TOP Barber); якщо немає — частка діапазону невідома */
  priceTop?: number;
  /** Верхня межа (Expert / Owner) */
  priceExpert?: number;
  /** Фіксована ціна (показується як «X ₴», без «від») */
  fixedPrice?: number;
  /** Не враховувати ціну в підсумку діапазону на картці категорії */
  excludeFromCategoryRange?: boolean;
  /** Якщо true, показувати “ціну уточнюйте” замість чисел */
  priceOnInquiry?: boolean;
  title: Record<Locale, string>;
  duration: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
};

// TODO: Потрібно підтвердити ціну для TOP Barber
const MODELING_CORRECTION: ServiceItemDef = {
  id: "modeling-correction",
  priceExpert: 800,
  title: {
    uk: "Моделювання / корекція",
    en: "Trim / correction",
  },
  duration: { uk: "≈ 40 хв", en: "~40 min" },
  shortDescription: {
    uk: "Корекція стрижки або бороди, підрівнювання волосся при збереженні вихідної форми.",
    en: "Touch-up of haircut or beard while keeping the existing shape.",
  },
};

// TODO: Потрібно підтвердити ціну для TOP Barber
const BEARD_TONING: ServiceItemDef = {
  id: "beard-toning",
  priceExpert: 750,
  title: {
    uk: "Тонування бороди",
    en: "Beard toning",
  },
  duration: { uk: "≈ 30 хв", en: "~30 min" },
  shortDescription: {
    uk: "Корекція кольору бороди та вусів без шкоди для структури волосся.",
    en: "Colour correction for beard and moustache without damaging hair structure.",
  },
};

// TODO: Потрібно підтвердити ціну для Expert / Owner
const HEAD_FACE_MASSAGE: ServiceItemDef = {
  id: "head-face-massage",
  priceTop: 200,
  title: {
    uk: "Масаж голови та обличчя",
    en: "Head & face massage",
  },
  duration: { uk: "20 хв", en: "20 min" },
  shortDescription: {
    uk: "Масаж голови, шиї та обличчя за допомогою професійного ручного масажера.",
    en: "Massage for head, neck and face using a professional hand-held massager.",
  },
};

export const ALL_SERVICE_ITEMS: Record<string, ServiceItemDef> = {
  "mens-haircut": {
    id: "mens-haircut",
    priceTop: 600,
    priceExpert: 1100,
    title: { uk: "Чоловіча стрижка", en: "Men’s haircut" },
    duration: { uk: "1 год — 1 год 15 хв", en: "1 h — 1 h 15 min" },
    shortDescription: {
      uk: "Класична або сучасна стрижка з миттям волосся, укладкою та рекомендаціями по догляду.",
      en: "Classic or modern cut with wash, styling and home-care tips.",
    },
  },
  "beard-mustache": {
    id: "beard-mustache",
    priceTop: 500,
    priceExpert: 1000,
    title: { uk: "Стрижка бороди та вусів", en: "Beard & moustache trim" },
    duration: { uk: "≈ 1 год", en: "~1 h" },
    shortDescription: {
      uk: "Моделювання бороди, корекція форми та довжини, окантування і догляд професійними засобами.",
      en: "Beard shaping, length and outline work, finished with professional products.",
    },
  },
  "royal-shave": {
    id: "royal-shave",
    priceTop: 500,
    priceExpert: 1100,
    title: { uk: "Королівське гоління", en: "Royal shave" },
    duration: { uk: "≈ 1 год", en: "~1 h" },
    shortDescription: {
      uk: "Гоління небезпечною бритвою з підготовкою шкіри, гарячим і холодним рушником та фінальним зволоженням.",
      en: "Straight-razor shave with skin prep, hot and cold towels and moisturising finish.",
    },
  },
  "kids-haircut": {
    id: "kids-haircut",
    priceTop: 600,
    priceExpert: 1000,
    title: { uk: "Дитяча стрижка", en: "Kids haircut" },
    duration: { uk: "≈ 1 год", en: "~1 h" },
    shortDescription: {
      uk: "Стрижка для юного джентльмена з миттям волосся, укладкою та рекомендаціями по догляду.",
      en: "Young gentleman's cut with wash, styling and care advice.",
    },
  },
  "clipper-cut": {
    id: "clipper-cut",
    priceTop: 450,
    priceExpert: 900,
    title: {
      uk: "Стрижка під насадку / двома насадками",
      en: "Clipper cut (guards)",
    },
    duration: { uk: "45 хв — 1 год", en: "45 min — 1 h" },
    shortDescription: {
      uk: "Акуратна коротка стрижка машинкою з підбором насадок, миттям і сушкою волосся.",
      en: "Neat short clipper work with chosen guards, wash and blow-dry.",
    },
  },
  "long-haircut": {
    id: "long-haircut",
    priceTop: 700,
    priceExpert: 1300,
    title: { uk: "Стрижка на подовжене волосся", en: "Long hair cut" },
    duration: { uk: "≈ 1 год 30 хв", en: "~1 h 30 min" },
    shortDescription: {
      uk: "Індивідуальна стрижка на подовжене волосся з опрацюванням форми ножицями та бритвами.",
      en: "Custom long-hair cut with scissor and razor detailing.",
    },
  },
  "modeling-correction": MODELING_CORRECTION,
  "haircut-beard-combo": {
    id: "haircut-beard-combo",
    priceTop: 1100,
    priceExpert: 2100,
    title: { uk: "Стрижка + борода", en: "Haircut + beard" },
    duration: { uk: "1,5 — 2 год", en: "1.5 — 2 h" },
    shortDescription: {
      uk: "Комплекс: чоловіча стрижка та оформлення бороди в одному візиті.",
      en: "Men’s haircut and beard work in one visit.",
    },
  },
  "father-son": {
    id: "father-son",
    priceTop: 1200,
    priceExpert: 2100,
    title: { uk: "Тато + син", en: "Father & son" },
    duration: { uk: "≈ 2 год", en: "~2 h" },
    shortDescription: {
      uk: "Комплексна стрижка батька та сина послідовно у одного майстра.",
      en: "Back-to-back cuts for father and son with one barber.",
    },
  },
  "hair-toning": {
    id: "hair-toning",
    priceTop: 500,
    priceExpert: 750,
    title: {
      uk: "Тонування волосся / камуфлювання сивини",
      en: "Hair toning / grey blending",
    },
    duration: { uk: "≈ 30 хв", en: "~30 min" },
    shortDescription: {
      uk: "Корекція кольору волосся для чоловіків, у яких з’явилась сивина.",
      en: "Colour correction for men with grey hair.",
    },
  },
  "beard-toning": BEARD_TONING,
  "styling": {
    id: "styling",
    priceTop: 250,
    priceExpert: 350,
    title: { uk: "Укладка волосся", en: "Hair styling" },
    duration: { uk: "15 хв", en: "15 min" },
    shortDescription: {
      uk: "Миття, сушка волосся та нанесення професійної чоловічої косметики.",
      en: "Wash, blow-dry and professional men’s styling products.",
    },
  },
  waxing: {
    id: "waxing",
    priceTop: 200,
    priceExpert: 350,
    title: {
      uk: "Воскова депіляція / воскове видалення волосся",
      en: "Wax hair removal",
    },
    duration: { uk: "15 хв", en: "15 min" },
    shortDescription: {
      uk: "Видалення небажаного волосся в зоні брів, міжбрів’я, вух та носа.",
      en: "Removal of unwanted hair on brows, between brows, ears and nose.",
    },
  },
  "eye-patches": {
    id: "eye-patches",
    priceTop: 100,
    priceExpert: 200,
    title: { uk: "Патчі під очі", en: "Under-eye patches" },
    duration: { uk: "15 хв", en: "15 min" },
    shortDescription: {
      uk: "Гідрогелеві патчі для зволоження шкіри навколо очей та зменшення слідів втоми.",
      en: "Hydrogel patches to hydrate under-eye skin and reduce tiredness.",
    },
  },
  "spa-depot": {
    id: "spa-depot",
    priceTop: 400,
    priceExpert: 400,
    title: {
      uk: "SPA процедура для обличчя DEPOT",
      en: "DEPOT face SPA",
    },
    duration: { uk: "20 хв", en: "20 min" },
    shortDescription: {
      uk: "Очищення, скрабування, зволоження та догляд за обличчям засобами DEPOT.",
      en: "Cleanse, scrub, moisturise and treat with DEPOT products.",
    },
  },
  "spa-face": {
    id: "spa-face",
    priceTop: 300,
    priceExpert: 300,
    title: { uk: "SPA процедура для обличчя", en: "Face SPA" },
    duration: { uk: "20 хв", en: "20 min" },
    shortDescription: {
      uk: "Очищення шкіри обличчя, скраб, патчі, зволоження та масаж.",
      en: "Facial cleanse, scrub, patches, moisturiser and massage.",
    },
  },
  "hair-tattoo": {
    id: "hair-tattoo",
    priceTop: 200,
    priceExpert: 300,
    title: { uk: "Хеір тату", en: "Hair tattoo" },
    duration: { uk: "15 хв", en: "15 min" },
    shortDescription: {
      uk: "Виголені візерунки, малюнки та символи на короткій основі.",
      en: "Shaved patterns and designs on short hair.",
    },
  },
  "head-face-massage": HEAD_FACE_MASSAGE,
  "scalp-peel": {
    id: "scalp-peel",
    priceTop: 200,
    priceExpert: 200,
    title: { uk: "Пілінг шкіри голови", en: "Scalp peel" },
    duration: { uk: "20 хв", en: "20 min" },
    shortDescription: {
      uk: "Глибоке очищення шкіри голови преміальною косметикою: миття, скрабування та догляд.",
      en: "Deep scalp cleanse with premium products: wash, scrub and care.",
    },
  },
  "tattoo-consult": {
    id: "tattoo-consult",
    fixedPrice: 1,
    excludeFromCategoryRange: true,
    title: {
      uk: "Консультація у тату майстра",
      en: "Tattoo artist consultation",
    },
    duration: { uk: "30 хв", en: "30 min" },
    shortDescription: {
      uk: "Консультація з тату майстром щодо ідеї, ескізу, розміщення та майбутнього сеансу.",
      en: "Consultation on your idea, sketch, placement, and planning the session.",
    },
  },
  "tattoo-session": {
    id: "tattoo-session",
    priceTop: 1000,
    title: {
      uk: "Татуювання",
      en: "Tattooing",
    },
    duration: { uk: "1 год", en: "1 h" },
    shortDescription: {
      uk: "Індивідуальне татуювання від майстра. Вартість залежить від розміру, складності та деталей ескізу.",
      en: "Custom tattoo work. Price depends on size, complexity, and detail in the design.",
    },
  },
};

export type PricingCategoryDef = {
  /** Ідентифікатор для стану модалки */
  id: string;
  /** Відображається у куті картки (SVC-001 …) */
  protocolId: string;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  serviceIds: string[];
  /** Посилання на запис як у блоці тату */
  useTattooBookingUrl?: boolean;
  /** Підсумкова ціна на картці категорії (коли авто-діапазон не підходить) */
  summaryPriceOverride?: Record<Locale, string>;
};

export const PRICING_CATEGORIES: PricingCategoryDef[] = [
  {
    id: "haircuts",
    protocolId: "SVC-001",
    labelKey: "pricing.cat.haircuts",
    descKey: "services.haircuts.desc",
    serviceIds: [
      "mens-haircut",
      "kids-haircut",
      "clipper-cut",
      "long-haircut",
      "modeling-correction",
    ],
  },
  {
    id: "beard",
    protocolId: "SVC-002",
    labelKey: "pricing.cat.beard",
    descKey: "services.beard.desc",
    serviceIds: ["beard-mustache", "royal-shave"],
  },
  {
    id: "toning",
    protocolId: "SVC-003",
    labelKey: "pricing.cat.toning",
    descKey: "services.toning.desc",
    serviceIds: ["hair-toning", "beard-toning"],
  },
  {
    id: "combo",
    protocolId: "SVC-004",
    labelKey: "pricing.cat.combo",
    descKey: "services.combo.desc",
    serviceIds: ["haircut-beard-combo", "father-son"],
  },
  {
    id: "care",
    protocolId: "SVC-005",
    labelKey: "pricing.cat.care",
    descKey: "services.care.desc",
    serviceIds: [
      "styling",
      "waxing",
      "eye-patches",
      "spa-depot",
      "spa-face",
      "head-face-massage",
      "scalp-peel",
    ],
  },
  {
    id: "hair-tattoo",
    protocolId: "SVC-006",
    labelKey: "pricing.cat.hairTattoo",
    descKey: "services.hairTattoo.desc",
    serviceIds: ["hair-tattoo"],
  },
  {
    id: "tattoo",
    protocolId: "SVC-007",
    labelKey: "pricing.cat.tattoo",
    descKey: "services.tattoo.desc",
    serviceIds: ["tattoo-session", "tattoo-consult"],
    useTattooBookingUrl: true,
    summaryPriceOverride: {
      uk: "від 1 000 ₴",
      en: "from 1,000 UAH",
    },
  },
];

export function getServicesByIds(ids: string[]): ServiceItemDef[] {
  return ids.map((id) => {
    const item = ALL_SERVICE_ITEMS[id];
    if (!item) throw new Error(`Unknown service id: ${id}`);
    return item;
  });
}
