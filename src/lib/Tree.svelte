<script lang="ts">
  import type { TreeContext } from './Tree.types';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  // ----- Props ----- //

  /** When true, the tree and its descendants are disabled. */
  export let disabled = false;

  /** The value of the currently selected item. */
  export let selectedValue: string | undefined = undefined;

  /** The values of items that are expanded. */
  export let expandedValues: string[] = [];

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let treeRef: HTMLDivElement;

  const disabledStore = writable<boolean>(disabled);
  const expandedValuesStore = writable<string[]>(expandedValues);
  const selectedValueStore = writable<string | undefined>(selectedValue);

  // ----- Methods ----- //

  export const blur = () => {
    treeRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    treeRef?.focus(options);
  };

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseExpandCollapse = (expandedValues: string[]) => {
    dispatch('expandCollapse', { expandedValues });
  };

  const raiseSelect = (selectedValue: string | undefined) => {
    dispatch('select', { selectedValue });
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

  // ----- Set Context ----- //
  setContext<TreeContext>(TREE_CONTEXT_KEY, {
    disabled: disabledStore,
    expandedValues: expandedValuesStore,
    selectedValue: selectedValueStore
  });
</script>

<div
  bind:this={treeRef}
  aria-disabled={disabled}
  class={`sterling-tree ${variant}`}
  class:disabled
  class:using-keyboard={$usingKeyboard}
  role="tree"
  tabindex="0"
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
  <div class="container">
    <slot {disabled} {expandedValues} {selectedValue} {variant} />
  </div>
</div>
