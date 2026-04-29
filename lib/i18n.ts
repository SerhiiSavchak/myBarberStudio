export type Locale = "uk" | "en";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "uk", label: "Українська", short: "UA" },
  { code: "en", label: "English", short: "EN" },
];

const dict = {
  // Header
  "nav.services": { uk: "Послуги", en: "Services" },
  "nav.tattoo": { uk: "Тату", en: "Tattoo" },
  "nav.team": { uk: "Команда", en: "Team" },
  "nav.gallery": { uk: "Процес", en: "Process" },
  "nav.reviews": { uk: "Відгуки", en: "Reviews" },
  "nav.contacts": { uk: "Контакти", en: "Contacts" },
  "nav.book": { uk: "Записатись", en: "Book Now" },

  // Hero
  "hero.tag": {
    uk: "LVIV DISTRICT 07 // Night Session",
    en: "LVIV DISTRICT 07 // Night Session",
  },
  "hero.line1": { uk: "Стиль", en: "Style" },
  "hero.line2": { uk: "народжується", en: "is born" },
  "hero.line3": { uk: "тут", en: "here" },
  "hero.subtitle": {
    uk: "M&Y Barber Studio — місце, де кожна стрижка стає мистецтвом. Преміум сервіс у серці Львова.",
    en: "M&Y Barber Studio: premium cuts and care in central Lviv, where every session is treated like craftwork.",
  },
  "hero.cta": { uk: "Записатись", en: "Book Now" },
  "hero.services": { uk: "Наші послуги", en: "Our Services" },

  // About
  "about.tag": { uk: "Про нас", en: "About Us" },
  "about.title": { uk: "M&Y Barber Studio", en: "M&Y Barber Studio" },
  "about.description": {
    uk: "Місце, де стиль народжується.",
    en: "Where style is born.",
  },
  "about.text1": {
    uk: "M&Y Barber Studio — це більше, ніж барбершоп. Це простір, де зустрічаються майстерність, стиль та атмосфера. Кожен візит — це індивідуальний підхід, преміум інструменти та увага до кожної деталі.",
    en: "M&Y Barber Studio is more than a barbershop. It's where craft, style, and atmosphere meet. Each visit means a tailored approach, pro-grade tools, and real attention to the small things.",
  },
  "about.text2": {
    uk: "Ми працюємо у Львові та створюємо стрижки, які підкреслюють характер. Наша команда — це експерти з багаторічним досвідом, які постійно вдосконалюють свою майстерність.",
    en: "We're based in Lviv and cut hair that fits who you are. The team is experienced, low on ego, and always sharpening their skills.",
  },
  "about.stat.years": { uk: "Років досвіду", en: "Years of experience" },
  "about.stat.experts": { uk: "Експерти", en: "Experts" },
  "about.stat.clients": { uk: "Клієнтів", en: "Clients" },
  "about.stat.haircuts": { uk: "Виконаних стрижок", en: "Cuts completed" },
  "about.imageAlt": {
    uk: "Інтер'єр M&Y Barber Studio",
    en: "M&Y Barber Studio interior",
  },
  "about.slideAlt.1": {
    uk: "Сучасний інтер'єр M&Y Barber Studio з кирпичними стінами та преміум обладнанням",
    en: "M&Y Barber Studio interior with brick walls and premium equipment",
  },
  "about.slideAlt.2": {
    uk: "Зона миття волосся: крісла та неоновий логотип M&Y на кирпичній стіні",
    en: "Hair-wash stations and glowing M&Y logo on exposed brick at M&Y Barber Studio",
  },
  "about.slideAlt.3": {
    uk: "Настінний декор: неоновий напис M&Y Barber Studio на сітці з рослинами",
    en: "Neon M&Y Barber Studio sign on a metal plant grid at the studio",
  },
  "about.slideAlt.4": {
    uk: "Робочі місця: два барбер-крісла та дерев'яна стійка біля кирпичної стіни",
    en: "Two barber chairs and a wood workstation along a red-brick wall",
  },
  "about.slideAlt.5": {
    uk: "Преміальна вітрина з косметикою на підсвічених полицях",
    en: "Premium grooming products on illuminated wood shelves in the studio",
  },
  "about.slideAlt.6": {
    uk: "Крупний план полиць з косметикою DEPOT та STMNT на кирпичній стіні",
    en: "Close-up of professional styling products on lit shelves at M&Y Barber Studio",
  },
  "about.slideAlt.7": {
    uk: "Рецепція M&Y Barber Studio: стійка, рослини, неонова вивіска",
    en: "Reception desk, plants, and neon M&Y sign at the barber studio",
  },
  "about.carouselRegion": {
    uk: "Галерея фото інтер'єру M&Y Barber Studio",
    en: "M&Y Barber Studio interior photo gallery",
  },
  "about.slideIndicatorsLabel": {
    uk: "Перемикання слайдів",
    en: "Slide selection",
  },
  "about.carouselNavLabel": {
    uk: "Навігація по слайдах інтер'єру",
    en: "Interior slide navigation",
  },
  "about.cardDotsLabel": {
    uk: "Вибір слайду",
    en: "Choose a slide",
  },
  "masters.carouselRegion": {
    uk: "Команда M&Y Barber Studio, горизонтальна прокрутка",
    en: "M&Y Barber Studio team, horizontal scroll",
  },
  "masters.carouselNavLabel": {
    uk: "Перемикання карток команди",
    en: "Team card navigation",
  },
  "masters.cardDotsLabel": {
    uk: "Вибір картки",
    en: "Choose a card",
  },

  // Services
  "services.tag": { uk: "Послуги", en: "Services" },
  "services.title": { uk: "Що ми пропонуємо", en: "What We Offer" },
  "services.description": {
    uk: "Кожна послуга — це індивідуальний підхід, преміум інструменти та увага до деталей.",
    en: "Every service is tailored to you, with pro tools and an eye for detail.",
  },
  "services.haircuts.name": { uk: "Чоловічі стрижки", en: "Men's Haircuts" },
  "services.haircuts.desc": {
    uk: "Класичні та сучасні чоловічі стрижки: від насадки до подовженого волосся й корекції форми.",
    en: "Classic and modern men’s cuts: from clipper work to long hair and shape trim-ups.",
  },
  "services.beard.name": { uk: "Бороди", en: "Beards" },
  "services.beard.desc": {
    uk: "Моделювання бороди та вусів і королівське гоління з доглядом за шкірою.",
    en: "Beard and moustache shaping plus royal shave with full skin care.",
  },
  "services.toning.name": { uk: "Тонування", en: "Toning" },
  "services.toning.desc": {
    uk: "Тонування волосся та бороди, камуфлювання сивини.",
    en: "Hair and beard toning, including grey blending.",
  },
  "services.combo.name": { uk: "Стрижка + борода", en: "Haircut + Beard" },
  "services.combo.desc": {
    uk: "Комплексні візити: стрижка з бородою та формат «тато + син».",
    en: "Combo visits: haircut with beard and father & son sessions.",
  },
  "services.care.name": { uk: "Догляд", en: "Care" },
  "services.care.desc": {
    uk: "Укладка, воскова депіляція, патчі, SPA для обличчя, масаж і пілінг шкіри голови.",
    en: "Styling, waxing, patches, face SPA, massage and scalp peel.",
  },
  "services.face.name": { uk: "Догляд за обличчям", en: "Face Care" },
  "services.face.desc": {
    uk: "Чистка, зволоження, масаж обличчя. Преміум косметика та релакс.",
    en: "Cleansing, moisturizing, face massage. Premium cosmetics and relaxation.",
  },
  "services.tattoo.name": { uk: "Татуювання", en: "Tattoo" },
  "services.tattoo.desc": {
    uk: "Індивідуальне татуювання від майстра. Консультація — 1 ₴, сеанс — від 1 000 ₴.",
    en: "Custom tattooing with our artist. Consultation 1 UAH, sessions from 1,000 UAH.",
  },
  "services.hairTattoo.desc": {
    uk: "Візерунки та символи, виголені на короткій основі.",
    en: "Patterns and symbols shaved into short hair.",
  },
  "services.price.haircuts": { uk: "від 450 ₴", en: "from 450 UAH" },
  "services.price.beard": { uk: "від 500 ₴", en: "from 500 UAH" },
  "services.price.combo": { uk: "від 1100 ₴", en: "from 1100 UAH" },
  "services.price.face": { uk: "від 100 ₴", en: "from 100 UAH" },
  "services.price.tattoo": { uk: "від 1 000 ₴", en: "from 1,000 UAH" },

  // Booking
  "booking.tag": { uk: "Запис", en: "Booking" },
  "booking.title": { uk: "Як проходить запис", en: "How to Book" },
  "booking.description": {
    uk: "Три простих кроки до ідеальної стрижки.",
    en: "Three quick steps to your next cut.",
  },
  "booking.step1.title": { uk: "Обери послугу", en: "Choose Service" },
  "booking.step1.desc": {
    uk: "Стрижка, борода, комплекс або догляд — обирай те, що потрібно саме тобі.",
    en: "Haircut, beard, combo, or care. Pick what you actually need.",
  },
  "booking.step2.title": { uk: "Обери майстра", en: "Choose Master" },
  "booking.step2.desc": {
    uk: "Кожен наш барбер — експерт. Обирай за стилем або за рекомендаціями.",
    en: "Every barber here knows their craft. Choose by vibe or a friend's tip.",
  },
  "booking.step3.title": { uk: "Запишись онлайн", en: "Book Online" },
  "booking.step3.desc": {
    uk: "Зручний онлайн-запис на сайті. Обирай дату, час та підтверджуй.",
    en: "Book online: pick a date and time, then confirm. Done.",
  },
  "booking.cta": { uk: "Записатись онлайн", en: "Book Online" },

  // Masters
  "masters.tag": { uk: "Команда", en: "Team" },
  "masters.title": { uk: "Наші майстри", en: "Our Barbers" },
  "masters.description": {
    uk: "Експерти, які формують ваш стиль.",
    en: "Experts who shape your style.",
  },
  "masters.myroslav.title": { uk: "Експерт-власник", en: "Expert & Owner" },
  "masters.myroslav.desc": {
    uk: "Засновник простору та досвідчений барбер, який поєднує сильну техніку, стиль і увагу до деталей у кожній роботі.",
    en: "Founder of the space and an experienced barber who combines strong technique, style, and attention to detail in every cut.",
  },
  "masters.oleh.title": { uk: "Експерт", en: "Expert" },
  "masters.oleh.desc": {
    uk: "Барбер з уважним підходом до форми та текстури. Допомагає підібрати образ, що підкреслює індивідуальність клієнта.",
    en: "A barber with a careful eye for shape and texture. Helps you find a look that highlights who you are.",
  },
  "masters.roman.title": { uk: "Експерт", en: "Expert" },
  "masters.roman.desc": {
    uk: "Спеціалізується на чистих формах, акуратних переходах і комфортному сервісі. Цінує точність і стабільний результат.",
    en: "Focuses on clean lines, smooth fades, and a comfortable service. Values precision and consistent results.",
  },
  "masters.danya.title": { uk: "Топ майстер", en: "Top Master" },
  "masters.danya.desc": {
    uk: "Топ майстер з добре відчутною естетикою та спокійною виваженістю: підкреслює риси обличчя й характер без зайвого шуму. Підбирає сучасний охайний образ під твій ритм життя.",
    en: "A top master with a calm, deliberate touch and a sharp eye: brings out your face and character without overdoing it. Builds a clean, modern look that fits real life.",
  },
  "masters.serhii.title": { uk: "Тату-майстер", en: "Tattoo Artist" },
  "masters.serhii.desc": {
    uk: "Авторське татуювання в стерильних умовах, консультація з ескізу та акуратна реалізація: від задуму до готового тату, яке носитимеш довгими роками.",
    en: "Custom tattooing in a sterile setup, with sketch consultation and careful execution: from the idea to a finished piece you will wear for years.",
  },
  "masters.illia.title": { uk: "Топ майстер", en: "Top Master" },
  "masters.illia.desc": {
    uk: "Топ майстер, який будує чітку геометрію та плавні переходи, враховує структуру волосся й темперамент. Створює стрижки, що довго тримають форму й легко вкладаються вдома.",
    en: "A top master who builds clean geometry and smooth fades, reading hair structure and temperament. Haircuts that hold their shape and stay easy to style between visits.",
  },
  "masters.iryna.title": { uk: "Адміністратор", en: "Administrator" },
  "masters.iryna.desc": {
    uk: "Адміністратор, яка веде запис і комунікацію з гостями у студії: узгодження часу, зрозумілі відповіді та організація щоденного ритму. Тримає сервіс зібраним і передбачуваним, щоб кожен візит починався спокійно.",
    en: "An administrator who handles bookings and guest communication in the studio—scheduling, clear answers, and a steady daily rhythm. Keeps service organized and predictable so every visit starts calmly.",
  },
  "masters.mariia.title": { uk: "Адміністратор", en: "Administrator" },
  "masters.mariia.desc": {
    uk: "Адміністратор, яка зустрічає гостей у залі та допомагає впевнено пройти шлях від входу до зони майстрів. Піклується про комфорт і приємну атмосферу зустрічі, щоб перше враження від студії залишалося охайним.",
    en: "An administrator who welcomes guests in the space and guides them confidently from the door to the work area. Focuses on comfort and a pleasant first impression so the studio feels welcoming from the start.",
  },
  "masters.vita.title": { uk: "Експерт", en: "Expert" },
  "masters.vita.desc": {
    uk: "Майстриня, яка цінує естетику, точність і персональний підхід, допомагаючи створити гармонійний та впевнений образ.",
    en: "A stylist who cares about aesthetics, precision, and a personal read on you, so the result feels balanced and confident.",
  },
  "masters.n.myroslav": { uk: "Мирослав", en: "Myroslav" },
  "masters.n.oleh": { uk: "Олег", en: "Oleh" },
  "masters.n.roman": { uk: "Роман", en: "Roman" },
  "masters.n.danya": { uk: "Даня", en: "Danil" },
  "masters.n.serhii": { uk: "Сергій", en: "Serhii" },
  "masters.n.illia": { uk: "Ілля", en: "Illia" },
  "masters.n.iryna": { uk: "Ірина", en: "Iryna" },
  "masters.n.mariia": { uk: "Марія", en: "Mariia" },
  "masters.n.vita": { uk: "Вікторія", en: "Victoria" },
  "masters.portrait.miroslav": { uk: "Барбер Мирослав", en: "Barber Myroslav" },
  "masters.portrait.oleh": { uk: "Барбер Олег", en: "Barber Oleh" },
  "masters.portrait.roman": { uk: "Барбер Роман", en: "Barber Roman" },
  "masters.portrait.danya": { uk: "Даня, топ майстер", en: "Danil, Top Master" },
  "masters.portrait.serhii": { uk: "Тату-майстер Сергій", en: "Tattoo artist Serhii" },
  "masters.portrait.illia": { uk: "Топ майстер Ілля", en: "Top Master Illia" },
  "masters.portrait.iryna": { uk: "Адміністратор Ірина", en: "Administrator Iryna" },
  "masters.portrait.mariia": { uk: "Адміністратор Марія", en: "Administrator Mariia" },
  "masters.portrait.vita": { uk: "Барбер Вікторія", en: "Barber Victoria" },

  // Gallery
  "gallery.tag": { uk: "Фото", en: "Photos" },
  "gallery.title": { uk: "Процес", en: "Process" },
  "gallery.description": {
    uk: "Кожна стрижка розповідає свою історію.",
    en: "Every haircut tells its own story.",
  },
  "gallery.work01": { uk: "Інтер'єр студії", en: "Studio interior" },
  "gallery.work02": { uk: "Робота барбера", en: "Barber at work" },
  "gallery.work03": { uk: "У процесі", en: "Mid-session" },
  "gallery.work04": { uk: "Майстер за роботою, стрижка в студії M&Y", en: "Barber at work during a cut at M&Y" },
  "gallery.work05": { uk: "Команда студії", en: "Studio team" },
  "gallery.work06": { uk: "Робота з бородою", en: "Beard work" },
  "gallery.closeModal": { uk: "Закрити", en: "Close" },

  // Reviews
  "reviews.tag": { uk: "Відгуки", en: "Reviews" },
  "reviews.title": { uk: "Що кажуть клієнти", en: "What Clients Say" },
  "reviews.description": {
    uk: "Реальні слова від наших постійних клієнтів.",
    en: "Notes from people who keep coming back.",
  },
  "reviews.carouselRegion": {
    uk: "Відгуки клієнтів, горизонтальна прокрутка",
    en: "Client reviews, horizontal carousel",
  },
  "reviews.carouselNavLabel": {
    uk: "Навігація по відгуках",
    en: "Review slider navigation",
  },
  "reviews.cardDotsLabel": {
    uk: "Вибір відгуку",
    en: "Choose a review",
  },
  "reviews.readMore": { uk: "Читати більше", en: "Read more" },
  "reviews.readLess": { uk: "Згорнути", en: "Show less" },
  "reviews.items.0.name": { uk: "Katrin G.", en: "Katrin G." },
  "reviews.items.0.text": {
    uk: "Найкраща перукарня у Львові! Дуже рекомендую M&Y Barber Studio. Атмосфера неймовірна: теплий прийом, привітний персонал, сучасний інтер’єр і багато стильних деталей. Це не просто стрижка — це релакс і перезавантаження. Окрема подяка барберу Олегу — справжньому майстру, який відчуває, що потрібно клієнту. Хочеться повертатися знову і знову ❤️",
    en: "The best barbershop in Lviv! Highly recommend M&Y Barber Studio. The vibe is unreal — warm welcome, friendly team, modern interior, lots of stylish details. It’s not just a haircut; it’s a reset. Big thanks to barber Oleh — a real pro who reads what the client needs. I keep wanting to come back ❤️",
  },
  "reviews.items.1.name": { uk: "Ярослав Ш.", en: "Yaroslav Sh." },
  "reviews.items.1.text": {
    uk: "Олег — топ-майстер! Справжній професіонал із золотими руками. Дуже уважний до деталей, стрижка вийшла чітко, стильно і саме так, як я просив. Всім рекомендую. Обов’язково повернусь ще раз.",
    en: "Oleh is top-tier — a true pro with golden hands. Super attentive to detail; the cut turned out sharp, stylish, exactly how I asked. Recommend to everyone. I’ll definitely be back.",
  },
  "reviews.items.2.name": { uk: "Юлія Т.", en: "Yuliia T." },
  "reviews.items.2.text": {
    uk: "Разом з чоловіком відвідали барбершоп і залишилися дуже задоволені! Майстри уважно вислухали побажання, порадили, що краще підійде, і в результаті обом зробили стрижки саме так, як хотілося. Атмосфера приємна: комфортно, затишно, без зайвого пафосу. Обов’язково прийдемо ще!",
    en: "My husband and I came in together and left really happy. The barbers listened properly, suggested what would suit us better, and both cuts turned out just how we wanted. The vibe is comfy and low-key, no pretence. We’ll definitely return!",
  },
  "reviews.items.3.name": { uk: "Олександр Ш.", en: "Oleksandr Sh." },
  "reviews.items.3.text": {
    uk: "Професійний майстер, який уважно вислухав мої побажання та запропонував ідеальний варіант стрижки. Атмосфера дуже комфортна. Ціни цілком адекватні для такого рівня послуг. Рекомендую!",
    en: "A pro who actually listened and suggested the perfect cut for me. Really comfortable atmosphere. Prices feel fair for this level of service. Recommend!",
  },
  "reviews.items.4.name": { uk: "Марина К.", en: "Maryna K." },
  "reviews.items.4.text": {
    uk: "Хочу подякувати майстрам барбершопа! Стригли мого сина, і результат перевершив очікування. Дитина в захваті, а для батьків це найкраща оцінка 🙂 Дуже приємна атмосфера і професійний підхід. Ви найкращі ❤️",
    en: "Huge thanks to the team! They cut my son’s hair and it exceeded our expectations. He’s thrilled — best feedback you can get 🙂 Lovely vibe and a professional approach. You’re the best ❤️",
  },
  "reviews.items.5.name": { uk: "Павло С.", en: "Pavlo S." },
  "reviews.items.5.text": {
    uk: "Дуже круте місце! Атмосфера, майстри й сервіс — все на найвищому рівні 💈🔥 Рекомендую кожному, хто хоче виглядати стильно!",
    en: "Such a cool spot! The vibe, the barbers, the service — all top level 💈🔥 Recommend it to anyone who wants to look sharp!",
  },

  // Contacts
  "contacts.tag": { uk: "Контакти", en: "Contacts" },
  "contacts.title": { uk: "Локація", en: "Location" },
  "contacts.description": {
    uk: "Координати нашого барбер-хабу в серці Львова.",
    en: "Where to find our barber hub in central Lviv.",
  },
  "contacts.route": { uk: "Прокласти маршрут", en: "Get Directions" },
  "contacts.bookNow": { uk: "Записатись зараз", en: "Book Now" },
  "contacts.addressLine": {
    uk: "Львів, вул. Мирослава Скорика, 21",
    en: "Lviv, Myroslava Skoryka St, 21",
  },
  "contacts.hoursLine": { uk: "Пн–Нд: 10:00–20:00", en: "Mon–Sun: 10:00–20:00" },
  "contacts.subline": {
    uk: "Район 07 // Точка доступу // Барбер-хаб",
    en: "District 07 // Access point // Barber hub",
  },
  "contacts.label.location": { uk: "Локація", en: "Location" },
  "contacts.label.comms": { uk: "Зв'язок", en: "Contact" },
  "contacts.label.schedule": { uk: "Графік", en: "Hours" },
  "contacts.label.network": { uk: "Соцмережі", en: "Social" },
  "contacts.label.mapHeader": { uk: "Термінал карти", en: "Map view" },
  "contacts.label.signalOk": { uk: "Сигнал зафіксовано", en: "Signal locked" },
  "contacts.label.mapFooterLviv": { uk: "ЛЬВІВ // УКРАЇНА", en: "LVIV // UKRAINE" },
  "contacts.openNow": { uk: "Відкрито", en: "Open" },
  "contacts.systemOnline": { uk: "Система онлайн", en: "System online" },
  "contacts.bookingLine": { uk: "Система запису // онлайн", en: "Booking // online" },
  "contacts.ctaPretitle": { uk: "Готові приймати", en: "Ready when you are" },
  "contacts.mapIframeTitle": { uk: "M&Y Barber Studio на карті", en: "M&Y Barber Studio on the map" },
  "contacts.coords": { uk: "49.8376N // 24.0305E", en: "49.8376N // 24.0305E" },
  "contacts.social.instagram": { uk: "Instagram", en: "Instagram" },
  "contacts.social.telegram": { uk: "Telegram", en: "Telegram" },
  "contacts.social.phone": { uk: "Телефон", en: "Phone" },
  "gallery.prev": { uk: "Попередній", en: "Previous" },
  "gallery.next": { uk: "Наступний", en: "Next" },
  /** Image/slide carousels — distinct from gallery grid prev/next */
  "carousel.prevSlide": { uk: "Попередній слайд", en: "Previous slide" },
  "carousel.nextSlide": { uk: "Наступний слайд", en: "Next slide" },

  // Services & Prices (detailed)
  "pricing.tag": { uk: "Послуги та ціни", en: "Services & Prices" },
  "pricing.title": { uk: "Послуги та ціни", en: "Services & Prices" },
  "pricing.description": {
    uk: "Повний перелік послуг та актуальні ціни.",
    en: "Full service menu with current prices.",
  },
  "pricing.note": {
    uk: "Ціна залежить від категорії спеціаліста",
    en: "Price varies by stylist level",
  },
  "pricing.noteOffHours": {
    uk: "* Надання послуг в неробочі години рахуються по подвійному тарифу",
    en: "* After-hours appointments are billed at double the standard rate",
  },
  "pricing.noteSpa": {
    uk: "** СПА процедура для обличчя включає в себе очищення шкіри за допомогою гель-мила та скрабу, нанесення патчів та зволоження шкіри кремом. Кожне нанесення компонентів супроводжується масажем обличчя.",
    en: "** Face SPA includes cleansing with gel soap and scrub, under-eye patches, and moisturizing cream. Each step includes a short facial massage.",
  },
  "pricing.book": { uk: "Записатись", en: "Book Now" },
  "pricing.priceInquiry": { uk: "ціну уточнюйте", en: "Price on request" },
  "pricing.cat.haircuts": { uk: "Чоловічі стрижки", en: "Men's Haircuts" },
  "pricing.cat.beard": { uk: "Борода", en: "Beard" },
  "pricing.cat.toning": { uk: "Тонування / фарбування", en: "Toning / Coloring" },
  "pricing.cat.combo": { uk: "Комбо", en: "Combo" },
  "pricing.cat.hairTattoo": { uk: "Хеір тату", en: "Hair tattoo" },
  "pricing.cat.tattoo": { uk: "Тату", en: "Tattoo" },
  "pricing.cat.care": { uk: "Догляд", en: "Care" },

  // Tattoo section
  "tattoo.tag": { uk: "Тату", en: "Tattoo" },
  "tattoo.title": { uk: "Тату", en: "Tattoo" },
  "tattoo.description": {
    uk: "Стерильна зона, індивідуальний ескіз і спокійний ритм сеансу для тату, яке лишається з тобою на роки.",
    en: "A sterile setup, a custom sketch, and a calm session rhythm for a tattoo that stays with you for years.",
  },
  "tattoo.imageAlt": {
    uk: "Майстер тату в стерильній студії",
    en: "Tattoo artist in a sterile studio",
  },
  "tattoo.inkLabel": { uk: "Сеанс тату", en: "Ink session" },
  "tattoo.intro": {
    uk: "Авторські татуювання від нашого майстра Сергія. Кожна робота — унікальна. Стерильність та безпека на найвищому рівні.",
    en: "Custom tattoos with Serhii. Each piece is one of a kind, done with strict hygiene and safety in mind.",
  },
  "tattoo.point1": { uk: "стерильність та безпека", en: "Sterile setup and safety first" },
  "tattoo.point2": { uk: "індивідуальний ескіз", en: "Custom sketch" },
  "tattoo.point3": { uk: "консультація майстра", en: "Consultation with the artist" },
  "tattoo.point4": { uk: "рекомендації по догляду", en: "Aftercare guidance" },
  "tattoo.bookConsult": { uk: "Записатись на консультацію", en: "Book Consultation" },
  "tattoo.portfolio": { uk: "Переглянути портфоліо", en: "View Portfolio" },

  // Footer
  "footer.address": { uk: "вул. Мирослава Скорика, 21", en: "Myroslava Skoryka St, 21" },
} as const;

export type TranslationKey = keyof typeof dict;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] || entry["uk"];
}
