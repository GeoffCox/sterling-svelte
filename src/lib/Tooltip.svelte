<script lang="ts">
  import { onMount } from 'svelte';

  import Callout from './Callout.svelte';
  import type { PopoverPlacement } from './Popover.types';

  // ----- Props ----- //

  // Forwarded to Callout
  export let conditionalRender: boolean = true;
  export let crossAxisOffset = 0;
  export let mainAxisOffset = 0;
  export let open = false;
  export let placement: PopoverPlacement = 'top-start';
  export let portalHost: HTMLElement | undefined = undefined;
  export let variant: string = '';

  /** When true, the tooltip is disabled and will not be shown. */
  export let disabled = false;

  /** The duration of mouse hover before showing the tooltip. */
  export let hoverDelayMilliseconds: number = 1000;

  // ----- State ----- //
  let originRef: HTMLDivElement;

  $: reference = $$slots.default ? (originRef?.previousElementSibling as HTMLElement) : undefined;

  // ----- Show/Hide ----- //

  const show = () => {
    if (!disabled) {
      open = true;
    }
  };

  const hide = () => (open = false);

  const delayShow = () => {
    hoverDelayMilliseconds === 0
      ? show()
      : setTimeout(() => {
          show();
        }, hoverDelayMilliseconds);
  };

  $: {
    if (disabled) {
      hide();
    }
  }

  // ----- Event Listeners ----- //

  let cleanupAutoShowUpdate = () => {};

  const autoShowUpdate = () => {
    cleanupAutoShowUpdate();
    cleanupAutoShowUpdate = () => {};

    const element = reference;
    open = false;

    if (element) {
      element.addEventListener('mouseenter', delayShow);
      element.addEventListener('mouseleave', hide);
      cleanupAutoShowUpdate = () => {
        element.removeEventListener('mouseenter', delayShow);
        element.removeEventListener('mouseleave', hide);
      };
    }
  };

  $: reference, autoShowUpdate();

  // ----- EventHandlers ----- //

  onMount(() => {
    autoShowUpdate();
  });
</script>

<slot {disabled} {hoverDelayMilliseconds} {open} {variant} />
<div class="sterling-tooltip-origin" bind:this={originRef} />
<Callout
  {conditionalRender}
  {crossAxisOffset}
  {mainAxisOffset}
  {open}
  {placement}
  {portalHost}
  {reference}
  {variant}
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
  <slot name="tip" {placement} {variant} />
</Callout>
