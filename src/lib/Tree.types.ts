import type { Readable, Writable } from 'svelte/store';

/**
 * Context for a Tree and its tree items.
 */
export type TreeContext = {
  /**
   * The IDs of the expanded ttree tree items.
   */
  expandedValues: Writable<string[]>;
  /**
   * The ID of the selected tree tree item.
   */
  selectedValue: Writable<string | undefined>;

  /** If the tree is disabled */
  disabled: Readable<boolean>;
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

  /** If the tree item is disabled */
  disabled: Readable<boolean>;
};
