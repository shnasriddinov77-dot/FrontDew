<script setup lang="ts">
/**
 * Nuxt 3 Component: components/UserProgress.vue
 * User progress tracking panel:
 * - Completed lessons percentage & streak/XP
 * - Personalized User Growth Analytics & Weekly Progress Graph (XP & Hours)
 * - Detailed History of Mastered Topics (scores, tags, dates)
 * - Active Course Progress Bars
 */

const props = defineProps<{
  user?: {
    name: string;
    email: string;
  };
  streakDays?: number;
  xpPoints?: number;
  completedLessons?: number;
  totalLessons?: number;
}>();

const streak = computed(() => props.streakDays ?? 7);
const xp = computed(() => props.xpPoints ?? 1850);
const completed = computed(() => props.completedLessons ?? 18);
const total = computed(() => props.totalLessons ?? 42);
const percentage = computed(() => Math.min(100, Math.round((completed.value / total.value) * 100)));

const activeMetricTab = ref<'xp' | 'hours'>('xp');

// Weekly growth data
const weeklyGrowth = [
  { week: '1-Hafta', xp: 210, hours: 3.5, label: 'Dasturlash asoslari' },
  { week: '2-Hafta', xp: 340, hours: 5.0, label: 'Operatorlar va sikllar' },
  { week: '3-Hafta', xp: 480, hours: 6.2, label: 'Funksiyalar va return' },
  { week: '4-Hafta', xp: 620, hours: 8.4, label: 'Massivlar va obyektlar' },
  { week: '5-Hafta', xp: 1100, hours: 11.2, label: 'ES6+ va modullar' },
  { week: '6-Hafta (Hozir)', xp: 1850, hours: 14.5, label: 'Asinxron JS & API' },
];

// Mastered topics history
const masteredTopics = [
  {
    id: 'm1',
    title: 'Funksiyalar va Arifmetik operatorlar',
    course: 'JavaScript ES6+',
    date: 'Kecha, 18:40',
    score: '100%',
    xp: '+150 XP',
    tags: ['Functions', 'Operators', 'Return'],
  },
  {
    id: 'm2',
    title: 'Juft va toq sonlarni aniqlash algoritmi',
    course: 'JavaScript ES6+',
    date: '3 kun oldin',
    score: '100%',
    xp: '+120 XP',
    tags: ['Modulo', 'Conditionals', 'Booleans'],
  },
  {
    id: 'm3',
    title: 'Satrlar va Massiv metodlari (split, reverse, join)',
    course: 'JavaScript ES6+',
    date: '5 kun oldin',
    score: '95%',
    xp: '+180 XP',
    tags: ['Arrays', 'Strings', 'Chaining'],
  },
  {
    id: 'm4',
    title: 'CSS Flexbox va Apple Glassmorphism maketlari',
    course: 'HTML / CSS',
    date: '1 hafta oldin',
    score: '100%',
    xp: '+200 XP',
    tags: ['CSS', 'Backdrop-blur', 'Layout'],
  },
];

const activeCourses = [
  { id: 'javascript', title: 'JavaScript Zamonaviy Dasturlash', lang: 'JavaScript', progress: 68, color: '#F59E0B' },
  { id: 'vue', title: 'Vue 3 & Composition API', lang: 'Vue.js', progress: 42, color: '#10B981' },
];
</script>

