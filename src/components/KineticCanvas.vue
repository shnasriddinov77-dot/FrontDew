<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let rafId: number | null = null;
let pointerX = 0.5;
let pointerY = 0.5;
let smoothX = 0.5;
let smoothY = 0.5;
let isReducedMotion = false;

function handleMove(e: PointerEvent) {
  const el = canvasRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    pointerX = (e.clientX - rect.left) / rect.width;
    pointerY = (e.clientY - rect.top) / rect.height;
  }
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', handleMove, { passive: true });

  let phase = 0;

  const drawFrame = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    smoothX += (pointerX - smoothX) * 0.06;
    smoothY += (pointerY - smoothY) * 0.06;
    phase += 0.012;

    ctx.clearRect(0, 0, width, height);

    // Subtle radial electric vermilion glow tracking pointer
    const gx = width * (0.25 + smoothX * 0.5);
    const gy = height * (0.2 + smoothY * 0.55);
    const glow = ctx.createRadialGradient(gx, gy, 10, gx, gy, Math.max(width, height) * 0.55);
    glow.addColorStop(0, 'rgba(255, 59, 29, 0.22)');
    glow.addColorStop(0.45, 'rgba(0, 71, 255, 0.09)');
    glow.addColorStop(1, 'rgba(10, 10, 12, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Flowing architectural wave lines (Silencio / Creative WebGL mood)
    const waveCount = 7;
    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      const baseOffset = (height * 0.18) + w * (height * 0.11);
      const alpha = 0.06 + (w / waveCount) * 0.12;
      ctx.strokeStyle = w % 3 === 0 ? `rgba(255, 59, 29, ${alpha + 0.08})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = w % 3 === 0 ? 1.25 : 0.8;

      const step = 32;
      for (let x = 0; x <= width + step; x += step) {
        const nx = x / width;
        const mousePull = Math.exp(-Math.pow((nx - smoothX) * 3.2, 2)) * (smoothY - 0.5) * 90;
        const y =
          baseOffset +
          Math.sin(nx * 5.2 + phase + w * 0.65) * 26 +
          Math.cos(nx * 2.4 - phase * 0.7 + w) * 14 +
          mousePull;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    if (!isReducedMotion) {
      rafId = requestAnimationFrame(drawFrame);
    }
  };

  drawFrame();

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', handleMove);
    if (rafId !== null) cancelAnimationFrame(rafId);
  });
});
</script>

<template>
  <canvas
    ref="canvasRef"
    aria-hidden="true"
    class="absolute inset-0 w-full h-full pointer-events-none"
  />
</template>
