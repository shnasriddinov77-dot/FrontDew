<script setup lang="ts">
/**
 * Nuxt 3 Course Workspace Page: pages/course/[id].vue
 * Strict Order & Educational Logic:
 * 1. Pay-First Rule: Access strictly locked until payment is verified via Uzcard / Humo.
 * 2. Step-by-Step Learning Flow inside the Course:
 *    - 1-Qadam: Mavzu Nazariyasi (Theory First with 3D Robot Mascot)
 *    - 2-Qadam: Ko'rsatma va Qadamlar (Instructions & Problem Statement)
 *    - 3-Qadam: Kod Yozish va IDE (Coding & Real-Time Code Checker)
 */
import { useCourses } from '~/composables/useCourses';
import { useUserProgress } from '~/composables/useUserProgress';

const route = useRoute();
const courseId = (route.params.id as string) || 'javascript';

const { getCourseById } = useCourses();
const { hasAccess, unlockCourse } = useUserProgress();

const currentCourse = computed(() => getCourseById(courseId));

// Pay-First Access Lock State
const isPaid = ref(hasAccess(courseId));
const isPaymentModalOpen = ref(false);

// Strict 3-Step Learning Sequence
type LessonStep = 'theory' | 'instructions' | 'ide';
const activeStep = ref<LessonStep>('theory');
const maxUnlockedStep = ref<number>(1);

// Dynamic Theory and Task Data from current course
const lessonTheory = computed(() => currentCourse.value.theory);
const lessonInstructions = computed(() => currentCourse.value.task);

// Step 3: Interactive Code Editor State
const userCode = ref(currentCourse.value.task.starterCode);
watch(currentCourse, (newVal) => {
  if (newVal) {
    userCode.value = newVal.task.starterCode;
  }
});

const checkResult = ref<{ passed: boolean; message: string; results: any[] } | null>(null);
const isChecking = ref(false);

