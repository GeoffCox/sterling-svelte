<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import Label from './Label.svelte';
  import type { TextAreaResize } from './TextArea.types';

  export let value: string;
  export let resize: TextAreaResize = 'none';
  export let disabled = false;
  export let autoHeight = false;

  const inputId = uuid();

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

<div class="sterling-text-area" style={`--TextArea__resize: ${resize};`}>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <textarea
    {...$$restProps}
    bind:this={textAreaRef}
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
    {disabled}
    rows="1"
    {...$$restProps}
  />
</div>

<style>
  .sterling-text-area {
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    box-sizing: border-box;
    color: var(--stsv-Input__color);
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
    margin: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-text-area:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-text-area:focus-wthin {
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

  textarea {
    background: none;
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    line-height: inherit;
    padding: 0 0.5em 0.5em 0.5em;
    min-height: 3em;
    margin: 0.5em 0 0 0;
    resize: var(--TextArea__resize, none);
    width: 100%;
  }

  textarea,
  textarea:hover,
  textarea:focus-within,
  textarea:disabled {
    background-color: transparent;
    border: none;
    outline: none;
  }

  textarea::placeholder {
    color: var(--stsv-Display__color--faint);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  textarea:disabled::placeholder {
    color: var(--stsv-Display__color--disabled);
  }

  .sterling-text-area > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0 0 0.7em;
  }

  .sterling-text-area > :global(label):empty {
    margin: 0;
  }

  @media (prefers-reduced-motion) {
    .sterling-text-area,
    .sterling-text-area textarea::placeholder {
      transition: none;
    }
  }
</style>
