<script setup lang="ts">
/**
 * Nuxt 3 Page: pages/dashboard/analytics.vue
 * Advanced Student Analytics & Growth Dashboard for FrontDev:
 * - 3D Uzbek Robot Mascot (Chapan & Doppa) Performance Feedback Dialogue
 * - AI Smart Recommendations (FrontDev Mascot Insights)
 * - StudentGrowthChart (Interactive SVG time-range & metrics switcher)
 * - SkillBreakdown (Radar competency matrix)
 * - ActivityTimeline (Gamified badges, streak flames & history log)
 */

import StudentGrowthChart from '~/components/analytics/StudentGrowthChart.vue';
import SkillBreakdown from '~/components/analytics/SkillBreakdown.vue';
import ActivityTimeline from '~/components/analytics/ActivityTimeline.vue';

const user = ref({
  name: 'Anvar Rustamov',
  role: 'Junior Fullstack Dasturchi',
  email: 'anvar@frontdev.uz',
  avatar: '👨‍💻',
  joinedDate: 'Yanvar 2026',
});

// AI Smart Recommendations from FrontDev Uzbek Robot Mascot
interface AIRecommendation {
  id: string;
  topic: string;
  course: string;
  courseId: string;
  reason: string;
  priority: 'Yuqori' | 'Tavsiya' | 'Qo\'shimcha';
  readiness: string;
  icon: string;
}

const aiRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    topic: 'Pinia & Global State Management',
    course: 'Vue 3 & Nuxt Arxitekturasi',
    courseId: 'vue',
    reason: 'Siz Vue 3 reaktivlik va komponent dizayni bo\'yicha 90% natija ko\'rsatdingiz. Keyingi qadamda Pinia markaziy xotirasini bog\'lash orqali real loyihalarga to\'liq tayyor bo\'lasiz!',
    priority: 'Yuqori',
    readiness: '92% Tayyorlik',
    icon: '🍍',
  },
  {
    id: 'rec-2',
    topic: 'Rekursiya va Big-O Samaradorlik Tahlili',
    course: 'Algoritmik Fikrlash',
    courseId: 'python',
    reason: 'Algoritmik fikrlash ko\'rsatkichingiz hozir 68% ni tashkil qilmoqda. 3 ta maxsus amaliy mashq orqali buni 85%+ darajaga chiqarish mumkin.',
    priority: 'Tavsiya',
    readiness: '75% Tayyorlik',
    icon: '⚡',
  },
  {
    id: 'rec-3',
    topic: 'PostgreSQL Murakkab JOIN va Indekslash',
    course: 'SQL & Relyatsion Omborlar',
    courseId: 'sql',
    reason: 'Backend REST API larni tezlashtirish uchun relyatsion so\'rovlarni indekslar bilan optimallashtirishni sinab ko\'ring.',
    priority: 'Qo\'shimcha',
    readiness: '80% Tayyorlik',
    icon: '🗄️',
  },
];

const mascotMood = ref<'proud' | 'thinking' | 'encouraging'>('proud');

