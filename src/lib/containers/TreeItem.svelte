<script lang="ts">
  import type { TreeContext, TreeItemContext } from './Tree.types';

  import { getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import { treeContextKey, treeItemContextKey } from './Tree.constants';
  import TreeItemDisplay from './TreeItemDisplay.svelte';
  import { writable } from 'svelte/store';

  // ----- Props ----
  export let disabled = false;
  export let value: string;

  // ----- Get Context ----- //

  const {
    expandedValues,
    selectedValue,
    disabled: treeDisabled
  } = getContext<TreeContext>(treeContextKey);
  const { depth = 0, disabled: parentDisabled } =
    getContext<TreeItemContext>(treeItemContextKey) || {};

  // ----- State ----- //

  let treeItemRef: HTMLDivElement;

  $: hasChildren = $$slots.default;
  $: expanded = $expandedValues.includes(value);
  $: selected = $selectedValue === value;
  $: _disabled = disabled || $parentDisabled || $treeDisabled;

  const disabledStore = writable<boolean>(_disabled);

  $: {
    disabledStore.set(_disabled);
  }

  // ----- Expand/Collapse ----- //

  const collapseItem = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedValues.findIndex((id) => id === value);
      if (index !== -1) {
        expandedValues.set([
          ...$expandedValues.slice(0, index),
          ...$expandedValues.slice(index + 1)
        ]);
        return true;
      }
    }

    return false;
  };

  const expandItem = (index?: number) => {
    if (!disabled) {
      index = index ?? $expandedValues.findIndex((id) => id === value);
      if (index === -1) {
        expandedValues.set([...$expandedValues, value]);
        return true;
      }
    }

    return false;
  };

  const toggleExpanded = () => {
    if (!disabled) {
      const index = $expandedValues.findIndex((id) => id === value);
      return index !== -1 ? collapseItem(index) : expandItem(index);
    }

    return false;
  };

  // ----- Selection ----- //

  const focusItem = (treeItemElement: Element) => {
    if (!_disabled) {
      const item = treeItemElement.querySelector<HTMLElement>('.item');
      item?.focus();
    }
  };

  const selectItemById = (value: string) => {
    if (!_disabled) {
      selectedValue.set(value);
    }
  };

  export const selectItem = () => {
    if (!_disabled) {
      selectItemById(value);
    }
  };

  const selectParentItem = () => {
    if (!_disabled) {
      let candidate = treeItemRef.parentElement?.closest<Element>('[role="treeitem"][data-value]');
      let candidateValue = candidate?.getAttribute('data-value');

      if (candidateValue && candidate) {
        selectItemById(candidateValue);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  const selectNextItem = () => {
    if (!_disabled) {
      let candidateValue: string | null | undefined = undefined;

      // look for decendants
      let candidate = treeItemRef.querySelector('[role="treeitem"][data-value]');
      candidateValue = candidate?.getAttribute('data-value');

      // look for next sibling
      if (!candidateValue) {
        candidate = treeItemRef.nextElementSibling;
        while (candidate && candidate.getAttribute('data-value') === null) {
          candidate = candidate.nextElementSibling;
        }
        candidateValue = candidate?.getAttribute('data-value');
      }

      // look for next sibling of ancestor
      if (!candidateValue) {
        let ancestor: Element | null | undefined = treeItemRef.parentElement?.closest<Element>(
          '[role="treeitem"][data-value]'
        );
        while (ancestor && !candidateValue) {
          candidate = ancestor?.nextElementSibling;
          candidateValue = candidate?.getAttribute('data-value');
          ancestor = ancestor.parentElement?.closest<Element>('[role="treeitem"][data-value]');
        }
      }

      if (candidateValue && candidate) {
        selectItemById(candidateValue);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  const selectPreviousItem = () => {
    if (!_disabled) {
      let candidate: Element | undefined | null = undefined;
      let candidateValue: string | null | undefined = undefined;

      const previousSibling = treeItemRef?.previousElementSibling;
      if (previousSibling) {
        // look for the last (recursive) decendant of ths previous sibling
        const decendants = previousSibling.querySelectorAll('[role="treeitem"][data-value]');
        if (decendants) {
          candidate = decendants[decendants.length - 1];
          candidateValue = candidate?.getAttribute('data-value');
        }

        // look for the previous sibling
        if (!candidateValue) {
          candidate = previousSibling;
          candidateValue = candidate?.getAttribute('data-value');
        }
      }
      // look for the parent
      if (!candidateValue) {
        candidate = treeItemRef.parentElement?.closest<Element>('[role="treeitem"][data-value]');
        candidateValue = candidate?.getAttribute('data-value');
      }

      if (candidateValue && candidate) {
        selectItemById(candidateValue);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  // ----- Event Handlers ----- //

  const onClick = () => {
    if (!_disabled) {
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
  class:disabled={_disabled}
  data-value={value}
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
    <slot name="item" {depth} disabled={_disabled} {expanded} {hasChildren} {selected} {value}>
      <TreeItemDisplay {depth} disabled={_disabled} {expanded} {hasChildren} {selected} {value}>
        <svelte:fragment let:depth let:disabled let:expanded let:hasChildren let:selected let:value>
          <slot name="label" {depth} {disabled} {expanded} {hasChildren} {selected} {value}
            >{value}</slot
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
