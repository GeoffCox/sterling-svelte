<script lang="ts">
  import type { KeyboardEventHandler } from 'svelte/elements';
  import type { SlideParams, TransitionConfig } from 'svelte/transition';
  import type { TreeContext } from './Tree.types';
  import type { TreeItemContext } from './TreeItem.types';

  import { getContext, setContext } from 'svelte';
  import { slide } from 'svelte/transition';

  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import { TREE_ITEM_CONTEXT_KEY } from './TreeItem.constants';
  import TreeItemDisplay from './TreeItemDisplay.svelte';
  import { readable, writable } from 'svelte/store';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';

  // ----- Props ----

  /** When true, the item is disabled. */
  export let disabled = false;

  /** The text for the item. Not used when either the item or label slots are filled. */
  export let text: string | undefined = undefined;

  /** The value uniquely identifying this item within the tree. */
  export let value: string;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- Animation ----- //

  const slidNoOp = (node: Element, params?: SlideParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  $: slideMotion = !$prefersReducedMotion ? slide : slidNoOp;

  // ----- Get Context ----- //

  const {
    disabled: treeDisabled,
    expandedValues,
    selectedValue
  } = getContext<TreeContext>(TREE_CONTEXT_KEY);

  const { depth, disabled: parentDisabled } = getContext<TreeItemContext>(
    TREE_ITEM_CONTEXT_KEY
  ) || {
    depth: readable(0),
    disabled: readable(false)
  };

  // ----- State ----- //

  let treeItemRef: HTMLDivElement;

  $: hasChildren = $$slots.default;
  $: expanded = $expandedValues.includes(value);
  $: selected = $selectedValue === value;
  $: _disabled = disabled || $parentDisabled || $treeDisabled;

  const depthStore = writable<number>($depth);
  const disabledStore = writable<boolean>(_disabled);

  $: {
    depthStore.set($depth + 1);
  }

  $: {
    disabledStore.set(_disabled);
  }

  // ----- Expand/Collapse ----- //

  const collapseItem = (index?: number) => {
    if (!_disabled) {
      index = index ?? $expandedValues.findIndex((expandedValue) => expandedValue === value);
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

  export const collapse = () => collapseItem();

  const expandItem = (index?: number) => {
    if (!_disabled) {
      index = index ?? $expandedValues.findIndex((expandedValue) => expandedValue === value);
      if (index === -1) {
        expandedValues.set([...$expandedValues, value]);
        return true;
      }
    }

    return false;
  };

  export const expand = () => expandItem();

  export const toggleExpanded = () => {
    if (!_disabled) {
      const index = $expandedValues.findIndex((expandedValue) => expandedValue === value);
      return index !== -1 ? collapseItem(index) : expandItem(index);
    }

    return false;
  };

  // ----- Focus ----- //

  const blurItem = (treeItemElement: Element) => {
    if (!_disabled) {
      const item = treeItemElement?.querySelector<HTMLElement>('.item');
      item?.blur();
    }
  };

  export const blur = () => {
    blurItem(treeItemRef);
  };

  const focusItem = (treeItemElement: Element, options?: FocusOptions) => {
    if (!_disabled) {
      const item = treeItemElement?.querySelector<HTMLElement>('.item');
      item?.focus(options);
    }
  };

  export const focus = (options?: FocusOptions) => {
    focusItem(treeItemRef);
    treeItemRef?.focus(options);
  };

  // ----- Click ----- //

  const clickItem = (treeItemElement: Element) => {
    if (!_disabled) {
      const item = treeItemElement?.querySelector<HTMLElement>('.item');
      item?.click();
    }
  };

  export const click = () => {
    clickItem(treeItemRef);
  };

  // ----- Selection ----- //

  const selectItemByValue = (value: string) => {
    if (!_disabled) {
      selectedValue.set(value);
    }
  };

  export const select = () => {
    if (!_disabled) {
      selectItemByValue(value);
    }
  };

  export const selectParent = () => {
    if (!_disabled) {
      let candidate = treeItemRef.parentElement?.closest<Element>('[role="treeitem"][data-value]');
      let candidateValue = candidate?.getAttribute('data-value');

      if (candidateValue && candidate) {
        selectItemByValue(candidateValue);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  export const selectPrevious = () => {
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
        selectItemByValue(candidateValue);
        focusItem(candidate);
        return true;
      }
    }

    return false;
  };

  export const selectNext = () => {
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
        selectItemByValue(candidateValue);
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
      select();
    }
  };

  const onKeydown: KeyboardEventHandler<Element> = (event) => {
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
              if (selectNext()) {
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
          } else if (selectParent()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          /*
          Moves focus to the previous item that is focusable without opening or closing a item.
          */
          if (selectPrevious()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowDown':
          /*
          Moves focus to the next item that is focusable without opening or closing a item.
          */
          if (selectNext()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
      }
    }
  };

  // ----- Set Context ----- //

  setContext<TreeItemContext>(TREE_ITEM_CONTEXT_KEY, {
    depth: depthStore,
    disabled: disabledStore
  });
</script>

<!--
@component
A item in a Tree displaying the item and children.
  -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
  aria-selected={selected ? true : undefined}
  aria-expanded={expanded}
  bind:this={treeItemRef}
  class={`sterling-tree-item ${variant}`}
  class:disabled={_disabled}
  class:item-disabled={disabled}
  class:parent-disabled={$parentDisabled}
  class:tree-disabled={$treeDisabled}
  data-value={value}
  role="treeitem"
  on:blur
  on:click
  on:dblclick
  on:dragend
  on:dragenter
  on:dragleave
  on:dragover
  on:dragstart
  on:drop
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
  on:wheel|passive
  {...$$restProps}
>
  <div
    aria-selected={selected ? true : undefined}
    class="item"
    class:selected
    role="treeitem"
    tabindex={selected ? 0 : -1}
    on:click={onClick}
    on:keydown={onKeydown}
  >
    <slot
      name="item"
      {depth}
      disabled={_disabled}
      {expanded}
      {hasChildren}
      {selected}
      {value}
      {variant}
    >
      <TreeItemDisplay
        depth={$depth}
        disabled={_disabled && !$treeDisabled}
        {expanded}
        {hasChildren}
        {selected}
        {value}
        {variant}
      >
        <svelte:fragment
          let:depth
          let:disabled
          let:expanded
          let:hasChildren
          let:selected
          let:value
          let:variant
        >
          <slot
            name="label"
            {depth}
            {disabled}
            {expanded}
            {hasChildren}
            {selected}
            {value}
            {variant}>{text || value}</slot
          >
        </svelte:fragment>
      </TreeItemDisplay>
    </slot>
  </div>
  {#if expanded && hasChildren}
    <div class="children" transition:slideMotion|global={{ duration: 200 }} role="group">
      <slot depth={$depth} disabled={_disabled} {selected} {value} {variant} />
    </div>
  {/if}
</div>
