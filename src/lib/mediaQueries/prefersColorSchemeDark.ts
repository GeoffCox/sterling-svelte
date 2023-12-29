import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const prefersColorSchemeDark = writable(false, (set) => {
  let matchMedia: MediaQueryList | undefined = undefined;
  const mediaChangeHandler = (e: MediaQueryListEvent) => set(e.matches);

  onMount(() => {
    matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    set(matchMedia.matches);
    matchMedia.addEventListener('change', mediaChangeHandler);
  });

  return () => {
    matchMedia?.removeEventListener('change', mediaChangeHandler);
  };
});
