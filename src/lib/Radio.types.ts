import type { HTMLInputAttributes } from 'svelte/elements';

export type RadioProps = HTMLInputAttributes & {
  group?: any | null;
};
