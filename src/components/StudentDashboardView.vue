<script setup lang="ts">
import { computed, ref } from 'vue';
import { Award, ArrowUpRight, LogOut, Sparkles } from 'lucide-vue-next';
import { FRONTEND_COURSES, type FrontendCourse } from '../data/frontendCourses';
import { getCourseCategoryLabel, getCourseTitle, SUBSCRIPTION_LOCALIZATIONS } from '../data/courseLocalizations';
import { useAcademyStore, type EarnedCertificate } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';

const emit = defineEmits<{
  (e: 'openCourse', course: FrontendCourse): void;
  (e: 'openAuth'): void;
  (e: 'openSubscription'): void;
  (e: 'viewCertificate', cert: EarnedCertificate): void;
}>();

const {
  state,
  isAuthenticated,
  isProSubscriber,
  canAccessCourse,
  getCourseProgress,
  activateSubscription,
  logout,
} = useAcademyStore();

const { locale, t, copy } = useI18n();

const unlockedCourses = computed(() =>
  FRONTEND_COURSES.filter((c) => canAccessCourse(c))
);

const totalCompletedLessons = computed(
  () => Object.values(state.completedLessons).flat().length
);

const weekDays = computed(() => {
  const labels =
    locale.value === 'uz'
      ? ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']
      : locale.value === 'en'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const completed = totalCompletedLessons.value;
  return labels.map((label, idx) => ({
    label,
    minutes: idx <= Math.min(6, completed) ? 25 + ((idx + completed) % 3) * 15 : 0,
    active: idx <= Math.min(6, completed) && (completed > 0 || idx === 0),
  }));
});

const planLabel = computed(() => {
  if (state.subscriptionPlan === 'pro-annual') {
    return t(SUBSCRIPTION_LOCALIZATIONS['pro-annual'].name);
  }
  if (state.subscriptionPlan === 'pro-monthly') {
    return t(SUBSCRIPTION_LOCALIZATIONS['pro-monthly'].name);
  }
  return t(copy.dashboard.planFreeLabel);
});

const cancelFeedback = ref('');

function handleCancelSubscription() {
  activateSubscription('free');
  cancelFeedback.value = t(copy.dashboard.cancelFeedback);
}
</script>

