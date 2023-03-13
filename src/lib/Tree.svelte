<script lang="ts">
  import type { Keyborg } from 'keyborg';

  import { createKeyborg } from 'keyborg';
  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { treeContextKey } from './Tree.constants';

  export let composed = false;
  export let disabled = false;
  export let selectedValue: string | undefined = undefined;
  export let expandedValues: string[] = [];

  // ----- Context ----- //

  const selectedValueStore = writable<string | undefined>(selectedValue);
  const expandedValuesStore = writable<string[]>(expandedValues);
  const disabledStore = writable<boolean>(disabled);

  setContext(treeContextKey, {
    expandedValues: expandedValuesStore,
    selectedValue: selectedValueStore,
    disabled: disabledStore
  });

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseExpandCollapse = (expandedValues: string[]) => {
    dispatch('expandCollapse', { expandedValues });
  };

  const raiseSelect = (selectedValue: string | undefined) => {
    dispatch('select', { selectedValue });
  };

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Reactions ----- //

  $: {
    selectedValueStore.set(selectedValue);
  }

  $: {
    selectedValue = $selectedValueStore;
    raiseSelect($selectedValueStore);
  }

  $: {
    expandedValuesStore.set(expandedValues);
  }

  $: {
    expandedValues = $expandedValuesStore;
    raiseExpandCollapse($expandedValuesStore);
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
  class:composed
  class:disabled
  class:using-keyboard={usingKeyboard}
  role="tree"
>
  <slot />
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
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0;
    position: relative;
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
  .sterling-tree.composed:hover,
  .sterling-tree.composed.using-keyboard:focus-visible,
  .sterling-tree.composed.disabled {
    border: none;
    outline: none;
  }
</style>
