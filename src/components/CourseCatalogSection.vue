<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ArrowUpRight, Lock, Search, CheckCircle2, X } from 'lucide-vue-next';
import {
  FRONTEND_COURSES,
  type CourseCategory,
  type CourseTierFilter,
  type FrontendCourse,
} from '../data/frontendCourses';
import {
  getCourseCategoryLabel,
  getCourseLevel,
  getCourseSubtitle,
  getCourseTitle,
} from '../data/courseLocalizations';
import { filterCourses, getCourseLessonsCount } from '../utils/academyLogic';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';
import TechLogo from './TechLogo.vue';
import { getCourseTechLogos } from '../utils/pedagogyAnalyzer';

const emit = defineEmits<{
  (e: 'openCourse', course: FrontendCourse): void;
  (e: 'buyCourse', course: FrontendCourse): void;
}>();

const { canAccessCourse, getCourseProgress } = useAcademyStore();
const { locale, t, formatCoursePrice, formatLessonCount, copy } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);

const selectedCategory = ref<CourseCategory>('all');
const selectedTier = ref<CourseTierFilter>('all');
const searchQuery = ref('');
const failedImages = reactive<Record<string, boolean>>({});
const cardTilts = reactive<Record<string, string>>({});

const categories = computed<{ id: CourseCategory; label: string }[]>(() => [
  { id: 'all', label: t(copy.catalog.categories.all) },
  { id: 'vue', label: t(copy.catalog.categories.vue) },
  { id: 'motion', label: t(copy.catalog.categories.motion) },
  { id: 'architecture', label: t(copy.catalog.categories.architecture) },
  { id: 'ui', label: t(copy.catalog.categories.ui) },
]);

const tierTabs = computed<{ id: CourseTierFilter; label: string }[]>(() => [
  { id: 'all', label: t(copy.catalog.tiers.all) },
  { id: 'free', label: t(copy.catalog.tiers.free) },
  { id: 'pro', label: t(copy.catalog.tiers.pro) },
]);

const filteredCourses = computed(() => {
  const baseMatches = filterCourses(FRONTEND_COURSES, {
    category: selectedCategory.value,
    tier: selectedTier.value,
    search: '',
  });
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return baseMatches;
  return baseMatches.filter((course) => {
    const lTitle = getCourseTitle(course, locale.value).toLowerCase();
    const lSub = getCourseSubtitle(course, locale.value).toLowerCase();
    return (
      lTitle.includes(q) ||
      lSub.includes(q) ||
      course.title.toLowerCase().includes(q) ||
      course.skills.some((s) => s.toLowerCase().includes(q)) ||
      course.code.toLowerCase().includes(q)
    );
  });
});

function resetFilters() {
  selectedCategory.value = 'all';
  selectedTier.value = 'all';
  searchQuery.value = '';
}

function handleCardMove(courseId: string, e: MouseEvent) {
  const target = e.currentTarget as HTMLElement | null;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  cardTilts[courseId] = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
}

function handleCardLeave(courseId: string) {
  cardTilts[courseId] = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
}
</script>

