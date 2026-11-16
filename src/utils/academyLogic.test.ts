import test from 'node:test';
import assert from 'node:assert/strict';
import { FRONTEND_COURSES } from '../data/frontendCourses';
import {
  calculateCheckoutTotal,
  calculateCourseProgress,
  evaluatePracticeSnippet,
  filterCourses,
  formatCardDigits,
  formatCardExpiry,
  getCourseLessonsCount,
  gradeQuiz,
  hasAccessToCourse,
  pluralizeLessons,
  runAndVerifyLessonCode,
  validateCheckoutCard,
} from './academyLogic';
import { buildCssPreviewSrcdoc, executeEducationalCode } from './codePlayground';
import { getMascotIdleLine, resolveMascotReaction } from './mascotGestures';
import { analyzeLessonPedagogy, getCourseTechLogos } from './pedagogyAnalyzer';

test('pluralizeLessons and getCourseLessonsCount format Russian lesson counts accurately', () => {
  assert.equal(pluralizeLessons(1), '1 урок');
  assert.equal(pluralizeLessons(2), '2 урока');
  assert.equal(pluralizeLessons(4), '4 урока');
  assert.equal(pluralizeLessons(6), '6 уроков');
  assert.equal(pluralizeLessons(11), '11 уроков');
  assert.equal(getCourseLessonsCount(FRONTEND_COURSES[0]), 4);
});

test('filterCourses filters by category, free/pro tier, and search query', () => {
  const vuePaid = filterCourses(FRONTEND_COURSES, {
    category: 'vue',
    tier: 'pro',
    search: 'Pinia',
  });
  assert.equal(vuePaid.length, 1);
  assert.equal(vuePaid[0].id, 'vue-3-architecture');

  const freeOnly = filterCourses(FRONTEND_COURSES, {
    category: 'all',
    tier: 'free',
    search: '',
  });
  assert.ok(freeOnly.length >= 2);
  assert.ok(freeOnly.every((c) => c.isFree));
});

test('hasAccessToCourse respects free courses, individual purchase, and PRO subscription', () => {
  const paidCourse = { id: 'vue-3-architecture', isFree: false };
  const freeCourse = { id: 'html-css-foundations', isFree: true };

  assert.equal(hasAccessToCourse(freeCourse, 'free', []), true);
  assert.equal(hasAccessToCourse(paidCourse, 'free', []), false);
  assert.equal(hasAccessToCourse(paidCourse, 'free', ['vue-3-architecture']), true);
  assert.equal(hasAccessToCourse(paidCourse, 'pro-monthly', []), true);
  assert.equal(hasAccessToCourse(paidCourse, 'pro-annual', []), true);
});

test('calculateCheckoutTotal applies FRONT20 and FRONTDEV30 promo codes accurately', () => {
  const res20 = calculateCheckoutTotal(10000, 'front20');
  assert.equal(res20.promoValid, true);
  assert.equal(res20.discountPercent, 20);
  assert.equal(res20.total, 8000);

  const res30 = calculateCheckoutTotal(10000, 'frontdev30');
  assert.equal(res30.promoValid, true);
  assert.equal(res30.discountPercent, 30);
  assert.equal(res30.total, 7000);

  const invalid = calculateCheckoutTotal(10000, 'UNKNOWN');
  assert.equal(invalid.promoValid, false);
  assert.equal(invalid.total, 10000);
});

test('card formatting and validation reject malformed inputs and accept valid ones', () => {
  assert.equal(formatCardDigits('8600123456789012'), '8600 1234 5678 9012');
  assert.equal(formatCardExpiry('0928'), '09/28');

  assert.equal(validateCheckoutCard('8600 1234', '09/28', '123', 'uz').valid, false);
  assert.equal(validateCheckoutCard('8600 1234 5678 9012', '15/28', '123', 'en').valid, false);
  assert.equal(validateCheckoutCard('8600 1234 5678 9012', '09/28', '12', 'ru').valid, false);
  assert.equal(validateCheckoutCard('8600 1234 5678 9012', '09/28', '123', 'uz').valid, true);
});

test('calculateCourseProgress, gradeQuiz, and evaluatePracticeSnippet work deterministically', () => {
  const course = FRONTEND_COURSES[0];
  const progress = calculateCourseProgress(course, [course.modules[0].lessons[0].id]);
  assert.equal(progress.completedCount, 1);
  assert.ok(progress.percent > 0 && progress.percent < 100);

  const answers: Record<string, number> = {};
  for (const q of course.quiz) {
    answers[q.id] = q.correctIndex;
  }
  const graded = gradeQuiz(course.quiz, answers);
  assert.equal(graded.passed, true);
  assert.equal(graded.percent, 100);

  const practiceFail = evaluatePracticeSnippet('const x = 1;', 'computed', 'uz');
  assert.equal(practiceFail.passed, false);
  assert.ok(practiceFail.feedback.includes('computed'));

  const practiceOk = evaluatePracticeSnippet('const total = computed(() => count.value * 2);', 'computed', 'uz');
  assert.equal(practiceOk.passed, true);
});

