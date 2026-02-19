export type Locale = "uk" | "en" | "ru";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "uk", label: "Українська", short: "UA" },
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
];

const dict = {
  // Header
  "nav.services": { uk: "Послуги", en: "Services", ru: "Услуги" },
  "nav.team": { uk: "Команда", en: "Team", ru: "Команда" },
  "nav.gallery": { uk: "Галерея", en: "Gallery", ru: "Галерея" },
  "nav.reviews": { uk: "Відгуки", en: "Reviews", ru: "Отзывы" },
  "nav.contacts": { uk: "Контакти", en: "Contacts", ru: "Контакты" },
  "nav.book": { uk: "Записатись", en: "Book Now", ru: "Записаться" },

  // Hero
  "hero.tag": {
    uk: "LVIV DISTRICT 07 // Night Session",
    en: "LVIV DISTRICT 07 // Night Session",
    ru: "LVIV DISTRICT 07 // Night Session",
  },
  "hero.line1": { uk: "Стиль", en: "Style", ru: "Стиль" },
  "hero.line2": { uk: "народжується", en: "is born", ru: "рождается" },
  "hero.line3": { uk: "тут", en: "here", ru: "здесь" },
  "hero.subtitle": {
    uk: "M&Y Barber Studio — місце, де кожна стрижка стає мистецтвом. Преміум сервіс у серці Львова.",
    en: "M&Y Barber Studio — where every haircut becomes art. Premium service in the heart of Lviv.",
    ru: "M&Y Barber Studio — место, где каждая стрижка становится искусством. Премиум сервис в сердце Львова.",
  },
  "hero.cta": { uk: "Записатись", en: "Book Now", ru: "Записаться" },
  "hero.services": { uk: "Наші послуги", en: "Our Services", ru: "Наши услуги" },

  // About
  "about.tag": { uk: "Про нас", en: "About Us", ru: "О нас" },
  "about.title": { uk: "M&Y Barber Studio", en: "M&Y Barber Studio", ru: "M&Y Barber Studio" },
  "about.description": {
    uk: "Місце, де стиль народжується.",
    en: "Where style is born.",
    ru: "Место, где рождается стиль.",
  },
  "about.text1": {
    uk: "M&Y Barber Studio — це більше, ніж барбершоп. Це простір, де зустрічаються майстерність, стиль та атмосфера. Кожен візит — це індивідуальний підхід, преміум інструменти та увага до кожної деталі.",
    en: "M&Y Barber Studio is more than a barbershop. It's a space where craftsmanship, style, and atmosphere meet. Every visit is a personalized approach, premium tools, and attention to every detail.",
    ru: "M&Y Barber Studio — это больше, чем барбершоп. Это пространство, где встречаются мастерство, стиль и атмосфера. Каждый визит — это индивидуальный подход, премиум инструменты и внимание к каждой детали.",
  },
  "about.text2": {
    uk: "Ми працюємо у Львові та створюємо стрижки, які підкреслюють характер. Наша команда — це експерти з багаторічним досвідом, які постійно вдосконалюють свою майстерність.",
    en: "We work in Lviv and create haircuts that highlight character. Our team is made up of experts with years of experience who constantly improve their craft.",
    ru: "Мы работаем во Львове и создаём стрижки, которые подчёркивают характер. Наша команда — это эксперты с многолетним опытом, которые постоянно совершенствуют своё мастерство.",
  },
  "about.stat.years": { uk: "Років досвіду", en: "Years Experience", ru: "Лет опыта" },
  "about.stat.experts": { uk: "Експерти", en: "Experts", ru: "Эксперты" },
  "about.stat.clients": { uk: "Клієнтів", en: "Clients", ru: "Клиентов" },

  // Services
  "services.tag": { uk: "Послуги", en: "Services", ru: "Услуги" },
  "services.title": { uk: "Що ми пропонуємо", en: "What We Offer", ru: "Что мы предлагаем" },
  "services.description": {
    uk: "Кожна послуга — це індивідуальний підхід, преміум інструменти та увага до деталей.",
    en: "Every service is a personalized approach, premium tools and attention to detail.",
    ru: "Каждая услуга — это индивидуальный подход, премиум инструменты и внимание к деталям.",
  },
  "services.haircuts.name": { uk: "Чоловічі стрижки", en: "Men's Haircuts", ru: "Мужские стрижки" },
  "services.haircuts.desc": {
    uk: "Класичні та сучасні стрижки з урахуванням структури волосся та форми обличчя.",
    en: "Classic and modern haircuts considering hair structure and face shape.",
    ru: "Классические и современные стрижки с учётом структуры волос и формы лица.",
  },
  "services.beard.name": { uk: "Бороди", en: "Beards", ru: "Бороды" },
  "services.beard.desc": {
    uk: "Моделювання, корекція та догляд за бородою. Гарячий рушник включено.",
    en: "Modeling, correction and beard care. Hot towel included.",
    ru: "Моделирование, коррекция и уход за бородой. Горячее полотенце включено.",
  },
  "services.combo.name": { uk: "Стрижка + борода", en: "Haircut + Beard", ru: "Стрижка + борода" },
  "services.combo.desc": {
    uk: "Повний комплекс: стрижка та оформлення бороди в одному сеансі.",
    en: "Full complex: haircut and beard styling in one session.",
    ru: "Полный комплекс: стрижка и оформление бороды в одном сеансе.",
  },
  "services.face.name": { uk: "Догляд за обличчям", en: "Face Care", ru: "Уход за лицом" },
  "services.face.desc": {
    uk: "Чистка, зволоження, масаж обличчя. Преміум косметика та релакс.",
    en: "Cleansing, moisturizing, face massage. Premium cosmetics and relaxation.",
    ru: "Чистка, увлажнение, массаж лица. Премиум косметика и релакс.",
  },
  "services.tattoo.name": { uk: "Татуювання", en: "Tattoo", ru: "Татуировка" },
  "services.tattoo.desc": {
    uk: "Авторські тату від майстра Сергія. Індивідуальний ескіз та консультація.",
    en: "Custom tattoos by master Serhii. Individual sketch and consultation.",
    ru: "Авторские тату от мастера Сергея. Индивидуальный эскиз и консультация.",
  },
  "services.price.haircuts": { uk: "від 500 грн", en: "from 500 UAH", ru: "от 500 грн" },
  "services.price.beard": { uk: "від 350 грн", en: "from 350 UAH", ru: "от 350 грн" },
  "services.price.combo": { uk: "від 750 грн", en: "from 750 UAH", ru: "от 750 грн" },
  "services.price.face": { uk: "від 400 грн", en: "from 400 UAH", ru: "от 400 грн" },
  "services.price.tattoo": { uk: "за домовленістю", en: "by agreement", ru: "по договорённости" },

  // Booking
  "booking.tag": { uk: "Запис", en: "Booking", ru: "Запись" },
  "booking.title": { uk: "Як проходить запис", en: "How to Book", ru: "Как записаться" },
  "booking.description": {
    uk: "Три простих кроки до ідеальної стрижки.",
    en: "Three simple steps to the perfect haircut.",
    ru: "Три простых шага к идеальной стрижке.",
  },
  "booking.step1.title": { uk: "Обери послугу", en: "Choose Service", ru: "Выбери услугу" },
  "booking.step1.desc": {
    uk: "Стрижка, борода, комплекс або догляд — обирай те, що потрібно саме тобі.",
    en: "Haircut, beard, combo or care — choose what suits you.",
    ru: "Стрижка, борода, комплекс или уход — выбирай то, что нужно именно тебе.",
  },
  "booking.step2.title": { uk: "Обери майстра", en: "Choose Master", ru: "Выбери мастера" },
  "booking.step2.desc": {
    uk: "Кожен наш барбер — експерт. Обирай за стилем або за рекомендаціями.",
    en: "Each of our barbers is an expert. Choose by style or recommendations.",
    ru: "Каждый наш барбер — эксперт. Выбирай по стилю или по рекомендациям.",
  },
  "booking.step3.title": { uk: "Запишись онлайн", en: "Book Online", ru: "Запишись онлайн" },
  "booking.step3.desc": {
    uk: "Зручний онлайн-запис на сайті. Обирай дату, час та підтверджуй.",
    en: "Convenient online booking on the site. Choose date, time and confirm.",
    ru: "Удобная онлайн-запись на сайте. Выбирай дату, время и подтверждай.",
  },
  "booking.cta": { uk: "Записатись онлайн", en: "Book Online", ru: "Записаться онлайн" },

  // Masters
  "masters.tag": { uk: "Команда", en: "Team", ru: "Команда" },
  "masters.title": { uk: "Наші майстри", en: "Our Masters", ru: "Наши мастера" },
  "masters.description": {
    uk: "Експерти, які формують ваш стиль.",
    en: "Experts who shape your style.",
    ru: "Эксперты, которые формируют ваш стиль.",
  },
  "masters.myroslav.title": { uk: "Експерт / Власник", en: "Expert / Owner", ru: "Эксперт / Владелец" },
  "masters.myroslav.desc": {
    uk: "Засновник M&Y Barber Studio. Багаторічний досвід, авторський підхід до кожної стрижки. Спеціалізується на класичних та сучасних чоловічих стрижках.",
    en: "Founder of M&Y Barber Studio. Years of experience, unique approach to every haircut. Specializes in classic and modern men's haircuts.",
    ru: "Основатель M&Y Barber Studio. Многолетний опыт, авторский подход к каждой стрижке. Специализируется на классических и современных мужских стрижках.",
  },
  "masters.oleh.title": { uk: "Експерт", en: "Expert", ru: "Эксперт" },
  "masters.oleh.desc": {
    uk: "Майстер з бездоганним відчуттям стилю. Фейди, текстурні стрижки, креативні рішення. Кожна робота — як витвір мистецтва.",
    en: "Master with impeccable sense of style. Fades, textured cuts, creative solutions. Every work is like a masterpiece.",
    ru: "Мастер с безупречным чувством стиля. Фейды, текстурные стрижки, креативные решения. Каждая работа — как произведение искусства.",
  },
  "masters.roman.title": { uk: "Експерт", en: "Expert", ru: "Эксперт" },
  "masters.roman.desc": {
    uk: "Спеціаліст з бороди та комплексного догляду. Точність ліній, увага до деталей та індивідуальний підхід до кожного клієнта.",
    en: "Beard and comprehensive care specialist. Precision lines, attention to detail and individual approach to every client.",
    ru: "Специалист по бороде и комплексному уходу. Точность линий, внимание к деталям и индивидуальный подход к каждому клиенту.",
  },
  "masters.serhii.title": { uk: "Тату-майстер", en: "Tattoo Master", ru: "Тату-мастер" },
  "masters.serhii.desc": {
    uk: "Авторські татуювання в різних стилях. Індивідуальні ескізи, консультація та професійний підхід. Кожна робота унікальна.",
    en: "Custom tattoos in various styles. Individual sketches, consultation and professional approach. Every work is unique.",
    ru: "Авторские татуировки в различных стилях. Индивидуальные эскизы, консультация и профессиональный подход. Каждая работа уникальна.",
  },

  // Gallery
  "gallery.tag": { uk: "Галерея", en: "Gallery", ru: "Галерея" },
  "gallery.title": { uk: "Наші роботи", en: "Our Works", ru: "Наши работы" },
  "gallery.description": {
    uk: "Кожна стрижка розповідає свою історію.",
    en: "Every haircut tells its own story.",
    ru: "Каждая стрижка рассказывает свою историю.",
  },
  "gallery.before": { uk: "До", en: "Before", ru: "До" },
  "gallery.after": { uk: "Після", en: "After", ru: "После" },
  "gallery.beforeAfter": { uk: "До / Після", en: "Before / After", ru: "До / После" },

  // Reviews
  "reviews.tag": { uk: "Відгуки", en: "Reviews", ru: "Отзывы" },
  "reviews.title": { uk: "Що кажуть клієнти", en: "What Clients Say", ru: "Что говорят клиенты" },
  "reviews.description": {
    uk: "Реальні слова від наших постійних клієнтів.",
    en: "Real words from our regular clients.",
    ru: "Реальные слова от наших постоянных клиентов.",
  },

  // Contacts
  "contacts.tag": { uk: "Контакти", en: "Contacts", ru: "Контакты" },
  "contacts.title": { uk: "Локація", en: "Location", ru: "Локация" },
  "contacts.description": {
    uk: "Координати нашого барбер-хабу в серці Львова.",
    en: "Coordinates of our barber hub in the heart of Lviv.",
    ru: "Координаты нашего барбер-хаба в сердце Львова.",
  },
  "contacts.route": { uk: "Прокласти маршрут", en: "Get Directions", ru: "Проложить маршрут" },
  "contacts.bookNow": { uk: "Записатись зараз", en: "Book Now", ru: "Записаться сейчас" },

  // Footer
  "footer.address": { uk: "вул. Мирослава Скорика, 21", en: "Myroslava Skoryka St, 21", ru: "ул. Мирослава Скорика, 21" },
} as const;

export type TranslationKey = keyof typeof dict;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] || entry["uk"];
}
