<script setup lang="ts">
import { useUserProgress } from '~/composables/useUserProgress';
import { useCourses } from '~/composables/useCourses';

const { user, streakDays, xpPoints, purchasedCourses, hasAccess } = useUserProgress();
const { courses } = useCourses();

const myCourses = computed(() => {
  return courses.filter(c => purchasedCourses.value.includes(c.id));
});

const recommendedCourses = computed(() => {
  return courses.filter(c => !purchasedCourses.value.includes(c.id)).slice(0, 3);
});
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] text-slate-800">
    <!-- Navbar -->
    <header class="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-white/80 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white flex items-center justify-center font-mono font-bold shadow-md shadow-blue-500/30">
            &lt;/&gt;
          </div>
          <span class="font-extrabold text-xl text-slate-900 tracking-tight">Front<span class="text-blue-600">Dev</span></span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <NuxtLink to="/" class="hover:text-blue-600">Bosh sahifa</NuxtLink>
          <NuxtLink to="/courses" class="hover:text-blue-600">Kurslar</NuxtLink>
          <NuxtLink to="/about" class="hover:text-blue-600">Haqqimizda</NuxtLink>
          <NuxtLink to="/dashboard" class="text-blue-600 font-bold">Dashboard</NuxtLink>
          <NuxtLink to="/dashboard/analytics" class="hover:text-blue-600 font-semibold text-sky-600 flex items-center gap-1">
            <span>Analitika</span>
            <span class="text-[10px] bg-sky-100 text-sky-700 font-extrabold px-1.5 py-0.2 rounded-md">Yangi</span>
          </NuxtLink>
          <NuxtLink to="/login" class="hover:text-blue-600">Chiqish</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <!-- Quick link to the Advanced Student Analytics & Growth Dashboard -->
      <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
            📊
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-extrabold">Kengaytirilgan Talaba Analitikasi va O'sish Studiyasi</h3>
            <p class="text-xs text-blue-100">Interaktiv o'sish grafigi, ko'nikmalar radari, AI maskot tavsiyalari va xronologiya</p>
          </div>
        </div>
        <NuxtLink
          to="/dashboard/analytics"
          class="py-2.5 px-5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all shrink-0 inline-flex items-center gap-1.5"
        >
          <span>Analitika Studiyasini Ochish</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <UserProgress :user="user" :streak-days="streakDays" :xp-points="xpPoints" :completed-lessons="18" :total-lessons="42" />

      <!-- Active / Purchased Courses -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">Mening Xarid Qilingan Kurslarim (Pay-First)</h2>
            <p class="text-xs text-slate-500">Ushbu kurslarning Jonli IDE va amaliy laboratoriyalari to'liq ochilgan</p>
          </div>
          <NuxtLink to="/courses" class="text-xs font-bold text-blue-600 hover:underline">
            Katalogni ko'rish →
          </NuxtLink>
        </div>

        <div v-if="myCourses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="c in myCourses"
            :key="c.id"
            class="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-emerald-100 shadow-md hover:shadow-lg transition-all"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-white px-2 py-0.5 rounded-lg" :style="{ backgroundColor: c.color }">
                {{ c.lang }}
              </span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ IDE Ochiq
              </span>
            </div>
            <h3 class="font-bold text-slate-900 text-sm mb-1">{{ c.title }}</h3>
            <p class="text-xs text-slate-500 mb-4 line-clamp-2">{{ c.desc }}</p>
            <NuxtLink
              :to="`/course/${c.id}`"
              class="w-full inline-flex items-center justify-center py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
            >
              Jonli IDE Tahrirlagichga O'tish →
            </NuxtLink>
          </div>
        </div>

        <div v-else class="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-dashed border-slate-200 text-center space-y-3">
          <div class="text-3xl">🔒</div>
          <p class="text-sm font-bold text-slate-700">Hozircha xarid qilingan kurs mavjud emas.</p>
          <p class="text-xs text-slate-500 max-w-md mx-auto">
            Pay-First tizimi bo'yicha: Kursni katalogdan tanlab, Uzcard yoki Humo orqali to'lov qilingandan so'ng uning nazariyasi va Jonli IDE tahrirlagichi bir zumda ochiladi.
          </p>
          <NuxtLink
            to="/courses"
            class="inline-block py-2.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/30"
          >
            Kurslar Katalogiga O'tish
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
