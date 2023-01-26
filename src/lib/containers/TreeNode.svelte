<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import type { TreeNodeContext, TreeContext, TreeNodeData } from './Tree.types';
  import TreeNodeItem from './TreeNodeItem.svelte';

  // ----- Props ----- //
  type T = $$Generic;
  export let disabled = false;
  export let nodeId: string;
  export let node: TreeNodeData<T> | undefined = undefined;

  // ----- Get Context ----- //

  // The parentNodeId must be retrieved before setting it for the children
  const { parentNodeId, level } = getContext<TreeNodeContext>('sterling-tree-item');
  const { getNodeId, expandedNodeIds, selectedNodeId } =
    getContext<TreeContext<T>>('sterling-tree');

  // ----- Check nodeId ----- //

  if (nodeId && node) {
    if (nodeId !== getNodeId(node)) {
      throw new Error('The nodeId does not match node.nodeId.');
    }
  } else if (node) {
    nodeId = getNodeId(node);
  } else if (!nodeId) {
    throw new Error('Both nodeId and node are missing.');
  }

  // ----- Set Context ----- //

  setContext('sterling-tree-item', { parentNodeId: nodeId, level: level + 1 });

  // ----- State ----- //

  let treeItemRef: HTMLDivElement;
  let itemRef: HTMLDivElement;
  $: hasChildren = (node?.children?.length || 0) > 0 || $$slots.children;
  $: expanded = $expandedNodeIds.includes(nodeId);
  $: selected = $selectedNodeId === nodeId;

  // ----- Expand/Collapse ----- //

  const collapseNode = () => {
    if (!disabled) {
      const index = $expandedNodeIds.findIndex((id) => id === nodeId);
      if (index !== -1) {
        expandedNodeIds.set([
          ...$expandedNodeIds.slice(0, index),
          ...$expandedNodeIds.slice(index + 1)
        ]);
      }
    }
  };

  const expandNode = () => {
    if (!disabled) {
      const index = $expandedNodeIds.findIndex((id) => id === nodeId);
      if (index === -1) {
        expandedNodeIds.set([...$expandedNodeIds, nodeId]);
      }
    }
  };

  const toggleExpanded = () => {
    if (!disabled) {
      const index = $expandedNodeIds.findIndex((id) => id === nodeId);
      if (index !== -1) {
        expandedNodeIds.set([
          ...$expandedNodeIds.slice(0, index),
          ...$expandedNodeIds.slice(index + 1)
        ]);
      } else {
        expandedNodeIds.set([...$expandedNodeIds, nodeId]);
      }
    }
  };

  // ----- Delete/Deselect ----- //

  const selectNodeById = (nodeId: string) => {
    if (!disabled) {
      selectedNodeId.set(nodeId);
    }
  };

  const deselectNodeById = (nodeId: string) => {
    if (!disabled && $selectedNodeId === nodeId) {
      selectedNodeId.set(undefined);
    }
  };

  const toggleSelectedById = (nodeId: string) => {
    if (!disabled && $selectedNodeId !== nodeId) {
      selectedNodeId.set(nodeId);
    } else {
      selectedNodeId.set(undefined);
    }
  };

  export const selectNode = () => {
    if (!disabled) {
      selectNodeById(nodeId);
    }
  };

  const selectParentNode = () => {
    if (!disabled && parentNodeId) {
      selectNodeById(parentNodeId);
    }
  };

  const selectNextNode = () => {
    if (!disabled) {
      let nextNodeId: string | null | undefined = undefined;

      const decendants = treeItemRef.getElementsByClassName('sterling-tree-item');
      const last = decendants.length > 0 ? decendants.item(0) : undefined;
      nextNodeId = last?.getAttribute('data-node-id');

      if (!nextNodeId) {
        nextNodeId = treeItemRef.nextElementSibling?.getAttribute('data-node-id');
      }

      //let ancestor = parentNodeId && treeItemRef.closest<Element>(`[data-node-id=${parentNodeId}]`);
      if (!nextNodeId) {
        let ancestor: Element | null | undefined =
          treeItemRef.closest<Element>('.sterling-tree-item');
        while (ancestor && !nextNodeId) {
          nextNodeId = ancestor?.nextElementSibling?.getAttribute('data-node-id');
          ancestor = ancestor.parentElement?.closest<Element>('.sterling-tree-item');
        }
      }

      if (nextNodeId) {
        selectNodeById(nextNodeId);
      }
    }
  };

  const selectPreviousNode = () => {
    if (!disabled) {
      let prevNodeId: string | null | undefined = undefined;
      const previousSibling = treeItemRef?.previousElementSibling;

      // find the node immediately preceding this node
      // this will either be
      //  - the recursive last of the children of the previous sibling
      //  - the previous sibling
      //  - or the parent
      if (previousSibling) {
        const decendants = previousSibling.getElementsByClassName('sterling-tree-item');
        const last =
          decendants.length > 0 ? decendants.item(decendants.length - 1) : previousSibling;
        prevNodeId = last?.getAttribute('data-node-id');
      }

      if (!prevNodeId) {
        prevNodeId = parentNodeId;
      }

      if (prevNodeId) {
        selectNodeById(prevNodeId);
      }
    }
  };

  $: {
    if (selected) {
      itemRef?.focus();
    }
  }

  // ----- Event Handlers ----- //

  const onItemClick = () => {
    console.log('onItemClick');
    toggleExpanded();
    selectNode();
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
    class:selected
    on:click={onItemClick}
    on:keydown={onKeydown}
    bind:this={itemRef}
    tabindex={!disabled ? 0 : undefined}
  >
    <slot name="item" {disabled} {expanded} {hasChildren} {level} {node} {nodeId} {selected}>
      <TreeNodeItem {disabled} {expanded} {hasChildren} {level} {selected}>
        <slot name="label" {disabled} {expanded} {hasChildren} {level} {node} {nodeId} {selected}
          >{nodeId}</slot
        >
      </TreeNodeItem>
    </slot>
  </div>
  {#if expanded && hasChildren}
    <div class="children" transition:slide={{ duration: 200 }}>
      <slot name="children">
        {#if node?.children}
          {#each node.children as child}
            <svelte:self {disabled} node={child} nodeId={child.nodeId}>
              <slot
                name="item"
                slot="item"
                let:disabled
                let:expanded
                let:hasChildren
                let:level
                let:node
                let:nodeId
                let:selected
                {disabled}
                {expanded}
                {hasChildren}
                {level}
                {node}
                {nodeId}
                {selected}
              >
                <TreeNodeItem {disabled} {expanded} {hasChildren} {level} {selected}>
                  <slot
                    name="label"
                    {disabled}
                    {expanded}
                    {hasChildren}
                    {level}
                    {node}
                    {nodeId}
                    {selected}>{nodeId}</slot
                  >
                </TreeNodeItem>
              </slot>
            </svelte:self>
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
