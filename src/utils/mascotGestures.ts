import type { Locale, LocalizedText } from '../i18n/translations';

export type MascotGesture = 'idle' | 'wave' | 'point' | 'celebrate' | 'encourage' | 'think';

export type MascotContextEvent =
  | 'welcome'
  | 'navigate-courses'
  | 'navigate-roadmap'
  | 'navigate-about'
  | 'navigate-pricing'
  | 'navigate-dashboard'
  | 'hover-cta'
  | 'open-course'
  | 'study-confirmed'
  | 'code-pass'
  | 'code-fail'
  | 'purchase-success'
  | 'click-mascot';

export interface MascotReaction {
  gesture: MascotGesture;
  durationMs: number;
  speech: LocalizedText;
}

const REACTION_MAP: Record<MascotContextEvent, MascotReaction> = {
  welcome: {
    gesture: 'wave',
    durationMs: 2600,
    speech: {
      uz: 'Salom! FrontDev studiyasiga xush kelibsiz. Kurs tanlang va o‘qishni boshlang!',
      ru: 'Привет! Добро пожаловать в FrontDev. Выберите курс и начните путь!',
      en: 'Hello! Welcome to FrontDev. Pick a track and start learning!',
    },
  },
  'navigate-courses': {
    gesture: 'point',
    durationMs: 2400,
    speech: {
      uz: 'O‘zingizga mos kursni tanlang — sotib olgach kod muharriri ochiladi.',
      ru: 'Выберите подходящий трек — после покупки откроется редактор кода.',
      en: 'Pick your track — full coding practice unlocks right after purchase.',
    },
  },
  'navigate-roadmap': {
    gesture: 'point',
    durationMs: 2400,
    speech: {
      uz: 'Bu yerda noldan Senior darajasigacha 4 bosqichli aniq reja bor.',
      ru: 'Здесь собран чёткий маршрут из 4 этапов от нуля до Senior.',
      en: 'Follow this 4-stage blueprint from fundamentals to Senior Frontend.',
    },
  },
  'navigate-about': {
    gesture: 'wave',
    durationMs: 2400,
    speech: {
      uz: 'Mentorlarimiz va Learn-First metodologiyamiz bilan tanishing!',
      ru: 'Познакомьтесь с наставниками и методикой Learn-First!',
      en: 'Meet our principal mentors and the Learn-First methodology!',
    },
  },
  'navigate-pricing': {
    gesture: 'point',
    durationMs: 2400,
    speech: {
      uz: 'FRONT20 yoki FRONTDEV30 promokodi bilan 30% gacha chegirma oling.',
      ru: 'Используйте промокод FRONT20 или FRONTDEV30 для скидки до 30%.',
      en: 'Use promo code FRONT20 or FRONTDEV30 for up to 30% off.',
    },
  },
  'navigate-dashboard': {
    gesture: 'wave',
    durationMs: 2200,
    speech: {
      uz: 'Shaxsiy kabinet: progress, dars jadvali va sertifikatlaringiz shu yerda.',
      ru: 'Личный кабинет: прогресс, график и сертификаты всегда под рукой.',
      en: 'Your student dashboard: track progress, study goals, and certificates.',
    },
  },
  'hover-cta': {
    gesture: 'point',
    durationMs: 1800,
    speech: {
      uz: 'Ajoyib tanlov! Keyingi qadamni boshlash uchun bosing.',
      ru: 'Отличный выбор! Нажмите, чтобы перейти к следующему шагу.',
      en: 'Great choice! Click to jump into the next step.',
    },
  },
  'open-course': {
    gesture: 'point',
    durationMs: 2500,
    speech: {
      uz: 'Avval bugungi mavzu nazariyasini diqqat bilan o‘qing!',
      ru: 'Сначала внимательно изучите теорию сегодняшнего урока!',
      en: 'Study today’s lesson theory carefully before opening code practice!',
    },
  },
  'study-confirmed': {
    gesture: 'think',
    durationMs: 2400,
    speech: {
      uz: 'Zo‘r! Endi o‘rgangan mavzuingiz bo‘yicha kod yozib «Kodni ishlatish»ni bosing.',
      ru: 'Супер! Напишите код по теме и нажмите «Запустить и проверить».',
      en: 'Awesome! Write your code for today’s topic and click Run & Verify.',
    },
  },
  'code-pass': {
    gesture: 'celebrate',
    durationMs: 3000,
    speech: {
      uz: 'Barakalla! Kodingiz bexato ishladi va dars muvaffaqiyatli yakunlandi!',
      ru: 'Браво! Код выполнен без ошибок, урок засчитан как пройденный!',
      en: 'Spot on! Your code passed execution and the lesson is complete!',
    },
  },
  'code-fail': {
    gesture: 'encourage',
    durationMs: 2800,
    speech: {
      uz: 'Xavotir olmang! Xabarni o‘qing yoki «Maslahat» tugmasidan foydalaning.',
      ru: 'Не переживайте! Проверьте подсказку ошибки и попробуйте ещё раз.',
      en: 'Almost there! Check the feedback hint and run your code again.',
    },
  },
  'purchase-success': {
    gesture: 'celebrate',
    durationMs: 3200,
    speech: {
      uz: 'Tabriklaymiz! Kurs ochildi — endi bugungi mavzuni o‘rganib kod yozishingiz mumkin.',
      ru: 'Поздравляем! Доступ открыт — изучайте тему и переходите к коду.',
      en: 'Unlocked! Study today’s topic and launch the coding workspace.',
    },
  },
  'click-mascot': {
    gesture: 'wave',
    durationMs: 2200,
    speech: {
      uz: 'Men FrontDev robot-ustoziman! Har qadamda sizga yo‘l ko‘rsataman.',
      ru: 'Я робот-наставник FrontDev! Помогаю на каждом этапе обучения.',
      en: 'I’m the FrontDev bot guide! Here to cheer you on at every step.',
    },
  },
};

export function resolveMascotReaction(event: MascotContextEvent): MascotReaction {
  return REACTION_MAP[event];
}

export function getMascotIdleLine(locale: Locale): string {
  if (locale === 'uz') return 'FrontDev Robot · Yordamga tayyor';
  if (locale === 'ru') return 'Робот FrontDev · Готов помочь';
  return 'FrontDev Bot · Ready to guide';
}