const mascotQuotes = {
  proud: "Barakalla, Anvar! Bu hafta kodlash samaradorligingiz +21.5% ga oshdi! Do'ppimni silkitib sizga yangi cho'qqilarni tilayman!",
  thinking: "Kodni tekshirdim: Vue va ES6+ bo'yicha mustahkam bilimga egasiz. Endi algoritmik fikrlash moduliga 20 daqiqa ajratsak, to'liq muvozanat hosil bo'ladi!",
  encouraging: "Hech qachon xatolardan qo'rqmang! FrontBot siz bilan birga, har bir sintaksis xatosini birgalikda tuzatamiz!",
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
    <!-- Apple Glassmorphic Header -->
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/80 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white flex items-center justify-center font-mono font-bold shadow-md shadow-blue-500/30">
            &lt;/&gt;
          </div>
          <div>
            <span class="font-extrabold text-xl text-slate-900 tracking-tight">Front<span class="text-blue-600">Dev</span></span>
            <span class="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              Analytics Studio
            </span>
          </div>
        </NuxtLink>

        <!-- Navbar Navigation -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <NuxtLink to="/" class="hover:text-blue-600">Bosh sahifa</NuxtLink>
          <NuxtLink to="/courses" class="hover:text-blue-600">Kurslar</NuxtLink>
          <NuxtLink to="/about" class="hover:text-blue-600">Haqqimizda</NuxtLink>
          <NuxtLink to="/dashboard" class="hover:text-blue-600">Dashboard</NuxtLink>
          <NuxtLink to="/dashboard/analytics" class="text-blue-600 font-bold">Analitika</NuxtLink>
        </nav>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/dashboard"
            class="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all text-xs font-bold text-slate-700"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{{ user.name }}</span>
          </NuxtLink>

          <NuxtLink
            to="/courses"
            class="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
          >
            Yangi Dars
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <!-- 1. HERO MASCOT PERFORMANCE FEEDBACK BANNER -->
      <section class="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-6 sm:p-10 shadow-2xl shadow-blue-500/25 relative overflow-hidden">
        <!-- Ambient decorative shapes -->
        <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div class="absolute left-1/3 -top-10 w-40 h-40 rounded-full bg-sky-300/15 blur-2xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Mascot SVG in Traditional Uzbek Chapan & Doppa -->
          <div class="lg:col-span-4 flex flex-col items-center text-center">
            <div class="relative w-52 h-52 flex items-center justify-center">
              <svg viewBox="0 0 200 220" class="w-48 h-48 drop-shadow-2xl animate-pulse" style="animation-duration: 4s;">
                <!-- Shadow -->
                <ellipse cx="100" cy="208" rx="60" ry="8" fill="rgba(0,0,0,0.2)" />
                
                <!-- Uzbek Chapan (Body) with Ikat Stripes -->
                <path d="M 60 130 L 50 195 L 150 195 L 140 130 Z" fill="#0052CC" stroke="#003D99" stroke-width="2" />
                <path d="M 72 133 L 64 195" stroke="#38BDF8" stroke-width="4" stroke-dasharray="8 4" />
                <path d="M 85 131 L 80 195" stroke="#FDE047" stroke-width="3" />
                <path d="M 115 131 L 120 195" stroke="#FDE047" stroke-width="3" />
                <path d="M 128 133 L 136 195" stroke="#38BDF8" stroke-width="4" stroke-dasharray="8 4" />
                
                <!-- Golden Belbog' (Sash) -->
                <rect x="52" y="158" width="96" height="12" rx="3" fill="#EAB308" stroke="#CA8A04" stroke-width="1.5" />
                <polygon points="100,165 110,186 92,186" fill="#CA8A04" />

                <!-- Robot Arms (Celebrating pose) -->
                <rect x="30" y="125" width="16" height="42" rx="8" fill="#E2E8F0" transform="rotate(-30 38 130)" />
                <circle cx="20" cy="120" r="9" fill="#0066FF" />
                <rect x="154" y="125" width="16" height="42" rx="8" fill="#E2E8F0" transform="rotate(30 162 130)" />
                <circle cx="180" cy="120" r="9" fill="#0066FF" />

                <!-- Neck -->
                <rect x="88" y="118" width="24" height="15" rx="4" fill="#94A3B8" />

                <!-- Metallic Head with Glassmorphic finish -->
                <rect x="54" y="48" width="92" height="74" rx="28" fill="#F8FAFC" stroke="#38BDF8" stroke-width="2.5" />
                
                <!-- Visor Screen -->
                <rect x="64" y="60" width="72" height="44" rx="16" fill="#0F172A" />
                
                <!-- Cheerful Glowing Eyes (Happy Curved Arcs) -->
                <path d="M 76 82 Q 84 74 92 82" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" fill="none" />
                <path d="M 108 82 Q 116 74 124 82" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" fill="none" />
                
                <!-- Friendly Smile -->
                <path d="M 90 94 Q 100 102 110 94" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" fill="none" />

                <!-- Traditional Uzbek Doppa with Bodom (Almond) motifs -->
                <path d="M 52 50 C 52 30, 80 14, 100 14 C 120 14, 148 30, 148 50 Z" fill="#0F172A" stroke="#1E293B" stroke-width="2" />
                <path d="M 76 34 C 70 26, 84 22, 86 32 C 86 36, 78 38, 76 34 Z" fill="#FFFFFF" />
                <path d="M 124 34 C 130 26, 116 22, 114 32 C 114 36, 122 38, 124 34 Z" fill="#FFFFFF" />
                <path d="M 100 28 C 96 22, 104 20, 104 26 C 104 29, 100 31, 100 28 Z" fill="#FFFFFF" />
                <rect x="52" y="47" width="96" height="6" fill="#1E293B" />
                <path d="M 54 50 L 58 48 L 62 50 L 66 48 L 70 50 L 74 48 L 78 50 L 82 48 L 86 50 L 90 48 L 94 50 L 98 48 L 102 50 L 106 48 L 110 50 L 114 48 L 118 50 L 122 48 L 126 50 L 130 48 L 134 50 L 138 48 L 142 50 L 146 48" stroke="#FFFFFF" stroke-width="1.2" fill="none" />

                <!-- Antenna with Glowing Blue Top -->
                <line x1="100" y1="14" x2="100" y2="2" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
                <circle cx="100" cy="2" r="5" fill="#38BDF8" />
              </svg>
            </div>
            <span class="mt-2 text-xs font-extrabold text-blue-100 bg-white/20 px-3 py-1 rounded-full border border-white/20">
              FrontBot AI Ustoz
            </span>
          </div>

          <!-- Personalized Mascot Dialogue Balloon & Stats (8 cols) -->
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20">
              <span>✨ Shaxsiy O'sish & Natijadorlik Xulosasi</span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ajoyib natija, {{ user.name }}! 🚀
            </h1>

            <!-- Mascot Dialogue Bubble with Speech Pointer -->
            <div class="relative bg-white/95 text-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl border border-white backdrop-blur-md">
              <p class="text-sm sm:text-base font-semibold leading-relaxed text-slate-800">
                "{{ mascotQuotes[mascotMood] }}"
              </p>

              <!-- Mood Switcher Tabs -->
              <div class="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-bold text-slate-400">Maskot xulosasi:</span>
                <button
                  type="button"
                  @click="mascotMood = 'proud'"
                  :class="mascotMood === 'proud' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                  class="text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  🎉 Yutuqlar
                </button>
                <button
                  type="button"
                  @click="mascotMood = 'thinking'"
                  :class="mascotMood === 'thinking' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                  class="text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  🧠 Tavsiyalar
                </button>
                <button
                  type="button"
                  @click="mascotMood = 'encouraging'"
                  :class="mascotMood === 'encouraging' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                  class="text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  💪 Motivatsiya
                </button>
              </div>
            </div>

            <!-- Key Quick Figures -->
            <div class="grid grid-cols-3 gap-3 pt-2">
              <div class="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
                <span class="text-xl sm:text-2xl font-black text-amber-300">94%</span>
                <span class="text-[10px] text-blue-100 uppercase font-bold block">Topshiriq Aniqligi</span>
              </div>
              <div class="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
                <span class="text-xl sm:text-2xl font-black text-cyan-300">14.5s</span>
                <span class="text-[10px] text-blue-100 uppercase font-bold block">Bu Haftalik Kod</span>
              </div>
              <div class="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
                <span class="text-xl sm:text-2xl font-black text-white">#12</span>
                <span class="text-[10px] text-blue-100 uppercase font-bold block">Platforma Reytingi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. AI SMART RECOMMENDATIONS (MASCOT INSIGHTS) -->
      <section class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/20">
                💡
              </div>
              <h2 class="text-xl font-black text-slate-900 tracking-tight">
                AI Smart Tavsiyalar (FrontDev Mascot Insights)
              </h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Sizning yozgan kodlaringiz va test natijalaringiz asosida robot ustozimiz tomonidan tanlangan keyingi qadamlar
            </p>
          </div>

          <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-start">
            3 ta tavsiya faol
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="rec in aiRecommendations"
            :key="rec.id"
            class="p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-2xl p-2 rounded-2xl bg-white shadow-sm border border-slate-100">{{ rec.icon }}</span>
                <span
                  class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                  :class="{
                    'bg-rose-100 text-rose-700': rec.priority === 'Yuqori',
                    'bg-blue-100 text-blue-700': rec.priority === 'Tavsiya',
                    'bg-slate-100 text-slate-700': rec.priority === 'Qo\'shimcha',
                  }"
                >
                  {{ rec.priority }} Muhimlik
                </span>
              </div>

              <div>
                <span class="text-[11px] font-bold text-blue-600 block">{{ rec.course }}</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-0.5">{{ rec.topic }}</h3>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed font-normal">
                {{ rec.reason }}
              </p>
            </div>

            <div class="pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span class="text-[11px] font-bold text-emerald-600">{{ rec.readiness }}</span>
              <NuxtLink
                :to="`/course/${rec.courseId}`"
                class="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-1"
              >
                <span>Boshlash</span>
                <span>→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. INTERACTIVE GROWTH CHART (WEEKLY SKILL PROGRESS) -->
      <section>
        <StudentGrowthChart />
      </section>

      <!-- 4. SKILL RADAR / COMPETENCY MATRIX -->
      <section>
        <SkillBreakdown />
      </section>

      <!-- 5. TOPIC MASTERY HISTORY LOG & GAMIFIED ACHIEVEMENTS -->
      <section>
        <ActivityTimeline />
      </section>

      <!-- Back / Export Footer Bar -->
      <section class="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div class="flex items-center gap-2">
          <span>📅 Tahlil hisoboti yangilangan vaqti:</span>
          <strong class="text-slate-800">Bugun, real vaqt rejimida</strong>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/dashboard"
            class="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
          >
            ← Boshqaruv Paneliga Qaytish
          </NuxtLink>
          <NuxtLink
            to="/courses"
            class="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25 transition-all"
          >
            Dasturlashni Davom Ettirish →
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
