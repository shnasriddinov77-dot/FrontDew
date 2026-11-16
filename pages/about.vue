<script setup lang="ts">
/**
 * Nuxt 3 Page: pages/about.vue
 * Dedicated Long-Scroll About page for FrontDev Academy:
 * - Brand mission and Vision 2030 for Uzbekistan IT Education
 * - Cultural identity of the 3D Uzbek Robot Mascot (Chapan, Doppa, Belbog')
 * - Interactive Mascot Mood Controller
 * - 6 Core Pedagogical Values
 * - FrontDev vs Traditional Video vs Offline Comparison Matrix
 * - Senior Mentors Team
 * - Roadmap 2024 - 2027
 * - IT Park Residency & Security
 */

const mascotMood = ref<'celebrate' | 'thinking' | 'confused' | 'idle'>('celebrate');

const comparisonRows = [
  { feature: 'Brauzer ichida jonli kod tekshiruvi', frontdev: true, video: false, offline: 'Faqat darsda' },
  { feature: 'Milliy do\'ppili 3D AI robot ustoz', frontdev: true, video: false, offline: false },
  { feature: 'Pay-First kafolati (Uzcard / Humo)', frontdev: true, video: 'Xorijiy karta / Qimmat', offline: 'Shartnoma / Naqd' },
  { feature: 'Sodda nazariya -> Aniq ko\'rsatma -> IDE oqimi', frontdev: true, video: false, offline: 'O\'qituvchiga bog\'liq' },
  { feature: '24/7 Shaxsiy o\'quv jadvali & heat-map', frontdev: true, video: false, offline: false },
  { feature: 'Kompaniyalarga to\'g\'ridan-to\'g\'ri yo\'naltirish', frontdev: true, video: false, offline: 'Cheklangan' },
];

const mentors = [
  { name: 'Ulug\'bek Samatov', role: 'Lead Frontend Architect (ex-EPAM)', exp: '9 yillik tajriba', avatar: '👨‍💼', desc: 'Nuxt 3, Vue va TypeScript arxitekturasi bo\'yicha 50+ yirik korporativ loyihalarni ishlab chiqqan.' },
  { name: 'Kamola Saidova', role: 'Senior Python & AI Engineer', exp: '7 yillik tajriba', avatar: '👩‍💻', desc: 'Toshkent IT Park maslahatchisi, mashinaviy o\'rganish va ma\'lumotlar tuzilmasi mutaxassisi.' },
  { name: 'Farrux Zokirov', role: 'Fullstack & Security Specialist', exp: '8 yillik tajriba', avatar: '🧑‍💻', desc: 'Bank to\'lov shlyuzlari, Uzcard/Humo integratsiyasi va mikroxizmatlar xavfsizligi bo\'yicha ekspert.' },
  { name: 'Nodira Rahimova', role: 'UX/UI & Apple Glassmorphism Lead', exp: '6 yillik tajriba', avatar: '👩‍🎨', desc: 'FrontDev platformasi interfeysi, 3D kiber-maskot dizayni va ergonomika muallifi.' },
];

