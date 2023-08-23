<script lang="ts">
  import { getContext } from 'svelte';
  import { readable, writable } from 'svelte/store';

  import { LIST_CONTEXT_KEY } from './List.constants';
  import type { ListContext } from './List.types';

  /** When true the item is disabled.  The item may also be disabled if the parent List is disabled. */
  export let disabled = false;

  /** The value uniquely identifying this item within the list. */
  export let value: string;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- GetContext ----- //

  const {
    variant: listVariant,
    disabled: listDisabled,
    selectedValue,
    horizontal
  } = getContext<ListContext>(LIST_CONTEXT_KEY) || {
    disabled: readable(false),
    selectedValue: writable(undefined),
    horizontal: readable(false),
    variant: readable('')
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

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  aria-selected={selected}
  bind:this={itemRef}
  class={`sterling-list-item ${$listVariant} ${variant}`}
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
  on:wheel|passive
  {...$$restProps}
>
  <slot {disabled} {horizontal} {selected} {value} variant={`${listVariant} ${variant}`}
    >{value}</slot
  >
</div>
