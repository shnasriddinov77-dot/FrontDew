import { computed, reactive, watch } from 'vue';
import type { CourseLesson, FrontendCourse, SubscriptionPlan } from '../data/frontendCourses';
import { calculateCourseProgress, hasAccessToCourse } from '../utils/academyLogic';

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export interface EarnedCertificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issuedAt: string;
  scorePercent: number;
}

interface PersistedState {
  user: StudentUser | null;
  subscriptionPlan: SubscriptionPlan;
  purchasedCourseIds: string[];
  studiedLessons: Record<string, string[]>;
  completedLessons: Record<string, string[]>;
  quizScores: Record<string, number>;
  certificates: EarnedCertificate[];
}

const STORAGE_KEY = 'frontdev_academy_state_v1';
const LEGACY_STORAGE_KEY = 'kodex_academy_state_v1';

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      return {
        user: parsed.user ?? null,
        subscriptionPlan: parsed.subscriptionPlan ?? 'free',
        purchasedCourseIds: Array.isArray(parsed.purchasedCourseIds) ? parsed.purchasedCourseIds : [],
        studiedLessons: parsed.studiedLessons ?? {},
        completedLessons: parsed.completedLessons ?? {},
        quizScores: parsed.quizScores ?? {},
        certificates: Array.isArray(parsed.certificates) ? parsed.certificates : [],
      };
    }
  } catch {
    // Ignore corrupted storage
  }
  return {
    user: null,
    subscriptionPlan: 'free',
    purchasedCourseIds: [],
    studiedLessons: {},
    completedLessons: {},
    quizScores: {},
    certificates: [],
  };
}

const state = reactive<PersistedState>(loadInitialState());

watch(
  state,
  (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota issues
    }
  },
  { deep: true }
);

function makeInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || 'FD';
}

export function useAcademyStore() {
  const isAuthenticated = computed(() => Boolean(state.user));
  const isProSubscriber = computed(
    () => state.subscriptionPlan === 'pro-monthly' || state.subscriptionPlan === 'pro-annual'
  );

  function login(email: string, nameOverride?: string) {
    const cleanEmail = email.trim().toLowerCase();
    const derivedName =
      nameOverride?.trim() ||
      cleanEmail
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    state.user = {
      id: `usr_${Date.now()}`,
      name: derivedName || 'FrontDev Student',
      email: cleanEmail,
      initials: makeInitials(derivedName || 'FD'),
    };
  }

  function register(name: string, email: string) {
    login(email, name);
  }

  function loginDemo(mode: 'student' | 'pro') {
    if (mode === 'pro') {
      state.user = {
        id: 'usr_demo_pro',
        name: 'Dilshodbek Karimov',
        email: 'dilshod@frontdev.uz',
        initials: 'DK',
      };
      state.subscriptionPlan = 'pro-annual';
    } else {
      state.user = {
        id: 'usr_demo_free',
        name: 'Madina Rahimova',
        email: 'madina@frontdev.uz',
        initials: 'MR',
      };
      state.subscriptionPlan = 'free';
    }
  }

  function logout() {
    state.user = null;
  }

  function canAccessCourse(course: FrontendCourse): boolean {
    return hasAccessToCourse(course, state.subscriptionPlan, state.purchasedCourseIds);
  }

  function canAccessLesson(course: FrontendCourse, lesson: CourseLesson): boolean {
    if (lesson.isFreePreview) return true;
    return canAccessCourse(course);
  }

  function unlockCourse(courseId: string) {
    if (!state.purchasedCourseIds.includes(courseId)) {
      state.purchasedCourseIds.push(courseId);
    }
  }

  function activateSubscription(plan: SubscriptionPlan) {
    state.subscriptionPlan = plan;
  }

  function toggleLessonCompleted(courseId: string, lessonId: string) {
    const list = state.completedLessons[courseId] ?? [];
    if (list.includes(lessonId)) {
      state.completedLessons[courseId] = list.filter((id) => id !== lessonId);
    } else {
      state.completedLessons[courseId] = [...list, lessonId];
    }
  }

  function markLessonStudied(courseId: string, lessonId: string) {
    const list = state.studiedLessons[courseId] ?? [];
    if (!list.includes(lessonId)) {
      state.studiedLessons[courseId] = [...list, lessonId];
    }
  }

  function isLessonStudied(courseId: string, lessonId: string): boolean {
    return (state.studiedLessons[courseId] ?? []).includes(lessonId);
  }

  function canPracticeLesson(course: FrontendCourse, lesson: CourseLesson): boolean {
    return canAccessCourse(course) && isLessonStudied(course.id, lesson.id);
  }

  function markLessonCompleted(courseId: string, lessonId: string) {
    const list = state.completedLessons[courseId] ?? [];
    if (!list.includes(lessonId)) {
      state.completedLessons[courseId] = [...list, lessonId];
    }
  }

  function isLessonCompleted(courseId: string, lessonId: string): boolean {
    return (state.completedLessons[courseId] ?? []).includes(lessonId);
  }

  function getCourseProgress(course: FrontendCourse) {
    return calculateCourseProgress(course, state.completedLessons[course.id] ?? []);
  }

  function recordQuizResult(course: FrontendCourse, scorePercent: number, passed: boolean) {
    const prev = state.quizScores[course.id] ?? 0;
    if (scorePercent > prev) {
      state.quizScores[course.id] = scorePercent;
    }
    if (passed) {
      const exists = state.certificates.some((c) => c.courseId === course.id);
      if (!exists) {
        state.certificates.push({
          id: `FDV-${course.code}-${Math.floor(1000 + Math.random() * 8999)}`,
          courseId: course.id,
          courseTitle: course.title,
          studentName: state.user?.name || 'FrontDev Bitiruvchisi',
          issuedAt: new Date().toISOString().slice(0, 10),
          scorePercent,
        });
      }
    }
  }

  return {
    state,
    isAuthenticated,
    isProSubscriber,
    login,
    register,
    loginDemo,
    logout,
    canAccessCourse,
    canAccessLesson,
    canPracticeLesson,
    unlockCourse,
    activateSubscription,
    toggleLessonCompleted,
    markLessonStudied,
    isLessonStudied,
    markLessonCompleted,
    isLessonCompleted,
    getCourseProgress,
    recordQuizResult,
  };
}
