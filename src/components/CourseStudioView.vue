<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Lightbulb,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from 'lucide-vue-next';
import type { CourseLesson, FrontendCourse } from '../data/frontendCourses';
import {
  getCourseCategoryLabel,
  getCourseLevel,
  getCourseMentor,
  getCourseSubtitle,
  getCourseTitle,
  getLessonLocalized,
  getModuleTitle,
  getQuizLocalized,
} from '../data/courseLocalizations';
import { gradeQuiz, runAndVerifyLessonCode } from '../utils/academyLogic';
import { buildCssPreviewSrcdoc, executeEducationalCode } from '../utils/codePlayground';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';
import { useMascot } from '../composables/useMascot';
import { PAGES_COPY } from '../i18n/pagesTranslations';
import TechLogo from './TechLogo.vue';
import { analyzeLessonPedagogy, getCourseTechLogos } from '../utils/pedagogyAnalyzer';

const props = defineProps<{
  course: FrontendCourse;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'buyCourse', course: FrontendCourse): void;
  (e: 'openSubscription'): void;
  (e: 'openDashboard'): void;
}>();

const {
  state,
  canAccessCourse,
  canAccessLesson,
  canPracticeLesson,
  isLessonStudied,
  markLessonStudied,
  isLessonCompleted,
  toggleLessonCompleted,
  markLessonCompleted,
  getCourseProgress,
  recordQuizResult,
} = useAcademyStore();

const { locale, t, formatCoursePrice, copy } = useI18n();
const { triggerMascot } = useMascot();

const activeViewMode = ref<'lesson' | 'quiz'>('lesson');
const selectedLessonId = ref<string>(
  props.course.modules[0]?.lessons[0]?.id || ''
);
const userPracticeCode = ref('');
const practiceResult = ref<{ passed: boolean; feedback: string } | null>(null);
const liveLogs = ref<string[]>([]);
const liveError = ref<string | null>(null);
const showHint = ref(false);

const quizAnswers = ref<Record<string, number>>({});
const quizSubmitted = ref<ReturnType<typeof gradeQuiz> | null>(null);
const coverError = ref(false);
const selectedMicroAnswer = ref<number | null>(null);

const allLessons = computed(() =>
  props.course.modules.flatMap((m) => m.lessons)
);

const currentLesson = computed<CourseLesson | undefined>(() =>
  allLessons.value.find((l) => l.id === selectedLessonId.value) ||
  allLessons.value[0]
);

const currentLessonIndex = computed(() =>
  allLessons.value.findIndex((l) => l.id === currentLesson.value?.id)
);

const nextLesson = computed<CourseLesson | undefined>(() =>
  currentLessonIndex.value >= 0
    ? allLessons.value[currentLessonIndex.value + 1]
    : undefined
);

const localizedCourseTitle = computed(() => getCourseTitle(props.course, locale.value));
const localizedCourseSubtitle = computed(() => getCourseSubtitle(props.course, locale.value));
const localizedMentor = computed(() => getCourseMentor(props.course, locale.value));

const lessonPedagogy = computed(() =>
  currentLesson.value
    ? getLessonLocalized(props.course.id, currentLesson.value, locale.value)
    : null
);

const pedagogyAnalysis = computed(() =>
  currentLesson.value
    ? analyzeLessonPedagogy(
        props.course,
        currentLesson.value,
        progress.value.completedCount,
        progress.value.totalCount,
        locale.value
      )
    : null
);

const localizedQuiz = computed(() =>
  props.course.quiz.map((q) => getQuizLocalized(props.course.id, q, locale.value))
);

const cssPreviewHtml = computed(() => buildCssPreviewSrcdoc(userPracticeCode.value));

function formatDuration(raw: string): string {
  const num = raw.replace(/\D/g, '');
  if (!num) return raw;
  if (locale.value === 'uz') return `${num} daq`;
  if (locale.value === 'en') return `${num} min`;
  return `${num} мин`;
}

const progress = computed(() => getCourseProgress(props.course));
const courseUnlocked = computed(() => canAccessCourse(props.course));
const lessonUnlocked = computed(() =>
  currentLesson.value
    ? canAccessLesson(props.course, currentLesson.value)
    : false
);
const lessonStudied = computed(() =>
  currentLesson.value
    ? isLessonStudied(props.course.id, currentLesson.value.id)
    : false
);
const practiceUnlocked = computed(() =>
  currentLesson.value
    ? canPracticeLesson(props.course, currentLesson.value)
    : false
);
const earnedCertificate = computed(() =>
  state.certificates.find((c) => c.courseId === props.course.id)
);

