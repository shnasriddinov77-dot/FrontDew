<script setup lang="ts">
import { computed } from 'vue';
import type { TechLogoId } from '../utils/pedagogyAnalyzer';

const props = withDefaults(
  defineProps<{
    tech: TechLogoId;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
  }>(),
  {
    size: 'sm',
    showLabel: false,
  }
);

const TECH_META: Record<TechLogoId, { name: string; color: string }> = {
  html: { name: 'HTML5', color: '#E34F26' },
  css: { name: 'CSS3', color: '#1572B6' },
  js: { name: 'JavaScript', color: '#F7DF1E' },
  ts: { name: 'TypeScript', color: '#3178C6' },
  vue: { name: 'Vue 3', color: '#42B883' },
  nuxt: { name: 'Nuxt 3', color: '#00DC82' },
  gsap: { name: 'GSAP', color: '#88CE02' },
  tailwind: { name: 'Tailwind', color: '#06B6D4' },
};

const meta = computed(() => TECH_META[props.tech]);

const boxClass = computed(() => {
  if (props.size === 'lg') return 'w-11 h-11';
  if (props.size === 'md') return 'w-7 h-7';
  return 'w-5 h-5';
});
</script>

<template>
  <span class="inline-flex items-center gap-1.5 shrink-0">
    <span
      class="inline-flex items-center justify-center shrink-0"
      :class="boxClass"
      :title="meta.name"
    >
      <!-- HTML5 Shield Logo -->
      <svg v-if="tech === 'html'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <path d="M5 3L7 26L16 29L25 26L27 3H5Z" fill="#E34F26" />
        <path d="M16 5V26.9L23.2 24.7L24.9 5H16Z" fill="#EF652A" />
        <path d="M16 12.5H11.8L11.5 9.5H16V6.6H8.5L9.3 15.5H16V12.5ZM16 20.5L12.6 19.6L12.4 17H9.4L9.8 21.9L16 23.6V20.5Z" fill="#FFFFFF" />
        <path d="M16 12.5V15.5H19.8L19.4 19.6L16 20.5V23.6L22.2 21.9L22.9 12.5H16ZM16 6.6V9.5H23.2L23.5 6.6H16Z" fill="#EBEBEB" />
      </svg>

      <!-- CSS3 Shield Logo -->
      <svg v-else-if="tech === 'css'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <path d="M5 3L7 26L16 29L25 26L27 3H5Z" fill="#1572B6" />
        <path d="M16 5V26.9L23.2 24.7L24.9 5H16Z" fill="#33A9DC" />
        <path d="M16 12.5H10.5L10.8 15.5H16V12.5ZM16 6.6H8.8L9.1 9.5H16V6.6ZM16 20.5L12.6 19.6L12.4 17.2H9.4L9.8 21.9L16 23.6V20.5Z" fill="#FFFFFF" />
        <path d="M16 12.5V15.5H19.7L19.3 19.6L16 20.5V23.6L22.2 21.9L23.3 6.6H16V9.5H20.1L19.8 12.5H16Z" fill="#EBEBEB" />
      </svg>

      <!-- JavaScript Official Square Mark -->
      <svg v-else-if="tech === 'js'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#F7DF1E" />
        <path
          d="M17.2 23.4C17.8 24.5 18.8 25.3 20.3 25.3C21.6 25.3 22.5 24.6 22.5 23.7C22.5 22.6 21.6 22.2 20.1 21.5L19.2 21.1C16.8 20.1 15.3 18.8 15.3 16.2C15.3 13.7 17.2 11.9 20.1 11.9C22.2 11.9 23.7 12.6 24.7 14.5L22.2 16.1C21.7 15.1 21.1 14.7 20.1 14.7C19.1 14.7 18.5 15.3 18.5 16.1C18.5 17 19.1 17.4 20.6 18.1L21.5 18.5C24.3 19.7 25.9 20.9 25.9 23.6C25.9 26.6 23.5 28.2 20.3 28.2C17.2 28.2 15.2 26.7 14.3 24.9L17.2 23.4ZM8.6 23.6C9.1 24.5 9.6 25.3 10.8 25.3C11.9 25.3 12.6 24.9 12.6 23.1V12.2H15.8V23.2C15.8 26.6 13.8 28.1 11 28.1C8.4 28.1 6.9 26.8 6.1 25.2L8.6 23.6Z"
          fill="#0D0D0F"
        />
      </svg>

      <!-- TypeScript Official Square Mark -->
      <svg v-else-if="tech === 'ts'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#3178C6" />
        <path
          d="M19.8 15.4V12.8H8.6V15.4H12.7V26.2H15.7V15.4H19.8ZM21.4 22.8C22 23.4 23 23.9 24.1 23.9C25.2 23.9 25.8 23.4 25.8 22.7C25.8 22 25.2 21.6 23.8 21.1C21.6 20.3 20.2 19.1 20.2 16.9C20.2 14.5 22.1 12.7 25 12.7C26.5 12.7 27.6 13.1 28.4 13.5L27.5 16C26.9 15.7 26.1 15.3 25.1 15.3C24 15.3 23.4 15.8 23.4 16.4C23.4 17.1 24.1 17.4 25.6 18C27.9 18.8 29.1 20.1 29.1 22.3C29.1 24.8 27.2 26.5 24 26.5C22.4 26.5 20.9 26.1 20.1 25.5L21.4 22.8Z"
          fill="#FFFFFF"
        />
      </svg>

      <!-- Vue 3 Official Chevron Logo -->
      <svg v-else-if="tech === 'vue'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <path d="M2 5H8L16 18.8L24 5H30L16 29L2 5Z" fill="#42B883" />
        <path d="M8 5H13L16 10.3L19 5H24L16 18.8L8 5Z" fill="#35495E" />
      </svg>

      <!-- Nuxt 3 Official Mountain Logo -->
      <svg v-else-if="tech === 'nuxt'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <path
          d="M17.5 25.5H28.2C28.8 25.5 29.3 25.2 29.6 24.7C29.9 24.2 29.9 23.6 29.6 23.1L22.5 10.8C22.2 10.3 21.7 10 21.1 10C20.5 10 20 10.3 19.7 10.8L17.5 14.6L13.1 7C12.8 6.5 12.3 6.2 11.7 6.2C11.1 6.2 10.6 6.5 10.3 7L2.4 23.1C2.1 23.6 2.1 24.2 2.4 24.7C2.7 25.2 3.2 25.5 3.8 25.5H10.5C13.2 25.5 15.1 24.3 16.5 21.9L19.7 16.4L21.1 14L25.5 21.6H19.8L17.5 25.5ZM10.3 21.6H6.6L11.7 12.2L15.4 18.6L14 21C13.1 22.3 12 21.6 10.3 21.6Z"
          fill="#00DC82"
        />
      </svg>

      <!-- GSAP Emblem Logo -->
      <svg v-else-if="tech === 'gsap'" viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#0E100F" />
        <path
          d="M22.8 11.5C21.3 9.7 19 8.7 16.2 8.7C11.4 8.7 8 12.1 8 16.4C8 20.8 11.4 23.8 16.3 23.8C20.4 23.8 23.5 21.4 24 17.2H16.2V14.3H27.2C27.3 14.9 27.3 15.5 27.3 16.2C27.3 22.8 22.8 27 16.2 27C9.7 27 4.7 22.4 4.7 16.3C4.7 10.1 9.8 5.4 16.3 5.4C20.1 5.4 23.3 7 25.4 9.5L22.8 11.5Z"
          fill="#0AE448"
        />
      </svg>

      <!-- Tailwind CSS Twin Waves Logo -->
      <svg v-else viewBox="0 0 32 32" fill="none" class="w-full h-full" aria-hidden="true">
        <path
          d="M16 7.5C11.7 7.5 9.1 9.6 8 13.8C9.6 11.7 11.4 10.9 13.5 11.4C14.7 11.7 15.6 12.6 16.5 13.5C18.1 15.1 19.9 16.9 23.8 16.9C28.1 16.9 30.7 14.8 31.8 10.6C30.2 12.7 28.4 13.5 26.3 13C25.1 12.7 24.2 11.8 23.3 10.9C21.7 9.3 19.9 7.5 16 7.5ZM8.2 16.9C3.9 16.9 1.3 19 0.2 23.2C1.8 21.1 3.6 20.3 5.7 20.8C6.9 21.1 7.8 22 8.7 22.9C10.3 24.5 12.1 26.3 16 26.3C20.3 26.3 22.9 24.2 24 20C22.4 22.1 20.6 22.9 18.5 22.4C17.3 22.1 16.4 21.2 15.5 20.3C13.9 18.7 12.1 16.9 8.2 16.9Z"
          fill="#06B6D4"
        />
      </svg>
    </span>

    <span v-if="showLabel" class="font-mono text-xs font-medium text-current whitespace-nowrap">
      {{ meta.name }}
    </span>
  </span>
</template>
