<script setup lang="ts">
/**
 * Nuxt 3 Component: components/UzbekRobotMascot.vue
 * Cutting-Edge 3D Futuristic Cyber-Robot Mascot:
 * - Stylish modernized dark-blue Uzbek chapan with intricate national embroidery & cyan neon circuitry
 * - Sleek modern cyber-doppa with luminescent bodom (almond) motifs
 * - Glowing neon-blue digital belt (belbog') & energy core
 * - Dynamic emotional states: 'idle' | 'celebrate' | 'thinking' | 'confused'
 */

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    mood?: 'idle' | 'celebrate' | 'thinking' | 'confused';
    speechText?: string;
    showSpeech?: boolean;
  }>(),
  {
    size: 'md',
    mood: 'idle',
    showSpeech: false,
  }
);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-24 h-28';
    case 'lg':
      return 'w-64 h-72';
    case 'xl':
      return 'w-80 h-96';
    default:
      return 'w-48 h-56';
  }
});
</script>

<template>
  <div class="relative inline-flex flex-col items-center select-none group">
    <!-- Interactive Speech Bubble -->
    <div
      v-if="showSpeech && speechText"
      class="mb-3 max-w-sm px-4 py-2.5 rounded-2xl bg-white/95 text-slate-800 text-xs font-bold shadow-2xl border border-white/90 backdrop-blur-xl text-center relative animate-fade-in"
    >
      <div class="flex items-center gap-1.5 justify-center mb-1">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span class="text-[10px] uppercase font-extrabold tracking-wider text-blue-600">FrontBot AI Ustoz</span>
      </div>
      <p class="leading-relaxed text-slate-700">{{ speechText }}</p>
      <!-- Pointer Triangle -->
      <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-white"></div>
    </div>

    <!-- 3D Mascot Cyber-Vector -->
    <div :class="['relative flex items-center justify-center', sizeClasses]">
      <!-- Glowing Atmospheric Aura -->
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-cyan-400/20 to-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <svg viewBox="0 0 220 240" class="w-full h-full relative z-10 drop-shadow-2xl">
        <defs>
          <!-- Cyber Visor Gradient -->
          <linearGradient id="cyberVisor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="50%" stop-color="#020617" />
            <stop offset="100%" stop-color="#1E293B" />
          </linearGradient>

          <!-- Metallic Chapan Dark-Blue Gradient -->
          <linearGradient id="chapanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0047BA" />
            <stop offset="50%" stop-color="#0052CC" />
            <stop offset="100%" stop-color="#003399" />
          </linearGradient>

          <!-- Neon Circuit Glow -->
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#00F0FF" />
            <stop offset="50%" stop-color="#38BDF8" />
            <stop offset="100%" stop-color="#0066FF" />
          </linearGradient>

          <!-- Golden Thread Embroidery Gradient -->
          <linearGradient id="goldEmbroidery" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="50%" stop-color="#EAB308" />
            <stop offset="100%" stop-color="#CA8A04" />
          </linearGradient>

          <filter id="neonFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Ground Glow & Shadow -->
        <ellipse cx="110" cy="226" rx="68" ry="9" fill="rgba(0,102,255,0.22)" />
        <ellipse cx="110" cy="226" rx="42" ry="5" fill="rgba(0,240,255,0.4)" filter="url(#neonFilter)" />

        <!-- Modernised Dark-Blue Uzbek Chapan Body -->
        <path
          d="M 68 140 L 52 215 L 168 215 L 152 140 Z"
          fill="url(#chapanGradient)"
          stroke="#003D99"
          stroke-width="2"
        />

        <!-- Traditional Ikat & Cyber Circuit Striping on Chapan -->
        <path d="M 82 142 L 72 215" stroke="url(#neonGlow)" stroke-width="3" stroke-dasharray="10 4" filter="url(#neonFilter)" />
        <path d="M 98 140 L 92 215" stroke="url(#goldEmbroidery)" stroke-width="2.5" />
        <path d="M 122 140 L 128 215" stroke="url(#goldEmbroidery)" stroke-width="2.5" />
        <path d="M 138 142 L 148 215" stroke="url(#neonGlow)" stroke-width="3" stroke-dasharray="10 4" filter="url(#neonFilter)" />

        <!-- Cyber Core Chest Reactor (Interactive Central Emblem) -->
        <circle cx="110" cy="154" r="14" fill="#020617" stroke="url(#neonGlow)" stroke-width="2" />
        <circle cx="110" cy="154" r="8" fill="#00F0FF" opacity="0.8" filter="url(#neonFilter)" class="animate-pulse" />
        <!-- Code Brackets in Core -->
        <text x="110" y="157" text-anchor="middle" font-family="monospace" font-size="7" font-weight="900" fill="#FFFFFF">&lt;/&gt;</text>

        <!-- Glowing Neon-Blue Belt (Belbog') with National Buckle Motif -->
        <rect x="56" y="176" width="108" height="13" rx="3.5" fill="#00E5FF" stroke="#00B0FF" stroke-width="1.5" filter="url(#neonFilter)" />
        <polygon points="110,183 122,206 98,206" fill="#00B0FF" />
        <!-- Belt Embroidery Nodes -->
        <circle cx="75" cy="182.5" r="2" fill="#FFFFFF" />
        <circle cx="110" cy="182.5" r="2.5" fill="#FFFFFF" />
        <circle cx="145" cy="182.5" r="2" fill="#FFFFFF" />

        <!-- Robot Cyber Arms (Mood Dynamic) -->
        <g v-if="mood === 'celebrate'">
          <rect x="32" y="130" width="18" height="46" rx="9" fill="#94A3B8" transform="rotate(-35 41 138)" />
          <circle cx="22" cy="120" r="9" fill="#00F0FF" filter="url(#neonFilter)" />
          <rect x="170" y="130" width="18" height="46" rx="9" fill="#94A3B8" transform="rotate(35 179 138)" />
          <circle cx="198" cy="120" r="9" fill="#00F0FF" filter="url(#neonFilter)" />
        </g>
        <g v-else-if="mood === 'thinking'">
          <rect x="40" y="138" width="18" height="44" rx="9" fill="#94A3B8" transform="rotate(10 49 146)" />
          <circle cx="42" cy="184" r="9" fill="#64748B" />
          <rect x="160" y="120" width="18" height="42" rx="9" fill="#94A3B8" transform="rotate(-65 169 128)" />
          <circle cx="150" cy="98" r="9" fill="#00F0FF" filter="url(#neonFilter)" />
        </g>
        <g v-else>
          <!-- Idle Arms -->
          <rect x="40" y="138" width="18" height="44" rx="9" fill="#94A3B8" transform="rotate(12 49 146)" />
          <circle cx="40" cy="184" r="9" fill="#64748B" />
          <rect x="162" y="138" width="18" height="44" rx="9" fill="#94A3B8" transform="rotate(-12 171 146)" />
          <circle cx="180" cy="184" r="9" fill="#64748B" />
        </g>

        <!-- Mechanical Neck with Wire Conduit -->
        <rect x="98" y="126" width="24" height="16" rx="4" fill="#475569" />
        <line x1="104" y1="126" x2="104" y2="142" stroke="#38BDF8" stroke-width="1.5" />
        <line x1="116" y1="126" x2="116" y2="142" stroke="#38BDF8" stroke-width="1.5" />

        <!-- Apple Glassmorphic Metallic White Head Shell -->
        <rect x="60" y="52" width="100" height="78" rx="30" fill="#F8FAFC" stroke="#0066FF" stroke-width="3" />
        
        <!-- Deep Black OLED Visor Screen -->
        <rect x="70" y="64" width="80" height="48" rx="18" fill="url(#cyberVisor)" />

        <!-- Eyes and Facial Expression Based on Mood -->
        <g v-if="mood === 'celebrate'">
          <!-- Joyful Curved Cyan Neon Arcs -->
          <path d="M 82 86 Q 92 76 102 86" stroke="#00F0FF" stroke-width="3.5" stroke-linecap="round" fill="none" filter="url(#neonFilter)" />
          <path d="M 118 86 Q 128 76 138 86" stroke="#00F0FF" stroke-width="3.5" stroke-linecap="round" fill="none" filter="url(#neonFilter)" />
          <path d="M 98 100 Q 110 108 122 100" stroke="#00F0FF" stroke-width="3" stroke-linecap="round" fill="none" filter="url(#neonFilter)" />
        </g>
        <g v-else-if="mood === 'thinking'">
          <!-- Analytical Pupil Rings -->
          <circle cx="92" cy="84" r="7" fill="#00F0FF" filter="url(#neonFilter)" />
          <circle cx="128" cy="82" r="8" fill="#00F0FF" filter="url(#neonFilter)" />
          <ellipse cx="110" cy="100" rx="5" ry="2.5" fill="#00F0FF" />
        </g>
        <g v-else-if="mood === 'confused'">
          <!-- Error Cross & Caution Indicator -->
          <line x1="84" y1="80" x2="98" y2="92" stroke="#F43F5E" stroke-width="3" stroke-linecap="round" />
          <line x1="98" y1="80" x2="84" y2="92" stroke="#F43F5E" stroke-width="3" stroke-linecap="round" />
          <circle cx="128" cy="86" r="7" fill="#00F0FF" filter="url(#neonFilter)" />
          <path d="M 102 102 Q 110 96 118 102" stroke="#F43F5E" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </g>
        <g v-else>
          <!-- Cheerful Glowing Neon-Blue Eyes -->
          <circle cx="92" cy="86" r="8" fill="#00F0FF" filter="url(#neonFilter)" />
          <circle cx="128" cy="86" r="8" fill="#00F0FF" filter="url(#neonFilter)" />
          <circle cx="94" cy="84" r="3" fill="#FFFFFF" />
          <circle cx="130" cy="84" r="3" fill="#FFFFFF" />
          <path d="M 100 98 Q 110 106 120 98" stroke="#00F0FF" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </g>

        <!-- Sleek Modern Uzbek Doppa with White Bodom Embroidery & Cyan Accent -->
        <path d="M 58 54 C 58 32, 88 16, 110 16 C 132 16, 162 32, 162 54 Z" fill="#0F172A" stroke="#1E293B" stroke-width="2" />
        
        <!-- Traditional Bodom (Almond) Embroidery Motifs -->
        <path d="M 84 38 C 76 28, 92 24, 94 36 C 94 40, 86 42, 84 38 Z" fill="#FFFFFF" />
        <path d="M 136 38 C 144 28, 128 24, 126 36 C 126 40, 134 42, 136 38 Z" fill="#FFFFFF" />
        <path d="M 110 30 C 104 22, 116 20, 116 28 C 116 32, 110 34, 110 30 Z" fill="#FFFFFF" />
        
        <!-- Doppa Lower Rim with Digital Stitching -->
        <rect x="58" y="50" width="104" height="6.5" fill="#1E293B" />
        <path d="M 60 53 L 64 51 L 68 53 L 72 51 L 76 53 L 80 51 L 84 53 L 88 51 L 92 53 L 96 51 L 100 53 L 104 51 L 108 53 L 112 51 L 116 53 L 120 51 L 124 53 L 128 51 L 132 53 L 136 51 L 140 53 L 144 51 L 148 53 L 152 51 L 156 53 L 160 51" stroke="#38BDF8" stroke-width="1.2" fill="none" />

        <!-- Futuristic Antenna with Luminescent Cyan Emitter -->
        <line x1="110" y1="16" x2="110" y2="4" stroke="#0066FF" stroke-width="3" stroke-linecap="round" />
        <circle cx="110" cy="4" r="5.5" fill="#00F0FF" filter="url(#neonFilter)" class="animate-ping" />
      </svg>
    </div>
  </div>
</template>
