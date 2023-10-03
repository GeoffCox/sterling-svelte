<script lang="ts">
  import { getContext } from 'svelte';
  import { readable, writable } from 'svelte/store';

  import { LIST_CONTEXT_KEY } from './List.constants';
  import type { ListContext } from './List.types';

  // ----- Props ----- //

  /** When true the item is disabled.  The item is also disabled if the parent list is disabled. */
  export let disabled = false;

  /** The value uniquely identifying this item within the list. */
  export let value: string;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- GetContext ----- //

  const {
    disabled: listDisabled,
    selectedValue,
    horizontal
  } = getContext<ListContext>(LIST_CONTEXT_KEY) || {
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

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-role-supports-aria-props -->
<div
  aria-selected={selected}
  bind:this={itemRef}
  class={`sterling-list-item ${variant}`}
  class:disabled={disabled || $listDisabled}
  class:item-disabled={disabled}
  class:list-disabled={$listDisabled}
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
  <slot {disabled} {horizontal} {selected} {value} {variant}>{value}</slot>
</div>
