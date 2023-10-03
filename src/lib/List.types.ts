import type { Readable, Writable } from 'svelte/store';

/**
 * The context for a List and its descendants.
 */
export type ListContext = {
  /** When true, the list and its items are disabled. */
  disabled?: Readable<boolean>;

  /** The value of the currently selected item. */
  selectedValue?: Writable<string | undefined>;

  /** When true, the list is laid out horizontally. */
  horizontal?: Readable<boolean>;
};
