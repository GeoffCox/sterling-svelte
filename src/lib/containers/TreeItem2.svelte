<script lang="ts">
  import { createEventDispatcher, getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import type { TreeItemContext, TreeContext, TreeNode } from './Tree.types';
  import TreeItemChevron from './TreeItemChevron.svelte';

  // ----- Props ----- //
  type T = $$Generic;
  export let children: TreeNode<T>[] | undefined = undefined;
  export let disabled = false;
  export let nodeId: string;

  // ----- Events ----- //
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

  // ----- Context ----- //

  // The parentNodeId must be retrieved before setting it for the children
  const { parentNodeId, level } = getContext<TreeItemContext>('sterling-tree-item');
  setContext('sterling-tree-item', { parentNodeId: nodeId, level: level + 1 });

  const { expandedNodeIds, selectMode, selectedNodeIds } = getContext<TreeContext>('sterling-tree');

  // ----- State ----- //

  let treeItemRef: HTMLDivElement;
  let itemRef: HTMLDivElement;
  $: hasChildren = (children?.length || 0) > 0 || $$slots.children;
  $: expanded = $expandedNodeIds.includes(nodeId);
  $: isSelected = $selectedNodeIds.includes(nodeId);

  // ----- Expand/Collapse ----- //

  const collapseNode = () => {
    const index = $expandedNodeIds.findIndex((id) => id === nodeId);
    if (index !== -1) {
      expandedNodeIds.set([
        ...$expandedNodeIds.slice(0, index),
        ...$expandedNodeIds.slice(index + 1)
      ]);
    }
  };

  const expandNode = () => {
    const index = $expandedNodeIds.findIndex((id) => id === nodeId);
    if (index === -1) {
      expandedNodeIds.set([...$expandedNodeIds, nodeId]);
    }
  };

  const toggleExpanded = () => {
    const index = $expandedNodeIds.findIndex((id) => id === nodeId);
    if (index !== -1) {
      expandedNodeIds.set([
        ...$expandedNodeIds.slice(0, index),
        ...$expandedNodeIds.slice(index + 1)
      ]);
      //raiseNodeExpanded(node);
    } else {
      expandedNodeIds.set([...$expandedNodeIds, nodeId]);
      //raiseNodeCollapsed(node);
    }
  };

  // ----- Delete/Deselect ----- //

  const selectNodeById = (nodeId: string) => {
    const index = $selectedNodeIds.findIndex((id) => id === nodeId);
    if (index === -1) {
      if ($selectMode === 'single') {
        selectedNodeIds.set([nodeId]);
      } else {
        selectedNodeIds.set([...$selectedNodeIds, nodeId]);
      }
    }
  };

  const deselectNodeById = (nodeId: string) => {
    const index = $selectedNodeIds.findIndex((id) => id === nodeId);
    if (index !== -1) {
      if ($selectMode === 'single') {
        selectedNodeIds.set([]);
      } else {
        selectedNodeIds.set([
          ...$selectedNodeIds.slice(0, index),
          ...$selectedNodeIds.slice(index + 1)
        ]);
      }
    }
  };

  const toggleSelectedById = (nodeId: string) => {
    const index = $selectedNodeIds.findIndex((id) => id === nodeId);
    if ($selectMode === 'single') {
      if (index !== -1) {
        selectedNodeIds.set([]);
      } else {
        selectedNodeIds.set([nodeId]);
      }
    } else {
      if (index !== -1) {
        selectedNodeIds.set([
          ...$selectedNodeIds.slice(0, index),
          ...$selectedNodeIds.slice(index + 1)
        ]);
      } else {
        selectedNodeIds.set([...$selectedNodeIds, nodeId]);
      }
    }
  };

  export const selectNode = () => {
    selectNodeById(nodeId);
  };

  const deselectNode = () => {
    deselectNodeById(nodeId);
  };

  const toggleSelected = () => {
    toggleSelectedById(nodeId);
  };

  const selectParentNode = () => {
    if (parentNodeId) {
      selectNodeById(parentNodeId);
    }
  };

  const selectNextNode = () => {
    let nextNodeId: string | null | undefined = undefined;

    const decendants = treeItemRef.getElementsByClassName('sterling-tree-item');
    const last = decendants.length > 0 ? decendants.item(0) : undefined;
    nextNodeId = last?.getAttribute('data-node-id');

    if (!nextNodeId) {
      nextNodeId = treeItemRef.nextElementSibling?.getAttribute('data-node-id');
    }

    let ancestor = parentNodeId && treeItemRef.closest<Element>(`[data-node-id=${parentNodeId}]`);
    while (ancestor && !nextNodeId) {
      nextNodeId = ancestor?.nextElementSibling?.getAttribute('data-node-id');
      ancestor = ancestor.parentElement;
    }

    if (nextNodeId) {
      selectNodeById(nextNodeId);
    }
  };

  const selectPreviousNode = () => {
    let prevNodeId: string | null | undefined = undefined;
    const previousSibling = treeItemRef?.previousElementSibling;

    // find the node immediately preceding this node
    // this will either be
    // the recursvie last of the children of the previous sibling
    // the previous sibling
    // or the parent
    if (previousSibling) {
      const decendants = previousSibling.getElementsByClassName('sterling-tree-item');
      const last = decendants.length > 0 ? decendants.item(decendants.length - 1) : previousSibling;
      prevNodeId = last?.getAttribute('data-node-id');
    }

    if (!prevNodeId) {
      prevNodeId = parentNodeId;
    }

    if (prevNodeId) {
      selectNodeById(prevNodeId);
    }
  };

  $: {
    if (isSelected) {
      console.log('focused by selection');
      itemRef?.focus();
    }
  }

  // ----- Event Handlers ----- //

  const onItemClick = () => {
    console.log('onItemClick');
    toggleExpanded();
    if ($selectMode === 'single') {
      selectNode();
    } else {
      toggleSelected();
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    console.log('onKeydown');
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          toggleExpanded();
          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (hasChildren) {
            expandNode();
          }
          // left arrow on an expanded node selects the next visible item
          //listRef?.selectNextItem();
          event.preventDefault();
          return false;
        case 'ArrowLeft':
          if (expanded && hasChildren) {
            collapseNode();
          } else {
            selectParentNode();
          }
          // left arrow on a collapsed node select the previous visible item
          //listRef.selectPreviousItem();
          event.preventDefault();
          return false;
        case 'ArrowUp':
          selectPreviousNode();
          event.preventDefault();
          return false;
        case 'ArrowDown':
          selectNextNode();
          event.preventDefault();
          return false;
      }
    }
  };