watch(
  () => [props.course.id, currentLesson.value?.id],
  () => {
    if (currentLesson.value) {
      userPracticeCode.value = currentLesson.value.starterCode;
      practiceResult.value = null;
      liveLogs.value = [];
      liveError.value = null;
      showHint.value = false;
      selectedMicroAnswer.value = null;
    }
  },
  { immediate: true }
);

watch(
  () => props.course.id,
  () => {
    selectedLessonId.value = props.course.modules[0]?.lessons[0]?.id || '';
    activeViewMode.value = 'lesson';
    quizAnswers.value = {};
    quizSubmitted.value = null;
    coverError.value = false;
  }
);

function selectLesson(lesson: CourseLesson) {
  selectedLessonId.value = lesson.id;
  activeViewMode.value = 'lesson';
}

function confirmTopicStudied() {
  if (!currentLesson.value || !courseUnlocked.value) return;
  markLessonStudied(props.course.id, currentLesson.value.id);
  triggerMascot('study-confirmed');
}

function runAndCheckCode() {
  if (!currentLesson.value || !practiceUnlocked.value) return;
  const res = runAndVerifyLessonCode(
    userPracticeCode.value,
    currentLesson.value.starterCode,
    currentLesson.value.expectedKeyword,
    {
      isCssPreview: Boolean(lessonPedagogy.value?.isCssPreview),
      locale: locale.value,
      executeJs: executeEducationalCode,
    }
  );
  liveLogs.value = res.logs;
  liveError.value = res.error;
  practiceResult.value = { passed: res.passed, feedback: res.feedback };
  if (res.passed) {
    markLessonCompleted(props.course.id, currentLesson.value.id);
    triggerMascot('code-pass');
  } else {
    triggerMascot('code-fail');
  }
}

function revealSolution() {
  if (!lessonPedagogy.value || !practiceUnlocked.value) return;
  userPracticeCode.value = lessonPedagogy.value.solutionCode;
  runAndCheckCode();
}

function resetPracticeCode() {
  if (!currentLesson.value) return;
  userPracticeCode.value = currentLesson.value.starterCode;
  practiceResult.value = null;
  liveLogs.value = [];
  liveError.value = null;
}

function submitQuiz() {
  const res = gradeQuiz(props.course.quiz, quizAnswers.value);
  quizSubmitted.value = res;
  recordQuizResult(
    { ...props.course, title: localizedCourseTitle.value },
    res.percent,
    res.passed
  );
  triggerMascot(res.passed ? 'code-pass' : 'code-fail');
}
</script>

