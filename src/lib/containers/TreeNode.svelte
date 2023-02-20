<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import type { TreeNodeContext, TreeContext } from './Tree.types';
  import { treeContextKey, treeNodeContextKey } from './Tree.constants';
  import TreeItem from './TreeItem.svelte';
  import Select from '$lib/inputs/Select.svelte';

  // ----- Props ----- //
  export let disabled = false;
  export let nodeId: string;

  // ----- Get Context ----- //

  // The parentNodeId must be retrieved before setting it for the children
  const { expandedNodeIds, selectedNodeId } = getContext<TreeContext>(treeContextKey);
  const { parentNodeId, depth = 0 } = getContext<TreeNodeContext>(treeNodeContextKey);

  // ----- Set Context ----- //

  setContext(treeNodeContextKey, { parentNodeId: nodeId, depth: depth + 1 });

  // ----- State ----- //

  let treeNodeRef: HTMLDivElement;
  $: hasChildren = $$slots.default;
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
        return true;
      }
    }

    return false;
  };

  const expandNode = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedNodeIds.findIndex((id) => id === nodeId);
      if (index === -1) {
        expandedNodeIds.set([...$expandedNodeIds, nodeId]);
        return true;
      }
    }

    return false;
  };

  const toggleExpanded = () => {
    if (!disabled) {
      const index = $expandedNodeIds.findIndex((id) => id === nodeId);
      return index !== -1 ? collapseNode(index) : expandNode(index);
    }

    return false;
  };

  // ----- Selection ----- //

  const focusNode = (treeNodeElement: Element) => {
    if (!disabled) {
      const item = treeNodeElement.querySelector<HTMLElement>('.item');
      item?.focus();
    }
  };

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
    let candidate = treeNodeRef.parentElement?.closest<Element>('[data-node-id]');
    let parentNodeId = candidate?.getAttribute('data-node-id');

    if (parentNodeId && candidate) {
      selectNodeById(parentNodeId);
      focusNode(candidate);
      return true;
    }

    return false;
  };

  const selectNextNode = () => {
    if (!disabled) {
      let nextNodeId: string | null | undefined = undefined;

      // look for decendants
      let candidate = treeNodeRef.querySelector('[data-node-id]');
      nextNodeId = candidate?.getAttribute('data-node-id');

      // look for next sibling
      if (!nextNodeId) {
        candidate = treeNodeRef.nextElementSibling;
        while (candidate && candidate.getAttribute('data-node-id') === null) {
          candidate = candidate.nextElementSibling;
        }
        nextNodeId = candidate?.getAttribute('data-node-id');
      }

      // look for next sibling of ancestor
      if (!nextNodeId) {
        let ancestor: Element | null | undefined =
          treeNodeRef.parentElement?.closest<Element>('[data-node-id]');
        while (ancestor && !nextNodeId) {
          candidate = ancestor?.nextElementSibling;
          nextNodeId = candidate?.getAttribute('data-node-id');
          ancestor = ancestor.parentElement?.closest<Element>('[data-node-id]');
        }
      }

      if (nextNodeId && candidate) {
        selectNodeById(nextNodeId);
        focusNode(candidate);
        return true;
      }
    }

    return false;
  };

  const selectPreviousNode = () => {
    if (!disabled) {
      let candidate: Element | undefined | null = undefined;
      let prevNodeId: string | null | undefined = undefined;

      const previousSibling = treeNodeRef?.previousElementSibling;
      if (previousSibling) {
        // look for the last (recursive) decendant of ths previous sibling
        const decendants = previousSibling.querySelectorAll('[data-node-id]');
        if (decendants) {
          candidate = decendants[decendants.length - 1];
          prevNodeId = candidate?.getAttribute('data-node-id');
        }

        // look for the previous sibling
        if (!prevNodeId) {
          candidate = previousSibling;
          prevNodeId = candidate?.getAttribute('data-node-id');
        }
      }
      // look for the parent
      if (!prevNodeId) {
        candidate = treeNodeRef.parentElement?.closest<Element>('[data-node-id]');
        prevNodeId = candidate?.getAttribute('data-node-id');
      }

      if (prevNodeId && candidate) {
        selectNodeById(prevNodeId);
        focusNode(candidate);
        return true;
      }
    }

    return false;
  };

  // ----- Event Handlers ----- //

  const onItemClick = () => {
    toggleExpanded();
    selectNode();
  };

  const onKeydown: svelte.JSX.KeyboardEventHandler<Element> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          if (toggleExpanded()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowRight':
          /*
          When focus is on a closed node, opens the node; focus does not move.
          When focus is on an open node, moves focus to the first child node.
          When focus is on an end node (a tree item with no children), does nothing.
          */
          if (hasChildren) {
            if (expanded) {
              if (selectNextNode()) {
                event.preventDefault();
                event.stopPropagation();
                return false;
              }
            } else if (expandNode()) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }
          break;
        case 'ArrowLeft':
          /*
          When focus is on an open node, closes the node.
          When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
          When focus is on a closed `tree`, does nothing.
          */
          if (hasChildren && expanded) {
            if (collapseNode()) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          } else if (selectParentNode()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          /*
          Moves focus to the previous node that is focusable without opening or closing a node.
          */
          if (selectPreviousNode()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowDown':
          /*
          Moves focus to the next node that is focusable without opening or closing a node.
          */
          if (selectNextNode()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
      }
    }
  };
</script>

<!--
@component
A node in a Tree displaying the item and children.
  -->
<div
  aria-selected={selected ? true : undefined}
  aria-expanded={expanded}
  bind:this={treeNodeRef}
  class="sterling-tree-node"
  class:disabled
  data-node-id={nodeId}
  role="treeitem"
  on:blur
  on:click
  on:dblclick
  on:focus
  on:focusin
  on:focusout
  on:keydown
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:pointercancel
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  on:pointerover
  on:pointerout
  on:pointerup
  on:wheel
  {...$$restProps}
>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="item"
    class:selected
    tabindex={selected ? 0 : -1}
    on:click={onItemClick}
    on:keydown={onKeydown}
  >
    <slot name="item" {disabled} {expanded} {hasChildren} {depth} {nodeId} {selected}>
      <TreeItem {disabled} {expanded} {hasChildren} {depth} {nodeId} {selected}>
        <svelte:fragment
          let:disabled
          let:expanded
          let:hasChildren
          let:depth
          let:nodeId
          let:selected
        >
          <slot name="label" {disabled} {expanded} {hasChildren} {depth} {nodeId} {selected}
            >{nodeId}</slot
          >
        </svelte:fragment>
      </TreeItem>
    </slot>
  </div>
  {#if expanded && hasChildren}
    <div class="children" transition:slide={{ duration: 200 }} role="group">
      <slot />
    </div>
  {/if}
</div>

<style>
  .item {
    outline: none;
  }
</style>
