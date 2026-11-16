<script setup lang="ts">
import { ref } from 'vue';
import { ArrowUpRight } from 'lucide-vue-next';
import { FRONTEND_COURSES, type FrontendCourse } from '../data/frontendCourses';
import { getCourseLevel, getCourseTitle } from '../data/courseLocalizations';
import { PAGES_COPY } from '../i18n/pagesTranslations';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const emit = defineEmits<{
  (e: 'openCourse', course: FrontendCourse): void;
}>();

const { locale, t } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-white text-[#0D0D0F] py-20 lg:py-24 border-t border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
      <div class="reveal-item space-y-3 max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
          {{ t(PAGES_COPY.curriculumMatrix.kicker) }}
        </p>
        <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
          {{ t(PAGES_COPY.curriculumMatrix.title) }}
        </h2>
      </div>

      <div class="reveal-item overflow-x-auto rounded-2xl border border-black/10 bg-[#FAF9F6]">
        <table class="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr class="border-b border-black/10 text-[11px] font-mono uppercase tracking-wider text-[#0D0D0F]/55">
              <th class="py-4 px-5">{{ t(PAGES_COPY.curriculumMatrix.cols.course) }}</th>
              <th class="py-4 px-5">{{ t(PAGES_COPY.curriculumMatrix.cols.level) }}</th>
              <th class="py-4 px-5">{{ t(PAGES_COPY.curriculumMatrix.cols.stack) }}</th>
              <th class="py-4 px-5">{{ t(PAGES_COPY.curriculumMatrix.cols.capstone) }}</th>
              <th class="py-4 px-5 text-right">{{ t(PAGES_COPY.curriculumMatrix.cols.action) }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/8 text-sm">
            <tr
              v-for="course in FRONTEND_COURSES"
              :key="course.id"
              class="hover:bg-white transition-colors"
            >
              <td class="py-4 px-5 font-semibold text-[#0D0D0F]">
                <span class="font-mono text-xs text-[#FF3B1D] mr-2">{{ course.code }}</span>
                <span>{{ getCourseTitle(course, locale) }}</span>
              </td>
              <td class="py-4 px-5 font-mono text-xs text-[#0D0D0F]/70">
                {{ getCourseLevel(course, locale) }}
              </td>
              <td class="py-4 px-5 text-xs text-[#0D0D0F]/70">
                {{ course.skills.slice(0, 3).join(' · ') }}
              </td>
              <td class="py-4 px-5 text-xs text-[#0D0D0F]/80">
                {{
                  PAGES_COPY.curriculumMatrix.capstones[course.id]
                    ? t(PAGES_COPY.curriculumMatrix.capstones[course.id])
                    : ''
                }}
              </td>
              <td class="py-4 px-5 text-right">
                <button
                  type="button"
                  @click="emit('openCourse', course)"
                  class="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{{ t(PAGES_COPY.curriculumMatrix.openBtn) }}</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
