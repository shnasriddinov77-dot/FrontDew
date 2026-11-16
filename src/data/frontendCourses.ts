export type CourseCategory = 'all' | 'vue' | 'motion' | 'architecture' | 'ui';
export type CourseTierFilter = 'all' | 'free' | 'pro';
export type SubscriptionPlan = 'free' | 'pro-monthly' | 'pro-annual';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
  summary: string;
  keyPoints: string[];
  codeSnippet: string;
  taskPrompt: string;
  expectedKeyword: string;
  starterCode: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface FrontendCourse {
  id: string;
  code: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  category: Exclude<CourseCategory, 'all'>;
  categoryLabel: string;
  level: 'Базовый' | 'Продвинутый' | 'Архитектор';
  durationHours: number;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  priceRub: number;
  isFree: boolean;
  coverImage: string;
  mentor: {
    name: string;
    role: string;
    experience: string;
    avatarImage: string;
    initials: string;
  };
  skills: string[];
  modules: CourseModule[];
  quiz: QuizQuestion[];
}

export interface SubscriptionTier {
  id: Exclude<SubscriptionPlan, 'free'>;
  name: string;
  tagline: string;
  monthlyPriceRub: number;
  annualPriceRub: number;
  annualMonthlyEquivalentRub: number;
  features: string[];
  highlighted: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'pro-monthly',
    name: 'PRO Месяц',
    tagline: 'Полный доступ ко всем платным курсам и тестам',
    monthlyPriceRub: 2990,
    annualPriceRub: 2990,
    annualMonthlyEquivalentRub: 2990,
    highlighted: false,
    features: [
      'Доступ ко всем 6 курсам каталога',
      'Интерактивная практика и проверка кода',
      'Итоговые тесты и именные сертификаты',
      'Разбор домашних работ в комьюнити',
    ],
  },
  {
    id: 'pro-annual',
    name: 'PRO Год + Ментор',
    tagline: 'Максимум практики, код-ревью и карьерный трек',
    monthlyPriceRub: 24900,
    annualPriceRub: 24900,
    annualMonthlyEquivalentRub: 2075,
    highlighted: true,
    features: [
      'Все преимущества PRO на 12 месяцев',
      'Персональные код-ревью от сеньор-архитекторов',
      'Подготовка портфолио в стиле Awwwards',
      'Приоритетная стажировка и разбор собеседований',
    ],
  },
];

