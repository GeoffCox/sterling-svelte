<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import List from './List.svelte';
  import type { TreeNode } from './Tree.types';
  import TreeItem from './TreeItem.svelte';

  type T = $$Generic;

  type FlatTreeNode<T> = {
    node: TreeNode<T>;
    level: number;
  };

  /**
   * The hierarchy of tree nodes.
   */
  export let nodes: TreeNode<T>[] = [];

  /**
   * Disables the tree
   */
  export let disabled = false;

  /**
   * The selected node in the tree (readonly)
   */
  export let selectedNode: TreeNode<T> | undefined = undefined;

  let listRef: List<FlatTreeNode<T>>;
  let selectedItem: FlatTreeNode<T> | undefined;

  const dispatch = createEventDispatcher();

  const raiseNodeCollapsed = (node: TreeNode<T>) => {
    dispatch('nodeCollapsed', { node });
  };

  const raiseNodeExpanded = (node: TreeNode<T>) => {
    dispatch('nodeExpanded', { node });
  };

  const raiseNodeSelected = (node: TreeNode<T>) => {
    dispatch('nodeSelected', { node });
  };

  $: {
    selectedNode = selectedItem?.node;
  }

  const flattenTree = <T>(nodes: TreeNode<T>[], expandedNodes: Array<T>) => {
    const listNodes: FlatTreeNode<T>[] = [];
    nodes?.forEach((node) => flattenTreeNode(node, expandedNodes, 0, listNodes));
    return listNodes;
  };

  const flattenTreeNode = <T>(
    node: TreeNode<T>,
    expandedNodes: Array<T>,
    level: number,
    listItems: FlatTreeNode<T>[]
  ) => {
    listItems.push({ node, level });

    // Children are only included when the node is expanded
    if (expandedNodes.indexOf(node) !== -1) {
      node.children?.forEach((child) =>
        flattenTreeNode(child, expandedNodes, level + 1, listItems)
      );
    }
  };

  // I track expanded by <T> rather than FlatTreeNode<T>
  // so that they aren't invalidated when the tree is flattened.
  let expandedNodes: Array<T> = [];

  const hasChildren = (node: TreeNode<T>) => {
    return (node.children?.length || 0) > 0;
  };

  /**
   * Expands the specified tree node.
   * Only nodes with children can be expanded.
   * @returns true if a collapsed node was expanded, false otherwise.
   */
  export const expandNode = (node: TreeNode<T>): boolean => {
    const index = expandedNodes.findIndex((x) => node === x);
    if (index === -1 && hasChildren(node)) {
      expandedNodes = [...expandedNodes, node];
      raiseNodeExpanded(node);
      return true;
    }
    return false;
  };

  /**
   * Collapses the specified node.
   * @returns true if an expanded node was collapsed; false otherwise.
   */
  export const collapseNode = (node: TreeNode<T>): boolean => {
    const index = expandedNodes.findIndex((x) => node === x);
    if (index !== -1) {
      expandedNodes = [...expandedNodes.slice(0, index), ...expandedNodes.slice(index + 1)];
      raiseNodeCollapsed(node);
      return true;
    }
    return false;
  };

  /**
   * Toggles the expand/collapse of the specified node.
   * Only nodes with children can be expanded.
   * @returns true if a node was expanded or collapsed, otherwise false.
   */
  export const toggleNode = (node: TreeNode<T>): boolean => {
    const index = expandedNodes.findIndex((x) => node === x);
    if (index !== -1) {
      expandedNodes = [...expandedNodes.slice(0, index), ...expandedNodes.slice(index + 1)];
      raiseNodeExpanded(node);
      return true;
    } else if ((node.children?.length || 0) > 0) {
      expandedNodes = [...expandedNodes, node];
      raiseNodeCollapsed(node);
      return true;
    }
    return false;
  };

  export const selectNode = (node: TreeNode<T>) => {
    const flatNode = listNodes.find((n) => n.node === node);
    if (flatNode) {
      listRef?.selectItem(flatNode);
    }
  };

  $: listNodes = flattenTree(nodes, expandedNodes);

  // This cast appears redundant, but it avoids a red squiggle
  // of type unknown for callers binding with let.
  const toFlatTreeNode = (item: any) => item as FlatTreeNode<T>;

  const onItemClick = (item: FlatTreeNode<T>) => {
    toggleNode(item.node);
    selectNode(item.node);
  };

  const onKeydown = (event: KeyboardEvent) => {
    console.log(event.key);
    if (selectedItem && !event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          if (selectedNode) {
            toggleNode(selectedNode);
          }
          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (selectedNode) {
            if (!expandNode(selectedNode)) {
              // left arrow on an expanded node selects the next visible item
              listRef?.selectNextItem();
            }
          }
          event.preventDefault();
          return false;
        case 'ArrowLeft':
          if (selectedNode) {
            if (!collapseNode(selectedNode)) {
              // left arrow on a collapsed node select the previous visible item
              listRef.selectPreviousItem();
            }
          }
          event.preventDefault();
          return false;
      }
    }
  };

  const onItemSelected = (event: CustomEvent<any>) => {
    const node = event.detail.item.node;
    raiseNodeSelected(node);
  };
</script>

<div class="sterling-tree" on:keydown={onKeydown} role="tree">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <List
    items={listNodes}
    {disabled}
    bind:selectedItem
    bind:this={listRef}
    on:itemSelected={onItemSelected}
    let:disabled
    let:index
    let:item
    let:selected
  >
    <svelte:fragment slot="label">
      <slot name="label" {disabled} />
    </svelte:fragment>
    <svelte:fragment slot="item">
      {@const treeItem = toFlatTreeNode(item)}
      {@const hasChildren = (item.node.children?.length || 0) > 0}
      {@const level = item.level}
      <!-- expandedNodes must be referenced here to ensure re-render when they change. -->
      {@const expanded = expandedNodes.indexOf(item.node) !== -1}
      <div
        on:click={() => onItemClick(item)}
        role="treeitem"
        aria-expanded={expanded}
        aria-selected={selected}
        aria-level={level}
      >
        <slot
          name="item"
          {disabled}
          {expanded}
          {hasChildren}
          {index}
          item={treeItem}
          {level}
          {selected}
        >
          <TreeItem {disabled} {expanded} {hasChildren} {level} {selected}>
            <slot {disabled} {expanded} {hasChildren} {index} item={treeItem} {level} {selected} />
          </TreeItem>
        </slot>
      </div>
    </svelte:fragment>
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
