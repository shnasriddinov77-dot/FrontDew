<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import gsap from 'gsap';
import type { MascotGesture } from '../utils/mascotGestures';

const props = withDefaults(
  defineProps<{
    gesture?: MascotGesture;
    tick?: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    label?: string;
  }>(),
  {
    gesture: 'idle',
    tick: 0,
    size: 'md',
    interactive: true,
    label: 'FrontDev Robot Mascot',
  }
);

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;
let activeTimeline: gsap.core.Timeline | null = null;
let idleTimeline: gsap.core.Timeline | null = null;

const sizeClasses = computed(() => {
  if (props.size === 'sm') return 'w-14 h-16';
  if (props.size === 'lg') return 'w-28 h-32';
  return 'w-20 h-24';
});

const visorEyeColor = computed(() => {
  switch (props.gesture) {
    case 'celebrate':
      return '#34D399';
    case 'point':
      return '#FF3B1D';
    case 'think':
      return '#FBBF24';
    case 'encourage':
      return '#60A5FA';
    default:
      return '#38BDF8';
  }
});

function startIdleLoop() {
  if (!rootRef.value) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  idleTimeline?.kill();
  const rig = rootRef.value.querySelector('.mascot-body-rig');
  const shadow = rootRef.value.querySelector('.mascot-shadow');
  const eyes = rootRef.value.querySelectorAll('.mascot-eye');
  const antenna = rootRef.value.querySelector('.mascot-antenna-glow');

  idleTimeline = gsap.timeline({ repeat: -1 });
  if (rig) {
    idleTimeline.to(rig, { y: -4.5, duration: 1.5, ease: 'sine.inOut' }, 0);
    idleTimeline.to(rig, { y: 0, duration: 1.5, ease: 'sine.inOut' }, 1.5);
  }
  if (shadow) {
    idleTimeline.to(shadow, { scaleX: 0.88, opacity: 0.28, duration: 1.5, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0);
    idleTimeline.to(shadow, { scaleX: 1, opacity: 0.42, duration: 1.5, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 1.5);
  }
  if (antenna) {
    idleTimeline.to(antenna, { opacity: 0.45, scale: 0.85, duration: 1.5, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0);
    idleTimeline.to(antenna, { opacity: 1, scale: 1.15, duration: 1.5, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 1.5);
  }
  if (eyes.length) {
    idleTimeline.to(eyes, { scaleY: 0.12, duration: 0.09, transformOrigin: '50% 50%', ease: 'power1.in' }, 2.6);
    idleTimeline.to(eyes, { scaleY: 1, duration: 0.12, transformOrigin: '50% 50%', ease: 'power1.out' }, 2.7);
  }
}

function resetLimbs(instant = false) {
  if (!rootRef.value) return;
  const head = rootRef.value.querySelector('.mascot-head');
  const armRight = rootRef.value.querySelector('.mascot-arm-right');
  const handRight = rootRef.value.querySelector('.mascot-hand-right');
  const armLeft = rootRef.value.querySelector('.mascot-arm-left');
  const rig = rootRef.value.querySelector('.mascot-body-rig');
  const dur = instant ? 0 : 0.35;

  gsap.to([head, armRight, handRight, armLeft], {
    rotation: 0,
    x: 0,
    y: 0,
    scale: 1,
    duration: dur,
    ease: 'power2.out',
  });
  if (rig) {
    gsap.to(rig, { rotation: 0, scale: 1, duration: dur, ease: 'power2.out' });
  }
}

function playGesture(gesture: MascotGesture) {
  if (!rootRef.value) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  activeTimeline?.kill();

  const head = rootRef.value.querySelector('.mascot-head');
  const armRight = rootRef.value.querySelector('.mascot-arm-right');
  const handRight = rootRef.value.querySelector('.mascot-hand-right');
  const armLeft = rootRef.value.querySelector('.mascot-arm-left');
  const rig = rootRef.value.querySelector('.mascot-body-rig');

  if (gesture === 'idle') {
    resetLimbs(false);
    return;
  }

  activeTimeline = gsap.timeline();

  if (gesture === 'wave') {
    // Friendly Uzbek greeting wave with subtle head tilt
    activeTimeline
      .to(head, { rotation: -7, duration: 0.28, transformOrigin: '60px 56px', ease: 'power2.out' }, 0)
      .to(armRight, { rotation: -128, duration: 0.32, transformOrigin: '88px 72px', ease: 'back.out(1.6)' }, 0)
      .to(armLeft, { rotation: 10, duration: 0.32, transformOrigin: '32px 72px', ease: 'power2.out' }, 0)
      .to(handRight, { rotation: 22, duration: 0.16, transformOrigin: '94px 92px', ease: 'sine.inOut' })
      .to(handRight, { rotation: -22, duration: 0.18, transformOrigin: '94px 92px', ease: 'sine.inOut', repeat: 4, yoyo: true })
      .to([head, armRight, handRight, armLeft], { rotation: 0, duration: 0.4, ease: 'power2.inOut' });
  } else if (gesture === 'point') {
    // Directional pointing gesture guiding user toward CTA or coding editor
    activeTimeline
      .to(rig, { rotation: -3, duration: 0.3, transformOrigin: '60px 95px', ease: 'power2.out' }, 0)
      .to(head, { rotation: -5, duration: 0.25, transformOrigin: '60px 56px', ease: 'power2.out' }, 0)
      .to(armLeft, { rotation: 58, x: -2, duration: 0.36, transformOrigin: '32px 72px', ease: 'back.out(1.5)' }, 0)
      .to(armLeft, { rotation: 50, duration: 0.35, yoyo: true, repeat: 2, ease: 'sine.inOut' })
      .to(armRight, { rotation: -14, duration: 0.3, transformOrigin: '88px 72px', ease: 'power2.out' }, 0);
  } else if (gesture === 'celebrate') {
    // Joyful double-arm raise & bounce when code passes or course unlocked
    activeTimeline
      .to(rig, { y: -10, scale: 1.05, duration: 0.24, transformOrigin: '60px 100px', ease: 'back.out(2)' }, 0)
      .to(armLeft, { rotation: 135, duration: 0.28, transformOrigin: '32px 72px', ease: 'back.out(1.8)' }, 0)
      .to(armRight, { rotation: -135, duration: 0.28, transformOrigin: '88px 72px', ease: 'back.out(1.8)' }, 0)
      .to(rig, { y: 0, scale: 1, duration: 0.28, ease: 'bounce.out' })
      .to(head, { rotation: -6, duration: 0.15, transformOrigin: '60px 56px', yoyo: true, repeat: 3, ease: 'sine.inOut' }, '-=0.15')
      .to([armLeft, armRight, head], { rotation: 0, duration: 0.45, ease: 'power2.inOut' }, '+=0.35');
  } else if (gesture === 'encourage') {
    // Gentle supportive tilt & reassuring nod on syntax/logic hint
    activeTimeline
      .to(head, { rotation: 9, duration: 0.32, transformOrigin: '60px 56px', ease: 'power2.out' }, 0)
      .to(armRight, { rotation: -38, duration: 0.32, transformOrigin: '88px 72px', ease: 'power2.out' }, 0)
      .to(head, { rotation: -4, duration: 0.3, transformOrigin: '60px 56px', ease: 'sine.inOut' })
      .to(head, { rotation: 5, duration: 0.3, transformOrigin: '60px 56px', ease: 'sine.inOut' })
      .to([head, armRight], { rotation: 0, duration: 0.4, ease: 'power2.out' }, '+=0.3');
  } else if (gesture === 'think') {
    // Thoughtful chin/visor focus when unlocking coding workspace
    activeTimeline
      .to(head, { rotation: 6, duration: 0.3, transformOrigin: '60px 56px', ease: 'power2.out' }, 0)
      .to(armRight, { rotation: -95, duration: 0.35, transformOrigin: '88px 72px', ease: 'power2.out' }, 0)
      .to(handRight, { rotation: 24, duration: 0.25, transformOrigin: '94px 92px', ease: 'power2.out' }, 0.1)
      .to([head, armRight, handRight], { rotation: 0, duration: 0.4, ease: 'power2.inOut' }, '+=0.75');
  }
}

onMounted(() => {
  if (!rootRef.value) return;
  ctx = gsap.context(() => {
    startIdleLoop();
    if (props.gesture !== 'idle') {
      playGesture(props.gesture);
    }
  }, rootRef.value);
});

watch(
  () => [props.gesture, props.tick] as const,
  ([nextGesture]) => {
    if (!rootRef.value || !ctx) return;
    ctx.add(() => playGesture(nextGesture));
  }
);

onUnmounted(() => {
  activeTimeline?.kill();
  idleTimeline?.kill();
  ctx?.revert();
});
</script>

<template>
  <component
    :is="interactive ? 'button' : 'div'"
    ref="rootRef"
    :type="interactive ? 'button' : undefined"
    :aria-label="interactive ? label : undefined"
    :data-gesture="gesture"
    @click="interactive ? emit('click') : undefined"
    class="relative inline-flex items-center justify-center select-none focus-visible:outline-2 focus-visible:outline-[#FF3B1D] rounded-2xl"
    :class="[sizeClasses, interactive ? 'cursor-pointer' : '']"
  >
    <svg
      viewBox="0 0 120 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full overflow-visible"
      aria-hidden="true"
    >
      <!-- Soft Floor Shadow -->
      <ellipse
        class="mascot-shadow"
        cx="60"
        cy="124"
        rx="28"
        ry="5"
        fill="#0A0A0C"
        opacity="0.42"
      />

      <!-- Main Articulated Robot Rig -->
      <g class="mascot-body-rig">
        <!-- Left Arm (Guides / Points) -->
        <g class="mascot-arm-left">
          <rect
            x="19"
            y="69"
            width="13"
            height="26"
            rx="6.5"
            fill="#14192B"
            stroke="#FF3B1D"
            stroke-width="1.5"
          />
          <circle cx="25.5" cy="96" r="5" fill="#F4F4F0" stroke="#0A0A0C" stroke-width="1.5" />
          <circle cx="25.5" cy="96" r="2" fill="#FF3B1D" />
        </g>

        <!-- Right Arm (Waves / Celebrates) -->
        <g class="mascot-arm-right">
          <rect
            x="88"
            y="69"
            width="13"
            height="26"
            rx="6.5"
            fill="#14192B"
            stroke="#0047FF"
            stroke-width="1.5"
          />
          <g class="mascot-hand-right">
            <circle cx="94.5" cy="96" r="5.5" fill="#F4F4F0" stroke="#0A0A0C" stroke-width="1.5" />
            <circle cx="94.5" cy="96" r="2.2" fill="#0047FF" />
          </g>
        </g>

        <!-- Feet / Hover Thrusters -->
        <rect x="42" y="106" width="12" height="11" rx="4" fill="#1E2438" stroke="#0A0A0C" stroke-width="1.5" />
        <rect x="66" y="106" width="12" height="11" rx="4" fill="#1E2438" stroke="#0A0A0C" stroke-width="1.5" />
        <rect x="45" y="114" width="6" height="2.5" rx="1.25" fill="#FF3B1D" />
        <rect x="69" y="114" width="6" height="2.5" rx="1.25" fill="#0047FF" />

        <!-- Modernized Uzbek Chapan Torso -->
        <g class="mascot-chapan">
          <!-- Outer Coat Silhouette -->
          <path
            d="M33 66C33 60.5 37.5 56 43 56H77C82.5 56 87 60.5 87 66V102C87 105.5 84 108 80.5 108H39.5C36 108 33 105.5 33 102V66Z"
            fill="#111626"
            stroke="#2B3654"
            stroke-width="1.8"
          />
          <!-- Traditional Adras Geometric Lapel Trim -->
          <path
            d="M47 56L54 88L49 108"
            stroke="#FF3B1D"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          <path
            d="M73 56L66 88L71 108"
            stroke="#FF3B1D"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          <!-- Glowing Cobalt Sash / Belt -->
          <rect x="34" y="88" width="52" height="5" rx="2.5" fill="#0047FF" />
          <rect x="54" y="86.5" width="12" height="8" rx="2.5" fill="#F4F4F0" stroke="#0A0A0C" stroke-width="1.2" />

          <!-- FrontDev </> Chest Badge -->
          <text
            x="60"
            y="77"
            text-anchor="middle"
            fill="#F4F4F0"
            font-family="monospace"
            font-size="11"
            font-weight="700"
          >&lt;/&gt;</text>
        </g>

        <!-- Head + Visor + Uzbek Doppa -->
        <g class="mascot-head">
          <!-- Side Ear Nodes -->
          <rect x="30" y="34" width="6" height="14" rx="3" fill="#0047FF" />
          <rect x="84" y="34" width="6" height="14" rx="3" fill="#FF3B1D" />

          <!-- Ceramic Robot Head -->
          <rect
            x="35"
            y="22"
            width="50"
            height="36"
            rx="14"
            fill="#F4F4F0"
            stroke="#0A0A0C"
            stroke-width="2"
          />

          <!-- OLED Face Visor -->
          <rect
            x="40"
            y="28"
            width="40"
            height="23"
            rx="9"
            fill="#0A0A0C"
          />

          <!-- Expressive Visor Eyes -->
          <g class="mascot-eyes">
            <rect
              class="mascot-eye"
              x="47"
              y="35"
              width="8"
              height="9"
              rx="4"
              :fill="visorEyeColor"
            />
            <rect
              class="mascot-eye"
              x="65"
              y="35"
              width="8"
              height="9"
              rx="4"
              :fill="visorEyeColor"
            />
          </g>

          <!-- Subtle Smile Arc -->
          <path
            d="M54 46C56.5 48.2 63.5 48.2 66 46"
            :stroke="visorEyeColor"
            stroke-width="1.8"
            stroke-linecap="round"
            opacity="0.85"
          />

          <!-- Sleek Modern Uzbek Doppa (Do'ppi) -->
          <g class="mascot-doppa">
            <path
              d="M39 24L45 11C46.5 8.5 49 7.5 60 7.5C71 7.5 73.5 8.5 75 11L81 24H39Z"
              fill="#141418"
              stroke="#0A0A0C"
              stroke-width="1.6"
            />
            <!-- Doppa Border Band -->
            <rect x="39" y="21" width="42" height="3.5" rx="1.5" fill="#FF3B1D" />
            <!-- Minimalist Geometric Uzbek Qalampir / Bodom Motifs -->
            <path d="M49 17C49 14 52 13 53 16C51.5 17.5 49.5 18 49 17Z" fill="#F4F4F0" />
            <path d="M71 17C71 14 68 13 67 16C68.5 17.5 70.5 18 71 17Z" fill="#F4F4F0" />
            <circle cx="60" cy="14" r="2" fill="#F4F4F0" />

            <!-- Cyber Antenna Beacon -->
            <line x1="60" y1="7.5" x2="60" y2="2.5" stroke="#0A0A0C" stroke-width="2" stroke-linecap="round" />
            <circle class="mascot-antenna-glow" cx="60" cy="2" r="2.8" fill="#FF3B1D" />
          </g>
        </g>
      </g>
    </svg>
  </component>
</template>
