<script lang="ts">
  import type { InputVariant } from './Input.types';
  import { idGenerator } from './idGenerator';
  import { usingKeyboard } from './stores/usingKeyboard';

  // ----- Props ----- //

  export let disabled = false;
  export let id: string | undefined = undefined;
  export let value: string = '';

  /** When true, applies colorful theme styles. */
  export let colorful = false;

  /** When true, allows the container to handle borders and focus borders.  */
  export let composed = false;

  /** Changes the overall style of the input. */
  export let variant: InputVariant = 'regular';

  // ----- State ----- //

  let inputRef: HTMLInputElement;

  $: {
    if ($$slots.default && id === undefined) {
      id = idGenerator.nextId('Input');
    }
  }

  // ----- Methods ----- //

  export const blur = () => {
    inputRef?.blur();
  };

  export const click = () => {
    inputRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    inputRef?.focus();
  };

  export const select = () => {
    inputRef?.select();
  };

  export const setSelectionRange = (
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  ) => {
    inputRef?.setSelectionRange(start, end, direction);
  };

  export const setRangeText = (
    replacement: string,
    start?: number,
    end?: number,
    selectionMode?: SelectionMode
  ) => {
    if (start && end) {
      inputRef?.setRangeText(replacement, start, end, selectionMode);
    } else {
      inputRef?.setRangeText(replacement);
    }
  };
</script>

