<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { CheckCircle2, CreditCard, ShieldCheck, X } from 'lucide-vue-next';
import type { FrontendCourse, SubscriptionTier } from '../data/frontendCourses';
import { getCourseTitle, SUBSCRIPTION_LOCALIZATIONS } from '../data/courseLocalizations';
import {
  calculateCheckoutTotal,
  formatCardDigits,
  formatCardExpiry,
  validateCheckoutCard,
} from '../utils/academyLogic';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';

export type CheckoutTarget =
  | { type: 'course'; course: FrontendCourse }
  | { type: 'subscription'; tier: SubscriptionTier };

const props = defineProps<{
  target: CheckoutTarget | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'completed'): void;
  (e: 'needAuth'): void;
}>();

const { isAuthenticated, login, unlockCourse, activateSubscription } = useAcademyStore();
const { locale, t, formatCoursePrice, copy } = useI18n();

const customerEmail = ref('');
const cardNumber = ref('');
const expiry = ref('');
const cvc = ref('');
const promoCode = ref('');
const errorMsg = ref('');
const isProcessing = ref(false);
const isSuccess = ref(false);

const basePrice = computed(() => {
  if (!props.target) return 0;
  return props.target.type === 'course'
    ? props.target.course.priceRub
    : props.target.tier.annualPriceRub;
});

const pricing = computed(() =>
  calculateCheckoutTotal(basePrice.value, promoCode.value)
);

const itemTitle = computed(() => {
  if (!props.target) return '';
  return props.target.type === 'course'
    ? getCourseTitle(props.target.course, locale.value)
    : t(SUBSCRIPTION_LOCALIZATIONS[props.target.tier.id].name);
});

watch(
  () => props.target,
  () => {
    errorMsg.value = '';
    isSuccess.value = false;
    isProcessing.value = false;
  }
);

function onCardInput(e: Event) {
  const input = e.target as HTMLInputElement;
  cardNumber.value = formatCardDigits(input.value);
}

function onExpiryInput(e: Event) {
  const input = e.target as HTMLInputElement;
  expiry.value = formatCardExpiry(input.value);
}

function fillTestCard() {
  cardNumber.value = '8600 1204 5590 9860';
  expiry.value = '09/28';
  cvc.value = '482';
  if (!isAuthenticated.value && !customerEmail.value) {
    customerEmail.value = 'student@frontdev.uz';
  }
  errorMsg.value = '';
}

