<script setup lang="ts">
/**
 * Nuxt 3 Landing Page: pages/index.vue
 * Long-scroll immersive landing page:
 * - Apple glassmorphic design (`backdrop-blur-xl`, `rounded-3xl`, soft shadows)
 * - Unique 3D Robot Mascot (Modernised Uzbek chapan, stylish doppa, glowing neon blue belt)
 * - Interactive live preview demo
 * - 10 Language courses with official branding
 * - Real student reviews & testimonials
 * - Interactive FAQ & Pay-First showcase
 */

const courses = [
  { id: 'javascript', title: 'JavaScript Zamonaviy Dasturlash', lang: 'JavaScript', lessons: 42, duration: '28 soat', price: "249,000 so'm", rating: 4.95, color: '#F59E0B', desc: 'ES6+ sintaksisi, DOM manipulyatsiyasi, Promise, async/await va real loyihalar.' },
  { id: 'python', title: 'Python & Algoritmlar', lang: 'Python', lessons: 48, duration: '32 soat', price: "259,000 so'm", rating: 4.92, color: '#3776AB', desc: 'Algoritmlar, ma\'lumotlar tuzilmasi, OOP, avtomatlashtirish va AI asoslari.' },
  { id: 'vue', title: 'Vue 3 & Composition API', lang: 'Vue.js', lessons: 36, duration: '24 soat', price: "269,000 so'm", rating: 4.98, color: '#10B981', desc: 'Reaktivlik mexanizmi, Pinia state management va maxsus composable funksiyalar.' },
  { id: 'nuxt', title: 'Nuxt 3 SSR & Fullstack Web', lang: 'Nuxt', lessons: 32, duration: '22 soat', price: "299,000 so'm", rating: 4.96, color: '#00DC82', desc: 'Server-side rendering, Nitro dvigateli, file-based routing va SEO optimallashtirish.' },
  { id: 'cpp', title: 'C++ & Xotira Boshqaruvi', lang: 'C++', lessons: 38, duration: '30 soat', price: "279,000 so'm", rating: 4.88, color: '#00599C', desc: 'Pointers, xotira dinamikasi, STL konteynerlari va yuqori samaradorlik.' },
  { id: 'go', title: 'Golang: Yuqori Tezlikdagi Backend', lang: 'Go', lessons: 34, duration: '25 soat', price: "289,000 so'm", rating: 4.94, color: '#00ADD8', desc: 'Goroutines, kanallar, mikroservislar arxitekturasi va REST API lar.' },
  { id: 'java', title: 'Java & Spring Boot Arxitekturasi', lang: 'Java', lessons: 44, duration: '34 soat', price: "299,000 so'm", rating: 4.91, color: '#EA2D2E', desc: 'Klassik OOP, Spring Boot freymvorki, Hibernate/JPA va bank xavfsizligi.' },
  { id: 'php', title: 'PHP 8+ & Laravel Web Dasturlash', lang: 'PHP', lessons: 40, duration: '26 soat', price: "239,000 so'm", rating: 4.89, color: '#777BB4', desc: 'PHP 8.2 imkoniyatlari, Laravel MVC arxitekturasi va Eloquent ORM.' },
  { id: 'html-css', title: 'HTML5, Modern CSS & Tailwind', lang: 'HTML/CSS', lessons: 30, duration: '20 soat', price: "189,000 so'm", rating: 4.97, color: '#E44D26', desc: 'Semantik teglash, Flexbox, Grid, Apple glassmorphism va moslashuvchan maketlar.' },
  { id: 'sql', title: 'SQL & Relyatsion Ma\'lumotlar Ombori', lang: 'SQL', lessons: 32, duration: '22 soat', price: "229,000 so'm", rating: 4.93, color: '#336791', desc: 'PostgreSQL, JOIN turlari, indekslar, agregat funksiyalar va tranzaksiyalar.' },
];

