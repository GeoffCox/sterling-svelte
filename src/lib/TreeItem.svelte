<svelte:options runes={true} />

<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import type { SlideParams, TransitionConfig } from 'svelte/transition';
  import { slide } from 'svelte/transition';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';
  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import type { TreeContext } from './Tree.types';
  import TreeChevron from './TreeChevron.svelte';
  import { TREE_ITEM_CONTEXT_KEY } from './TreeItem.constants';
  import type { TreeItemContext, TreeItemProps } from './TreeItem.types';

  let {
    children,
    class: _class,
    disabled = false,
    icon,
    label,
    style,
    value,
    ...rest
  }: TreeItemProps = $props();

  const slideNoOp = (node: Element, params?: SlideParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  let slideMotion = $derived(!$prefersReducedMotion ? slide : slideNoOp);

  const treeContext = getContext<TreeContext>(TREE_CONTEXT_KEY) || {
    disabled: false,
    expandedValues: [],
    selectedValue: null
  };

  const treeItemContext = getContext<TreeItemContext>(TREE_ITEM_CONTEXT_KEY) || {
    depth: 0,
    disabled: false
  };

  let _disabled = $derived(disabled || treeItemContext.disabled || treeContext.disabled);

  // Using $derived would be preferred, but this helps avoid
  // updates to every tree item when expandedValues changes.
  let expanded = $state(treeContext.expandedValues?.includes(value));
  $effect(() => {
    let expandedCandidate = treeContext.expandedValues?.includes(value);
    if (expandedCandidate !== expanded) {
      expanded = expandedCandidate;
    }
  });

  // Using $derived would be preferred, but this helps avoid
  // updates to every list item when selectedValue changes.
  let selected = $state(treeContext.selectedValue === value);
  $effect(() => {
    if (treeContext.selectedValue === value && !selected) {
      selected = true;
    } else if (treeContext.selectedValue !== value && selected) {
      selected = false;
    }
  });

  let treeItemRef: HTMLDivElement;
  let itemRef: HTMLDivElement;

  let treeItemChildContext: TreeItemContext = {
    get disabled() {
      return _disabled;
    },
    get depth() {
      return treeItemContext.depth ? treeItemContext.depth + 1 : 1;
    }
  };

  setContext<TreeItemContext>(TREE_ITEM_CONTEXT_KEY, treeItemChildContext);

  const collapseItem = (index?: number) => {
    if (!_disabled) {
      index =
        index ?? treeContext.expandedValues.findIndex((expandedValue) => expandedValue === value);
      if (index !== -1) {
        treeContext.expandedValues = [
          ...treeContext.expandedValues.slice(0, index),
          ...treeContext.expandedValues.slice(index + 1)
        ];
        return true;
      }
    }

    return false;
  };

  export const collapse = () => collapseItem();

  const expandItem = (index?: number) => {
    if (!_disabled) {
      index =
        index ?? treeContext.expandedValues.findIndex((expandedValue) => expandedValue === value);
      if (index === -1) {
        treeContext.expandedValues = [...treeContext.expandedValues, value];
        return true;
      }
    }

    return false;
  };

  export const expand = () => expandItem();

  export const toggleExpanded = () => {
    if (!_disabled && children) {
      const index = treeContext.expandedValues.findIndex(
        (expandedValue) => expandedValue === value
      );
      return index !== -1 ? collapseItem(index) : expandItem(index);
    }

    return false;
  };

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
      const item = treeItemElement as HTMLElement;
      item?.focus(options);
    }
  };

  export const focus = (options?: FocusOptions) => {
    focusItem(treeItemRef);
    treeItemRef?.focus(options);
  };

  const clickItem = (treeItemElement: Element) => {
    if (!_disabled) {
      const item = treeItemElement as HTMLElement;
      item?.click();
    }
  };

  export const click = () => {
    clickItem(treeItemRef);
  };

  const selectItemByValue = (value: string) => {
    if (!_disabled) {
      treeContext.selectedValue = value;
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

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const eventTarget = event.target as Node;
    if (!_disabled && itemRef.contains(eventTarget)) {
      toggleExpanded();
      select();
      return;
    }

    rest.onclick?.(event);
  };

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          if (toggleExpanded()) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          break;
        case 'ArrowRight':
          /*
          When focus is on a closed item, opens the item; focus does not move.
          When focus is on an open item, moves focus to the first child item.
          When focus is on an end item (a tree item with no children), does nothing.
          */
          if (children) {
            if (expanded) {
              if (selectNext()) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }
            } else if (expandItem()) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
          }
          break;
        case 'ArrowLeft':
          /*
          When focus is on an open item, closes the item.
          When focus is on a child item that is also either an end item or a closed item, moves focus to its parent item.
          When focus is on a closed `tree`, does nothing.
          */
          if (expanded && children) {
            if (collapseItem()) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
          } else if (selectParent()) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          break;
        case 'ArrowUp':
          /*
          Moves focus to the previous item that is focusable without opening or closing a item.
          */
          if (selectPrevious()) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          break;
        case 'ArrowDown':
          /*
          Moves focus to the next item that is focusable without opening or closing a item.
          */
          if (selectNext()) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          break;
      }
    }

    rest.onkeydown?.(event);
  };
</script>

<div
  bind:this={treeItemRef}
  aria-selected={selected ? true : undefined}
  aria-expanded={expanded}
  class={['sterling-tree-item', _class]}
  class:disabled={_disabled}
  class:expanded
  class:item-disabled={disabled}
  class:leaf={!children}
  class:parent-disabled={treeItemContext.disabled}
  class:selected
  class:tree-disabled={treeContext.disabled}
  data-value={value}
  role="treeitem"
  tabindex={selected ? 0 : -1}
  {...rest}
  onclick={onClick}
  onkeydown={onKeydown}
  style={`--sterling-tree-item-depth: ${treeItemContext.depth}; ${style}`}
>
  <!-- TODO: In RTL consider position of icon and label get reversed -->
  <div bind:this={itemRef} class="item" class:selected>
    {#if icon}
      {@render icon()}
    {:else}
      <TreeChevron {expanded} hasChildren={!!children} />
    {/if}
    {#if label}
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    {:else}
      {value}
    {/if}
  </div>
  {#if expanded && children}
    <div class="children" transition:slideMotion|global={{ duration: 200 }} role="group">
      {@render children?.()}
    </div>
  {/if}
</div>
