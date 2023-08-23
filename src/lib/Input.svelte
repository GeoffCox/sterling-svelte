<script lang="ts">
  import { idGenerator } from './idGenerator';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  // ----- Props ----- //

  export let disabled = false;
  export let id: string | undefined = undefined;
  export let value: string = '';

  /** Additional class names to apply. */
  export let variant: string = '';

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
    <slot {disabled} {value} />
  </label>
{/if}
<div class={`sterling-input ${variant}`} class:disabled>
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
