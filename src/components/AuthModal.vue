<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import gsap from 'gsap';
import { X } from 'lucide-vue-next';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';

const props = defineProps<{
  isOpen: boolean;
  initialMode?: 'login' | 'register';
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'authenticated'): void;
}>();

const { login, register, loginDemo } = useAcademyStore();
const { locale, t, copy } = useI18n();

const panelRef = ref<HTMLElement | null>(null);
const mode = ref<'login' | 'register'>(props.initialMode || 'login');
const name = ref('');
const email = ref('');
const password = ref('');
const errorMsg = ref('');

function triggerErrorShake() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !panelRef.value) return;
  gsap.fromTo(
    panelRef.value,
    { x: -8 },
    { x: 0, duration: 0.4, ease: 'elastic.out(1.2, 0.35)', clearProps: 'transform' }
  );
}

watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      mode.value = props.initialMode || 'login';
      errorMsg.value = '';
      await nextTick();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reducedMotion && panelRef.value) {
        gsap.fromTo(
          panelRef.value,
          { y: 18, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.32, ease: 'power3.out', clearProps: 'transform,opacity' }
        );
      }
    }
  }
);

function handleSubmit() {
  errorMsg.value = '';
  const cleanEmail = email.value.trim();

  if (mode.value === 'register' && name.value.trim().length < 2) {
    errorMsg.value = t(copy.auth.errName);
    triggerErrorShake();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errorMsg.value = t(copy.auth.errEmail);
    triggerErrorShake();
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = t(copy.auth.errPass);
    triggerErrorShake();
    return;
  }

  if (mode.value === 'register') {
    register(name.value, cleanEmail);
  } else {
    login(cleanEmail);
  }

  emit('authenticated');
  emit('close');
}

function handleDemo(type: 'student' | 'pro') {
  loginDemo(type);
  emit('authenticated');
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div
    v-if="isOpen"
    role="dialog"
    aria-modal="true"
    aria-label="FrontDev Auth"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
    @click.self="emit('close')"
  >
    <div
      ref="panelRef"
      class="w-full max-w-md bg-[#F4F4F0] text-[#0D0D0F] rounded-2xl border border-black/15 p-6 sm:p-8 space-y-6 relative shadow-2xl"
    >
      <button
        type="button"
        aria-label="Close modal"
        @click="emit('close')"
        class="absolute top-5 right-5 p-2 rounded-lg border border-black/10 hover:bg-black/5 cursor-pointer"
      >
        <X class="w-4 h-4" />
      </button>

      <div class="space-y-1.5">
        <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
          FrontDev · {{ t(copy.auth.kicker) }}
        </p>
        <h2 class="font-display text-2xl font-bold">
          {{ mode === 'login' ? t(copy.auth.loginTitle) : t(copy.auth.registerTitle) }}
        </h2>
        <p class="text-xs text-[#0D0D0F]/65 leading-relaxed">
          {{
            locale === 'uz'
              ? 'Shaxsiy kabinet, o‘quv progressi va kod amaliyotingizni saqlash uchun tizimga kiring.'
              : locale === 'ru'
                ? 'Войдите, чтобы сохранять прогресс уроков, код и сертификаты в личном кабинете.'
                : 'Sign in to save your lesson progress, code solutions, and certificates.'
          }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-1 p-1 bg-[#EAEAE4] rounded-xl border border-black/8">
        <button
          type="button"
          @click="
            mode = 'login';
            errorMsg = '';
          "
          class="py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          :class="mode === 'login' ? 'bg-[#0D0D0F] text-white' : 'text-[#0D0D0F]/70'"
        >
          {{ t(copy.auth.tabLogin) }}
        </button>
        <button
          type="button"
          @click="
            mode = 'register';
            errorMsg = '';
          "
          class="py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          :class="mode === 'register' ? 'bg-[#0D0D0F] text-white' : 'text-[#0D0D0F]/70'"
        >
          {{ t(copy.auth.tabRegister) }}
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="mode === 'register'" class="space-y-1.5">
          <label for="auth-name" class="block text-xs font-semibold text-[#0D0D0F]/75">
            {{ t(copy.auth.nameLabel) }}
          </label>
          <input
            id="auth-name"
            v-model="name"
            type="text"
            placeholder="Madina Rahimova"
            class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-sm focus:outline-none focus:border-[#FF3B1D]"
          />
        </div>

        <div class="space-y-1.5">
          <label for="auth-email" class="block text-xs font-semibold text-[#0D0D0F]/75">
            {{ t(copy.auth.emailLabel) }}
          </label>
          <input
            id="auth-email"
            v-model="email"
            type="email"
            placeholder="student@frontdev.uz"
            class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-sm focus:outline-none focus:border-[#FF3B1D]"
          />
        </div>

        <div class="space-y-1.5">
          <label for="auth-password" class="block text-xs font-semibold text-[#0D0D0F]/75">
            {{ t(copy.auth.passwordLabel) }}
          </label>
          <input
            id="auth-password"
            v-model="password"
            type="password"
            :placeholder="t(copy.auth.passwordPlaceholder)"
            class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-sm focus:outline-none focus:border-[#FF3B1D]"
          />
        </div>

        <p v-if="errorMsg" role="alert" class="text-xs font-medium text-[#DC2626]">
          {{ errorMsg }}
        </p>

        <button
          type="submit"
          class="w-full py-3 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {{ mode === 'login' ? t(copy.auth.submitLogin) : t(copy.auth.submitRegister) }}
        </button>
      </form>

      <div class="pt-4 border-t border-black/10 space-y-2.5">
        <div class="font-mono text-[11px] text-[#0D0D0F]/55">
          {{ t(copy.auth.demoLabel) }}
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            @click="handleDemo('student')"
            class="py-2 px-3 rounded-xl border border-black/15 bg-white hover:border-[#0D0D0F] text-xs font-medium transition-colors cursor-pointer"
          >
            {{ t(copy.auth.demoStudent) }}
          </button>
          <button
            type="button"
            @click="handleDemo('pro')"
            class="py-2 px-3 rounded-xl border border-[#FF3B1D]/40 bg-white hover:bg-[#FF3B1D] hover:text-white text-xs font-semibold text-[#FF3B1D] transition-colors cursor-pointer"
          >
            {{ t(copy.auth.demoPro) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
