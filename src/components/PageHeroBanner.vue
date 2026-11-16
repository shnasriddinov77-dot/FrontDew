<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

defineProps<{
  kicker: string;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  ctaLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'cta'): void;
}>();
</script>

<template>
  <section class="bg-[#0A0A0C] text-[#F4F4F0] border-b border-white/10 py-16 lg:py-24">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
      <div class="lg:col-span-8 space-y-5">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ kicker }}
        </p>
        <h1
          class="font-display font-bold tracking-tight leading-[1.08] text-balance text-white"
          style="font-size: clamp(2rem, 3.6vw, 3.25rem);"
        >
          {{ title }}
        </h1>
        <p class="text-sm sm:text-base text-[#F4F4F0]/75 max-w-2xl leading-relaxed">
          {{ subtitle }}
        </p>

        <div v-if="ctaLabel" class="pt-2">
          <button
            type="button"
            @click="emit('cta')"
            class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>{{ ctaLabel }}</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="lg:col-span-4 grid grid-cols-3 gap-4 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
        <div v-for="(item, idx) in stats" :key="idx" class="space-y-1">
          <div class="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
            {{ item.value }}
          </div>
          <div class="text-xs text-[#F4F4F0]/60 leading-snug">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
