import { ref } from 'vue';
import type { LocalizedText } from '../i18n/translations';
import {
  resolveMascotReaction,
  type MascotContextEvent,
  type MascotGesture,
} from '../utils/mascotGestures';

const currentGesture = ref<MascotGesture>('idle');
const currentSpeech = ref<LocalizedText | null>(null);
const speechVisible = ref(false);
const isMinimized = ref(false);
const gestureTick = ref(0);

let resetTimer: ReturnType<typeof setTimeout> | null = null;
let speechTimer: ReturnType<typeof setTimeout> | null = null;

export function useMascot() {
  function triggerMascot(event: MascotContextEvent, options?: { showSpeech?: boolean }) {
    const reaction = resolveMascotReaction(event);
    currentGesture.value = reaction.gesture;
    currentSpeech.value = reaction.speech;
    gestureTick.value += 1;

    if (resetTimer) clearTimeout(resetTimer);
    if (speechTimer) clearTimeout(speechTimer);

    const showSpeech = options?.showSpeech ?? true;
    speechVisible.value = showSpeech;

    resetTimer = setTimeout(() => {
      currentGesture.value = 'idle';
    }, reaction.durationMs);

    if (showSpeech) {
      speechTimer = setTimeout(() => {
        speechVisible.value = false;
      }, reaction.durationMs + 1400);
    }
  }

  function dismissSpeech() {
    speechVisible.value = false;
    if (speechTimer) clearTimeout(speechTimer);
  }

  function toggleMinimized() {
    isMinimized.value = !isMinimized.value;
    if (!isMinimized.value) {
      triggerMascot('click-mascot');
    } else {
      dismissSpeech();
    }
  }

  return {
    currentGesture,
    currentSpeech,
    speechVisible,
    isMinimized,
    gestureTick,
    triggerMascot,
    dismissSpeech,
    toggleMinimized,
  };
}