<template>
  <section class="min-h-screen bg-[#F4F4F0] text-[#0D0D0F] py-12 lg:py-16">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <!-- If Not Logged In -->
      <div
        v-if="!isAuthenticated"
        class="bg-white rounded-2xl border border-black/10 p-10 text-center space-y-5 max-w-2xl mx-auto"
      >
        <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
          FrontDev · {{ t(copy.dashboard.kicker) }}
        </p>
        <h1 class="font-display text-2xl sm:text-3xl font-bold">
          {{ t(copy.dashboard.guestTitle) }}
        </h1>
        <p class="text-sm text-[#0D0D0F]/70">
          {{ t(copy.dashboard.guestDesc) }}
        </p>
        <button
          type="button"
          @click="emit('openAuth')"
          class="px-7 py-3.5 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {{ t(copy.nav.loginOrRegister) }}
        </button>
      </div>

      <!-- Authenticated Student Dashboard -->
      <template v-else>
        <!-- Top Profile & Subscription Summary -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div class="lg:col-span-7 bg-white rounded-2xl border border-black/10 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-[#0D0D0F] text-white font-display text-lg font-bold flex items-center justify-center">
                  {{ state.user?.initials }}
                </div>
                <div>
                  <h1 class="font-display text-xl sm:text-2xl font-bold text-[#0D0D0F]">
                    {{ state.user?.name }}
                  </h1>
                  <p class="text-xs font-mono text-[#0D0D0F]/60">
                    {{ state.user?.email }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                @click="logout"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-black/12 text-xs font-semibold text-[#0D0D0F]/75 hover:text-[#DC2626] hover:border-[#DC2626]/40 transition-colors cursor-pointer"
              >
                <LogOut class="w-3.5 h-3.5" />
                <span>{{ t(copy.dashboard.logoutBtn) }}</span>
              </button>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-black/8 tabular-nums">
              <div>
                <div class="font-display text-2xl font-bold text-[#0D0D0F]">
                  {{ unlockedCourses.length }}
                </div>
                <div class="text-xs text-[#0D0D0F]/60">{{ t(copy.dashboard.statCourses) }}</div>
              </div>
              <div>
                <div class="font-display text-2xl font-bold text-[#0D0D0F]">
                  {{ totalCompletedLessons }}
                </div>
                <div class="text-xs text-[#0D0D0F]/60">{{ t(copy.dashboard.statLessons) }}</div>
              </div>
              <div>
                <div class="font-display text-2xl font-bold text-[#FF3B1D]">
                  {{ state.certificates.length }}
                </div>
                <div class="text-xs text-[#0D0D0F]/60">{{ t(copy.dashboard.statCerts) }}</div>
              </div>
            </div>
          </div>

          <!-- Subscription Card -->
          <div class="lg:col-span-5 bg-[#0A0A0C] text-[#F4F4F0] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div class="space-y-2">
              <div class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
                {{ t(copy.dashboard.planKicker) }}
              </div>
              <div class="font-display text-2xl font-bold text-white">
                {{ planLabel }}
              </div>
              <p class="text-xs text-[#F4F4F0]/70 leading-relaxed">
                {{ isProSubscriber ? t(copy.dashboard.planProDesc) : t(copy.dashboard.planFreeDesc) }}
              </p>
              <p v-if="cancelFeedback" class="text-xs text-[#34D399] pt-1">
                {{ cancelFeedback }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                @click="emit('openSubscription')"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles class="w-3.5 h-3.5" />
                <span>{{ isProSubscriber ? t(copy.dashboard.changePlanBtn) : t(copy.dashboard.upgradeBtn) }}</span>
              </button>

              <button
                v-if="isProSubscriber"
                type="button"
                @click="handleCancelSubscription"
                class="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-white/80 hover:text-white cursor-pointer"
              >
                {{ t(copy.dashboard.cancelProBtn) }}
              </button>
            </div>
          </div>
        </div>

        <!-- Weekly Study Schedule -->
        <div class="bg-white rounded-2xl border border-black/10 p-6 sm:p-8 space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="font-display text-lg sm:text-xl font-bold text-[#0D0D0F]">
              {{ t(copy.dashboard.studyPlanTitle) }}
            </h2>
            <span class="font-mono text-xs text-[#0D0D0F]/55 tabular-nums">
              FrontDev Weekly Goal · 7 days
            </span>
          </div>

          <div class="grid grid-cols-7 gap-2.5 sm:gap-4">
            <div
              v-for="day in weekDays"
              :key="day.label"
              class="p-3 sm:p-4 rounded-xl border text-center space-y-1.5 transition-colors"
              :class="
                day.active
                  ? 'bg-[#0D0D0F] text-white border-[#0D0D0F]'
                  : 'bg-[#FAF9F6] text-[#0D0D0F]/60 border-black/10'
              "
            >
              <div class="font-mono text-xs font-semibold">{{ day.label }}</div>
              <div class="font-mono text-[11px] tabular-nums opacity-75">
                {{ day.minutes > 0 ? `${day.minutes}m` : '—' }}
              </div>
            </div>
          </div>
        </div>

        <!-- My Accessible Courses -->
        <div class="space-y-5">
          <h2 class="font-display text-xl sm:text-2xl font-bold">
            {{ t(copy.dashboard.myCoursesTitle) }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="course in unlockedCourses"
              :key="course.id"
              class="bg-white rounded-2xl border border-black/10 p-6 flex flex-col justify-between gap-5"
            >
              <div class="space-y-3">
                <div class="flex items-center justify-between text-xs font-mono text-[#0D0D0F]/55">
                  <span>{{ course.code }} · {{ getCourseCategoryLabel(course, locale) }}</span>
                  <span>{{ course.isFree ? t(copy.catalog.freeLabel) : t(copy.catalog.unlockedLabel) }}</span>
                </div>
                <h3 class="font-display text-lg font-bold text-[#0D0D0F]">
                  {{ getCourseTitle(course, locale) }}
                </h3>
                <div class="space-y-1.5 pt-2">
                  <div class="flex justify-between text-xs font-mono tabular-nums text-[#0D0D0F]/70">
                    <span>{{ t(copy.studio.completedProgress) }} {{ getCourseProgress(course).completedCount }}/{{ getCourseProgress(course).totalCount }}</span>
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

              <button
                type="button"
                @click="emit('openCourse', course)"
                class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>{{ t(copy.dashboard.continueBtn) }}</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Certificates Section -->
        <div class="space-y-5">
          <h2 class="font-display text-xl sm:text-2xl font-bold">
            {{ t(copy.dashboard.certsTitle) }}
          </h2>

          <div
            v-if="state.certificates.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div
              v-for="cert in state.certificates"
              :key="cert.id"
              class="bg-white rounded-2xl border border-black/10 p-6 flex items-center justify-between gap-4"
            >
              <div class="space-y-1">
                <div class="font-mono text-xs text-[#FF3B1D]">
                  {{ cert.id }} · {{ cert.scorePercent }}%
                </div>
                <div class="font-display text-base font-bold text-[#0D0D0F]">
                  {{ cert.courseTitle }}
                </div>
                <div class="text-xs text-[#0D0D0F]/60">
                  {{ cert.issuedAt }} · {{ cert.studentName }}
                </div>
              </div>

              <button
                type="button"
                @click="emit('viewCertificate', cert)"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
              >
                <Award class="w-4 h-4" />
                <span>{{ t(copy.dashboard.openCertBtn) }}</span>
              </button>
            </div>
          </div>

          <div
            v-else
            class="p-8 rounded-2xl border border-dashed border-black/15 bg-white/60 text-sm text-[#0D0D0F]/65"
          >
            {{ t(copy.dashboard.noCerts) }}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
