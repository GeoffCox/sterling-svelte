<script lang="ts">
  import type { TreeContext, TreeItemContext } from './Tree.types';

  import { getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import { treeContextKey, treeItemContextKey } from './Tree.constants';
  import TreeItemDisplay from './TreeItemDisplay.svelte';
  import { writable } from 'svelte/store';

  // ----- Props ----
  export let disabled = false;
  export let treeItemId: string;

  // ----- Get Context ----- //

  const {
    expandedItemIds,
    selectedItemId,
    disabled: treeDisabled
  } = getContext<TreeContext>(treeContextKey);
  const { depth = 0, disabled: parentDisabled } =
    getContext<TreeItemContext>(treeItemContextKey) || {};

  // ----- State ----- //

  let treeItemRef: HTMLDivElement;

  $: hasChildren = $$slots.default;
  $: expanded = $expandedItemIds.includes(treeItemId);
  $: selected = $selectedItemId === treeItemId;
  $: itemDisabled = disabled || $parentDisabled || $treeDisabled;

  const disabledStore = writable<boolean>(itemDisabled);

  $: {
    disabledStore.set(itemDisabled);
  }

  // ----- Expand/Collapse ----- //

  const collapseItem = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedItemIds.findIndex((id) => id === treeItemId);
      if (index !== -1) {
        expandedItemIds.set([
          ...$expandedItemIds.slice(0, index),
          ...$expandedItemIds.slice(index + 1)
        ]);
        return true;
      }
    }

    return false;
  };

  const expandItem = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedItemIds.findIndex((id) => id === treeItemId);
      if (index === -1) {
        expandedItemIds.set([...$expandedItemIds, treeItemId]);
        return true;
      }
    }

    return false;
  };

  const toggleExpanded = () => {
    if (!disabled) {
      const index = $expandedItemIds.findIndex((id) => id === treeItemId);
      return index !== -1 ? collapseItem(index) : expandItem(index);
    }

    return false;
  };

  // ----- Selection ----- //

  const focusItem = (treeItemElement: Element) => {
    if (!itemDisabled) {
      const item = treeItemElement.querySelector<HTMLElement>('.item');
      item?.focus();
    }
  };

  const selectItemById = (itemId: string) => {
    if (!itemDisabled) {
      selectedItemId.set(itemId);
    }
  };

  export const selectItem = () => {
    if (!itemDisabled) {
      selectItemById(treeItemId);
    }
  };

  const selectParentItem = () => {
    if (!itemDisabled) {
      let candidate = treeItemRef.parentElement?.closest<Element>('[data-tree-item-id]');
      let parentItemId = candidate?.getAttribute('data-tree-item-id');

      if (parentItemId && candidate) {
        selectItemById(parentItemId);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  const selectNextItem = () => {
    if (!itemDisabled) {
      let nextItemId: string | null | undefined = undefined;

      // look for decendants
      let candidate = treeItemRef.querySelector('[data-tree-item-id]');
      nextItemId = candidate?.getAttribute('data-tree-item-id');

      // look for next sibling
      if (!nextItemId) {
        candidate = treeItemRef.nextElementSibling;
        while (candidate && candidate.getAttribute('data-tree-item-id') === null) {
          candidate = candidate.nextElementSibling;
        }
        nextItemId = candidate?.getAttribute('data-tree-item-id');
      }

      // look for next sibling of ancestor
      if (!nextItemId) {
        let ancestor: Element | null | undefined =
          treeItemRef.parentElement?.closest<Element>('[data-tree-item-id]');
        while (ancestor && !nextItemId) {
          candidate = ancestor?.nextElementSibling;
          nextItemId = candidate?.getAttribute('data-tree-item-id');
          ancestor = ancestor.parentElement?.closest<Element>('[data-tree-item-id]');
        }
      }

      if (nextItemId && candidate) {
        selectItemById(nextItemId);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  const selectPreviousItem = () => {
    if (!itemDisabled) {
      let candidate: Element | undefined | null = undefined;
      let prevItemId: string | null | undefined = undefined;

      const previousSibling = treeItemRef?.previousElementSibling;
      if (previousSibling) {
        // look for the last (recursive) decendant of ths previous sibling
        const decendants = previousSibling.querySelectorAll('[data-tree-item-id]');
        if (decendants) {
          candidate = decendants[decendants.length - 1];
          prevItemId = candidate?.getAttribute('data-tree-item-id');
        }

        // look for the previous sibling
        if (!prevItemId) {
          candidate = previousSibling;
          prevItemId = candidate?.getAttribute('data-tree-item-id');
        }
      }
      // look for the parent
      if (!prevItemId) {
        candidate = treeItemRef.parentElement?.closest<Element>('[data-tree-item-id]');
        prevItemId = candidate?.getAttribute('data-tree-item-id');
      }

      if (prevItemId && candidate) {
        selectItemById(prevItemId);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  // ----- Event Handlers ----- //

  const onClick = () => {
    if (!itemDisabled) {
      toggleExpanded();
      selectItem();
    }
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
          When focus is on a closed item, opens the item; focus does not move.
          When focus is on an open item, moves focus to the first child item.
          When focus is on an end item (a tree item with no children), does nothing.
          */
          if (hasChildren) {
            if (expanded) {
              if (selectNextItem()) {
                event.preventDefault();
                event.stopPropagation();
                return false;
              }
            } else if (expandItem()) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }
          break;
        case 'ArrowLeft':
          /*
          When focus is on an open item, closes the item.
          When focus is on a child item that is also either an end item or a closed item, moves focus to its parent item.
          When focus is on a closed `tree`, does nothing.
          */
          if (hasChildren && expanded) {
            if (collapseItem()) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          } else if (selectParentItem()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          /*
          Moves focus to the previous item that is focusable without opening or closing a item.
          */
          if (selectPreviousItem()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowDown':
          /*
          Moves focus to the next item that is focusable without opening or closing a item.
          */
          if (selectNextItem()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
      }
    }
  };

  // ----- Set Context ----- //

  setContext(treeItemContextKey, { depth: depth + 1, disabled: disabledStore });
</script>

<!--
@component
A item in a Tree displaying the item and children.
  -->
<div
  aria-selected={selected ? true : undefined}
  aria-expanded={expanded}
  bind:this={treeItemRef}
  class="sterling-tree-item"
  class:disabled={itemDisabled}
  data-tree-item-id={treeItemId}
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
    on:click={onClick}
    on:keydown={onKeydown}
  >
    <slot
      name="item"
      disabled={itemDisabled}
      {expanded}
      {hasChildren}
      {depth}
      {treeItemId}
      {selected}
    >
      <TreeItemDisplay
        disabled={itemDisabled}
        {expanded}
        {hasChildren}
        {depth}
        {treeItemId}
        {selected}
      >
        <svelte:fragment
          let:disabled
          let:expanded
          let:hasChildren
          let:depth
          let:treeItemId
          let:selected
        >
          <slot name="label" {disabled} {expanded} {hasChildren} {depth} {treeItemId} {selected}
            >{treeItemId}</slot
          >
        </svelte:fragment>
      </TreeItemDisplay>
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
