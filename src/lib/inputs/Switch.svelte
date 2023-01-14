<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import Label from '$lib/display/Label.svelte';

  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let vertical: boolean = false;

  export let onText: string = '';
  export let offText: string = '';

  const inputId = uuid();

  let switchWidth: number = 0;
  let switchHeight: number = 0;
  let thumbWidth: number = 0;
  let thumbHeight: number = 0;

  $: switchSize = vertical ? switchHeight : switchWidth;
  $: thumbSize = vertical ? thumbHeight : thumbWidth;
  $: ratio = checked ? 1 : 0;
  $: valueOffset = (switchSize - thumbSize) * ratio;
</script>

<!--
	@component
	A styled HTML input type=checkbox element.
-->
<div class="sterling-switch" class:vertical class:disabled>
  <input
    type="checkbox"
    on:blur
    on:click
    on:change
    on:dblclick
    on:focus
    on:focusin
    on:focusout
    on:keydown
    on:keypress
    on:keyup
    on:input
    on:mousedown
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:mouseover
    on:mouseout
    on:mouseup
    on:toggle
    on:wheel
    bind:checked
    id={inputId}
    {disabled}
    {...$$restProps}
  />
  <div class="off-label">
    <slot name="off-label" {checked} {disabled} {inputId} {offText} {vertical}>
      {#if offText}
        <Label for={inputId} {disabled}>{offText}</Label>
      {/if}
    </slot>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="switch" bind:offsetWidth={switchWidth} bind:offsetHeight={switchHeight}>
    <div
      class="thumb"
      bind:offsetWidth={thumbWidth}
      bind:offsetHeight={thumbHeight}
      style={`--thumb-offset: ${valueOffset}px`}
    />
  </div>
  <div class="on-label">
    <slot name="on-label" {checked} {disabled} {inputId} {onText} {vertical}>
      {#if onText}
        <Label for={inputId} {disabled}>{onText}</Label>
      {/if}
    </slot>
  </div>
</div>

<style>
  .sterling-switch {
    cursor: pointer;
    display: grid;
    position: relative;
  }

  .sterling-switch:not(.vertical) {
    align-items: center;
    column-gap: 0.5em;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    justify-items: stretch;
  }

  .sterling-switch.vertical {
    align-items: stretch;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    justify-items: center;
    row-gap: 0.5em;
  }

  .sterling-switch.vertical .off-label {
    grid-row: 3 / span 1;
  }

  .sterling-switch.vertical .on-label {
    grid-row: 1 / span 1;
  }

  input {
    font: inherit;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    opacity: 0;
  }

  .switch {
    background-color: var(--Input__background-color);
    border-color: var(--Input__border-color);
    border-radius: 10000px;
    border-style: var(--Input__border-style);
    border-width: var(--Input__border-width);
    box-sizing: border-box;
    color: var(--Input__color);
    font: inherit;
    pointer-events: none;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    user-select: none;
  }

  .sterling-switch:hover .switch {
    background-color: var(--Input__background-color--hover);
    border-color: var(--Input__border-color--hover);
    color: var(--Input__color--hover);
  }

  input:focus-visible ~ .switch {
    background-color: var(--Input__background-color--focus);
    border-color: var(--Input__border-color--focus);
    color: var(--Common__color--focux);
    outline-color: var(--Common__outline-color);
    outline-offset: var(--Common__outline-offset);
    outline-style: var(--Common__outline-style);
    outline-width: var(--Common__outline-width);
  }

  .sterling-switch.disabled .switch {
    background-color: var(--Input__background-color--disabled);
    border-color: var(--Input__border-color--disabled);
    color: var(--Input__color--disabled);
  }

  .sterling-switch:not(.vertical) .switch {
    width: 2em;
    height: 1.25em;
  }

  .sterling-switch.vertical .switch {
    width: 1.25em;
    height: 2em;
  }

  .off-label,
  .on-label {
    padding-top: var(--Button__border-width);
  }

  .thumb {
    background-color: var(--Button__background-color);
    border-color: var(--Button__border-color);
    border-radius: 10000px;
    border-style: var(--Button__border-style);
    border-width: var(--Button__border-width);
    box-sizing: border-box;
    color: var(--Button__color);
    cursor: pointer;
    display: block;
    font: inherit;
    height: 1.25em;
    position: absolute;
    transition: background-color 250ms, color 250ms, border-color 250ms, transform 250ms;
    width: 1.25em;
  }

  .sterling-switch:hover .thumb {
    background-color: var(--Button__background-color--hover);
    border-color: var(--Button__border-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-switch:active .thumb {
    background-color: var(--Button__background-color--active);
    border-color: var(--Button__border-color--active);
    color: var(--Button__color--hover);
  }

  .sterling-switch.disabled .thumb {
    background-color: var(--Button__background-color--disabled);
    border-color: var(--Button__border-color--disabled);
    color: var(--Button__color--disabled);
  }

  .sterling-switch:not(.vertical) .thumb {
    top: calc(-1 * var(--Button__border-width));
    transform: translateX(calc(var(--thumb-offset) - var(--Button__border-width)));
  }

  .sterling-switch.vertical .thumb {
    left: calc(-1 * var(--Button__border-width));
    transform: translateY(calc(var(--thumb-offset) - var(--Button__border-width)));
  }
</style>
