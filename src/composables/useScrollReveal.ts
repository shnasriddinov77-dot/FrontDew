import { onMounted, onUnmounted, type Ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal(containerRef: Ref<HTMLElement | null>, selector = '.reveal-item') {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const el = containerRef.value;
    if (!el || typeof window === 'undefined') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector, el);
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, el);
  });

  onUnmounted(() => {
    ctx?.revert();
  });
}