<template>
  <section class="min-h-screen bg-[#F4F4F0] text-[#0D0D0F] pb-24">
    <!-- Top Breadcrumb Bar -->
    <div class="border-b border-black/10 bg-white/75">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          @click="emit('back')"
          class="inline-flex items-center gap-2 text-xs font-semibold text-[#0D0D0F]/75 hover:text-[#FF3B1D] transition-colors cursor-pointer"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>{{ t(copy.studio.backToCatalog) }}</span>
        </button>

        <div class="flex items-center gap-5 text-xs font-mono tabular-nums text-[#0D0D0F]/70">
          <span>{{ course.code }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ t(copy.studio.completedProgress) }} {{ progress.completedCount }}/{{ progress.totalCount }} ({{ progress.percent }}%)</span>
        </div>
      </div>
    </div>

    <!-- Course Hero Summary -->
    <div class="bg-[#0A0A0C] text-[#F4F4F0] border-b border-white/10">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-8 space-y-4">
          <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-[#FF3B1D]">
            <span>{{ getCourseCategoryLabel(course, locale) }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ getCourseLevel(course, locale) }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ course.durationHours }} {{ t(copy.studio.practiceHours) }}</span>
          </div>

          <h1 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
            {{ localizedCourseTitle }}
          </h1>

          <p class="text-sm sm:text-base text-[#F4F4F0]/75 max-w-2xl leading-relaxed">
            {{ localizedCourseSubtitle }}
          </p>

          <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#F4F4F0]/70">
            <span>{{ t(copy.studio.mentorLabel) }}: <strong class="text-white">{{ localizedMentor.name }}</strong> ({{ localizedMentor.role }})</span>
            <span aria-hidden="true">·</span>
            <span>{{ t(copy.studio.skillsLabel) }}: {{ course.skills.join(', ') }}</span>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <div
              v-for="tech in getCourseTechLogos(course.id)"
              :key="tech"
              class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/8 border border-white/12 text-white/90"
            >
              <TechLogo :tech="tech" size="sm" :show-label="true" />
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-4">
          <div v-if="courseUnlocked" class="lg:text-right space-y-2">
            <div class="inline-flex items-center gap-2 text-sm font-semibold text-[#34D399]">
              <CheckCircle2 class="w-4 h-4" />
              <span>{{ course.isFree ? t(copy.studio.freeCourseLabel) : t(copy.studio.fullAccessOpen) }}</span>
            </div>
            <div class="w-full lg:w-64 h-2 bg-white/15 rounded-full overflow-hidden">
              <div
                class="h-full bg-[#34D399] transition-all duration-300"
                :style="{ width: `${progress.percent}%` }"
              />
            </div>
          </div>

          <div v-else class="flex flex-wrap lg:justify-end gap-3">
            <button
              type="button"
              @click="emit('buyCourse', course)"
              class="px-5 py-3 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              {{ t(copy.studio.buyCourseBtn) }} · {{ formatCoursePrice(course.priceRub) }}
            </button>
            <button
              type="button"
              @click="emit('openSubscription')"
              class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              {{ t(copy.studio.openProBtn) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Two-Zone Learning Studio -->
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Syllabus & Quiz Navigation -->
      <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        <div class="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div class="px-5 py-4 border-b border-black/8 flex items-center justify-between">
            <h2 class="font-display text-sm font-bold text-[#0D0D0F]">
              {{ t(copy.studio.syllabusTitle) }}
            </h2>
            <span class="font-mono text-xs text-[#0D0D0F]/55 tabular-nums">
              {{ progress.completedCount }}/{{ progress.totalCount }}
            </span>
          </div>

          <div class="divide-y divide-black/8">
            <div v-for="mod in course.modules" :key="mod.id" class="p-4 space-y-2.5">
              <div class="text-xs font-semibold text-[#0D0D0F]/60">
                {{ getModuleTitle(course.id, mod.id, mod.title, locale) }}
              </div>

              <div class="space-y-1.5">
                <button
                  v-for="lesson in mod.lessons"
                  :key="lesson.id"
                  type="button"
                  @click="selectLesson(lesson)"
                  class="w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-start justify-between gap-2 cursor-pointer"
                  :class="
                    activeViewMode === 'lesson' && currentLesson?.id === lesson.id
                      ? 'bg-[#0D0D0F] text-white'
                      : 'hover:bg-[#F4F4F0] text-[#0D0D0F]'
                  "
                >
                  <div class="space-y-1">
                    <div class="font-medium leading-snug">
                      {{ getLessonLocalized(course.id, lesson, locale).title }}
                    </div>
                    <div
                      class="font-mono text-[11px]"
                      :class="
                        activeViewMode === 'lesson' && currentLesson?.id === lesson.id
                          ? 'text-white/65'
                          : 'text-[#0D0D0F]/50'
                      "
                    >
                      {{ formatDuration(lesson.duration) }}
                      <span v-if="lesson.isFreePreview && !courseUnlocked"> · {{ t(copy.studio.freePreviewTag) }}</span>
                    </div>
                  </div>

                  <div class="shrink-0 mt-0.5">
                    <CheckCircle2
                      v-if="isLessonCompleted(course.id, lesson.id)"
                      class="w-4 h-4 text-[#059669]"
                    />
                    <Lock
                      v-else-if="!canAccessLesson(course, lesson)"
                      class="w-3.5 h-3.5 opacity-55"
                    />
                    <Play v-else class="w-3.5 h-3.5 opacity-75" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 border-t border-black/10 bg-[#FAF9F6]">
            <button
              type="button"
              @click="activeViewMode = 'quiz'"
              class="w-full px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              :class="
                activeViewMode === 'quiz'
                  ? 'bg-[#FF3B1D] text-white'
                  : 'bg-[#0D0D0F] text-white hover:bg-[#FF3B1D]'
              "
            >
              <span class="flex items-center gap-2">
                <Award class="w-4 h-4" />
                <span>{{ t(copy.studio.quizBtn) }}</span>
              </span>
              <span v-if="earnedCertificate" class="font-mono text-[11px]">{{ t(copy.studio.quizPassedTag) }}</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Right Column: Lesson Teacher / Paywall / Quiz -->
      <div class="lg:col-span-8 space-y-6">
        <!-- QUIZ MODE -->
        <div
          v-if="activeViewMode === 'quiz'"
          class="bg-white rounded-2xl border border-black/10 p-6 sm:p-8 space-y-6"
        >
          <div class="space-y-2 border-b border-black/8 pb-5">
            <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
              {{ t(copy.studio.quizKicker) }}
            </p>
            <h2 class="font-display text-xl sm:text-2xl font-bold text-[#0D0D0F]">
              {{ t(copy.studio.quizHeading) }}: {{ localizedCourseTitle }}
            </h2>
            <p class="text-sm text-[#0D0D0F]/70">
              {{ t(copy.studio.quizDesc) }}
            </p>
          </div>

          <div v-if="!courseUnlocked" class="py-8 text-center space-y-4">
            <Lock class="w-8 h-8 mx-auto text-[#0D0D0F]/45" />
            <h3 class="font-display text-lg font-bold">
              {{ t(copy.studio.quizLockedTitle) }}
            </h3>
            <p class="text-sm text-[#0D0D0F]/65 max-w-md mx-auto">
              {{ t(copy.studio.quizLockedDesc) }}
            </p>
            <div class="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                @click="emit('buyCourse', course)"
                class="px-5 py-2.5 rounded-xl bg-[#FF3B1D] text-white text-xs font-semibold cursor-pointer"
              >
                {{ t(copy.studio.buyCourseBtn) }} · {{ formatCoursePrice(course.priceRub) }}
              </button>
              <button
                type="button"
                @click="emit('openSubscription')"
                class="px-5 py-2.5 rounded-xl bg-[#0D0D0F] text-white text-xs font-semibold cursor-pointer"
              >
                {{ t(copy.studio.openProBtn) }}
              </button>
            </div>
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="(q, idx) in localizedQuiz"
              :key="q.id"
              class="space-y-3 pb-5 border-b border-black/8 last:border-none"
            >
              <div class="font-semibold text-sm text-[#0D0D0F]">
                {{ idx + 1 }}. {{ q.question }}
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  v-for="(opt, optIdx) in q.options"
                  :key="optIdx"
                  type="button"
                  @click="quizAnswers[q.id] = optIdx"
                  class="text-left px-4 py-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer"
                  :class="
                    quizAnswers[q.id] === optIdx
                      ? 'border-[#0D0D0F] bg-[#0D0D0F] text-white'
                      : 'border-black/12 bg-[#FAF9F6] text-[#0D0D0F] hover:border-black/30'
                  "
                >
                  {{ opt }}
                </button>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="button"
                @click="submitQuiz"
                class="px-6 py-3 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                {{ t(copy.studio.submitQuizBtn) }}
              </button>
            </div>

            <div
              v-if="quizSubmitted"
              class="p-5 rounded-xl border space-y-3"
              :class="
                quizSubmitted.passed
                  ? 'bg-[#ECFDF5] border-[#059669]/30 text-[#065F46]'
                  : 'bg-[#FEF2F2] border-[#DC2626]/30 text-[#991B1B]'
              "
            >
              <div class="font-display text-base font-bold tabular-nums">
                {{ t(copy.studio.resultLabel) }}: {{ quizSubmitted.correct }}/{{ quizSubmitted.total }} ({{ quizSubmitted.percent }}%)
              </div>
              <p class="text-sm">
                {{ quizSubmitted.passed ? t(copy.studio.quizPassMsg) : t(copy.studio.quizFailMsg) }}
              </p>
              <button
                v-if="quizSubmitted.passed"
                type="button"
                @click="emit('openDashboard')"
                class="px-4 py-2 rounded-lg bg-[#065F46] text-white text-xs font-semibold cursor-pointer"
              >
                {{ t(copy.studio.openCertBtn) }}
              </button>
            </div>
          </div>
        </div>

        <!-- LESSON LOCKED PAYWALL -->
        <div
          v-else-if="!lessonUnlocked && currentLesson && lessonPedagogy"
          class="bg-white rounded-2xl border border-black/10 p-8 sm:p-12 text-center space-y-6"
        >
          <div class="w-12 h-12 rounded-xl bg-[#F4F4F0] border border-black/10 flex items-center justify-center mx-auto">
            <Lock class="w-5 h-5 text-[#FF3B1D]" />
          </div>

          <div class="space-y-2 max-w-lg mx-auto">
            <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
              {{ t(copy.studio.paywallKicker) }}
            </p>
            <h2 class="font-display text-2xl font-bold text-[#0D0D0F]">
              {{ t(copy.studio.paywallTitlePrefix) }} «{{ lessonPedagogy.title }}»
            </h2>
            <p class="text-sm text-[#0D0D0F]/70 leading-relaxed">
              {{ t(copy.studio.paywallDesc) }}
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              @click="emit('buyCourse', course)"
              class="px-6 py-3 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {{ t(copy.studio.buyCourseBtn) }} · {{ formatCoursePrice(course.priceRub) }}
            </button>
            <button
              type="button"
              @click="emit('openSubscription')"
              class="px-6 py-3 rounded-xl bg-[#0D0D0F] hover:bg-[#222226] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {{ t(copy.studio.openProBtn) }}
            </button>
          </div>
        </div>

        <!-- LESSON CONTENT & INTERACTIVE PROGRAMMING TEACHER -->
        <div v-else-if="currentLesson && lessonPedagogy" class="space-y-6">
          <!-- Step 1: Deep Theory & Anatomy Card -->
          <div class="bg-white rounded-2xl border border-black/10 overflow-hidden">
            <div class="relative h-52 sm:h-64 bg-[#0A0A0C] overflow-hidden">
              <img
                v-if="!coverError"
                :src="course.coverImage"
                :alt="lessonPedagogy.title"
                referrerpolicy="no-referrer"
                @error="coverError = true"
                class="w-full h-full object-cover opacity-55"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <div class="font-mono text-xs text-[#FF3B1D] mb-1">
                  {{ formatDuration(currentLesson.duration) }} · {{ currentLesson.isFreePreview ? t(copy.studio.freeLessonBadge) : t(copy.studio.proModuleBadge) }}
                </div>
                <h2 class="font-display text-xl sm:text-2xl font-bold text-white">
                  {{ lessonPedagogy.title }}
                </h2>
              </div>
            </div>

            <div class="p-6 sm:p-8 space-y-7">
              <div class="space-y-3">
                <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
                  {{ t(copy.studio.theoryBadge) }}
                </p>
                <p class="text-sm sm:text-base text-[#0D0D0F]/85 leading-relaxed">
                  {{ lessonPedagogy.summary }}
                </p>
              </div>

              <!-- Analyzed Effective Learning Engine: Adaptive Strategy + Mental Model -->
              <div
                v-if="pedagogyAnalysis"
                class="rounded-2xl bg-[#FAF9F6] border border-black/10 p-5 space-y-4"
              >
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span class="text-[#0047FF] font-semibold">
                    {{ t(pedagogyAnalysis.stageBadge) }}
                  </span>
                  <span class="text-[#0D0D0F]/55 tabular-nums">
                    ~{{ pedagogyAnalysis.blueprint.recommendedMinutes }} {{ locale === 'uz' ? 'daq tahlil' : locale === 'ru' ? 'мин разбора' : 'min focus' }}
                  </span>
                </div>

                <div class="space-y-1.5">
                  <h3 class="font-display text-sm font-bold text-[#0D0D0F]">
                    {{ t(pedagogyAnalysis.blueprint.mentalModelTitle) }}
                  </h3>
                  <p class="text-xs sm:text-sm text-[#0D0D0F]/80 leading-relaxed">
                    {{ t(pedagogyAnalysis.blueprint.mentalModelBody) }}
                  </p>
                </div>

                <p class="text-xs text-[#0D0D0F]/65 pt-2 border-t border-black/8">
                  <strong class="text-[#0D0D0F]">
                    {{ locale === 'uz' ? 'O‘qitish tahlili:' : locale === 'ru' ? 'Методический совет:' : 'Study insight:' }}
                  </strong>
                  {{ t(pedagogyAnalysis.strategyTip) }}
                </p>
              </div>

              <!-- Key Takeaways -->
              <div class="space-y-2.5">
                <h3 class="font-display text-sm font-bold text-[#0D0D0F]">
                  {{ t(copy.studio.keyPointsTitle) }}
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(pt, idx) in lessonPedagogy.keyPoints"
                    :key="idx"
                    class="flex items-start gap-2.5 text-sm text-[#0D0D0F]/80"
                  >
                    <span class="font-mono text-xs text-[#FF3B1D] mt-0.5 tabular-nums">0{{ idx + 1 }}</span>
                    <span>{{ pt }}</span>
                  </li>
                </ul>
              </div>

              <!-- Reference Code -->
              <div class="space-y-2">
                <div class="font-mono text-xs text-[#0D0D0F]/55">
                  {{ t(copy.studio.refSnippetTitle) }}
                </div>
                <pre class="p-4 rounded-xl bg-[#0A0A0C] text-[#F4F4F0] text-xs font-mono overflow-x-auto leading-relaxed"><code>{{ currentLesson.codeSnippet }}</code></pre>
              </div>

              <!-- Line-by-line Breakdown -->
              <div v-if="lessonPedagogy.anatomy.length > 0" class="space-y-3 pt-2 border-t border-black/8">
                <h3 class="font-display text-sm font-bold text-[#0D0D0F]">
                  {{ t(copy.studio.anatomyTitle) }}
                </h3>
                <div class="divide-y divide-black/8 border border-black/10 rounded-xl overflow-hidden bg-[#FAF9F6]">
                  <div
                    v-for="(row, rIdx) in lessonPedagogy.anatomy"
                    :key="rIdx"
                    class="p-4 space-y-1.5"
                  >
                    <code class="block font-mono text-xs text-[#0D0D0F] font-semibold">{{ row.line }}</code>
                    <p class="text-xs text-[#0D0D0F]/70 leading-relaxed">{{ row.note }}</p>
                  </div>
                </div>
              </div>

              <!-- Common Pitfall vs Best Practice -->
              <div v-if="lessonPedagogy.pitfall" class="space-y-3 pt-2 border-t border-black/8">
                <h3 class="font-display text-sm font-bold text-[#0D0D0F]">
                  {{ t(copy.studio.pitfallTitle) }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div class="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#DC2626]/20 space-y-1">
                    <div class="font-mono text-[11px] font-semibold text-[#991B1B]">Avoid</div>
                    <code class="block font-mono text-[#7F1D1D] break-words">{{ lessonPedagogy.pitfall.wrong }}</code>
                  </div>
                  <div class="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#059669]/25 space-y-1">
                    <div class="font-mono text-[11px] font-semibold text-[#065F46]">Best Practice</div>
                    <code class="block font-mono text-[#064E3B] break-words">{{ lessonPedagogy.pitfall.right }}</code>
                  </div>
                </div>
                <p class="text-xs text-[#0D0D0F]/70 leading-relaxed">
                  {{ lessonPedagogy.pitfall.note }}
                </p>
              </div>

              <!-- Quick Active Recall Micro-Check Before Coding -->
              <div
                v-if="pedagogyAnalysis"
                class="space-y-3 pt-4 border-t border-black/8"
              >
                <div class="space-y-1">
                  <p class="font-mono text-xs uppercase tracking-wider text-[#0047FF]">
                    {{
                      locale === 'uz'
                        ? 'Tezkor tushunish tekshiruvi (Active Recall)'
                        : locale === 'ru'
                          ? 'Быстрая проверка понимания перед кодом'
                          : 'Active Recall Quick Check'
                    }}
                  </p>
                  <p class="text-sm font-semibold text-[#0D0D0F]">
                    {{ t(pedagogyAnalysis.blueprint.microCheck.question) }}
                  </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    v-for="(opt, oIdx) in pedagogyAnalysis.blueprint.microCheck.options[locale]"
                    :key="oIdx"
                    type="button"
                    @click="selectedMicroAnswer = oIdx"
                    class="text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer"
                    :class="
                      selectedMicroAnswer === oIdx
                        ? oIdx === pedagogyAnalysis.blueprint.microCheck.correctIndex
                          ? 'bg-[#ECFDF5] border-[#059669] text-[#065F46] font-semibold'
                          : 'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B] font-semibold'
                        : 'bg-[#FAF9F6] border-black/12 text-[#0D0D0F]/85 hover:border-[#0D0D0F]'
                    "
                  >
                    {{ opt }}
                  </button>
                </div>

                <div
                  v-if="selectedMicroAnswer !== null"
                  role="status"
                  class="text-xs px-3.5 py-2.5 rounded-xl border"
                  :class="
                    selectedMicroAnswer === pedagogyAnalysis.blueprint.microCheck.correctIndex
                      ? 'bg-[#ECFDF5] border-[#059669]/30 text-[#065F46]'
                      : 'bg-[#FFFBEB] border-[#D97706]/30 text-[#92400E]'
                  "
                >
                  {{
                    selectedMicroAnswer === pedagogyAnalysis.blueprint.microCheck.correctIndex
                      ? t(pedagogyAnalysis.blueprint.microCheck.explanation)
                      : locale === 'uz'
                        ? 'Yana bir o‘ylab ko‘ring — yuqoridagi «Hayotiy o‘xshatish» bo‘limida javobi bor.'
                        : locale === 'ru'
                          ? 'Попробуйте другой вариант — подсказка есть в блоке аналогии выше.'
                          : 'Try another option — check the mental model card right above.'
                  }}
                </div>
              </div>

              <div
                v-if="courseUnlocked"
                class="pt-4 border-t border-black/8 flex flex-wrap items-center justify-between gap-4"
              >
                <button
                  type="button"
                  @click="toggleLessonCompleted(course.id, currentLesson.id)"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/15 text-xs font-semibold transition-colors cursor-pointer"
                  :class="
                    isLessonCompleted(course.id, currentLesson.id)
                      ? 'bg-[#059669] border-[#059669] text-white'
                      : 'bg-white text-[#0D0D0F]/80 hover:border-[#0D0D0F]'
                  "
                >
                  <CheckCircle2 class="w-4 h-4" />
                  <span>
                    {{
                      isLessonCompleted(course.id, currentLesson.id)
                        ? t(copy.studio.markedComplete)
                        : t(copy.studio.markComplete)
                    }}
                  </span>
                </button>

                <button
                  v-if="nextLesson"
                  type="button"
                  @click="selectLesson(nextLesson)"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/15 hover:border-[#FF3B1D] hover:text-[#FF3B1D] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>{{ t(copy.studio.nextLessonBtn) }}</span>
                  <ArrowRight class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Gate A: Course NOT purchased yet -> Coding IDE strictly hidden -->
          <div
            v-if="!courseUnlocked"
            class="bg-[#0A0A0C] text-[#F4F4F0] rounded-2xl border border-white/10 p-7 sm:p-10 space-y-5"
          >
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Lock class="w-5 h-5 text-[#FF3B1D]" />
              </div>
              <div class="space-y-2">
                <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
                  {{ t(copy.studio.practiceKicker) }}
                </p>
                <h3 class="font-display text-lg sm:text-xl font-bold text-white">
                  {{ t(copy.studio.paidCodingLockedTitle) }}
                </h3>
                <p class="text-sm text-[#F4F4F0]/75 leading-relaxed max-w-2xl">
                  {{ t(copy.studio.paidCodingLockedDesc) }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                @click="emit('buyCourse', course)"
                class="px-6 py-3 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {{ t(copy.studio.buyCourseBtn) }} · {{ formatCoursePrice(course.priceRub) }}
              </button>
              <button
                type="button"
                @click="emit('openSubscription')"
                class="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {{ t(copy.studio.openProBtn) }}
              </button>
            </div>
          </div>

          <!-- Gate B: Course purchased, waiting for student to confirm they studied today's topic -->
          <div
            v-else-if="!lessonStudied"
            class="bg-white rounded-2xl border-2 border-[#0D0D0F] p-7 sm:p-9 space-y-5"
          >
            <div class="space-y-2">
              <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
                {{ t(copy.studio.practiceKicker) }}
              </p>
              <h3 class="font-display text-xl font-bold text-[#0D0D0F]">
                {{ t(copy.studio.studyFirstTitle) }}
              </h3>
              <p class="text-sm text-[#0D0D0F]/75 leading-relaxed max-w-2xl">
                {{ t(copy.studio.studyFirstDesc) }}
              </p>
            </div>

            <button
              type="button"
              @click="confirmTopicStudied"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <CheckCircle2 class="w-4 h-4" />
              <span>{{ t(copy.studio.unlockCodingBtn) }}</span>
            </button>
          </div>

          <!-- Step 2: Unlocked Coding Workspace for Today's Studied Topic -->
          <div
            v-else-if="practiceUnlocked"
            class="bg-white rounded-2xl border border-black/10 p-6 sm:p-8 space-y-5"
          >
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="space-y-1.5">
                <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
                  {{ t(copy.studio.practiceKicker) }}
                </p>
                <h3 class="font-display text-lg font-bold text-[#0D0D0F]">
                  {{ t(copy.studio.taskPrefix) }} {{ lessonPedagogy.taskPrompt }}
                </h3>
                <p class="text-xs text-[#0D0D0F]/65">
                  {{ t(copy.studio.codingUnlockedNote) }}
                </p>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  @click="showHint = !showHint"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/12 text-xs font-medium text-[#0D0D0F]/75 hover:border-[#0D0D0F] cursor-pointer"
                >
                  <Lightbulb class="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{{ t(copy.studio.hintBtn) }}</span>
                </button>
                <button
                  type="button"
                  @click="revealSolution"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/12 text-xs font-medium text-[#0D0D0F]/75 hover:border-[#FF3B1D] hover:text-[#FF3B1D] cursor-pointer"
                >
                  <Sparkles class="w-3.5 h-3.5" />
                  <span>{{ t(copy.studio.revealBtn) }}</span>
                </button>
              </div>
            </div>

            <div
              v-if="showHint"
              class="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#D97706]/30 font-mono text-xs text-[#92400E]"
            >
              {{ lessonPedagogy.hint }}
            </div>

            <div class="rounded-xl overflow-hidden border border-black/15 bg-[#0A0A0C]">
              <div class="px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span>{{ lessonPedagogy.isCssPreview ? 'styles.css' : 'solution.ts' }}</span>
                <button
                  type="button"
                  @click="resetPracticeCode"
                  class="inline-flex items-center gap-1 text-white/70 hover:text-white cursor-pointer"
                >
                  <RotateCcw class="w-3.5 h-3.5" />
                  <span>{{ t(copy.playground.resetBtn) }}</span>
                </button>
              </div>

              <label for="lesson-code-editor" class="sr-only">Practice Code Editor</label>
              <textarea
                id="lesson-code-editor"
                v-model="userPracticeCode"
                rows="8"
                spellcheck="false"
                class="w-full p-4 bg-transparent text-[#F4F4F0] font-mono text-xs focus:outline-none resize-y leading-relaxed"
              />

              <!-- Live Execution Console or CSS Visual Output -->
              <div
                v-if="lessonPedagogy.isCssPreview || liveLogs.length > 0 || liveError"
                class="border-t border-white/10 bg-[#121216] p-4 space-y-2"
              >
                <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/55">
                  <Terminal class="w-3.5 h-3.5 text-[#FF3B1D]" />
                  <span>{{ t(copy.playground.outputLabel) }}</span>
                </div>

                <div v-if="lessonPedagogy.isCssPreview" class="rounded-lg overflow-hidden bg-[#F4F4F0]">
                  <iframe
                    title="CSS practice preview"
                    sandbox=""
                    :srcdoc="cssPreviewHtml"
                    class="w-full h-36 border-0"
                  />
                </div>
                <div v-else class="font-mono text-xs space-y-1">
                  <div v-if="liveError" class="text-[#FCA5A5]">Error: {{ liveError }}</div>
                  <div v-for="(log, idx) in liveLogs" :key="idx" class="text-[#6EE7B7]">
                    &gt; {{ log }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                @click="runAndCheckCode"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Play class="w-3.5 h-3.5" />
                <span>{{ t(copy.studio.runCodeBtn) }}</span>
              </button>

              <div
                v-if="practiceResult"
                role="status"
                class="text-xs font-medium px-4 py-2.5 rounded-xl border"
                :class="
                  practiceResult.passed
                    ? 'bg-[#ECFDF5] border-[#059669]/30 text-[#065F46]'
                    : 'bg-[#FEF2F2] border-[#DC2626]/30 text-[#991B1B]'
                "
              >
                {{ practiceResult.feedback }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Extended Long-Page Footer Section inside Course Page: Capstone & Skill Matrix -->
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 mt-16 border-t border-black/10">
      <div class="bg-white rounded-2xl border border-black/10 p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-3">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ course.code }} · {{ t(PAGES_COPY.curriculumMatrix.cols.capstone) }}
          </p>
          <h2 class="font-display text-2xl font-bold text-[#0D0D0F]">
            {{
              PAGES_COPY.curriculumMatrix.capstones[course.id]
                ? t(PAGES_COPY.curriculumMatrix.capstones[course.id])
                : localizedCourseTitle
            }}
          </h2>
          <p class="text-sm text-[#0D0D0F]/70 leading-relaxed">
            {{ t(copy.studio.quizDesc) }}
          </p>
        </div>

        <div class="lg:col-span-5 flex flex-wrap gap-2">
          <span
            v-for="skill in course.skills"
            :key="skill"
            class="px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-black/10 font-mono text-xs text-[#0D0D0F]"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
