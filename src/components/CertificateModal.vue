<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Award, Printer, X } from 'lucide-vue-next';
import type { EarnedCertificate } from '../composables/useAcademyStore';
import { useI18n } from '../composables/useI18n';

const props = defineProps<{
  certificate: EarnedCertificate | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { t, copy } = useI18n();

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.certificate) {
    emit('close');
  }
}

function handlePrint() {
  window.print();
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div
    v-if="certificate"
    role="dialog"
    aria-modal="true"
    aria-label="FrontDev Certificate"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-2xl bg-[#F4F4F0] text-[#0D0D0F] rounded-2xl border border-black/15 p-6 sm:p-10 space-y-8 relative shadow-2xl">
      <button
        type="button"
        aria-label="Close certificate"
        @click="emit('close')"
        class="absolute top-5 right-5 p-2 rounded-lg border border-black/10 hover:bg-black/5 cursor-pointer"
      >
        <X class="w-4 h-4" />
      </button>

      <div class="border border-black/15 rounded-xl p-6 sm:p-10 bg-white space-y-6">
        <div class="flex items-center justify-between border-b border-black/10 pb-4">
          <span class="font-display text-lg font-extrabold tracking-tight">FrontDev</span>
          <span class="font-mono text-xs text-[#0D0D0F]/55">ID: {{ certificate.id }}</span>
        </div>

        <div class="space-y-3 py-2">
          <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF3B1D]">
            <Award class="w-4 h-4" />
            <span>{{ t(copy.certificate.heading) }}</span>
          </div>
          <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#0D0D0F]">
            {{ certificate.studentName }}
          </h2>
          <p class="text-sm text-[#0D0D0F]/70">
            {{ t(copy.certificate.subline) }}
          </p>
          <div class="font-display text-xl font-bold text-[#0D0D0F] pt-1">
            «{{ certificate.courseTitle }}»
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10 text-xs font-mono text-[#0D0D0F]/65 tabular-nums">
          <span>{{ t(copy.certificate.scoreLabel) }}: {{ certificate.scorePercent }}%</span>
          <span>{{ t(copy.certificate.dateLabel) }}: {{ certificate.issuedAt }}</span>
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="handlePrint"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D0D0F] hover:bg-[#FF3B1D] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Printer class="w-4 h-4" />
          <span>{{ t(copy.certificate.printBtn) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
