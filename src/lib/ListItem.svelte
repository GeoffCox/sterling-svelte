<script lang="ts">
  import { getContext } from 'svelte';

  import { LIST_CONTEXT_KEY } from './List.constants';
  import type { ListContext } from './List.types';
  import { readable, writable } from 'svelte/store';

  /** Item is disabled when this is true or the containing list is disabled. **/
  export let disabled = false;

  /** Should be unique within the list **/
  export let value: string;

  // ----- GetContext ----- //

  const {
    colorful,
    disabled: listDisabled,
    selectedValue,
    horizontal
  } = getContext<ListContext>(LIST_CONTEXT_KEY) || {
    colorful: readable(false),
    disabled: readable(false),
    selectedValue: writable(undefined),
    horizontal: readable(false)
  };

  // ----- State ----- //
  let itemRef: HTMLDivElement;
  $: selected = $selectedValue === value;

  // ----- Methods ----- //

  export const click = () => {
    itemRef?.click();
  };

  export const blur = () => {
    itemRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    itemRef?.focus(options);
  };
</script>

<div
  aria-selected={selected}
  bind:this={itemRef}
  class="sterling-list-item"
  class:colorful={$colorful}
  class:disabled={disabled || $listDisabled}
  class:item-disabled={disabled && !$listDisabled}
  class:selected
  data-value={value}
  role="listitem"
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
  <slot {disabled} {horizontal} {selected} {value}>{value}</slot>
</div>

<style>
  .sterling-list-item {
    background-color: transparent;
    box-sizing: border-box;
    color: var(--stsv-Common__color);
    cursor: pointer;
    margin: 0;
    padding: 0.5em;
    position: relative;
    outline: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-list-item:not(.disabled):not(.selected):hover {
    background-color: var(--stsv-Button__background-color--hover);
    color: var(--stsv-Button__color--hover);
  }

  .sterling-list-item.selected {
    background-color: var(--stsv-Button__background-color--active);
    color: var(--stsv-Button__color--active);
  }

  .sterling-list-item.colorful:not(.disabled):not(.selected):hover {
    background-color: var(--stsv-Button--colorful__background-color--hover);
    color: var(--stsv-Button--colorful__color--hover);
  }

  .sterling-list-item.colorful.selected {
    background-color: var(--stsv-Button--colorful__background-color--active);
    color: var(--stsv-Button--colorful__color--active);
  }

  .sterling-list-item.disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-list-item::after {
    background: var(--stsv-Disabled__background);
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }

  .sterling-list-item.item-disabled::after {
    opacity: 1;
  }

  @media (prefers-reduced-motion) {
    .sterling-list-item,
    .sterling-list-item::after {
      transition: none;
    }
  }
</style>
