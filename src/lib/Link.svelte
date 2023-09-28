<script lang="ts">
  export let href: string;
  export let disabled: boolean = false;

  // ----- Props ----- //

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let linkRef: HTMLAnchorElement;

  // ----- Methods ----- //

  export const blur = () => {
    linkRef?.blur();
  };

  export const click = () => {
    linkRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    linkRef?.focus();
  };
</script>

<a
  bind:this={linkRef}
  class={`sterling-link ${variant}`}
  class:disabled
  {href}
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
  {...$$restProps}><slot {disabled} {href} {variant} /></a
>
