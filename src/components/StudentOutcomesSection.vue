<script setup lang="ts">
import { ref } from 'vue';
import { STUDENT_OUTCOMES } from '../i18n/translations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const { t, copy } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);
</script>

<template>
  <section
    id="outcomes"
    ref="sectionRef"
    class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28 border-t border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <div class="reveal-item space-y-3 max-w-2xl pb-8 border-b border-black/10">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ t(copy.outcomes.kicker) }}
        </p>
        <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
          {{ t(copy.outcomes.title) }}
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article
          v-for="item in STUDENT_OUTCOMES"
          :key="item.id"
          class="reveal-item bg-white rounded-2xl border border-black/10 p-7 flex flex-col justify-between gap-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <div class="space-y-5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#0D0D0F] text-white font-display text-sm font-bold flex items-center justify-center shrink-0">
                  {{ item.initials }}
                </div>
                <div>
                  <div class="font-semibold text-sm text-[#0D0D0F]">
                    {{ item.name }}
                  </div>
                  <div class="text-xs text-[#0D0D0F]/60">
                    {{ t(item.role) }} · {{ item.company }}
                  </div>
                </div>
              </div>
            </div>

            <p class="text-sm text-[#0D0D0F]/80 leading-relaxed">
              «{{ t(item.quote) }}»
            </p>
          </div>

          <div class="pt-5 border-t border-black/8 space-y-2 text-xs">
            <div class="text-[#0D0D0F]/55">
              {{ t(item.before) }}
            </div>
            <div class="font-semibold text-[#0D0D0F]">
              {{ t(item.outcome) }}
            </div>
            <div class="font-mono text-[11px] text-[#FF3B1D] tabular-nums pt-1">
              {{ t(item.metric) }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
