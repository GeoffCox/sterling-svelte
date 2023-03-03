import type { Readable, Writable } from 'svelte/store';

export type TabListContext = {
  disabled: Readable<boolean>;
  selectedValue: Writable<string | undefined>;
  usingKeyboard: Readable<boolean>;
  vertical: Readable<boolean>;
};
