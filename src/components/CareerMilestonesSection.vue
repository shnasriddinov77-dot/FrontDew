<script setup lang="ts">
import { ref } from 'vue';
import { Check } from 'lucide-vue-next';
import { PAGES_COPY } from '../i18n/pagesTranslations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const { t, tList } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28 border-b border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <div class="reveal-item space-y-3 max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ t(PAGES_COPY.milestones.kicker) }}
        </p>
        <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
          {{ t(PAGES_COPY.milestones.title) }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="card in PAGES_COPY.milestones.cards"
          :key="card.grade"
          class="reveal-item bg-white rounded-2xl border border-black/10 p-6 flex flex-col justify-between gap-6"
        >
          <div class="space-y-4">
            <div class="font-mono text-xs text-[#FF3B1D] font-semibold">
              {{ card.grade }}
            </div>
            <h3 class="font-display text-lg font-bold text-[#0D0D0F]">
              {{ t(card.title) }}
            </h3>
            <ul class="space-y-2.5 pt-2 border-t border-black/8">
              <li
                v-for="(item, idx) in tList(card.items)"
                :key="idx"
                class="flex items-start gap-2.5 text-xs sm:text-sm text-[#0D0D0F]/75 leading-relaxed"
              >
                <Check class="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
