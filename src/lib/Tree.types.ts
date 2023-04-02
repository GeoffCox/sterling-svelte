import type { Readable, Writable } from 'svelte/store';

/**
 * Context for a Tree and its tree items.
 */
export type TreeContext = {
  /** If the tree is disabled */
  disabled: Readable<boolean>;

  /**
   * The values of the expanded tree tree items.
   */
  expandedValues: Writable<string[]>;
  /**
   * The value of the selected tree item.
   */
  selectedValue: Writable<string | undefined>;
};
