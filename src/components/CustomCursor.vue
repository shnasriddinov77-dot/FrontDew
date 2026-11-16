<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const enabled = ref(false);
const visible = ref(false);
const cursorLabel = ref('');
const isInteractive = ref(false);
const pos = ref({ x: -100, y: -100 });

let targetX = -100;
let targetY = -100;
let currentX = -100;
let currentY = -100;
let rafId: number | null = null;

function lerp(a: number, b: number, n: number): number {
  return a + (b - a) * n;
}

function tick() {
  currentX = lerp(currentX, targetX, 0.22);
  currentY = lerp(currentY, targetY, 0.22);
  pos.value = { x: currentX, y: currentY };
  rafId = requestAnimationFrame(tick);
}

function updateHoverState(target: HTMLElement | null) {
  if (!target) {
    cursorLabel.value = '';
    isInteractive.value = false;
    return;
  }
  const cursorNode = target.closest<HTMLElement>('[data-cursor]');
  if (cursorNode) {
    cursorLabel.value = cursorNode.dataset.cursor || '';
    isInteractive.value = true;
  } else if (target.closest('a, button, input, select')) {
    cursorLabel.value = '';
    isInteractive.value = true;
  } else {
    cursorLabel.value = '';
    isInteractive.value = false;
  }
}

function handlePointerMove(e: PointerEvent) {
  if (!enabled.value) return;
  targetX = e.clientX;
  targetY = e.clientY;
  if (!visible.value) {
    currentX = e.clientX;
    currentY = e.clientY;
    visible.value = true;
  }
  updateHoverState(e.target as HTMLElement | null);
}

function handlePointerDown() {
  cursorLabel.value = '';
  isInteractive.value = false;
}

function handleScroll() {
  cursorLabel.value = '';
}

function handlePointerLeave() {
  visible.value = false;
  cursorLabel.value = '';
}

function checkEnabled() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.innerWidth >= 1024;
  enabled.value = finePointer && !reducedMotion && isDesktop;
  if (!enabled.value) {
    visible.value = false;
    cursorLabel.value = '';
  }
}

onMounted(() => {
  checkEnabled();
  window.addEventListener('resize', checkEnabled, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('mouseleave', handlePointerLeave);
  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkEnabled);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerdown', handlePointerDown);
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('mouseleave', handlePointerLeave);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    v-if="enabled && visible"
    aria-hidden="true"
    class="fixed top-0 left-0 z-[100] pointer-events-none select-none will-change-transform"
    :style="{
      transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    }"
  >
    <div
      class="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-150 ease-out rounded-full"
      :class="[
        cursorLabel
          ? 'w-20 h-20 bg-[#FF3B1D] text-white shadow-lg'
          : isInteractive
            ? 'w-9 h-9 border-2 border-[#FF3B1D] bg-[#FF3B1D]/10'
            : 'w-4 h-4 bg-[#FF3B1D]/85',
      ]"
    >
      <span
        v-if="cursorLabel"
        class="font-mono text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap"
      >
        {{ cursorLabel }}
      </span>
    </div>
  </div>
</template>
