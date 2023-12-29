import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const prefersReducedMotion = writable(false, (set) => {
  let matchMedia: MediaQueryList | undefined = undefined;
  const mediaChangeHandler = (e: MediaQueryListEvent) => set(e.matches);

  onMount(() => {
    matchMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    set(matchMedia.matches);
    matchMedia.addEventListener('change', mediaChangeHandler);
  });

  return () => {
    matchMedia?.removeEventListener('change', mediaChangeHandler);
  };
});
