import type { Readable, Writable } from 'svelte/store';

export type TabListContext = {
  disabled: Readable<boolean>;
  selectedValue: Writable<string | undefined>;
  vertical: Readable<boolean>;
  variant: Readable<string>;
};
