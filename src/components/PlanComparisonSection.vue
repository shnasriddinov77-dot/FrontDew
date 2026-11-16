<script setup lang="ts">
import { ref } from 'vue';
import { PAGES_COPY } from '../i18n/pagesTranslations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const { t } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-white text-[#0D0D0F] py-20 lg:py-24 border-b border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
      <div class="reveal-item space-y-3 max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ t(PAGES_COPY.planComparison.kicker) }}
        </p>
        <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
          {{ t(PAGES_COPY.planComparison.title) }}
        </h2>
      </div>

      <div class="reveal-item overflow-x-auto rounded-2xl border border-black/10 bg-[#FAF9F6]">
        <table class="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr class="border-b border-black/10 text-xs font-mono uppercase tracking-wider text-[#0D0D0F]/60">
              <th class="py-4 px-5">{{ t(PAGES_COPY.planComparison.headers.feature) }}</th>
              <th class="py-4 px-5">{{ t(PAGES_COPY.planComparison.headers.free) }}</th>
              <th class="py-4 px-5">{{ t(PAGES_COPY.planComparison.headers.single) }}</th>
              <th class="py-4 px-5 text-[#FF3B1D]">{{ t(PAGES_COPY.planComparison.headers.pro) }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/8 text-sm">
            <tr v-for="(row, idx) in PAGES_COPY.planComparison.rows" :key="idx">
              <td class="py-4 px-5 font-medium text-[#0D0D0F]">
                {{ t(row.label) }}
              </td>
              <td class="py-4 px-5 font-mono text-xs text-[#0D0D0F]/60">
                {{ typeof row.free === 'string' ? row.free : t(row.free) }}
              </td>
              <td class="py-4 px-5 font-mono text-xs text-[#0D0D0F]/80">
                {{ typeof row.single === 'string' ? row.single : t(row.single) }}
              </td>
              <td class="py-4 px-5 font-mono text-xs font-semibold text-[#059669]">
                {{ typeof row.pro === 'string' ? row.pro : t(row.pro) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
