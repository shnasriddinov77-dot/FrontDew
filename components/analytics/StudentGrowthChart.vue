<script setup lang="ts">
/**
 * Nuxt 3 Component: components/analytics/StudentGrowthChart.vue
 * Interactive SVG-based Apple glassmorphic student growth chart:
 * - Multi-dataset time periods: "Haftalik", "Oylik", "Umumiy"
 * - Dynamic metrics: "Samaradorlik %", "Bajarilgan darslar", "Kodlash soatlari", "Tuzatilgan xatolar"
 * - Smooth cubic bezier SVG curve, glowing gradient area fill, interactive tooltips
 */

type TimeRange = 'haftalik' | 'oylik' | 'umumiy';
type MetricType = 'efficiency' | 'lessons' | 'hours' | 'bugs';

interface MetricOption {
  id: MetricType;
  label: string;
  unit: string;
  icon: string;
  color: string;
  maxVal: number;
}

const metrics: MetricOption[] = [
  { id: 'efficiency', label: 'Samaradorlik', unit: '%', icon: '⚡', color: '#0066FF', maxVal: 100 },
  { id: 'lessons', label: 'Bajarilgan Darslar', unit: 'ta', icon: '📚', color: '#10B981', maxVal: 50 },
  { id: 'hours', label: 'Kodlash Vaqti', unit: 'soat', icon: '⏱️', color: '#38BDF8', maxVal: 30 },
  { id: 'bugs', label: 'Tuzatilgan Xatolar', unit: 'ta', icon: '🐞', color: '#F59E0B', maxVal: 40 },
];

const selectedRange = ref<TimeRange>('haftalik');
const selectedMetric = ref<MetricType>('efficiency');
const hoveredPointIndex = ref<number | null>(null);

// Datasets for Weekly, Monthly, and Overall
const datasets: Record<TimeRange, { labels: string[]; values: Record<MetricType, number[]>; growthPercent: string }> = {
  haftalik: {
    labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
    values: {
      efficiency: [62, 68, 74, 81, 79, 88, 94],
      lessons: [2, 3, 4, 3, 5, 7, 6],
      hours: [1.8, 2.2, 3.1, 2.8, 3.5, 4.8, 4.2],
      bugs: [8, 12, 15, 11, 19, 24, 22],
    },
    growthPercent: '+21.5% bu hafta',
  },
  oylik: {
    labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun'],
    values: {
      efficiency: [45, 58, 67, 76, 84, 93],
      lessons: [8, 14, 21, 29, 38, 46],
      hours: [12, 18, 24, 28, 34, 42],
      bugs: [14, 28, 41, 55, 72, 89],
    },
    growthPercent: '+34.8% bu oy',
  },
  umumiy: {
    labels: ['1-Oy', '2-Oy', '3-Oy', '4-Oy', '5-Oy', '6-Oy'],
    values: {
      efficiency: [35, 52, 68, 79, 88, 96],
      lessons: [10, 24, 42, 65, 88, 114],
      hours: [20, 45, 78, 112, 148, 195],
      bugs: [25, 60, 110, 175, 230, 310],
    },
    growthPercent: '+142% jami o\'sish',
  },
};

const currentData = computed(() => datasets[selectedRange.value]);
const currentMetricConfig = computed(() => metrics.find(m => m.id === selectedMetric.value)!);
const currentValues = computed(() => currentData.value.values[selectedMetric.value]);

// Chart dimensions
const chartWidth = 720;
const chartHeight = 240;
const paddingX = 50;
const paddingY = 30;

