<script setup lang="ts">
/**
 * Nuxt 3 Component: components/PaymentModal.vue
 * Real Card Input Checkout Modal (8600 Uzcard / 9860 Humo)
 */

interface CourseItem {
  id: string;
  title: string;
  formattedPrice: string;
  price: number;
}

const props = defineProps<{
  course: CourseItem;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success', courseId: string): void;
}>();

const cardNumber = ref('');
const cardHolder = ref('ALI VALIYEV');
const expiry = ref('');
const cvv = ref('');
const loading = ref(false);
const errorMessage = ref<string | null>(null);
const shake = ref(false);

const cardType = computed(() => {
  const clean = cardNumber.value.replace(/\D/g, '');
  if (clean.startsWith('8600')) return 'uzcard';
  if (clean.startsWith('9860')) return 'humo';
  if (clean.startsWith('4')) return 'visa';
  return 'unknown';
});

const onCardInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16);
  const parts = [];
  for (let i = 0; i < val.length; i += 4) {
    parts.push(val.slice(i, i + 4));
  }
  cardNumber.value = parts.join(' ');
  errorMessage.value = null;
};

const onExpiryInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4);
  if (val.length >= 3) {
    expiry.value = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
  } else {
    expiry.value = val;
  }
  errorMessage.value = null;
};

const triggerShake = () => {
  shake.value = true;
  setTimeout(() => (shake.value = false), 600);
};

const submitPayment = async () => {
  errorMessage.value = null;
  const cleanNum = cardNumber.value.replace(/\D/g, '');

  if (cleanNum.length !== 16) {
    errorMessage.value = "Karta raqami 16 ta raqamdan iborat bo'lishi shart!";
    triggerShake();
    return;
  }

  if (expiry.value.replace(/\D/g, '').length !== 4) {
    errorMessage.value = "Amal qilish muddatini to'liq kiriting (OO/YY)!";
    triggerShake();
    return;
  }

  loading.value = true;
  try {
    const res = await $fetch('/api/checkout', {
      method: 'POST',
      body: {
        cardNumber: cardNumber.value,
        cardHolder: cardHolder.value,
        expiry: expiry.value,
        cvv: cvv.value,
        courseId: props.course.id,
        amount: props.course.price,
      },
    });

    if (res.success) {
      emit('success', props.course.id);
      emit('close');
    }
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || "To'lov amalga oshmadi. Karta ma'lumotlarini tekshiring.";
    triggerShake();
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Apple Glassmorphic Backdrop -->
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-md" @click="$emit('close')"></div>

    <!-- Modal Card -->
    <div
      :class="['relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8 transition-transform', shake ? 'animate-shake ring-2 ring-red-400' : '']"
    >
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-md">
            &lt;/&gt;
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-800">Xavfsiz To'lov Oynasi</h3>
            <p class="text-xs text-slate-500">Uzcard (8600) / Humo (9860)</p>
          </div>
        </div>
        <button @click="$emit('close')" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
          ✕
        </button>
      </div>

      <!-- Realistic Card Preview -->
      <div class="mb-6 p-5 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/20 border border-white/30">
        <div class="flex justify-between items-center mb-6">
          <span class="text-xs font-semibold tracking-wider uppercase">FrontDev Pay</span>
          <span class="px-2 py-0.5 rounded bg-white/20 text-xs font-bold uppercase">
            {{ cardType === 'uzcard' ? '🇺🇿 UZCARD' : cardType === 'humo' ? '🇺🇿 HUMO' : 'KARTA' }}
          </span>
        </div>
        <div class="font-mono text-lg tracking-widest mb-4">
          {{ cardNumber || '8600 •••• •••• ••••' }}
        </div>
        <div class="flex justify-between text-xs text-blue-100">
          <span>{{ cardHolder || 'ISM FAMILIYA' }}</span>
          <span>{{ expiry || 'OO/YY' }}</span>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="submitPayment" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Karta raqami</label>
          <input
            :value="cardNumber"
            @input="onCardInput"
            placeholder="8600 0000 0000 0000"
            maxlength="19"
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Amal qilish muddati</label>
            <input
              :value="expiry"
              @input="onExpiryInput"
              placeholder="12/28"
              maxlength="5"
              class="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Karta egasi</label>
            <input
              v-model="cardHolder"
              placeholder="ALI VALIYEV"
              class="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold uppercase focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all disabled:opacity-60"
        >
          {{ loading ? "To'lov bajarilmoqda..." : `${course.formattedPrice} to'lash va ochish` }}
        </button>
      </form>
    </div>
  </div>
</template>
