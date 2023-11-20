<script lang="ts">
  import type { ClickOutsideEvent } from './@types/clickOutside';

  import { createEventDispatcher } from 'svelte';

  import Popover from './Popover.svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';
  import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';

  const popupId = idGenerator.nextId('Dropdown-popup');

  // ----- Props ----- //

  /** Disables the dropdown. */
  export let disabled = false;

  /** When true, the dropdown is open. */
  export let open = false;

  /** When the user clicks away from the dropdown, it remains open. */
  export let stayOpenOnClickAway = false;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let dropdownRef: HTMLDivElement;
  let popupContentRef: HTMLDivElement;

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseOpen = (open?: boolean) => {
    dispatch('open', { open });
  };

  // ----- Reactions ----- //

  $: {
    raiseOpen(open);
  }

  // ----- Methods ----- //

  export const click = () => {
    dropdownRef?.click();
  };

  export const blur = () => {
    dropdownRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    dropdownRef?.focus(options);
  };

  // ----- Event Handlers ----- //

  const onClick = (event: MouseEvent) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case ' ':
          open = !open;
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'Escape':
          open = false;
          event.preventDefault();
          event.stopPropagation();
          return false;
      }
    }
  };

  const onClickOutside = (event: ClickOutsideEvent) => {
    if (!stayOpenOnClickAway) {
      open = false;
    }
  };

  // ----- Animation ----- //

  const slideNoOp = (node: Element, params?: SlideParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  $: slideMotion = !$prefersReducedMotion ? slide : slideNoOp;
</script>

<div
  bind:this={dropdownRef}
  aria-controls={popupId}
  aria-haspopup={true}
  aria-expanded={open}
  class={`sterling-dropdown ${variant}`}
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside={{ ignoreOthers: [popupContentRef] }}
  on:blur
  on:click
  on:click={onClick}
  on:copy
  on:cut
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
  on:keydown={onKeydown}
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:wheel|passive
  on:paste
  on:click_outside={onClickOutside}
  {...$$restProps}
>
  {#if $$slots.value}
    <div class="value">
      <slot name="value" {disabled} {open} {variant} />
    </div>
  {/if}
  <slot name="button" {disabled} {open} {variant}>
    <div class="button">
      <slot name="icon" {disabled} {open} {variant}>
        <div class="chevron" />
      </slot>
    </div>
  </slot>

  <Popover reference={dropdownRef} open={!disabled && open}>
    <div
      class={`sterling-dropdown-popup-content ${variant}`}
      transition:slideMotion|global={{ duration: 200 }}
      bind:this={popupContentRef}
    >
      <slot {disabled} {open} {variant} />
    </div>
  </Popover>
</div>
