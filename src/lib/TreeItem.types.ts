import type { Readable, Writable } from 'svelte/store';

/**
 * The context for a tree item and its descendants.
 */
export type TreeItemContext = {
  /**
   * The depth of this tree item within the tree hierarchy.
   * Starts at zero.
   */
  depth: Writable<number>;

  /** When true, the three item is disabled. */
  disabled: Readable<boolean>;
};