export const FRONTEND_COURSES: FrontendCourse[] = [
  {
    id: 'vue-3-architecture',
    code: 'FE-01',
    indexLabel: '01.',
    title: 'Vue 3, Composition API & Pinia',
    subtitle: 'Промышленная архитектура реактивных SPA и компонентных библиотек на TypeScript.',
    category: 'vue',
    categoryLabel: 'Vue & Nuxt',
    level: 'Продвинутый',
    durationHours: 24,
    lessonsCount: 6,
    studentsCount: 1420,
    rating: 4.9,
    priceRub: 8900,
    isFree: false,
    coverImage: '/src/assets/images/course_vue_architecture_1794589662527.jpg',
    mentor: {
      name: 'Артём Волков',
      role: 'Staff Frontend Architect',
      experience: '9 лет в продакшене',
      avatarImage: '/src/assets/images/mentor_portrait_lead_1794589664268.jpg',
      initials: 'АВ',
    },
    skills: ['Vue 3.5', 'Composition API', 'Pinia', 'TypeScript', 'Composables'],
    modules: [
      {
        id: 'm1',
        title: 'Модуль 1. Реактивное ядро и Composition API',
        lessons: [
          {
            id: 'vue-l1',
            title: 'ref, reactive и подкапотные Proxy-ловушки',
            duration: '22 мин',
            isFreePreview: true,
            summary: 'Разбираем, как Vue 3 отслеживает зависимости на уровне ES6 Proxy, когда выбирать ref вместо reactive и как избежать потери реактивности при деструктуризации.',
            keyPoints: [
              'Proxy перехватывает get/set и строит граф зависимостей',
              'toRefs сохраняет реактивные связи при возврате из composable',
              'computed кэширует вычисления до изменения источников',
            ],
            codeSnippet: `import { ref, computed } from 'vue';

export function useCartTotal(price: number) {
  const qty = ref(1);
  const total = computed(() => qty.value * price);
  return { qty, total };
}`,
            taskPrompt: 'Создайте computed-свойство doubleCount, которое возвращает удвоенное значение count.value.',
            expectedKeyword: 'computed',
            starterCode: `import { ref, computed } from 'vue';

const count = ref(4);
// Создайте doubleCount с помощью computed
const doubleCount = `,
          },
          {
            id: 'vue-l2',
            title: 'Паттерны проектируемых Composables',
            duration: '28 мин',
            isFreePreview: false,
            summary: 'Учимся выносить бизнес-логику, подписки на события окна и работу с API в чистые переиспользуемые composable-модули.',
            keyPoints: [
              'Принцип единственной ответственности для use-функций',
              'Автоматическая очистка слушателей через onUnmounted',
              'Типизация аргументов через MaybeRef',
            ],
            codeSnippet: `import { onMounted, onUnmounted, ref } from 'vue';

export function useScrollProgress() {
  const progress = ref(0);
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = max > 0 ? window.scrollY / max : 0;
  };
  onMounted(() => window.addEventListener('scroll', update));
  onUnmounted(() => window.removeEventListener('scroll', update));
  return { progress };
}`,
            taskPrompt: 'Добавьте очистку слушателя внутри хука onUnmounted.',
            expectedKeyword: 'onUnmounted',
            starterCode: `import { onMounted, onUnmounted } from 'vue';

export function useResize(handler: () => void) {
  onMounted(() => window.addEventListener('resize', handler));
  // Очистите событие при размонтировании
}`,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Модуль 2. Управление состоянием в Pinia',
        lessons: [
          {
            id: 'vue-l3',
            title: 'Setup Stores и персистентность в браузере',
            duration: '31 мин',
            isFreePreview: false,
            summary: 'Строим предсказуемый стор авторизации и подписок без лишнего бойлерплейта мутаций.',
            keyPoints: [
              'Setup-синтаксис в defineStore позволяет использовать composables',
              'watch с deep: true синхронизирует состояние с localStorage',
              'storeToRefs для безопасного чтения полей в компонентах',
            ],
            codeSnippet: `export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const isLogged = computed(() => Boolean(token.value));
  return { token, isLogged };
});`,
            taskPrompt: 'Объявите геттер isLogged с помощью computed.',
            expectedKeyword: 'computed',
            starterCode: `const user = ref({ name: 'Анна' });
// Проверьте авторизацию через computed
const isLogged = `,
          },
          {
            id: 'vue-l4',
            title: 'Generic-компоненты и defineModel',
            duration: '26 мин',
            isFreePreview: false,
            summary: 'Используем generic="T" и макрос defineModel для создания строго типизированных таблиц и форм.',
            keyPoints: [
              'defineModel убирает ручной emit update:modelValue',
              'defineSlots контролирует типы scoped-слотов',
              'Strict templates в vue-tsc ловят ошибки до сборки',
            ],
            codeSnippet: `<script setup lang="ts" generic="T extends { id: string }">
defineProps<{ items: T[] }>();
const selected = defineModel<string>();
</script>`,
            taskPrompt: 'Используйте макрос defineModel для двустороннего связывания.',
            expectedKeyword: 'defineModel',
            starterCode: `// Объявите двустороннюю модель searchQuery
const searchQuery = `,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Какой инструмент сохраняет реактивность свойств при деструктуризации reactive-объекта?',
        options: ['Object.assign', 'toRefs()', 'shallowRef()', 'markRaw()'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'В чём главное преимущество computed по сравнению с обычным методом в шаблоне?',
        options: ['Он работает асинхронно', 'Он кэширует результат до изменения зависимостей', 'Он отключает TypeScript', 'Он заменяет Pinia'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Какой макрос в Vue 3.4+ упрощает создание v-model в дочернем компоненте?',
        options: ['defineModel', 'defineStore', 'defineExpose', 'useTemplateRef'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'creative-gsap-webgl',
    code: 'FE-02',
    indexLabel: '02.',
    title: 'Creative Coding: GSAP & Motion',
    subtitle: 'Сценарные скролл-анимации, кинетическая типографика и вау-эффекты уровня Awwwards SOTD.',
    category: 'motion',
    categoryLabel: 'Анимации & 3D',
    level: 'Архитектор',
    durationHours: 20,
    lessonsCount: 4,
    studentsCount: 980,
    rating: 5.0,
    priceRub: 11900,
    isFree: false,
    coverImage: '/src/assets/images/course_creative_webgl_1794589664244.jpg',
    mentor: {
      name: 'Артём Волков',
      role: 'Creative Frontend Director',
      experience: '4× Awwwards SOTD',
      avatarImage: '/src/assets/images/mentor_portrait_lead_1794589664268.jpg',
      initials: 'АВ',
    },
    skills: ['GSAP 3', 'ScrollTrigger', 'Kinetic Type', 'Canvas 2D', 'Micro-physics'],
    modules: [
      {
        id: 'm1',
        title: 'Модуль 1. Хореография и физика движения',
        lessons: [
          {
            id: 'gsap-l1',
            title: 'Таймлайны, easing-кривые и compositor-only анимация',
            duration: '25 мин',
            isFreePreview: true,
            summary: 'Почему 60 FPS держатся только на transform и opacity, как строить каскады stagger и управлять вниманием пользователя без визуального шума.',
            keyPoints: [
              'power3.out и expo.out создают ощущение дорогой инерции',
              'Анимируем только transform, opacity и clip-path',
              'gsap.context() гарантирует безопасный revert при уходе со страницы',
            ],
            codeSnippet: `gsap.from('.hero-line', {
  yPercent: 110,
  opacity: 0,
  duration: 0.9,
  stagger: 0.08,
  ease: 'power4.out'
});`,
            taskPrompt: 'Задайте плавное появление с помощью gsap.from и кривой power3.out.',
            expectedKeyword: 'gsap.from',
            starterCode: `import gsap from 'gsap';

// Запустите анимацию появления заголовка
`,
          },
          {
            id: 'gsap-l2',
            title: 'Магнитные кнопки и кастомный курсор',
            duration: '34 мин',
            isFreePreview: false,
            summary: 'Реализуем линейную интерполяцию (lerp) для шелковистого следования курсора за мышью и магнитного притяжения интерактивных элементов.',
            keyPoints: [
              'Формула lerp: current + (target - current) * 0.14',
              'Отключение эффектов при prefers-reduced-motion',
              'Контекстные метки курсора через data-атрибуты',
            ],
            codeSnippet: `const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
cursorX = lerp(cursorX, mouseX, 0.15);
cursorY = lerp(cursorY, mouseY, 0.15);`,
            taskPrompt: 'Реализуйте функцию линейной интерполяции lerp(a, b, n).',
            expectedKeyword: 'lerp',
            starterCode: `// Напишите функцию lerp для плавного курсора
function `,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Модуль 2. Интерактивный Canvas и 3D-перспектива',
        lessons: [
          {
            id: 'gsap-l3',
            title: '3D-наклон карточек и световой блик',
            duration: '29 мин',
            isFreePreview: false,
            summary: 'Преобразуем координаты курсора внутри карточки в углы rotateX и rotateY с сохранением производительности на ноутбуках и телефонах.',
            keyPoints: [
              'Вычисляем нормализованный центр [-0.5, 0.5]',
              'Ограничиваем максимальный угол до ±8 градусов',
              'Сбрасываем трансформацию на mouseleave',
            ],
            codeSnippet: `const rotateY = ((x / rect.width) - 0.5) * 12;
const rotateX = ((y / rect.height) - 0.5) * -12;`,
            taskPrompt: 'Вычислите rotateX от вертикальной координаты мыши.',
            expectedKeyword: 'rotateX',
            starterCode: `function calcTilt(x: number, y: number, w: number, h: number) {
  const rotateY = ((x / w) - 0.5) * 10;
  // Добавьте rotateX
}`,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'gq1',
        question: 'Какие CSS-свойства анимируются на GPU без пересчёта layout страницы?',
        options: ['width и height', 'margin и top', 'transform и opacity', 'border-width и padding'],
        correctIndex: 2,
      },
      {
        id: 'gq2',
        question: 'Зачем вызывать ctx.revert() при размонтировании Vue-компонента?',
        options: ['Для очистки памяти и снятия GSAP-твинов', 'Для сжатия изображений', 'Для перезагрузки роутера', 'Для генерации шрифтов'],
        correctIndex: 0,
      },
      {
        id: 'gq3',
        question: 'Что делает линейная интерполяция (lerp) в кастомном курсоре?',
        options: ['Резко телепортирует точку', 'Создаёт плавное инерционное следование', 'Меняет цвет шрифта', 'Отключает скролл'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'typescript-systems',
    code: 'FE-03',
    indexLabel: '03.',
    title: 'TypeScript: Системная архитектура',
    subtitle: 'Строгая типизация API, дженерики, условные типы и масштабируемые фронтенд-модули.',
    category: 'architecture',
    categoryLabel: 'JS & TypeScript',
    level: 'Продвинутый',
    durationHours: 18,
    lessonsCount: 4,
    studentsCount: 1185,
    rating: 4.9,
    priceRub: 7900,
    isFree: false,
    coverImage: '/src/assets/images/course_typescript_systems_1794589663480.jpg',
    mentor: {
      name: 'Дмитрий Соколов',
      role: 'Principal TypeScript Engineer',
      experience: '10 лет опыта',
      avatarImage: '/src/assets/images/mentor_portrait_lead_1794589664268.jpg',
      initials: 'ДС',
    },
    skills: ['TypeScript 5.8', 'Generics', 'Discriminated Unions', 'Type Guards', 'Clean Code'],
    modules: [
      {
        id: 'm1',
        title: 'Модуль 1. Алгебраические типы и сужение',
        lessons: [
          {
            id: 'ts-l1',
            title: 'Discriminated Unions вместо флагов isLoading',
            duration: '24 мин',
            isFreePreview: true,
            summary: 'Проектируем состояния загрузки, ошибки и успеха так, чтобы невозможные комбинации состояний запрещались на уровне компилятора.',
            keyPoints: [
              'Поле status выступает дискриминатором объединения',
              'Exhaustive check через never ловит забытые ветки в switch',
              'Отсутствие null-багов в шаблонах Vue',
            ],
            codeSnippet: `type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T };`,
            taskPrompt: 'Опишите тип Result с вариантами ok и fail.',
            expectedKeyword: 'type',
            starterCode: `// Определите discriminated union type Result<T>
`,
          },
          {
            id: 'ts-l2',
            title: 'Продвинутые Generics и Utility Types',
            duration: '30 мин',
            isFreePreview: false,
            summary: 'Осваиваем Pick, Omit, Record, infer и написание собственных маппингов для DTO и форм.',
            keyPoints: [
              'keyof и indexed access types',
              'Ограничения extends для безопасных API-клиентов',
              'Вывод типов из констант с as const',
            ],
            codeSnippet: `function pickField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
            taskPrompt: 'Напишите дженерик с ограничением K extends keyof T.',
            expectedKeyword: 'extends',
            starterCode: `function getProp<T, K>(item: T, key: K) {
  return item[key];
}`,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'tq1',
        question: 'Какой тип используется в TypeScript для проверки исчерпывающего перебора (exhaustive check)?',
        options: ['any', 'unknown', 'never', 'void'],
        correctIndex: 2,
      },
      {
        id: 'tq2',
        question: 'Что делает конструкция as const для массива или объекта?',
        options: ['Делает свойства readonly и сужает типы до литералов', 'Удаляет свойства в runtime', 'Конвертирует объект в JSON', 'Отключает strict mode'],
        correctIndex: 0,
      },
      {
        id: 'tq3',
        question: 'Какой utility type исключает указанные ключи из интерфейса?',
        options: ['Pick<T, K>', 'Omit<T, K>', 'Partial<T>', 'Required<T>'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'html-css-foundations',
    code: 'FE-04',
    indexLabel: '04.',
    title: 'Основы вёрстки: Grid, Flex & UI',
    subtitle: 'Бесплатный старт для новичков: семантический HTML5, современная сетка CSS Grid и адаптив.',
    category: 'ui',
    categoryLabel: 'UI & CSS',
    level: 'Базовый',
    durationHours: 12,
    lessonsCount: 3,
    studentsCount: 4860,
    rating: 4.9,
    priceRub: 0,
    isFree: true,
    coverImage: '/src/assets/images/hero_frontend_atelier_1794589662714.jpg',
    mentor: {
      name: 'Елена Морозова',
      role: 'Design Systems Lead',
      experience: '7 лет в UI-инженерии',
      avatarImage: '/src/assets/images/mentor_portrait_lead_1794589664268.jpg',
      initials: 'ЕМ',
    },
    skills: ['HTML5', 'CSS Grid', 'Flexbox', 'Responsive UI', 'Accessibility'],
    modules: [
      {
        id: 'm1',
        title: 'Модуль 1. Архитектурные сетки и типографика',
        lessons: [
          {
            id: 'css-l1',
            title: 'CSS Grid: от двух колонок до Bento-сеток',
            duration: '19 мин',
            isFreePreview: true,
            summary: 'Строим гибкие журнальные и продуктовые сетки с помощью grid-template-columns, minmax и gap без единого костыля.',
            keyPoints: [
              'repeat(auto-fit, minmax(280px, 1fr)) для адаптива без media-запросов',
              'grid-column: span 2 для акцентных карточек',
              'Контроль выравнивания через place-items и align-items',
            ],
            codeSnippet: `.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}`,
            taskPrompt: 'Задайте свойство display: grid и промежуток gap: 24px.',
            expectedKeyword: 'grid',
            starterCode: `.gallery {
  /* Превратите контейнер в сетку */
}`,
          },
          {
            id: 'css-l2',
            title: 'Доступность (A11y) и контраст интерфейсов',
            duration: '21 мин',
            isFreePreview: true,
            summary: 'Учимся правильно применять кнопки, ссылки, фокус-кольца и проверять контраст WCAG AA.',
            keyPoints: [
              'Интерактивные элементы всегда делаются через button или a',
              'focus-visible сохраняет чистый вид при клике мышью',
              'Минимальный размер тач-цели 44×44px',
            ],
            codeSnippet: `.btn:focus-visible {
  outline: 2px solid #FF3B1D;
  outline-offset: 2px;
}`,
            taskPrompt: 'Добавьте псевдокласс :focus-visible для доступного фокуса.',
            expectedKeyword: 'focus-visible',
            starterCode: `.action-button {
  padding: 12px 24px;
}`,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'cq1',
        question: 'Какой тег нужно использовать для запуска модального окна или фильтра?',
        options: ['<div>', '<span>', '<button>', '<section>'],
        correctIndex: 2,
      },
      {
        id: 'cq2',
        question: 'Какое CSS-свойство задаёт расстояние между строками и колонками в Grid/Flex?',
        options: ['margin-inner', 'gap', 'spacing', 'gutter'],
        correctIndex: 1,
      },
      {
        id: 'cq3',
        question: 'Какой псевдокласс показывает рамку фокуса при навигации с клавиатуры, не мешая клику мышью?',
        options: [':hover', ':active', ':focus-visible', ':checked'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'nuxt-fullstack',
    code: 'FE-05',
    indexLabel: '05.',
    title: 'Nuxt 3 SSR & Fullstack Patterns',
    subtitle: 'Серверный рендеринг, Nitro API, SEO-оптимизация и гибридный кэш для быстрых проектов.',
    category: 'vue',
    categoryLabel: 'Vue & Nuxt',
    level: 'Архитектор',
    durationHours: 22,
    lessonsCount: 3,
    studentsCount: 740,
    rating: 4.9,
    priceRub: 10900,
    isFree: false,
    coverImage: '/src/assets/images/course_vue_architecture_1794589662527.jpg',
    mentor: {
      name: 'Артём Волков',
      role: 'Staff Frontend Architect',
      experience: '9 лет в продакшене',
      avatarImage: '/src/assets/images/mentor_portrait_lead_1794589664268.jpg',
      initials: 'АВ',
    },
    skills: ['Nuxt 3', 'SSR', 'Nitro Engine', 'SEO', 'useFetch'],
    modules: [
      {
        id: 'm1',
        title: 'Модуль 1. Универсальный рендеринг и данные',
        lessons: [
          {
            id: 'nuxt-l1',
            title: 'useAsyncData и защита от двойного запроса',
            duration: '27 мин',
            isFreePreview: true,
            summary: 'Понимаем гидратацию payload в Nuxt 3, чтобы данные с сервера мгновенно подхватывались на клиенте.',
            keyPoints: [
              'useFetch объединяет $fetch и useAsyncData',
              'Ключи кэширования предотвращают дублирование запросов',
              'definePageMeta управляет middleware и layout',
            ],
            codeSnippet: `const { data: courses } = await useFetch('/api/courses', {
  key: 'catalog-list'
});`,
            taskPrompt: 'Выполните серверно-безопасный запрос через useFetch.',
            expectedKeyword: 'useFetch',
            starterCode: `// Загрузите данные курса через Nuxt useFetch
const result = `,
          },
          {
            id: 'nuxt-l2',
            title: 'Nitro Server Routes и валидация запросов',
            duration: '33 мин',
            isFreePreview: false,
            summary: 'Пишем серверные обработчики в server/api/ с проверкой тела запроса и типобезопасным ответом.',
            keyPoints: [
              'defineEventHandler обрабатывает HTTP-методы',
              'readBody извлекает JSON из POST-запроса',
              'Автоматический вывод типов ответа на клиенте',
            ],
            codeSnippet: `export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return { ok: true, plan: body.plan };
});`,
            taskPrompt: 'Используйте defineEventHandler для создания серверного эндпоинта.',
            expectedKeyword: 'defineEventHandler',
            starterCode: `// Создайте обработчик Nitro API
export default `,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'nq1',
        question: 'Какой серверный движок лежит в основе Nuxt 3?',
        options: ['Express', 'Nitro', 'Fastify', 'Koa'],
        correctIndex: 1,
      },
      {
        id: 'nq2',
        question: 'Зачем нужен useFetch вместо обычного fetch внутри setup?',
        options: ['Чтобы не делать повторный запрос при гидратации на клиенте', 'Чтобы отключить CSS', 'Чтобы компилировать SCSS', 'Для запуска анимаций'],
        correctIndex: 0,
      },
      {
        id: 'nq3',
        question: 'Где в Nuxt 3 размещаются серверные API-маршруты?',
        options: ['src/routes/', 'server/api/', 'public/api/', 'layouts/api/'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'design-systems-tailwind',
    code: 'FE-06',
    indexLabel: '06.',
    title: 'UI-инженерия и Design Systems',
    subtitle: 'Бесплатный интенсив: дизайн-токены, сетки, типографическая математика и Tailwind v4.',
    category: 'ui',
    categoryLabel: 'UI & CSS',
    level: 'Базовый',
    durationHours: 10,
    lessonsCount: 2,
    studentsCount: 3120,
    rating: 4.8,
    priceRub: 0,
    isFree: true,
    coverImage: '/src/assets/images/course_typescript_systems_1794589663480.jpg',
    mentor: {
      name: 'Елена Морозова',
      role: 'Design Systems Lead',
      experience: '7 лет в UI-инженерии',
      avatarImage: '/src/assets/images/mentor_portrait_lead_1794589664268.jpg',
      initials: 'ЕМ',
    },
    skills: ['Design Tokens', 'Tailwind CSS v4', 'Typography Scale', 'Figma to Code'],
    modules: [
      {
        id: 'm1',
        title: 'Модуль 1. Система токенов и контраста',
        lessons: [
          {
            id: 'ds-l1',
            title: 'Правило 60-30-10 и вложенные радиусы',
            duration: '20 мин',
            isFreePreview: true,
            summary: 'Проектируем визуальную иерархию без визуального мусора: как математически вычислять отступы, радиусы и акценты.',
            keyPoints: [
              '60% спокойный фон, 30% структура, 10% фокусный акцент',
              'Формула вложенных скруглений: r_inner = r_outer - padding',
              'Табличные цифры tabular-nums для цен и метрик',
            ],
            codeSnippet: `.metric {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}`,
            taskPrompt: 'Включите выравнивание цифр через tabular-nums.',
            expectedKeyword: 'tabular-nums',
            starterCode: `.price-value {
  font-family: monospace;
}`,
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'dq1',
        question: 'Какую долю визуального пространства должен занимать основной акцентный цвет по правилу 60-30-10?',
        options: ['60%', '30%', '10%', '50%'],
        correctIndex: 2,
      },
      {
        id: 'dq2',
        question: 'Зачем включать font-variant-numeric: tabular-nums в тарифах и таблицах?',
        options: ['Чтобы цифры имели одинаковую ширину и не прыгали', 'Чтобы текст стал курсивом', 'Чтобы увеличить размер файла шрифта', 'Для тени текста'],
        correctIndex: 0,
      },
      {
        id: 'dq3',
        question: 'Какова формула внутреннего радиуса скругления карточки внутри контейнера?',
        options: ['r_inner = r_outer * 2', 'r_inner = r_outer - padding', 'r_inner = padding * 3', 'r_inner = 999px'],
        correctIndex: 1,
      },
    ],
  },
];
