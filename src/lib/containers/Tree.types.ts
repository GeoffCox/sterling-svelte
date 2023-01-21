export type TreeNode<T extends TreeNode<T>> = {
  children?: T[];
};

export type FlatTreeNode<T extends TreeNode<T>> = {
  item: T;
  level: number;
};
