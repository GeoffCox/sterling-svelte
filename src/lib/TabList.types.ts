import type { Readable, Writable } from 'svelte/store';

export type TabListContext = {
  colorful: Readable<boolean>;
  disabled: Readable<boolean>;
  selectedValue: Writable<string | undefined>;
  vertical: Readable<boolean>;
};
