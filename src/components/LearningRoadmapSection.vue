<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import { ROADMAP_STAGES } from '../i18n/translations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const emit = defineEmits<{
  (e: 'exploreCourses'): void;
}>();

const { t, tList, copy } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);

const activeStep = ref(ROADMAP_STAGES[0].step);
const selectedStage = computed(
  () => ROADMAP_STAGES.find((s) => s.step === activeStep.value) ?? ROADMAP_STAGES[0]
);
</script>

<template>
  <section
    id="roadmap"
    ref="sectionRef"
    class="bg-[#0A0A0C] text-[#F4F4F0] py-20 lg:py-28 border-b border-white/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <!-- Header -->
      <div class="reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/12">
        <div class="space-y-3 max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ t(copy.roadmap.kicker) }}
          </p>
          <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
            {{ t(copy.roadmap.title) }}
          </h2>
          <p class="text-sm sm:text-base text-[#F4F4F0]/70">
            {{ t(copy.roadmap.subtitle) }}
          </p>
        </div>

        <button
          type="button"
          @click="emit('exploreCourses')"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto"
        >
          <span>{{ t(copy.hero.ctaPrimary) }}</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Interactive Stage Selector + Deep Detail -->
      <div class="reveal-item grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- 4 Stage Rows -->
        <div class="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
          <button
            v-for="stage in ROADMAP_STAGES"
            :key="stage.step"
            type="button"
            @click="activeStep = stage.step"
            class="w-full text-left py-6 px-4 sm:px-6 transition-colors grid grid-cols-12 gap-4 items-baseline cursor-pointer"
            :class="
              activeStep === stage.step
                ? 'bg-white/[0.06]'
                : 'hover:bg-white/[0.03]'
            "
          >
            <div class="col-span-2 font-mono text-sm font-bold tabular-nums text-[#FF3B1D]">
              {{ stage.step }}.
            </div>
            <div class="col-span-10 space-y-1.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-display text-base sm:text-lg font-semibold text-white">
                  {{ t(stage.title) }}
                </h3>
                <span class="font-mono text-xs text-[#F4F4F0]/55">
                  {{ t(stage.duration) }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-[#F4F4F0]/65 leading-relaxed">
                {{ t(stage.summary) }}
              </p>
            </div>
          </button>
        </div>

        <!-- Stage Deep Focus Panel -->
        <div class="lg:col-span-5 bg-[#121216] rounded-2xl border border-white/12 p-7 sm:p-9 space-y-6">
          <div class="flex items-center justify-between text-xs font-mono text-[#FF3B1D]">
            <span>{{ selectedStage.step }} · {{ t(selectedStage.duration) }}</span>
            <span>FrontDev Track</span>
          </div>

          <h3 class="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
            {{ t(selectedStage.title) }}
          </h3>

          <p class="text-sm text-[#F4F4F0]/75 leading-relaxed">
            {{ t(selectedStage.summary) }}
          </p>

          <div class="pt-4 border-t border-white/10 space-y-3">
            <ul class="space-y-2">
              <li
                v-for="(topic, idx) in tList(selectedStage.topics)"
                :key="idx"
                class="flex items-center gap-3 text-sm text-[#F4F4F0]/85"
              >
                <span class="font-mono text-xs text-[#FF3B1D]">0{{ idx + 1 }}</span>
                <span>{{ topic }}</span>
              </li>
            </ul>
          </div>

          <div class="pt-4 border-t border-white/10 space-y-1">
            <div class="font-mono text-[11px] uppercase tracking-wider text-[#F4F4F0]/50">
              {{ t(copy.roadmap.projectLabel) }}
            </div>
            <div class="font-semibold text-sm text-white">
              {{ t(selectedStage.project) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
