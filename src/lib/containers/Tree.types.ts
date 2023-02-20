import type { Writable } from 'svelte/store';

/**
 * Context for a Tree and its tree items.
 */
export type TreeContext = {
  /**
   * The IDs of the expanded ttree tree items.
   */
  expandedItemIds: Writable<string[]>;
  /**
   * The ID of the selected tree tree item.
   */
  selectedItemId: Writable<string | undefined>;
};

/**
 * The context for a tree item.
 */
export type TreeItemContext = {
  /**
   * How many levels deep this tree item is in the tree hierarchy.
   * A top level item's depth is zero.
   */
  depth: number;
};
