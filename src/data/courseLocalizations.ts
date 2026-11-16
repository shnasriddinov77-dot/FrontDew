import type { Locale, LocalizedText } from '../i18n/translations';
import type { CourseLesson, FrontendCourse, QuizQuestion, SubscriptionTier } from './frontendCourses';

export interface LessonPedagogy {
  title: LocalizedText;
  summary: LocalizedText;
  keyPoints: { uz: string[]; ru: string[]; en: string[] };
  taskPrompt: LocalizedText;
  hint: LocalizedText;
  pitfall: {
    wrong: string;
    right: string;
    note: LocalizedText;
  };
  anatomy: {
    line: string;
    note: LocalizedText;
  }[];
  solutionCode: string;
  isCssPreview?: boolean;
}

export interface CourseLocalization {
  title: LocalizedText;
  subtitle: LocalizedText;
  categoryLabel: LocalizedText;
  level: LocalizedText;
  mentorName: LocalizedText;
  mentorRole: LocalizedText;
  mentorExp: LocalizedText;
  moduleTitles: Record<string, LocalizedText>;
  lessons: Record<string, LessonPedagogy>;
  quiz: Record<
    string,
    {
      question: LocalizedText;
      options: { uz: string[]; ru: string[]; en: string[] };
    }
  >;
}

export const SUBSCRIPTION_LOCALIZATIONS: Record<
  SubscriptionTier['id'],
  {
    name: LocalizedText;
    tagline: LocalizedText;
    features: { uz: string[]; ru: string[]; en: string[] };
  }
> = {
  'pro-monthly': {
    name: { uz: 'PRO Oylik', ru: 'PRO Месяц', en: 'PRO Monthly' },
    tagline: {
      uz: 'Barcha pullik kurslar, jonli mashqlar va testlarga to‘liq kirish',
      ru: 'Полный доступ ко всем платным курсам и тестам',
      en: 'Full access to every paid course, sandbox, and exam',
    },
    features: {
      uz: [
        'Katalogdagi barcha 6 ta kursga to‘liq kirish',
        'Brauzerda interaktiv kod tekshiruvi va yechimlar',
        'Yakuniy imtihonlar va rasmiy FrontDev sertifikatlari',
        'Uy vazifalari va hamjamiyat muhokamasi',
      ],
      ru: [
        'Доступ ко всем 6 курсам каталога',
        'Интерактивная практика и проверка кода',
        'Итоговые тесты и именные сертификаты',
        'Разбор домашних работ в комьюнити',
      ],
      en: [
        'Full access to all 6 catalog courses',
        'Interactive in-browser coding practice & checks',
        'Final certification exams & verified certificates',
        'Community homework walkthroughs',
      ],
    },
  },
  'pro-annual': {
    name: { uz: 'PRO Yillik + Mentor', ru: 'PRO Год + Ментор', en: 'PRO Annual + Mentor' },
    tagline: {
      uz: 'Maksimal amaliyot, senior code-review va karyera treki',
      ru: 'Максимум практики, код-ревью и карьерный трек',
      en: 'Maximum hands-on practice, senior code review & career prep',
    },
    features: {
      uz: [
        '12 oy davomida barcha PRO imkoniyatlar',
        'Senior arxitektorlardan shaxsiy code review',
        'Awwwards uslubida kuchli portfolio tayyorlash',
        'Texnik suhbatlarga tayyorgarlik va stajirovka ustuvorligi',
      ],
      ru: [
        'Все преимущества PRO на 12 месяцев',
        'Персональные код-ревью от сеньор-архитекторов',
        'Подготовка портфолио в стиле Awwwards',
        'Приоритетная стажировка и разбор собеседований',
      ],
      en: [
        'Full PRO access for 12 months',
        '1-on-1 code reviews from Staff Architects',
        'Studio-grade portfolio engineering coaching',
        'Priority internship referral & mock interviews',
      ],
    },
  },
};