test('executeEducationalCode runs JS/Vue reactivity snippets and catches syntax errors safely', () => {
  const vueRes = executeEducationalCode(`
    import { ref, computed } from 'vue';
    const count = ref(4);
    const doubled = computed(() => count.value * 2);
    console.log('result:', doubled.value);
  `);
  assert.equal(vueRes.ok, true);
  assert.deepEqual(vueRes.logs, ['result: 8']);

  const errRes = executeEducationalCode('const x = ;');
  assert.equal(errRes.ok, false);
  assert.ok(errRes.error && errRes.error.length > 0);

  const html = buildCssPreviewSrcdoc('.gallery { display: grid; gap: 16px; }');
  assert.ok(html.includes('display: grid'));
});

test('runAndVerifyLessonCode executes code and verifies both syntax and lesson goal', () => {
  const starter = `const count = ref(4);\nconst doubleCount = `;

  const unchanged = runAndVerifyLessonCode(starter, starter, 'computed', {
    locale: 'uz',
    executeJs: executeEducationalCode,
  });
  assert.equal(unchanged.passed, false);

  const syntaxErr = runAndVerifyLessonCode('const doubleCount = computed(() => );', starter, 'computed', {
    locale: 'uz',
    executeJs: executeEducationalCode,
  });
  assert.equal(syntaxErr.passed, false);
  assert.ok(syntaxErr.error);

  const validJs = `const count = ref(4);\nconst doubleCount = computed(() => count.value * 2);\nconsole.log(doubleCount.value);`;
  const passedJs = runAndVerifyLessonCode(validJs, starter, 'computed', {
    locale: 'uz',
    executeJs: executeEducationalCode,
  });
  assert.equal(passedJs.passed, true);
  assert.deepEqual(passedJs.logs, ['8']);

  const cssStarter = `.gallery {\n}`;
  const validCss = `.gallery {\n  display: grid;\n  gap: 24px;\n}`;
  const passedCss = runAndVerifyLessonCode(validCss, cssStarter, 'grid', {
    isCssPreview: true,
    locale: 'uz',
    executeJs: executeEducationalCode,
  });
  assert.equal(passedCss.passed, true);

  const brokenCss = `.gallery {\n  display: grid;`;
  const failedCss = runAndVerifyLessonCode(brokenCss, cssStarter, 'grid', {
    isCssPreview: true,
    locale: 'uz',
    executeJs: executeEducationalCode,
  });
  assert.equal(failedCss.passed, false);
  assert.ok(failedCss.error);
});

test('resolveMascotReaction maps platform events to friendly GSAP gestures and localized lines', () => {
  assert.equal(resolveMascotReaction('welcome').gesture, 'wave');
  assert.equal(resolveMascotReaction('hover-cta').gesture, 'point');
  assert.equal(resolveMascotReaction('study-confirmed').gesture, 'think');
  assert.equal(resolveMascotReaction('code-pass').gesture, 'celebrate');
  assert.equal(resolveMascotReaction('code-fail').gesture, 'encourage');
  assert.equal(resolveMascotReaction('purchase-success').gesture, 'celebrate');

  const tip = resolveMascotReaction('code-pass').speech;
  assert.ok(tip.uz.length > 0 && tip.ru.length > 0 && tip.en.length > 0);
  assert.ok(getMascotIdleLine('uz').includes('FrontDev'));
  assert.ok(getMascotIdleLine('en').includes('FrontDev'));
});

test('pedagogyAnalyzer adapts guidance by progress and maps official language logos', () => {
  const vueCourse = FRONTEND_COURSES[0];
  const firstLesson = vueCourse.modules[0].lessons[0];

  const phase1 = analyzeLessonPedagogy(vueCourse, firstLesson, 0, 4, 'uz');
  const phase2 = analyzeLessonPedagogy(vueCourse, firstLesson, 2, 4, 'uz');
  const phase3 = analyzeLessonPedagogy(vueCourse, firstLesson, 3, 4, 'uz');

  assert.notEqual(phase1.stageBadge.uz, phase2.stageBadge.uz);
  assert.notEqual(phase2.stageBadge.uz, phase3.stageBadge.uz);
  assert.ok(phase1.blueprint.mentalModelBody.uz.length > 20);
  assert.equal(phase1.blueprint.microCheck.options.uz.length, 3);
  assert.equal(phase1.blueprint.microCheck.options.ru.length, 3);
  assert.equal(phase1.blueprint.microCheck.options.en.length, 3);

  assert.deepEqual(getCourseTechLogos('vue-3-architecture'), ['vue', 'ts', 'js']);
  assert.deepEqual(getCourseTechLogos('html-css-foundations'), ['html', 'css']);
  assert.deepEqual(getCourseTechLogos('creative-gsap-webgl'), ['gsap', 'js', 'css']);
});