function handleCheckout() {
  errorMsg.value = '';
  if (!props.target) return;

  if (!isAuthenticated.value) {
    const cleanEmail = customerEmail.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errorMsg.value = t(copy.checkout.emailRequiredErr);
      return;
    }
  }

  const cardCheck = validateCheckoutCard(cardNumber.value, expiry.value, cvc.value, locale.value);
  if (!cardCheck.valid) {
    errorMsg.value = cardCheck.error || '';
    return;
  }

  isProcessing.value = true;

  setTimeout(() => {
    if (!isAuthenticated.value && customerEmail.value.trim()) {
      login(customerEmail.value.trim());
    }
    if (props.target?.type === 'course') {
      unlockCourse(props.target.course.id);
    } else if (props.target?.type === 'subscription') {
      activateSubscription(props.target.tier.id);
    }
    isProcessing.value = false;
    isSuccess.value = true;
    emit('completed');
  }, 450);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.target) {
    emit('close');
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div
    v-if="target"
    role="dialog"
    aria-modal="true"
    aria-label="FrontDev Checkout"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-lg bg-[#F4F4F0] text-[#0D0D0F] rounded-2xl border border-black/15 p-6 sm:p-8 space-y-6 relative shadow-2xl">
      <button
        type="button"
        aria-label="Close checkout"
        @click="emit('close')"
        class="absolute top-5 right-5 p-2 rounded-lg border border-black/10 hover:bg-black/5 cursor-pointer"
      >
        <X class="w-4 h-4" />
      </button>

      <!-- Success State -->
      <div v-if="isSuccess" class="py-6 text-center space-y-4">
        <div class="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
          <CheckCircle2 class="w-8 h-8" />
        </div>
        <h2 class="font-display text-2xl font-bold">
          {{ t(copy.checkout.successTitle) }}
        </h2>
        <p class="text-sm text-[#0D0D0F]/70 max-w-sm mx-auto">
          «{{ itemTitle }}» — {{ t(copy.checkout.successDesc) }}
        </p>
        <button
          type="button"
          @click="emit('close')"
          class="px-6 py-3 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {{ t(copy.checkout.startLearningBtn) }}
        </button>
      </div>

      <!-- Checkout Form -->
      <template v-else>
        <div class="space-y-1.5">
          <p class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]">
            FrontDev · {{ t(copy.checkout.kicker) }}
          </p>
          <h2 class="font-display text-xl sm:text-2xl font-bold">
            {{ itemTitle }}
          </h2>
        </div>

        <div class="p-4 rounded-xl bg-white border border-black/10 space-y-2 text-xs tabular-nums">
          <div class="flex justify-between text-[#0D0D0F]/70">
            <span>{{ t(copy.checkout.priceLabel) }}</span>
            <span class="font-mono">{{ formatCoursePrice(pricing.subtotal) }}</span>
          </div>
          <div v-if="pricing.promoValid" class="flex justify-between text-[#059669] font-medium">
            <span>{{ t(copy.checkout.discountLabel) }} ({{ pricing.discountPercent }}%)</span>
            <span class="font-mono">-{{ formatCoursePrice(pricing.discountAmount) }}</span>
          </div>
          <div class="pt-2 border-t border-black/8 flex justify-between items-baseline">
            <span class="font-semibold text-sm">{{ t(copy.checkout.totalLabel) }}</span>
            <span class="font-display text-lg font-bold text-[#0D0D0F]">
              {{ formatCoursePrice(pricing.total) }}
            </span>
          </div>
        </div>

        <form @submit.prevent="handleCheckout" class="space-y-4">
          <div v-if="!isAuthenticated" class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="checkout-email" class="text-xs font-semibold text-[#0D0D0F]/75">
                {{ t(copy.checkout.emailLabel) }}
              </label>
              <button
                type="button"
                @click="emit('needAuth')"
                class="text-xs font-semibold text-[#FF3B1D] hover:underline cursor-pointer"
              >
                {{ t(copy.checkout.hasAccount) }}
              </button>
            </div>
            <input
              id="checkout-email"
              v-model="customerEmail"
              type="email"
              placeholder="student@frontdev.uz"
              class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-sm focus:outline-none focus:border-[#FF3B1D]"
            />
          </div>

          <div class="space-y-1.5">
            <label for="checkout-promo" class="block text-xs font-semibold text-[#0D0D0F]/75">
              {{ t(copy.checkout.promoLabel) }}
            </label>
            <input
              id="checkout-promo"
              v-model="promoCode"
              type="text"
              placeholder="FRONT20"
              class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 font-mono text-xs uppercase focus:outline-none focus:border-[#FF3B1D]"
            />
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="checkout-card" class="text-xs font-semibold text-[#0D0D0F]/75">
                {{ t(copy.checkout.cardLabel) }}
              </label>
              <button
                type="button"
                @click="fillTestCard"
                class="font-mono text-[11px] text-[#0047FF] hover:underline cursor-pointer"
              >
                {{ t(copy.checkout.testCardBtn) }}
              </button>
            </div>
            <div class="relative">
              <CreditCard class="w-4 h-4 text-[#0D0D0F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="checkout-card"
                :value="cardNumber"
                @input="onCardInput"
                type="text"
                inputmode="numeric"
                placeholder="8600 0000 0000 0000"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/15 font-mono text-sm tabular-nums focus:outline-none focus:border-[#FF3B1D]"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label for="checkout-expiry" class="block text-xs font-semibold text-[#0D0D0F]/75">
                {{ t(copy.checkout.expiryLabel) }}
              </label>
              <input
                id="checkout-expiry"
                :value="expiry"
                @input="onExpiryInput"
                type="text"
                inputmode="numeric"
                placeholder="09/28"
                class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 font-mono text-sm tabular-nums focus:outline-none focus:border-[#FF3B1D]"
              />
            </div>

            <div class="space-y-1.5">
              <label for="checkout-cvc" class="block text-xs font-semibold text-[#0D0D0F]/75">
                {{ t(copy.checkout.cvcLabel) }}
              </label>
              <input
                id="checkout-cvc"
                v-model="cvc"
                type="password"
                maxlength="3"
                inputmode="numeric"
                placeholder="123"
                class="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 font-mono text-sm tabular-nums focus:outline-none focus:border-[#FF3B1D]"
              />
            </div>
          </div>

          <p v-if="errorMsg" role="alert" class="text-xs font-medium text-[#DC2626]">
            {{ errorMsg }}
          </p>

          <button
            type="submit"
            :disabled="isProcessing"
            class="w-full py-3.5 rounded-xl bg-[#FF3B1D] hover:bg-[#E02D10] text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
          >
            {{
              isProcessing
                ? t(copy.checkout.processingBtn)
                : `${t(copy.checkout.payBtn)} · ${formatCoursePrice(pricing.total)}`
            }}
          </button>

          <div class="flex items-center justify-center gap-2 text-[11px] text-[#0D0D0F]/55">
            <ShieldCheck class="w-4 h-4 text-[#059669]" />
            <span>{{ t(copy.checkout.secureNote) }}</span>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