const checkCode = () => {
  isChecking.value = true;
  checkResult.value = null;

  setTimeout(() => {
    isChecking.value = false;
    try {
      // Dynamic real-time evaluation of user code against course test cases
      const testFnBody = `
        "use strict";
        ${userCode.value}
        ${currentCourse.value.task.testFunction}
      `;
      const runner = new Function(testFnBody);
      const passed = runner();

      if (passed) {
        checkResult.value = {
          passed: true,
          message: "Ajoyib natija! Barakalla! Barcha testlar muvaffaqiyatli o'tdi. Robot ustoz do'ppisini silkitib tabriklamoqda! 🎉",
          results: currentCourse.value.task.testCases.map(tc => ({
            call: tc.call,
            expected: tc.expected,
            got: tc.expected,
            passed: true
          })),
        };
      } else {
        checkResult.value = {
          passed: false,
          message: "Xato topildi, kodni qaytadan tekshiring: Kutilgan arifmetik natija hosil bo'lmadi.",
          results: [
            { call: currentCourse.value.task.testCases[0]?.call || 'test()', expected: currentCourse.value.task.testCases[0]?.expected, got: "Noto'g'ri", passed: false },
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
  unlockCourse(courseId);
  isPaid.value = true;
  isPaymentModalOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] text-slate-800 p-4 sm:p-6">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Breadcrumb / Header navigation -->
      <div class="flex items-center justify-between">
        <NuxtLink to="/courses" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600">
          ← Barcha kurslarga qaytish
        </NuxtLink>
        <div class="flex items-center gap-2">
          <span :class="['px-3 py-1 rounded-full text-xs font-bold', isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800']">
            {{ isPaid ? "✓ Kurs Ochiq" : "🔒 Darslar Qulflangan" }}
          </span>
        </div>
      </div>

      <!-- PAYWALL GUARD SCREEN (If Not Paid) -->
      <div v-if="!isPaid" class="rounded-3xl bg-white/90 backdrop-blur-2xl border border-white shadow-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
        <!-- 3D Mascot in Chapan and Doppa -->
        <div class="w-24 h-24 mx-auto relative flex items-center justify-center">
          <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20">
            🤖
          </div>
          <div class="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-[10px] font-black text-slate-900 shadow">
            FrontBot
          </div>
        </div>

        <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
          <span>🔒 Amaliy dars qulflangan (Pay-First Qoidasi)</span>
        </div>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {{ currentCourse.title }}
        </h2>
        <p class="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          Dars nazariyasi, amaliy topshiriq ko'rsatmalari va avtomatik kod tekshirish muhiti (IDE)dan foydalanish uchun kursni xarid qiling.
        </p>

        <div class="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 text-left text-xs text-slate-700 max-w-md mx-auto space-y-2.5">
          <div class="flex items-center gap-2.5">
            <span class="text-emerald-600 font-bold">✓</span>
            <span>1-Qadam: Mavzu Nazariyasi (Theory First)</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="text-emerald-600 font-bold">✓</span>
            <span>2-Qadam: Ko'rsatma va Qadamlar (Instructions)</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="text-emerald-600 font-bold">✓</span>
            <span>3-Qadam: Jonli IDE & Robot Ustoz Reaksiyalari</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="text-emerald-600 font-bold">✓</span>
            <span>Uzcard (8600) va Humo (9860) orqali lahzalik xarid</span>
          </div>
        </div>

        <button
          @click="isPaymentModalOpen = true"
          class="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all cursor-pointer"
        >
          {{ currentCourse.formattedPrice }} to'lash va darsni ochish
        </button>
      </div>

      <!-- UNLOCKED VIEW: STRICT 3-STEP LEARNING FLOW -->
      <div v-else class="space-y-6">
        <!-- Step Navigation Tabs (Strict 3-Step Sequence) -->
        <div class="p-2.5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Step 1 Button -->
            <button
              @click="activeStep = 'theory'"
              :class="activeStep === 'theory' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📖 1-Qadam: Mavzu Tahlili & Tushuntirish</span>
            </button>

            <!-- Step 2 Button -->
            <button
              @click="goToInstructions"
              :class="activeStep === 'instructions' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📋 2-Qadam: Bosqichma-bosqich Ko'rsatma</span>
            </button>

            <!-- Step 3 Button -->
            <button
              @click="goToIde"
              :class="activeStep === 'ide' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>💻 3-Qadam: Jonli IDE & Xato Tekshiruvi</span>
            </button>
          </div>

          <div class="text-xs font-bold text-blue-600 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200">
            Joriy Bosqich: {{ activeStep === 'theory' ? '1/3 Nazariya' : activeStep === 'instructions' ? '2/3 Ko\'rsatmalar' : '3/3 Kod Tekshirish' }}
          </div>
        </div>

        <!-- 1-QADAM: MAVZU NAZARIYASI (THEORY FIRST) -->
        <div v-if="activeStep === 'theory'" class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-10 space-y-8">
          <!-- Mascot Tip Banner -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white flex items-center gap-4 shadow-lg shadow-blue-500/20">
            <div class="text-3xl shrink-0 p-2 rounded-2xl bg-white/20 backdrop-blur-md">
              🤖
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-blue-100 block">Robot Ustoz Maslahati</span>
              <p class="text-xs sm:text-sm font-semibold leading-relaxed">
                "{{ lessonTheory.mascotTip }}"
              </p>
            </div>
          </div>

          <div class="space-y-2 border-b border-slate-100 pb-5">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              1-Mavzu Nazariyasi
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {{ lessonTheory.title }}
            </h2>
            <p class="text-sm text-slate-600 font-medium">
              {{ lessonTheory.summary }}
            </p>
          </div>

          <!-- Explanation -->
          <div class="space-y-3">
            <h3 class="text-base font-bold text-slate-900">Mavzuni Chuqur O'rganish</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
              {{ lessonTheory.explanation }}
            </p>
          </div>

          <!-- Code Example -->
          <div class="space-y-3">
            <h3 class="text-base font-bold text-slate-900">Sintaksis Namunasi</h3>
            <div class="rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
              <pre>{{ lessonTheory.codeExample }}</pre>
            </div>
          </div>

          <!-- Key Takeaways -->
          <div class="space-y-3 p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <h3 class="text-sm font-bold text-blue-900">Asosiy Qoidalar (Eslab qoling):</h3>
            <ul class="space-y-2 text-xs text-blue-800 list-disc list-inside">
              <li v-for="(point, idx) in lessonTheory.keyTakeaways" :key="idx">
                {{ point }}
              </li>
            </ul>
          </div>

          <!-- Action Button to Step 2 -->
          <div class="text-right pt-4">
            <button
              @click="goToInstructions"
              class="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl shadow-blue-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Nazariyani tushundim, 2-Qadam Ko'rsatmalarga o'tish →</span>
            </button>
          </div>
        </div>

        <!-- 2-QADAM: KO'RSATMA VA QADAMLAR (INSTRUCTIONS) -->
        <div v-else-if="activeStep === 'instructions'" class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-10 space-y-8">
          <div class="space-y-2 border-b border-slate-100 pb-5">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              2-Qadam: Amaliy Vazifa Ko'rsatmalari
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {{ lessonInstructions.taskTitle }}
            </h2>
            <p class="text-sm text-slate-600 font-medium">
              {{ lessonInstructions.taskSummary }}
            </p>
          </div>

          <!-- Step-by-Step Instructions List -->
          <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-900">Topshiriqni Bajarish Ketma-Ketligi:</h3>
            <div class="space-y-2.5">
              <div
                v-for="(st, idx) in lessonInstructions.steps"
                :key="idx"
                class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium flex items-center gap-3"
              >
                <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                  {{ idx + 1 }}
                </span>
                <span>{{ st }}</span>
              </div>
            </div>
          </div>

          <!-- Constraints & Test Cases -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <h4 class="text-xs font-bold text-amber-900 uppercase">Cheklovlar & Talablar</h4>
              <ul class="text-xs text-amber-800 space-y-1 list-disc list-inside">
                <li v-for="(c, idx) in lessonInstructions.constraints" :key="idx">{{ c }}</li>
              </ul>
            </div>

            <div class="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <h4 class="text-xs font-bold text-blue-900 uppercase">Kutilgan Test Natijalari</h4>
              <div class="space-y-1 text-xs font-mono text-slate-700">
                <div v-for="(t, idx) in lessonInstructions.testCases" :key="idx" class="flex justify-between">
                  <span>{{ t.call }}</span>
                  <span class="text-blue-600 font-bold">➔ {{ t.expected }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-4">
            <button
              @click="activeStep = 'theory'"
              class="py-2.5 px-5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
            >
              ← Nazariyani qayta o'qish
            </button>
            <button
              @click="goToIde"
              class="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl shadow-blue-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Ko'rsatmalar tushunarli, Kod yozishga o'tish →</span>
            </button>
          </div>
        </div>

        <!-- 3-QADAM: KOD YOZISH VA IDE (LIVE CHECKER) -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Left Mini Summary (4 cols) -->
          <div class="lg:col-span-4 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-lg space-y-4">
            <span class="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">3-Qadam: Amaliyot</span>
            <h3 class="text-base font-bold text-slate-900">sum(a, b) funksiyasi</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Ikkita sonning yig'indisini hisoblab, qaytaring. Kodni yozib bo'lgach, "Tekshirish" tugmasini bosing.
            </p>

            <div class="space-y-2 pt-2 border-t border-slate-100">
              <span class="text-[11px] font-bold text-slate-400 uppercase">Kutilgan testlar:</span>
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                sum(2, 3) ➔ 5
              </div>
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                sum(10, -4) ➔ 6
              </div>
            </div>

            <button
              @click="activeStep = 'instructions'"
              class="w-full py-2 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200 transition-all cursor-pointer"
            >
              ← Ko'rsatmalarni qayta ko'rish
            </button>
          </div>

          <!-- Code Editor & Checker (8 cols) -->
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
                class="w-full h-56 p-4 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none"
              ></textarea>

              <div class="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                <span class="text-[11px] text-slate-400 font-mono">Til: JavaScript ES2024</span>
                <button
                  @click="checkCode"
                  :disabled="isChecking"
                  class="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {{ isChecking ? "Tekshirilmoqda..." : "Kodni Tekshirish" }}
                </button>
              </div>
            </div>

            <!-- Real-Time Evaluation Result with Robot Mascot Feedback -->
            <div v-if="checkResult" class="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-lg space-y-3">
              <div class="flex items-center gap-3">
                <div class="text-2xl">🤖</div>
                <div>
                  <span class="text-xs font-bold" :class="checkResult.passed ? 'text-emerald-600' : 'text-rose-600'">
                    {{ checkResult.passed ? "Barakalla!" : "Diqqat!" }}
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
      </div>
    </div>

    <!-- Payment Checkout Modal -->
    <PaymentModal
      :course="currentCourse"
      :is-open="isPaymentModalOpen"
      @close="isPaymentModalOpen = false"
      @success="handlePaymentSuccess"
    />
  </div>
</template>
