import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { Readable, Writable } from 'svelte/store';

export type TreeNodeData<T> = T & {
  nodeId?: string;
  children?: TreeNodeData<T>[];
};

/**
 * The set of event handlers forwarded from Tree
 */
export type TreeForwardedEventHandlers = {
  onKeydown: svelte.JSX.KeyboardEventHandler<Element>;
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
   * The IDs of the expanded ttree nodes.
   */
  expandedNodeIds: Writable<string[]>;
  /**
   * The ID of the selected tree node.
   */
  selectedNodeId: Writable<string | undefined>;
  /**
   * The selected tree node's event handlers.
   * The Tree will forward events to these handlers.
   */
  selectedNodeEventHandlers: Writable<TreeForwardedEventHandlers>;
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
