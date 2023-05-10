<script lang="ts">
  import { idGenerator } from './idGenerator';

  import Label from './Label.svelte';

  // ----- Props ----- //

  export let colorful = false;
  export let composed = false;
  export let disabled = false;
  export let id: string | undefined = undefined;
  export let value: string = '';

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
  <Label {disabled} for={id}>
    <slot {composed} {disabled} {value} />
  </Label>
{/if}
<div class="sterling-input" class:colorful class:composed class:disabled>
  <input
    bind:this={inputRef}
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
    on:wheel
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

  input {
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    color: var(--stsv-Input__color);
    font: inherit;
    margin: 0;
    outline: none;
    padding: 0.5em;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-input:hover input:not(:disabled) {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  input:focus {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-input.colorful input {
    background-color: var(--stsv-Input--colorful__background-color);
    border-color: var(--stsv-Input--colorful__border-color);
    color: var(--stsv-Input--colorful__color);
  }

  .sterling-input.colorful:hover input:not(:disabled) {
    background-color: var(--stsv-Input--colorful__background-color--hover);
    border-color: var(--stsv-Input--colorful__border-color--hover);
    color: var(--stsv-Input--colorful__color--hover);
  }

  .sterling-input.colorful input:focus {
    background-color: var(--stsv-Input--colorful__background-color--focus);
    border-color: var(--stsv-Input--colorful__border-color--focus);
    color: var(--stsv-Input--colorful__color--focus);
  }

  .sterling-input.composed input,
  .sterling-input.composed:hover input,
  .sterling-input.composed:focus input {
    background: transparent;
    border: none;
    outline: none;
  }

  input::placeholder {
    color: var(--stsv-Display__color--faint);
  }

  .sterling-input.disabled * {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-input::after {
    background: var(--stsv-Disabled__background);
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

  @media (prefers-reduced-motion) {
    .sterling-input::after,
    input {
      transition: none;
    }
  }
</style>
