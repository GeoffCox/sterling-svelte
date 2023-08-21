import { writable } from 'svelte/store';

export const prefersColorSchemeDark = writable(false, (set) => {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  set(matchMedia.matches);
  const mediaChangeHandler = (e: MediaQueryListEvent) => set(e.matches);
  matchMedia.addEventListener('change', mediaChangeHandler);
  return () => {
    matchMedia.removeEventListener('change', mediaChangeHandler);
  };
});
