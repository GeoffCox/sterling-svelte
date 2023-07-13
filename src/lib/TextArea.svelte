<script lang="ts">
  import { onMount } from 'svelte';
  import type { TextAreaResize } from './TextArea.types';

  // ----- Props ----- //

  export let disabled = false;
  export let value: string = '';

  /** When true, the text area will resize itself vertically to fit the current text.*/
  export let autoHeight = false;

  /** When true, applies colorful theme styles. */
  export let colorful = false;

  /** Sets the resize handle in the lower corner of the text area. */
  export let resize: TextAreaResize = 'none';

  // ----- State ----- //

  let textAreaRef: HTMLTextAreaElement;

  const autoSetHeight = () => {
    if (autoHeight && textAreaRef) {
      // the style must be directly set to avoid re-rendering looping latency
      // setting to auto for a moment allows the textarea to shrink
      textAreaRef.style.height = 'auto';
      textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
    }
  };

  // ----- Event Handlers ----- //

  const onInput = () => {
    autoSetHeight();
  };

  $: autoHeight, autoSetHeight();

  onMount(() => {
    autoSetHeight();
  });

  // ----- Methods ----- //

  export const blur = () => {
    textAreaRef?.blur();
  };

  export const click = () => {
    textAreaRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    textAreaRef?.focus();
  };

  export const select = () => {
    textAreaRef?.select();
  };

  export const setSelectionRange = (
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  ) => {
    textAreaRef?.setSelectionRange(start, end, direction);
  };

  export const setRangeText = (
    replacement: string,
    start?: number,
    end?: number,
    selectionMode?: SelectionMode
  ) => {
    if (start && end) {
      textAreaRef?.setRangeText(replacement, start, end, selectionMode);
    } else {
      textAreaRef?.setRangeText(replacement);
    }
  };
</script>

<div class="sterling-text-area" class:colorful class:disabled>
  <textarea
    bind:this={textAreaRef}
    bind:value
    {disabled}
    rows="1"
    style={`--TextArea__resize: ${resize};`}
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
    on:input={onInput}
    {...$$restProps}
  />
</div>

<style>
  .sterling-text-area {
    position: relative;
    height: 100%;
    width: 100%;
  }

  textarea {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-radius: var(--stsv-input__border-radius);
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
    box-sizing: border-box;
    color: var(--stsv-input__color);
    display: block;
    font: inherit;
    line-height: inherit;
    height: 100%;
    outline: none;
    padding: 0.5em;
    margin: 0;
    min-height: 3em;
    overflow: hidden;
    resize: var(--TextArea__resize, none);
    transition: background-color 250ms, color 250ms, border-color 250ms;
    width: 100%;
  }

  textarea:hover {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  textarea:focus {
    background-color: var(--stsv-input__background-color--focus);
    border-color: var(--stsv-input__border-color--focus);
    color: var(--stsv-input__color--focus);
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  .sterling-text-area.colorful textarea {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
    color: var(--stsv-input--colorful__color);
  }

  .sterling-text-area.colorful textarea:hover {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
    color: var(--stsv-input--colorful__color--hover);
  }

  .sterling-text-area.colorful textarea:focus {
    background-color: var(--stsv-input--colorful__background-color--focus);
    border-color: var(--stsv-input--colorful__border-color--focus);
    color: var(--stsv-input--colorful__color--focus);
  }

  .sterling-text-area:disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-text-area::after {
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

  .sterling-text-area.disabled::after {
    opacity: 1;
  }

  textarea::placeholder {
    color: var(--stsv-common__color--subtle);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  @media (prefers-reduced-motion) {
    textarea,
    .sterling-text-area,
    .sterling-text-area::after {
      transition: none;
    }
  }
</style>
