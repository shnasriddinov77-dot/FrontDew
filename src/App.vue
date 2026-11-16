<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRONTEND_COURSES, type FrontendCourse, type SubscriptionTier } from './data/frontendCourses';
import type { EarnedCertificate } from './composables/useAcademyStore';
import { useAcademyStore } from './composables/useAcademyStore';
import { PAGES_COPY } from './i18n/pagesTranslations';
import { useI18n } from './composables/useI18n';
import TopNavbar, { type ActivePage } from './components/TopNavbar.vue';
import CustomCursor from './components/CustomCursor.vue';
import HeroShowcase from './components/HeroShowcase.vue';
import MarqueeRibbon from './components/MarqueeRibbon.vue';
import TechStackShowcaseSection from './components/TechStackShowcaseSection.vue';
import LearnFirstWorkflowSection from './components/LearnFirstWorkflowSection.vue';
import FeaturedCoursesStrip from './components/FeaturedCoursesStrip.vue';
import PageHeroBanner from './components/PageHeroBanner.vue';
import LearningRoadmapSection from './components/LearningRoadmapSection.vue';
import CareerMilestonesSection from './components/CareerMilestonesSection.vue';
import EditorialManifesto from './components/EditorialManifesto.vue';
import MentorsAndStudioSection from './components/MentorsAndStudioSection.vue';
import CourseCatalogSection from './components/CourseCatalogSection.vue';
import CurriculumMatrixSection from './components/CurriculumMatrixSection.vue';
import StudentOutcomesSection from './components/StudentOutcomesSection.vue';
import SubscriptionPricingSection from './components/SubscriptionPricingSection.vue';
import PlanComparisonSection from './components/PlanComparisonSection.vue';
import FaqAccordionSection from './components/FaqAccordionSection.vue';
import CourseStudioView from './components/CourseStudioView.vue';
import StudentDashboardView from './components/StudentDashboardView.vue';
import AuthModal from './components/AuthModal.vue';
import CheckoutModal, { type CheckoutTarget } from './components/CheckoutModal.vue';
import CertificateModal from './components/CertificateModal.vue';
import SiteFooter from './components/SiteFooter.vue';
import MascotCompanionDock from './components/MascotCompanionDock.vue';
import { useMascot } from './composables/useMascot';

const FIRST_VISIT_LOGIN_KEY = 'frontdev_first_visit_login_shown';

const { t, copy } = useI18n();
const { isAuthenticated } = useAcademyStore();
const { triggerMascot } = useMascot();

const activePage = ref<ActivePage>('home');
const selectedCourse = ref<FrontendCourse | null>(null);
const pageMainRef = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);

const authOpen = ref(false);
const authMode = ref<'login' | 'register'>('login');
const checkoutTarget = ref<CheckoutTarget | null>(null);
const activeCertificate = ref<EarnedCertificate | null>(null);

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function animatePageEnter() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && pageMainRef.value) {
    gsap.fromTo(
      pageMainRef.value,
      { opacity: 0.72, y: 12 },
      { opacity: 1, y: 0, duration: 0.36, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
  }
  ScrollTrigger.refresh();
}

function syncFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) {
    activePage.value = 'home';
    return;
  }
  if (hash.startsWith('course/')) {
    const courseId = hash.slice('course/'.length);
    const found = FRONTEND_COURSES.find((c) => c.id === courseId);
    if (found) {
      selectedCourse.value = found;
      activePage.value = 'course';
      return;
    }
  }
  const simplePages: ActivePage[] = ['home', 'courses', 'roadmap', 'about', 'pricing', 'dashboard'];
  if (simplePages.includes(hash as ActivePage)) {
    activePage.value = hash as ActivePage;
  }
}

