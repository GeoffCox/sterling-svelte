<script lang="ts">
  import type { Keyborg } from 'keyborg';

  import { createKeyborg } from 'keyborg';
  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';
  import { treeContextKey } from './Tree.constants';

  const inputId = uuid();

  export let composed = false;
  export let disabled = false;
  export let selectedItemId: string | undefined = undefined;
  export let expandedItemIds: string[] = [];

  // ----- Context ----- //

  const selectedItemIdStore = writable<string | undefined>(selectedItemId);
  const expandedItemIdStore = writable<string[]>(expandedItemIds);
  const disabledStore = writable<boolean>(disabled);

  setContext(treeContextKey, {
    expandedItemIds: expandedItemIdStore,
    selectedItemId: selectedItemIdStore,
    disabled: disabledStore
  });

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseExpandCollapse = (expandedItemIds: string[]) => {
    dispatch('expandCollapse', { expandedItemIds });
  };

  const raiseSelect = (selectedItemId: string | undefined) => {
    dispatch('select', { selectedItemId });
  };

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Reactions ----- //

  $: {
    selectedItemIdStore.set(selectedItemId);
  }

  $: {
    selectedItemId = $selectedItemIdStore;
    raiseSelect($selectedItemIdStore);
  }

  $: {
    expandedItemIdStore.set(expandedItemIds);
  }

  $: {
    expandedItemIds = $expandedItemIdStore;
    raiseExpandCollapse($expandedItemIdStore);
  }

  $: {
    disabledStore.set(disabled);
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
