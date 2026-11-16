<script setup lang="ts">
/**
 * Nuxt 3 Component: components/analytics/SkillBreakdown.vue
 * Skill Radar & Competency Matrix:
 * - 6 Core Competencies: HTML/CSS, JS Logic, Vue/Nuxt, Async/API, Algorithmic Thinking, Database/SQL
 * - Interactive SVG Radar Polygon chart
 * - Granular skill rating bars, strengths & focus areas
 */

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number; // 0 - 100
  status: 'Master' | 'Kuchli' | 'Yaxshi' | 'E\'tibor kerak';
  color: string;
  description: string;
  topicsCount: number;
}

const skills: SkillItem[] = [
  {
    id: 'html-css',
    name: 'HTML & Modern CSS',
    category: 'Frontend Asoslari',
    level: 94,
    status: 'Master',
    color: '#E44D26',
    description: 'Flexbox, Grid, Glassmorphism, Tailwind va semantik teglash',
    topicsCount: 16,
  },
  {
    id: 'js-logic',
    name: 'JavaScript Mantiq & ES6+',
    category: 'Asosiy Algoritmika',
    level: 89,
    status: 'Kuchli',
    color: '#F59E0B',
    description: 'Massivlar, obyektlar, funksiyalar va qat\'iy tiplash mantig\'i',
    topicsCount: 22,
  },
  {
    id: 'vue-nuxt',
    name: 'Vue 3 & Nuxt Arxitekturasi',
    category: 'Framework Dizayni',
    level: 84,
    status: 'Kuchli',
    color: '#00DC82',
    description: 'Composition API, reaktivlik, Pinia va SSR marshrutlash',
    topicsCount: 18,
  },
  {
    id: 'async-api',
    name: 'Asinxron JS & API Integratsiya',
    category: 'Ma\'lumotlar oqimi',
    level: 76,
    status: 'Yaxshi',
    color: '#0066FF',
    description: 'Promise, async/await, REST API va Fetch/Axios boshqaruvi',
    topicsCount: 12,
  },
  {
    id: 'algo-ds',
    name: 'Algoritmik Fikrlash & Big-O',
    category: 'Samaradorlik',
    level: 68,
    status: 'E\'tibor kerak',
    color: '#8B5CF6',
    description: 'Qidiruv, saralash algoritmlari va rekursiya masalalari',
    topicsCount: 14,
  },
  {
    id: 'db-sql',
    name: 'Database & SQL So\'rovlar',
    category: 'Backend Saqlash',
    level: 72,
    status: 'Yaxshi',
    color: '#336791',
    description: 'JOIN, indekslar, agregatsiya va Supabase relyatsion jadvallari',
    topicsCount: 10,
  },
];

// Radar Chart Mathematics
const radarSize = 300;
const center = radarSize / 2;
const radius = 105;
const angleStep = (Math.PI * 2) / skills.length;

// Compute polygon coordinates for background rings and user data
const getPolygonPoints = (scale: number) => {
  return skills
    .map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + Math.cos(angle) * (radius * scale);
      const y = center + Math.sin(angle) * (radius * scale);
      return `${x},${y}`;
    })
    .join(' ');
};

const userPolygonPoints = computed(() => {
  return skills
    .map((s, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const normalizedLevel = (s.level / 100) * radius;
      const x = center + Math.cos(angle) * normalizedLevel;
      const y = center + Math.sin(angle) * normalizedLevel;
      return `${x},${y}`;
    })
    .join(' ');
});

const getAxisEndpoint = (i: number) => {
  const angle = i * angleStep - Math.PI / 2;
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  };
};

const getLabelPosition = (i: number) => {
  const angle = i * angleStep - Math.PI / 2;
  const labelRadius = radius + 24;
  return {
    x: center + Math.cos(angle) * labelRadius,
    y: center + Math.sin(angle) * labelRadius,
  };
};

const activeSkill = ref<SkillItem>(skills[0]);
</script>

