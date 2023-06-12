<script lang="ts">
  import type { ButtonShape, ButtonVariant } from './Button.types';

  // ----- Props ----- //

  export let disabled: boolean = false;
  export let variant: ButtonVariant = 'regular';
  export let shape: ButtonShape = 'rounded';
  export let colorful: boolean = false;

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
  class="sterling-button"
  class:colorful
  class:square={shape === 'square'}
  class:circular={shape === 'circular'}
  class:outline={variant === 'outline'}
  class:ghost={variant === 'ghost'}
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
  on:wheel
  {...$$restProps}
>
  <slot {shape} {variant} />
</button>

<style>
  button {
    align-content: center;
    align-items: center;
    background-color: var(--stsv-button__background-color);
    border-color: var(--stsv-button__border-color);
    border-radius: var(--stsv-button__border-radius);
    border-style: var(--stsv-button__border-style);
    border-width: var(--stsv-button__border-width);
    box-sizing: border-box;
    color: var(--stsv-button__color);
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    font: inherit;
    justify-content: center;
    justify-items: center;
    column-gap: 0.25em;
    overflow: hidden;
    padding: 0.5em 1em;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
    user-select: none;
  }

  button.vertical {
    flex-direction: column;
    row-gap: 0.15em;
  }

  button.circular {
    border-radius: 10000px;
    padding: 0.5em;
  }

  button.square {
    border-radius: 0;
  }

  button:hover {
    background-color: var(--stsv-button__background-color--hover);
    border-color: var(--stsv-button__border-color--hover);
    color: var(--stsv-button__color--hover);
  }

  button:active {
    background-color: var(--stsv-button__background-color--active);
    border-color: var(--stsv-button__border-color--active);
    color: var(--stsv-button__color--active);
  }

  button:focus-visible {
    border-color: var(--stsv-button__border-color--focus);
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  button.colorful {
    background-color: var(--stsv-button--colorful__background-color);
    border-color: var(--stsv-button--colorful__border-color);
    color: var(--stsv-button--colorful__color);
  }
  button.colorful:hover {
    background-color: var(--stsv-button--colorful__background-color--hover);
    border-color: var(--stsv-button--colorful__border-color--hover);
    color: var(--stsv-button--colorful__color--hover);
  }

  button.colorful:active {
    background-color: var(--stsv-button--colorful__background-color--active);
    border-color: var(--stsv-button--colorful__border-color--active);
    color: var(--stsv-button--colorful__color--active);
  }

  button.outline {
    background-color: transparent;
  }

  button.outline:hover {
    background-color: var(--stsv-button__background-color--hover);
  }

  button.outline:active {
    background-color: var(--stsv-button__background-color--active);
  }

  button.outline.colorful {
    border-color: var(--stsv-button--colorful__border-color);
    color: var(--stsv-button--colorful__border-color);
  }
  button.outline.colorful:hover {
    background-color: var(--stsv-button--colorful__background-color--hover);
    border-color: var(--stsv-button--colorful__border-color--hover);
    color: var(--stsv-button--colorful__color--hover);
  }

  button.outline.colorful:active {
    background-color: var(--stsv-button--colorful__background-color--active);
    border-color: var(--stsv-button--colorful__border-color--active);
    color: var(--stsv-button--colorful__color--active);
  }

  button.ghost {
    background-color: transparent;
    border-color: transparent;
  }

  button.ghost:hover {
    background-color: var(--stsv-button__background-color--hover);
    border-color: transparent;
  }

  button.ghost:active {
    background-color: var(--stsv-button__background-color--active);
    border-color: transparent;
  }

  button.ghost:focus-visible {
    border-color: var(--stsv-button__border-color--focus);
  }

  button.ghost.colorful {
    color: var(--stsv-button--colorful__border-color);
  }

  button.ghost.colorful:hover {
    background-color: var(--stsv-button--colorful__background-color--hover);
    color: var(--stsv-button--colorful__color--hover);
  }

  button.ghost.colorful:active {
    background-color: var(--stsv-button--colorful__background-color--active);
    color: var(--stsv-button--colorful__color--active);
  }

  button:disabled {
    cursor: not-allowed;
    position: relative;
  }

  button:disabled::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      var(--stsv-common__background-color1--disabled),
      var(--stsv-common__background-color1--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 6px
    );
    pointer-events: none;
  }

  @media (prefers-reduced-motion) {
    button {
      transition: none;
    }
  }
</style>
