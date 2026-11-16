import type { Locale, LocalizedText } from '../i18n/translations';
import type { CourseLesson, FrontendCourse } from '../data/frontendCourses';

export type TechLogoId =
  | 'html'
  | 'css'
  | 'js'
  | 'ts'
  | 'vue'
  | 'nuxt'
  | 'gsap'
  | 'tailwind';

export interface LessonMicroCheck {
  question: LocalizedText;
  options: Record<Locale, string[]>;
  correctIndex: number;
  explanation: LocalizedText;
}

export interface LessonPedagogyBlueprint {
  mentalModelTitle: LocalizedText;
  mentalModelBody: LocalizedText;
  whyItMatters: LocalizedText;
  recommendedMinutes: number;
  microCheck: LessonMicroCheck;
}

export interface AdaptivePedagogyAnalysis {
  stageBadge: LocalizedText;
  strategyTip: LocalizedText;
  blueprint: LessonPedagogyBlueprint;
}

const COURSE_LOGO_MAP: Record<string, TechLogoId[]> = {
  'vue-3-architecture': ['vue', 'ts', 'js'],
  'creative-gsap-webgl': ['gsap', 'js', 'css'],
  'typescript-systems': ['ts', 'js'],
  'html-css-foundations': ['html', 'css'],
  'nuxt-fullstack': ['nuxt', 'vue', 'ts'],
  'design-systems-tailwind': ['tailwind', 'css', 'html'],
};

export function getCourseTechLogos(courseId: string): TechLogoId[] {
  return COURSE_LOGO_MAP[courseId] ?? ['html', 'css', 'js'];
}

