import type { Readable } from 'svelte/store';

/**
 * The context for a tree item.
 */
export type TreeItemContext = {
  /**
   * How many levels deep this tree item is in the tree hierarchy.
   * A top level item's depth is zero.
   */
  depth: number;

  /** If the tree item is disabled */
  disabled: Readable<boolean>;
};
