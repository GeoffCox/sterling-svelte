<script lang="ts">
  import TreeNodeChevron from './TreeNodeChevron.svelte';

  export let disabled = false;
  export let expanded = false;
  export let hasChildren = false;
  export let selected = false;
  export let level = 0;
</script>

<div
  class="sterling-tree-node-item"
  class:disabled
  class:expanded
  class:selected
  style={`--level: ${level}`}
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
  <TreeNodeChevron {expanded} {hasChildren} />
  <slot />
</div>

<style>
  .sterling-tree-node-item {
    align-content: center;
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    color: var(--Input__color);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.25em;
    margin: 0;
    outline: none;
    padding: 0.5em;
    padding-left: calc(0.35em * var(--level));
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tree-node-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-tree-node-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .sterling-tree-node-item.disabled {
    color: var(--Input__color--disabled);
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
