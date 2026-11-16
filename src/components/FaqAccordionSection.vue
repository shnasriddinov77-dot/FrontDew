<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import { FAQ_ITEMS } from '../i18n/translations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const { t, copy } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);

const openId = ref<string>(FAQ_ITEMS[0].id);

function toggle(id: string) {
  openId.value = openId.value === id ? '' : id;
}
</script>

<template>
  <section
    id="faq"
    ref="sectionRef"
    class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28 border-t border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div class="reveal-item lg:col-span-5 space-y-3">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ t(copy.faq.kicker) }}
        </p>
        <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
          {{ t(copy.faq.title) }}
        </h2>
      </div>

      <div class="reveal-item lg:col-span-7 divide-y divide-black/10 border-y border-black/10">
        <div v-for="item in FAQ_ITEMS" :key="item.id" class="py-5">
          <button
            type="button"
            :aria-expanded="openId === item.id"
            @click="toggle(item.id)"
            class="w-full flex items-center justify-between gap-4 text-left cursor-pointer py-1"
          >
            <span class="font-display text-sm sm:text-base font-semibold text-[#0D0D0F]">
              {{ t(item.question) }}
            </span>
            <ChevronDown
              class="w-4 h-4 text-[#0D0D0F]/60 shrink-0 transition-transform duration-200"
              :class="openId === item.id ? 'rotate-180 text-[#FF3B1D]' : ''"
            />
          </button>
          <p
            v-if="openId === item.id"
            class="mt-3 text-sm text-[#0D0D0F]/75 leading-relaxed pr-8"
          >
            {{ t(item.answer) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
