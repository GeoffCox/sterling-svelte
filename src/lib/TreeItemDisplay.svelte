<script lang="ts">
  import { getContext } from 'svelte';
  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import type { TreeContext } from './Tree.types';
  import TreeChevron from './TreeChevron.svelte';
  import { readable } from 'svelte/store';

  // ----- Props ----- //

  /** The depth of the item in the tree for displaying indentation. */
  export let depth = 0;

  /** When true, the item is disabled. */
  export let disabled = false;

  /** When true, the item is expanded and children are visible. */
  export let expanded = false;

  /** When true, the item is has children and can be expanded. */
  export let hasChildren = false;

  /** When true, the item is selected. */
  export let selected = false;

  /** The value uniquely identifying this item within the tree. */
  export let value: string;

  export let variant: string = '';

  // ----- Get Context ----- //

  const { disabled: treeDisabled } = getContext<TreeContext>(TREE_CONTEXT_KEY) || {
    disabled: readable<boolean>(false)
  };

  // ----- State ----- //

  let divRef: HTMLDivElement;

  // ----- Methods ----- //

  export const click = () => {
    divRef?.click();
  };

  export const blur = () => {
    divRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    divRef?.focus(options);
  };
</script>

<div
  bind:this={divRef}
  class={`sterling-tree-item-display ${variant}`}
  class:disabled={disabled && !$treeDisabled}
  class:item-disabled={disabled}
  class:expanded
  class:selected
  style={`--sterling-tree-item-depth: ${depth}`}
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
  <TreeChevron {expanded} {hasChildren} {variant} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant} />
</div>