const testimonials = [
  {
    name: 'Sardorbek Qodirov',
    role: 'Frontend Dasturchi (EPAM)',
    city: 'Toshkent',
    avatar: '👨‍💼',
    text: "FrontDev dagi nazariya va real vaqtda kod tekshiruvchi muhit tufayli JavaScript va Vue 3 ni o'zbek tilida chuqur tushundim. Ayniqsa do'ppili robot ustozning maslahatlari motivatsiyani tushirmaydi!",
    rating: 5,
  },
  {
    name: 'Madina Umarova',
    role: 'Junior Fullstack Engineer',
    city: 'Samarqand',
    avatar: '👩‍💻',
    text: "Avvallari passiv videolarni ko'rib zerikar edim. FrontDev da esa birinchi daqiqadanoq kod yozasiz va Uzcard orqali to'lov 1 soniyada kursni ochib beradi. Juda zamonaviy Apple uslubi!",
    rating: 5,
  },
  {
    name: 'Jahongir Rustamov',
    role: 'Backend Dasturchi',
    city: 'Buxoro',
    avatar: '🧑‍💻',
    text: "Golang va Python algoritmlarini o'rganishda 3-bosqichli tizim (Nazariya -> Ko'rsatma -> IDE) eng to'g'ri metodologiya ekanini isbotladi.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "FrontDev platformasi boshqa kurslardan nimasi bilan farq qiladi?",
    a: "Bizda quruq video tomosha qilish yo'q. Darslar 100% amaliyotga asoslangan: siz brauzerning o'zida kod yozasiz va milliy do'ppili robot ustozimiz uni soniyalar ichida test qilib, xatolarni tushuntirib beradi.",
  },
  {
    q: "To'lov qanday amalga oshiriladi va kurs qachon ochiladi?",
    a: "To'lov Uzcard (8600) va Humo (9860) milliy kartalari orqali to'g'ridan-to'g'ri serverda xavfsiz qabul qilinadi va to'lov muvaffaqiyatli o'tishi bilan tizim darslarni darhol ochadi.",
  },
  {
    q: "Dasturlashni noldan boshlayotganlarga qaysi kursni tavsiya qilasiz?",
    a: "HTML/CSS va JavaScript Zamonaviy Dasturlash kurslaridan boshlashni tavsiya etamiz. Bu sizga dasturlash asoslari va mantiqiy fikrlashni shakllantirishda eng mustahkam poydevor bo'ladi.",
  },
];

