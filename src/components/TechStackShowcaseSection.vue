<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowUpRight } from 'lucide-vue-next';
import TechLogo from './TechLogo.vue';
import type { TechLogoId } from '../utils/pedagogyAnalyzer';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';
import { FRONTEND_COURSES, type FrontendCourse } from '../data/frontendCourses';

const emit = defineEmits<{
  (e: 'openCourse', course: FrontendCourse): void;
}>();

const { locale, t } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);

interface StackItem {
  tech: TechLogoId;
  name: string;
  role: { uz: string; ru: string; en: string };
  courseId: string;
}

const STACK_ITEMS: StackItem[] = [
  {
    tech: 'html',
    name: 'HTML5',
    role: { uz: 'Semantik struktura', ru: 'Семантика и A11y', en: 'Semantic markup' },
    courseId: 'html-css-foundations',
  },
  {
    tech: 'css',
    name: 'CSS3',
    role: { uz: 'Grid & Flex maketlar', ru: 'Сетки Grid & Flex', en: 'Grid & Flex layouts' },
    courseId: 'html-css-foundations',
  },
  {
    tech: 'js',
    name: 'JavaScript',
    role: { uz: 'ES6+ mantiq va DOM', ru: 'Логика ES6+ и DOM', en: 'ES6+ logic & DOM' },
    courseId: 'vue-3-architecture',
  },
  {
    tech: 'ts',
    name: 'TypeScript',
    role: { uz: 'Qat’iy tiplar va SDK', ru: 'Строгая типизация', en: 'Strict type safety' },
    courseId: 'typescript-systems',
  },
  {
    tech: 'vue',
    name: 'Vue 3',
    role: { uz: 'Composition API & Pinia', ru: 'Reactivity & Pinia', en: 'Composition API' },
    courseId: 'vue-3-architecture',
  },
  {
    tech: 'nuxt',
    name: 'Nuxt 3',
    role: { uz: 'SSR & Nitro Server', ru: 'SSR и Nitro API', en: 'Fullstack SSR' },
    courseId: 'nuxt-fullstack',
  },
  {
    tech: 'gsap',
    name: 'GSAP 3',
    role: { uz: '60 FPS skroll-animatsiya', ru: '60 FPS анимации', en: '60 FPS choreography' },
    courseId: 'creative-gsap-webgl',
  },
  {
    tech: 'tailwind',
    name: 'Tailwind v4',
    role: { uz: 'Dizayn token tizimi', ru: 'Дизайн-токены UI', en: 'Design token CSS' },
    courseId: 'design-systems-tailwind',
  },
];

const copyBlock = computed(() => ({
  kicker: t({
    uz: 'Dasturlash tillari va texnologiya steki',
    ru: 'Языки программирования и стек FrontDev',
    en: 'Official Languages & Engineering Stack',
  }),
  title: t({
    uz: 'Har bir til o‘z logotipi, nazariy tahlili va jonli kod muharriri bilan o‘qitiladi',
    ru: 'Каждый язык изучается с живым разбором, схемой и автоматической проверкой кода',
    en: 'Every language taught through mental models, visual logos, and live verified coding',
  }),
  openLabel: t({
    uz: 'Darsga o‘tish',
    ru: 'К урокам',
    en: 'Open track',
  }),
}));

function handleOpen(courseId: string) {
  const course = FRONTEND_COURSES.find((c) => c.id === courseId) || FRONTEND_COURSES[0];
  emit('openCourse', course);
}
</script>

<template>
  <section ref="sectionRef" class="bg-[#FAF9F6] text-[#0D0D0F] py-16 lg:py-20 border-b border-black/10">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
      <div class="reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div class="space-y-2.5 max-w-3xl">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ copyBlock.kicker }}
          </p>
          <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
            {{ copyBlock.title }}
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
        <button
          v-for="item in STACK_ITEMS"
          :key="item.tech"
          type="button"
          @click="handleOpen(item.courseId)"
          class="reveal-item group text-left bg-white rounded-2xl border border-black/10 p-4 flex flex-col justify-between gap-4 hover:border-[#0D0D0F] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <TechLogo :tech="item.tech" size="lg" />
            <ArrowUpRight class="w-4 h-4 text-[#0D0D0F]/30 group-hover:text-[#FF3B1D] transition-colors" />
          </div>

          <div class="space-y-0.5">
            <div class="font-display text-sm font-bold text-[#0D0D0F]">
              {{ item.name }}
            </div>
            <div class="text-[11px] text-[#0D0D0F]/60 leading-snug">
              {{ item.role[locale] }}
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
