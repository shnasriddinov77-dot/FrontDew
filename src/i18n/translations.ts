export type Locale = 'uz' | 'ru' | 'en';

export interface LocalizedText {
  uz: string;
  ru: string;
  en: string;
}

export interface PlaygroundTopic {
  id: string;
  index: string;
  mode: 'console' | 'visual';
  title: LocalizedText;
  conceptTag: LocalizedText;
  explanation: LocalizedText;
  takeaways: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  starterCode: string;
  solutionCode: string;
  expectedKeyword: string;
}

export interface RoadmapStage {
  step: string;
  duration: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  topics: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  project: LocalizedText;
}

export interface StudentOutcome {
  id: string;
  name: string;
  initials: string;
  role: LocalizedText;
  company: string;
  before: LocalizedText;
  outcome: LocalizedText;
  quote: LocalizedText;
  metric: LocalizedText;
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export const UI_COPY = {
  brand: 'FrontDev',
  nav: {
    home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
    courses: { uz: 'Kurslar', ru: 'Курсы', en: 'Courses' },
    roadmap: { uz: 'Yo‘l xaritasi', ru: 'Программа', en: 'Roadmap' },
    about: { uz: 'Markaz haqida', ru: 'О центре', en: 'About' },
    pricing: { uz: 'Tariflar', ru: 'Тарифы', en: 'Pricing' },
    dashboard: { uz: 'Kabinet', ru: 'Кабинет', en: 'Dashboard' },
    login: { uz: 'Kirish', ru: 'Войти', en: 'Sign in' },
    openMenu: { uz: 'Menyuni ochish', ru: 'Открыть меню', en: 'Open menu' },
    closeMenu: { uz: 'Menyuni yopish', ru: 'Закрыть меню', en: 'Close menu' },
    loginOrRegister: {
      uz: 'Kirish yoki ro‘yxatdan o‘tish',
      ru: 'Войти или зарегистрироваться',
      en: 'Sign in or register',
    },
    personalCabinet: {
      uz: 'Shaxsiy kabinet',
      ru: 'Личный кабинет',
      en: 'Student dashboard',
    },
    baseTier: { uz: 'Bepul', ru: 'Базовый', en: 'Free' },
  },
  hero: {
    kicker: {
      uz: 'FrontDev o‘quv markazi · Frontend muhandislik maktabi',
      ru: 'Учебный центр FrontDev · Школа фронтенд-инженерии',
      en: 'FrontDev Academy · Frontend Engineering Center',
    },
    headline: {
      uz: 'Dasturlashni noldan professional darajagacha o‘rganing',
      ru: 'Инженерия кода и современной веб-разработки',
      en: 'Master modern frontend engineering from zero to studio level',
    },
    subtext: {
      uz: 'HTML, CSS, JavaScript, TypeScript, Vue 3 va GSAP animatsiyalarini brauzerning o‘zida jonli kod yozib o‘rganing. Nazariya, amaliyot, test va sertifikat bir platformada.',
      ru: 'Изучайте HTML, CSS, JavaScript, TypeScript, Vue 3 и анимации GSAP с живой практикой в браузере. Пошаговая теория, тренажёр кода, тесты и сертификат.',
      en: 'Learn HTML, CSS, JavaScript, TypeScript, Vue 3, and GSAP motion directly in your browser. Structured theory, live coding exercises, exams, and certificates.',
    },
    ctaPrimary: {
      uz: 'Kurslarni ko‘rish',
      ru: 'Смотреть каталог курсов',
      en: 'Explore courses',
    },
    ctaLearnNow: {
      uz: 'O‘quv yo‘l xaritasi',
      ru: 'Дорожная карта',
      en: 'Learning roadmap',
    },
    ctaPro: {
      uz: 'PRO obuna · 290 000 so‘mdan / oy',
      ru: 'Подписка PRO от 2 075 ₽/мес',
      en: 'PRO plan from $19/mo',
    },
    badgeCohort: {
      uz: '2026 Qabul · Jonli amaliyot',
      ru: 'Поток 2026 · Живая практика',
      en: '2026 Cohort · Live Coding',
    },
    metrics: [
      {
        value: { uz: '8 400+', ru: '8 400+', en: '8,400+' },
        label: {
          uz: 'FrontDev bitiruvchilari 3 yil ichida',
          ru: 'Выпускников FrontDev за 3 года',
          en: 'FrontDev graduates in 3 years',
        },
      },
      {
        value: { uz: '6 ta trek', ru: '6 треков', en: '6 tracks' },
        label: {
          uz: 'Boshlang‘ich vyorstkadan Creative WebGL gacha',
          ru: 'От базовой вёрстки до Creative WebGL',
          en: 'From CSS Grid basics to Creative WebGL',
        },
      },
      {
        value: { uz: '92%', ru: '92%', en: '92%' },
        label: {
          uz: '4 oy ichida ish yoki buyurtma topadi',
          ru: 'Находят оффер в течение 4 месяцев',
          en: 'Land a frontend offer within 4 months',
        },
      },
      {
        value: { uz: '3 tilda', ru: '3 языка', en: '3 languages' },
        label: {
          uz: 'O‘zbek, Rus va Ingliz tillarida ta’lim',
          ru: 'Обучение на узбекском, русском и английском',
          en: 'Learn in Uzbek, Russian, or English',
        },
      },
    ],
  },
  playground: {
    kicker: {
      uz: 'Dasturlashni hoziroq o‘rganing',
      ru: 'Интерактивный практикум программирования',
      en: 'Interactive Programming Sandbox',
    },
    title: {
      uz: 'Brauzerda kod yozib dasturlash asoslarini tushuning',
      ru: 'Поймите основы программирования прямо на этой странице',
      en: 'Learn core programming concepts hands-on right here',
    },
    subtitle: {
      uz: 'Mavzuni tanlang, kodni tahrirlang va «Ishga tushirish» tugmasini bosing — tizim natijani darhol hisoblab ko‘rsatadi.',
      ru: 'Выберите тему, измените код и нажмите «Запустить» — тренажёр сразу выполнит код и покажет результат.',
      en: 'Select a topic, edit the snippet, and press Run to execute your code and inspect live output immediately.',
    },
    runBtn: {
      uz: 'Kodni ishga tushirish',
      ru: 'Запустить код',
      en: 'Run code',
    },
    resetBtn: {
      uz: 'Tiklash',
      ru: 'Сбросить',
      en: 'Reset',
    },
    solutionBtn: {
      uz: 'Tayyor yechim',
      ru: 'Показать решение',
      en: 'Reveal solution',
    },
    outputLabel: {
      uz: 'Jonli natija / Konsol',
      ru: 'Живой результат / Консоль',
      en: 'Live Output / Console',
    },
    keyIdeas: {
      uz: 'Asosiy tushunchalar',
      ru: 'Ключевые понятия',
      en: 'Core concepts',
    },
  },
  roadmap: {
    kicker: {
      uz: 'Bosqichma-bosqich ta’lim xaritasi',
      ru: 'Дорожная карта обучения',
      en: 'Structured Learning Path',
    },
    title: {
      uz: 'Noldan Senior Frontend darajasigacha 4 bosqich',
      ru: 'От первой строки кода до Senior Frontend за 4 этапа',
      en: '4 structured stages from first line of code to Senior Frontend',
    },
    subtitle: {
      uz: 'Har bir bosqich aniq nazariya, real loyiha va mentor tekshiruvi bilan mustahkamlanadi.',
      ru: 'Каждый этап закрепляется практическим проектом, разбором архитектуры и итоговой проверкой.',
      en: 'Each stage builds on real production patterns, interactive code checks, and a portfolio deliverable.',
    },
    projectLabel: {
      uz: 'Bosqich loyihasi',
      ru: 'Итоговый проект этапа',
      en: 'Capstone deliverable',
    },
  },
  manifesto: {
    kicker: {
      uz: 'Yondashuv va mentorlar',
      ru: 'Подход и наставники',
      en: 'Methodology & Mentors',
    },
    title: {
      uz: 'Eslab qolinadigan va tez ishlaydigan interfeyslar yaratishni o‘rgatamiz',
      ru: 'Учим создавать фронтенд, который запоминают',
      en: 'We teach frontend craftsmanship built for speed and clarity',
    },
    subtitle: {
      uz: 'FrontDev markazida qat’iy muhandislik arxitekturasi va zamonaviy dizayn-studiyalar animatsiyasi birlashtirilgan.',
      ru: 'В FrontDev мы объединили строгую инженерную базу и выразительность ведущих цифровых студий.',
      en: 'FrontDev combines strict TypeScript architecture with tactile 60 FPS motion craft.',
    },
    mentorName: {
      uz: 'Azizbek Karimov',
      ru: 'Азизбек Каримов',
      en: 'Azizbek Karimov',
    },
    mentorRole: {
      uz: 'Bosh mentor · Staff Frontend Architect',
      ru: 'Куратор программы · Staff Frontend Architect',
      en: 'Lead Mentor · Staff Frontend Architect',
    },
    mentorExp: {
      uz: '9 yil tajriba · 4× Awwwards SOTD',
      ru: '9 лет опыта · 4× Awwwards SOTD',
      en: '9 yrs experience · 4× Awwwards SOTD',
    },
    pillars: [
      {
        index: '01.',
        title: {
          uz: 'Shablon ko‘chirish o‘rniga arxitekturaviy fikrlash',
          ru: 'Архитектурное мышление вместо шаблонного копирования',
          en: 'Architectural thinking instead of copy-paste tutorials',
        },
        description: {
          uz: 'Siz shunchaki kod parchalari emas, yaxlit tizimni o‘rganasiz: Vue 3 kompozitsiyasi, qat’iy TypeScript turlari va toza modullar.',
          ru: 'Вы изучаете не разрозненные приёмы, а целостную систему: композицию в Vue 3, строгую типизацию TypeScript и чистые модули.',
          en: 'Learn cohesive engineering systems: Vue 3 composables, strict TypeScript type safety, and modular state patterns.',
        },
        metric: {
          uz: 'Fikrlash va kod sifati +140%',
          ru: '+140% к скорости разработки фич',
          en: '+140% feature delivery velocity',
        },
      },
      {
        index: '02.',
        title: {
          uz: '60 FPS nazoratli studiya darajasidagi animatsiyalar',
          ru: 'Спецэффекты уровня студий с контролем 60 FPS',
          en: 'Studio-grade motion choreography locked at 60 FPS',
        },
        description: {
          uz: 'GSAP ScrollTrigger, kinetik tipografika, magnit effektlar va interaktiv Canvasni har qanday qurilmada ravon ishlaydigan qilib tuzasiz.',
          ru: 'Осваиваете кинетическую типографику GSAP, магнитные взаимодействия и процедурный Canvas так, чтобы интерфейсы оставались быстрыми.',
          en: 'Master GSAP ScrollTrigger, magnetic interactions, and procedural Canvas using GPU compositor-only transforms.',
        },
        metric: {
          uz: 'Har bir kadr ≤ 16 ms',
          ru: '≤ 16 мс время кадра в продакшене',
          en: '≤ 16 ms frame budget in production',
        },
      },
      {
        index: '03.',
        title: {
          uz: 'Bosqichma-bosqich o‘qitish: Nazariya → Jonli kod → Test → Sertifikat',
          ru: 'Формат обучения: теория, практика в коде, тест и сертификат',
          en: 'Guided pedagogy: Theory → Live Code → Quiz → Certificate',
        },
        description: {
          uz: 'Har bir dars qatorma-qator tahlil, ko‘p uchraydigan xatolar va jonli kod tekshiruvidan iborat. Yakuniy testdan so‘ng shaxsiy kabinetda sertifikat beriladi.',
          ru: 'Каждый урок содержит разбор по строкам, частые ошибки и интерактивную проверку. После итогового теста выдаётся именной сертификат.',
          en: 'Every lesson pairs line-by-line anatomy with common pitfalls, live code execution, and a verified completion certificate.',
        },
        metric: {
          uz: '100% amaliyotda tekshirilgan bilim',
          ru: '100% проверка навыков на практике',
          en: '100% verified hands-on mastery',
        },
      },
    ],
  },
  catalog: {
    kicker: { uz: 'Dasturlar katalogi', ru: 'Каталог программ', en: 'Course Catalog' },
    title: {
      uz: 'Frontend dasturlash kurslari',
      ru: 'Курсы фронтенд-разработки',
      en: 'Frontend Engineering Courses',
    },
    subtitle: {
      uz: 'Bepul modullardan boshlang yoki PRO obuna bilan barcha kurslarni oching. Har bir kursning birinchi darsi darhol ochiq.',
      ru: 'Начните с бесплатных модулей или откройте всю библиотеку по подписке PRO. Первый урок каждого курса доступен сразу.',
      en: 'Start with free tracks or unlock the entire catalog with PRO. Lesson one of every course is open for preview.',
    },
    foundLabel: { uz: 'Topildi', ru: 'Найдено курсов', en: 'Showing' },
    ofLabel: { uz: 'dan', ru: 'из', en: 'of' },
    categories: {
      all: { uz: 'Barcha yo‘nalishlar', ru: 'Все направления', en: 'All tracks' },
      vue: { uz: 'Vue & Nuxt', ru: 'Vue & Nuxt', en: 'Vue & Nuxt' },
      motion: { uz: 'Animatsiya & 3D', ru: 'Анимации & 3D', en: 'Motion & 3D' },
      architecture: { uz: 'JS & TypeScript', ru: 'JS & TypeScript', en: 'JS & TypeScript' },
      ui: { uz: 'UI & CSS', ru: 'UI & CSS', en: 'UI & CSS' },
    },
    tiers: {
      all: { uz: 'Barchasi', ru: 'Все', en: 'All' },
      free: { uz: 'Bepul', ru: 'Бесплатные', en: 'Free' },
      pro: { uz: 'Pullik · PRO', ru: 'Платные · PRO', en: 'Paid · PRO' },
    },
    searchPlaceholder: {
      uz: 'Qidirish: Vue, GSAP, Grid...',
      ru: 'Поиск: Vue, GSAP, Grid...',
      en: 'Search: Vue, GSAP, Grid...',
    },
    hoursShort: { uz: 'soat', ru: 'ч', en: 'hrs' },
    ratingLabel: { uz: 'Reyting', ru: 'Рейтинг', en: 'Rating' },
    progressLabel: { uz: 'Jarayon', ru: 'Прогресс', en: 'Progress' },
    freeLabel: { uz: 'Bepul', ru: 'Бесплатно', en: 'Free' },
    unlockedLabel: { uz: 'Ochiq', ru: 'Доступ открыт', en: 'Unlocked' },
    orProLabel: { uz: 'Yoki PRO obuna bilan', ru: 'Или по подписке PRO', en: 'Or with PRO plan' },
    buyBtn: { uz: 'Sotib olish', ru: 'Купить', en: 'Buy' },
    learnBtn: { uz: 'O‘qish', ru: 'Учиться', en: 'Study' },
    syllabusBtn: { uz: 'Dastur', ru: 'Программа', en: 'Syllabus' },
    emptyTitle: {
      uz: 'So‘rovingiz bo‘yicha kurslar topilmadi',
      ru: 'По вашему запросу курсы не найдены',
      en: 'No matching courses found',
    },
    emptyHint: {
      uz: 'Yo‘nalish filtrini o‘zgartiring yoki qidiruv satrini tozalang.',
      ru: 'Попробуйте изменить фильтр направления или очистить строку поиска.',
      en: 'Try selecting a different category or clearing your search query.',
    },
    resetBtn: { uz: 'Filtrlarni tiklash', ru: 'Сбросить фильтры', en: 'Reset filters' },
    cursorOpen: { uz: 'OCHISH', ru: 'ОТКРЫТЬ', en: 'OPEN' },
  },
  outcomes: {
    kicker: {
      uz: 'Bitiruvchilar natijalari',
      ru: 'Истории выпускников',
      en: 'Graduate Outcomes',
    },
    title: {
      uz: 'FrontDev talabalari haqiqiy natijalarga erishmoqda',
      ru: 'Реальные карьерные результаты студентов FrontDev',
      en: 'Verified career outcomes from FrontDev graduates',
    },
    beforeLabel: { uz: 'Avval', ru: 'До курса', en: 'Before' },
    afterLabel: { uz: 'Natija', ru: 'После', en: 'Outcome' },
  },
  pricing: {
    kicker: { uz: 'FrontDev PRO obunasi', ru: 'Подписка FrontDev PRO', en: 'FrontDev PRO Plan' },
    title: {
      uz: 'Barcha kurslar kutubxonasiga yagona kirish',
      ru: 'Один доступ ко всей библиотеке курсов',
      en: 'All-access pass to every FrontDev course',
    },
    subtitlePrefix: {
      uz: 'Har bir kursni alohida sotib olish o‘rniga PRO obunasini faollashtiring. Promokod:',
      ru: 'Оформите подписку вместо покупки каждого курса по отдельности. Используйте промокод',
      en: 'Unlock the entire curriculum with one pass instead of buying individual courses. Promo code:',
    },
    subtitleSuffix: {
      uz: '20% chegirma beradi.',
      ru: 'для скидки 20% при оформлении.',
      en: 'for 20% off at checkout.',
    },
    monthlyToggle: { uz: '1 oylik', ru: 'На 1 месяц', en: 'Monthly' },
    annualToggle: { uz: 'Yillik (-30%)', ru: 'Годовой (выгода 30%)', en: 'Annual (-30%)' },
    recommended: { uz: 'Tavsiya etiladi', ru: 'Рекомендуем', en: 'Recommended' },
    activeBtn: { uz: 'Obuna faol', ru: 'Подписка активна', en: 'Plan active' },
    switchBtn: { uz: 'Ushbu tarifga o‘tish', ru: 'Перейти на этот тариф', en: 'Switch to this plan' },
    choosePrefix: { uz: 'Ulash:', ru: 'Оформить', en: 'Activate' },
    annualNote: {
      uz: 'oyiga teng · yilda bir marta to‘lanadi',
      ru: 'в месяц · оплата раз в год',
      en: '/ month equivalent · billed annually',
    },
    monthlyNote: {
      uz: 'Har oylik yangilanish · istalgan vaqtda bekor qilish',
      ru: 'Ежемесячное продление · отмена в любой момент',
      en: 'Monthly billing · cancel anytime',
    },
  },
  faq: {
    kicker: { uz: 'Ko‘p beriladigan savollar', ru: 'Частые вопросы', en: 'Frequently Asked Questions' },
    title: {
      uz: 'O‘qish jarayoni va obuna haqida barchasi',
      ru: 'Всё об обучении, практике и подписке',
      en: 'Everything about learning, coding practice, and plans',
    },
  },
  studio: {
    backToCatalog: {
      uz: 'Kurslar katalogiga qaytish',
      ru: 'Назад к каталогу курсов',
      en: 'Back to course catalog',
    },
    completedProgress: { uz: 'O‘zlashtirildi', ru: 'Пройдено', en: 'Completed' },
    practiceHours: { uz: 'soat amaliyot', ru: 'часов практики', en: 'hours of practice' },
    mentorLabel: { uz: 'Mentor', ru: 'Ментор', en: 'Mentor' },
    skillsLabel: { uz: 'Ko‘nikmalar', ru: 'Навыки', en: 'Skills' },
    fullAccessOpen: { uz: 'To‘liq kirish ochiq', ru: 'Полный доступ открыт', en: 'Full access unlocked' },
    freeCourseLabel: { uz: 'Bepul kurs', ru: 'Бесплатный курс', en: 'Free course' },
    buyCourseBtn: { uz: 'Kursni sotib olish', ru: 'Купить курс', en: 'Buy course' },
    openProBtn: { uz: 'PRO obuna bilan ochish', ru: 'Открыть по PRO подписке', en: 'Unlock with PRO' },
    syllabusTitle: { uz: 'Kurs dasturi', ru: 'Программа курса', en: 'Course syllabus' },
    freePreviewTag: { uz: 'Bepul ko‘rish', ru: 'Открыто бесплатно', en: 'Free preview' },
    quizBtn: { uz: 'Yakuniy test va sertifikat', ru: 'Итоговый тест и сертификат', en: 'Final quiz & certificate' },
    quizPassedTag: { uz: 'Topshirildi', ru: 'Сдан', en: 'Passed' },
    quizKicker: { uz: 'Kurs attestatsiyasi', ru: 'Аттестация по курсу', en: 'Course certification' },
    quizHeading: { uz: 'Yakuniy test', ru: 'Итоговый тест', en: 'Final exam' },
    quizDesc: {
      uz: 'Shaxsiy kabinetga sertifikat olish uchun kamida 66% savolga to‘g‘ri javob bering.',
      ru: 'Ответьте минимум на 66% вопросов правильно, чтобы получить именной сертификат в личный кабинет.',
      en: 'Score at least 66% to earn your verified FrontDev certificate in your student dashboard.',
    },
    quizLockedTitle: {
      uz: 'Yakuniy test kurs ochilgandan so‘ng mavjud',
      ru: 'Итоговый тест доступен после открытия курса',
      en: 'Final exam unlocks with full course access',
    },
    quizLockedDesc: {
      uz: 'Imtihonni topshirish va sertifikat olish uchun kursni sotib oling yoki PRO obunani faollashtiring.',
      ru: 'Приобретите этот курс отдельно или активируйте подписку PRO для сдачи экзамена и получения сертификата.',
      en: 'Purchase this course or activate a PRO subscription to take the certification quiz.',
    },
    submitQuizBtn: { uz: 'Testni yakunlash va tekshirish', ru: 'Завершить и проверить тест', en: 'Submit & grade quiz' },
    resultLabel: { uz: 'Natija', ru: 'Результат', en: 'Score' },
    quizPassMsg: {
      uz: 'Tabriklaymiz! Imtihon muvaffaqiyatli topshirildi, sertifikat shaxsiy kabinetingizga qo‘shildi.',
      ru: 'Поздравляем! Экзамен сдан, именной сертификат уже добавлен в ваш личный кабинет.',
      en: 'Congratulations! You passed the exam and your certificate is now ready in your dashboard.',
    },
    quizFailMsg: {
      uz: 'Hozircha to‘g‘ri javoblar yetarli emas. Darslarni takrorlab yana urinib ko‘ring.',
      ru: 'Пока недостаточно правильных ответов. Повторите материалы уроков и попробуйте снова.',
      en: 'Not enough correct answers yet. Review the lessons and try again.',
    },
    openCertBtn: {
      uz: 'Kabinetda sertifikatni ochish',
      ru: 'Открыть сертификат в кабинете',
      en: 'Open certificate in dashboard',
    },
    paywallKicker: { uz: 'Pullik modul', ru: 'Платный модуль', en: 'PRO Module' },
    paywallTitlePrefix: { uz: 'Dars yopiq:', ru: 'Урок закрыт:', en: 'Lesson locked:' },
    paywallDesc: {
      uz: 'Kursning birinchi darsi bepul tanishish uchun ochiq. Barcha modullar, amaliy mashqlar va sertifikat uchun kursni sotib oling yoki PRO obunaga ulaning.',
      ru: 'Первый урок курса доступен для бесплатного ознакомления. Чтобы изучать все модули, решать практические задания и получить сертификат, купите курс или оформите PRO подписку.',
      en: 'Lesson one is free to preview. Purchase the course or start a PRO plan to unlock all modules, interactive tasks, and certification.',
    },
    freeLessonBadge: { uz: 'Bepul dars', ru: 'Бесплатный урок', en: 'Free preview' },
    proModuleBadge: { uz: 'PRO modul', ru: 'PRO модуль', en: 'PRO module' },
    theoryBadge: { uz: '1-qadam · Nazariya va tahlil', ru: 'Шаг 1 · Теория и разбор', en: 'Step 1 · Theory & Breakdown' },
    keyPointsTitle: { uz: 'Darsning asosiy xulosalari', ru: 'Ключевые тезисы урока', en: 'Key takeaways' },
    anatomyTitle: { uz: 'Kodni qatorma-qator tahlil qilish', ru: 'Построчный разбор кода', en: 'Line-by-line anatomy' },
    pitfallTitle: { uz: 'Ko‘p uchraydigan xato vs To‘g‘ri usul', ru: 'Частая ошибка vs Правильный паттерн', en: 'Common pitfall vs Best practice' },
    refSnippetTitle: { uz: 'Namuna kod', ru: 'Эталонный пример кода', en: 'Reference example' },
    markComplete: { uz: 'Darsni tugallangan deb belgilash', ru: 'Отметить урок пройденным', en: 'Mark lesson completed' },
    markedComplete: { uz: 'Dars tugallandi', ru: 'Урок отмечен как пройденный', en: 'Lesson completed' },
    practiceKicker: { uz: '2-qadam · Bugungi mavzudan kod yozish', ru: 'Шаг 2 · Код по изученной теме', en: 'Step 2 · Today’s Topic Coding Lab' },
    taskPrefix: { uz: 'Vazifa:', ru: 'Задание:', en: 'Task:' },
    runCodeBtn: { uz: 'Kodni ishlatish', ru: 'Запустить и проверить код', en: 'Run & verify code' },
    verifyTaskBtn: { uz: 'Kodni ishlatish va tekshirish', ru: 'Запустить и проверить', en: 'Run & check solution' },
    paidCodingLockedTitle: {
      uz: 'Kod yozish amaliyoti kurs sotib olingandan so‘ng ochiladi',
      ru: 'Практика написания кода открывается после покупки курса',
      en: 'Coding workspace unlocks after purchasing this course',
    },
    paidCodingLockedDesc: {
      uz: 'Siz birinchi dars nazariyasi bilan tanishdingiz. Bugungi o‘rgangan mavzu bo‘yicha kod yozish va «Kodni ishlatish» orqali avtomatik tekshiruvni ochish uchun kursni sotib oling yoki PRO obunani faollashtiring.',
      ru: 'Вы ознакомились с теорией первого урока. Чтобы писать код по изученной теме и проверять решение кнопкой «Запустить код», купите курс или активируйте подписку PRO.',
      en: 'You previewed the lesson theory. Purchase this course or activate PRO to unlock the live coding workspace and automated verification for today’s topic.',
    },
    studyFirstTitle: {
      uz: 'Bugungi mavzuni o‘rgandingizmi? Endi kod yozishga o‘ting',
      ru: 'Изучили сегодняшнюю тему? Откройте практику написания кода',
      en: 'Studied today’s topic? Unlock today’s coding challenge',
    },
    studyFirstDesc: {
      uz: 'Avval yuqoridagi nazariya, qatorma-qator tahlil va xatolar tahlilini o‘qib chiqing. Shundan so‘ng ushbu mavzu bo‘yicha kod yozish muharriri ochiladi.',
      ru: 'Изучите теорию, построчный разбор и частые ошибки выше. После подтверждения откроется редактор кода именно по этой теме.',
      en: 'Review the theory, line-by-line anatomy, and pitfalls above first. Confirming reveals the interactive coding editor for this lesson.',
    },
    unlockCodingBtn: {
      uz: 'Mavzuni o‘rgandim · Kod yozishni ochish',
      ru: 'Тема изучена · Открыть редактор кода',
      en: 'I studied this topic · Open code editor',
    },
    codingUnlockedNote: {
      uz: 'Bugungi o‘rganilgan mavzu bo‘yicha kod yozing va «Kodni ishlatish» tugmasini bosing — tizim kodni ham ishga tushiradi, ham to‘g‘riligini tekshiradi.',
      ru: 'Напишите решение по изученной теме и нажмите «Запустить и проверить код» — платформа выполнит код и сразу проверит результат.',
      en: 'Write your solution for today’s studied topic and press “Run & verify code” — the platform executes and validates it automatically.',
    },
    hintBtn: { uz: 'Maslahat', ru: 'Подсказка', en: 'Hint' },
    revealBtn: { uz: 'Yechimni ko‘rish', ru: 'Решение', en: 'Show solution' },
    nextLessonBtn: { uz: 'Keyingi darsga o‘tish', ru: 'Следующий урок', en: 'Next lesson' },
  },
  dashboard: {
    kicker: { uz: 'Talaba shaxsiy kabineti', ru: 'Личный кабинет студента', en: 'Student Dashboard' },
    guestTitle: {
      uz: 'Natijalar va obunani saqlash uchun tizimga kiring',
      ru: 'Войдите, чтобы сохранять прогресс и подписку',
      en: 'Sign in to save your learning progress and plan',
    },
    guestDesc: {
      uz: 'Kabinetda faol kurslaringiz, o‘zlashtirish foizi, kunlik o‘qish rejasi, PRO obuna va sertifikatlaringiz ko‘rinadi.',
      ru: 'В кабинете отображаются ваши активные курсы, процент прохождения уроков, план обучения, подписка PRO и именные сертификаты.',
      en: 'Track unlocked courses, completion progress, study goals, active PRO subscription, and earned certificates.',
    },
    logoutBtn: { uz: 'Chiqish', ru: 'Выйти', en: 'Sign out' },
    statCourses: { uz: 'Ochiq kurslar', ru: 'Доступных курсов', en: 'Unlocked courses' },
    statLessons: { uz: 'Tugatilgan darslar', ru: 'Уроков пройдено', en: 'Lessons completed' },
    statCerts: { uz: 'Sertifikatlar', ru: 'Сертификатов', en: 'Certificates' },
    planKicker: { uz: 'Joriy tarif', ru: 'Текущий тариф', en: 'Active plan' },
    planFreeLabel: { uz: 'Bepul (Asosiy)', ru: 'Базовый (Бесплатный)', en: 'Free (Starter)' },
    planProDesc: {
      uz: 'Barcha pullik kurslar, amaliy mashqlar va yakuniy imtihonlar cheklovsiz ochiq.',
      ru: 'Все платные курсы, практические задания и итоговые тесты открыты без ограничений.',
      en: 'Unlimited access to all paid tracks, interactive exercises, and certification exams.',
    },
    planFreeDesc: {
      uz: 'Bepul kurslar va pullik dasturlarning birinchi darslari ochiq. To‘liq kirish uchun PRO ulating.',
      ru: 'Открыты бесплатные курсы и первые уроки платных программ. Оформите PRO для полного доступа.',
      en: 'Free courses and lesson previews are unlocked. Upgrade to PRO for complete access.',
    },
    upgradeBtn: { uz: 'PRO obunasini ulash', ru: 'Оформить подписку PRO', en: 'Upgrade to PRO' },
    changePlanBtn: { uz: 'Tarifni o‘zgartirish', ru: 'Сменить тариф', en: 'Change plan' },
    cancelProBtn: { uz: 'PRO ni o‘chirish', ru: 'Отключить PRO', en: 'Cancel PRO' },
    cancelFeedback: {
      uz: 'Avto-yangilanish o‘chirildi, bepul tarif faollashtirildi.',
      ru: 'Автопродление отключено, активирован базовый тариф.',
      en: 'Auto-renewal disabled; switched to free plan.',
    },
    studyPlanTitle: {
      uz: 'Haftalik dars jadvali va maqsad',
      ru: 'Недельный трекер обучения',
      en: 'Weekly Study Schedule',
    },
    myCoursesTitle: { uz: 'Mening kurslarim va jarayon', ru: 'Мои курсы и прогресс', en: 'My Courses & Progress' },
    continueBtn: { uz: 'O‘qishni davom ettirish', ru: 'Продолжить обучение', en: 'Continue learning' },
    certsTitle: { uz: 'Sertifikatlar', ru: 'Сертификаты', en: 'Certificates' },
    noCerts: {
      uz: 'Istalgan kurs yakuniy testidan kamida 66% to‘plaganingizdan so‘ng sertifikat shu yerda paydo bo‘ladi.',
      ru: 'Сертификаты появятся здесь после успешной сдачи итогового теста внутри любого курса (минимум 66% правильных ответов).',
      en: 'Certificates appear here once you pass a course final exam with at least 66% accuracy.',
    },
    openCertBtn: { uz: 'Ochish', ru: 'Открыть', en: 'View' },
  },
  auth: {
    kicker: { uz: 'Shaxsiy kirish', ru: 'Личный доступ', en: 'Student Access' },
    loginTitle: { uz: 'Kabinetga kirish', ru: 'Вход в аккаунт', en: 'Sign in' },
    registerTitle: { uz: 'Talaba ro‘yxatdan o‘tishi', ru: 'Регистрация студента', en: 'Create account' },
    tabLogin: { uz: 'Kirish', ru: 'Вход', en: 'Sign in' },
    tabRegister: { uz: 'Ro‘yxatdan o‘tish', ru: 'Регистрация', en: 'Register' },
    nameLabel: { uz: 'Ism va familiya', ru: 'Имя и фамилия', en: 'Full name' },
    emailLabel: { uz: 'Elektron pochta', ru: 'Электронная почта', en: 'Email address' },
    passwordLabel: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
    passwordPlaceholder: { uz: 'Kamida 6 ta belgi', ru: 'Минимум 6 символов', en: 'Minimum 6 characters' },
    submitLogin: { uz: 'Kabinetga kirish', ru: 'Войти в кабинет', en: 'Sign in to dashboard' },
    submitRegister: { uz: 'Akkaunt yaratish', ru: 'Создать аккаунт', en: 'Create account' },
    demoLabel: {
      uz: 'Tezkor demo kirish (baza talab qilinmaydi)',
      ru: 'Быстрый демо-вход (без бэкенда)',
      en: 'Instant demo login (frontend-only)',
    },
    demoStudent: { uz: 'Talaba (Bepul)', ru: 'Студент (Базовый)', en: 'Student (Free)' },
    demoPro: { uz: 'Talaba (PRO)', ru: 'Студент (PRO)', en: 'Student (PRO)' },
    errName: { uz: 'Ismingizni kiriting (kamida 2 ta harf)', ru: 'Укажите ваше имя (минимум 2 символа)', en: 'Enter your name (min 2 chars)' },
    errEmail: { uz: 'To‘g‘ri email manzil kiriting', ru: 'Введите корректный адрес электронной почты', en: 'Enter a valid email address' },
    errPass: { uz: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak', ru: 'Пароль должен содержать минимум 6 символов', en: 'Password must be at least 6 characters' },
  },
  checkout: {
    kicker: { uz: 'Buyurtmani rasmiylashtirish', ru: 'Оформление заказа', en: 'Checkout' },
    successTitle: { uz: 'Kirish faollashtirildi', ru: 'Доступ активирован', en: 'Access unlocked' },
    successDesc: {
      uz: 'Endi barcha modullar va amaliy mashqlar profilingizda ochiq.',
      ru: 'Теперь открыто в вашем профиле. Можно сразу переходить к урокам и практике.',
      en: 'is now unlocked in your account. You can jump straight into lessons and practice.',
    },
    startLearningBtn: { uz: 'O‘qishni boshlash', ru: 'Перейти к обучению', en: 'Start learning' },
    priceLabel: { uz: 'Narxi', ru: 'Стоимость', en: 'Subtotal' },
    discountLabel: { uz: 'Promokod chegirmasi', ru: 'Скидка по промокоду', en: 'Promo discount' },
    totalLabel: { uz: 'Jami to‘lov', ru: 'Итого к оплате', en: 'Total due' },
    emailLabel: { uz: 'Profil ochish uchun email', ru: 'Email для создания профиля', en: 'Email for receipt & profile' },
    hasAccount: { uz: 'Akkauntingiz bormi?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
    promoLabel: { uz: 'Promokod (FRONT20 ni sinab ko‘ring)', ru: 'Промокод (попробуйте FRONT20)', en: 'Promo code (try FRONT20)' },
    cardLabel: { uz: 'Karta raqami (8600 / 9860 / 4276)', ru: 'Номер банковской карты', en: 'Card number' },
    testCardBtn: { uz: 'Sinov kartasi', ru: 'Тестовая карта', en: 'Fill test card' },
    expiryLabel: { uz: 'Amal qilish muddati', ru: 'Срок действия', en: 'Expiry' },
    cvcLabel: { uz: 'CVC / Kod', ru: 'CVC / CVV', en: 'CVC' },
    processingBtn: { uz: 'To‘lov tasdiqlanmoqda...', ru: 'Подтверждение оплаты...', en: 'Confirming payment...' },
    payBtn: { uz: 'To‘lash', ru: 'Оплатить', en: 'Pay' },
    secureNote: {
      uz: 'FrontDev kabinetida bir zumda ochiladi',
      ru: 'Мгновенная активация доступа на фронтенде',
      en: 'Instant frontend access activation',
    },
    emailRequiredErr: {
      uz: 'Profil va chek uchun to‘g‘ri email kiriting',
      ru: 'Укажите email для активации доступа и чека',
      en: 'Enter a valid email to activate access',
    },
  },
  certificate: {
    heading: {
      uz: 'Kursni muvaffaqiyatli yakunlaganlik sertifikati',
      ru: 'Сертификат о прохождении курса',
      en: 'Certificate of Completion',
    },
    subline: {
      uz: 'FrontDev frontend-dasturlash o‘quv markazi dasturini muvaffaqiyatli tugatdi',
      ru: 'успешно завершил(а) программу учебного центра фронтенд-разработки FrontDev',
      en: 'has successfully completed the FrontDev Frontend Engineering Academy program',
    },
    scoreLabel: { uz: 'Yakuniy attestatsiya', ru: 'Итоговая аттестация', en: 'Final Exam Score' },
    dateLabel: { uz: 'Berilgan sana', ru: 'Дата выдачи', en: 'Issued on' },
    printBtn: { uz: 'Chop etish / PDF saqlash', ru: 'Распечатать / Сохранить PDF', en: 'Print / Save PDF' },
  },
  footer: {
    desc: {
      uz: 'FrontDev o‘quv markazi: HTML, CSS, JavaScript, TypeScript, Vue 3 va zamonaviy veb-animatsiyalar.',
      ru: 'Учебный центр FrontDev: Vue 3, TypeScript, архитектура и интерактивные веб-анимации.',
      en: 'FrontDev Academy: HTML, CSS, JavaScript, TypeScript, Vue 3, and motion engineering.',
    },
    home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
    catalog: { uz: 'Kurslar', ru: 'Курсы', en: 'Courses' },
    about: { uz: 'Markaz haqida', ru: 'О центре', en: 'About' },
    pricing: { uz: 'Tariflar', ru: 'Тарифы', en: 'Pricing' },
    roadmap: { uz: 'Yo‘l xaritasi', ru: 'Программа', en: 'Roadmap' },
    dashboard: { uz: 'Kabinet', ru: 'Личный кабинет', en: 'Dashboard' },
  },
} as const;

export const PLAYGROUND_TOPICS: PlaygroundTopic[] = [
  {
    id: 'js-functions',
    index: '01.',
    mode: 'console',
    title: {
      uz: 'O‘zgaruvchilar va Funksiyalar',
      ru: 'Переменные и функции в JS/TS',
      en: 'Variables & Functions in JS/TS',
    },
    conceptTag: {
      uz: 'JavaScript / TypeScript Asoslari',
      ru: 'Основы JavaScript / TypeScript',
      en: 'JavaScript / TypeScript Core',
    },
    explanation: {
      uz: 'Dasturlashda ma’lumotlar o‘zgaruvchilarda saqlanadi (`const`, `let`), mantiq esa qayta ishlatiladigan funksiyalarga o‘raladi. `console.log()` natijani ekranga chiqarib tekshirish uchun xizmat qiladi.',
      ru: 'В программировании данные хранятся в переменных (`const`, `let`), а повторяемая логика — в функциях. `console.log()` выводит результат вычислений для быстрой отладки.',
      en: 'Programs store data in constants/variables (`const`, `let`) and package reusable logic inside functions. Use `console.log()` to inspect computed values.',
    },
    takeaways: {
      uz: [
        'Qiymat qayta tayinlanmasa doim const ishlating',
        'Arrow funksiyalar (a, b) => a + b kodni ixcham qiladi',
        'Template literal `${...}` matn ichiga qiymat qo‘yadi',
      ],
      ru: [
        'Используйте const по умолчанию, если ссылка не перезаписывается',
        'Стрелочные функции (a, b) => a + b делают логику компактной',
        'Шаблонные строки `${...}` встраивают вычисления в текст',
      ],
      en: [
        'Default to const unless a binding must be reassigned',
        'Arrow functions keep transforms concise and readable',
        'Template literals `${...}` embed expressions cleanly',
      ],
    },
    starterCode: `const student = "Aziza";
const lessonsDone = 5;

function calcXP(lessons, bonus) {
  return lessons * 120 + bonus;
}

const totalXP = calcXP(lessonsDone, 150);
console.log(\`Talaba: \${student} | XP: \${totalXP}\`);`,
    solutionCode: `const student = "Aziza";
const lessonsDone = 8;

const calcXP = (lessons, bonus) => lessons * 120 + bonus;
const totalXP = calcXP(lessonsDone, 200);
console.log(\`Talaba: \${student} | XP: \${totalXP}\`);`,
    expectedKeyword: 'console.log',
  },
  {
    id: 'css-grid',
    index: '02.',
    mode: 'visual',
    title: {
      uz: 'CSS Grid & Bento Setkasi',
      ru: 'CSS Grid и Bento-сетка',
      en: 'CSS Grid & Bento Layout',
    },
    conceptTag: {
      uz: 'Zamonaviy UI vyorstka',
      ru: 'Современная UI-вёрстка',
      en: 'Modern Layout Engineering',
    },
    explanation: {
      uz: '`display: grid` konteynerni ikki o‘lchovli setkaga aylantiradi. `grid-template-columns` ustunlar sonini belgilaydi, `gap` esa kartochkalar orasidagi toza masofani beradi.',
      ru: '`display: grid` превращает контейнер в двумерную сетку. `grid-template-columns` задаёт структуру колонок, а `gap` — аккуратные отступы без лишних margin.',
      en: '`display: grid` creates a two-dimensional layout. `grid-template-columns` defines columns while `gap` manages uniform gutters without margin hacks.',
    },
    takeaways: {
      uz: [
        'repeat(3, 1fr) uchta teng kenglikdagi ustun yaratadi',
        'gap: 12px barcha kataklar orasini bir xil ochadi',
        'border-radius va rang kontrastini jonli sinab ko‘ring',
      ],
      ru: [
        'repeat(3, 1fr) создаёт три колонки одинаковой ширины',
        'gap: 12px задаёт ровный интервал между карточками',
        'Меняйте свойства в коде и наблюдайте перерисовку в реальном времени',
      ],
      en: [
        'repeat(3, 1fr) creates three equal fractional columns',
        'gap: 12px sets uniform spacing between grid cells',
        'Edit styles below to see instant live layout feedback',
      ],
    },
    starterCode: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .box {
    background: #141418;
    color: #F4F4F0;
    padding: 18px 12px;
    border-radius: 12px;
    font-family: monospace;
    text-align: center;
    border: 1px solid rgba(255,59,29,0.45);
  }
  .wide {
    grid-column: span 2;
    background: #FF3B1D;
    color: #FFFFFF;
    font-weight: 700;
  }
</style>
<div class="grid">
  <div class="box wide">01 · Hero Module (span 2)</div>
  <div class="box">02 · CSS</div>
  <div class="box">03 · Vue 3</div>
  <div class="box wide">04 · TypeScript Studio</div>
</div>`,
    solutionCode: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .box {
    background: #0D0D0F;
    color: #FFFFFF;
    padding: 20px;
    border-radius: 14px;
    font-family: monospace;
    text-align: center;
  }
  .wide {
    grid-column: span 2;
    background: #FF3B1D;
  }
</style>
<div class="grid">
  <div class="box wide">FrontDev Grid System</div>
  <div class="box">Module A</div>
  <div class="box">Module B</div>
</div>`,
    expectedKeyword: 'grid',
  },
  {
    id: 'array-pipeline',
    index: '03.',
    mode: 'console',
    title: {
      uz: 'Massivlar: filter va map',
      ru: 'Массивы: filter и map',
      en: 'Arrays: filter & map',
    },
    conceptTag: {
      uz: 'Ma’lumotlar bilan ishlash',
      ru: 'Обработка данных в Frontend',
      en: 'Functional Data Pipelines',
    },
    explanation: {
      uz: 'Frontend ilovalarda serverdan kelgan ro‘yxatlar `filter` orqali saralanadi va `map` orqali kerakli ko‘rinishga keltiriladi. Asl massiv o‘zgarmay qoladi.',
      ru: 'Во фронтенде списки данных фильтруют через `filter` и преобразуют для рендера через `map` без мутации исходного массива.',
      en: 'Frontend apps transform API lists immutably using `.filter()` to select items and `.map()` to project data into UI-ready shapes.',
    },
    takeaways: {
      uz: [
        'filter(x => shart) faqat shartga mos elementlarni qoldiradi',
        'map(x => yangiShakl) har bir elementni o‘zgartiradi',
        'Metodlarni zanjir qilib (chaining) ketma-ket chaqirish mumkin',
      ],
      ru: [
        'filter() оставляет только подходящие элементы',
        'map() трансформирует каждый элемент в новый формат',
        'Цепочки методов читаются сверху вниз как сценарий',
      ],
      en: [
        'filter() retains only elements matching a predicate',
        'map() transforms each item into a new structure',
        'Method chaining keeps data pipelines declarative',
      ],
    },
    starterCode: `const courses = [
  { name: "HTML & Grid", free: true, hours: 12 },
  { name: "Vue 3 Pro", free: false, hours: 24 },
  { name: "Design Tokens", free: true, hours: 10 },
];

const freeTitles = courses
  .filter((c) => c.free)
  .map((c) => \`\${c.name} (\${c.hours}h)\`);

console.log("Bepul kurslar:", freeTitles);`,
    solutionCode: `const courses = [
  { name: "HTML & Grid", free: true, hours: 12 },
  { name: "Vue 3 Pro", free: false, hours: 24 },
  { name: "Design Tokens", free: true, hours: 10 },
];

const totalHours = courses.reduce((sum, c) => sum + c.hours, 0);
console.log("Jami soatlar:", totalHours);`,
    expectedKeyword: 'filter',
  },
  {
    id: 'vue-reactivity',
    index: '04.',
    mode: 'console',
    title: {
      uz: 'Vue Reaktivlik (ref & computed)',
      ru: 'Реактивность Vue (ref и computed)',
      en: 'Vue Reactivity (ref & computed)',
    },
    conceptTag: {
      uz: 'Vue 3 Composition API',
      ru: 'Vue 3 Composition API',
      en: 'Vue 3 Composition API',
    },
    explanation: {
      uz: '`ref()` o‘zgaruvchini kuzatiladigan qiladi, `computed()` esa unga bog‘liq qiymatni avtomatik qayta hisoblaydi. O‘quv tizimimizdagi chegirma kalkulyatori aynan shunday ishlaydi!',
      ru: '`ref()` делает значение реактивным, а `computed()` автоматически пересчитывает зависимый результат при любом изменении — так работает корзина и калькулятор тарифов.',
      en: '`ref()` wraps state in a reactive container while `computed()` derives cached values whenever dependencies change.',
    },
    takeaways: {
      uz: [
        'JS ichida ref qiymati .value orqali o‘qiladi',
        'computed() bog‘liqlik o‘zgarmaguncha natijani keshlaydi',
        'UI shablonlari avtomatik ravishda yangilanadi',
      ],
      ru: [
        'Внутри script значение ref читается через .value',
        'computed() кэширует вычисление до изменения источника',
        'Интерфейс обновляется автоматически без ручного DOM-кода',
      ],
      en: [
        'Read and mutate ref state via .value inside scripts',
        'computed() memoizes derived results automatically',
        'Components stay declarative without manual DOM updates',
      ],
    },
    starterCode: `const price = ref(299000);
const discountPercent = ref(20);

const finalPrice = computed(() => {
  return Math.round(price.value * (1 - discountPercent.value / 100));
});

console.log("Chegirmali narx:", finalPrice.value);
discountPercent.value = 30;
console.log("30% promokod bilan:", finalPrice.value);`,
    solutionCode: `const price = ref(500000);
const qty = ref(2);
const total = computed(() => price.value * qty.value);
console.log("Jami:", total.value);`,
    expectedKeyword: 'computed',
  },
];

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    step: '01',
    duration: { uz: '1–4 haftalar', ru: 'Недели 1–4', en: 'Weeks 1–4' },
    title: {
      uz: 'Veb poydevori: HTML5, CSS Grid & Tailwind',
      ru: 'Фундамент веба: HTML5, CSS Grid и Tailwind',
      en: 'Web Foundations: Semantic HTML5, CSS Grid & Tailwind',
    },
    summary: {
      uz: 'Toza semantik tuzilma, zamonaviy Flexbox/Grid setkalari, adaptiv dizayn va WCAG kontrast qoidalarini noldan o‘rganasiz.',
      ru: 'Освоите семантическую разметку, сетки Flexbox/Grid, адаптивную типографику и стандарты доступности.',
      en: 'Build rock-solid semantic markup, Flexbox/Grid layouts, responsive typography, and accessible interfaces.',
    },
    topics: {
      uz: ['Semantik HTML5', 'CSS Grid & Flexbox', 'Design Tokens', 'Responsive UI'],
      ru: ['Семантический HTML5', 'CSS Grid и Flexbox', 'Дизайн-токены', 'Адаптивность'],
      en: ['Semantic HTML5', 'CSS Grid & Flexbox', 'Design Tokens', 'Responsive UI'],
    },
    project: {
      uz: 'Arxitektura studiyasi uchun ko‘p sahifali landing',
      ru: 'Многосекционный лендинг для цифровой студии',
      en: 'Multi-section architectural studio landing page',
    },
  },
  {
    step: '02',
    duration: { uz: '5–8 haftalar', ru: 'Недели 5–8', en: 'Weeks 5–8' },
    title: {
      uz: 'JavaScript & TypeScript muhandisligi',
      ru: 'Инженерия JavaScript и TypeScript',
      en: 'JavaScript & TypeScript Engineering',
    },
    summary: {
      uz: 'Asinxron so‘rovlar (fetch/async-await), DOM manipulyatsiyasi, massiv algoritmlari va qat’iy TypeScript turlari bilan ishlash.',
      ru: 'Поймёте асинхронность, работу с API, функциональные методы массивов и строгую систему типов TypeScript.',
      en: 'Master async/await API workflows, closures, immutable array pipelines, and strict TypeScript generics.',
    },
    topics: {
      uz: ['ES2025 & Async/Await', 'TypeScript Generics', 'Discriminated Unions', 'Unit Testlar'],
      ru: ['ES2025 и Async/Await', 'Дженерики TypeScript', 'Type Guards', 'Юнит-тесты'],
      en: ['ES2025 & Async/Await', 'TypeScript Generics', 'Type Guards', 'Unit Testing'],
    },
    project: {
      uz: 'Xatosiz API klienti va interaktiv kod tekshirgich',
      ru: 'Типобезопасный API-клиент и интерактивный тренажёр',
      en: 'Type-safe API client & interactive code validator',
    },
  },
  {
    step: '03',
    duration: { uz: '9–13 haftalar', ru: 'Недели 9–13', en: 'Weeks 9–13' },
    title: {
      uz: 'Vue 3, Composition API, Pinia & Nuxt SSR',
      ru: 'Vue 3, Composition API, Pinia и Nuxt SSR',
      en: 'Vue 3, Composition API, Pinia & Nuxt SSR',
    },
    summary: {
      uz: 'Katta SPA va SSR ilovalarni arxitektura qilish, qayta ishlatiladigan composables, holat boshqaruvi va SEO optimizatsiyasi.',
      ru: 'Проектирование масштабируемых SPA и SSR приложений, кастомные composables, Pinia и серверные маршруты Nuxt.',
      en: 'Architect scalable SPAs and SSR apps with custom composables, Pinia stores, and Nuxt server routes.',
    },
    topics: {
      uz: ['Reaktivlik Proxy', 'Composables & Pinia', 'Nuxt 3 SSR', 'Auth & Checkout'],
      ru: ['Proxy-реактивность', 'Composables и Pinia', 'Nuxt 3 SSR', 'Авторизация и оплата'],
      en: ['Proxy Reactivity', 'Composables & Pinia', 'Nuxt 3 SSR', 'Auth & Checkout'],
    },
    project: {
      uz: 'To‘liq funksional o‘quv platformasi va kabinet',
      ru: 'Полноценная EdTech-платформа с подпиской',
      en: 'Full interactive EdTech platform with subscriptions',
    },
  },
  {
    step: '04',
    duration: { uz: '14–16 haftalar', ru: 'Недели 14–16', en: 'Weeks 14–16' },
    title: {
      uz: 'Creative Frontend: GSAP Motion & Portfolio',
      ru: 'Creative Frontend: GSAP Motion и портфолио',
      en: 'Creative Frontend: GSAP Motion & Career Launch',
    },
    summary: {
      uz: 'Awwwards darajasidagi skroll-xoreografiya, Canvas 2D effektlari, texnik suhbatlarga tayyorgarlik va rezyume.',
      ru: 'Сценарные скролл-анимации, Canvas 2D, оптимизация производительности и подготовка к техническим интервью.',
      en: 'Choreograph ScrollTrigger reveals, Canvas particles, 60 FPS optimization, and mock technical interviews.',
    },
    topics: {
      uz: ['GSAP ScrollTrigger', 'Canvas 2D Fizika', 'Performance Audit', 'Mock Interview'],
      ru: ['GSAP ScrollTrigger', 'Физика на Canvas', 'Аудит 60 FPS', 'Мок-собеседования'],
      en: ['GSAP ScrollTrigger', 'Canvas Physics', '60 FPS Audits', 'Mock Interviews'],
    },
    project: {
      uz: 'Awwwards uslubidagi mualliflik portfolioci',
      ru: 'Авторское портфолио уровня студий дизайна',
      en: 'Studio-grade interactive developer portfolio',
    },
  },
];

export const STUDENT_OUTCOMES: StudentOutcome[] = [
  {
    id: 'out-1',
    name: 'Jasurbek Tursunov',
    initials: 'JT',
    role: {
      uz: 'Middle Frontend Engineer',
      ru: 'Middle Frontend Engineer',
      en: 'Middle Frontend Engineer',
    },
    company: 'Uzum Tech',
    before: {
      uz: 'Avval: 0 kod tajribasi, oddiy HTML shablonlar',
      ru: 'До: 0 опыта в коммерческой разработке',
      en: 'Before: Zero commercial coding experience',
    },
    outcome: {
      uz: 'Natija: 3.5 oyda Vue 3 & TS bo‘yicha ishga joylashdi',
      ru: 'После: оффер на позицию Vue 3 / TS за 3,5 месяца',
      en: 'Outcome: Landed Vue 3 / TS offer in 3.5 months',
    },
    quote: {
      uz: 'FrontDev darslarida nazariya darhol jonli kod bilan tekshiriladi. Mentorlar esa real loyihadagi kabi code review o‘tkazadi — bu intervyuda hal qiluvchi ustunlik berdi.',
      ru: 'В FrontDev теория сразу проверяется живым кодом в браузере, а код-ревью от менторов подготовили к реальному продакшену.',
      en: 'Every concept in FrontDev goes straight into live code practice, and mentor reviews gave me real production confidence.',
    },
    metric: {
      uz: '100% vazifa · 3 ta loyiha',
      ru: '100% практики · 3 проекта',
      en: '100% exercises · 3 live apps',
    },
  },
  {
    id: 'out-2',
    name: 'Madina Rahimova',
    initials: 'MR',
    role: {
      uz: 'Creative UI Developer',
      ru: 'Creative UI Developer',
      en: 'Creative UI Developer',
    },
    company: 'Payme Studio',
    before: {
      uz: 'Avval: Grafik dizayner, kod yozishdan qo‘rqar edi',
      ru: 'До: UI-дизайнер без опыта TypeScript и анимаций',
      en: 'Before: Visual designer without TS/motion skills',
    },
    outcome: {
      uz: 'Natija: GSAP va Vue 3 bilan interaktiv mahsulotlar jamoasida',
      ru: 'После: разрабатывает интерактивные интерфейсы на Vue и GSAP',
      en: 'Outcome: Builds interactive web experiences with Vue & GSAP',
    },
    quote: {
      uz: 'Design Systems va GSAP Motion modullari menga dizayndan to‘g‘ridan-to‘g‘ri tez ishlaydigan kodga o‘tishni o‘rgatdi. Har bir qadam juda tushunarli.',
      ru: 'Курсы по дизайн-системам и GSAP научили переводить макеты в плавные 60 FPS интерфейсы без костылей.',
      en: 'The Design Systems and GSAP tracks bridged the gap between Figma and 60 FPS production code cleanly.',
    },
    metric: {
      uz: '98% yakuniy test',
      ru: '98% итоговый тест',
      en: '98% final exam score',
    },
  },
  {
    id: 'out-3',
    name: 'Sardorbek Alimov',
    initials: 'SA',
    role: {
      uz: 'Frontend Team Lead',
      ru: 'Frontend Team Lead',
      en: 'Frontend Team Lead',
    },
    company: 'FinTech Hub',
    before: {
      uz: 'Avval: Junior jQuery / oddiy JS',
      ru: 'До: Junior на устаревшем стеке без архитектуры',
      en: 'Before: Junior maintaining legacy JS pages',
    },
    outcome: {
      uz: 'Natija: Nuxt 3 SSR va TypeScript arxitektori darajasiga ko‘tarildi',
      ru: 'После: перевёл продукт на Nuxt 3 SSR и строгий TypeScript',
      en: 'Outcome: Led migration to Nuxt 3 SSR & strict TypeScript',
    },
    quote: {
      uz: 'Discriminated Unions va Composables darslari jamoamiz kodidagi xatolarni keskin kamaytirdi. FrontDev tizimli fikrlashni shakllantiradi.',
      ru: 'Модули по алгебраическим типам и композируемой архитектуре помогли навести порядок в крупном коммерческом проекте.',
      en: 'Mastering discriminated unions and clean composables cut our production UI bugs drastically.',
    },
    metric: {
      uz: '4 ta sertifikat',
      ru: '4 сертификата',
      en: '4 verified certificates',
    },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: {
      uz: 'Dasturlashni mutlaqo noldan boshlash mumkinmi?',
      ru: 'Можно ли начать обучение с полного нуля?',
      en: 'Can complete beginners start learning here from zero?',
    },
    answer: {
      uz: 'Ha. «Vyorstka asoslari: Grid, Flex & UI» va «UI-muhandislik» kurslari noldan boshlovchilar uchun ochiq. Barcha darslarda avval bugungi mavzu nazariyasi o‘rgatiladi, so‘ng kod yozish va «Kodni ishlatish» tekshiruvi ochiladi.',
      ru: 'Да. Вводные курсы по основам вёрстки и дизайн-системам подходят новичкам с нуля. В каждом уроке сначала разбирается теория, а затем открывается практика кода с проверкой при запуске.',
      en: 'Yes. Foundation UI/CSS tracks welcome complete beginners. Every lesson explains today’s theory first, then unlocks the topic’s live code-and-verify workspace.',
    },
  },
  {
    id: 'faq-2',
    question: {
      uz: 'Pullik kurslar va PRO obuna qanday farq qiladi?',
      ru: 'Чем отличается покупка курса от подписки PRO?',
      en: 'What is the difference between buying a course and PRO?',
    },
    answer: {
      uz: 'Bitta kursni sotib olsangiz, uning barcha darslari, bugungi mavzudan kod yozish studiyasi va sertifikati doimiy ochiladi. PRO obuna esa barcha 6 ta kursni va yillik tarifda mentor kod-revyusini birdaniga ochadi.',
      ru: 'Разовая покупка открывает выбранный курс, практику кода по каждой теме и сертификат навсегда. Подписка PRO сразу открывает все 6 курсов каталога и код-ревью ментора на годовом тарифе.',
      en: 'Buying a single course permanently unlocks all its lessons, topic coding labs, and certificate. A PRO plan unlocks all 6 tracks at once plus mentor code reviews on the annual tier.',
    },
  },
  {
    id: 'faq-3',
    question: {
      uz: 'Darslarni O‘zbek, Rus yoki Ingliz tilida o‘qish mumkinmi?',
      ru: 'Можно ли переключать язык обучения между UZ, RU и EN?',
      en: 'Can I switch the learning language between UZ, RU, and EN?',
    },
    answer: {
      uz: 'Albatta! Saytning yuqori menyusidan istalgan vaqtda O‘zbekcha (UZ), Русский (RU) yoki English (EN) tilini tanlashingiz mumkin — barcha darslar, mashqlar va testlar darhol moslashadi.',
      ru: 'Да! В шапке сайта вы можете мгновенно переключать интерфейс, уроки, подсказки и тесты между узбекским (UZ), русским (RU) и английским (EN) языками.',
      en: 'Yes! Use the UZ / RU / EN switcher in the top bar anytime—all UI, lessons, coding hints, and quizzes switch seamlessly.',
    },
  },
  {
    id: 'faq-4',
    question: {
      uz: 'Sertifikat qanday beriladi va uni yuklab olsa bo‘ladimi?',
      ru: 'Как получить сертификат и можно ли его скачать?',
      en: 'How are certificates issued and exported?',
    },
    answer: {
      uz: 'Har bir kurs oxirida 3 savoldan iborat attestatsiya testi bor. Kamida 66% to‘plaganingizda shaxsiy kabinetda unikal ID raqamli sertifikat paydo bo‘ladi va uni PDF qilib chop etish mumkin.',
      ru: 'После прохождения итогового теста курса (от 66% правильных ответов) именной сертификат с уникальным ID автоматически появляется в кабинете с кнопкой сохранения в PDF.',
      en: 'Score 66%+ on any course final exam to unlock an ID-verified certificate in your dashboard with one-click print/PDF export.',
    },
  },
  {
    id: 'faq-5',
    question: {
      uz: 'Chegirma promokodlari bormi?',
      ru: 'Есть ли промокоды на скидку?',
      en: 'Are there any active promo codes?',
    },
    answer: {
      uz: 'Ha, to‘lov oynasida FRONT20 promokodi 20% chegirma, FRONTDEV30 esa 30% chegirma beradi.',
      ru: 'Да, при оплате промокод FRONT20 даёт скидку 20%, а FRONTDEV30 — скидку 30%.',
      en: 'Yes—enter FRONT20 at checkout for 20% off or FRONTDEV30 for 30% off.',
    },
  },
];
