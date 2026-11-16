<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight, CheckCircle2, Lock, Play } from 'lucide-vue-next';
import { PAGES_COPY } from '../i18n/pagesTranslations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const emit = defineEmits<{
  (e: 'openCourses'): void;
  (e: 'openRoadmap'): void;
}>();

const { t } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);
</script>

<template>
  <section
    id="learn-workflow"
    ref="sectionRef"
    class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28 border-b border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <!-- Header -->
      <div class="reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10">
        <div class="space-y-3 max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ t(PAGES_COPY.workflow.kicker) }}
          </p>
          <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
            {{ t(PAGES_COPY.workflow.title) }}
          </h2>
          <p class="text-sm sm:text-base text-[#0D0D0F]/70 leading-relaxed">
            {{ t(PAGES_COPY.workflow.subtitle) }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            @click="emit('openCourses')"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>{{ t(PAGES_COPY.workflow.ctaCourses) }}</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            @click="emit('openRoadmap')"
            class="px-5 py-3 rounded-xl border border-black/15 hover:border-black/40 text-xs font-semibold text-[#0D0D0F] transition-colors whitespace-nowrap cursor-pointer"
          >
            {{ t(PAGES_COPY.workflow.ctaRoadmap) }}
          </button>
        </div>
      </div>

      <!-- Three Strict Steps -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article
          v-for="step in PAGES_COPY.workflow.steps"
          :key="step.num"
          class="reveal-item bg-white rounded-2xl border border-black/10 p-7 flex flex-col justify-between gap-6"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-[#FF3B1D] font-bold">{{ step.num }}.</span>
              <span class="text-[#0D0D0F]/55">{{ t(step.tag) }}</span>
            </div>
            <h3 class="font-display text-lg sm:text-xl font-bold text-[#0D0D0F] leading-snug">
              {{ t(step.title) }}
            </h3>
            <p class="text-sm text-[#0D0D0F]/70 leading-relaxed">
              {{ t(step.desc) }}
            </p>
          </div>
        </article>
      </div>

      <!-- Visual Lesson Gate Sequence Diagram (Read-Only Schematic) -->
      <div class="reveal-item bg-[#0A0A0C] text-[#F4F4F0] rounded-2xl border border-white/10 p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 space-y-3">
          <div class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
            {{ t(PAGES_COPY.workflow.previewLabel) }}
          </div>
          <h3 class="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
            FrontDev Studio Gate
          </h3>
          <p class="text-sm text-[#F4F4F0]/70 leading-relaxed">
            {{ t(PAGES_COPY.workflow.steps[1].desc) }}
          </p>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-white/[0.05] border border-white/10 space-y-2">
            <div class="flex items-center gap-2 font-mono text-[#FF3B1D]">
              <Lock class="w-3.5 h-3.5" />
              <span>STEP 01</span>
            </div>
            <div class="font-semibold text-white">{{ t(PAGES_COPY.workflow.steps[0].tag) }}</div>
            <p class="text-[#F4F4F0]/60 leading-relaxed">FE-01 · Vue 3 / Pinia</p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.05] border border-white/10 space-y-2">
            <div class="flex items-center gap-2 font-mono text-[#34D399]">
              <CheckCircle2 class="w-3.5 h-3.5" />
              <span>STEP 02</span>
            </div>
            <div class="font-semibold text-white">{{ t(PAGES_COPY.workflow.steps[1].tag) }}</div>
            <p class="text-[#F4F4F0]/60 leading-relaxed">Theory + Line Anatomy</p>
          </div>

          <div class="p-4 rounded-xl bg-[#FF3B1D]/15 border border-[#FF3B1D]/50 space-y-2">
            <div class="flex items-center gap-2 font-mono text-white">
              <Play class="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>STEP 03</span>
            </div>
            <div class="font-semibold text-white">{{ t(PAGES_COPY.workflow.steps[2].tag) }}</div>
            <p class="text-[#F4F4F0]/80 leading-relaxed">Auto-check &amp; Pass</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