const LESSON_PEDAGOGY: Record<string, LessonPedagogyBlueprint> = {
  'vue-l1': {
    mentalModelTitle: {
      uz: 'Hayotiy o‘xshatish: Aqlli ombor sensori (Proxy)',
      ru: 'Аналогия из жизни: Умный датчик склада (Proxy)',
      en: 'Mental model: A smart warehouse sensor (Proxy)',
    },
    mentalModelBody: {
      uz: 'Oddiy o‘zgaruvchini oddiy qutiga qiyoslang — ichini o‘zgartirsangiz hech kim bilmaydi. `ref` va `reactive` esa ustiga sensor o‘rnatilgan quti: qiymat yangilanishi bilan ekrandagi faqat kerakli joy avtomatik yangilanadi.',
      ru: 'Обычная переменная — простая коробка: изменили число, и экран молчит. `ref` и `reactive` — коробка с датчиком ES6 Proxy: при записи она сама уведомляет нужные части шаблона.',
      en: 'A plain variable is an unmonitored box. `ref` and `reactive` wrap values with an ES6 Proxy sensor so only the exact UI nodes reading that value update automatically.',
    },
    whyItMatters: {
      uz: 'Talabalarning 70%i `reactive` obyektini destructure qilib reaktivlikni yo‘qotadi — avval shu mexanizmni tushunish keyingi barcha Vue modullarini osonlashtiradi.',
      ru: '70% новичков теряют реактивность при деструктуризации `reactive`. Поняв работу Proxy в начале, вы избежите самых частых багов в проектах.',
      en: '70% of beginners accidentally break reactivity via destructuring; locking this mental model early prevents silent UI bugs.',
    },
    recommendedMinutes: 18,
    microCheck: {
      question: {
        uz: 'Agar `computed` ichidagi `count.value` o‘zgarmasa va funksiyani 5 marta o‘qisangiz nima sodir bo‘ladi?',
        ru: 'Что произойдёт, если прочитать `computed` 5 раз подряд без изменения `count.value`?',
        en: 'What happens if you read a `computed` property 5 times while `count.value` stays unchanged?',
      },
      options: {
        uz: ['Har safar qaytadan hisoblanadi', 'Keshdagi tayyor natijani darhol qaytaradi', 'Qiymat nolga tushadi'],
        ru: ['Пересчитается 5 раз заново', 'Вернёт кэшированное значение мгновенно', 'Сбросит значение в 0'],
        en: ['Recomputes every single time', 'Returns the cached result instantly', 'Resets count to 0'],
      },
      correctIndex: 1,
      explanation: {
        uz: 'To‘g‘ri! `computed` faqat o‘zi bog‘langan reaktiv manba o‘zgargandagina qayta hisoblaydi, aks holda keshdan oladi.',
        ru: 'Верно! `computed` кэширует результат и пересчитывает его только при изменении зависимостей.',
        en: 'Correct! `computed` caches the previous result until one of its reactive dependencies actually mutates.',
      },
    },
  },
  'vue-l2': {
    mentalModelTitle: {
      uz: 'Hayotiy o‘xshatish: Umumiy asboblar chamadoni (Composable)',
      ru: 'Аналогия из жизни: Чемодан готовых инструментов (Composable)',
      en: 'Mental model: A reusable field toolkit (Composable)',
    },
    mentalModelBody: {
      uz: 'Har bir sahifada skroll yoki oyna o‘lchamini noldan yozish o‘rniga, tayyor `use...()` funksiyasini ulaysiz — sahifa yopilganda esa `onUnmounted` barcha tinglovchilarni tozalaydi.',
      ru: 'Вместо дублирования логики скролла в десяти компонентах вы выносите её в `use...()`, а `onUnmounted` автоматически убирает подписки при закрытии экрана.',
      en: 'Instead of copying window listeners across components, you encapsulate stateful logic inside `use...()` and clean up inside `onUnmounted`.',
    },
    whyItMatters: {
      uz: 'Tozalanmagan `addEventListener` SPA ilovalarda xotira sizib chiqishiga (memory leak) olib keladi.',
      ru: 'Неочищенные `addEventListener` приводят к утечкам памяти и падению FPS при переходах между страницами.',
      en: 'Forgotten window listeners accumulate on every navigation and cause memory leaks.',
    },
    recommendedMinutes: 22,
    microCheck: {
      question: {
        uz: 'Komponent sahifadan olib tashlanganda hodisa tinglovchisini qaysi hook tozalaydi?',
        ru: 'Какой хук отвечает за удаление слушателя событий при закрытии компонента?',
        en: 'Which lifecycle hook cleans up event listeners when a component unmounts?',
      },
      options: {
        uz: ['onMounted', 'onUnmounted', 'computed'],
        ru: ['onMounted', 'onUnmounted', 'computed'],
        en: ['onMounted', 'onUnmounted', 'computed'],
      },
      correctIndex: 1,
      explanation: {
        uz: 'Ajoyib! `onUnmounted` komponent yopilganda ishga tushib `removeEventListener` ni bajaradi.',
        ru: 'Точно! `onUnmounted` срабатывает перед удалением компонента и снимает слушатель.',
        en: 'Right! `onUnmounted` runs on teardown so you can detach listeners cleanly.',
      },
    },
  },
  'gsap-l1': {
    mentalModelTitle: {
      uz: 'Hayotiy o‘xshatish: Rejissor kadrlar xronometraji',
      ru: 'Аналогия из жизни: Раскадровка и тайминг режиссёра',
      en: 'Mental model: A film director’s motion storyboard',
    },
    mentalModelBody: {
      uz: 'Yaxshi animatsiya «sakrash» emas, balki harakat fizikasi. `transform` va `opacity` to‘g‘ridan-to‘g‘ri GPU qatlamida ishlaydi, shuning uchun 60 FPS silliqlik saqlanadi.',
      ru: 'Хорошая анимация — это инерция и фокус внимания. Анимация `transform` и `opacity` идёт в GPU-композиторе без перерасчёта геометрии макета.',
      en: 'Great motion feels physical, not distracting. Animating only `transform` and `opacity` keeps work on the GPU compositor at a locked 60 FPS.',
    },
    whyItMatters: {
      uz: '`width`, `margin` yoki `top` ni animatsiya qilish telefonlarda qotishni keltirib chiqaradi.',
      ru: 'Анимация `width`, `top` или `margin` запускает перерасчёт Layout и тормозит на мобильных устройствах.',
      en: 'Animating layout geometry triggers expensive browser reflows on every single frame.',
    },
    recommendedMinutes: 20,
    microCheck: {
      question: {
        uz: '60 FPS silliq animatsiya uchun qaysi CSS xususiyatlarini animatsiya qilish xavfsiz?',
        ru: 'Какие CSS-свойства безопаснее всего анимировать для стабильных 60 FPS?',
        en: 'Which CSS properties are compositor-safe for smooth 60 FPS motion?',
      },
      options: {
        uz: ['width va margin', 'transform va opacity', 'padding va border-width'],
        ru: ['width и margin', 'transform и opacity', 'padding и border-width'],
        en: ['width and margin', 'transform and opacity', 'padding and border-width'],
      },
      correctIndex: 1,
      explanation: {
        uz: 'To‘g‘ri! Faqat `transform` va `opacity` brauzerni qayta joylashtirish (reflow) dan asraydi.',
        ru: 'Верно! `transform` и `opacity` не пересчитывают геометрию страницы.',
        en: 'Spot on! `transform` and `opacity` skip layout recalculation completely.',
      },
    },
  },
  'css-l1': {
    mentalModelTitle: {
      uz: 'Hayotiy o‘xshatish: Jurnal sahifasining me’moriy panjarasi',
      ru: 'Аналогия из жизни: Архитектурная сетка журнала',
      en: 'Mental model: An editorial architectural blueprint grid',
    },
    mentalModelBody: {
      uz: 'CSS Grid sahifani qator va ustunlarga oldindan bo‘lib beradi — har bir karta o‘z katagiga `gap` masofasi bilan aniq tushadi.',
      ru: 'CSS Grid заранее размечает колонки и ряды, а свойство `gap` задаёт ровный воздух только между ячейками без лишних отступов по краям.',
      en: 'CSS Grid establishes rows and columns upfront so cards snap cleanly with `gap` spacing and zero margin hacks.',
    },
    whyItMatters: {
      uz: 'Grid asoslarini puxta bilish Bento va boshqaruv panellarini 3 barobar tez yozish imkonini beradi.',
      ru: 'Владение Grid ускоряет вёрстку дашбордов и карточных витрин в 3 раза без лишних обёрток.',
      en: 'Mastering Grid eliminates brittle float/margin workarounds on modern responsive layouts.',
    },
    recommendedMinutes: 15,
    microCheck: {
      question: {
        uz: 'Grid katakchalari orasidagi bo‘shliqni boshqarish uchun qaysi xususiyat ishlatiladi?',
        ru: 'Какое свойство задаёт интервал между ячейками внутри CSS Grid?',
        en: 'Which CSS property sets uniform spacing strictly between Grid tracks?',
      },
      options: {
        uz: ['padding-outer', 'gap', 'float-space'],
        ru: ['padding-outer', 'gap', 'float-space'],
        en: ['padding-outer', 'gap', 'float-space'],
      },
      correctIndex: 1,
      explanation: {
        uz: 'Barakalla! `gap` faqat ichki ustun va qatorlar orasiga masofa qo‘yadi.',
        ru: 'Точно! `gap` добавляет отступы строго между колонками и строками.',
        en: 'Exact! `gap` inserts gutters strictly between columns and rows.',
      },
    },
  },
};

