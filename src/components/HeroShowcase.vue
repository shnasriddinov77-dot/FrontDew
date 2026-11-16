<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ArrowDownRight, Terminal } from 'lucide-vue-next';
import KineticCanvas from './KineticCanvas.vue';
import FrontDevMascot from './FrontDevMascot.vue';
import { useI18n } from '../composables/useI18n';
import { useMascot } from '../composables/useMascot';

const emit = defineEmits<{
  (e: 'exploreCourses'): void;
  (e: 'openRoadmap'): void;
  (e: 'openSubscription'): void;
}>();

const { t, copy } = useI18n();
const { currentGesture, gestureTick, triggerMascot } = useMascot();

const heroRoot = ref<HTMLElement | null>(null);
const imageFailed = ref(false);
let ctx: gsap.Context | null = null;
let hasAnimatedInitialHero = false;

onMounted(() => {
  triggerMascot('welcome', { showSpeech: false });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !heroRoot.value || hasAnimatedInitialHero) return;
  hasAnimatedInitialHero = true;

  ctx = gsap.context(() => {
    gsap.from('.hero-stagger', {
      y: 16,
      duration: 0.55,
      stagger: 0.06,
      ease: 'power3.out',
      clearProps: 'transform',
    });

    gsap.to('.hero-float-badge', {
      y: -6,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, heroRoot.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="heroRoot"
    class="relative bg-[#0A0A0C] text-[#F4F4F0] overflow-hidden border-b border-white/10"
  >
    <KineticCanvas />

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-14 pb-16 lg:pt-24 lg:pb-24">
      <!-- Split Editorial Hero -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        <!-- Left Typographic Column -->
        <div class="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div class="space-y-6">
            <p class="hero-stagger font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
              {{ t(copy.hero.kicker) }}
            </p>

            <h1
              class="hero-stagger font-display font-bold tracking-tight leading-[1.05] text-balance text-[#F4F4F0]"
              style="font-size: clamp(2.15rem, 4.1vw, 3.85rem);"
            >
              {{ t(copy.hero.headline) }}
            </h1>

            <p class="hero-stagger text-base sm:text-lg text-[#F4F4F0]/75 leading-relaxed max-w-2xl">
              {{ t(copy.hero.subtext) }}
            </p>
          </div>

          <div class="hero-stagger flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
            <button
              type="button"
              @click="emit('exploreCourses')"
              @mouseenter="triggerMascot('hover-cta', { showSpeech: false })"
              @focus="triggerMascot('hover-cta', { showSpeech: false })"
              data-cursor="COURSES"
              class="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>{{ t(copy.hero.ctaPrimary) }}</span>
              <ArrowDownRight class="w-4 h-4" />
            </button>

            <button
              type="button"
              @click="emit('openRoadmap')"
              @mouseenter="triggerMascot('hover-cta', { showSpeech: false })"
              @focus="triggerMascot('hover-cta', { showSpeech: false })"
              data-cursor="ROADMAP"
              class="inline-flex items-center gap-2 px-5 py-4 rounded-xl border border-white/20 hover:border-[#FF3B1D] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Terminal class="w-4 h-4 text-[#FF3B1D]" />
              <span>{{ t(copy.hero.ctaLearnNow) }}</span>
            </button>

            <button
              type="button"
              @click="emit('openSubscription')"
              @mouseenter="triggerMascot('hover-cta', { showSpeech: false })"
              data-cursor="PRO"
              class="text-sm font-medium text-[#F4F4F0]/80 hover:text-white underline decoration-white/30 hover:decoration-[#FF3B1D] underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {{ t(copy.hero.ctaPro) }}
            </button>
          </div>
        </div>

        <!-- Right Visual Container (Matching Height) -->
        <div class="lg:col-span-5 hero-stagger">
          <div
            data-cursor="FRONTDEV"
            class="relative w-full h-72 sm:h-96 lg:h-full min-h-[360px] rounded-2xl overflow-hidden border border-white/15 bg-[#141417]"
          >
            <img
              v-if="!imageFailed"
              src="/src/assets/images/hero_frontend_atelier_1794589662714.jpg"
              alt="FrontDev — Zamonaviy dasturlash studiyasi"
              referrerpolicy="no-referrer"
              @error="imageFailed = true"
              class="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
            />
            <div
              v-else
              class="w-full h-full flex flex-col justify-end p-8 bg-gradient-to-br from-[#1A1A20] via-[#0F0F12] to-[#29110D]"
            >
              <span class="font-mono text-xs text-[#FF3B1D] uppercase tracking-widest mb-2">
                FRONTDEV STUDIO
              </span>
              <p class="font-display text-xl text-white">
                {{ t(copy.hero.kicker) }}
              </p>
            </div>

            <!-- Interactive Hero Uzbek Cyber-Robot Mascot Badge (desktop/tablet; mobile uses dock) -->
            <div class="hidden sm:block absolute top-4 right-4 bg-[#0A0A0C]/90 border border-white/15 rounded-2xl p-2 shadow-xl">
              <FrontDevMascot
                size="md"
                :gesture="currentGesture"
                :tick="gestureTick"
                label="FrontDev Uzbek Cyber-Robot Mascot"
                @click="triggerMascot('click-mascot')"
              />
            </div>

            <div
              class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
            >
              <div class="hero-float-badge flex items-center justify-between text-xs text-white/90 font-mono">
                <span>{{ t(copy.hero.badgeCohort) }}</span>
                <span aria-hidden="true">·</span>
                <span>Vue 3 / Nuxt / GSAP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Full-Width Quantified Metrics Strip Below Split -->
      <div
        class="hero-stagger mt-16 pt-8 border-t border-white/12 grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <div
          v-for="(metric, idx) in copy.hero.metrics"
          :key="idx"
          class="space-y-1"
        >
          <div
            class="font-display text-2xl sm:text-3xl font-bold tabular-nums"
            :class="idx === 3 ? 'text-[#FF3B1D]' : 'text-white'"
          >
            {{ t(metric.value) }}
          </div>
          <div class="text-xs text-[#F4F4F0]/60">
            {{ t(metric.label) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
