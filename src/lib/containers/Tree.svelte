<script lang="ts">
  import type { Keyborg } from 'keyborg';

  import { createKeyborg } from 'keyborg';
  import { v4 as uuid } from 'uuid';

  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { treeContextKey, treeNodeContextKey } from './Tree.constants';
  import Label from '$lib/display/Label.svelte';

  const inputId = uuid();

  export let composed = false;
  export let disabled = false;
  export let selectedNodeId: string | undefined = undefined;
  export let expandedNodeIds: string[] = [];

  // ----- Context ----- //

  const selectedNodeIdStore = writable<string | undefined>(selectedNodeId);
  const expandedNodeIdStore = writable<string[]>(expandedNodeIds);

  setContext(treeContextKey, {
    expandedNodeIds: expandedNodeIdStore,
    selectedNodeId: selectedNodeIdStore
  });
  setContext(treeNodeContextKey, { parentNodeId: undefined, depth: 0 });

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseExpandCollapse = (expandedNodeIds: string[]) => {
    dispatch('expandCollapse', { expandedNodeIds });
  };

  const raiseSelect = (selectedNodeId: string | undefined) => {
    dispatch('select', { selectedNodeId });
  };

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Reactions ----- //

  $: {
    selectedNodeIdStore.set(selectedNodeId);
  }

  $: {
    selectedNodeId = $selectedNodeIdStore;
    raiseSelect($selectedNodeIdStore);
  }

  $: {
    expandedNodeIdStore.set(expandedNodeIds);
  }

  $: {
    expandedNodeIds = $expandedNodeIdStore;
    raiseExpandCollapse($expandedNodeIdStore);
  }

  // ----- Event Handlers ----- //

  onMount(() => {
    keyborg.subscribe(keyborgHandler);

    return () => {
      keyborg.unsubscribe(keyborgHandler);
    };
  });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  aria-disabled={disabled}
  class="sterling-tree"
  class:disabled
  class:composed
  class:using-keyboard={usingKeyboard}
>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <div class="tree" role="tree">
    <slot />
  </div>
</div>

<style>
  .sterling-tree {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
    box-sizing: border-box;
    color: var(--stsv-Common__color);
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
    border-color: var(--stsv-Common__border-color--hover);
    color: var(--stsv-Common__color--hover);
  }

  .sterling-tree.using-keyboard:focus-within {
    border-color: var(--stsv-Button__border-color--focus);
    color: var(--stsv-Common__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-tree.disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
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

  .sterling-tree > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0.7em;
  }

  .sterling-tree > :global(label):empty {
    margin: 0;
  }

  .tree {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    grid-row: 2 / span 1;
    overflow-x: hidden;
    overflow-y: scroll;
    outline: none;
    position: relative;
  }
</style>