<template>
  <div class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl p-6 sm:p-8 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
            🎯
          </div>
          <h3 class="text-xl font-black text-slate-900 tracking-tight">
            Kompetensiyalar Matritsasi (Skill Radar)
          </h3>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          Dasturlash yo'nalishlari bo'yicha kuchli tomonlaringiz va rivojlanish sohalari
        </p>
      </div>

      <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 self-start">
        Umumiy Saviya: 80.5% (Yuqori)
      </span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
      <!-- Radar Chart (5 cols) -->
      <div class="lg:col-span-5 flex flex-col items-center justify-center relative">
        <svg :width="radarSize" :height="radarSize" class="overflow-visible select-none drop-shadow-md">
          <defs>
            <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0066FF" stop-opacity="0.45" />
              <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.2" />
            </linearGradient>
          </defs>

          <!-- Concentric Web Rings (25%, 50%, 75%, 100%) -->
          <polygon
            v-for="scale in [0.25, 0.5, 0.75, 1]"
            :key="scale"
            :points="getPolygonPoints(scale)"
            fill="none"
            stroke="#E2E8F0"
            stroke-dasharray="3 3"
            stroke-width="1"
          />

          <!-- Spokes from Center -->
          <line
            v-for="(_, i) in skills"
            :key="i"
            :x1="center"
            :y1="center"
            :x2="getAxisEndpoint(i).x"
            :y2="getAxisEndpoint(i).y"
            stroke="#CBD5E1"
            stroke-width="1"
          />

          <!-- User Competency Filled Polygon -->
          <polygon
            :points="userPolygonPoints"
            fill="url(#radarFill)"
            stroke="#0066FF"
            stroke-width="2.5"
            stroke-linejoin="round"
          />

          <!-- Interactive Skill Node Points -->
          <g v-for="(s, i) in skills" :key="s.id">
            <circle
              :cx="center + Math.cos(i * angleStep - Math.PI / 2) * ((s.level / 100) * radius)"
              :cy="center + Math.sin(i * angleStep - Math.PI / 2) * ((s.level / 100) * radius)"
              :r="activeSkill.id === s.id ? 7 : 5"
              :fill="activeSkill.id === s.id ? '#0066FF' : '#FFFFFF'"
              stroke="#0066FF"
              stroke-width="2.5"
              class="cursor-pointer transition-all hover:scale-125"
              @mouseenter="activeSkill = s"
            />
            <!-- Outer Radar Labels -->
            <text
              :x="getLabelPosition(i).x"
              :y="getLabelPosition(i).y"
              text-anchor="middle"
              dominant-baseline="central"
              :class="activeSkill.id === s.id ? 'fill-blue-600 font-extrabold text-[11px]' : 'fill-slate-600 font-semibold text-[9.5px]'"
              class="transition-all cursor-pointer"
              @click="activeSkill = s"
            >
              {{ s.name.split(' ')[0] }}
            </text>
          </g>
        </svg>

        <div class="mt-2 text-center text-xs text-slate-400">
          Nuqtalar ustiga bosing yoki tanlang
        </div>
      </div>

      <!-- Granular Skill List & Focus Details (7 cols) -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Selected Skill Spotlight Card -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50/60 border border-blue-200/80 flex items-start justify-between gap-4">
          <div class="space-y-1">
            <span class="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
              Tanlangan: {{ activeSkill.category }}
            </span>
            <h4 class="text-base font-extrabold text-slate-900">
              {{ activeSkill.name }}
            </h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              {{ activeSkill.description }}
            </p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-2xl font-black text-blue-600">{{ activeSkill.level }}%</div>
            <span
              class="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5"
              :class="{
                'bg-emerald-100 text-emerald-700': activeSkill.status === 'Master',
                'bg-blue-100 text-blue-700': activeSkill.status === 'Kuchli',
                'bg-amber-100 text-amber-700': activeSkill.status === 'Yaxshi',
                'bg-rose-100 text-rose-700': activeSkill.status === 'E\'tibor kerak',
              }"
            >
              {{ activeSkill.status }}
            </span>
          </div>
        </div>

        <!-- All Skills Progress Bars -->
        <div class="space-y-3">
          <div
            v-for="s in skills"
            :key="s.id"
            @mouseenter="activeSkill = s"
            class="p-3 rounded-2xl border transition-all cursor-pointer"
            :class="activeSkill.id === s.id ? 'bg-white border-blue-300 shadow-md ring-2 ring-blue-500/10' : 'bg-slate-50/70 border-slate-200/60 hover:bg-white'"
          >
            <div class="flex items-center justify-between mb-1.5 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: s.color }"></span>
                <span class="font-bold text-slate-800">{{ s.name }}</span>
                <span class="text-[10px] text-slate-400">({{ s.topicsCount }} mavzu)</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="text-[9px] font-extrabold px-1.5 py-0.5 rounded"
                  :class="{
                    'bg-emerald-50 text-emerald-700': s.status === 'Master',
                    'bg-blue-50 text-blue-700': s.status === 'Kuchli',
                    'bg-amber-50 text-amber-700': s.status === 'Yaxshi',
                    'bg-rose-50 text-rose-700': s.status === 'E\'tibor kerak',
                  }"
                >
                  {{ s.status }}
                </span>
                <span class="font-black text-slate-900 w-10 text-right">{{ s.level }}%</span>
              </div>
            </div>

            <div class="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{ width: `${s.level}%`, backgroundColor: s.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
