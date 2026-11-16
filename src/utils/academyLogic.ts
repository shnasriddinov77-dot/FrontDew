import type {
  CourseCategory,
  CourseTierFilter,
  FrontendCourse,
  QuizQuestion,
  SubscriptionPlan,
} from '../data/frontendCourses';

export interface FilterCriteria {
  category: CourseCategory;
  tier: CourseTierFilter;
  search: string;
}

export function filterCourses(
  courses: FrontendCourse[],
  criteria: FilterCriteria
): FrontendCourse[] {
  const query = criteria.search.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesCategory =
      criteria.category === 'all' || course.category === criteria.category;

    const matchesTier =
      criteria.tier === 'all' ||
      (criteria.tier === 'free' && course.isFree) ||
      (criteria.tier === 'pro' && !course.isFree);

    const matchesSearch =
      !query ||
      course.title.toLowerCase().includes(query) ||
      course.subtitle.toLowerCase().includes(query) ||
      course.skills.some((s) => s.toLowerCase().includes(query)) ||
      course.code.toLowerCase().includes(query);

    return matchesCategory && matchesTier && matchesSearch;
  });
}

export function hasAccessToCourse(
  course: Pick<FrontendCourse, 'id' | 'isFree'>,
  subscriptionPlan: SubscriptionPlan,
  purchasedCourseIds: string[]
): boolean {
  if (course.isFree) return true;
  if (subscriptionPlan === 'pro-monthly' || subscriptionPlan === 'pro-annual') {
    return true;
  }
  return purchasedCourseIds.includes(course.id);
}

export function calculateCheckoutTotal(
  basePriceRub: number,
  promoCode: string
): { subtotal: number; discountPercent: number; discountAmount: number; total: number; promoValid: boolean } {
  const normalized = promoCode.trim().toUpperCase();
  let discountPercent = 0;
  let promoValid = false;

  if (normalized === 'FRONT20') {
    discountPercent = 20;
    promoValid = true;
  } else if (normalized === 'FRONTDEV30' || normalized === 'KODEX30') {
    discountPercent = 30;
    promoValid = true;
  }

  const discountAmount = Math.round((basePriceRub * discountPercent) / 100);
  const total = Math.max(0, basePriceRub - discountAmount);

  return {
    subtotal: basePriceRub,
    discountPercent,
    discountAmount,
    total,
    promoValid,
  };
}

export function formatCardDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function formatCardExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export function validateCheckoutCard(
  cardNumber: string,
  expiry: string,
  cvc: string,
  locale: 'uz' | 'ru' | 'en' = 'ru'
): { valid: boolean; error: string | null } {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length !== 16) {
    return {
      valid: false,
      error:
        locale === 'uz'
          ? '16 xonali karta raqamini kiriting'
          : locale === 'en'
            ? 'Enter a 16-digit card number'
            : 'Введите 16 цифр номера карты',
    };
  }

  const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(expiry.trim());
  if (!expiryMatch) {
    return {
      valid: false,
      error:
        locale === 'uz'
          ? 'Amal qilish muddatini OO/YY ko‘rinishida kiriting'
          : locale === 'en'
            ? 'Enter expiry in MM/YY format'
            : 'Укажите срок карты в формате ММ/ГГ',
    };
  }
  const month = Number(expiryMatch[1]);
  if (month < 1 || month > 12) {
    return {
      valid: false,
      error:
        locale === 'uz'
          ? 'Karta amal qilish oyi noto‘g‘ri'
          : locale === 'en'
            ? 'Invalid card expiry month'
            : 'Некорректный месяц срока действия карты',
    };
  }

  const cvcDigits = cvc.replace(/\D/g, '');
  if (cvcDigits.length !== 3) {
    return {
      valid: false,
      error:
        locale === 'uz'
          ? '3 xonali CVC kodni kiriting'
          : locale === 'en'
            ? 'Enter the 3-digit CVC code'
            : 'Введите 3-значный CVC код',
    };
  }

  return { valid: true, error: null };
}

export function calculateCourseProgress(
  course: FrontendCourse,
  completedLessonIds: string[]
): { completedCount: number; totalCount: number; percent: number } {
  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const totalCount = allLessonIds.length;
  if (totalCount === 0) {
    return { completedCount: 0, totalCount: 0, percent: 0 };
  }
  const completedCount = allLessonIds.filter((id) =>
    completedLessonIds.includes(id)
  ).length;
  const percent = Math.round((completedCount / totalCount) * 100);
  return { completedCount, totalCount, percent };
}

export function gradeQuiz(
  questions: QuizQuestion[],
  selectedIndices: Record<string, number>
): { correct: number; total: number; percent: number; passed: boolean } {
  const total = questions.length;
  if (total === 0) {
    return { correct: 0, total: 0, percent: 0, passed: false };
  }
  let correct = 0;
  for (const q of questions) {
    if (selectedIndices[q.id] === q.correctIndex) {
      correct += 1;
    }
  }
  const percent = Math.round((correct / total) * 100);
  return {
    correct,
    total,
    percent,
    passed: percent >= 66,
  };
}

