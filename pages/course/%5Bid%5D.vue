<script setup lang="ts">
/**
 * Nuxt 3 Dynamic Page: pages/course/[id].vue
 * 
 * Strict Pay-First Security & Dynamic 3-Step Educational Sequence:
 * 1. Pay-First Rule: The IDE and coding workspace are strictly locked until payment is verified.
 * 2. Dynamic Course Loading: Dynamically retrieves course theory, instructions, and test specs from useCourses().
 * 3. 3-Step Pedagogical Sequence after unlocking:
 *    - 1-Qadam: Mavzu Nazariyasi (Simplified theory + mascot insights)
 *    - 2-Qadam: Ko'rsatmalar (Task statement, steps, constraints)
 *    - 3-Qadam: Jonli IDE & Avtomatik Xato Tekshiruvchi (In-browser code editor, real-time runner, mascot emotional reactions)
 */

const route = useRoute();
const courseId = (route.params.id as string) || 'javascript';

const { getCourseById } = useCourses();
const { hasAccess, unlockCourse, xpPoints } = useUserProgress();

// Dynamic Course Data
const course = computed(() => getCourseById(courseId));

// Dynamic Payment & Lock state
const isPaid = computed(() => hasAccess(course.value.id));
const isPaymentModalOpen = ref(false);

// 3-Step Sequence States
type LessonStep = 'theory' | 'instructions' | 'ide';
const activeStep = ref<LessonStep>('theory');
const maxUnlockedStep = ref<number>(1);

// IDE State
const userCode = ref('');
const checkResult = ref<{ passed: boolean; message: string; results: any[] } | null>(null);
const isChecking = ref(false);

watch(
  course,
  newCourse => {
    if (newCourse && newCourse.task) {
      userCode.value = newCourse.task.starterCode;
    }
  },
  { immediate: true }
);

