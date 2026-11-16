<script setup lang="ts">
/**
 * Nuxt 3 Login Page: pages/login.vue
 * Strict email/password validation with shake error animations
 */

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

const handleLogin = async () => {
  errorMessage.value = null;

  // Strict email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email.value.trim())) {
    errorMessage.value = "Iltimos, to'g'ri email manzilini kiriting!";
    triggerShake();
    return;
  }

  // Password length & digit check
  if (password.value.length < 8 || !/\d/.test(password.value)) {
    errorMessage.value = "Email yoki parol xato kiritildi!";
    triggerShake();
    return;
  }

  loading.value = true;
  try {
    // In production with Supabase:
    // const { data, error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    // if (error) throw error;
    await new Promise(r => setTimeout(r, 600));
    router.push('/');
  } catch (err: any) {
    errorMessage.value = err.message || "Email yoki parol xato kiritildi!";
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

      <h2 class="text-2xl font-bold text-slate-900 mb-1">Tizimga kirish</h2>
      <p class="text-xs text-slate-500 mb-6">Dasturlash platformasiga xush kelibsiz</p>

      <!-- Error Alert with Shake -->
      <div v-if="errorMessage" class="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
        <span>⚠️</span>
        <span>{{ errorMessage }}</span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
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
          <label class="block text-xs font-semibold text-slate-700 mb-1">Parol</label>
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
          {{ loading ? "Kirilmoqda..." : "Kirish" }}
        </button>
      </form>

      <div class="mt-6 text-center text-xs text-slate-500">
        Hisobingiz yo'qmi?
        <NuxtLink to="/register" class="text-blue-600 font-bold hover:underline">Ro'yxatdan o'ting</NuxtLink>
      </div>
    </div>
  </div>
</template>
