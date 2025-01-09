import type { Readable, Writable } from 'svelte/store';

export type TabListContext = {
  disabled?: boolean | null | undefined;
  selectedValue?: string | undefined;
  vertical?: boolean | null | undefined;
};
