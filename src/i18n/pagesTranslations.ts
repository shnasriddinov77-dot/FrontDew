import type { LocalizedText } from './translations';

export const PAGES_COPY = {
  banners: {
    courses: {
      kicker: {
        uz: 'FrontDev · O‘quv dasturlari',
        ru: 'FrontDev · Программы обучения',
        en: 'FrontDev · Course Programs',
      },
      title: {
        uz: 'Har bir daraja uchun tizimli frontend kurslari',
        ru: 'Системные курсы фронтенд-разработки для любого уровня',
        en: 'Structured frontend engineering tracks for every level',
      },
      subtitle: {
        uz: 'Kursni tanlang, sotib oling va har bir darsni «Nazariya → Bugungi mavzudan kod yozish → Kodni ishlatish va tekshirish» qoidasi asosida o‘zlashtiring.',
        ru: 'Выберите трек, откройте доступ и проходите каждый урок по системе «Теория → Код по изученной теме → Автопроверка при запуске».',
        en: 'Choose a track, unlock full access, and master every module through Theory → Studied-Topic Coding → Automated Run-to-Verify.',
      },
      stats: [
        { value: '6', label: { uz: 'Asosiy trek', ru: 'Ключевых треков', en: 'Core tracks' } },
        { value: '100%', label: { uz: 'Jonli kod tekshiruvi', ru: 'Проверка при запуске', en: 'Auto-checked practice' } },
        { value: 'FDV', label: { uz: 'Sertifikat va portfel', ru: 'Сертификат и портфолио', en: 'Verified certificates' } },
      ],
    },
    roadmap: {
      kicker: {
        uz: 'FrontDev · Karyera xaritasi',
        ru: 'FrontDev · Карьерный маршрут',
        en: 'FrontDev · Career Roadmap',
      },
      title: {
        uz: 'Birinchi tegdan Senior arxitekturagacha aniq reja',
        ru: 'Чёткий путь от первой строки HTML до Senior-архитектуры',
        en: 'A 16-week blueprint from first markup to Senior Frontend',
      },
      subtitle: {
        uz: 'Tartibsiz darslar o‘rniga bosqichma-bosqich reja: har bir hafta aniq mavzular, amaliy vazifalar va portfel loyihalari bilan yopiladi.',
        ru: 'Никакого хаоса из случайных видео: каждая неделя закрепляется практикой кода, разбором архитектуры и реальным проектом.',
        en: 'Zero random tutorials: every week closes with strict coding assignments, architectural drills, and portfolio deliverables.',
      },
      stats: [
        { value: '4', label: { uz: 'Bosqich', ru: 'Этапа обучения', en: 'Mastery stages' } },
        { value: '16', label: { uz: 'Hafta dastur', ru: 'Недель практики', en: 'Weeks curriculum' } },
        { value: '4', label: { uz: 'Real loyiha', ru: 'Реальных проекта', en: 'Portfolio builds' } },
      ],
    },
    about: {
      kicker: {
        uz: 'FrontDev · Markaz falsafasi',
        ru: 'FrontDev · О центре и команде',
        en: 'FrontDev · About Our Academy',
      },
      title: {
        uz: 'Nazariyani chuqur tushuntirib, kod yozishni majburiy tekshiradigan o‘quv markazi',
        ru: 'Учебный центр, где сначала объясняют суть, а затем проверяют каждый ваш код',
        en: 'An engineering school built on understanding first, then verified coding',
      },
      subtitle: {
        uz: 'FrontDev talabalarga shunchaki video ko‘rsatmaydi — avval mavzu mantiqini ochadi, keyin esa o‘sha kun o‘rganilgan mavzu bo‘yicha kod yozdirib tekshiradi.',
        ru: 'Мы не оставляем студентов с сухими видео: сначала разбираем тему построчно, а затем открываем практику кода с мгновенной проверкой.',
        en: 'We never throw beginners straight into guesswork: we teach the mental model first, then unlock verified coding challenges for that exact topic.',
      },
      stats: [
        { value: '8 400+', label: { uz: 'Bitiruvchi', ru: 'Выпускников', en: 'Graduates' } },
        { value: '92%', label: { uz: 'Ishga joylashish', ru: 'Трудоустройство', en: 'Placement rate' } },
        { value: '3', label: { uz: 'O‘qitish tili', ru: 'Языка обучения', en: 'Languages' } },
      ],
    },
    pricing: {
      kicker: {
        uz: 'FrontDev · Obuna va to‘lov',
        ru: 'FrontDev · Тарифы и доступ',
        en: 'FrontDev · Plans & Tuition',
      },
      title: {
        uz: 'Alohida kurs yoki barcha kurslar uchun FrontDev PRO',
        ru: 'Отдельный курс или полный доступ FrontDev PRO',
        en: 'Single-track purchase or full FrontDev PRO access',
      },
      subtitle: {
        uz: 'Kursni sotib olgan zahotingiz barcha yopiq darslar, bugungi mavzu bo‘yicha kod yozish muharriri, «Kodni ishlatish» tekshiruvi va yakuniy sertifikat ochiladi.',
        ru: 'Сразу после оплаты открываются все модули, тренажёр кода по изученной теме, автопроверка и именной сертификат.',
        en: 'Unlock full modules, topic-by-topic coding workspaces, instant run-to-verify checks, and official certificates immediately after checkout.',
      },
      stats: [
        { value: '20%', label: { uz: 'FRONT20 promokodi', ru: 'Промокод FRONT20', en: 'Promo FRONT20' } },
        { value: '30%', label: { uz: 'FRONTDEV30 chegirma', ru: 'Скидка FRONTDEV30', en: 'Code FRONTDEV30' } },
        { value: '24/7', label: { uz: 'Doimiy kirish', ru: 'Мгновенный доступ', en: 'Instant access' } },
      ],
    },
  },

  workflow: {
    kicker: {
      uz: 'Ta’lim mexanizmi · Learn-First Flow',
      ru: 'Механика обучения · Learn-First Flow',
      en: 'Pedagogy Engine · Learn-First Flow',
    },
    title: {
      uz: 'Avval sotib oling va nazariyani o‘rganing — so‘ng o‘sha mavzudan kod yozing',
      ru: 'Сначала оплата и теория — затем практика кода именно по сегодняшней теме',
      en: 'Buy & learn the topic first — then unlock verified coding for today’s lesson',
    },
    subtitle: {
      uz: 'Biz tartibsiz mashqlardan voz kechdik. Har bir dars qat’iy 3 bosqichda ochiladi: to‘liq kirish → bugungi mavzu tahlili → kod yozish va «Kodni ishlatish» tekshiruvi.',
      ru: 'Каждый урок в FrontDev устроен дисциплинированно: сначала студент покупает курс и изучает тему, затем открывается редактор кода, где кнопка запуска сразу проверяет решение.',
      en: 'Every lesson enforces disciplined mastery: unlock the course, study today’s topic breakdown, then open the editor where pressing Run executes and verifies your solution.',
    },
    steps: [
      {
        num: '01',
        tag: { uz: 'To‘liq kirish', ru: 'Покупка курса', en: 'Unlock Course' },
        title: {
          uz: 'Kursni sotib oling yoki PRO obunani yoqing',
          ru: 'Купите нужный курс или активируйте PRO',
          en: 'Purchase a course or activate PRO',
        },
        desc: {
          uz: 'Pullik kurslarning kod yozish studiyasi va yopiq modullari faqat sotib olingandan so‘ng ochiladi. Ungacha dastur tuzilishi va birinchi dars nazariyasini ko‘rishingiz mumkin.',
          ru: 'Редактор кода и практические модули платных программ открываются только после оплаты курса или подписки PRO.',
          en: 'Coding workspaces and full modules unlock strictly after purchase or PRO activation—no skipped fundamentals.',
        },
      },
      {
        num: '02',
        tag: { uz: 'Bugungi mavzu', ru: 'Теория урока', en: 'Study Today’s Topic' },
        title: {
          uz: 'Nazariya, qatorma-qator tahlil va xatolarni o‘rganing',
          ru: 'Изучите теорию, разбор строк и частые ошибки',
          en: 'Master theory, line-by-line anatomy & pitfalls',
        },
        desc: {
          uz: 'Har bir darsda avval nazariya chiqadi. Talaba mavzuni o‘qib chiqib «Mavzuni o‘rgandim» tugmasini bosgandan keyingina bugungi mavzu bo‘yicha kod yozish bloki ochiladi.',
          ru: 'Сначала открывается подробное объяснение темы. Только после нажатия «Тема изучена» появляется задание по сегодняшнему материалу.',
          en: 'Each lesson presents deep theory first. Only after confirming you studied today’s concept does the topic’s coding editor open.',
        },
      },
      {
        num: '03',
        tag: { uz: 'Kodni ishlatish = Tekshirish', ru: 'Запуск = Проверка', en: 'Run = Auto-Verify' },
        title: {
          uz: '«Kodni ishlatish» tugmasini bosing — tizim tekshiradi',
          ru: 'Нажмите «Запустить код» — система сразу проверит его',
          en: 'Click “Run & verify code” to execute and grade live',
        },
        desc: {
          uz: 'Kod muharririda «Kodni ishlatish» tugmasi bosilganda tizim kodingizni ham brauzerda ishga tushiradi, ham sintaksis va dars shartiga mosligini darhol tekshirib ball beradi.',
          ru: 'При нажатии кнопки запуска тренажёр одновременно выполняет код в песочнице, ловит ошибки и проверяет соответствие паттерну урока.',
          en: 'Pressing Run executes your JavaScript, Vue, or CSS live and immediately validates syntax, logic, and lesson rules.',
        },
      },
    ],
    previewLabel: {
      uz: 'Kurs ichidagi dars ketma-ketligi sxemasi',
      ru: 'Схема прохождения урока внутри курса',
      en: 'Inside-the-course lesson sequence',
    },
    ctaCourses: {
      uz: 'Kurslarni tanlash va boshlash',
      ru: 'Выбрать курс и начать',
      en: 'Browse courses & start',
    },
    ctaRoadmap: {
      uz: 'To‘liq yo‘l xaritasi',
      ru: 'Смотреть программу',
      en: 'View full roadmap',
    },
  },

  featured: {
    kicker: { uz: 'Eng mashhur yo‘nalishlar', ru: 'Флагманские треки', en: 'Featured Tracks' },
    title: {
      uz: 'Amaliyotga yo‘naltirilgan asosiy kurslar',
      ru: 'Ключевые программы с проверкой кода',
      en: 'Flagship engineering tracks',
    },
    viewAllBtn: {
      uz: 'Barcha 6 ta kurs sahifasiga o‘tish',
      ru: 'Открыть страницу всех 6 курсов',
      en: 'Open full Courses page (6 tracks)',
    },
  },

  curriculumMatrix: {
    kicker: { uz: 'Barcha kurslar qiyosiy jadvali', ru: 'Сравнительная матрица программ', en: 'Track Comparison Matrix' },
    title: {
      uz: 'Qaysi kursdan boshlashni aniqlang',
      ru: 'Сравните все 6 треков по уровню и результату',
      en: 'Compare prerequisites, pace, and capstone builds across all 6 tracks',
    },
    cols: {
      course: { uz: 'Kurs', ru: 'Курс', en: 'Track' },
      level: { uz: 'Daraja', ru: 'Уровень', en: 'Level' },
      stack: { uz: 'Asosiy texnologiyalar', ru: 'Стек', en: 'Core stack' },
      capstone: { uz: 'Yakuniy loyiha', ru: 'Финальный проект', en: 'Capstone deliverable' },
      action: { uz: 'Amal', ru: 'Действие', en: 'Action' },
    },
    capstones: {
      'vue-3-architecture': {
        uz: 'Ko‘p rolli SaaS boshqaruv paneli + Pinia store',
        ru: 'SaaS-дашборд с ролями и Pinia-стором',
        en: 'Multi-role SaaS workspace with Pinia stores',
      },
      'creative-gsap-webgl': {
        uz: 'Awwwards uslubidagi interaktiv skroll sayt',
        ru: 'Интерактивный скролл-сайт уровня Awwwards',
        en: 'Studio-grade ScrollTrigger showcase site',
      },
      'typescript-systems': {
        uz: 'Tip-xavfsiz API klienti va state mashina',
        ru: 'Типобезопасный API-клиент и state-машина',
        en: 'Strict type-safe API SDK & state engine',
      },
      'html-css-foundations': {
        uz: 'Adaptiv Bento-grid studiya vitrinasi',
        ru: 'Адаптивная Bento-сетка для дизайн-студии',
        en: 'Responsive Bento-grid editorial showcase',
      },
      'nuxt-fullstack': {
        uz: 'SSR katalog + Nitro API + SEO metama’lumotlar',
        ru: 'SSR-каталог с Nitro API и SEO-оптимизацией',
        en: 'SSR catalog with Nitro API routes & SEO',
      },
      'design-systems-tailwind': {
        uz: 'Tailwind v4 dizayn tokenlar kutubxonasi',
        ru: 'Библиотека дизайн-токенов на Tailwind v4',
        en: 'Multi-brand Tailwind v4 token library',
      },
    } as Record<string, LocalizedText>,
    openBtn: { uz: 'Sahifani ochish', ru: 'Открыть курс', en: 'Open track' },
  },

  milestones: {
    kicker: { uz: 'Karyera o‘sishi', ru: 'Карьерная прогрессия', en: 'Career Progression' },
    title: {
      uz: 'Har bir bosqich yakunida nimalarni bilasiz?',
      ru: 'Какие навыки вы подтверждаете на каждом этапе',
      en: 'Concrete competencies unlocked at every stage',
    },
    cards: [
      {
        grade: 'Stage 01 · Junior Ready',
        title: { uz: 'Toza vyorstka va UI', ru: 'Чистая UI-вёрстка', en: 'Semantic UI & Grids' },
        items: {
          uz: [
            'CSS Grid & Flexbox bilan murakkab maketlar',
            'WCAG AA kontrast va klaviatura navigatsiyasi',
            'Dizayn tokenlari va adaptiv tipografika',
          ],
          ru: [
            'Сложные макеты на CSS Grid и Flexbox',
            'Доступность WCAG AA и фокус-навигация',
            'Система дизайн-токенов и типографики',
          ],
          en: [
            'Complex responsive layouts with Grid & Flex',
            'WCAG AA contrast & keyboard accessibility',
            'Design tokens & fluid typographic scales',
          ],
        },
      },
      {
        grade: 'Stage 02 · Strong Junior+',
        title: { uz: 'JS & TypeScript mantiq', ru: 'Логика на JS и TS', en: 'JS & TypeScript Core' },
        items: {
          uz: [
            'Asinxron API so‘rovlar va xatolarni ushlash',
            'Generics va Discriminated Unions bilan xavfsiz kod',
            'Sof funksiyalar uchun unit testlar yozish',
          ],
          ru: [
            'Асинхронная работа с API и обработка ошибок',
            'Дженерики и Discriminated Unions в TS',
            'Модульные тесты для чистой бизнес-логики',
          ],
          en: [
            'Async API handling & resilient error states',
            'Generics & Discriminated Unions in TypeScript',
            'Deterministic unit tests for pure logic',
          ],
        },
      },
      {
        grade: 'Stage 03 · Middle Vue/Nuxt',
        title: { uz: 'SPA & SSR arxitektura', ru: 'Архитектура Vue и Nuxt', en: 'Vue 3 & Nuxt SSR' },
        items: {
          uz: [
            'Composable modullar va Pinia setup storlar',
            'Nuxt 3 SSR, Nitro API va keshlash',
            'Avtorizatsiya, to‘lov oqimi va himoyalangan sahifalar',
          ],
          ru: [
            'Composables и модульные Pinia-сторы',
            'Nuxt 3 SSR, Nitro-роуты и гидратация',
            'Авторизация, чекаут и ролевой доступ',
          ],
          en: [
            'Reusable composables & Pinia setup stores',
            'Nuxt 3 SSR, Nitro server routes & caching',
            'Auth, checkout flows & gated course studios',
          ],
        },
      },
      {
        grade: 'Stage 04 · Senior / Creative',
        title: { uz: '60 FPS Motion & Audit', ru: '60 FPS Motion и Аудит', en: 'Motion & Performance' },
        items: {
          uz: [
            'GSAP ScrollTrigger va Canvas 2D sahnalar',
            'GPU compositor optimizatsiyasi va profiler',
            'Real texnik intervyular va code review tayyorgarligi',
          ],
          ru: [
            'Сценарии GSAP ScrollTrigger и Canvas 2D',
            'Оптимизация рендера до стабильных 60 FPS',
            'Подготовка к техническим интервью и ревью',
          ],
          en: [
            'GSAP ScrollTrigger choreography & Canvas 2D',
            'GPU compositor profiling at steady 60 FPS',
            'Mock system-design & code-review interviews',
          ],
        },
      },
    ],
  },

  mentors: {
    kicker: { uz: 'O‘qituvchilar jamoasi', ru: 'Преподаватели и архитекторы', en: 'Faculty & Architects' },
    title: {
      uz: 'Sizga real amaliyotchi muhandislar dars beradi',
      ru: 'Вас обучают практикующие сеньор-инженеры',
      en: 'Learn directly from practicing principal frontend engineers',
    },
    faculty: [
      {
        name: 'Azizbek Karimov',
        initials: 'AK',
        role: {
          uz: 'Bosh mentor · Vue & Nuxt Architecture',
          ru: 'Главный ментор · Vue & Nuxt Architecture',
          en: 'Lead Mentor · Vue & Nuxt Architecture',
        },
        exp: { uz: '9 yil tajriba · 4× Awwwards SOTD', ru: '9 лет опыта · 4× Awwwards SOTD', en: '9 yrs experience · 4× Awwwards SOTD' },
        bio: {
          uz: 'Katta SaaS mahsulotlar va interaktiv veb-studiyalarda frontend arxitekturasini boshqargan. Har bir modulda kodning soddaligi va tezligiga e’tibor beradi.',
          ru: 'Проектировал архитектуру крупных SaaS-систем и креативных студий. Учит писать поддерживаемый, быстрый код без лишней сложности.',
          en: 'Architected high-traffic SaaS apps and interactive studios. Focuses on clean reactive state and 60 FPS motion craft.',
        },
      },
      {
        name: 'Elena Morozova',
        initials: 'EM',
        role: {
          uz: 'Design Systems & CSS Lead',
          ru: 'Design Systems & CSS Lead',
          en: 'Design Systems & CSS Lead',
        },
        exp: { uz: '7 yil tajriba · Design Tokens', ru: '7 лет опыта · Дизайн-системы', en: '7 yrs experience · Design Systems' },
        bio: {
          uz: 'Figma maketlarini mukammal CSS Grid, Tailwind v4 va qulay (accessible) UI komponentlarga aylantirish bo‘yicha mutaxassis.',
          ru: 'Специализируется на переводе сложных макетов в точные дизайн-системы на CSS Grid, Tailwind v4 и доступных компонентах.',
          en: 'Specializes in translating editorial typography and layout grids into accessible Tailwind v4 component libraries.',
        },
      },
      {
        name: 'Dmitriy Sokolov',
        initials: 'DS',
        role: {
          uz: 'Principal TypeScript Engineer',
          ru: 'Principal TypeScript Engineer',
          en: 'Principal TypeScript Engineer',
        },
        exp: { uz: '10 yil tajriba · Strict TS & Testing', ru: '10 лет опыта · Strict TS и тесты', en: '10 yrs experience · Strict TS & Testing' },
        bio: {
          uz: 'Kompilyator darajasida xatolarni tutuvchi TypeScript tizimlari, generik API klientlari va unit testlash metodologiyasi muallifi.',
          ru: 'Автор модулей по алгебраическим типам, дженерикам и надёжной архитектуре, исключающей runtime-ошибки.',
          en: 'Teaches algebraic type design, strict generics, and automated verification pipelines that prevent runtime bugs.',
        },
      },
    ],
  },

  planComparison: {
    kicker: { uz: 'Imkoniyatlar taqqoslanishi', ru: 'Сравнение форматов доступа', en: 'Access Comparison' },
    title: {
      uz: 'Barcha tariflar bo‘yicha batafsil jadval',
      ru: 'Что входит в каждый формат обучения',
      en: 'Detailed breakdown across access tiers',
    },
    headers: {
      feature: { uz: 'Imkoniyat', ru: 'Возможность', en: 'Feature' },
      free: { uz: 'Bepul tanishuv', ru: 'Знакомство', en: 'Free Preview' },
      single: { uz: 'Alohida kurs', ru: 'Один курс', en: 'Single Course' },
      pro: { uz: 'FrontDev PRO', ru: 'FrontDev PRO', en: 'FrontDev PRO' },
    },
    rows: [
      {
        label: { uz: 'Kurs dasturi va birinchi dars nazariyasi', ru: 'Программа и теория 1-го урока', en: 'Syllabus & lesson 1 theory preview' },
        free: '✓',
        single: '✓',
        pro: '✓',
      },
      {
        label: { uz: 'Barcha pullik modullar va chuqur tahlillar', ru: 'Все модули и разборы кода', en: 'All course modules & code breakdowns' },
        free: '—',
        single: { uz: 'Tanlangan kurs', ru: 'Выбранный курс', en: 'Purchased track' },
        pro: { uz: 'Barcha 6 ta kurs', ru: 'Все 6 курсов', en: 'All 6 tracks' },
      },
      {
        label: { uz: 'Bugungi mavzudan kod yozish va «Kodni ishlatish» tekshiruvi', ru: 'Редактор кода и проверка при запуске', en: 'Studied-topic IDE & Run-to-Verify' },
        free: '—',
        single: '✓',
        pro: '✓',
      },
      {
        label: { uz: 'Yakuniy imtihon va FDV sertifikat', ru: 'Итоговый тест и сертификат FDV', en: 'Final exam & verified FDV certificate' },
        free: '—',
        single: '✓',
        pro: '✓',
      },
      {
        label: { uz: 'Mentor kod-revyu va karyera maslahati', ru: 'Код-ревью от менторов и карьера', en: 'Mentor code review & career prep' },
        free: '—',
        single: '—',
        pro: { uz: 'PRO Yillik', ru: 'PRO Годовой', en: 'PRO Annual' },
      },
    ],
  },
} as const;
