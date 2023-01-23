/**
 * The generic node type for nodes in a Tree.
 */
export type TreeNode<T> = T & {
  children?: TreeNode<T>[];
};