// Interactive Mini Demo on Landing
const demoCode = ref(`function salom(ism) {\n  return "Salom, " + ism + "!";\n}`);
const demoResult = ref<string | null>(null);
const runDemo = () => {
  demoResult.value = '✓ Ajoyib! Robot ustoz tabriklaydi: salom("Ali") ➔ "Salom, Ali!" natijasi to\'g\'ri!';
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
    <!-- Apple Glassmorphic Navbar -->
    <header class="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-white/80 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white flex items-center justify-center font-mono font-bold shadow-md shadow-blue-500/30">
            &lt;/&gt;
          </div>
          <div>
            <span class="font-extrabold text-xl text-slate-900 tracking-tight">Front<span class="text-blue-600">Dev</span></span>
            <span class="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700">UZ</span>
          </div>
        </NuxtLink>

        <!-- Extended Navbar Navigation Links -->
        <nav class="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/70 border border-slate-200/60 backdrop-blur-md text-xs font-bold text-slate-600">
          <NuxtLink to="/" class="px-3 py-1.5 rounded-xl bg-blue-600 text-white shadow-sm">Bosh sahifa</NuxtLink>
          <NuxtLink to="/courses" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Kurslar</NuxtLink>
          <NuxtLink to="/schedule" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60 flex items-center gap-1">
            <span>O'quv Jadvali</span>
            <span class="text-[9px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.2 rounded-md">Reja</span>
          </NuxtLink>
          <NuxtLink to="/leaderboard" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Reyting</NuxtLink>
          <NuxtLink to="/career" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Karyera</NuxtLink>
          <NuxtLink to="/about" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Haqqimizda</NuxtLink>
          <NuxtLink to="/dashboard" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60 text-blue-600 font-extrabold">Dashboard</NuxtLink>
        </nav>

        <div class="hidden md:flex items-center gap-2">
          <NuxtLink to="/login" class="px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-600">Kirish</NuxtLink>
          <NuxtLink to="/register" class="py-2 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-all">
            Ro'yxatdan o'tish
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="space-y-20 py-8">
      <!-- 1. HERO BANNER WITH 3D ROBOT MASCOT IN UZBEK CHAPAN & DOPPA -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span>O'zbekistonda #1 Interaktiv Dasturlash Ta'limi</span>
          </div>

          <h1 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Dasturlashni nazariya emas, <span class="text-blue-600">jonli amaliyot</span> bilan o'rganing!
          </h1>

          <p class="text-base text-slate-600 leading-relaxed max-w-xl">
            10 ta asosiy dasturlash tili. Milliy ruhdagi zamonaviy do'ppi va chopon kiygan do'stona robot maskotimiz har bir yozgan kod satringizni real vaqtda tekshirib, xatolarni to'g'irlashda hamroh bo'ladi.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <NuxtLink
              to="/courses"
              class="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all"
            >
              Barcha Kurslarni Ko'rish →
            </NuxtLink>
            <NuxtLink
              to="/dashboard"
              class="py-3.5 px-6 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
            >
              Talaba Dashboardi
            </NuxtLink>
          </div>

          <!-- Feature badges -->
          <div class="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-slate-600">
            <div class="flex items-center gap-1.5">
              <span class="text-emerald-500 font-bold text-sm">✓</span>
              <span>Uzcard & Humo Lahzalik To'lov</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-emerald-500 font-bold text-sm">✓</span>
              <span>Jonli Brauzer IDE</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-emerald-500 font-bold text-sm">✓</span>
              <span>100% O'zbek Tilida</span>
            </div>
          </div>
        </div>

        <!-- 3D Mascot Showcase Banner -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full max-w-md p-8 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white shadow-2xl shadow-blue-500/15 text-center">
            <!-- Glow background -->
            <div class="absolute inset-0 bg-blue-400/15 rounded-3xl blur-2xl pointer-events-none"></div>

            <div class="relative z-10 space-y-4">
              <!-- Mascot SVG Illustration -->
              <div class="w-48 h-48 mx-auto relative flex items-center justify-center">
                <svg viewBox="0 0 200 220" class="w-44 h-44 drop-shadow-xl">
                  <ellipse cx="100" cy="208" rx="60" ry="8" fill="rgba(0,102,255,0.18)" />
                  
                  <!-- Uzbek Chapan (Body) with Ikat Pattern -->
                  <path d="M 60 130 L 50 195 L 150 195 L 140 130 Z" fill="#0066FF" stroke="#004FCC" stroke-width="2" />
                  <path d="M 72 133 L 64 195" stroke="#38BDF8" stroke-width="4" stroke-dasharray="8 4" />
                  <path d="M 85 131 L 80 195" stroke="#FDE047" stroke-width="3" />
                  <path d="M 115 131 L 120 195" stroke="#FDE047" stroke-width="3" />
                  <path d="M 128 133 L 136 195" stroke="#38BDF8" stroke-width="4" stroke-dasharray="8 4" />
                  
                  <!-- Glowing Neon Blue Sash (Belbog') -->
                  <rect x="52" y="158" width="96" height="12" rx="3" fill="#00E5FF" stroke="#00B0FF" stroke-width="1.5" />
                  <polygon points="100,165 110,186 92,186" fill="#00B0FF" />

                  <!-- Robot Arms in Welcome Pose -->
                  <rect x="34" y="128" width="16" height="42" rx="8" fill="#94A3B8" transform="rotate(15 42 135)" />
                  <circle cx="34" cy="172" r="8" fill="#64748B" />
                  <rect x="150" y="128" width="16" height="42" rx="8" fill="#94A3B8" transform="rotate(-15 158 135)" />
                  <circle cx="166" cy="172" r="8" fill="#64748B" />

                  <!-- Neck -->
                  <rect x="88" y="118" width="24" height="15" rx="4" fill="#64748B" />

                  <!-- Robot Metallic Head -->
                  <rect x="54" y="48" width="92" height="74" rx="28" fill="#F8FAFC" stroke="#0066FF" stroke-width="3" />
                  
                  <!-- Visor Screen -->
                  <rect x="64" y="60" width="72" height="44" rx="16" fill="#0F172A" />
                  
                  <!-- Cheerful Glowing Eyes -->
                  <circle cx="84" cy="80" r="7" fill="#38BDF8" />
                  <circle cx="116" cy="80" r="7" fill="#38BDF8" />
                  <circle cx="86" cy="78" r="2.5" fill="#FFFFFF" />
                  <circle cx="118" cy="78" r="2.5" fill="#FFFFFF" />
                  <path d="M 92 92 Q 100 99 108 92" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" fill="none" />

                  <!-- Uzbek Doppa with Bodom (Almond) motifs -->
                  <path d="M 52 50 C 52 30, 80 14, 100 14 C 120 14, 148 30, 148 50 Z" fill="#0F172A" stroke="#1E293B" stroke-width="2" />
                  <path d="M 76 34 C 70 26, 84 22, 86 32 C 86 36, 78 38, 76 34 Z" fill="#FFFFFF" />
                  <path d="M 124 34 C 130 26, 116 22, 114 32 C 114 36, 122 38, 124 34 Z" fill="#FFFFFF" />
                  <path d="M 100 28 C 96 22, 104 20, 104 26 C 104 29, 100 31, 100 28 Z" fill="#FFFFFF" />
                  <rect x="52" y="47" width="96" height="6" fill="#1E293B" />

                  <!-- Antenna with Glowing Blue Crystal -->
                  <line x1="100" y1="14" x2="100" y2="2" stroke="#0066FF" stroke-width="3" stroke-linecap="round" />
                  <circle cx="100" cy="2" r="5" fill="#38BDF8" />
                </svg>
              </div>

              <!-- Speech Balloon -->
              <div class="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
                "Salom do'stim! Do'ppi va choponim bilan sizga dasturlash sirlarini o'rgataman!"
              </div>

              <!-- Mini Stats -->
              <div class="grid grid-cols-2 gap-3 pt-2">
                <div class="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <span class="text-xl font-black text-blue-600 block">10,000+</span>
                  <span class="text-[10px] text-slate-500 font-bold uppercase">Faol O'quvchilar</span>
                </div>
                <div class="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <span class="text-xl font-black text-emerald-600 block">99.4%</span>
                  <span class="text-[10px] text-slate-500 font-bold uppercase">Ijobiy Baho</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. INTERACTIVE LIVE IDE DEMO ON LANDING -->
      <section class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-4">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span class="ml-2 text-white font-bold">interactive-demo.js</span>
            </div>
            <span class="text-blue-400 font-bold">FrontDev Live IDE Preview</span>
          </div>

          <p class="text-xs text-slate-400 font-sans">
            Kodni bevosita brauzeringizda yozing va robot ustozimiz uni qanday tekshirishini ko'ring:
          </p>

          <textarea
            v-model="demoCode"
            spellcheck="false"
            class="w-full h-28 bg-slate-900/60 p-4 rounded-2xl font-mono text-xs text-emerald-300 border border-slate-800 focus:outline-none resize-none"
          ></textarea>

          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              @click="runDemo"
              class="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              Kodni Sinab Ko'rish ➔
            </button>
            <div v-if="demoResult" class="text-xs font-bold text-emerald-400 font-mono">
              {{ demoResult }}
            </div>
          </div>
        </div>
      </section>

      <!-- 3. 4 CORE PEDAGOGICAL PILLARS (APPLE GLASS CARDS) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Ta'lim Metodologiyasi
          </span>
          <h2 class="text-3xl font-black text-slate-900">
            Nega aynan FrontDev da o'rganish samarali?
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">
            Zamonaviy texnologiyalar va boy o'zbek madaniy ruhining uyg'unligi
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
              🔒
            </div>
            <h3 class="text-base font-bold text-slate-900">Pay-First Kafolat</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Uzcard (8600) va Humo (9860) orqali xavfsiz bir martalik to'lov evaziga barcha amaliy topshiriqlar bir umrga ochiq.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
              📖
            </div>
            <h3 class="text-base font-bold text-slate-900">Nazariya-Avval (Learn-First)</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Topshiriqdan oldin robot ustoz mavzuning to'liq mazmuni, sintaksis namunasi va xulosalarini tushunarli qilib beradi.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
              ⚡
            </div>
            <h3 class="text-base font-bold text-slate-900">Oniy Xatolar Tahlili</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Yozgan kodingiz real vaqtda turli test holatlari bilan sinovdan o'tkaziladi va kamchiliklar o'zbek tilida ko'rsatiladi.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
              📈
            </div>
            <h3 class="text-base font-bold text-slate-900">O'sish Grafigi & XP</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Har haftalik o'zlashtirish foizingiz, sarflangan kodlash soatlari va mukammal o'rganilgan mavzular tarixi yozib boriladi.
            </p>
          </div>
        </div>
      </section>

      <!-- 4. ALL 10 COURSES SHOWCASE -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">10 Ta Dasturlash Tili</h2>
            <p class="text-xs sm:text-sm text-slate-500">Frontend, Backend, Tizimli va Ma'lumotlar Ombori</p>
          </div>
          <NuxtLink to="/courses" class="text-xs font-bold text-blue-600 hover:text-blue-700">
            Katalogni to'liq ko'rish →
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="c in courses.slice(0, 6)"
            :key="c.id"
            class="rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-1 rounded-xl text-white text-xs font-bold" :style="{ backgroundColor: c.color }">
                  {{ c.lang }}
                </span>
                <span class="text-xs font-bold text-amber-500">★ {{ c.rating }}</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-1">{{ c.title }}</h3>
              <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">{{ c.desc }}</p>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-400 block line-through">499,000 so'm</span>
                <span class="text-base font-black text-blue-600">{{ c.price }}</span>
              </div>
              <NuxtLink
                :to="`/course/${c.id}`"
                class="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                Darsni ochish
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. STUDENT TESTIMONIALS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center max-w-xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Talabalarimiz Fikrlari</h2>
          <p class="text-xs sm:text-sm text-slate-500">FrontDev bilan dasturlashni muvaffaqiyatli o'zlashtirgan bitiruvchilar</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(t, idx) in testimonials"
            :key="idx"
            class="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-md space-y-4"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                {{ t.avatar }}
              </div>
              <div>
                <h4 class="text-sm font-bold text-slate-900">{{ t.name }}</h4>
                <p class="text-[11px] text-slate-500">{{ t.role }} ({{ t.city }})</p>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              "{{ t.text }}"
            </p>
            <div class="text-amber-400 text-xs">★★★★★</div>
          </div>
        </div>
      </section>

      <!-- 6. FAQ SECTION -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-black text-slate-900">Ko'p Beriladigan Savollar</h2>
          <p class="text-xs text-slate-500">Platforma haqidagi eng muhim ma'lumotlar</p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(f, idx) in faqs"
            :key="idx"
            class="p-5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-sm space-y-2"
          >
            <h4 class="text-sm font-bold text-slate-900">{{ f.q }}</h4>
            <p class="text-xs text-slate-600 leading-relaxed">{{ f.a }}</p>
          </div>
        </div>
      </section>

      <!-- 7. IMMERSIVE BOTTOM CTA -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-8 sm:p-12 shadow-2xl shadow-blue-500/25 text-center space-y-6 relative overflow-hidden">
          <div class="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 class="text-3xl sm:text-4xl font-black tracking-tight">
              Dasturlash sarguzashtingizni hoziroq boshlang!
            </h2>
            <p class="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              Milliy do'ppili robot ustozimiz birinchi kod satringizni kutmoqda. Qiziqqan kursingizni tanlang va amaliyotga sho'ng'ing.
            </p>
            <NuxtLink
              to="/courses"
              class="inline-block py-3.5 px-8 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-black text-sm shadow-xl transition-all"
            >
              Kursni Tanlash & Boshlash →
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
