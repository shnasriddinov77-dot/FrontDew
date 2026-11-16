<script setup lang="ts">
const items = [
  'FrontDev Academy',
  'HTML5 & CSS Grid',
  'TypeScript Systems',
  'Vue 3.5 Composition API',
  'GSAP Choreography',
  'Nuxt 3 SSR',
  'Creative Canvas & Motion',
];
</script>

<template>
  <div
    class="w-full overflow-hidden border-y border-black/10 bg-[#0D0D0F] text-[#F4F4F0] py-3.5 select-none"
    aria-hidden="true"
  >
    <div class="animate-marquee flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em]">
      <template v-for="repeat in 2" :key="repeat">
        <div
          v-for="(item, idx) in items"
          :key="`${repeat}-${idx}`"
          class="flex items-center gap-10 whitespace-nowrap"
        >
          <span>{{ item }}</span>
          <span class="text-[#FF3B1D]">/</span>
        </div>
      </template>
    </div>
  </div>
</template>
