<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import type { TreeNodeContext, TreeContext, TreeNodeData } from './Tree.types';
  import { treeContextKey, treeNodeContextKey } from './Tree.constants';
  import TreeItem from './TreeItem.svelte';

  // ----- Props ----- //
  type T = $$Generic;
  export let disabled = false;
  export let nodeId: string;
  export let node: TreeNodeData<T> | undefined = undefined;

  // ----- Get Context ----- //

  // The parentNodeId must be retrieved before setting it for the children
  const { getNodeId, expandedNodeIds, selectedNodeId, selectedNodeEventHandlers } =
    getContext<TreeContext<T>>(treeContextKey);
  const { parentNodeId, depth } = getContext<TreeNodeContext>(treeNodeContextKey);

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

  setContext('sterlingTreeNode', { parentNodeId: nodeId, depth: depth + 1 });

  // ----- State ----- //

  let treeNodeRef: HTMLDivElement;
  let itemRef: HTMLDivElement;
  $: hasChildren = (node?.children?.length || 0) > 0 || $$slots.children || $$slots.default;
  $: expanded = $expandedNodeIds.includes(nodeId);
  $: selected = $selectedNodeId === nodeId;

  // ----- Expand/Collapse ----- //

  const collapseNode = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedNodeIds.findIndex((id) => id === nodeId);
      if (index !== -1) {
        expandedNodeIds.set([
          ...$expandedNodeIds.slice(0, index),
          ...$expandedNodeIds.slice(index + 1)
        ]);
      }
    }
  };

  const expandNode = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedNodeIds.findIndex((id) => id === nodeId);
      if (index === -1) {
        expandedNodeIds.set([...$expandedNodeIds, nodeId]);
      }
    }
  };

  const toggleExpanded = () => {
    if (!disabled) {
      const index = $expandedNodeIds.findIndex((id) => id === nodeId);
      index !== -1 ? collapseNode(index) : expandNode(index);
    }
  };

  // ----- Delete/Deselect ----- //

  const selectNodeById = (nodeId: string) => {
    if (!disabled) {
      selectedNodeId.set(nodeId);
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

      const decendants = treeNodeRef.getElementsByClassName('sterling-tree-node');
      const last = decendants.length > 0 ? decendants.item(0) : undefined;
      nextNodeId = last?.getAttribute('data-node-id');

      if (!nextNodeId) {
        nextNodeId = treeNodeRef.nextElementSibling?.getAttribute('data-node-id');
      }

      if (!nextNodeId) {
        let ancestor: Element | null | undefined =
          treeNodeRef.closest<Element>('.sterling-tree-node');
        while (ancestor && !nextNodeId) {
          nextNodeId = ancestor?.nextElementSibling?.getAttribute('data-node-id');
          ancestor = ancestor.parentElement?.closest<Element>('.sterling-tree-node');
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
      const previousSibling = treeNodeRef?.previousElementSibling;

      // find the node immediately preceding this node
      // this will either be
      //  - the recursive last of the children of the previous sibling
      //  - the previous sibling
      //  - or the parent
      if (previousSibling) {
        const decendants = previousSibling.getElementsByClassName('sterling-tree-node');
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
  // ----- Event Handlers ----- //

  const onItemClick = () => {
    console.log('onItemClick');
    toggleExpanded();
    selectNode();
  };

  const onKeydown: svelte.JSX.KeyboardEventHandler<Element> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          toggleExpanded();
          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (!expanded && hasChildren) {
            expandNode();
          } else {
            selectNextNode();
          }
          // left arrow on an expanded node selects the next visible item
          //listRef?.selectNextItem();
          event.preventDefault();
          return false;
        case 'ArrowLeft':
          if (expanded && hasChildren) {
            collapseNode();
          } else if (parentNodeId) {
            selectParentNode();
          } else {
            selectPreviousNode();
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

  $: {
    if (selected) {
      selectedNodeEventHandlers.set({ onKeydown });
      treeNodeRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }
</script>

<!--
@component
A node in a Tree displaying the item and children.
  -->
<div
  aria-selected={selected ? true : undefined}
  aria-expanded={expanded}
  class="sterling-tree-node"
  class:disabled
  bind:this={treeNodeRef}
  data-node-id={nodeId}
  role="treeitem"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div bind:this={itemRef} class="item" class:selected on:click={onItemClick}>
    <slot name="item" {disabled} {expanded} {hasChildren} {depth} {node} {nodeId} {selected}>
      <TreeItem {disabled} {expanded} {hasChildren} {depth} {node} {nodeId} {selected}>
        <svelte:fragment
          let:disabled
          let:expanded
          let:hasChildren
          let:depth
          let:node
          let:nodeId
          let:selected
        >
          <slot name="label" {disabled} {expanded} {hasChildren} {depth} {node} {nodeId} {selected}
            >{nodeId}</slot
          >
        </svelte:fragment>
      </TreeItem>
    </slot>
  </div>
  {#if expanded && hasChildren}
    <div class="children" transition:slide={{ duration: 200 }} role="group">
      <slot name="children">
        {#if node?.children}
          {#each node.children as child}
            <svelte:self {disabled} node={child} nodeId={child.nodeId}>
              <!-- 
              Forward the item slot into each tree node.
              It is cleanest to have a fragment for the TreeNode item slot to 
              capture the let params, then apply them to the Tree item slot. 
              -->
              <svelte:fragment
                slot="item"
                let:disabled
                let:expanded
                let:hasChildren
                let:depth
                let:node
                let:nodeId
                let:selected
              >
                <slot
                  name="item"
                  {disabled}
                  {expanded}
                  {hasChildren}
                  {depth}
                  {node}
                  {nodeId}
                  {selected}
                >
                  <!-- 
                  Svelte prevents conditionally applying slots.
                  This repeats exact same item slot default for this child
                  so the item slot is passed down the tree.
                  -->
                  <TreeItem {disabled} {expanded} {hasChildren} {depth} {node} {nodeId} {selected}>
                    <svelte:fragment
                      let:disabled
                      let:expanded
                      let:hasChildren
                      let:depth
                      let:node
                      let:nodeId
                      let:selected
                    >
                      <!-- This uses the label slot for the TreeItem default slot. -->
                      <slot
                        name="label"
                        {disabled}
                        {expanded}
                        {hasChildren}
                        {depth}
                        {node}
                        {nodeId}
                        {selected}>{nodeId}</slot
                      >
                    </svelte:fragment>
                  </TreeItem>
                </slot>
              </svelte:fragment>
            </svelte:self>
          {/each}
        {/if}
      </slot>
      <slot />
    </div>
  {/if}
</div>

<style>
  .item {
    outline: none;
  }

  .item:focus-visible {
    border: 1px solid blue;
  }
</style>
