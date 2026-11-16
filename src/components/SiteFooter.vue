<script setup lang="ts">
import { useI18n } from '../composables/useI18n';
import type { Locale } from '../i18n/translations';

import type { ActivePage } from './TopNavbar.vue';

const emit = defineEmits<{
  (e: 'navigate', page: ActivePage): void;
}>();

const { locale, setLocale, t, copy } = useI18n();

const locales: { code: Locale; label: string }[] = [
  { code: 'uz', label: 'O‘zbekcha' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];
</script>

<template>
  <footer class="bg-[#0A0A0C] text-[#F4F4F0] border-t border-white/10 py-14">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div class="space-y-2">
          <div class="font-display text-xl font-extrabold tracking-tight">FrontDev</div>
          <p class="text-xs text-[#F4F4F0]/60 max-w-sm leading-relaxed">
            {{ t(copy.footer.desc) }}
          </p>
        </div>

        <nav class="flex flex-wrap items-center gap-6 text-xs text-[#F4F4F0]/75">
          <button
            type="button"
            @click="emit('navigate', 'home')"
            class="hover:text-white transition-colors cursor-pointer"
          >
            {{ t(copy.footer.home) }}
          </button>
          <button
            type="button"
            @click="emit('navigate', 'courses')"
            class="hover:text-white transition-colors cursor-pointer"
          >
            {{ t(copy.footer.catalog) }}
          </button>
          <button
            type="button"
            @click="emit('navigate', 'roadmap')"
            class="hover:text-white transition-colors cursor-pointer"
          >
            {{ t(copy.footer.roadmap) }}
          </button>
          <button
            type="button"
            @click="emit('navigate', 'about')"
            class="hover:text-white transition-colors cursor-pointer"
          >
            {{ t(copy.footer.about) }}
          </button>
          <button
            type="button"
            @click="emit('navigate', 'pricing')"
            class="hover:text-white transition-colors cursor-pointer"
          >
            {{ t(copy.footer.pricing) }}
          </button>
          <button
            type="button"
            @click="emit('navigate', 'dashboard')"
            class="hover:text-white transition-colors cursor-pointer"
          >
            {{ t(copy.footer.dashboard) }}
          </button>
        </nav>
      </div>

      <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <button
            v-for="lang in locales"
            :key="lang.code"
            type="button"
            @click="setLocale(lang.code)"
            class="px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors cursor-pointer"
            :class="
              locale === lang.code
                ? 'bg-[#FF3B1D] text-white font-semibold'
                : 'text-[#F4F4F0]/60 hover:text-white'
            "
          >
            {{ lang.label }}
          </button>
        </div>

        <div class="font-mono text-xs text-[#F4F4F0]/45">
          © 2026 FrontDev
        </div>
      </div>
    </div>
  </footer>
</template>