<template>
  <div class="space-y-8">
    <!-- Top Stats Banner -->
    <div class="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/20">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span class="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-blue-100">
            Shaxsiy O'sish Tahlili
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold mt-2">
            Salom, {{ user?.name || 'Talaba' }}! 👋
          </h2>
          <p class="text-xs sm:text-sm text-blue-100 mt-1">
            Har hafta ko'nikmalaringiz yuksalmoqda. Unvoningiz: <strong class="text-white underline">Junior Fullstack Dasturchi</strong>
          </p>
        </div>

        <div class="flex items-center gap-4">
          <div class="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md text-center min-w-[95px]">
            <div class="text-xl font-black text-amber-300">🔥 {{ streak }}</div>
            <span class="text-[10px] uppercase font-bold text-blue-100">Kunlik seriya</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md text-center min-w-[95px]">
            <div class="text-xl font-black text-cyan-300">⚡ {{ xp }}</div>
            <span class="text-[10px] uppercase font-bold text-blue-100">XP Ball</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div class="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-2">
        <span class="text-xs text-slate-500 font-semibold block">Umumiy Natija</span>
        <div class="text-2xl font-black text-slate-900">{{ percentage }}%</div>
        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div class="bg-blue-600 h-full rounded-full transition-all" :style="{ width: `${percentage}%` }"></div>
        </div>
        <span class="text-[10px] text-slate-400 block">{{ completed }} / {{ total }} ta dars</span>
      </div>

      <div class="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-2">
        <span class="text-xs text-slate-500 font-semibold block">Ochiq Kurslar</span>
        <div class="text-2xl font-black text-blue-600">{{ activeCourses.length }} ta</div>
        <span class="text-[10px] text-slate-400 block">Amaliy darslar faol</span>
      </div>

      <div class="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-2">
        <span class="text-xs text-slate-500 font-semibold block">Haftalik Kodlash</span>
        <div class="text-2xl font-black text-slate-900">14.5 soat</div>
        <span class="text-[10px] text-slate-400 block">IDE tahrirlagichida</span>
      </div>

      <div class="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-2">
        <span class="text-xs text-slate-500 font-semibold block">Sertifikat</span>
        <div class="text-2xl font-black text-purple-600">{{ percentage >= 80 ? 'Tayyor' : `${80 - percentage}% qoldi` }}</div>
        <span class="text-[10px] text-slate-400 block">80% da rasmiy sertifikat beriladi</span>
      </div>
    </div>

    <!-- Weekly Skills Growth Analytics Chart -->
    <div class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8 space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-blue-600 font-bold text-lg">📈</span>
            <h3 class="text-lg font-bold text-slate-900">Haftalik Ko'nikmalar O'sishi Grafiki</h3>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            Oxirgi 6 haftada to'plangan XP ballar va amaliy kodlash soatlari dinamikasi
          </p>
        </div>

        <div class="flex items-center p-1 rounded-xl bg-slate-100 text-xs font-bold">
          <button
            @click="activeMetricTab = 'xp'"
            :class="activeMetricTab === 'xp' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
            class="px-3 py-1.5 rounded-lg transition-all"
          >
            XP Ballar
          </button>
          <button
            @click="activeMetricTab = 'hours'"
            :class="activeMetricTab === 'hours' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
            class="px-3 py-1.5 rounded-lg transition-all"
          >
            Kodlash Soatlari
          </button>
        </div>
      </div>

      <div class="pt-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end h-56 pt-6 pb-2 border-b border-slate-100">
          <div
            v-for="(w, idx) in weeklyGrowth"
            :key="idx"
            class="flex flex-col items-center h-full justify-end group"
          >
            <span class="text-[10px] font-bold text-blue-600 mb-1 opacity-80 group-hover:opacity-100">
              {{ activeMetricTab === 'xp' ? `${w.xp} XP` : `${w.hours} soat` }}
            </span>

            <div class="w-full max-w-[48px] bg-blue-50 hover:bg-blue-100 rounded-t-2xl transition-all h-full flex items-end justify-center p-1 border border-blue-100">
              <div
                class="w-full rounded-t-xl bg-gradient-to-t from-blue-700 to-sky-400 group-hover:from-blue-600 group-hover:to-sky-300 transition-all duration-500 shadow-sm"
                :style="{ height: `${Math.round(((activeMetricTab === 'xp' ? w.xp : w.hours) / (activeMetricTab === 'xp' ? 2000 : 16)) * 100)}%` }"
              ></div>
            </div>

            <span class="text-[11px] font-semibold text-slate-700 mt-2 text-center">{{ w.week }}</span>
            <span class="text-[9px] text-slate-400 text-center line-clamp-1 max-w-[80px]">{{ w.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed History of Mastered Topics -->
    <div class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-emerald-600 text-lg">🏆</span>
            <h3 class="text-lg font-bold text-slate-900">Muvaffaqiyatli O'zlashtirilgan Mavzular Tarixi</h3>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            Barcha testlardan 100% o'tgan amaliy topshiriqlar va olingan ballar arxivi
          </p>
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {{ masteredTopics.length }} ta mavzu mukammal
        </span>
      </div>

      <div class="space-y-3">
        <div
          v-for="topic in masteredTopics"
          :key="topic.id"
          class="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-blue-200 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              ✓
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900">{{ topic.title }}</h4>
              <div class="flex flex-wrap items-center gap-2 mt-1">
                <span class="text-xs text-slate-500 font-medium">{{ topic.course }}</span>
                <span class="text-slate-300">•</span>
                <span class="text-xs text-slate-400">{{ topic.date }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span
                  v-for="(t, idx) in topic.tags"
                  :key="idx"
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                >
                  #{{ t }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 sm:self-center self-end">
            <div class="text-right">
              <span class="text-xs font-extrabold text-emerald-600 block">Natija: {{ topic.score }}</span>
              <span class="text-[11px] font-bold text-cyan-600">{{ topic.xp }}</span>
            </div>
            <div class="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-sm">
              O'zlashtirildi
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Courses Progress Bars -->
    <div class="space-y-4">
      <h3 class="text-base font-bold text-slate-900">Faol Kurslar va Amaliyotlar</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="c in activeCourses"
          :key="c.id"
          class="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-lg space-y-4"
        >
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-1 rounded-xl text-white text-xs font-bold" :style="{ backgroundColor: c.color }">
              {{ c.lang }}
            </span>
            <span class="text-xs font-bold text-blue-600">{{ c.progress }}% yakunlandi</span>
          </div>

          <h4 class="text-base font-bold text-slate-900">{{ c.title }}</h4>

          <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div class="bg-blue-600 h-full rounded-full transition-all" :style="{ width: `${c.progress}%` }"></div>
          </div>

          <NuxtLink
            :to="`/course/${c.id}`"
            class="block w-full py-2.5 text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
          >
            Darsni davom ettirish
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
