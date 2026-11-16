<script setup lang="ts">
import { ref } from 'vue';
import { Check, ArrowRight } from 'lucide-vue-next';
import { SUBSCRIPTION_TIERS, type SubscriptionTier } from '../data/frontendCourses';
import { SUBSCRIPTION_LOCALIZATIONS } from '../data/courseLocalizations';
import { useAcademyStore } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';
import { useScrollReveal } from '../composables/useScrollReveal';

const emit = defineEmits<{
  (e: 'selectPlan', tier: SubscriptionTier): void;
}>();

const { state, isProSubscriber } = useAcademyStore();
const { t, tList, formatCoursePrice, copy } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
useScrollReveal(sectionRef);

const billingMode = ref<'monthly' | 'annual'>('annual');
</script>

<template>
  <section
    id="pricing"
    ref="sectionRef"
    class="bg-[#0A0A0C] text-[#F4F4F0] py-20 lg:py-28 border-t border-white/10"
  >
    <div class="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
      <!-- Header + Billing Selector -->
      <div class="reveal-item flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/12">
        <div class="space-y-3 max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-[#FF3B1D]">
            {{ t(copy.pricing.kicker) }}
          </p>
          <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
            {{ t(copy.pricing.title) }}
          </h2>
          <p class="text-sm sm:text-base text-[#F4F4F0]/70">
            {{ t(copy.pricing.subtitlePrefix) }}
            <span class="font-mono text-white font-semibold">FRONT20</span>
            {{ t(copy.pricing.subtitleSuffix) }}
          </p>
        </div>

        <div class="flex items-center gap-1 p-1 rounded-xl bg-white/8 border border-white/12 self-start lg:self-auto">
          <button
            type="button"
            @click="billingMode = 'monthly'"
            class="px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            :class="billingMode === 'monthly' ? 'bg-white text-[#0A0A0C]' : 'text-[#F4F4F0]/70 hover:text-white'"
          >
            {{ t(copy.pricing.monthlyToggle) }}
          </button>
          <button
            type="button"
            @click="billingMode = 'annual'"
            class="px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            :class="billingMode === 'annual' ? 'bg-[#FF3B1D] text-white' : 'text-[#F4F4F0]/70 hover:text-white'"
          >
            {{ t(copy.pricing.annualToggle) }}
          </button>
        </div>
      </div>

      <!-- Two-Tier Pricing Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="tier in SUBSCRIPTION_TIERS"
          :key="tier.id"
          data-cursor="PRO"
          class="reveal-item rounded-2xl p-8 lg:p-10 flex flex-col justify-between border transition-colors"
          :class="
            tier.highlighted
              ? 'bg-[#141418] border-[#FF3B1D]/70'
              : 'bg-[#111114] border-white/12'
          "
        >
          <div class="space-y-6">
            <div class="flex items-center justify-between gap-4">
              <h3 class="font-display text-xl sm:text-2xl font-bold text-white">
                {{ t(SUBSCRIPTION_LOCALIZATIONS[tier.id].name) }}
              </h3>
              <span
                v-if="tier.highlighted"
                class="font-mono text-xs uppercase tracking-wider text-[#FF3B1D]"
              >
                {{ t(copy.pricing.recommended) }}
              </span>
            </div>

            <p class="text-sm text-[#F4F4F0]/70">
              {{ t(SUBSCRIPTION_LOCALIZATIONS[tier.id].tagline) }}
            </p>

            <div class="pt-4 border-t border-white/10">
              <div class="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums">
                {{
                  tier.id === 'pro-annual' && billingMode === 'annual'
                    ? formatCoursePrice(tier.annualPriceRub)
                    : formatCoursePrice(tier.monthlyPriceRub)
                }}
              </div>
              <div class="font-mono text-xs text-[#F4F4F0]/55 mt-1 tabular-nums">
                {{
                  tier.id === 'pro-annual'
                    ? `${formatCoursePrice(tier.annualMonthlyEquivalentRub)} ${t(copy.pricing.annualNote)}`
                    : t(copy.pricing.monthlyNote)
                }}
              </div>
            </div>

            <ul class="space-y-3 pt-2">
              <li
                v-for="(feature, idx) in tList(SUBSCRIPTION_LOCALIZATIONS[tier.id].features)"
                :key="idx"
                class="flex items-start gap-3 text-sm text-[#F4F4F0]/85"
              >
                <Check class="w-4 h-4 text-[#FF3B1D] mt-0.5 shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="pt-8 mt-8 border-t border-white/10">
            <button
              v-if="state.subscriptionPlan === tier.id"
              type="button"
              disabled
              class="w-full py-3.5 px-6 rounded-xl bg-white/10 text-white/75 text-sm font-semibold cursor-default"
            >
              {{ t(copy.pricing.activeBtn) }}
            </button>
            <button
              v-else
              type="button"
              @click="emit('selectPlan', tier)"
              class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              :class="
                tier.highlighted
                  ? 'bg-[#FF3B1D] hover:bg-[#E02D10] text-white'
                  : 'bg-white text-[#0A0A0C] hover:bg-[#FF3B1D] hover:text-white'
              "
            >
              <span>
                {{
                  isProSubscriber
                    ? t(copy.pricing.switchBtn)
                    : `${t(copy.pricing.choosePrefix)} ${t(SUBSCRIPTION_LOCALIZATIONS[tier.id].name)}`
                }}
              </span>
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
