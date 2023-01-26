import type { Writable } from 'svelte/store';

export type TreeNodeData<T> = T & {
  nodeId?: string;
  children?: TreeNodeData<T>[];
};

export type TreeContext<T> = {
  getNodeId: (node: TreeNodeData<T>) => string;
  expandedNodeIds: Writable<string[]>;
  selectedNodeId: Writable<string | undefined>;
};

export type TreeNodeContext = {
  parentNodeId?: string;
  level: number;
};