function updateHash(page: ActivePage, courseId?: string) {
  const targetHash =
    page === 'course' && courseId
      ? `#/course/${courseId}`
      : page === 'home'
        ? '#/'
        : `#/${page}`;
  if (window.location.hash !== targetHash) {
    window.history.pushState(null, '', targetHash);
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  syncFromHash();
  updateScrollProgress();
  window.addEventListener('hashchange', syncFromHash);
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  try {
    const alreadyShown = localStorage.getItem(FIRST_VISIT_LOGIN_KEY);
    if (!isAuthenticated.value && !alreadyShown) {
      authMode.value = 'login';
      authOpen.value = true;
    }
  } catch {
    if (!isAuthenticated.value) {
      authOpen.value = true;
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('hashchange', syncFromHash);
  window.removeEventListener('scroll', updateScrollProgress);
});

async function navigate(page: ActivePage) {
  activePage.value = page;
  updateHash(page);
  await nextTick();
  window.scrollTo(0, 0);
  updateScrollProgress();
  animatePageEnter();

  if (page === 'courses') triggerMascot('navigate-courses');
  else if (page === 'roadmap') triggerMascot('navigate-roadmap');
  else if (page === 'about') triggerMascot('navigate-about');
  else if (page === 'pricing') triggerMascot('navigate-pricing');
  else if (page === 'dashboard') triggerMascot('navigate-dashboard');
  else triggerMascot('welcome', { showSpeech: false });
}

async function openCourse(course: FrontendCourse) {
  selectedCourse.value = course;
  activePage.value = 'course';
  updateHash('course', course.id);
  await nextTick();
  window.scrollTo(0, 0);
  updateScrollProgress();
  animatePageEnter();
  triggerMascot('open-course');
}

function openCourseCheckout(course: FrontendCourse) {
  checkoutTarget.value = { type: 'course', course };
}

function openPlanCheckout(tier: SubscriptionTier) {
  checkoutTarget.value = { type: 'subscription', tier };
}

function handleCheckoutCompleted() {
  if (checkoutTarget.value?.type === 'course') {
    selectedCourse.value = checkoutTarget.value.course;
    activePage.value = 'course';
    updateHash('course', checkoutTarget.value.course.id);
  }
  triggerMascot('purchase-success');
}

function openAuthModal(mode: 'login' | 'register' = 'login') {
  authMode.value = mode;
  authOpen.value = true;
}

function closeAuthModal() {
  authOpen.value = false;
  try {
    localStorage.setItem(FIRST_VISIT_LOGIN_KEY, '1');
  } catch {
    // Ignore storage errors
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F4F4F0] text-[#0D0D0F]">
    <!-- Top Scroll Progress Bar -->
    <div
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none origin-left bg-[#FF3B1D] transition-transform duration-75"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    />
    <CustomCursor />

    <TopNavbar
      :active-page="activePage"
      @navigate="navigate"
      @open-auth="openAuthModal"
    />

    <main ref="pageMainRef" class="flex-1">
      <!-- PAGE 1: Long Home Showcase -->
      <template v-if="activePage === 'home'">
        <HeroShowcase
          @explore-courses="navigate('courses')"
          @open-roadmap="navigate('roadmap')"
          @open-subscription="navigate('pricing')"
        />
        <MarqueeRibbon />
        <TechStackShowcaseSection @open-course="openCourse" />
        <LearnFirstWorkflowSection
          @open-courses="navigate('courses')"
          @open-roadmap="navigate('roadmap')"
        />
        <FeaturedCoursesStrip
          @open-course="openCourse"
          @buy-course="openCourseCheckout"
          @view-all-courses="navigate('courses')"
        />
        <EditorialManifesto />
        <StudentOutcomesSection />
        <FaqAccordionSection />
      </template>

      <!-- PAGE 2: Dedicated Courses Catalog & Matrix Page -->
      <template v-else-if="activePage === 'courses'">
        <PageHeroBanner
          :kicker="t(PAGES_COPY.banners.courses.kicker)"
          :title="t(PAGES_COPY.banners.courses.title)"
          :subtitle="t(PAGES_COPY.banners.courses.subtitle)"
          :stats="PAGES_COPY.banners.courses.stats.map((s) => ({ value: s.value, label: t(s.label) }))"
          :cta-label="t(copy.hero.ctaPro)"
          @cta="navigate('pricing')"
        />
        <TechStackShowcaseSection @open-course="openCourse" />
        <CourseCatalogSection
          @open-course="openCourse"
          @buy-course="openCourseCheckout"
        />
        <CurriculumMatrixSection @open-course="openCourse" />
        <FaqAccordionSection />
      </template>

      <!-- PAGE 3: Dedicated Roadmap & Career Milestones Page -->
      <template v-else-if="activePage === 'roadmap'">
        <PageHeroBanner
          :kicker="t(PAGES_COPY.banners.roadmap.kicker)"
          :title="t(PAGES_COPY.banners.roadmap.title)"
          :subtitle="t(PAGES_COPY.banners.roadmap.subtitle)"
          :stats="PAGES_COPY.banners.roadmap.stats.map((s) => ({ value: s.value, label: t(s.label) }))"
          :cta-label="t(copy.hero.ctaPrimary)"
          @cta="navigate('courses')"
        />
        <LearningRoadmapSection @explore-courses="navigate('courses')" />
        <CareerMilestonesSection />
        <StudentOutcomesSection />
      </template>

      <!-- PAGE 4: Dedicated About FrontDev & Mentors Page -->
      <template v-else-if="activePage === 'about'">
        <PageHeroBanner
          :kicker="t(PAGES_COPY.banners.about.kicker)"
          :title="t(PAGES_COPY.banners.about.title)"
          :subtitle="t(PAGES_COPY.banners.about.subtitle)"
          :stats="PAGES_COPY.banners.about.stats.map((s) => ({ value: s.value, label: t(s.label) }))"
          :cta-label="t(copy.hero.ctaPrimary)"
          @cta="navigate('courses')"
        />
        <EditorialManifesto />
        <MentorsAndStudioSection />
        <StudentOutcomesSection />
        <FaqAccordionSection />
      </template>

      <!-- PAGE 5: Dedicated Pricing & Comparison Page -->
      <template v-else-if="activePage === 'pricing'">
        <PageHeroBanner
          :kicker="t(PAGES_COPY.banners.pricing.kicker)"
          :title="t(PAGES_COPY.banners.pricing.title)"
          :subtitle="t(PAGES_COPY.banners.pricing.subtitle)"
          :stats="PAGES_COPY.banners.pricing.stats.map((s) => ({ value: s.value, label: t(s.label) }))"
          :cta-label="t(copy.hero.ctaPrimary)"
          @cta="navigate('courses')"
        />
        <SubscriptionPricingSection @select-plan="openPlanCheckout" />
        <PlanComparisonSection />
        <FaqAccordionSection />
      </template>

      <!-- PAGE 6: Dedicated Course Detail & Paid Learn-First Studio -->
      <CourseStudioView
        v-else-if="activePage === 'course' && selectedCourse"
        :course="selectedCourse"
        @back="navigate('courses')"
        @buy-course="openCourseCheckout"
        @open-subscription="navigate('pricing')"
        @open-dashboard="navigate('dashboard')"
      />

      <!-- PAGE 7: Dedicated Student Personal Cabinet -->
      <StudentDashboardView
        v-else-if="activePage === 'dashboard'"
        @open-course="openCourse"
        @open-auth="openAuthModal('login')"
        @open-subscription="navigate('pricing')"
        @view-certificate="(cert) => (activeCertificate = cert)"
      />
    </main>

    <SiteFooter @navigate="navigate" />

    <!-- Modals -->
    <AuthModal
      :is-open="authOpen"
      :initial-mode="authMode"
      @authenticated="closeAuthModal"
      @close="closeAuthModal"
    />

    <CheckoutModal
      :target="checkoutTarget"
      @completed="handleCheckoutCompleted"
      @close="checkoutTarget = null"
      @need-auth="
        checkoutTarget = null;
        openAuthModal('login');
      "
    />

    <CertificateModal
      :certificate="activeCertificate"
      @close="activeCertificate = null"
    />

    <MascotCompanionDock />
  </div>
</template>
