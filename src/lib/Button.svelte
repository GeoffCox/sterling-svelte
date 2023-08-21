<script lang="ts">
  // ----- Props ----- //

  export let disabled: boolean = false;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let buttonRef: HTMLButtonElement;

  // ----- Methods ----- //

  export const click = () => {
    buttonRef?.click();
  };

  export const blur = () => {
    buttonRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    buttonRef?.focus(options);
  };
</script>

<!--
	@component
	A styled HTML button element.
-->
<button
  bind:this={buttonRef}
  class={`sterling-button ${variant}`}
  {disabled}
  type="button"
  on:blur
  on:click
  on:drag
  on:dragend
  on:dragenter
  on:dragleave
  on:dragover
  on:dragstart
  on:drop
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
  on:wheel|passive
  {...$$restProps}
>
  <slot {disabled} {variant} />
</button>
