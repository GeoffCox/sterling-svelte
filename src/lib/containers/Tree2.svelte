<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Label from '$lib/display/Label.svelte';
  import type { TreeSelectMode } from './Tree.types';

  const inputId = uuid();

  export let disabled = false;
  export let composed = false;

  // disable selection
  // default selected
  // default expanded
  // multiSelect ?

  // selected
  // expanded

  const expandedNodeIds = writable<string[]>([]);
  const selectMode = writable<TreeSelectMode>('single');
  const selectedNodeIds = writable<string[]>([]);

  setContext('sterling-tree', { expandedNodeIds, selectMode, selectedNodeIds });
  setContext('sterling-tree-item', { parentNodeId: undefined, level: 1 });
</script>

<div class="sterling-tree" class:disabled class:composed>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  {#if $$slots.default}
    <div class="children">
      <slot />
    </div>
  {/if}
</div>

<style>
  .sterling-tree {
    background-color: var(--Common__background-color);
    border-color: var(--Common__border-color);
    border-radius: var(--Common__border-radius);
    border-style: var(--Common__border-style);
    border-width: var(--Common__border-width);
    box-sizing: border-box;
    color: var(--Common__color);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-tree:hover {
    border-color: var(--Common__border-color--hover);
    color: var(--Common__color--hover);
  }

  .sterling-tree:focus-within {
    border-color: var(--Common__border-color--focus);
    color: var(--Common__color--focus);
    outline-color: var(--Common__outline-color);
    outline-offset: var(--Common__outline-offset);
    outline-style: var(--Common__outline-style);
    outline-width: var(--Common__outline-width);
  }

  .sterling-tree.disabled {
    background-color: var(--Common__background-color--disabled);
    border-color: var(---Common__border-color--disabled);
    color: var(--Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-tree.composed,
  .sterling-tree:hover.composed,
  .sterling-tree:focus-visible.composed,
  .sterling-tree.disabled.composed {
    background: none;
    border: none;
    outline: none;
  }
</style>
