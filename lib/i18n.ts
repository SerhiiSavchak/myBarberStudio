export type Locale = "uk" | "en" | "ru";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "uk", label: "Українська", short: "UA" },
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
];

const dict = {
  // Header
  "nav.services": { uk: "Послуги", en: "Services", ru: "Услуги" },
  "nav.tattoo": { uk: "Тату", en: "Tattoo", ru: "Тату" },
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
  "about.stat.haircuts": { uk: "Виконаних стрижок", en: "Haircuts Done", ru: "Выполненных стрижек" },

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
  "services.toning.name": { uk: "Тонування", en: "Toning", ru: "Тонирование" },
  "services.toning.desc": {
    uk: "Тонування та фарбування волосся та бороди.",
    en: "Hair and beard toning and coloring.",
    ru: "Тонирование и окрашивание волос и бороды.",
  },
  "services.combo.name": { uk: "Стрижка + борода", en: "Haircut + Beard", ru: "Стрижка + борода" },
  "services.combo.desc": {
    uk: "Повний комплекс: стрижка та оформлення бороди в одному сеансі.",
    en: "Full complex: haircut and beard styling in one session.",
    ru: "Полный комплекс: стрижка и оформление бороды в одном сеансе.",
  },
  "services.care.name": { uk: "Догляд", en: "Care", ru: "Уход" },
  "services.care.desc": {
    uk: "СПА процедури, депіляція та догляд за обличчям.",
    en: "SPA procedures, depilation and face care.",
    ru: "СПА процедуры, депиляция и уход за лицом.",
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
  "reviews.items.0.name": { uk: "Олександр М.", en: "Oleksandr M.", ru: "Александр М." },
  "reviews.items.0.text": {
    uk: "Найкращий барбершоп у Львові. Атмосфера неймовірна, стрижка бездоганна. Відчуваєш себе як у кіно.",
    en: "The best barbershop in Lviv. Incredible atmosphere, flawless haircut. You feel like you're in a movie.",
    ru: "Лучший барбершоп во Львове. Атмосфера невероятная, стрижка безупречная. Чувствуешь себя как в кино.",
  },
  "reviews.items.1.name": { uk: "Тарас К.", en: "Taras K.", ru: "Тарас К." },
  "reviews.items.1.text": {
    uk: "Мирослав — справжній майстер. Фейд вийшов ідеальний. Вже записався на наступний раз.",
    en: "Myroslav is a true master. The fade came out perfect. Already booked for next time.",
    ru: "Мирослав — настоящий мастер. Фейд получился идеальным. Уже записался на следующий раз.",
  },
  "reviews.items.2.name": { uk: "Роман Д.", en: "Roman D.", ru: "Роман Д." },
  "reviews.items.2.text": {
    uk: "Комплекс стрижка + борода — це інший рівень. Гарячий рушник, масаж, ідеальна борода. Варте кожної гривні.",
    en: "Haircut + beard combo is another level. Hot towel, massage, perfect beard. Worth every hryvnia.",
    ru: "Комплекс стрижка + борода — это другой уровень. Горячее полотенце, массаж, идеальная борода. Стоит каждой гривны.",
  },
  "reviews.items.3.name": { uk: "Іван П.", en: "Ivan P.", ru: "Иван П." },
  "reviews.items.3.text": {
    uk: "Чиста атмосфера, крута музика, майстри своєї справи. Тут інша енергетика. Рекомендую всім.",
    en: "Clean atmosphere, great music, masters of their craft. Different energy here. Recommend to everyone.",
    ru: "Чистая атмосфера, крутая музыка, мастера своего дела. Здесь другая энергетика. Рекомендую всем.",
  },
  "reviews.items.4.name": { uk: "Максим С.", en: "Maksym S.", ru: "Максим С." },
  "reviews.items.4.text": {
    uk: "Олег зрозумів що я хочу ще до того, як я пояснив. Ось це справжній професіоналізм. Обов'язково повернусь.",
    en: "Oleh understood what I wanted before I even explained. That's true professionalism. Will definitely come back.",
    ru: "Олег понял, что я хочу, ещё до того, как я объяснил. Вот это настоящий профессионализм. Обязательно вернусь.",
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

  // Services & Prices (detailed)
  "pricing.tag": { uk: "Послуги та ціни", en: "Services & Prices", ru: "Услуги и цены" },
  "pricing.title": { uk: "Послуги та ціни", en: "Services & Prices", ru: "Услуги и цены" },
  "pricing.description": {
    uk: "Повний перелік послуг та актуальні ціни.",
    en: "Full list of services and current prices.",
    ru: "Полный перечень услуг и актуальные цены.",
  },
  "pricing.note": {
    uk: "Ціна залежить від категорії спеціаліста",
    en: "Price depends on the specialist category",
    ru: "Цена зависит от категории специалиста",
  },
  "pricing.noteOffHours": {
    uk: "* Надання послуг в неробочі години рахуються по подвійному тарифу",
    en: "* Services provided outside working hours are charged at double rate",
    ru: "* Оказание услуг в нерабочее время оплачивается по двойному тарифу",
  },
  "pricing.noteSpa": {
    uk: "** СПА процедура для обличчя включає в себе очищення шкіри за допомогою гель-мила та скрабу, нанесення патчів та зволоження шкіри кремом. Кожне нанесення компонентів супроводжується масажем обличчя.",
    en: "** Face SPA procedure includes skin cleansing with gel soap and scrub, patch application and skin moisturizing with cream. Each application of components is accompanied by facial massage.",
    ru: "** СПА процедура для лица включает очищение кожи с помощью гель-мыла и скраба, нанесение патчей и увлажнение кожи кремом. Каждое нанесение компонентов сопровождается массажем лица.",
  },
  "pricing.book": { uk: "Записатись", en: "Book Now", ru: "Записаться" },
  "pricing.cat.haircuts": { uk: "Чоловічі стрижки", en: "Men's Haircuts", ru: "Мужские стрижки" },
  "pricing.cat.beard": { uk: "Борода", en: "Beard", ru: "Борода" },
  "pricing.cat.toning": { uk: "Тонування / фарбування", en: "Toning / Coloring", ru: "Тонирование / окрашивание" },
  "pricing.cat.combo": { uk: "Комбо", en: "Combo", ru: "Комбо" },
  "pricing.cat.tattoo": { uk: "Тату", en: "Tattoo", ru: "Тату" },
  "pricing.cat.care": { uk: "Догляд", en: "Care", ru: "Уход" },

  // Tattoo section
  "tattoo.tag": { uk: "Тату", en: "Tattoo", ru: "Тату" },
  "tattoo.title": { uk: "Тату", en: "Tattoo", ru: "Тату" },
  "tattoo.intro": {
    uk: "Авторські татуювання від нашого майстра Сергія. Кожна робота — унікальна. Стерильність та безпека на найвищому рівні.",
    en: "Custom tattoos by our master Serhii. Every work is unique. Sterility and safety at the highest level.",
    ru: "Авторские татуировки от нашего мастера Сергея. Каждая работа уникальна. Стерильность и безопасность на высшем уровне.",
  },
  "tattoo.point1": { uk: "стерильність та безпека", en: "sterility and safety", ru: "стерильность и безопасность" },
  "tattoo.point2": { uk: "індивідуальний ескіз", en: "individual sketch", ru: "индивидуальный эскиз" },
  "tattoo.point3": { uk: "консультація майстра", en: "master consultation", ru: "консультация мастера" },
  "tattoo.point4": { uk: "рекомендації по догляду", en: "aftercare recommendations", ru: "рекомендации по уходу" },
  "tattoo.bookConsult": { uk: "Записатись на консультацію", en: "Book Consultation", ru: "Записаться на консультацию" },
  "tattoo.portfolio": { uk: "Переглянути портфоліо", en: "View Portfolio", ru: "Просмотреть портфолио" },

  // Footer
  "footer.address": { uk: "вул. Мирослава Скорика, 21", en: "Myroslava Skoryka St, 21", ru: "ул. Мирослава Скорика, 21" },
} as const;

export type TranslationKey = keyof typeof dict;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] || entry["uk"];
}
