import type { Writable } from 'svelte/store';
import type Tree2 from '../../../../src/lib/containers/Tree.svelte';

/**
 * The generic node type for nodes in a Tree.
 */
export type TreeNode<T> = T & {
  nodeId?: string;
  children?: TreeNode<T>[];
};

export type TreeSelectMode = 'single' | 'multiple';

export type TreeContext<T> = {
  getNodeId: (node: TreeNode<T>) => string;
  expandedNodeIds: Writable<string[]>;
  selectMode: Writable<TreeSelectMode>;
  selectedNodeIds: Writable<string[]>;
};

export type TreeItemContext = {
  parentNodeId?: string;
  level: number;
};