<template>
  <section id="catalog" ref="sectionRef" class="bg-[#F4F4F0] text-[#0D0D0F] py-20 lg:py-28">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
      <!-- Catalog Header -->
      <div class="reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10">
        <div class="space-y-3 max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ t(copy.catalog.kicker) }}
          </p>
          <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
            {{ t(copy.catalog.title) }}
          </h2>
          <p class="text-sm sm:text-base text-[#0D0D0F]/70">
            {{ t(copy.catalog.subtitle) }}
          </p>
        </div>

        <div class="font-mono text-xs text-[#0D0D0F]/60 tabular-nums whitespace-nowrap">
          {{ t(copy.catalog.foundLabel) }}: {{ filteredCourses.length }} {{ t(copy.catalog.ofLabel) }} {{ FRONTEND_COURSES.length }}
        </div>
      </div>

      <!-- Interactive Filters & Search Bar -->
      <div class="reveal-item flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAEAE4] rounded-xl border border-black/8">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            @click="selectedCategory = cat.id"
            class="px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            :class="
              selectedCategory === cat.id
                ? 'bg-[#0D0D0F] text-white'
                : 'text-[#0D0D0F]/70 hover:text-[#0D0D0F]'
            "
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="flex items-center gap-1 p-1 bg-[#EAEAE4] rounded-xl border border-black/8">
            <button
              v-for="tItem in tierTabs"
              :key="tItem.id"
              type="button"
              @click="selectedTier = tItem.id"
              class="px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              :class="
                selectedTier === tItem.id
                  ? 'bg-white text-[#0D0D0F] shadow-sm'
                  : 'text-[#0D0D0F]/65 hover:text-[#0D0D0F]'
              "
            >
              {{ tItem.label }}
            </button>
          </div>

          <div class="relative min-w-[260px]">
            <label for="catalog-search" class="sr-only">{{ t(copy.catalog.searchPlaceholder) }}</label>
            <Search class="w-4 h-4 text-[#0D0D0F]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="catalog-search"
              v-model="searchQuery"
              type="text"
              :placeholder="t(copy.catalog.searchPlaceholder)"
              class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-black/12 text-xs text-[#0D0D0F] placeholder:text-[#0D0D0F]/40 focus:outline-none focus:border-[#FF3B1D] transition-colors"
            />
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Clear search"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#0D0D0F]/50 hover:text-[#0D0D0F] cursor-pointer"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Course Grid -->
      <div
        v-if="filteredCourses.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <article
          v-for="course in filteredCourses"
          :key="course.id"
          :data-cursor="t(copy.catalog.cursorOpen)"
          @mousemove="handleCardMove(course.id, $event)"
          @mouseleave="handleCardLeave(course.id)"
          :style="{ transform: cardTilts[course.id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }"
          class="reveal-item group bg-white rounded-2xl border border-black/10 overflow-hidden flex flex-col justify-between transition-transform duration-200 ease-out will-change-transform"
        >
          <div>
            <!-- 4:3 Editorial Cover -->
            <div class="relative aspect-[4/3] w-full overflow-hidden bg-[#141417]">
              <img
                v-if="!failedImages[course.id]"
                :src="course.coverImage"
                :alt="getCourseTitle(course, locale)"
                referrerpolicy="no-referrer"
                @error="failedImages[course.id] = true"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                v-else
                class="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#16161B] to-[#26120F] text-white"
              >
                <span class="font-mono text-xs text-[#FF3B1D]">{{ course.code }}</span>
                <span class="font-display text-lg font-bold">{{ getCourseTitle(course, locale) }}</span>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between text-xs text-[#0D0D0F]/60 font-mono tabular-nums">
                <span>{{ course.indexLabel }} {{ getCourseCategoryLabel(course, locale) }}</span>
                <span>{{ getCourseLevel(course, locale) }}</span>
              </div>

              <div class="space-y-2">
                <h3 class="font-display text-lg font-bold text-[#0D0D0F] leading-snug group-hover:text-[#FF3B1D] transition-colors">
                  {{ getCourseTitle(course, locale) }}
                </h3>
                <p class="text-sm text-[#0D0D0F]/70 leading-relaxed line-clamp-2">
                  {{ getCourseSubtitle(course, locale) }}
                </p>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-2 pt-1.5">
                <div class="flex flex-wrap items-center gap-2 text-xs text-[#0D0D0F]/60 tabular-nums">
                  <span>{{ course.durationHours }} {{ t(copy.catalog.hoursShort) }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ formatLessonCount(getCourseLessonsCount(course)) }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ t(copy.catalog.ratingLabel) }} {{ course.rating.toFixed(1) }}</span>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <TechLogo
                    v-for="tech in getCourseTechLogos(course.id)"
                    :key="tech"
                    :tech="tech"
                    size="sm"
                  />
                </div>
              </div>

              <div
                v-if="getCourseProgress(course).completedCount > 0"
                class="pt-2 space-y-1.5"
              >
                <div class="flex justify-between text-xs font-mono tabular-nums text-[#0D0D0F]/75">
                  <span>{{ t(copy.catalog.progressLabel) }}</span>
                  <span>{{ getCourseProgress(course).percent }}%</span>
                </div>
                <div class="w-full h-1.5 bg-[#EAEAE4] rounded-full overflow-hidden">
                  <div
                    class="h-full bg-[#0047FF] transition-all duration-300"
                    :style="{ width: `${getCourseProgress(course).percent}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Card Footer Actions -->
          <div class="px-6 py-4 border-t border-black/8 flex items-center justify-between gap-4">
            <div>
              <div
                v-if="canAccessCourse(course)"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]"
              >
                <CheckCircle2 class="w-4 h-4 shrink-0" />
                <span>{{ course.isFree ? t(copy.catalog.freeLabel) : t(copy.catalog.unlockedLabel) }}</span>
              </div>
              <div v-else class="space-y-0.5">
                <div class="font-display text-base font-bold text-[#0D0D0F] tabular-nums">
                  {{ formatCoursePrice(course.priceRub) }}
                </div>
                <div class="inline-flex items-center gap-1 text-[11px] text-[#0D0D0F]/55">
                  <Lock class="w-3 h-3" />
                  <span>{{ t(copy.catalog.orProLabel) }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                v-if="!canAccessCourse(course)"
                type="button"
                @click="emit('buyCourse', course)"
                class="px-3.5 py-2 rounded-lg border border-black/15 text-xs font-semibold text-[#0D0D0F] hover:border-[#FF3B1D] hover:text-[#FF3B1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {{ t(copy.catalog.buyBtn) }}
              </button>
              <button
                type="button"
                @click="emit('openCourse', course)"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{{ canAccessCourse(course) ? t(copy.catalog.learnBtn) : t(copy.catalog.syllabusBtn) }}</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty Search State -->
      <div
        v-else
        class="py-16 px-6 rounded-2xl border border-dashed border-black/20 text-center space-y-4 bg-white/60"
      >
        <h3 class="font-display text-lg font-bold text-[#0D0D0F]">
          {{ t(copy.catalog.emptyTitle) }}
        </h3>
        <p class="text-sm text-[#0D0D0F]/65 max-w-md mx-auto">
          {{ t(copy.catalog.emptyHint) }}
        </p>
        <button
          type="button"
          @click="resetFilters"
          class="px-5 py-2.5 rounded-lg bg-[#0D0D0F] text-white text-xs font-semibold hover:bg-[#FF3B1D] transition-colors cursor-pointer"
        >
          {{ t(copy.catalog.resetBtn) }}
        </button>
      </div>
    </div>
  </section>
</template>
