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
    class="bg-[#0A0A0C] text-[#F4F4F0] py-20 lg:py-28 border-b border-white/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <div class="reveal-item space-y-3 max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ t(PAGES_COPY.mentors.kicker) }}
        </p>
        <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
          {{ t(PAGES_COPY.mentors.title) }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="mentor in PAGES_COPY.mentors.faculty"
          :key="mentor.name"
          class="reveal-item bg-[#121216] rounded-2xl border border-white/10 p-7 flex flex-col justify-between gap-6"
        >
          <div class="space-y-5">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-[#FF3B1D] text-white font-display font-bold flex items-center justify-center shrink-0">
                {{ mentor.initials }}
              </div>
              <div>
                <h3 class="font-display text-lg font-bold text-white">{{ mentor.name }}</h3>
                <div class="text-xs text-[#F4F4F0]/65">{{ t(mentor.role) }}</div>
              </div>
            </div>

            <p class="text-sm text-[#F4F4F0]/75 leading-relaxed">
              {{ t(mentor.bio) }}
            </p>
          </div>

          <div class="pt-4 border-t border-white/10 font-mono text-xs text-[#FF3B1D]">
            {{ t(mentor.exp) }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
