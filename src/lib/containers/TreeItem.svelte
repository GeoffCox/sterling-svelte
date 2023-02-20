<script lang="ts">
  import TreeChevron from './TreeChevron.svelte';

  export let depth = 0;
  export let disabled = false;
  export let expanded = false;
  export let hasChildren = false;
  export let nodeId: string;
  export let selected = false;
</script>

<div
  class="sterling-tree-node-item"
  class:disabled
  class:expanded
  class:selected
  style={`--sterling-tree-node-depth: ${depth}`}
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
  <TreeChevron {expanded} {hasChildren} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {nodeId} />
</div>

<style>
  .sterling-tree-node-item {
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
    padding-left: calc(0.5em * var(--sterling-tree-node-depth));
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tree-node-item:hover {
    background-color: var(--stsv-Button__background-color--hover);
    color: var(--stsv-Button__color--hover);
  }

  .sterling-tree-node-item.selected {
    background-color: var(--stsv-Input__background-color--selected);
    color: var(--stsv-Input__color--selected);
  }

  .sterling-tree-node-item.disabled {
    color: var(--stsv-Common__color--disabled);
  }

  .sterling-tree-node-item.leaf {
    border: none;
    background: currentColor;
    border-radius: 50%;
    height: 0.5em;
    width: 0.5em;
    margin: 0.5;
    transform-origin: 50% 50%;
  }

  @media (prefers-reduced-motion) {
    .sterling-tree-node-item {
      transition: none;
    }
  }
</style>
