<script setup lang="ts">
/**
 * Nuxt 3 Register Page: pages/register.vue
 * Strict email/password validation with shake error animations
 */

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref<string | null>(null);
const shake = ref(false);
const loading = ref(false);

const router = useRouter();

const triggerShake = () => {
  shake.value = true;
  setTimeout(() => (shake.value = false), 600);
};

const handleRegister = async () => {
  errorMessage.value = null;

  if (name.value.trim().length < 2) {
    errorMessage.value = "Ismingizni to'liq kiriting!";
    triggerShake();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email.value.trim())) {
    errorMessage.value = "Noto'g'ri email formati! Misol: user@example.com";
    triggerShake();
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = "Parol kamida 8 ta belgidan iborat bo'lishi kerak!";
    triggerShake();
    return;
  }

  if (!/\d/.test(password.value)) {
    errorMessage.value = "Parolda kamida bitta raqam bo'lishi shart!";
    triggerShake();
    return;
  }

  loading.value = true;
  try {
    // In production with Supabase:
    // const { data, error } = await supabase.auth.signUp({ email: email.value, password: password.value, options: { data: { name: name.value } } })
    // if (error) throw error;
    await new Promise(r => setTimeout(r, 600));
    router.push('/');
  } catch (err: any) {
    errorMessage.value = err.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
    triggerShake();
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F5FF] flex items-center justify-center p-6">
    <div
      :class="['w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-2xl p-8 transition-transform', shake ? 'animate-shake ring-2 ring-red-400' : '']"
    >
      <div class="flex items-center gap-2 mb-6">
        <div class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-md">
          &lt;/&gt;
        </div>
        <span class="font-extrabold text-xl text-slate-900">Front<span class="text-blue-600">Dev</span></span>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mb-1">Ro'yxatdan o'tish</h2>
      <p class="text-xs text-slate-500 mb-6">Yangi dasturchilar oilasiga qo'shiling</p>

      <!-- Error Alert with Shake -->
      <div v-if="errorMessage" class="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
        <span>⚠️</span>
        <span>{{ errorMessage }}</span>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Ism va familiya</label>
          <input
            v-model="name"
            type="text"
            placeholder="Anvar Qodirov"
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Email manzili</label>
          <input
            v-model="email"
            type="email"
            placeholder="user@example.com"
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Parol (kamida 8 belgi & raqam)</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all disabled:opacity-60"
        >
          {{ loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish" }}
        </button>
      </form>

      <div class="mt-6 text-center text-xs text-slate-500">
        Allaqachon hisobingiz bormi?
        <NuxtLink to="/login" class="text-blue-600 font-bold hover:underline">Kirish</NuxtLink>
      </div>
    </div>
  </div>
</template>