{#if $$slots.default}
  <label for={id}>
    <slot {composed} {disabled} {value} />
  </label>
{/if}
<div
  class="sterling-input"
  class:colorful
  class:composed
  class:disabled
  class:regular={variant === 'regular'}
  class:fill={variant === 'fill'}
  class:outline={variant === 'outline'}
  class:underline={variant === 'underline'}
>
  <input
    bind:this={inputRef}
    class:using-keyboard={$usingKeyboard}
    {disabled}
    {id}
    bind:value
    on:beforeinput
    on:blur
    on:click
    on:change
    on:copy
    on:cut
    on:paste
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
    on:input
    on:invalid
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
    on:select
    on:submit
    on:reset
    on:wheel|passive
    {...$$restProps}
  />
</div>

<style>
  .sterling-input {
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .sterling-input input {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-radius: var(--stsv-input__border-radius);
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
    box-sizing: border-box;
    color: var(--stsv-input__color);
    display: block;
    font: inherit;
    margin: 0;
    outline: none;
    padding: 0.5em;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    width: 100%;
  }

  .sterling-input:hover input:not(:disabled) {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  .sterling-input input:focus,
  .sterling-input:hover input:focus {
    background-color: var(--stsv-input__background-color--focus);
    border-color: var(--stsv-input__border-color--focus);
    color: var(--stsv-input__color--focus);
  }

  input:focus-visible {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
    outline: none;
  }

  /* ----- variant: regular ----- */
  /* 
    The regular vartiant is applied here rather than in the default style
    to avoid other variants having to undo styles. 
  */

  .sterling-input.regular input {
    border-top-color: var(--stsv-input__background-color);
    border-right-color: var(--stsv-input__background-color);
    border-left-color: var(--stsv-input__background-color);
  }

  .sterling-input.regular:hover input:not(:disabled) {
    border-top-color: var(--stsv-input__background-color--hover);
    border-right-color: var(--stsv-input__background-color--hover);
    border-left-color: var(--stsv-input__background-color--hover);
  }

  .sterling-input.regular input:focus,
  .sterling-input.regular:hover input:focus {
    border-top-color: var(--stsv-input__background-color--focus);
    border-right-color: var(--stsv-input__background-color--focus);
    border-left-color: var(--stsv-input__background-color--focus);
  }

  /* ----- variant: fill ----- */

  .sterling-input.fill input {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__background-color);
  }

  .sterling-input.fill:hover input:not(:disabled) {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__background-color--hover);
  }

  .sterling-input.fill input:focus,
  .sterling-input.fill:hover input:focus {
    background-color: var(--stsv-input__background-color--focus);
    border-color: var(--stsv-input__background-color--focus);
  }

  /* ----- variant: outline ----- */

  .sterling-input.outline input,
  .sterling-input.outline:hover input:not(:disabled),
  .sterling-input.outline input:focus,
  .sterling-input.outline:hover input:focus {
    background-color: transparent;
  }

  /* ----- variant: underline ----- */

  .sterling-input.underline input,
  .sterling-input.underline:hover input:not(:disabled),
  .sterling-input.underline input:focus,
  .sterling-input.underline:hover input:focus {
    background-color: transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }

  /* ----- colorful ----- */

  .sterling-input.colorful input {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
    color: var(--stsv-input--colorful__color);
  }

  .sterling-input.colorful:hover input:not(:disabled) {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
    color: var(--stsv-input--colorful__color--hover);
  }

  .sterling-input.colorful input:focus,
  .sterling-input.colorful:hover input:focus {
    background-color: var(--stsv-input--colorful__background-color--focus);
    border-color: var(--stsv-input--colorful__border-color--focus);
    color: var(--stsv-input--colorful__color--focus);
  }

  /* ----- colorful, variant: regular ----- */
  /* 
    The regular vartiant is applied here rather than in the default style
    to avoid other variants having to undo styles. 
  */

  .sterling-input.colorful.regular input {
    border-top-color: var(--stsv-input--colorful__background-color);
    border-right-color: var(--stsv-input--colorful__background-color);
    border-left-color: var(--stsv-input--colorful__background-color);
  }

  .sterling-input.colorful.regular:hover input:not(:disabled) {
    border-top-color: var(--stsv-input--colorful__background-color--hover);
    border-right-color: var(--stsv-input--colorful__background-color--hover);
    border-left-color: var(--stsv-input--colorful__background-color--hover);
  }

  .sterling-input.colorful.regular input:focus,
  .sterling-input.colorful.regular:hover input:focus {
    border-top-color: var(--stsv-input--colorful__background-color--focus);
    border-right-color: var(--stsv-input--colorful__background-color--focus);
    border-left-color: var(--stsv-input--colorful__background-color--focus);
  }

  /* ----- colorful, variant: fill ----- */

  .sterling-input.fill.colorful input {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__background-color);
  }

  .sterling-input.fill.colorful:hover input:not(:disabled) {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__background-color--hover);
  }

  .sterling-input.fill.colorful input:focus,
  .sterling-input.fill.colorful:hover input:focus {
    background-color: var(--stsv-input--colorful__background-color--focus);
    border-color: var(--stsv-input--colorful__background-color--focus);
  }

  /* ----- colorful, variant: outline ----- */

  .sterling-input.outline.colorful input,
  .sterling-input.outline.colorful:hover input:not(:disabled),
  .sterling-input.outline.colorful input:focus,
  .sterling-input.outline.colorful:hover input:focus {
    background-color: transparent;
  }

  /* ----- colorful, variant: underline ----- */

  .sterling-input.underline.colorful input,
  .sterling-input.underline.colorful:hover input:not(:disabled),
  .sterling-input.underline.colorful input:focus,
  .sterling-input.underline.colorful:hover input:focus {
    background-color: transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }

  /* ----- composed ----- */

  .sterling-input.composed input,
  .sterling-input.composed:hover input:not(:disabled),
  .sterling-input.composed input:focus,
  .sterling-input.composed:hover input:focus {
    background-color: transparent;
    border-color: transparent;
    outline: none;
  }

  /* ----- placeholder ----- */

  input::placeholder {
    color: var(--stsv-common__color--subtle);
  }

  /* ----- placeholder, colorful ----- */

  .sterling-input.colorful input::placeholder {
    color: var(--stsv-common--colorful__color--subtle);
  }

  /* ----- disabled ----- */

  .sterling-input.disabled * {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-input::after {
    background: repeating-linear-gradient(
      var(--stsv-common--disabled__stripe-angle),
      var(--stsv-common--disabled__stripe-color),
      var(--stsv-common--disabled__stripe-color) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt)
        calc(2 * var(--stsv-common--disabled__stripe-width))
    );
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

  .sterling-input.disabled::after {
    opacity: 1;
  }

  /* ----- label ----- */

  label {
    color: var(--stsv-common__color);
    transition: color 250ms;
    font: inherit;
  }

  /* ----- prefers-reduce-motion ----- */

  @media (prefers-reduced-motion) {
    .sterling-input::after,
    input {
      transition: none;
    }
  }
</style>
