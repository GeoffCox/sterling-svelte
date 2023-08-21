import { writable } from 'svelte/store';

export const prefersReducedMotion = writable(false, (set) => {
  const matchMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  set(matchMedia.matches);
  const mediaChangeHandler = (e: MediaQueryListEvent) => set(e.matches);
  matchMedia.addEventListener('change', mediaChangeHandler);
  return () => {
    matchMedia.removeEventListener('change', mediaChangeHandler);
  };
});
