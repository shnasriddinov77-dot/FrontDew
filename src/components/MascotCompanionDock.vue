<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { X, MessageSquare } from 'lucide-vue-next';
import FrontDevMascot from './FrontDevMascot.vue';
import { useMascot } from '../composables/useMascot';
import { useI18n } from '../composables/useI18n';
import { getMascotIdleLine } from '../utils/mascotGestures';

const {
  currentGesture,
  currentSpeech,
  speechVisible,
  isMinimized,
  gestureTick,
  triggerMascot,
  dismissSpeech,
  toggleMinimized,
} = useMascot();

const { locale, t } = useI18n();
const bubbleRef = ref<HTMLElement | null>(null);

const activeText = computed(() => {
  if (currentSpeech.value) return t(currentSpeech.value);
  return getMascotIdleLine(locale.value);
});

const toggleAriaLabel = computed(() => {
  if (locale.value === 'uz') return isMinimized.value ? 'Robot yordamchini ochish' : 'Robot yordamchini yig‘ish';
  if (locale.value === 'ru') return isMinimized.value ? 'Открыть робота-гида' : 'Свернуть робота-гида';
  return isMinimized.value ? 'Open robot guide' : 'Minimize robot guide';
});

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && bubbleRef.value) {
    gsap.from(bubbleRef.value, {
      y: 12,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
    });
  }
});

onUnmounted(() => {
  dismissSpeech();
});
</script>

<template>
  <aside
    aria-label="FrontDev Robot Guide"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
  >
    <!-- Speech Bubble on Interaction -->
    <div
      v-if="speechVisible && !isMinimized"
      ref="bubbleRef"
      role="status"
      class="pointer-events-auto max-w-[260px] sm:max-w-[290px] bg-[#0A0A0C] text-[#F4F4F0] border border-white/15 rounded-2xl p-3.5 shadow-2xl space-y-1.5"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="font-mono text-[10px] uppercase tracking-wider text-[#FF3B1D]">
          FrontDev Bot · {{ currentGesture }}
        </span>
        <button
          type="button"
          aria-label="Close mascot tip"
          @click="dismissSpeech"
          class="p-0.5 text-white/55 hover:text-white cursor-pointer"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
      <p class="text-xs text-[#F4F4F0]/90 leading-relaxed">
        {{ activeText }}
      </p>
    </div>

    <!-- Compact Interactive Mascot Dock -->
    <div class="pointer-events-auto flex items-end gap-2">
      <button
        v-if="isMinimized"
        type="button"
        :aria-label="toggleAriaLabel"
        @click="toggleMinimized"
        class="w-12 h-12 rounded-2xl bg-[#0A0A0C] text-white border border-white/15 shadow-xl flex items-center justify-center hover:border-[#FF3B1D] transition-colors cursor-pointer"
      >
        <MessageSquare class="w-5 h-5 text-[#FF3B1D]" />
      </button>

      <div
        v-else
        class="relative bg-white border border-black/15 rounded-2xl p-1.5 shadow-xl flex items-center gap-1"
      >
        <FrontDevMascot
          size="sm"
          :gesture="currentGesture"
          :tick="gestureTick"
          :label="getMascotIdleLine(locale)"
          @click="triggerMascot('click-mascot')"
        />
        <button
          type="button"
          :aria-label="toggleAriaLabel"
          @click="toggleMinimized"
          class="self-start p-1 rounded-lg text-[#0D0D0F]/45 hover:text-[#0D0D0F] cursor-pointer"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </aside>
</template>
