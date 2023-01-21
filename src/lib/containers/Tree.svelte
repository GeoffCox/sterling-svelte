<script lang="ts">
  import List from './List.svelte';
  import type { TreeNode, FlatTreeNode } from './Tree.types';
  import TreeItem from './TreeItem.svelte';

  type T = $$Generic<TreeNode>;
  export let nodes: TreeNode<T>[] = [];

  const flattenTree = <T extends TreeNode<T>>(nodes: T[]) => {
    const flatNodes: FlatTreeNode<T>[] = [];
    nodes?.forEach((node) => flattenTreeNode(node, 0, flatNodes));
    return flatNodes;
  };

  const flattenTreeNode = <T extends TreeNode<T>>(
    node: T,
    level: number,
    flatNodes: FlatTreeNode<T>[]
  ) => {
    flatNodes.push({ item: node, level });
    node.children?.forEach((child) => flattenTreeNode(child, level + 1, flatNodes));
  };

  $: flatNodes = flattenTree(nodes);
</script>

<div class="sterling-tree">
  <List items={flatNodes} let:disabled let:index let:item let:selected>
    <svelte:fragment slot="label">
      <slot name="label" />
    </svelte:fragment>
    <slot name="item" {disabled} {index} {item} {selected}>
      <TreeItem {disabled} {selected} expanded={selected}>
        <slot {disabled} {index} {item} {selected} />
      </TreeItem>
    </slot>
  </List>
</div>

<style>
  .sterling-tree {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }
</style>
