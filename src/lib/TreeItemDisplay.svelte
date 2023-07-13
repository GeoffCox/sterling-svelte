<script lang="ts">
  import { getContext } from 'svelte';
  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import type { TreeContext } from './Tree.types';
  import TreeChevron from './TreeChevron.svelte';
  import { readable } from 'svelte/store';

  // ----- Props ----- //

  /** When true, applies colorful theme styles. */
  export let colorful = false;

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
  class="sterling-tree-item-display"
  class:colorful
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
  <TreeChevron {expanded} {hasChildren} />
  <slot {colorful} {depth} {disabled} {expanded} {hasChildren} {selected} {value} />
</div>

<style>
  .sterling-tree-item-display {
    align-content: center;
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    color: var(--stsv-input__color);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.25em;
    margin: 0;
    outline: none;
    padding: 0.5em;
    position: relative;
    padding-left: calc(0.2em + (0.5em * var(--sterling-tree-item-depth)));
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tree-item-display:not(.item-disabled):not(.selected):hover {
    background-color: var(--stsv-button__background-color--hover);
    color: var(--stsv-button__color--hover);
  }

  .sterling-tree-item-display.selected {
    background-color: var(--stsv-button__background-color--active);
    color: var(--stsv-button__color--active);
  }

  .sterling-tree-item-display.colorful:not(.item-disabled):not(.selected):hover {
    background-color: var(--stsv-button--colorful__background-color--hover);
    color: var(--stsv-button--colorful__color--hover);
  }

  .sterling-tree-item-display.colorful.selected {
    background-color: var(--stsv-button--colorful__background-color--active);
    color: var(--stsv-button--colorful__color--active);
  }

  .sterling-tree-item-display.disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-tree-item-display::after {
    background: repeating-linear-gradient(
      var(--stsv-common--disabled__stripe-angle),
      var(--stsv-common--disabled__stripe-color),
      var(--stsv-common--disabled__stripe-color) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt)
        calc(2 * var(--stsv-common--disabled__stripe-width))
    );
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 250ms;
  }

  .sterling-tree-item-display.disabled::after {
    opacity: 1;
  }

  .sterling-tree-item-display.leaf {
    border: none;
    background: currentColor;
    border-radius: 50%;
    height: 0.5em;
    width: 0.5em;
    margin: 0.5;
    transform-origin: 50% 50%;
  }

  @media (prefers-reduced-motion) {
    .sterling-tree-item-display,
    .sterling-tree-item-display::after {
      transition: none;
    }
  }
</style>
