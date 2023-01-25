import type { Writable } from 'svelte/store';
import type Tree2 from './Tree2.svelte';

/**
 * The generic node type for nodes in a Tree.
 */
export type TreeNode<T> = T & {
  children?: TreeNode<T>[];
};

export type TreeSelectMode = 'single' | 'multiple';

export type TreeContext = {
  expandedNodeIds: Writable<string[]>;
  selectMode: Writable<TreeSelectMode>;
  selectedNodeIds: Writable<string[]>;
};

export type TreeItemContext = {
  parentNodeId?: string;
  level: number;
};