</script>

<!--
@component
A node in a Tree displaying the item and children.
  -->
<div
  class="sterling-tree-item"
  class:disabled
  bind:this={treeItemRef}
  data-node-id={nodeId}
  style={`--level: ${level}`}
>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="item"
    class:selected={isSelected}
    on:click={onItemClick}
    on:keydown={onKeydown}
    bind:this={itemRef}
    tabindex={!disabled ? 0 : undefined}
  >
    <slot name="item">
      <TreeItemChevron {expanded} {hasChildren} />
      <slot name="label" {disabled} />
    </slot>
  </div>
  {#if expanded && hasChildren}
    <div class="children" transition:slide={{ duration: 200 }}>
      <slot name="children">
        {#if children}
          {#each children as child}
            <svelte:self children={child.children} {disabled} />
          {/each}
        {/if}
      </slot>
    </div>
  {/if}
  <slot />
</div>

<style>
  .item {
    align-content: center;
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    color: var(--Input__color);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.25em;
    margin: 0;
    outline: none;
    padding: 0.5em;
    padding-left: calc(0.35em * var(--level, 1));
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .sterling-tree-item.disabled .item {
    color: var(--Input__color--disabled);
  }

  @media (prefers-reduced-motion) {
    .sterling-tree-item {
      transition: none;
    }
  }
</style>
