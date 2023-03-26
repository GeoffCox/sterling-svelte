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
