<script lang="ts">
  import TreeItemChevron from '../../../../src/lib/containers/TreeNodeChevron.svelte';

  export let disabled = false;
  export let expanded = false;
  export let hasChildren = false;
  export let selected = false;
  export let level = 0;
</script>

<div
  class="sterling-tree-item"
  class:disabled
  class:expanded
  class:selected
  style={`--level: ${level + 1}`}
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
  <TreeItemChevron {expanded} {hasChildren} />
  <slot />
</div>

<style>
  .sterling-tree-item {
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
    padding-left: calc(0.35em * var(--level, 1));
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tree-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-tree-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .sterling-tree-item.disabled {
    color: var(--Input__color--disabled);
  }

  .leaf {
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
