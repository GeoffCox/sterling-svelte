<script lang="ts">
  import type { TextAreaResize } from './TextArea.types';

  // ----- Props ----- //

  export let autoHeight = false;
  export let resize: TextAreaResize = 'none';
  export let value: string;

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

  const onInput = () => {
    autoSetHeight();
  };

  $: autoHeight, autoSetHeight();
</script>

<textarea
  bind:this={textAreaRef}
  class="sterling-text-area"
  rows="1"
  style={`--TextArea__resize: ${resize};`}
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
  on:input={onInput}
  {...$$restProps}
/>

<style>
  .sterling-text-area {
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    box-sizing: border-box;
    color: var(--stsv-Input__color);
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

  .sterling-text-area:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-text-area:focus {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-text-area:disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-text-area::placeholder {
    color: var(--stsv-Display__color--faint);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-text-area:disabled::placeholder {
    color: var(--stsv-Display__color--disabled);
  }

  @media (prefers-reduced-motion) {
    .sterling-text-area {
      transition: none;
    }
  }
</style>