export const COURSE_LOCALIZATIONS: Record<string, CourseLocalization> = {
  'vue-3-architecture': {
    title: {
      uz: 'Vue 3, Composition API & Pinia',
      ru: 'Vue 3, Composition API & Pinia',
      en: 'Vue 3, Composition API & Pinia',
    },
    subtitle: {
      uz: 'TypeScript asosida reaktiv SPA va komponent kutubxonalarining sanoat arxitekturasi.',
      ru: 'Промышленная архитектура реактивных SPA и компонентных библиотек на TypeScript.',
      en: 'Production architecture for reactive SPAs and typed component systems in TypeScript.',
    },
    categoryLabel: { uz: 'Vue & Nuxt', ru: 'Vue & Nuxt', en: 'Vue & Nuxt' },
    level: { uz: 'Ilg‘or', ru: 'Продвинутый', en: 'Advanced' },
    mentorName: { uz: 'Azizbek Karimov', ru: 'Азизбек Каримов', en: 'Azizbek Karimov' },
    mentorRole: {
      uz: 'Staff Frontend Architect',
      ru: 'Staff Frontend Architect',
      en: 'Staff Frontend Architect',
    },
    mentorExp: { uz: '9 yil tajriba', ru: '9 лет в продакшене', en: '9 yrs production' },
    moduleTitles: {
      m1: {
        uz: '1-modul. Reaktiv yadro va Composition API',
        ru: 'Модуль 1. Реактивное ядро и Composition API',
        en: 'Module 1. Reactivity Core & Composition API',
      },
      m2: {
        uz: '2-modul. Pinia bilan holat boshqaruvi',
        ru: 'Модуль 2. Управление состоянием в Pinia',
        en: 'Module 2. State Management with Pinia',
      },
    },
    lessons: {
      'vue-l1': {
        title: {
          uz: 'ref, reactive va ichki Proxy mexanizmi',
          ru: 'ref, reactive и подкапотные Proxy-ловушки',
          en: 'ref, reactive & Under-the-Hood Proxy Traps',
        },
        summary: {
          uz: 'Vue 3 ES6 Proxy orqali o‘zgarishlarni qanday kuzatishini, qachon ref va qachon reactive tanlash kerakligini hamda destructuring paytida reaktivlik yo‘qolmasligini o‘rganamiz.',
          ru: 'Разбираем, как Vue 3 отслеживает зависимости на уровне ES6 Proxy, когда выбирать ref вместо reactive и как избежать потери реактивности при деструктуризации.',
          en: 'Understand how Vue 3 tracks dependencies via ES6 Proxy traps, when to prefer ref over reactive, and how to preserve reactivity on destructuring.',
        },
        keyPoints: {
          uz: [
            'Proxy get/set operatsiyalarini ushlab, bog‘liqlik grafigini quradi',
            'toRefs composable dan obyekt qaytarishda reaktivlikni saqlaydi',
            'computed manbalar o‘zgarguncha natijani keshlaydi',
          ],
          ru: [
            'Proxy перехватывает get/set и строит граф зависимостей',
            'toRefs сохраняет реактивные связи при возврате из composable',
            'computed кэширует вычисления до изменения источников',
          ],
          en: [
            'Proxy intercepts get/set reads and writes to build a dependency graph',
            'toRefs keeps reactive links intact when returning objects from composables',
            'computed caches derived state until upstream sources change',
          ],
        },
        taskPrompt: {
          uz: 'count.value ning ikki baravarini qaytaradigan doubleCount nomli computed yarating va console.log bilan chiqaring.',
          ru: 'Создайте computed-свойство doubleCount, которое возвращает удвоенное значение count.value.',
          en: 'Create a computed property doubleCount returning double count.value.',
        },
        hint: {
          uz: 'const doubleCount = computed(() => count.value * 2); deb yozing',
          ru: 'Используйте синтаксис: const doubleCount = computed(() => count.value * 2);',
          en: 'Write: const doubleCount = computed(() => count.value * 2);',
        },
        pitfall: {
          wrong: 'const { count } = reactive({ count: 0 }); // breaks reactivity!',
          right: 'const state = reactive({ count: 0 }); const { count } = toRefs(state);',
          note: {
            uz: 'reactive obyektni oddiy destructure qilish oddiy son nusxasini oladi va UI yangilanmaydi.',
            ru: 'Обычная деструктуризация reactive теряет Proxy-обёртку — используйте toRefs().',
            en: 'Destructuring a reactive object directly breaks tracking—always wrap with toRefs().',
          },
        },
        anatomy: [
          {
            line: 'const qty = ref(1);',
            note: {
              uz: 'Oddiy qiymatni kuzatiladigan reaktiv konteynerga o‘raydi.',
              ru: 'Оборачивает примитив в реактивный контейнер с .value.',
              en: 'Wraps a primitive inside a reactive .value container.',
            },
          },
          {
            line: 'const total = computed(() => qty.value * price);',
            note: {
              uz: 'qty o‘zgarganda avtomatik qayta hisoblanadi, aks holda keshdan olinadi.',
              ru: 'Пересчитывается только при изменении qty, иначе возвращает кэш.',
              en: 'Re-evaluates only when qty changes; otherwise returns cached result.',
            },
          },
        ],
        solutionCode: `import { ref, computed } from 'vue';

const count = ref(4);
const doubleCount = computed(() => count.value * 2);
console.log('doubleCount =', doubleCount.value);`,
      },
      'vue-l2': {
        title: {
          uz: 'Qayta ishlatiladigan Composables patternlari',
          ru: 'Паттерны проектируемых Composables',
          en: 'Reusable Composable Architecture Patterns',
        },
        summary: {
          uz: 'Biznes mantiq, oyna hodisalari va API so‘rovlarini toza use* modullariga ajratishni va xotira sizib chiqishining oldini olishni o‘rganamiz.',
          ru: 'Учимся выносить бизнес-логику, подписки на события окна и работу с API в чистые переиспользуемые composable-модули.',
          en: 'Extract window listeners, API workflows, and domain logic into leak-free use* composables.',
        },
        keyPoints: {
          uz: [
            'Har bir use-funksiya bitta aniq vazifa bajarishi kerak',
            'onUnmounted hodisa tinglovchilarini avtomatik tozalaydi',
            'MaybeRef turlari moslashuvchan API yaratadi',
          ],
          ru: [
            'Принцип единственной ответственности для use-функций',
            'Автоматическая очистка слушателей через onUnmounted',
            'Типизация аргументов через MaybeRef',
          ],
          en: [
            'Follow single-responsibility per composable module',
            'Always pair onMounted listeners with onUnmounted cleanup',
            'Accept MaybeRef inputs for flexible ergonomics',
          ],
        },
        taskPrompt: {
          uz: 'onUnmounted ichida window.removeEventListener orqali tozalash qatorini qo‘shing.',
          ru: 'Добавьте очистку слушателя внутри хука onUnmounted.',
          en: 'Register cleanup inside onUnmounted with removeEventListener.',
        },
        hint: {
          uz: "onUnmounted(() => window.removeEventListener('resize', handler));",
          ru: "Добавьте: onUnmounted(() => window.removeEventListener('resize', handler));",
          en: "Call onUnmounted(() => window.removeEventListener('resize', handler));",
        },
        pitfall: {
          wrong: "onMounted(() => window.addEventListener('scroll', fn)); // memory leak",
          right: "onUnmounted(() => window.removeEventListener('scroll', fn));",
          note: {
            uz: 'Olib tashlanmagan listenerlar sahifa almashganda xotirada qolib sekinlashtiradi.',
            ru: 'Забытые слушатели накапливаются при навигации и вызывают утечки памяти.',
            en: 'Orphaned event listeners accumulate across route transitions and leak memory.',
          },
        },
        anatomy: [
          {
            line: "onMounted(() => window.addEventListener('scroll', update));",
            note: {
              uz: 'Komponent DOM ga chiqqandan keyin hodisaga ulanadi.',
              ru: 'Подписывается на скролл после монтирования компонента.',
              en: 'Attaches listener safely once component mounts in DOM.',
            },
          },
          {
            line: "onUnmounted(() => window.removeEventListener('scroll', update));",
            note: {
              uz: 'Komponent yopilganda tinglovchini tozalaydi.',
              ru: 'Снимает подписку при размонтировании компонента.',
              en: 'Cleans up subscription when component unmounts.',
            },
          },
        ],
        solutionCode: `import { onMounted, onUnmounted } from 'vue';

export function useResize(handler: () => void) {
  onMounted(() => window.addEventListener('resize', handler));
  onUnmounted(() => window.removeEventListener('resize', handler));
}`,
      },
      'vue-l3': {
        title: {
          uz: 'Pinia Setup Stores va localStorage saqlash',
          ru: 'Setup Stores и персистентность в браузере',
          en: 'Pinia Setup Stores & Browser Persistence',
        },
        summary: {
          uz: 'Avtorizatsiya, kurs xaridi va obunani ortiqcha mutatsiyalarsiz bashorat qilinadigan store da quramiz.',
          ru: 'Строим предсказуемый стор авторизации и подписок без лишнего бойлерплейта мутаций.',
          en: 'Build predictable auth and subscription stores without boilerplate mutations.',
        },
        keyPoints: {
          uz: [
            'Setup store ichida ref va computed tabiiy ishlaydi',
            'watch(deep: true) holatni localStorage ga sinxronlaydi',
            'storeToRefs reaktiv xususiyatlarni xavfsiz o‘qiydi',
          ],
          ru: [
            'Setup-синтаксис в defineStore позволяет использовать composables',
            'watch с deep: true синхронизирует состояние с localStorage',
            'storeToRefs для безопасного чтения полей в компонентах',
          ],
          en: [
            'Setup stores support composables directly inside defineStore',
            'Deep watchers keep client state synced with localStorage',
            'storeToRefs preserves reactivity when destructuring state',
          ],
        },
        taskPrompt: {
          uz: 'computed yordamida isLogged mantiqiy getterini yozing.',
          ru: 'Объявите геттер isLogged с помощью computed.',
          en: 'Declare a derived isLogged boolean using computed.',
        },
        hint: {
          uz: 'const isLogged = computed(() => Boolean(user.value));',
          ru: 'const isLogged = computed(() => Boolean(user.value));',
          en: 'const isLogged = computed(() => Boolean(user.value));',
        },
        pitfall: {
          wrong: 'const { token } = useAuthStore(); // static snapshot',
          right: 'const { token } = storeToRefs(useAuthStore());',
          note: {
            uz: 'Store ni to‘g‘ridan-to‘g‘ri destructure qilish reaktivlikni uzadi.',
            ru: 'Прямая деструктуризация стора теряет реактивность — применяйте storeToRefs.',
            en: 'Direct destructuring drops reactivity; wrap state reads in storeToRefs.',
          },
        },
        anatomy: [
          {
            line: 'const token = ref<string | null>(null);',
            note: {
              uz: 'Strict TypeScript turi bilan saqlanadigan token.',
              ru: 'Типизированное реактивное поле токена.',
              en: 'Strongly typed reactive token ref.',
            },
          },
          {
            line: 'const isLogged = computed(() => Boolean(token.value));',
            note: {
              uz: 'Token bor-yo‘qligidan avtomatik hisoblanadigan bayroq.',
              ru: 'Автоматически обновляемый статус входа.',
              en: 'Auto-updating boolean authentication state.',
            },
          },
        ],
        solutionCode: `const user = ref({ name: 'Aziza' });
const isLogged = computed(() => Boolean(user.value));
console.log('Logged in:', isLogged.value);`,
      },
      'vue-l4': {
        title: {
          uz: 'Generic komponentlar va defineModel',
          ru: 'Generic-компоненты и defineModel',
          en: 'Generic Components & defineModel',
        },
        summary: {
          uz: 'Qat’iy tiplangan jadvallar va ikki tomonlama bog‘lanuvchi formalar uchun generic="T" hamda defineModel makrosini qo‘llaymiz.',
          ru: 'Используем generic="T" и макрос defineModel для создания строго типизированных таблиц и форм.',
          en: 'Use generic="T" and defineModel for strongly typed data tables and two-way inputs.',
        },
        keyPoints: {
          uz: [
            'defineModel qo‘lda emit update:modelValue yozishni yo‘qotadi',
            'defineSlots scoped-slot turlarini tekshiradi',
            'vue-tsc shablondagi xatolarni build dan oldin topadi',
          ],
          ru: [
            'defineModel убирает ручной emit update:modelValue',
            'defineSlots контролирует типы scoped-слотов',
            'Strict templates в vue-tsc ловят ошибки до сборки',
          ],
          en: [
            'defineModel eliminates boilerplate update:modelValue emits',
            'defineSlots enforces strict scoped slot contracts',
            'Strict template type checking catches mismatches early',
          ],
        },
        taskPrompt: {
          uz: 'Ikki tomonlama bog‘lash uchun defineModel makrosidan foydalaning.',
          ru: 'Используйте макрос defineModel для двустороннего связывания.',
          en: 'Declare a two-way bound ref using defineModel.',
        },
        hint: {
          uz: "const searchQuery = defineModel<string>({ default: '' });",
          ru: "const searchQuery = defineModel<string>({ default: '' });",
          en: "const searchQuery = defineModel<string>({ default: '' });",
        },
        pitfall: {
          wrong: "defineProps(['modelValue']); defineEmits(['update:modelValue']);",
          right: 'const searchQuery = defineModel<string>();',
          note: {
            uz: 'Vue 3.4+ da defineModel bitta qatorda ikki tomonlama bog‘lanish beradi.',
            ru: 'В Vue 3.4+ defineModel заменяет ручную связку props + emit.',
            en: 'Vue 3.4+ defineModel replaces verbose prop + emit wiring cleanly.',
          },
        },
        anatomy: [
          {
            line: 'const selected = defineModel<string>();',
            note: {
              uz: 'v-model qiymatini o‘qish va yozish imkonini beradi.',
              ru: 'Создаёт реактивный v-model с полной типизацией.',
              en: 'Declares a typed two-way v-model ref.',
            },
          },
        ],
        solutionCode: `const searchQuery = defineModel<string>({ default: '' });
console.log('Model initialized:', searchQuery.value);`,
      },
    },
    quiz: {
      q1: {
        question: {
          uz: 'reactive obyektni destructure qilganda reaktivlikni qaysi vosita saqlab qoladi?',
          ru: 'Какой инструмент сохраняет реактивность свойств при деструктуризации reactive-объекта?',
          en: 'Which helper preserves reactivity when destructuring a reactive object?',
        },
        options: {
          uz: ['Object.assign', 'toRefs()', 'shallowRef()', 'markRaw()'],
          ru: ['Object.assign', 'toRefs()', 'shallowRef()', 'markRaw()'],
          en: ['Object.assign', 'toRefs()', 'shallowRef()', 'markRaw()'],
        },
      },
      q2: {
        question: {
          uz: 'computed ning shablondagi oddiy funksiyadan asosiy ustunligi nimada?',
          ru: 'В чём главное преимущество computed по сравнению с обычным методом в шаблоне?',
          en: 'What is the main advantage of computed over a plain method in a template?',
        },
        options: {
          uz: [
            'Asinxron ishlaydi',
            'Bog‘liq qiymatlar o‘zgarguncha natijani keshlaydi',
            'TypeScript ni o‘chiradi',
            'Pinia o‘rnini bosadi',
          ],
          ru: [
            'Он работает асинхронно',
            'Он кэширует результат до изменения зависимостей',
            'Он отключает TypeScript',
            'Он заменяет Pinia',
          ],
          en: [
            'It executes asynchronously',
            'It caches output until reactive dependencies change',
            'It disables TypeScript',
            'It replaces Pinia stores',
          ],
        },
      },
      q3: {
        question: {
          uz: 'Vue 3.4+ da bola komponentda v-model yaratishni qaysi makro osonlashtiradi?',
          ru: 'Какой макрос в Vue 3.4+ упрощает создание v-model в дочернем компоненте?',
          en: 'Which Vue 3.4+ macro simplifies v-model binding in child components?',
        },
        options: {
          uz: ['defineModel', 'defineStore', 'defineExpose', 'useTemplateRef'],
          ru: ['defineModel', 'defineStore', 'defineExpose', 'useTemplateRef'],
          en: ['defineModel', 'defineStore', 'defineExpose', 'useTemplateRef'],
        },
      },
    },
  },
  'creative-gsap-webgl': {
    title: {
      uz: 'Creative Coding: GSAP & Motion',
      ru: 'Creative Coding: GSAP & Motion',
      en: 'Creative Coding: GSAP & Motion',
    },
    subtitle: {
      uz: 'Awwwards darajasidagi skroll-animatsiyalar, kinetik tipografika va interaktiv maxsus effektlar.',
      ru: 'Сценарные скролл-анимации, кинетическая типографика и вау-эффекты уровня Awwwards SOTD.',
      en: 'Choreographed scroll motion, kinetic typography, and interactive effects at 60 FPS.',
    },
    categoryLabel: { uz: 'Animatsiya & 3D', ru: 'Анимации & 3D', en: 'Motion & 3D' },
    level: { uz: 'Arxitektor', ru: 'Архитектор', en: 'Architect' },
    mentorName: { uz: 'Azizbek Karimov', ru: 'Азизбек Каримов', en: 'Azizbek Karimov' },
    mentorRole: {
      uz: 'Creative Frontend Director',
      ru: 'Creative Frontend Director',
      en: 'Creative Frontend Director',
    },
    mentorExp: { uz: '4× Awwwards SOTD', ru: '4× Awwwards SOTD', en: '4× Awwwards SOTD' },
    moduleTitles: {
      m1: {
        uz: '1-modul. Harakat xoreografiyasi va fizika',
        ru: 'Модуль 1. Хореография и физика движения',
        en: 'Module 1. Motion Choreography & Physics',
      },
      m2: {
        uz: '2-modul. Interaktiv Canvas va 3D perspektiva',
        ru: 'Модуль 2. Интерактивный Canvas и 3D-перспектива',
        en: 'Module 2. Interactive Canvas & 3D Perspective',
      },
    },
    lessons: {
      'gsap-l1': {
        title: {
          uz: 'Timeline, easing egri chiziqlari va 60 FPS',
          ru: 'Таймлайны, easing-кривые и compositor-only анимация',
          en: 'Timelines, Easing Curves & Compositor-Only 60 FPS',
        },
        summary: {
          uz: 'Nima uchun 60 FPS faqat transform va opacity da barqaror ishlashini, stagger kaskadlari bilan diqqatni boshqarishni o‘rganamiz.',
          ru: 'Почему 60 FPS держатся только на transform и opacity, как строить каскады stagger и управлять вниманием пользователя без визуального шума.',
          en: 'Why 60 FPS requires compositor-only transforms, plus building smooth stagger entrances and clean gsap.context() teardowns.',
        },
        keyPoints: {
          uz: [
            'power3.out va expo.out tabiiy inersiya tuyg‘usini beradi',
            'Faqat transform, opacity va clip-path ni animatsiya qiling',
            'gsap.context() sahifa yopilganda animatsiyalarni tozalaydi',
          ],
          ru: [
            'power3.out и expo.out создают ощущение дорогой инерции',
            'Анимируем только transform, opacity и clip-path',
            'gsap.context() гарантирует безопасный revert при уходе со страницы',
          ],
          en: [
            'power3.out and expo.out deliver tactile deceleration',
            'Animate only GPU properties: transform, opacity, and clip-path',
            'gsap.context() cleans up tweens safely on unmount',
          ],
        },
        taskPrompt: {
          uz: 'gsap.from yordamida .hero-line uchun y: 24 va ease: "power3.out" animatsiyasini yozing.',
          ru: 'Задайте плавное появление с помощью gsap.from и кривой power3.out.',
          en: 'Animate .hero-line with gsap.from and power3.out easing.',
        },
        hint: {
          uz: "gsap.from('.hero-line', { y: 24, duration: 0.7, ease: 'power3.out' });",
          ru: "gsap.from('.hero-line', { y: 24, duration: 0.7, ease: 'power3.out' });",
          en: "gsap.from('.hero-line', { y: 24, duration: 0.7, ease: 'power3.out' });",
        },
        pitfall: {
          wrong: "gsap.to('.card', { top: '40px', width: '400px' }); // causes layout thrash",
          right: "gsap.to('.card', { y: 40, scale: 1.04 }); // GPU compositor only",
          note: {
            uz: 'width/top ni animatsiya qilish brauzerni har kadrda maketni qayta hisoblashga majbur qiladi.',
            ru: 'Анимация width/top вызывает пересчёт layout на каждом кадре и фризы.',
            en: 'Animating width or top forces expensive layout recalculations every frame.',
          },
        },
        anatomy: [
          {
            line: 'stagger: 0.08,',
            note: {
              uz: 'Har bir element orasiga 80ms ketma-ket kechikish beradi.',
              ru: 'Запускает элементы каскадом с шагом 80 мс.',
              en: 'Cascades elements sequentially by 80ms each.',
            },
          },
          {
            line: "ease: 'power4.out'",
            note: {
              uz: 'Tez boshlanib, oxirida yumshoq sekinlashadi.',
              ru: 'Быстрый старт и бархатное замедление в конце.',
              en: 'Crisp launch with smooth, weighty deceleration.',
            },
          },
        ],
        solutionCode: `import gsap from 'gsap';

gsap.from('.hero-line', {
  y: 24,
  duration: 0.75,
  stagger: 0.08,
  ease: 'power3.out'
});`,
      },
      'gsap-l2': {
        title: {
          uz: 'Magnit tugmalar va maxsus kursor (lerp)',
          ru: 'Магнитные кнопки и кастомный курсор',
          en: 'Magnetic Buttons & Lerp Custom Cursor',
        },
        summary: {
          uz: 'Kursor harakati uchun chiziqli interpolyatsiya (lerp) formulasini va prefers-reduced-motion himoyasini yozamiz.',
          ru: 'Реализуем линейную интерполяцию (lerp) для шелковистого следования курсора за мышью и магнитного притяжения интерактивных элементов.',
          en: 'Implement linear interpolation (lerp) for silky pointer tracking with accessibility motion checks.',
        },
        keyPoints: {
          uz: [
            'lerp formulasi: a + (b - a) * 0.15',
            'prefers-reduced-motion faol bo‘lsa effektni o‘chiring',
            'data-cursor atributi orqali kontekstli yozuv chiqaring',
          ],
          ru: [
            'Формула lerp: current + (target - current) * 0.14',
            'Отключение эффектов при prefers-reduced-motion',
            'Контекстные метки курсора через data-атрибуты',
          ],
          en: [
            'Lerp formula: current + (target - current) * 0.15',
            'Disable custom pointer tracking under prefers-reduced-motion',
            'Drive contextual labels via data-cursor attributes',
          ],
        },
        taskPrompt: {
          uz: 'lerp(a, b, n) funksiyasini yozing va uni 0, 100, 0.2 bilan chaqiring.',
          ru: 'Реализуйте функцию линейной интерполяции lerp(a, b, n).',
          en: 'Write a lerp(a, b, n) function and log an interpolated step.',
        },
        hint: {
          uz: 'const lerp = (a, b, n) => a + (b - a) * n; console.log(lerp(0, 100, 0.2));',
          ru: 'const lerp = (a, b, n) => a + (b - a) * n; console.log(lerp(0, 100, 0.2));',
          en: 'const lerp = (a, b, n) => a + (b - a) * n; console.log(lerp(0, 100, 0.2));',
        },
        pitfall: {
          wrong: 'cursor.style.left = `${x}px`; // triggers layout',
          right: 'cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;',
          note: {
            uz: 'translate3d GPU da ishlaydi va 120Hz monitorlarda ham silliq bo‘ladi.',
            ru: 'translate3d выполняется на видеокарте и работает идеально плавно.',
            en: 'translate3d runs on the GPU compositor for silky 120Hz tracking.',
          },
        },
        anatomy: [
          {
            line: 'const lerp = (a, b, n) => a + (b - a) * n;',
            note: {
              uz: 'Joriy koordinatani nishonga qadam-baqadam yaqinlashtiradi.',
              ru: 'Плавно приближает текущую позицию к цели на долю n.',
              en: 'Smoothly eases current position toward target by factor n.',
            },
          },
        ],
        solutionCode: `function lerp(a: number, b: number, n: number) {
  return a + (b - a) * n;
}
console.log('Interpolated step:', lerp(0, 100, 0.2));`,
      },
      'gsap-l3': {
        title: {
          uz: 'Kartochkalarning 3D egilishi (Perspective Tilt)',
          ru: '3D-наклон карточек и световой блик',
          en: '3D Perspective Card Tilt',
        },
        summary: {
          uz: 'Sichqoncha koordinatalarini kartochka ichida rotateX va rotateY burchaklariga aylantiramiz.',
          ru: 'Преобразуем координаты курсора внутри карточки в углы rotateX и rotateY с сохранением производительности на ноутбуках и телефонах.',
          en: 'Convert cursor coordinates into subtle rotateX and rotateY perspective transforms.',
        },
        keyPoints: {
          uz: [
            'Markazga nisbatan [-0.5, 0.5] oralig‘ini hisoblash',
            'Maksimal burchakni ±6° dan oshirmaslik',
            'mouseleave da 0deg ga qaytarish',
          ],
          ru: [
            'Вычисляем нормализованный центр [-0.5, 0.5]',
            'Ограничиваем максимальный угол до ±8 градусов',
            'Сбрасываем трансформацию на mouseleave',
          ],
          en: [
            'Normalize coordinates around center [-0.5, 0.5]',
            'Cap max tilt at ±6° to keep text crisp and readable',
            'Reset cleanly back to 0deg on mouseleave',
          ],
        },
        taskPrompt: {
          uz: 'Vertikal koordinatadan rotateX burchagini hisoblab qaytaring.',
          ru: 'Вычислите rotateX от вертикальной координаты мыши.',
          en: 'Compute rotateX from vertical pointer position.',
        },
        hint: {
          uz: 'const rotateX = ((y / h) - 0.5) * -10; return { rotateX, rotateY };',
          ru: 'const rotateX = ((y / h) - 0.5) * -10; return { rotateX, rotateY };',
          en: 'const rotateX = ((y / h) - 0.5) * -10; return { rotateX, rotateY };',
        },
        pitfall: {
          wrong: 'rotateY = x * 0.5; // tilts wildly based on pixel width',
          right: 'rotateY = ((x / w) - 0.5) * 10; // normalized across any card size',
          note: {
            uz: 'O‘lchamga bo‘lib normallash katta va kichik kartochkalarda bir xil natija beradi.',
            ru: 'Нормализация по ширине делает наклон одинаковым на любых экранах.',
            en: 'Normalizing by element width keeps tilt uniform across screen sizes.',
          },
        },
        anatomy: [
          {
            line: 'const rotateX = ((y / rect.height) - 0.5) * -12;',
            note: {
              uz: 'Yuqoriga qaraganda kartochka tepaga og‘ishi uchun manfiy koeffitsiyent qo‘yiladi.',
              ru: 'Минус нужен, чтобы верх карточки наклонялся к зрителю.',
              en: 'Negative multiplier tilts the top edge toward the viewer naturally.',
            },
          },
        ],
        solutionCode: `function calcTilt(x: number, y: number, w: number, h: number) {
  const rotateY = ((x / w) - 0.5) * 10;
  const rotateX = ((y / h) - 0.5) * -10;
  return { rotateX, rotateY };
}
console.log(calcTilt(180, 90, 300, 200));`,
      },
    },
    quiz: {
      gq1: {
        question: {
          uz: 'Qaysi CSS xususiyatlari layout ni qayta hisoblamasdan GPU da animatsiya qilinadi?',
          ru: 'Какие CSS-свойства анимируются на GPU без пересчёта layout страницы?',
          en: 'Which CSS properties animate on the GPU without triggering layout recalculation?',
        },
        options: {
          uz: ['width va height', 'margin va top', 'transform va opacity', 'border-width va padding'],
          ru: ['width и height', 'margin и top', 'transform и opacity', 'border-width и padding'],
          en: ['width & height', 'margin & top', 'transform & opacity', 'border-width & padding'],
        },
      },
      gq2: {
        question: {
          uz: 'Vue komponenti yopilganda nima uchun ctx.revert() chaqiriladi?',
          ru: 'Зачем вызывать ctx.revert() при размонтировании Vue-компонента?',
          en: 'Why call ctx.revert() when a Vue component unmounts?',
        },
        options: {
          uz: [
            'Xotirani tozalash va GSAP animatsiyalarini bekor qilish uchun',
            'Rasmlarni siqish uchun',
            'Routerni qayta yuklash uchun',
            'Shrift yaratish uchun',
          ],
          ru: [
            'Для очистки памяти и снятия GSAP-твинов',
            'Для сжатия изображений',
            'Для перезагрузки роутера',
            'Для генерации шрифтов',
          ],
          en: [
            'To clean up tweens and prevent memory leaks',
            'To compress images',
            'To reload the router',
            'To generate web fonts',
          ],
        },
      },
      gq3: {
        question: {
          uz: 'Maxsus kursorda chiziqli interpolyatsiya (lerp) nima vazifa bajaradi?',
          ru: 'Что делает линейная интерполяция (lerp) в кастомном курсоре?',
          en: 'What does linear interpolation (lerp) achieve in a custom cursor?',
        },
        options: {
          uz: [
            'Nuqtani keskin sakratadi',
            'Yumshoq inersiyali ergashishni hosil qiladi',
            'Shrift rangini o‘zgartiradi',
            'Skrollni o‘chiradi',
          ],
          ru: [
            'Резко телепортирует точку',
            'Создаёт плавное инерционное следование',
            'Меняет цвет шрифта',
            'Отключает скролл',
          ],
          en: [
            'Teleports the dot abruptly',
            'Creates smooth, weighty trailing inertia',
            'Changes text color',
            'Disables scrolling',
          ],
        },
      },
    },
  },
  'typescript-systems': {
    title: {
      uz: 'TypeScript: Tizimli Arxitektura',
      ru: 'TypeScript: Системная архитектура',
      en: 'TypeScript: Systems Architecture',
    },
    subtitle: {
      uz: 'API uchun qat’iy tiplar, generiklar, Discriminated Unions va kengayuvchan frontend modullari.',
      ru: 'Строгая типизация API, дженерики, условные типы и масштабируемые фронтенд-модули.',
      en: 'Strict API typing, generics, discriminated unions, and scalable frontend architectures.',
    },
    categoryLabel: { uz: 'JS & TypeScript', ru: 'JS & TypeScript', en: 'JS & TypeScript' },
    level: { uz: 'Ilg‘or', ru: 'Продвинутый', en: 'Advanced' },
    mentorName: { uz: 'Dilshod Bekmurodov', ru: 'Дмитрий Соколов', en: 'Dilshod Bekmurodov' },
    mentorRole: {
      uz: 'Principal TypeScript Engineer',
      ru: 'Principal TypeScript Engineer',
      en: 'Principal TypeScript Engineer',
    },
    mentorExp: { uz: '10 yil tajriba', ru: '10 лет опыта', en: '10 yrs experience' },
    moduleTitles: {
      m1: {
        uz: '1-modul. Algebraik turlar va toraytirish',
        ru: 'Модуль 1. Алгебраические типы и сужение',
        en: 'Module 1. Algebraic Types & Narrowing',
      },
    },
    lessons: {
      'ts-l1': {
        title: {
          uz: 'isLoading bayroqlari o‘rniga Discriminated Unions',
          ru: 'Discriminated Unions вместо флагов isLoading',
          en: 'Discriminated Unions Instead of Boolean Flags',
        },
        summary: {
          uz: 'Yuklanish, xato va tayyor holatlarni shunday loyihalaymizki, imkonsiz kombinatsiyalarni TypeScript kompilyatori darhol to‘xtatadi.',
          ru: 'Проектируем состояния загрузки, ошибки и успеха так, чтобы невозможные комбинации состояний запрещались на уровне компилятора.',
          en: 'Model loading, error, and success states so impossible UI states become unrepresentable at compile time.',
        },
        keyPoints: {
          uz: [
            'status maydoni birlashmani ajratuvchi (discriminator) bo‘ladi',
            'never orqali tekshiruv unutilgan case larni ushlaydi',
            'Vue shablonlarida null xatolari yo‘qoladi',
          ],
          ru: [
            'Поле status выступает дискриминатором объединения',
            'Exhaustive check через never ловит забытые ветки в switch',
            'Отсутствие null-багов в шаблонах Vue',
          ],
          en: [
            'A literal status field discriminates union branches cleanly',
            'Exhaustive never checks catch unhandled variants',
            'Eliminates undefined/null runtime bugs in templates',
          ],
        },
        taskPrompt: {
          uz: 'ok va fail variantlariga ega Result<T> turini (type) yozing va console.log bilan test qiling.',
          ru: 'Опишите тип Result с вариантами ok и fail.',
          en: 'Define a Result<T> discriminated union with ok and fail cases.',
        },
        hint: {
          uz: "type Result<T> = { status: 'ok'; value: T } | { status: 'fail'; reason: string };",
          ru: "type Result<T> = { status: 'ok'; value: T } | { status: 'fail'; reason: string };",
          en: "type Result<T> = { status: 'ok'; value: T } | { status: 'fail'; reason: string };",
        },
        pitfall: {
          wrong: '{ loading: boolean; error?: string; data?: User } // allows loading + error simultaneously!',
          right: "{ status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; data: User }",
          note: {
            uz: 'Alohida boolean bayroqlar bir vaqtda ham xato, ham yuklanish holatiga kirib qolishi mumkin.',
            ru: 'Независимые флаги допускают конфликтные состояния; union гарантирует ровно одно.',
            en: 'Separate booleans allow invalid state combinations; unions enforce one valid state.',
          },
        },
        anatomy: [
          {
            line: "| { status: 'ready'; data: T };",
            note: {
              uz: 'status === "ready" tekshirilganda TS avtomatik ravishda data borligini biladi.',
              ru: 'После проверки status === "ready" TS гарантирует наличие data.',
              en: 'Checking status === "ready" automatically narrows data to type T.',
            },
          },
        ],
        solutionCode: `type Result<T> =
  | { status: 'ok'; data: T }
  | { status: 'fail'; error: string };

const sample = { status: 'ok', data: 'FrontDev TS' };
console.log(sample);`,
      },
      'ts-l2': {
        title: {
          uz: 'Ilg‘or Generics va Utility Types',
          ru: 'Продвинутые Generics и Utility Types',
          en: 'Advanced Generics & Utility Types',
        },
        summary: {
          uz: 'Pick, Omit, Record va extends cheklovlari yordamida xavfsiz API va forma yordamchilarini yozamiz.',
          ru: 'Осваиваем Pick, Omit, Record, infer и написание собственных маппингов для DTO и форм.',
          en: 'Master keyof, extends constraints, Pick/Omit, and as const inference for type-safe APIs.',
        },
        keyPoints: {
          uz: [
            'keyof obyekt kalitlari birlashmasini beradi',
            'K extends keyof T faqat mavjud kalitni ruxsat etadi',
            'as const massivni readonly literal turga aylantiradi',
          ],
          ru: [
            'keyof и indexed access types',
            'Ограничения extends для безопасных API-клиентов',
            'Вывод типов из констант с as const',
          ],
          en: [
            'keyof extracts union of property names safely',
            'K extends keyof T prevents invalid key lookups',
            'as const narrows constants into literal tuples',
          ],
        },
        taskPrompt: {
          uz: 'K extends keyof T cheklovi bilan getProp funksiyasini yozing va sinab ko‘ring.',
          ru: 'Напишите дженерик с ограничением K extends keyof T.',
          en: 'Constrain K extends keyof T inside getProp and log a property.',
        },
        hint: {
          uz: 'function getProp<T, K extends keyof T>(item: T, key: K) { return item[key]; }',
          ru: 'function getProp<T, K extends keyof T>(item: T, key: K) { return item[key]; }',
          en: 'function getProp<T, K extends keyof T>(item: T, key: K) { return item[key]; }',
        },
        pitfall: {
          wrong: 'function getProp(item: any, key: string) // loses all type safety',
          right: 'function getProp<T, K extends keyof T>(item: T, key: K): T[K]',
          note: {
            uz: 'any turi TypeScript himoyasini butunlay o‘chiradi.',
            ru: 'Использование any отключает автодополнение и проверку ошибок.',
            en: 'Using any disables IntelliSense and compile-time safety.',
          },
        },
        anatomy: [
          {
            line: 'function pickField<T, K extends keyof T>(obj: T, key: K): T[K]',
            note: {
              uz: 'Qaytariladigan tur aynan tanlangan maydonning turiga teng bo‘ladi.',
              ru: 'Возвращаемый тип автоматически выводится как тип выбранного свойства.',
              en: 'Return type automatically resolves to the exact property type.',
            },
          },
        ],
        solutionCode: `function getProp<T, K extends keyof T>(item: T, key: K) {
  return item[key];
}
console.log(getProp({ school: 'FrontDev', tracks: 6 }, 'school'));`,
      },
    },
    quiz: {
      tq1: {
        question: {
          uz: 'TypeScript da to‘liq tekshiruv (exhaustive check) uchun qaysi tur ishlatiladi?',
          ru: 'Какой тип используется в TypeScript для проверки исчерпывающего перебора (exhaustive check)?',
          en: 'Which TypeScript type enforces exhaustive checks across union cases?',
        },
        options: {
          uz: ['any', 'unknown', 'never', 'void'],
          ru: ['any', 'unknown', 'never', 'void'],
          en: ['any', 'unknown', 'never', 'void'],
        },
      },
      tq2: {
        question: {
          uz: 'Obyekt yoki massivga as const qo‘shilsa nima bo‘ladi?',
          ru: 'Что делает конструкция as const для массива или объекта?',
          en: 'What does an as const assertion apply to an object or array?',
        },
        options: {
          uz: [
            'Xususiyatlarni readonly va aniq literal turlarga toraytiradi',
            'Runtime da o‘chiradi',
            'JSON ga aylantiradi',
            'Strict mode ni o‘chiradi',
          ],
          ru: [
            'Делает свойства readonly и сужает типы до литералов',
            'Удаляет свойства в runtime',
            'Конвертирует объект в JSON',
            'Отключает strict mode',
          ],
          en: [
            'Makes properties readonly and narrows values to literals',
            'Deletes properties at runtime',
            'Converts object to JSON',
            'Disables strict mode',
          ],
        },
      },
      tq3: {
        question: {
          uz: 'Interfeysdan ko‘rsatilgan kalitlarni olib tashlaydigan utility type qaysi?',
          ru: 'Какой utility type исключает указанные ключи из интерфейса?',
          en: 'Which utility type removes specific keys from an interface?',
        },
        options: {
          uz: ['Pick<T, K>', 'Omit<T, K>', 'Partial<T>', 'Required<T>'],
          ru: ['Pick<T, K>', 'Omit<T, K>', 'Partial<T>', 'Required<T>'],
          en: ['Pick<T, K>', 'Omit<T, K>', 'Partial<T>', 'Required<T>'],
        },
      },
    },
  },
  'html-css-foundations': {
    title: {
      uz: 'Vyorstka asoslari: Grid, Flex & UI',
      ru: 'Основы вёрстки: Grid, Flex & UI',
      en: 'Layout Foundations: Grid, Flex & UI',
    },
    subtitle: {
      uz: 'Boshlovchilar uchun bepul start: semantik HTML5, zamonaviy CSS Grid setkalari va adaptiv dizayn.',
      ru: 'Бесплатный старт для новичков: семантический HTML5, современная сетка CSS Grid и адаптив.',
      en: 'Free starter track: semantic HTML5, modern CSS Grid systems, and accessible responsive design.',
    },
    categoryLabel: { uz: 'UI & CSS', ru: 'UI & CSS', en: 'UI & CSS' },
    level: { uz: 'Boshlang‘ich', ru: 'Базовый', en: 'Beginner' },
    mentorName: { uz: 'Malika Usmanova', ru: 'Елена Морозова', en: 'Malika Usmanova' },
    mentorRole: {
      uz: 'Design Systems Lead',
      ru: 'Design Systems Lead',
      en: 'Design Systems Lead',
    },
    mentorExp: { uz: '7 yil UI tajriba', ru: '7 лет в UI-инженерии', en: '7 yrs UI engineering' },
    moduleTitles: {
      m1: {
        uz: '1-modul. Arxitektura setkalari va tipografika',
        ru: 'Модуль 1. Архитектурные сетки и типографика',
        en: 'Module 1. Architectural Grids & Accessibility',
      },
    },
    lessons: {
      'css-l1': {
        title: {
          uz: 'CSS Grid: ikki ustundan Bento setkalargacha',
          ru: 'CSS Grid: от двух колонок до Bento-сеток',
          en: 'CSS Grid: From Two Columns to Bento Grids',
        },
        summary: {
          uz: 'grid-template-columns, minmax va gap yordamida moslashuvchan hamda toza Bento setkalarni quramiz.',
          ru: 'Строим гибкие журнальные и продуктовые сетки с помощью grid-template-columns, minmax и gap без единого костыля.',
          en: 'Build responsive magazine and bento grids using grid-template-columns, minmax, and gap.',
        },
        keyPoints: {
          uz: [
            'repeat(auto-fit, minmax(280px, 1fr)) media-so‘rovsiz adaptivlik beradi',
            'grid-column: span 2 asosiy kartochkani kengaytiradi',
            'gap kataklar orasini tartibli ajratadi',
          ],
          ru: [
            'repeat(auto-fit, minmax(280px, 1fr)) для адаптива без media-запросов',
            'grid-column: span 2 для акцентных карточек',
            'Контроль выравнивания через place-items и align-items',
          ],
          en: [
            'repeat(auto-fit, minmax(280px, 1fr)) creates intrinsic responsiveness',
            'grid-column: span 2 highlights hero cells',
            'gap maintains uniform whitespace automatically',
          ],
        },
        taskPrompt: {
          uz: '.gallery konteyneri uchun display: grid; grid-template-columns: repeat(3, 1fr); va gap: 16px; yozing.',
          ru: 'Задайте свойство display: grid и промежуток gap: 24px.',
          en: 'Add display: grid and gap: 24px inside .gallery.',
        },
        hint: {
          uz: '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }',
          ru: '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }',
          en: '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }',
        },
        pitfall: {
          wrong: '.card { float: left; width: 31%; margin: 1%; }',
          right: '.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }',
          note: {
            uz: 'Eski float va foizli marginlar o‘rniga CSS Grid toza tenglik beradi.',
            ru: 'Вместо устаревших float используйте CSS Grid — никакой ручной математики отступов.',
            en: 'CSS Grid replaces brittle float math with clean fractional tracks.',
          },
        },
        anatomy: [
          {
            line: 'grid-template-columns: repeat(3, minmax(0, 1fr));',
            note: {
              uz: 'minmax(0, 1fr) ichidagi uzun matn ustunni buzib yubormasligini ta’minlaydi.',
              ru: 'minmax(0, 1fr) не даёт длинному контенту растягивать колонку.',
              en: 'minmax(0, 1fr) prevents long text or code from overflowing columns.',
            },
          },
        ],
        solutionCode: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}`,
        isCssPreview: true,
      },
      'css-l2': {
        title: {
          uz: 'Kirish imkoniyati (A11y) va kontrast',
          ru: 'Доступность (A11y) и контраст интерфейсов',
          en: 'Accessibility (A11y) & Contrast Engineering',
        },
        summary: {
          uz: 'Tugma va havolalarni to‘g‘ri tanlash, klaviatura fokus halqasi va WCAG AA kontrast standartlarini o‘rganamiz.',
          ru: 'Учимся правильно применять кнопки, ссылки, фокус-кольца и проверять контраст WCAG AA.',
          en: 'Use semantic buttons vs links, keyboard focus-visible rings, and WCAG AA contrast ratios.',
        },
        keyPoints: {
          uz: [
            'Bosiladigan harakatlar faqat <button> yoki <a> bilan yasaladi',
            ':focus-visible sichqonchada halaqit bermay klaviaturada ko‘rinadi',
            'Mobil tugmalar kamida 44×44px bo‘lishi kerak',
          ],
          ru: [
            'Интерактивные элементы всегда делаются через button или a',
            'focus-visible сохраняет чистый вид при клике мышью',
            'Минимальный размер тач-цели 44×44px',
          ],
          en: [
            'Interactive triggers always use semantic <button> or <a>',
            ':focus-visible shows focus rings for keyboard users cleanly',
            'Keep touch targets at least 44×44px on mobile',
          ],
        },
        taskPrompt: {
          uz: '.action-button:focus-visible qoidasini outline bilan qo‘shing.',
          ru: 'Добавьте псевдокласс :focus-visible для доступного фокуса.',
          en: 'Add a :focus-visible outline rule for keyboard accessibility.',
        },
        hint: {
          uz: '.action-button:focus-visible { outline: 2px solid #FF3B1D; outline-offset: 2px; }',
          ru: '.action-button:focus-visible { outline: 2px solid #FF3B1D; outline-offset: 2px; }',
          en: '.action-button:focus-visible { outline: 2px solid #FF3B1D; outline-offset: 2px; }',
        },
        pitfall: {
          wrong: '<div onclick="openModal()">Ochish</div>',
          right: '<button type="button" onclick="openModal()">Ochish</button>',
          note: {
            uz: 'div elementiga klaviaturadan Tab bilan o‘tib bo‘lmaydi va ekran o‘quvchilar uni ko‘rmaydi.',
            ru: 'На div нельзя попасть с клавиатуры через Tab — всегда используйте button.',
            en: 'Clickable divs break keyboard navigation and screen readers—always use <button>.',
          },
        },
        anatomy: [
          {
            line: 'outline-offset: 2px;',
            note: {
              uz: 'Fokus chizig‘i va tugma chegarasi orasida toza havo qoldiradi.',
              ru: 'Добавляет аккуратный зазор между кнопкой и рамкой фокуса.',
              en: 'Adds crisp breathing room between button edge and focus ring.',
            },
          },
        ],
        solutionCode: `.action-button {
  padding: 12px 24px;
}
.action-button:focus-visible {
  outline: 2px solid #FF3B1D;
  outline-offset: 2px;
}`,
        isCssPreview: true,
      },
    },
    quiz: {
      cq1: {
        question: {
          uz: 'Modal oyna yoki filtrni ishga tushirish uchun qaysi teg ishlatilishi kerak?',
          ru: 'Какой тег нужно использовать для запуска модального окна или фильтра?',
          en: 'Which HTML tag should trigger a modal or filter action?',
        },
        options: {
          uz: ['<div>', '<span>', '<button>', '<section>'],
          ru: ['<div>', '<span>', '<button>', '<section>'],
          en: ['<div>', '<span>', '<button>', '<section>'],
        },
      },
      cq2: {
        question: {
          uz: 'Grid/Flex da qator va ustunlar orasidagi masofani qaysi CSS xususiyati belgilaydi?',
          ru: 'Какое CSS-свойство задаёт расстояние между строками и колонками в Grid/Flex?',
          en: 'Which CSS property sets the gutter between Grid/Flex rows and columns?',
        },
        options: {
          uz: ['margin-inner', 'gap', 'spacing', 'gutter'],
          ru: ['margin-inner', 'gap', 'spacing', 'gutter'],
          en: ['margin-inner', 'gap', 'spacing', 'gutter'],
        },
      },
      cq3: {
        question: {
          uz: 'Faqat klaviatura bilan yurilganda fokus halqasini ko‘rsatadigan psevdoklass qaysi?',
          ru: 'Какой псевдокласс показывает рамку фокуса при навигации с клавиатуры, не мешая клику мышью?',
          en: 'Which pseudo-class renders a focus ring for keyboard navigation without mouse click outlines?',
        },
        options: {
          uz: [':hover', ':active', ':focus-visible', ':checked'],
          ru: [':hover', ':active', ':focus-visible', ':checked'],
          en: [':hover', ':active', ':focus-visible', ':checked'],
        },
      },
    },
  },
  'nuxt-fullstack': {
    title: {
      uz: 'Nuxt 3 SSR & Fullstack Patternlar',
      ru: 'Nuxt 3 SSR & Fullstack Patterns',
      en: 'Nuxt 3 SSR & Fullstack Patterns',
    },
    subtitle: {
      uz: 'Serverda renderlash (SSR), Nitro API marshrutlari, SEO optimizatsiya va gibrid keshlash.',
      ru: 'Серверный рендеринг, Nitro API, SEO-оптимизация и гибридный кэш для быстрых проектов.',
      en: 'Server-side rendering, Nitro API routes, SEO metadata, and hybrid caching patterns.',
    },
    categoryLabel: { uz: 'Vue & Nuxt', ru: 'Vue & Nuxt', en: 'Vue & Nuxt' },
    level: { uz: 'Arxitektor', ru: 'Архитектор', en: 'Architect' },
    mentorName: { uz: 'Azizbek Karimov', ru: 'Азизбек Каримов', en: 'Azizbek Karimov' },
    mentorRole: {
      uz: 'Staff Frontend Architect',
      ru: 'Staff Frontend Architect',
      en: 'Staff Frontend Architect',
    },
    mentorExp: { uz: '9 yil tajriba', ru: '9 лет в продакшене', en: '9 yrs production' },
    moduleTitles: {
      m1: {
        uz: '1-modul. Universal rendering va ma’lumot olish',
        ru: 'Модуль 1. Универсальный рендеринг и данные',
        en: 'Module 1. Universal Rendering & Server Data',
      },
    },
    lessons: {
      'nuxt-l1': {
        title: {
          uz: 'useAsyncData va ikki marta so‘rov yuborishdan himoya',
          ru: 'useAsyncData и защита от двойного запроса',
          en: 'useFetch & Double-Request Hydration Protection',
        },
        summary: {
          uz: 'Nuxt 3 serverda yuklangan ma’lumotni klientga payload orqali qanday uzatishini ko‘rib chiqamiz.',
          ru: 'Понимаем гидратацию payload в Nuxt 3, чтобы данные с сервера мгновенно подхватывались на клиенте.',
          en: 'Learn how Nuxt 3 transfers server payload seamlessly so clients never re-fetch on hydration.',
        },
        keyPoints: {
          uz: [
            'useFetch $fetch va useAsyncData ni birlashtiradi',
            'Kesh kalitlari takroriy so‘rovlarning oldini oladi',
            'definePageMeta middleware va layout ni boshqaradi',
          ],
          ru: [
            'useFetch объединяет $fetch и useAsyncData',
            'Ключи кэширования предотвращают дублирование запросов',
            'definePageMeta управляет middleware и layout',
          ],
          en: [
            'useFetch wraps $fetch + useAsyncData automatically',
            'Unique keys prevent duplicate requests across components',
            'definePageMeta controls route middleware and layouts',
          ],
        },
        taskPrompt: {
          uz: 'useFetch yordamida /api/courses dan ma’lumot oling.',
          ru: 'Выполните серверно-безопасный запрос через useFetch.',
          en: 'Fetch /api/courses safely using useFetch.',
        },
        hint: {
          uz: "const result = await useFetch('/api/courses');",
          ru: "const result = await useFetch('/api/courses');",
          en: "const result = await useFetch('/api/courses');",
        },
        pitfall: {
          wrong: "onMounted(() => fetch('/api/courses')); // misses SSR HTML & SEO!",
          right: "const { data } = await useFetch('/api/courses');",
          note: {
            uz: 'Oddiy onMounted SSR paytida ishlamaydi va qidiruv tizimlari kontentni ko‘rmaydi.',
            ru: 'Запрос внутри onMounted не выполняется на сервере при SSR.',
            en: 'Fetching inside onMounted skips SSR rendering and hurts SEO.',
          },
        },
        anatomy: [
          {
            line: "const { data: courses } = await useFetch('/api/courses');",
            note: {
              uz: 'Serverda bir marta so‘rab, HTML bilan tayyor holda brauzerga uzatadi.',
              ru: 'Запрашивает на сервере один раз и передаёт данные в HTML payload.',
              en: 'Fetches once on the server and hydrates straight from the payload.',
            },
          },
        ],
        solutionCode: `const result = await useFetch('/api/courses');
console.log('Fetched:', result.data.value);`,
      },
      'nuxt-l2': {
        title: {
          uz: 'Nitro Server Routes va so‘rov tekshiruvi',
          ru: 'Nitro Server Routes и валидация запросов',
          en: 'Nitro Server Routes & Request Validation',
        },
        summary: {
          uz: 'server/api/ papkasida qat’iy tiplangan backend endpointlarini yozishni o‘rganamiz.',
          ru: 'Пишем серверные обработчики в server/api/ с проверкой тела запроса и типобезопасным ответом.',
          en: 'Author typed API handlers inside server/api/ using defineEventHandler and readBody.',
        },
        keyPoints: {
          uz: [
            'defineEventHandler HTTP metodlarini qayta ishlaydi',
            'readBody POST so‘rovidan JSON ni oladi',
            'Klient tomonida javob turi avtomatik aniqlanadi',
          ],
          ru: [
            'defineEventHandler обрабатывает HTTP-методы',
            'readBody извлекает JSON из POST-запроса',
            'Автоматический вывод типов ответа на клиенте',
          ],
          en: [
            'defineEventHandler wraps HTTP endpoint handlers',
            'readBody parses JSON payloads safely',
            'Client calls infer response types automatically',
          ],
        },
        taskPrompt: {
          uz: 'Nitro API endpointini defineEventHandler bilan yarating.',
          ru: 'Используйте defineEventHandler для создания серверного эндпоинта.',
          en: 'Create a Nitro API handler using defineEventHandler.',
        },
        hint: {
          uz: 'export default defineEventHandler(() => ({ ok: true }));',
          ru: 'export default defineEventHandler(() => ({ ok: true }));',
          en: 'export default defineEventHandler(() => ({ ok: true }));',
        },
        pitfall: {
          wrong: 'Using untyped raw req/res objects without readBody validation.',
          right: 'export default defineEventHandler(async (event) => { ... });',
          note: {
            uz: 'defineEventHandler Nitro ning barcha xavfsizlik va kesh vositalariga ulanadi.',
            ru: 'defineEventHandler интегрируется с типизацией и кэшем Nitro.',
            en: 'defineEventHandler unlocks full Nitro routing and type inference.',
          },
        },
        anatomy: [
          {
            line: 'const body = await readBody(event);',
            note: {
              uz: 'Kiruvchi POST JSON ma’lumotini asinxron o‘qiydi.',
              ru: 'Асинхронно читает тело входящего POST-запроса.',
              en: 'Asynchronously parses the incoming POST JSON body.',
            },
          },
        ],
        solutionCode: `export default defineEventHandler(() => {
  return { ok: true, academy: 'FrontDev' };
});`,
      },
    },
    quiz: {
      nq1: {
        question: {
          uz: 'Nuxt 3 negizida qaysi server dvigateli ishlaydi?',
          ru: 'Какой серверный движок лежит в основе Nuxt 3?',
          en: 'Which server engine powers Nuxt 3 under the hood?',
        },
        options: {
          uz: ['Express', 'Nitro', 'Fastify', 'Koa'],
          ru: ['Express', 'Nitro', 'Fastify', 'Koa'],
          en: ['Express', 'Nitro', 'Fastify', 'Koa'],
        },
      },
      nq2: {
        question: {
          uz: 'Nima uchun setup ichida oddiy fetch o‘rniga useFetch ishlatiladi?',
          ru: 'Зачем нужен useFetch вместо обычного fetch внутри setup?',
          en: 'Why prefer useFetch over raw fetch inside Nuxt setup?',
        },
        options: {
          uz: [
            'Klientda gidratatsiya paytida takroriy so‘rov yubormaslik uchun',
            'CSS ni o‘chirish uchun',
            'SCSS kompilyatsiya qilish uchun',
            'Animatsiyalar uchun',
          ],
          ru: [
            'Чтобы не делать повторный запрос при гидратации на клиенте',
            'Чтобы отключить CSS',
            'Чтобы компилировать SCSS',
            'Для запуска анимаций',
          ],
          en: [
            'To prevent duplicate fetches during client hydration',
            'To disable CSS',
            'To compile SCSS',
            'To run animations',
          ],
        },
      },
      nq3: {
        question: {
          uz: 'Nuxt 3 da server API marshrutlari qayerda joylashadi?',
          ru: 'Где в Nuxt 3 размещаются серверные API-маршруты?',
          en: 'Where are server API routes placed in Nuxt 3?',
        },
        options: {
          uz: ['src/routes/', 'server/api/', 'public/api/', 'layouts/api/'],
          ru: ['src/routes/', 'server/api/', 'public/api/', 'layouts/api/'],
          en: ['src/routes/', 'server/api/', 'public/api/', 'layouts/api/'],
        },
      },
    },
  },
  'design-systems-tailwind': {
    title: {
      uz: 'UI-muhandislik va Design Systems',
      ru: 'UI-инженерия и Design Systems',
      en: 'UI Engineering & Design Systems',
    },
    subtitle: {
      uz: 'Bepul intensiv: dizayn-tokenlar, setkalar, tipografika matematikasi va Tailwind CSS v4.',
      ru: 'Бесплатный интенсив: дизайн-токены, сетки, типографическая математика и Tailwind v4.',
      en: 'Free intensive: design tokens, nested radii, typographic scales, and Tailwind CSS v4.',
    },
    categoryLabel: { uz: 'UI & CSS', ru: 'UI & CSS', en: 'UI & CSS' },
    level: { uz: 'Boshlang‘ich', ru: 'Базовый', en: 'Beginner' },
    mentorName: { uz: 'Malika Usmanova', ru: 'Елена Морозова', en: 'Malika Usmanova' },
    mentorRole: {
      uz: 'Design Systems Lead',
      ru: 'Design Systems Lead',
      en: 'Design Systems Lead',
    },
    mentorExp: { uz: '7 yil UI tajriba', ru: '7 лет в UI-инженерии', en: '7 yrs UI engineering' },
    moduleTitles: {
      m1: {
        uz: '1-modul. Tokenlar va kontrast tizimi',
        ru: 'Модуль 1. Система токенов и контраста',
        en: 'Module 1. Token & Contrast Systems',
      },
    },
    lessons: {
      'ds-l1': {
        title: {
          uz: '60-30-10 qoidasi va ichki radiuslar matematikasi',
          ru: 'Правило 60-30-10 и вложенные радиусы',
          en: 'The 60-30-10 Color Rule & Nested Radii',
        },
        summary: {
          uz: 'Vizual tartibsizliksiz aniq iyerarxiya quramiz: bo‘shliqlar, ichki radiuslar va tabular raqamlar matematikasi.',
          ru: 'Проектируем визуальную иерархию без визуального шума: как математически вычислять отступы, радиусы и акценты.',
          en: 'Build crisp visual hierarchy without clutter: compute nested corner radii, contrast budgets, and tabular numbers.',
        },
        keyPoints: {
          uz: [
            '60% asosiy fon, 30% strukturaviy yuzalar, 10% asosiy aksent',
            'Ichki radius formulasi: r_inner = r_outer - padding',
            'Narx va metrikalar uchun font-variant-numeric: tabular-nums',
          ],
          ru: [
            '60% спокойный фон, 30% структура, 10% фокусный акцент',
            'Формула вложенных скруглений: r_inner = r_outer - padding',
            'Табличные цифры tabular-nums для цен и метрик',
          ],
          en: [
            '60% calm canvas, 30% structural surfaces, 10% focal accent',
            'Nested border radius math: r_inner = r_outer - padding',
            'Always enable tabular-nums for prices and counters',
          ],
        },
        taskPrompt: {
          uz: '.price-value klassi uchun font-variant-numeric: tabular-nums; ni qo‘shing.',
          ru: 'Включите выравнивание цифр через tabular-nums.',
          en: 'Enable tabular-nums inside .price-value.',
        },
        hint: {
          uz: '.price-value { font-variant-numeric: tabular-nums; }',
          ru: '.price-value { font-variant-numeric: tabular-nums; }',
          en: '.price-value { font-variant-numeric: tabular-nums; }',
        },
        pitfall: {
          wrong: 'Using the exact same border-radius: 16px on parent and padded child.',
          right: 'Outer radius 16px - 8px padding = inner radius 8px.',
          note: {
            uz: 'Bir xil radius berilganda burchaklarda g‘alati qalinlashgan bo‘shliq hosil bo‘ladi.',
            ru: 'Одинаковые радиусы у внешнего и внутреннего блока дают визуально кривой угол.',
            en: 'Identical outer and inner radii create awkward pinched corners.',
          },
        },
        anatomy: [
          {
            line: 'font-variant-numeric: tabular-nums;',
            note: {
              uz: 'Raqamlar o‘zgarganda ustun eni siljib ketishining oldini oladi.',
              ru: 'Фиксирует ширину цифр, чтобы счётчики и цены не прыгали.',
              en: 'Locks digit width so counters and prices align vertically.',
            },
          },
        ],
        solutionCode: `.price-value {
  font-family: monospace;
  font-variant-numeric: tabular-nums;
}`,
        isCssPreview: true,
      },
    },
    quiz: {
      dq1: {
        question: {
          uz: '60-30-10 qoidasiga ko‘ra asosiy aksent rangi vizual maydonning necha foizini egallashi kerak?',
          ru: 'Какую долю визуального пространства должен занимать основной акцентный цвет по правилу 60-30-10?',
          en: 'According to the 60-30-10 rule, how much visual budget goes to the accent color?',
        },
        options: {
          uz: ['60%', '30%', '10%', '50%'],
          ru: ['60%', '30%', '10%', '50%'],
          en: ['60%', '30%', '10%', '50%'],
        },
      },
      dq2: {
        question: {
          uz: 'Nima uchun narxlar va jadvallarda tabular-nums yoqiladi?',
          ru: 'Зачем включать font-variant-numeric: tabular-nums в тарифах и таблицах?',
          en: 'Why enable font-variant-numeric: tabular-nums in pricing tables?',
        },
        options: {
          uz: [
            'Raqamlar bir xil kenglikda turishi va sakramasligi uchun',
            'Matnni qiya qilish uchun',
            'Shrift faylini kattalashtirish uchun',
            'Soya qo‘shish uchun',
          ],
          ru: [
            'Чтобы цифры имели одинаковую ширину и не прыгали',
            'Чтобы текст стал курсивом',
            'Чтобы увеличить размер файла шрифта',
            'Для тени текста',
          ],
          en: [
            'So digits keep uniform width and align cleanly',
            'To italicize headings',
            'To increase font file size',
            'To add drop shadow',
          ],
        },
      },
      dq3: {
        question: {
          uz: 'Konteyner ichidagi kartochkaning ichki radius formulasi qanday?',
          ru: 'Какова формула внутреннего радиуса скругления карточки внутри контейнера?',
          en: 'What is the nested inner border-radius formula?',
        },
        options: {
          uz: [
            'r_inner = r_outer * 2',
            'r_inner = r_outer - padding',
            'r_inner = padding * 3',
            'r_inner = 999px',
          ],
          ru: [
            'r_inner = r_outer * 2',
            'r_inner = r_outer - padding',
            'r_inner = padding * 3',
            'r_inner = 999px',
          ],
          en: [
            'r_inner = r_outer * 2',
            'r_inner = r_outer - padding',
            'r_inner = padding * 3',
            'r_inner = 999px',
          ],
        },
      },
    },
  },
};

export function getCourseTitle(course: FrontendCourse, locale: Locale): string {
  return COURSE_LOCALIZATIONS[course.id]?.title[locale] ?? course.title;
}

export function getCourseSubtitle(course: FrontendCourse, locale: Locale): string {
  return COURSE_LOCALIZATIONS[course.id]?.subtitle[locale] ?? course.subtitle;
}

export function getCourseCategoryLabel(course: FrontendCourse, locale: Locale): string {
  return COURSE_LOCALIZATIONS[course.id]?.categoryLabel[locale] ?? course.categoryLabel;
}

export function getCourseLevel(course: FrontendCourse, locale: Locale): string {
  return COURSE_LOCALIZATIONS[course.id]?.level[locale] ?? course.level;
}

export function getCourseMentor(course: FrontendCourse, locale: Locale) {
  const loc = COURSE_LOCALIZATIONS[course.id];
  if (!loc) return course.mentor;
  return {
    ...course.mentor,
    name: loc.mentorName[locale],
    role: loc.mentorRole[locale],
    experience: loc.mentorExp[locale],
  };
}

export function getModuleTitle(courseId: string, modId: string, fallback: string, locale: Locale): string {
  return COURSE_LOCALIZATIONS[courseId]?.moduleTitles[modId]?.[locale] ?? fallback;
}

export function getLessonLocalized(courseId: string, lesson: CourseLesson, locale: Locale) {
  const ped = COURSE_LOCALIZATIONS[courseId]?.lessons[lesson.id];
  if (!ped) {
    return {
      title: lesson.title,
      summary: lesson.summary,
      keyPoints: lesson.keyPoints,
      taskPrompt: lesson.taskPrompt,
      hint: lesson.expectedKeyword,
      pitfall: null,
      anatomy: [],
      solutionCode: lesson.codeSnippet,
      isCssPreview: false,
    };
  }
  return {
    title: ped.title[locale],
    summary: ped.summary[locale],
    keyPoints: ped.keyPoints[locale],
    taskPrompt: ped.taskPrompt[locale],
    hint: ped.hint[locale],
    pitfall: {
      wrong: ped.pitfall.wrong,
      right: ped.pitfall.right,
      note: ped.pitfall.note[locale],
    },
    anatomy: ped.anatomy.map((item) => ({
      line: item.line,
      note: item.note[locale],
    })),
    solutionCode: ped.solutionCode,
    isCssPreview: Boolean(ped.isCssPreview),
  };
}

export function getQuizLocalized(courseId: string, q: QuizQuestion, locale: Locale) {
  const loc = COURSE_LOCALIZATIONS[courseId]?.quiz[q.id];
  if (!loc) return q;
  return {
    ...q,
    question: loc.question[locale],
    options: loc.options[locale],
  };
}
