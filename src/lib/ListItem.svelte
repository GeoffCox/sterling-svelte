<script lang="ts">
  import { getContext } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import { listContextKey } from './List.constants';
  import type { ListContext } from './List.types';

  export let disabled = false;
  export let value: string;

  // ----- GetContext ----- //

  const {
    disabled: listDisabled,
    selectedValue,
    horizontal
  } = getContext<ListContext>(listContextKey);

  // ----- State ----- //
  let itemRef: HTMLDivElement;

  $: _disabled = disabled || $listDisabled;
  $: selected = $selectedValue === value;
</script>

<div
  aria-selected={selected}
  bind:this={itemRef}
  class="sterling-list-item"
  class:disabled={_disabled}
  class:selected
  data-value={value}
  role="listitem"
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
  <slot {disabled} {horizontal} {selected} {value}>{value}</slot>
</div>

<style>
  .sterling-list-item {
    background-color: transparent;
    box-sizing: border-box;
    color: var(--stsv-Input__color);
    cursor: pointer;
    margin: 0;
    padding: 0.5em;
    outline: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-list-item:not(.disabled):hover {
    background-color: var(--stsv-Button__background-color--hover);
    color: var(--stsv-Button__color--hover);
  }

  .sterling-list-item.selected {
    background-color: var(--stsv-Input__background-color--selected);
    color: var(--stsv-Input__color--selected);
  }

  .sterling-list-item.disabled {
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion) {
    .sterling-list-item {
      transition: none;
    }
  }
</style>
