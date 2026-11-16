<script setup lang="ts">
/**
 * Nuxt 3 Component: components/analytics/ActivityTimeline.vue
 * Mastered Topics History Log & Gamified Achievements:
 * - Chronological timeline of passed tests, live coding exercises, and quizzes
 * - Gamified badge showcase ("Nuxt Ninja", "Clean Coder", "Bug Hunter", etc.)
 * - Daily coding streak tracker and Level progression status
 */

interface TimelineActivity {
  id: string;
  type: 'challenge' | 'quiz' | 'badge' | 'milestone';
  title: string;
  course: string;
  timestamp: string;
  score?: string;
  xpEarned: number;
  tags: string[];
  icon: string;
  badgeName?: string;
}

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  unlockedAt: string;
  rarity: 'Afsonaviy' | 'Nodir' | 'Klassik';
}

const activeFilter = ref<'all' | 'challenge' | 'quiz' | 'badge'>('all');

const streakDays = ref(7);
const totalXP = ref(2450);
const currentLevel = ref(6);
const levelTitle = ref('Junior Fullstack Dasturchi');
const nextLevelXP = 3000;
const prevLevelXP = 2000;
const levelPercentage = computed(() => {
  return Math.round(((totalXP.value - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100);
});

// Gamified Badges
const badges: BadgeItem[] = [
  {
    id: 'b1',
    name: 'Nuxt Ninja',
    icon: '🥷',
    color: '#00DC82',
    description: 'Nuxt 3 SSR va server API loyihalarini to\'liq xatosiz topshirgan',
    unlockedAt: 'Kecha, 21:15',
    rarity: 'Afsonaviy',
  },
  {
    id: 'b2',
    name: 'Clean Coder',
    icon: '✨',
    color: '#0066FF',
    description: 'Birorta sintaksis xatosi qilmasdan 25 ta topshiriqni ketma-ket yechgan',
    unlockedAt: '2 kun oldin',
    rarity: 'Nodir',
  },
  {
    id: 'b3',
    name: 'Bug Hunter',
    icon: '🎯',
    color: '#F59E0B',
    description: '30 dan ortiq murakkab algoritmik xatolarni o\'z vaqtida bartaraf etgan',
    unlockedAt: '4 kun oldin',
    rarity: 'Nodir',
  },
  {
    id: 'b4',
    name: 'Algoritm Ustasi',
    icon: '🧠',
    color: '#8B5CF6',
    description: 'Massivlar va rekursiya bo\'yicha 10 ta maxsus topshiriqni bajargan',
    unlockedAt: '1 hafta oldin',
    rarity: 'Klassik',
  },
];

// Activity Timeline Log
const activities: TimelineActivity[] = [
  {
    id: 'act-1',
    type: 'badge',
    title: '"Nuxt Ninja" Faxriy Unvoni Qo\'lga Kiritildi',
    course: 'Nuxt 3 SSR & Fullstack',
    timestamp: 'Kecha, 21:15',
    xpEarned: 250,
    tags: ['Nuxt', 'Nitro', 'Server API', 'Achievement'],
    icon: '🏆',
    badgeName: 'Nuxt Ninja',
  },
  {
    id: 'act-2',
    type: 'challenge',
    title: 'Amaliy Mashg\'ulot: Ikki Son Yig\'indisi & Chegaralarni Tekshirish',
    course: 'JavaScript Zamonaviy Dasturlash',
    timestamp: 'Kecha, 18:40',
    score: '100%',
    xpEarned: 150,
    tags: ['Functions', 'Operators', 'Return'],
    icon: '💻',
  },
  {
    id: 'act-3',
    type: 'quiz',
    title: 'Nazariy Viktorina: ES6+ Arrow Functions & Scope',
    course: 'JavaScript Zamonaviy Dasturlash',
    timestamp: '2 kun oldin, 14:20',
    score: '95%',
    xpEarned: 120,
    tags: ['Quiz', 'ArrowFunctions', 'LexicalScope'],
    icon: '📝',
  },
  {
    id: 'act-4',
    type: 'challenge',
    title: 'Amaliy Mashg\'ulot: Juft va Toq Sonlarni Saralash Moduli',
    course: 'JavaScript Zamonaviy Dasturlash',
    timestamp: '3 kun oldin, 20:05',
    score: '100%',
    xpEarned: 180,
    tags: ['Conditionals', 'Modulo', 'Booleans'],
    icon: '💻',
  },
  {
    id: 'act-5',
    type: 'badge',
    title: '"Clean Coder" Faxriy Nishi Ochildi',
    course: 'FrontDev Akademiyasi',
    timestamp: '2 kun oldin',
    xpEarned: 200,
    tags: ['Linting', 'CodeQuality', 'Discipline'],
    icon: '✨',
    badgeName: 'Clean Coder',
  },
  {
    id: 'act-6',
    type: 'challenge',
    title: 'Apple Glassmorphism UI & Backdrop Filter Maketi',
    course: 'HTML5, Modern CSS & Tailwind',
    timestamp: '5 kun oldin, 11:30',
    score: '100%',
    xpEarned: 220,
    tags: ['CSS', 'Glassmorphism', 'BackdropBlur'],
    icon: '🎨',
  },
];

const filteredActivities = computed(() => {
  if (activeFilter.value === 'all') return activities;
  return activities.filter(a => a.type === activeFilter.value);
});
</script>

<template>
  <div class="space-y-8">
    <!-- Gamified Streak & Level Status Banner -->
    <div class="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/20 relative overflow-hidden">
      <!-- Glow bubble -->
      <div class="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <!-- Level & XP Status (7 cols) -->
        <div class="md:col-span-7 space-y-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-blue-100 border border-white/20">
              Daraja {{ currentLevel }}
            </span>
            <span class="text-xs font-semibold text-cyan-200">
              {{ levelTitle }}
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black tracking-tight">
            {{ totalXP.toLocaleString() }} <span class="text-amber-300 text-xl font-extrabold">XP</span>
          </h3>

          <!-- Level Progression Bar -->
          <div class="space-y-1.5 pt-1">
            <div class="flex items-center justify-between text-xs text-blue-100 font-semibold">
              <span>Daraja {{ currentLevel }}</span>
              <span>Keyingi: Daraja {{ currentLevel + 1 }} ({{ levelPercentage }}%)</span>
            </div>
            <div class="w-full bg-white/20 h-3 rounded-full overflow-hidden p-0.5">
              <div
                class="bg-gradient-to-r from-amber-300 to-cyan-300 h-full rounded-full transition-all duration-500 shadow-sm"
                :style="{ width: `${levelPercentage}%` }"
              ></div>
            </div>
            <span class="text-[10px] text-blue-200 block text-right">
              Keyingi darajagacha yana {{ nextLevelXP - totalXP }} XP kerak
            </span>
          </div>
        </div>

        <!-- Streak Flames (5 cols) -->
        <div class="md:col-span-5 flex items-center justify-start md:justify-end gap-3">
          <div class="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[120px] shadow-inner">
            <div class="text-3xl font-black text-amber-300 flex items-center justify-center gap-1.5">
              <span class="animate-bounce">🔥</span>
              <span>{{ streakDays }}</span>
            </div>
            <span class="text-[11px] uppercase font-bold text-blue-100 block mt-0.5">Kunlik Seriya</span>
            <span class="text-[9px] text-emerald-300 font-medium">Uzluksiz kodlash!</span>
          </div>

          <div class="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[120px] shadow-inner">
            <div class="text-3xl font-black text-cyan-300">
              {{ badges.length }} ta
            </div>
            <span class="text-[11px] uppercase font-bold text-blue-100 block mt-0.5">Ochiq Nishonlar</span>
            <span class="text-[9px] text-amber-300 font-medium">+1 ta yaqin qoldi</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Badges Showcase Grid -->
    <div class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl p-6 sm:p-8 space-y-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
            🎖️
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-900 tracking-tight">
              Yutuqlar va Faxriy Nishonlar (Badges)
            </h3>
            <p class="text-xs text-slate-500">Muntazam amaliyot uchun beriladigan maxsus nishonlar</p>
          </div>
        </div>
        <span class="text-xs font-bold text-blue-600">{{ badges.length }} / 8 ta nishon</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="b in badges"
          :key="b.id"
          class="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-blue-200 transition-all shadow-sm hover:shadow-md space-y-2 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between">
              <span class="text-2xl p-2 rounded-xl bg-white shadow-sm border border-slate-100">{{ b.icon }}</span>
              <span
                class="text-[9px] font-extrabold px-2 py-0.5 rounded-full"
                :class="{
                  'bg-purple-100 text-purple-700': b.rarity === 'Afsonaviy',
                  'bg-blue-100 text-blue-700': b.rarity === 'Nodir',
                  'bg-emerald-100 text-emerald-700': b.rarity === 'Klassik',
                }"
              >
                {{ b.rarity }}
              </span>
            </div>

            <h4 class="text-sm font-bold text-slate-900 mt-2">{{ b.name }}</h4>
            <p class="text-[11px] text-slate-500 leading-relaxed mt-1">{{ b.description }}</p>
          </div>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Ochilgan:</span>
            <span class="font-semibold text-slate-600">{{ b.unlockedAt }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chronological Activity Timeline -->
    <div class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl p-6 sm:p-8 space-y-6">
      <!-- Header & Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
            📋
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-900 tracking-tight">
              Muvaffaqiyatlar Xronologiyasi (History Log)
            </h3>
            <p class="text-xs text-slate-500">Barcha muvaffaqiyatli yakunlangan amaliy darslar va viktorinalar</p>
          </div>
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200/60 self-start sm:self-center text-xs">
          <button
            type="button"
            @click="activeFilter = 'all'"
            :class="activeFilter === 'all' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 font-semibold'"
            class="px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Barchasi
          </button>
          <button
            type="button"
            @click="activeFilter = 'challenge'"
            :class="activeFilter === 'challenge' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 font-semibold'"
            class="px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Amaliyot
          </button>
          <button
            type="button"
            @click="activeFilter = 'quiz'"
            :class="activeFilter === 'quiz' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 font-semibold'"
            class="px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Viktorinalar
          </button>
          <button
            type="button"
            @click="activeFilter = 'badge'"
            :class="activeFilter === 'badge' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 font-semibold'"
            class="px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Yutuqlar
          </button>
        </div>
      </div>

      <!-- Vertical Timeline List -->
      <div class="relative border-l-2 border-blue-100 ml-4 sm:ml-6 space-y-6 pt-2">
        <div
          v-for="act in filteredActivities"
          :key="act.id"
          class="relative pl-6 sm:pl-8 group"
        >
          <!-- Timeline Node Icon -->
          <div
            class="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-blue-500 shadow-md flex items-center justify-center text-xs transition-transform group-hover:scale-110"
          >
            {{ act.icon }}
          </div>

          <!-- Timeline Event Card -->
          <div class="p-4 sm:p-5 rounded-2xl bg-slate-50/70 group-hover:bg-white border border-slate-200/70 group-hover:border-blue-200 shadow-sm group-hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-bold text-blue-600">{{ act.course }}</span>
                <span class="text-slate-300">•</span>
                <span class="text-xs text-slate-400 font-medium">{{ act.timestamp }}</span>
                <span
                  v-if="act.score"
                  class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  Natija: {{ act.score }}
                </span>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900">
                {{ act.title }}
              </h4>

              <div class="flex flex-wrap gap-1.5 pt-1">
                <span
                  v-for="(t, idx) in act.tags"
                  :key="idx"
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50/80 text-blue-700 border border-blue-100"
                >
                  #{{ t }}
                </span>
              </div>
            </div>

            <!-- XP Badge -->
            <div class="flex items-center gap-3 self-end md:self-center shrink-0">
              <div class="text-right">
                <span class="text-xs font-black text-amber-500 block">+{{ act.xpEarned }} XP</span>
                <span class="text-[10px] text-slate-400">Balansga qo'shildi</span>
              </div>
              <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
