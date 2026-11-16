<script setup lang="ts">
import { computed, ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';
import type { Locale } from '../i18n/translations';

export type ActivePage = 'home' | 'courses' | 'roadmap' | 'about' | 'pricing' | 'course' | 'dashboard';

const props = defineProps<{
  activePage: ActivePage;
}>();

const emit = defineEmits<{
  (e: 'navigate', page: ActivePage): void;
  (e: 'openAuth', mode: 'login' | 'register'): void;
}>();

const { state, isAuthenticated, isProSubscriber } = useAcademyStore();
const { locale, setLocale, t, copy } = useI18n();
const mobileMenuOpen = ref(false);

const locales: { code: Locale; label: string }[] = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

const navItems = computed(() => [
  { label: t(copy.nav.home), page: 'home' as ActivePage },
  { label: t(copy.nav.courses), page: 'courses' as ActivePage },
  { label: t(copy.nav.roadmap), page: 'roadmap' as ActivePage },
  { label: t(copy.nav.about), page: 'about' as ActivePage },
  { label: t(copy.nav.pricing), page: 'pricing' as ActivePage },
  { label: t(copy.nav.dashboard), page: 'dashboard' as ActivePage },
]);

function handleLink(page: ActivePage) {
  mobileMenuOpen.value = false;
  emit('navigate', page);
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-[#F4F4F0]/95 border-b border-black/10">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
      <!-- Zone 1: Clean single-element wordmark -->
      <button
        type="button"
        @click="handleLink('home')"
        class="font-display text-lg font-extrabold tracking-tight text-[#0D0D0F] whitespace-nowrap shrink-0 cursor-pointer hover:text-[#FF3B1D] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF3B1D]"
      >
        FrontDev
      </button>

      <!-- Zone 2: Dedicated Separate Page Links -->
      <nav aria-label="Main navigation" class="hidden lg:flex items-center gap-6 text-sm font-medium text-[#0D0D0F]/75">
        <button
          v-for="item in navItems"
          :key="item.page"
          type="button"
          @click="handleLink(item.page)"
          class="whitespace-nowrap shrink-0 hover:text-[#0D0D0F] transition-colors cursor-pointer relative py-1 focus-visible:outline-2 focus-visible:outline-[#FF3B1D]"
          :class="
            props.activePage === item.page || (item.page === 'courses' && props.activePage === 'course')
              ? 'text-[#0D0D0F] font-semibold underline decoration-[#FF3B1D] decoration-2 underline-offset-4'
              : ''
          "
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Zone 3: Language Switcher + Primary Auth Action -->
      <div class="flex items-center gap-3 shrink-0">
        <div
          role="group"
          aria-label="Language"
          class="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg bg-[#EAEAE4] border border-black/10"
        >
          <button
            v-for="lang in locales"
            :key="lang.code"
            type="button"
            @click="setLocale(lang.code)"
            class="px-2 py-1 rounded-md font-mono text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            :class="
              locale === lang.code
                ? 'bg-[#0D0D0F] text-white'
                : 'text-[#0D0D0F]/65 hover:text-[#0D0D0F]'
            "
          >
            {{ lang.label }}
          </button>
        </div>

        <button
          v-if="!isAuthenticated"
          type="button"
          @click="emit('openAuth', 'login')"
          :data-cursor="t(copy.nav.login).toUpperCase()"
          class="hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#0D0D0F] text-[#F4F4F0] text-xs font-semibold hover:bg-[#FF3B1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF3B1D]"
        >
          {{ t(copy.nav.login) }}
        </button>

        <button
          v-else
          type="button"
          @click="handleLink('dashboard')"
          :data-cursor="t(copy.nav.dashboard).toUpperCase()"
          class="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0D0D0F] text-[#F4F4F0] text-xs font-semibold hover:bg-[#FF3B1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer max-w-[200px] truncate focus-visible:outline-2 focus-visible:outline-[#FF3B1D]"
        >
          {{ state.user?.name }} · {{ isProSubscriber ? 'PRO' : t(copy.nav.baseTier) }}
        </button>

        <button
          type="button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-label="mobileMenuOpen ? t(copy.nav.closeMenu) : t(copy.nav.openMenu)"
          :aria-expanded="mobileMenuOpen"
          class="lg:hidden p-2 rounded-lg border border-black/15 text-[#0D0D0F] cursor-pointer"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-black/10 bg-[#F4F4F0] px-6 py-4 space-y-3"
    >
      <!-- Mobile Language Switch -->
      <div class="flex items-center justify-between pb-2 border-b border-black/8">
        <span class="font-mono text-xs text-[#0D0D0F]/60">UZ / RU / EN</span>
        <div class="flex items-center gap-1 p-0.5 rounded-lg bg-[#EAEAE4] border border-black/10">
          <button
            v-for="lang in locales"
            :key="lang.code"
            type="button"
            @click="setLocale(lang.code)"
            class="px-2.5 py-1 rounded-md font-mono text-xs font-semibold transition-colors cursor-pointer"
            :class="
              locale === lang.code
                ? 'bg-[#0D0D0F] text-white'
                : 'text-[#0D0D0F]/65'
            "
          >
            {{ lang.label }}
          </button>
        </div>
      </div>

      <button
        v-for="item in navItems"
        :key="item.page"
        type="button"
        @click="handleLink(item.page)"
        class="block w-full text-left py-2 text-sm font-medium border-b border-black/5 last:border-none cursor-pointer"
        :class="
          props.activePage === item.page
            ? 'text-[#FF3B1D] font-semibold'
            : 'text-[#0D0D0F] hover:text-[#FF3B1D]'
        "
      >
        {{ item.label }}
      </button>

      <div class="pt-1">
        <button
          v-if="!isAuthenticated"
          type="button"
          @click="
            mobileMenuOpen = false;
            emit('openAuth', 'login');
          "
          class="w-full py-2.5 px-4 rounded-lg bg-[#0D0D0F] text-white text-sm font-semibold cursor-pointer"
        >
          {{ t(copy.nav.loginOrRegister) }}
        </button>
        <button
          v-else
          type="button"
          @click="handleLink('dashboard')"
          class="w-full py-2.5 px-4 rounded-lg bg-[#0D0D0F] text-white text-sm font-semibold cursor-pointer"
        >
          {{ t(copy.nav.personalCabinet) }} ({{ state.user?.name }})
        </button>
      </div>
    </div>
  </header>
</template>
