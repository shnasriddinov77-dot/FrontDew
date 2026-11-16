<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowRight, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-vue-next';
import { FRONTEND_COURSES, type FrontendCourse } from '../data/frontendCourses';
import { getCourseCategoryLabel, getCourseLevel, getCourseSubtitle, getCourseTitle } from '../data/courseLocalizations';
import { PAGES_COPY } from '../i18n/pagesTranslations';
import { getCourseLessonsCount } from '../utils/academyLogic';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';
import TechLogo from './TechLogo.vue';
import { getCourseTechLogos } from '../utils/pedagogyAnalyzer';

const emit = defineEmits<{
  (e: 'openCourse', course: FrontendCourse): void;
  (e: 'buyCourse', course: FrontendCourse): void;
  (e: 'viewAllCourses'): void;
}>();

const { canAccessCourse } = useAcademyStore();
const { locale, t, formatCoursePrice, formatLessonCount, copy } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);

const featuredCourses = computed(() => FRONTEND_COURSES.slice(0, 3));
</script>

<template>
  <section
    id="featured-tracks"
    ref="sectionRef"
    class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28 border-b border-black/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
      <div class="reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10">
        <div class="space-y-3 max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ t(PAGES_COPY.featured.kicker) }}
          </p>
          <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
            {{ t(PAGES_COPY.featured.title) }}
          </h2>
        </div>

        <button
          type="button"
          @click="emit('viewAllCourses')"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto"
        >
          <span>{{ t(PAGES_COPY.featured.viewAllBtn) }}</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="course in featuredCourses"
          :key="course.id"
          class="reveal-item bg-white rounded-2xl border border-black/10 overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div class="aspect-[4/3] w-full overflow-hidden bg-[#141417]">
              <img
                :src="course.coverImage"
                :alt="getCourseTitle(course, locale)"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-6 space-y-3">
              <div class="flex items-center justify-between text-xs font-mono text-[#0D0D0F]/60">
                <span>{{ course.indexLabel }} {{ getCourseCategoryLabel(course, locale) }}</span>
                <span>{{ getCourseLevel(course, locale) }}</span>
              </div>
              <h3 class="font-display text-lg font-bold text-[#0D0D0F]">
                {{ getCourseTitle(course, locale) }}
              </h3>
              <p class="text-sm text-[#0D0D0F]/70 leading-relaxed line-clamp-2">
                {{ getCourseSubtitle(course, locale) }}
              </p>
              <div class="flex flex-wrap items-center justify-between gap-2 pt-1.5">
                <div class="text-xs text-[#0D0D0F]/55 font-mono tabular-nums">
                  {{ course.durationHours }} {{ t(copy.catalog.hoursShort) }} · {{ formatLessonCount(getCourseLessonsCount(course)) }}
                </div>
                <div class="flex items-center gap-1.5">
                  <TechLogo
                    v-for="tech in getCourseTechLogos(course.id)"
                    :key="tech"
                    :tech="tech"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-black/8 flex items-center justify-between gap-3">
            <div v-if="canAccessCourse(course)" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
              <CheckCircle2 class="w-4 h-4" />
              <span>{{ t(copy.catalog.unlockedLabel) }}</span>
            </div>
            <div v-else class="inline-flex items-center gap-1.5 font-display text-sm font-bold tabular-nums">
              <Lock class="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>{{ formatCoursePrice(course.priceRub) }}</span>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="!canAccessCourse(course)"
                type="button"
                @click="emit('buyCourse', course)"
                class="px-3 py-2 rounded-lg border border-black/15 hover:border-[#FF3B1D] hover:text-[#FF3B1D] text-xs font-semibold transition-colors cursor-pointer"
              >
                {{ t(copy.catalog.buyBtn) }}
              </button>
              <button
                type="button"
                @click="emit('openCourse', course)"
                class="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>{{ canAccessCourse(course) ? t(copy.catalog.learnBtn) : t(copy.catalog.syllabusBtn) }}</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