function buildDefaultBlueprint(course: FrontendCourse, lesson: CourseLesson): LessonPedagogyBlueprint {
  const keyword = lesson.expectedKeyword || 'code';
  return {
    mentalModelTitle: {
      uz: `Hayotiy o‘xshatish: «${keyword}» mexanizmining vazifasi`,
      ru: `Аналогия и суть: зачем нужен «${keyword}» в этом уроке`,
      en: `Mental model: Why «${keyword}» powers this pattern`,
    },
    mentalModelBody: {
      uz: `${course.title} bo‘yicha bu darsda «${keyword}» tushunchasi kodni qisqa, tushunarli va xatosiz saqlashga xizmat qiladi. Avval namunadagi 2–3 qator qanday bog‘langanini tasavvur qiling, so‘ng amaliyotga o‘ting.`,
      ru: `В рамках трека «${course.title}» инструмент «${keyword}» убирает ручной бойлерплейт и делает код предсказуемым. Сначала проследите связь строк в примере, затем закрепите в редакторе.`,
      en: `Inside ${course.title}, «${keyword}» keeps application behavior predictable with minimal boilerplate. Trace how the reference lines connect before coding.`,
    },
    whyItMatters: {
      uz: 'Nazariyani tushunmasdan nusxa ko‘chirish keyingi darslarda xatolarni ko‘paytiradi — 2 daqiqalik tahlil esa kodni bir urinishda yozishga yordam beradi.',
      ru: 'Механическое копирование без понимания увеличивает число ошибок. 2 минуты разбора экономят полчаса отладки.',
      en: 'Blindly pasting snippets leads to fragile debugging; two minutes of focused analysis saves half an hour of trial-and-error.',
    },
    recommendedMinutes: 20,
    microCheck: {
      question: {
        uz: `Ushbu dars kodida asosiy kalit mexanizm sifatida qaysi konstruksiya ishlatilgan?`,
        ru: `Какая ключевая конструкция является основой решения в этом уроке?`,
        en: `Which core construct drives the solution in this lesson?`,
      },
      options: {
        uz: [`${keyword} mexanizmi`, 'Eskirgan var global o‘zgaruvchisi', 'Bo‘sh setTimeout sikli'],
        ru: [`Конструкция ${keyword}`, 'Устаревший глобальный var', 'Пустой цикл setTimeout'],
        en: [`The ${keyword} pattern`, 'Legacy global var', 'An empty setTimeout loop'],
      },
      correctIndex: 0,
      explanation: {
        uz: `To‘g‘ri! Kod yozish blokida aynan «${keyword}» konstruksiyasidan foydalanasiz.`,
        ru: `Верно! Именно «${keyword}» нужно применить в практическом задании ниже.`,
        en: `Correct! You will apply «${keyword}» directly in the practice editor next.`,
      },
    },
  };
}