const roadmapMilestones = [
  { year: '2024', title: 'Platforma Poydevori', desc: 'FrontDev konsepsiyasi yaratildi. O\'zbek tilidagi ilk avtomatlashtirilgan kod tekshiruvchi dvigatel ishga tushirildi.' },
  { year: '2025', title: '10 Til & 3D Maskot Integratsiyasi', desc: 'Barcha asosiy tillar bo\'yicha 10 ta to\'liq kurs, Uzcard/Humo to\'lovlari va milliy choponli robot maskot joriy qilindi.' },
  { year: '2026', title: 'AI O\'sish Studiyasi & Sandbox', desc: 'Jonli Sandbox laboratoriyasi, kompetensiyalar radari, o\'quv jadvali va IT kompaniyalar bilan karyera shartnomalari ochildi.' },
  { year: '2027', title: 'Global O\'zbek IT Ekotizimi', desc: 'Chet eldagi o\'zbek dasturchilari bilan xalqaro mentorlik platformasi va sun\'iy intellekt asosidagi avtomatik portfolio generatori.' },
];
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] text-slate-800">
    <!-- Extended Apple Glassmorphic Navbar -->
    <header class="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-white/80 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white flex items-center justify-center font-mono font-bold shadow-md shadow-blue-500/30">
            &lt;/&gt;
          </div>
          <span class="font-extrabold text-xl text-slate-900 tracking-tight">Front<span class="text-blue-600">Dev</span></span>
        </NuxtLink>

        <nav class="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/70 border border-slate-200/60 backdrop-blur-md text-xs font-bold text-slate-600">
          <NuxtLink to="/" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Bosh sahifa</NuxtLink>
          <NuxtLink to="/courses" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Kurslar</NuxtLink>
          <NuxtLink to="/schedule" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60 flex items-center gap-1">
            <span>O'quv Jadvali</span>
            <span class="text-[9px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.2 rounded-md">Reja</span>
          </NuxtLink>
          <NuxtLink to="/leaderboard" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Reyting</NuxtLink>
          <NuxtLink to="/career" class="px-3 py-1.5 rounded-xl hover:text-slate-900 hover:bg-white/60">Karyera</NuxtLink>
          <NuxtLink to="/about" class="px-3 py-1.5 rounded-xl bg-blue-600 text-white shadow-sm">Haqqimizda</NuxtLink>
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

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      <!-- 1. Hero Intro -->
      <section class="text-center max-w-4xl mx-auto space-y-5">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold uppercase tracking-wider">
          FrontDev Akademiyasi Manifesti
        </span>
        <h1 class="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Dasturlashni har bir o'zbek yoshiga <span class="text-blue-600">oson, qiziqarli va ona tilida</span> yetkazish
        </h1>
        <p class="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          FrontDev — bu shunchaki passiv video darslar to'plami emas. Bu quruq nazariyadan xoli, har bir topshiriqni jonli brauzer tahrirlagichida yozib, o'zbek milliy choponidagi robot ustozimiz nazorati ostida o'rganadigan interaktiv ekotizimdir.
        </p>
      </section>

      <!-- 2. Mascot & Cultural Identity Feature -->
      <section class="rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 p-8 sm:p-12 shadow-2xl shadow-blue-500/10 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div class="md:col-span-5 flex flex-col items-center text-center space-y-4">
            <UzbekRobotMascot
              size="lg"
              :mood="mascotMood"
              :show-speech="true"
              :speech-text="
                mascotMood === 'celebrate'
                  ? 'Barakalla! Siz dasturlashda yangi cho\'qqilarni zabt etyapsiz!'
                  : mascotMood === 'thinking'
                  ? 'Algoritmni chuqur tahlil qilyapman... O\'ylashga 10 soniya bering!'
                  : mascotMood === 'confused'
                  ? 'Sintaksis xatosi topildi! Keling, birgalikda tuzatamiz!'
                  : 'Salom! Men FrontBot — sizning sodiq o\'zbek robot ustozingizman!'
              "
            />

            <!-- Interactive Mood Buttons -->
            <div class="flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200">
              <button
                @click="mascotMood = 'celebrate'"
                :class="['px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer', mascotMood === 'celebrate' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600']"
              >
                🎉 Quvonch
              </button>
              <button
                @click="mascotMood = 'thinking'"
                :class="['px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer', mascotMood === 'thinking' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600']"
              >
                🧠 O'y
              </button>
              <button
                @click="mascotMood = 'confused'"
                :class="['px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer', mascotMood === 'confused' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600']"
              >
                ⚠️ Xato
              </button>
              <button
                @click="mascotMood = 'idle'"
                :class="['px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer', mascotMood === 'idle' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600']"
              >
                👋 Salom
              </button>
            </div>
          </div>

          <div class="md:col-span-7 space-y-4">
            <span class="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Madaniy Identifikatsiya
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">
              Nega aynan O'zbek Choponidagi Robot Ustoz?
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              O'zbek xalqi asrlar davomida Al-Xorazmiy, Beruniy va Ulug'bek kabi buyuk allomalar orqali dunyo algoritmlari va matematikasiga asos solgan. Biz ushbu boy merosni bugungi kiber-texnologiya bilan birlashtirdik.
            </p>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <strong>FrontBot</strong> kiygan quyuq ko'k baxmal choponda an'anaviy zarbof naqshlar neon elektron sxemalar bilan tutashgan. Boshidagi do'ppida esa qadimiy bodom naqshi — aql, zakovat va sabr ramzi sifatida yonib turadi.
            </p>

            <div class="grid grid-cols-2 gap-3 pt-2">
              <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                <span class="text-base font-black text-blue-700 block">Do'ppi va Bodom</span>
                <span class="text-[11px] text-slate-600">Milliy tafakkur va mustahkam intizom ramzi</span>
              </div>
              <div class="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100">
                <span class="text-base font-black text-sky-700 block">Kiber-Belbog'</span>
                <span class="text-[11px] text-slate-600">Soniyalik kod bajarilish energiyasi markazi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. SIX CORE VALUES -->
      <section class="space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">FrontDev Akademiyasi 6 Asosiy Qadriyati</h2>
          <p class="text-xs sm:text-sm text-slate-500">Ta'lim sifatini xalqaro darajada ushlab turuvchi tamoyillar</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              💻
            </div>
            <h3 class="text-base font-bold text-slate-900">1. Amaliyot Birinchi O'rinda</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Bizda darslarning 90% qismi bevosita brauzer IDE tahrirlagichida amaliy kod yozishdan iborat.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
              🤖
            </div>
            <h3 class="text-base font-bold text-slate-900">2. Milliy Ruh va Sun'iy Intellekt</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              O'zbek tilidagi tushuntirishlar, milliy kartalar va do'ppili robot ustoz bilan qiziqarli ta'lim.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg">
              💳
            </div>
            <h3 class="text-base font-bold text-slate-900">3. Pay-First Shaffoflik</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Hech qanday obuna tuzog'i yo'q. Bir martalik to'lov bilan to'liq kurs umrbod sizga tegishli bo'ladi.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
              ✨
            </div>
            <h3 class="text-base font-bold text-slate-900">4. Apple Glassmorphism Zavqi</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Ko'zni toliqtirmaydigan tiniq shaffof dizayn, oq fonlar va silliq Apple estetikasi.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-lg">
              💼
            </div>
            <h3 class="text-base font-bold text-slate-900">5. Karyera Markazi Ko'magi</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Toshkentdagi yetakchi IT kompaniyalariga portfolio topshirish va intervyu tayyorgarligi.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <h3 class="text-base font-bold text-slate-900">6. Doimiy Yangilanish</h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              Nuxt 3, Vue 3, ES2024 va eng so'nggi dasturlash freymvorklari bo'yicha eng yangi amaliyotlar.
            </p>
          </div>
        </div>
      </section>

      <!-- 4. COMPARISON MATRIX -->
      <section class="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-10 space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Taqqoslash Jadvali</h2>
          <p class="text-xs sm:text-sm text-slate-500">Nima uchun FrontDev an'anaviy usullardan 5 baravar samarali?</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr class="border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
                <th class="py-3 px-4">Imkoniyat</th>
                <th class="py-3 px-4 text-blue-600 font-extrabold bg-blue-50/80 rounded-t-2xl">FrontDev Platformasi</th>
                <th class="py-3 px-4">Oddiy Video Kurslar</th>
                <th class="py-3 px-4">Offline O'quv Markazlari</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              <tr v-for="(row, idx) in comparisonRows" :key="idx" class="hover:bg-slate-50/60">
                <td class="py-3.5 px-4 font-bold text-slate-800">{{ row.feature }}</td>
                <td class="py-3.5 px-4 bg-blue-50/40 text-blue-700 font-black">
                  ✓ Mavjud
                </td>
                <td class="py-3.5 px-4 text-slate-500">
                  {{ row.video === false ? '✗ Yo\'q' : row.video }}
                </td>
                <td class="py-3.5 px-4 text-slate-500">
                  {{ row.offline === false ? '✗ Yo\'q' : row.offline }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 5. TEAM & SENIOR MENTORS -->
      <section class="space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">FrontDev Mualliflari va Jamoasi</h2>
          <p class="text-xs sm:text-sm text-slate-500">Xalqaro IT gigantlarida ishlagan tajribali o'zbek dasturchilari</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(m, idx) in mentors" :key="idx" class="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-sm space-y-3 text-center">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 inline-block">{{ m.avatar }}</span>
            <div>
              <h4 class="text-sm font-extrabold text-slate-900">{{ m.name }}</h4>
              <span class="text-[11px] font-bold text-blue-600 block">{{ m.role }}</span>
              <span class="text-[10px] text-slate-400 font-semibold">{{ m.exp }}</span>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              {{ m.desc }}
            </p>
          </div>
        </div>
      </section>

      <!-- 6. ROADMAP 2024 - 2027 -->
      <section class="space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Rivojlanish Xaritasi (Roadmap)</h2>
          <p class="text-xs sm:text-sm text-slate-500">FrontDev ning kechagi, bugungi va ertangi marralari</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div v-for="(m, idx) in roadmapMilestones" :key="idx" class="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-sm space-y-2">
            <span class="text-2xl font-black text-blue-600 block">{{ m.year }}</span>
            <h4 class="text-sm font-extrabold text-slate-900">{{ m.title }}</h4>
            <p class="text-xs text-slate-500 leading-relaxed">{{ m.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 7. ACCREDITATIONS & SECURITY BANNER -->
      <section class="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-8 sm:p-12 text-center shadow-2xl shadow-blue-500/25 space-y-5">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/20">
          <span>O'zbekiston IT Park Rezidenti & Xavfsiz To'lovlar</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black">
          Orzuingizdagi IT kasbini egallash vaqti keldi!
        </h2>
        <p class="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
          Bugun 1 ta darsdan boshlang. Milliy robot ustoz sizni birinchi amaliy kodingiz bilan tabriklashga tayyor!
        </p>
      </section>
    </main>
  </div>
</template>