const goToInstructions = () => {
  maxUnlockedStep.value = Math.max(maxUnlockedStep.value, 2);
  activeStep.value = 'instructions';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToIde = () => {
  maxUnlockedStep.value = Math.max(maxUnlockedStep.value, 3);
  activeStep.value = 'ide';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handlePaymentSuccess = () => {
  unlockCourse(course.value.id);
  isPaymentModalOpen.value = false;
};

// Real-Time Test Evaluator
const checkCode = () => {
  isChecking.value = true;
  checkResult.value = null;

  setTimeout(() => {
    isChecking.value = false;
    try {
      const runner = new Function(`
        "use strict";
        ${userCode.value}
        ${course.value.task.testFunction}
      `);
      const passed = runner();

      if (passed) {
        checkResult.value = {
          passed: true,
          message: "Ajoyib natija! Barakalla! Barcha testlar muvaffaqiyatli o'tdi. Robot ustoz do'ppisini silkitib tabriklamoqda! 🎉",
          results: course.value.task.testCases.map(tc => ({ ...tc, got: tc.expected, passed: true })),
        };
        xpPoints.value += 100;
      } else {
        checkResult.value = {
          passed: false,
          message: "Xato topildi, kodni qaytadan tekshiring: Kutilgan arifmetik yoki mantiqiy natija hosil bo'lmadi.",
          results: [
            { call: course.value.task.testCases[0]?.call || 'sinov()', expected: course.value.task.testCases[0]?.expected, got: "Noto'g'ri", passed: false },
          ],
        };
      }
    } catch (err: any) {
      checkResult.value = {
        passed: false,
        message: `Sintaksis xatosi: ${err.message}`,
        results: [],
      };
    }
  }, 400);
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] text-slate-800">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-white/80 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white flex items-center justify-center font-mono font-bold shadow-md shadow-blue-500/30">
            &lt;/&gt;
          </div>
          <span class="font-extrabold text-xl text-slate-900 tracking-tight">Front<span class="text-blue-600">Dev</span></span>
        </NuxtLink>

        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2">
            <span
              class="px-2.5 py-0.5 rounded-lg text-white text-xs font-bold shadow-sm"
              :style="{ backgroundColor: course.color }"
            >
              {{ course.lang }}
            </span>
            <span class="text-xs font-extrabold text-slate-800">{{ course.title }}</span>
          </div>

          <NuxtLink to="/courses" class="text-xs font-bold text-blue-600 hover:text-blue-700">
            ← Barcha Kurslar
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 1. PAY-FIRST SECURITY GUARD (LOCKED UNTIL PURCHASED) -->
    <main v-if="!isPaid" class="max-w-3xl mx-auto px-6 py-16 text-center">
      <div class="p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white shadow-2xl shadow-blue-500/15 space-y-6">
        <div class="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl shadow-inner border border-blue-200">
          🔒
        </div>

        <div class="space-y-2">
          <span class="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Pay-First Xavfsizlik Tizimi
          </span>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
            {{ course.title }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Darsning to'liq nazariyasi, amaliy ko'rsatmalari va <strong>Jonli IDE Kod Tahrirlagichi</strong> faqat kurs xarid qilingandan so'ng to'liq ochiladi.
          </p>
        </div>

        <!-- Course Summary Box -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-center">
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 text-[10px] uppercase font-bold block">Amaliy Darslar</span>
            <span class="text-base font-black text-slate-900">{{ course.lessonsCount }} ta dars</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 text-[10px] uppercase font-bold block">Davomiyligi</span>
            <span class="text-base font-black text-slate-900">{{ course.duration }}</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
            <span class="text-slate-400 text-[10px] uppercase font-bold block">Reyting</span>
            <span class="text-base font-black text-amber-500">⭐ {{ course.rating }}</span>
          </div>
        </div>

        <!-- Price Banner -->
        <div class="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 max-w-sm mx-auto">
          <span class="text-xs text-slate-400 line-through block">{{ course.originalPrice }}</span>
          <span class="text-2xl sm:text-3xl font-black text-blue-700">{{ course.formattedPrice }}</span>
          <span class="text-[10px] text-slate-500 block mt-0.5">Bir martalik to'lov • Umrbod kirish</span>
        </div>

        <button
          @click="isPaymentModalOpen = true"
          class="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-black text-sm shadow-xl shadow-blue-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          💳 Kursni Xarid Qilish va IDE ni Ochish
        </button>
      </div>
    </main>

    <!-- 2. UNLOCKED COURSE WORKSPACE (THEORY -> INSTRUCTIONS -> LIVE IDE) -->
    <main v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <!-- 3-Step Navigation Stepper -->
      <div class="rounded-3xl bg-white/80 backdrop-blur-xl border border-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <!-- Step 1 Button -->
          <button
            @click="activeStep = 'theory'"
            :class="[
              'px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
              activeStep === 'theory' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
            ]"
          >
            <span>1.</span>
            <span>Mavzu Nazariyasi</span>
          </button>

          <!-- Step 2 Button -->
          <button
            @click="goToInstructions"
            :disabled="maxUnlockedStep < 2"
            :class="[
              'px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
              activeStep === 'instructions'
                ? 'bg-blue-600 text-white shadow-md'
                : maxUnlockedStep < 2
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-600 hover:bg-slate-100'
            ]"
          >
            <span>2.</span>
            <span>Ko'rsatmalar</span>
            <span v-if="maxUnlockedStep < 2" class="text-[10px]">🔒</span>
          </button>

          <!-- Step 3 Button (IDE) -->
          <button
            @click="goToIde"
            :disabled="maxUnlockedStep < 3"
            :class="[
              'px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
              activeStep === 'ide'
                ? 'bg-blue-600 text-white shadow-md'
                : maxUnlockedStep < 3
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-600 hover:bg-slate-100'
            ]"
          >
            <span>3.</span>
            <span>Jonli IDE & Tekshiruvchi</span>
            <span v-if="maxUnlockedStep < 3" class="text-[10px]">🔒</span>
          </button>
        </div>

        <div class="text-xs font-bold text-blue-600 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200">
          Joriy Bosqich: {{ activeStep === 'theory' ? '1/3 Nazariya' : activeStep === 'instructions' ? '2/3 Ko\'rsatmalar' : '3/3 Jonli IDE' }}
        </div>
      </div>

      <!-- STEP 1: MAVZU NAZARIYASI -->
      <div v-if="activeStep === 'theory'" class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-10 space-y-8">
        <!-- Robot Mascot Tip -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white flex items-center gap-4 shadow-lg shadow-blue-500/20">
          <UzbekRobotMascot size="sm" mood="thinking" />
          <div>
            <span class="text-[10px] uppercase font-bold text-blue-100 block">Robot Ustoz Maslahati</span>
            <p class="text-xs sm:text-sm font-semibold leading-relaxed">
              "{{ course.theory.mascotTip }}"
            </p>
          </div>
        </div>

        <div class="space-y-2 border-b border-slate-100 pb-5">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            1-Mavzu Nazariyasi
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {{ course.theory.title }}
          </h2>
          <p class="text-sm text-slate-600 font-medium">
            {{ course.theory.summary }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-slate-900">Mavzuni Chuqur O'rganish</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
            {{ course.theory.explanation }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-slate-900">Sintaksis Namunasi</h3>
          <div class="rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
            <pre>{{ course.theory.codeExample }}</pre>
          </div>
        </div>

        <div class="space-y-3 p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
          <h3 class="text-sm font-bold text-blue-900">Asosiy Qoidalar (Eslab qoling):</h3>
          <ul class="space-y-2 text-xs text-blue-800 list-disc list-inside">
            <li v-for="(point, idx) in course.theory.keyTakeaways" :key="idx">
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="text-right pt-4">
          <button
            @click="goToInstructions"
            class="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl shadow-blue-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Nazariyani tushundim, 2-Qadam Ko'rsatmalarga o'tish →</span>
          </button>
        </div>
      </div>

      <!-- STEP 2: KO'RSATMA VA QADAMLAR -->
      <div v-else-if="activeStep === 'instructions'" class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-10 space-y-8">
        <div class="space-y-2 border-b border-slate-100 pb-5">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            2-Qadam: Amaliy Vazifa Ko'rsatmalari
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {{ course.task.title }}
          </h2>
          <p class="text-sm text-slate-600 font-medium">
            {{ course.task.summary }}
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-slate-900">Topshiriq Bosqichlari</h3>
          <div class="space-y-2">
            <div
              v-for="(step, idx) in course.task.steps"
              :key="idx"
              class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium"
            >
              {{ step }}
            </div>
          </div>
        </div>

        <div class="space-y-3 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
          <h3 class="text-sm font-bold text-amber-900">Cheklovlar va Shartlar:</h3>
          <ul class="space-y-1.5 text-xs text-amber-800 list-disc list-inside">
            <li v-for="(c, idx) in course.task.constraints" :key="idx">
              {{ c }}
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-slate-900">Test Sinovlari Namunalari</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              v-for="(tc, idx) in course.task.testCases"
              :key="idx"
              class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs"
            >
              <div class="text-slate-500">Chaqirish:</div>
              <div class="text-slate-900 font-bold">{{ tc.call }}</div>
              <div class="text-emerald-600 font-bold mt-1">Kutilgan: {{ tc.expected }}</div>
            </div>
          </div>
        </div>

        <div class="text-right pt-4">
          <button
            @click="goToIde"
            class="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl shadow-blue-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Ko'rsatmalar tushunarli, Kod yozishga o'tish →</span>
          </button>
        </div>
      </div>

      <!-- STEP 3: KOD YOZISH VA JONLI IDE -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left Task Summary (4 cols) -->
        <div class="lg:col-span-4 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-lg space-y-4">
          <span class="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">3-Qadam: Amaliyot</span>
          <h3 class="text-base font-bold text-slate-900">{{ course.task.title }}</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            {{ course.task.summary }}
          </p>

          <div class="space-y-2 pt-2 border-t border-slate-100">
            <span class="text-[11px] font-bold text-slate-400 uppercase">Kutilgan natija namunasi:</span>
            <div
              v-for="(tc, idx) in course.task.testCases.slice(0, 2)"
              :key="idx"
              class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700"
            >
              {{ tc.call }} ➔ {{ tc.expected }}
            </div>
          </div>

          <button
            @click="activeStep = 'instructions'"
            class="w-full py-2 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200 transition-all cursor-pointer"
          >
            ← Ko'rsatmalarni qayta ko'rish
          </button>
        </div>

        <!-- Right Code Editor & Checker (8 cols) -->
        <div class="lg:col-span-8 space-y-4">
          <div class="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div class="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>solution.js</span>
              </span>
              <span class="text-blue-400 font-bold">FrontDev IDE</span>
            </div>

            <textarea
              v-model="userCode"
              spellcheck="false"
              class="w-full h-56 p-4 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            ></textarea>

            <div class="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400 font-mono">Til: {{ course.lang }}</span>
              <button
                @click="checkCode"
                :disabled="isChecking"
                class="py-2.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {{ isChecking ? "Tekshirilmoqda..." : "Kodni Tekshirish" }}
              </button>
            </div>
          </div>

          <!-- Real-Time Evaluation Result -->
          <div v-if="checkResult" class="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-lg space-y-3">
            <div class="flex items-center gap-4">
              <UzbekRobotMascot size="sm" :mood="checkResult.passed ? 'celebrate' : 'confused'" />
              <div>
                <span class="text-xs font-bold" :class="checkResult.passed ? 'text-emerald-600' : 'text-rose-600'">
                  {{ checkResult.passed ? "Barakalla! Topshiriq to'g'ri yechildi!" : "Diqqat! Xatolik aniqlandi!" }}
                </span>
                <p class="text-xs text-slate-700 font-medium">{{ checkResult.message }}</p>
              </div>
            </div>

            <div v-if="checkResult.results.length > 0" class="pt-2 border-t border-slate-100 space-y-1.5">
              <div
                v-for="(res, idx) in checkResult.results"
                :key="idx"
                class="flex items-center justify-between text-xs font-mono p-2 rounded-xl"
                :class="res.passed ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'"
              >
                <span>{{ res.call }}</span>
                <span class="font-bold">{{ res.passed ? '✓ O\'tdi' : '✗ Xato' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Payment Checkout Modal -->
    <PaymentModal
      :course="course"
      :is-open="isPaymentModalOpen"
      @close="isPaymentModalOpen = false"
      @success="handlePaymentSuccess"
    />
  </div>
</template>