export function evaluatePracticeSnippet(
  userCode: string,
  expectedKeyword: string,
  locale: 'uz' | 'ru' | 'en' = 'ru'
): { passed: boolean; feedback: string } {
  const trimmed = userCode.trim();
  if (trimmed.length < 12) {
    return {
      passed: false,
      feedback:
        locale === 'uz'
          ? 'Kod juda qisqa — vazifani to‘liq yozib chiqing.'
          : locale === 'en'
            ? 'Code is too short — complete the exercise solution.'
            : 'Код слишком короткий — допишите решение задания.',
    };
  }
  if (!trimmed.toLowerCase().includes(expectedKeyword.toLowerCase())) {
    return {
      passed: false,
      feedback:
        locale === 'uz'
          ? `Yechimingizda "${expectedKeyword}" konstruksiyasidan foydalaning.`
          : locale === 'en'
            ? `Include the key construct "${expectedKeyword}" in your solution.`
            : `Используйте ключевую конструкцию "${expectedKeyword}" в вашем решении.`,
    };
  }
  return {
    passed: true,
    feedback:
      locale === 'uz'
        ? 'Ajoyib! Yechim darsning arxitektura qoidasiga to‘liq mos keladi.'
        : locale === 'en'
          ? 'Excellent! Your solution matches the lesson architecture pattern.'
          : 'Отлично! Решение соответствует архитектурному паттерну урока.',
  };
}

export interface UnifiedCodeRunResult {
  passed: boolean;
  feedback: string;
  logs: string[];
  error: string | null;
}

export function runAndVerifyLessonCode(
  userCode: string,
  starterCode: string,
  expectedKeyword: string,
  options: {
    isCssPreview?: boolean;
    locale?: 'uz' | 'ru' | 'en';
    executeJs: (code: string) => { ok: boolean; logs: string[]; error: string | null };
  }
): UnifiedCodeRunResult {
  const locale = options.locale ?? 'uz';
  const trimmed = userCode.trim();
  const starterTrimmed = starterCode.trim();

  if (options.isCssPreview) {
    const openBraces = (trimmed.match(/\{/g) || []).length;
    const closeBraces = (trimmed.match(/\}/g) || []).length;
    if (openBraces === 0 || openBraces !== closeBraces) {
      const braceMsg =
        locale === 'uz'
          ? 'CSS sintaksisida xatolik: { va } qavslar sonini tekshiring.'
          : locale === 'en'
            ? 'CSS syntax error: check matching { and } braces.'
            : 'Ошибка CSS-синтаксиса: проверьте парность скобок { и }.';
      return { passed: false, feedback: braceMsg, logs: [], error: braceMsg };
    }
    if (trimmed === starterTrimmed) {
      const unchangedMsg =
        locale === 'uz'
          ? 'Avval boshlang‘ich kodga bugungi mavzu bo‘yicha o‘zgarish kiriting.'
          : locale === 'en'
            ? 'Edit the starter code with your solution for today’s topic first.'
            : 'Сначала дополните стартовый код решением по теме урока.';
      return { passed: false, feedback: unchangedMsg, logs: [], error: null };
    }
    const check = evaluatePracticeSnippet(userCode, expectedKeyword, locale);
    return {
      passed: check.passed,
      feedback: check.feedback,
      logs: [
        locale === 'uz'
          ? 'CSS ko‘rinishi yangilandi va tekshirildi.'
          : locale === 'en'
            ? 'CSS preview rendered and verified.'
            : 'CSS-превью обновлено и проверено.',
      ],
      error: null,
    };
  }

  const exec = options.executeJs(userCode);
  if (!exec.ok) {
    const errPrefix =
      locale === 'uz'
        ? 'Kodni ishga tushirishda xatolik:'
        : locale === 'en'
          ? 'Execution error:'
          : 'Ошибка выполнения кода:';
    return {
      passed: false,
      feedback: `${errPrefix} ${exec.error || 'Syntax error'}`,
      logs: exec.logs,
      error: exec.error,
    };
  }

  if (trimmed === starterTrimmed) {
    const unchangedMsg =
      locale === 'uz'
        ? 'Avval boshlang‘ich kodni to‘ldirib, keyin «Kodni ishlatish» tugmasini bosing.'
        : locale === 'en'
          ? 'Complete the starter code for today’s lesson before running verification.'
          : 'Дополните стартовый код по теме урока и нажмите «Запустить код».';
    return {
      passed: false,
      feedback: unchangedMsg,
      logs: exec.logs,
      error: null,
    };
  }

  const check = evaluatePracticeSnippet(userCode, expectedKeyword, locale);
  return {
    passed: check.passed,
    feedback: check.feedback,
    logs: exec.logs,
    error: null,
  };
}

export function formatPriceRub(amount: number): string {
  if (amount <= 0) return 'Бесплатно';
  return `${amount.toLocaleString('ru-RU')} ₽`;
}

export function pluralizeLessons(count: number): string {
  const mod100 = count % 100;
  const mod10 = count % 10;
  if (mod100 >= 11 && mod100 <= 19) return `${count} уроков`;
  if (mod10 === 1) return `${count} урок`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} урока`;
  return `${count} уроков`;
}

export function getCourseLessonsCount(course: FrontendCourse): number {
  return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}
