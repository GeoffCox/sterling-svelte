import type { Writable } from 'svelte/store';

export type TreeNodeData<T> = T & {
  nodeId?: string;
  children?: TreeNodeData<T>[];
};

/**
 * Context for a Tree and its TreeNodes
 */
export type TreeContext<T> = {
  /**
   * Gets the ID for the tree node.
   */
  getNodeId: (node: TreeNodeData<T>) => string;
  /**
   * The IDs of the expanded tree nodes.
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
