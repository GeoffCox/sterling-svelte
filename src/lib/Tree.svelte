<script lang="ts">
  import type { TreeContext } from './Tree.types';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import { usingKeyboard } from './stores/usingKeyboard';

  // ----- Props ----- //

  /** When true, applies colorful theme styles. */
  export let colorful = false;

  /** When true, allows the container to handle borders and focus borders.  */
  export let composed = false;

  /** When true, the tree and its descendants are disabled */
  export let disabled = false;

  /** The value of the currently selected item. */
  export let selectedValue: string | undefined = undefined;

  /** The values of items that are expanded. */
  export let expandedValues: string[] = [];

  // ----- State ----- //

  let treeRef: HTMLDivElement;

  const colorfulStore = writable<boolean>(colorful);
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
    colorfulStore.set(colorful);
  }

  $: {
    disabledStore.set(disabled);
  }

  // ----- Set Context ----- //
  setContext<TreeContext>(TREE_CONTEXT_KEY, {
    colorful: colorfulStore,
    disabled: disabledStore,
    expandedValues: expandedValuesStore,
    selectedValue: selectedValueStore
  });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  bind:this={treeRef}
  aria-disabled={disabled}
  class="sterling-tree"
  class:colorful
  class:composed
  class:disabled
  class:using-keyboard={$usingKeyboard}
  role="tree"
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
    <slot {colorful} {composed} {disabled} />
  </div>
</div>

<style>
  .sterling-tree {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: var(--stsv-common__border-width);
    box-sizing: border-box;
    color: var(--stsv-common__color);
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-tree:hover {
    border-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  .sterling-tree.using-keyboard:focus-within {
    border-color: var(--stsv-button__border-color--focus);
    color: var(--stsv-input__color--focus);
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  .sterling-tree.composed,
  .sterling-tree.composed:hover,
  .sterling-tree.composed.using-keyboard:focus-visible,
  .sterling-tree.composed.disabled {
    background: none;
    border: none;
    outline: none;
  }

  .sterling-tree.disabled * {
    cursor: not-allowed;
  }

  /* ----- container - a layout panel that grows with the items ----- */

  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
  }

  .container::after {
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
    position: absolute;
    pointer-events: none;
    right: 0;
    top: 0;
    transition: opacity 250ms;
  }

  .sterling-tree.disabled .container::after {
    opacity: 1;
  }

  /* ----- media queries ----- */

  @media (prefers-reduced-motion) {
    .sterling-tree,
    .container::after {
      transition: none;
    }
  }
</style>
