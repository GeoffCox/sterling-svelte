<script lang="ts">
  import { idGenerator } from './idGenerator';

  import Label from './Label.svelte';

  // ----- Props ----- //

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
<input
  bind:this={inputRef}
  class="sterling-input"
  class:composed
  {disabled}
  {id}
  bind:value
  on:blur
  on:click
  on:change
  on:copy
  on:cut
  on:paste
  on:dblclick
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

<style>
  .sterling-input {
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

  .sterling-input:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-input:focus {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-input:disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-input.composed,
  .sterling-input.composed:hover,
  .sterling-input.composed:focus,
  .sterling-input.composed.disabled {
    background: transparent;
    border: none;
    outline: none;
  }

  .sterling-input::placeholder {
    color: var(--stsv-Display__color--faint);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-input:disabled::placeholder {
    color: var(--stsv-Display__color--disabled);
  }

  @media (prefers-reduced-motion) {
    .sterling-input {
      transition: none;
    }
  }
</style>
