import { computed, ref, watchEffect } from 'vue';
import { UI_COPY, type Locale, type LocalizedText } from '../i18n/translations';

const LOCALE_STORAGE_KEY = 'frontdev_locale_v1';

function loadSavedLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'uz' || saved === 'ru' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors in SSR or strict environments
  }
  return 'uz';
}

const currentLocale = ref<Locale>(loadSavedLocale());

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = currentLocale.value;
  }
});

export function useI18n() {
  const locale = computed(() => currentLocale.value);

  function setLocale(next: Locale) {
    currentLocale.value = next;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Ignore storage quota issues
    }
  }

  function t(text: LocalizedText | string): string {
    if (typeof text === 'string') return text;
    return text[currentLocale.value] ?? text.uz;
  }

  function tList(list: { uz: string[]; ru: string[]; en: string[] }): string[] {
    return list[currentLocale.value] ?? list.uz;
  }

  function formatCoursePrice(priceRub: number): string {
    if (priceRub <= 0) {
      return t(UI_COPY.catalog.freeLabel);
    }
    if (currentLocale.value === 'uz') {
      const sum = Math.round((priceRub * 140) / 1000) * 1000;
      return `${sum.toLocaleString('uz-UZ').replace(/,/g, ' ')} so‘m`;
    }
    if (currentLocale.value === 'en') {
      const usd = Math.max(9, Math.round(priceRub / 95));
      return `$${usd}`;
    }
    return `${priceRub.toLocaleString('ru-RU')} ₽`;
  }

  function formatLessonCount(count: number): string {
    if (currentLocale.value === 'uz') {
      return `${count} ta dars`;
    }
    if (currentLocale.value === 'en') {
      return count === 1 ? '1 lesson' : `${count} lessons`;
    }
    const mod100 = count % 100;
    const mod10 = count % 10;
    if (mod100 >= 11 && mod100 <= 19) return `${count} уроков`;
    if (mod10 === 1) return `${count} урок`;
    if (mod10 >= 2 && mod10 <= 4) return `${count} урока`;
    return `${count} уроков`;
  }

  return {
    locale,
    setLocale,
    t,
    tList,
    formatCoursePrice,
    formatLessonCount,
    copy: UI_COPY,
  };
}
