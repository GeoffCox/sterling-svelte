import type { Readable, Writable } from 'svelte/store';

export type ListContext = {
  colorful?: Readable<boolean>;
  disabled?: Readable<boolean>;
  selectedValue?: Writable<string | undefined>;
  horizontal?: Readable<boolean>;
};
