import type { Readable, Writable } from 'svelte/store';

/**
 * The context for a Tree and its descendants.
 */
export type TreeContext = {
  /** When true, the tree and its descendants are disabled. */
  disabled: Readable<boolean>;

  /** The values of items that are expanded. */
  expandedValues: Writable<string[]>;

  /** The value of the currently selected item. */
  selectedValue: Writable<string | undefined>;
};
