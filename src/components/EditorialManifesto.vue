<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const { t, copy } = useI18n();
const mentorImgError = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);
</script>

<template>
  <section
    id="manifesto"
    ref="sectionRef"
    class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28 border-b border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Editorial Intro + Mentor Proof -->
        <div class="reveal-item lg:col-span-5 space-y-8">
          <div class="space-y-4">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
              {{ t(copy.manifesto.kicker) }}
            </p>
            <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
              {{ t(copy.manifesto.title) }}
            </h2>
            <p class="text-sm sm:text-base text-[#0D0D0F]/70 leading-relaxed">
              {{ t(copy.manifesto.subtitle) }}
            </p>
          </div>

          <div class="pt-6 border-t border-black/10 flex items-center gap-5">
            <div class="w-20 h-20 rounded-xl overflow-hidden bg-[#0D0D0F] shrink-0">
              <img
                v-if="!mentorImgError"
                src="/src/assets/images/mentor_portrait_lead_1794589664268.jpg"
                alt="Azizbek Karimov — FrontDev Lead Mentor"
                referrerpolicy="no-referrer"
                @error="mentorImgError = true"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center font-display text-lg font-bold text-white"
              >
                AK
              </div>
            </div>
            <div class="space-y-1">
              <div class="font-semibold text-base text-[#0D0D0F]">
                {{ t(copy.manifesto.mentorName) }}
              </div>
              <div class="text-xs text-[#0D0D0F]/65">
                {{ t(copy.manifesto.mentorRole) }}
              </div>
              <div class="font-mono text-xs text-[#FF3B1D] tabular-nums">
                {{ t(copy.manifesto.mentorExp) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Numbered Capabilities -->
        <div class="reveal-item lg:col-span-7 divide-y divide-black/10 border-y border-black/10">
          <div
            v-for="pillar in copy.manifesto.pillars"
            :key="pillar.index"
            class="py-7 first:pt-6 last:pb-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
          >
            <div class="sm:col-span-2 font-mono text-sm font-semibold text-[#FF3B1D] tabular-nums">
              {{ pillar.index }}
            </div>
            <div class="sm:col-span-10 space-y-2">
              <h3 class="font-display text-lg sm:text-xl font-semibold text-[#0D0D0F] tracking-tight">
                {{ t(pillar.title) }}
              </h3>
              <p class="text-sm text-[#0D0D0F]/70 leading-relaxed">
                {{ t(pillar.description) }}
              </p>
              <div class="font-mono text-xs text-[#0D0D0F]/55 pt-1 tabular-nums">
                {{ t(pillar.metric) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