// Coordinate calculations
const points = computed(() => {
  const vals = currentValues.value;
  const labels = currentData.value.labels;
  const n = vals.length;
  const max = Math.max(...vals, currentMetricConfig.value.maxVal * 0.8) * 1.15;
  const min = 0;

  return vals.map((v, i) => {
    const x = paddingX + (i / (n - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((v - min) / (max - min)) * (chartHeight - paddingY * 2);
    return { x, y, value: v, label: labels[i] };
  });
});

// Cubic Bezier curve path generator
const svgPath = computed(() => {
  const pts = points.value;
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

  let path = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 2;
    const cp1y = p0.y;
    const cp2x = p0.x + (p1.x - p0.x) / 2;
    const cp2y = p1.y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }
  return path;
});

// Closed path for subtle gradient fill
const svgAreaPath = computed(() => {
  const pts = points.value;
  if (pts.length === 0) return '';
  const first = pts[0];
  const last = pts[pts.length - 1];
  const bottom = chartHeight - paddingY;
  return `${svgPath.value} L ${last.x} ${bottom} L ${first.x} ${bottom} Z`;
});

// Summary calculations
const averageValue = computed(() => {
  const vals = currentValues.value;
  if (!vals.length) return 0;
  const sum = vals.reduce((a, b) => a + b, 0);
  return (sum / vals.length).toFixed(1);
});

const peakValue = computed(() => {
  return Math.max(...currentValues.value);
});
</script>

<template>
  <div class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl p-6 sm:p-8 space-y-6 transition-all">
    <!-- Header: Title, Metric Tabs & Range Switcher -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            📈
          </div>
          <h3 class="text-xl font-black text-slate-900 tracking-tight">
            Ko'nikmalar Dinamikasi va O'sish Grafigi
          </h3>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {{ currentData.growthPercent }}
          </span>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          Dasturlash mahoratingiz, kodlash intensivligi va samaradorlik o'sishi
        </p>
      </div>

      <!-- Time Range Selector ("Haftalik", "Oylik", "Umumiy") -->
      <div class="flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200/60 self-start lg:self-center">
        <button
          type="button"
          @click="selectedRange = 'haftalik'"
          :class="selectedRange === 'haftalik' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 font-semibold'"
          class="px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer"
        >
          Haftalik
        </button>
        <button
          type="button"
          @click="selectedRange = 'oylik'"
          :class="selectedRange === 'oylik' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 font-semibold'"
          class="px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer"
        >
          Oylik
        </button>
        <button
          type="button"
          @click="selectedRange = 'umumiy'"
          :class="selectedRange === 'umumiy' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 font-semibold'"
          class="px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer"
        >
          Umumiy
        </button>
      </div>
    </div>

    <!-- Metric Switcher Pills -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button
        v-for="m in metrics"
        :key="m.id"
        type="button"
        @click="selectedMetric = m.id"
        :class="selectedMetric === m.id
          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25 border-transparent'
          : 'bg-white/70 hover:bg-white text-slate-700 border-slate-200/80'"
        class="p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-base">{{ m.icon }}</span>
          <span
            :class="selectedMetric === m.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'"
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
          >
            {{ m.unit }}
          </span>
        </div>
        <div class="mt-2">
          <span class="text-xs font-bold block" :class="selectedMetric === m.id ? 'text-white' : 'text-slate-800'">
            {{ m.label }}
          </span>
          <span class="text-[11px] font-medium" :class="selectedMetric === m.id ? 'text-blue-100' : 'text-slate-400'">
            Joriy: {{ currentValues[currentValues.length - 1] }} {{ m.unit }}
          </span>
        </div>
      </button>
    </div>

    <!-- Quick Stats Bar -->
    <div class="flex flex-wrap items-center justify-between gap-4 py-2 px-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs">
      <div class="flex items-center gap-2">
        <span class="text-slate-500">O'rtacha ko'rsatkich:</span>
        <strong class="text-slate-900 font-bold">{{ averageValue }} {{ currentMetricConfig.unit }}</strong>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-slate-500">Eng yuqori cho'qqi:</span>
        <strong class="text-blue-600 font-bold">{{ peakValue }} {{ currentMetricConfig.unit }}</strong>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-slate-500">Davr:</span>
        <span class="font-bold text-slate-700 capitalize">{{ selectedRange }} dinamika</span>
      </div>
    </div>

    <!-- SVG Smooth Area Curve Chart -->
    <div class="relative w-full overflow-hidden pt-2 pb-4">
      <div class="w-full overflow-x-auto">
        <svg
          :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
          class="w-full h-64 sm:h-72 select-none"
          preserveAspectRatio="none"
        >
          <defs>
            <!-- Area Gradient -->
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0066FF" stop-opacity="0.35" />
              <stop offset="60%" stop-color="#38BDF8" stop-opacity="0.12" />
              <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0" />
            </linearGradient>

            <!-- Line Gradient -->
            <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0066FF" />
              <stop offset="50%" stop-color="#2563EB" />
              <stop offset="100%" stop-color="#38BDF8" />
            </linearGradient>

            <!-- Glow Filter -->
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Horizontal Grid Lines -->
          <line
            v-for="line in [0.25, 0.5, 0.75, 1]"
            :key="line"
            :x1="paddingX"
            :y1="paddingY + (chartHeight - paddingY * 2) * (1 - line)"
            :x2="chartWidth - paddingX"
            :y2="paddingY + (chartHeight - paddingY * 2) * (1 - line)"
            stroke="#E2E8F0"
            stroke-dasharray="4 4"
            stroke-width="1"
          />

          <!-- Area Fill -->
          <path
            :d="svgAreaPath"
            fill="url(#curveGradient)"
          />

          <!-- Main Smooth Stroke -->
          <path
            :d="svgPath"
            fill="none"
            stroke="url(#lineStroke)"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#glow)"
          />

          <!-- Data Points and Interactive Hover Zones -->
          <g v-for="(p, idx) in points" :key="idx">
            <!-- Vertical guide line on hover -->
            <line
              v-if="hoveredPointIndex === idx"
              :x1="p.x"
              :y1="paddingY"
              :x2="p.x"
              :y2="chartHeight - paddingY"
              stroke="#0066FF"
              stroke-dasharray="3 3"
              stroke-width="1.5"
              opacity="0.7"
            />

            <!-- Outer glow ring on hover -->
            <circle
              v-if="hoveredPointIndex === idx"
              :cx="p.x"
              :cy="p.y"
              r="12"
              fill="#0066FF"
              fill-opacity="0.18"
              class="animate-ping"
            />

            <!-- Data Point Circle -->
            <circle
              :cx="p.x"
              :cy="p.y"
              :r="hoveredPointIndex === idx ? 7 : 5"
              fill="#FFFFFF"
              stroke="#0066FF"
              :stroke-width="hoveredPointIndex === idx ? 3.5 : 2.5"
              class="transition-all duration-200 cursor-pointer"
              @mouseenter="hoveredPointIndex = idx"
              @mouseleave="hoveredPointIndex = null"
            />

            <!-- X-Axis Labels -->
            <text
              :x="p.x"
              :y="chartHeight - 8"
              text-anchor="middle"
              class="text-[11px] font-semibold fill-slate-500"
            >
              {{ p.label }}
            </text>

            <!-- Value Label at Point -->
            <text
              :x="p.x"
              :y="p.y - 12"
              text-anchor="middle"
              :class="hoveredPointIndex === idx ? 'fill-blue-700 font-extrabold text-[12px]' : 'fill-slate-600 font-bold text-[10px]'"
              class="transition-all duration-200"
            >
              {{ p.value }}{{ currentMetricConfig.unit }}
            </text>
          </g>
        </svg>
      </div>

      <!-- Hover Tooltip Overlay -->
      <div
        v-if="hoveredPointIndex !== null"
        class="absolute top-2 right-4 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl text-xs shadow-xl border border-slate-700 pointer-events-none flex items-center gap-2"
      >
        <span class="text-amber-400 font-mono">{{ points[hoveredPointIndex].label }}:</span>
        <strong class="text-cyan-300 font-extrabold text-sm">
          {{ points[hoveredPointIndex].value }} {{ currentMetricConfig.unit }}
        </strong>
      </div>
    </div>
  </div>
</template>
