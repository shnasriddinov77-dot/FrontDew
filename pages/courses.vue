<script setup lang="ts">
import { useCourses } from '~/composables/useCourses';
import { useUserProgress } from '~/composables/useUserProgress';

const { courses } = useCourses();
const { hasAccess } = useUserProgress();

const selectedCategory = ref('all');
const search = ref('');

const filteredCourses = computed(() => {
  return courses.filter(c => {
    const matchesCat = selectedCategory.value === 'all' || c.category === selectedCategory.value;
    const matchesSearch = c.title.toLowerCase().includes(search.value.toLowerCase()) ||
                          c.lang.toLowerCase().includes(search.value.toLowerCase());
    return matchesCat && matchesSearch;
  });
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
          <NuxtLink to="/courses" class="text-blue-600 font-bold">Kurslar</NuxtLink>
          <NuxtLink to="/about" class="hover:text-blue-600">Haqqimizda</NuxtLink>
          <NuxtLink to="/dashboard" class="hover:text-blue-600">Dashboard</NuxtLink>
          <NuxtLink to="/login" class="hover:text-blue-600">Kirish</NuxtLink>
          <NuxtLink to="/register" class="py-2 px-4 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25 hover:bg-blue-700">Ro'yxatdan o'tish</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Header Banner -->
    <main class="max-w-7xl mx-auto px-6 py-10">
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Katalog
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">
          10 ta Zamonaviy Dasturlash Kursi
        </h1>
        <p class="text-xs sm:text-sm text-slate-500">
          Pay-First kirish tizimi: Kursni xarid qilgach barcha amaliy topshiriqlar va robot ustoz yordami ochiladi.
        </p>
      </div>

      <!-- Filters & Search -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-sm overflow-x-auto">
          <button
            @click="selectedCategory = 'all'"
            :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all', selectedCategory === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900']"
          >
            Barchasi (10)
          </button>
          <button
            @click="selectedCategory = 'frontend'"
            :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all', selectedCategory === 'frontend' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900']"
          >
            Frontend
          </button>
          <button
            @click="selectedCategory = 'backend'"
            :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all', selectedCategory === 'backend' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900']"
          >
            Backend
          </button>
          <button
            @click="selectedCategory = 'systems'"
            :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all', selectedCategory === 'systems' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900']"
          >
            Tizimli
          </button>
          <button
            @click="selectedCategory = 'database'"
            :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all', selectedCategory === 'database' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900']"
          >
            Database
          </button>
        </div>

        <input
          v-model="search"
          placeholder="Kurs yoki tilni qidirish..."
          class="w-full sm:w-72 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-xs focus:border-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <!-- Course Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="c in filteredCourses"
          :key="c.id"
          class="rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-sm" :style="{ backgroundColor: c.color }">
                {{ c.lang }}
              </span>
              <span class="text-xs text-amber-500 font-bold">★ {{ c.rating }}</span>
            </div>

            <h3 class="text-base font-bold text-slate-900 mb-1">{{ c.title }}</h3>
            <p class="text-xs text-slate-500 mb-4 line-clamp-2">{{ c.desc }}</p>

            <div class="flex items-center justify-between text-xs text-slate-600 py-3 border-y border-slate-100 mb-4">
              <span>{{ c.lessonsCount }} ta dars</span>
              <span>•</span>
              <span>{{ c.duration }}</span>
              <span>•</span>
              <span v-if="hasAccess(c.id)" class="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ Ochilgan
              </span>
              <span v-else class="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                🔒 Pay-First
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div>
              <span class="text-[10px] text-slate-400 line-through block">{{ c.originalPrice }}</span>
              <span class="text-base font-extrabold text-blue-600">{{ c.formattedPrice }}</span>
            </div>
            <NuxtLink
              :to="`/course/${c.id}`"
              :class="[
                'py-2.5 px-4 rounded-xl text-xs font-bold shadow-md transition-all',
                hasAccess(c.id)
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
              ]"
            >
              {{ hasAccess(c.id) ? 'Darsni boshlash →' : 'Xarid qilish & Ochish' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
