import type { Writable } from 'svelte/store';

/**
 * Context for a Tree and its TreeNodes
 */
export type TreeContext = {
  /**
   * The IDs of the expanded ttree nodes.
   */
  expandedNodeIds: Writable<string[]>;
  /**
   * The ID of the selected tree node.
   */
  selectedNodeId: Writable<string | undefined>;
};

/**
 * The context for a TreeNode
 */
export type TreeNodeContext = {
  /**
   * The ID of the parent node.
   */
  parentNodeId?: string;
  /**
   * How many levels deep this node is in the tree hierarchy.
   * A top level item's depth is zero.
   */
  depth: number;
};
