<script lang="ts">
  import TreeChevron from './TreeChevron.svelte';

  // ----- Props ----- //

  export let depth = 0;
  export let disabled = false;
  export let expanded = false;
  export let hasChildren = false;
  export let value: string;
  export let selected = false;

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
  class="sterling-tree-item"
  class:disabled
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
  on:wheel
  {...$$restProps}
>
  <TreeChevron {expanded} {hasChildren} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} />
</div>

<style>
  .sterling-tree-item {
    align-content: center;
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    color: var(--stsv-Input__color);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.25em;
    margin: 0;
    outline: none;
    padding: 0.5em;
    padding-left: calc(0.2em + (0.5em * var(--sterling-tree-item-depth)));
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tree-item:hover {
    background-color: var(--stsv-Button__background-color--hover);
    color: var(--stsv-Button__color--hover);
  }

  .sterling-tree-item.selected {
    background-color: var(--stsv-Input__background-color--selected);
    color: var(--stsv-Input__color--selected);
  }

  .sterling-tree-item.disabled {
    background-color: var(--stsv-Input__background-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-tree-item.leaf {
    border: none;
    background: currentColor;
    border-radius: 50%;
    height: 0.5em;
    width: 0.5em;
    margin: 0.5;
    transform-origin: 50% 50%;
  }

  @media (prefers-reduced-motion) {
    .sterling-tree-item {
      transition: none;
    }
  }
</style>
