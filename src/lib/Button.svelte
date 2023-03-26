<script lang="ts">
  import type { ButtonShape, ButtonVariant } from './Button.types';

  // ----- Props ----- //

  export let variant: ButtonVariant = 'regular';
  export let shape: ButtonShape = 'rounded';

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
  class:square={shape === 'square'}
  class:circular={shape === 'circular'}
  class:outline={variant === 'outline'}
  class:ghost={variant === 'ghost'}
  type="button"
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
  <slot {shape} {variant} />
</button>

<style>
  button {
    align-content: center;
    align-items: center;
    background-color: var(--stsv-Button__background-color);
    border-color: var(--stsv-Button__border-color);
    border-radius: var(--stsv-Button__border-radius);
    border-style: var(--stsv-Button__border-style);
    border-width: var(--stsv-Button__border-width);
    box-sizing: border-box;
    color: var(--stsv-Button__color);
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
    background-color: var(--stsv-Button__background-color--hover);
    border-color: var(--stsv-Button__border-color--hover);
    color: var(--stsv-Button__color--hover);
  }

  button:active {
    background-color: var(--stsv-Button__background-color--active);
    border-color: var(--stsv-Button__border-color--active);
    color: var(--stsv-Button__color--active);
  }

  button:focus-visible {
    border-color: var(--stsv-Button__border-color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  button:disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv-Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  button.outline {
    background-color: transparent;
  }

  button.outline:hover {
    background-color: var(--stsv-Button__background-color--hover);
  }

  button.outline:active {
    background-color: var(--stsv-Button__background-color--active);
  }

  button.outline:disabled {
    background-color: transparent;
  }

  button.outline:disabled:hover {
    border-color: var(--stsv-Common__border-color--disabled);
  }

  button.ghost {
    background-color: transparent;
    border-color: transparent;
  }

  button.ghost:hover {
    background-color: var(--stsv-Button__background-color--hover);
    border-color: transparent;
  }

  button.ghost:active {
    background-color: var(--stsv-Button__background-color--active);
    border-color: transparent;
  }

  button.ghost:focus-visible {
    border-color: var(--stsv-Button__border-color--focus);
  }

  button.ghost:disabled {
    border-color: transparent;
  }

  button.ghost:disabled:hover {
    background-color: var(--stsv-Common__background-color--disabled);
  }

  @media (prefers-reduced-motion) {
    button {
      transition: none;
    }
  }
</style>