export function analyzeLessonPedagogy(
  course: FrontendCourse,
  lesson: CourseLesson,
  completedCount: number,
  totalCount: number,
  locale: Locale
): AdaptivePedagogyAnalysis {
  const blueprint = LESSON_PEDAGOGY[lesson.id] ?? buildDefaultBlueprint(course, lesson);
  const ratio = totalCount > 0 ? completedCount / totalCount : 0;

  let stageBadge: LocalizedText;
  let strategyTip: LocalizedText;

  if (completedCount === 0) {
    stageBadge = {
      uz: '1-bosqich · Poydevor va tushunish',
      ru: 'Этап 1 · Фундамент и понимание',
      en: 'Phase 1 · Mental Model First',
    };
    strategyTip = {
      uz: `Yangi boshlayapsiz: shoshilmang. Avval yuqoridagi hayotiy o‘xshatishni o‘qing, 1 ta tezkor savolni belgilang va taxminan ${blueprint.recommendedMinutes} daqiqa ajrating.`,
      ru: `Отличный старт: не спешите к клавиатуре. Прочитайте аналогию, проверьте себя быстрым вопросом и выделите ~${blueprint.recommendedMinutes} мин.`,
      en: `Starting fresh: take ~${blueprint.recommendedMinutes} min to anchor the analogy and pass the quick recall check before opening code.`,
    };
  } else if (ratio < 0.75) {
    stageBadge = {
      uz: '2-bosqich · Faol amaliyot ritmi',
      ru: 'Этап 2 · Активный ритм практики',
      en: 'Phase 2 · Active Recall Momentum',
    };
    strategyTip = {
      uz: `Siz allaqachon ${completedCount} ta darsni yopdingiz! Endi «Avoid vs Best Practice» farqini eslab qolib kodni mustaqil yozib ko‘ring.`,
      ru: `Вы уже прошли ${completedCount} урок(а)! Сравните блок «Avoid vs Best Practice» и напишите решение самостоятельно без подсказки.`,
      en: `You have already mastered ${completedCount} lesson(s)! Compare Avoid vs Best Practice and try solving before revealing hints.`,
    };
  } else {
    stageBadge = {
      uz: '3-bosqich · Yakuniy mustahkamlash',
      ru: 'Этап 3 · Финальное закрепление',
      en: 'Phase 3 · Capstone Readiness',
    };
    strategyTip = {
      uz: 'Kurs yakuniga yaqinlashdingiz! Darsni tugatgach «Yakuniy test»ni topshirib shaxsiy kabinet sertifikatini oling.',
      ru: 'Вы почти у финиша! После этого задания переходите к итоговому тесту и забирайте именной сертификат.',
      en: 'Almost done! Complete this topic and launch the Final Quiz to earn your verified FrontDev certificate.',
    };
  }

  // Keep locale referenced cleanly for type safety / potential future per-locale pacing
  void locale;

  return {
    stageBadge,
    strategyTip,
    blueprint,
  };
}
