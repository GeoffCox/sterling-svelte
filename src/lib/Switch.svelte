<script lang="ts">
  import { idGenerator } from './idGenerator';

  // ----- Props ----- //

  export let checked: boolean = false;
  export let disabled = false;

  /** When true, applies colorful theme styles. */
  export let colorful = false;

  /** The text appearing on the off position side when the offLabel slot is not replaced. */
  export let offText: string | undefined = undefined;

  /** The text appearing on the on position side when the onLabel slot is not replaced. */
  export let onText: string | undefined = undefined;

  /** When true, the switch is displayed vertically. */
  export let vertical = false;

  // ----- State ----- //

  const inputId = idGenerator.nextId('Switch');
  let inputRef: HTMLInputElement;

  let switchWidth: number = 0;
  let switchHeight: number = 0;
  let thumbWidth: number = 0;
  let thumbHeight: number = 0;

  $: switchSize = vertical ? switchHeight : switchWidth;
  $: thumbSize = vertical ? thumbHeight : thumbWidth;
  $: ratio = vertical ? (checked ? 0 : 1) : checked ? 1 : 0;
  $: valueOffset = (switchSize - thumbSize) * ratio;

  $: hasOffLabel = $$slots.offLabel || (offText !== undefined && offText.length > 0);
  $: hasOnLabel = $$slots.onLabel || (onText !== undefined && onText.length > 0);

  // ----- Methods ----- //

  export const blur = () => {
    inputRef?.blur();
  };

  export const click = () => {
    inputRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    inputRef?.focus(options);
  };
</script>

<!--
	@component
	A styled HTML input type=checkbox element.
-->
<div class="sterling-switch" class:colorful class:disabled class:vertical>
  <input
    bind:this={inputRef}
    bind:checked
    {disabled}
    id={inputId}
    type="checkbox"
    on:blur
    on:click
    on:change
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
    on:wheel|passive
    {...$$restProps}
  />
  {#if hasOffLabel}
    <div class="off-label">
      <slot name="offLabel" {checked} {disabled} {inputId} {offText} {vertical}>
        {#if offText}
          <label for={inputId}>{offText}</label>
        {/if}
      </slot>
    </div>
  {/if}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="switch" bind:offsetWidth={switchWidth} bind:offsetHeight={switchHeight}>
    <div
      class="thumb"
      bind:offsetWidth={thumbWidth}
      bind:offsetHeight={thumbHeight}
      style={`--thumb-offset: ${valueOffset}px`}
    />
  </div>
  {#if hasOnLabel}
    <div class="on-label">
      <slot name="onLabel" {checked} {disabled} {inputId} {onText} {vertical}>
        {#if onText}
          <label for={inputId}>{onText}</label>
        {/if}
      </slot>
    </div>
  {/if}
</div>

<style>
  .sterling-switch {
    cursor: pointer;
    display: grid;
    position: relative;
  }

  .sterling-switch input {
    cursor: pointer;
  }

  .sterling-switch.disabled input {
    cursor: not-allowed;
  }

  .sterling-switch:not(.vertical) {
    align-content: center;
    align-items: center;
    column-gap: 0.5em;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    justify-content: flex-start;
    justify-items: flex-start;
  }

  .sterling-switch.vertical {
    align-content: flex-start;
    align-items: flex-start;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    justify-content: center;
    justify-items: center;
    row-gap: 0.5em;
  }

  .sterling-switch.vertical .off-label {
    grid-row: 3 / span 1;
  }

  .sterling-switch.vertical .on-label {
    grid-row: 1 / span 1;
  }

  /* ----- input hidden ----- */

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

  /* ----- switch ----- */

  .switch {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-radius: 10000px;
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
    box-sizing: border-box;
    color: var(--stsv-input__color);
    font: inherit;
    pointer-events: none;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    user-select: none;
  }

  .sterling-switch:hover .switch {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  input:focus-visible ~ .switch {
    background-color: var(--stsv-input__background-color--focus);
    border-color: var(--stsv-input__border-color--focus);
    color: var(--stsv-common__color--focux);
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  /* ----- switch vertical ----- */

  .sterling-switch:not(.vertical) .switch {
    width: 2em;
    height: 1.25em;
  }

  .sterling-switch.vertical .switch {
    width: 1.25em;
    height: 2em;
  }

  /* ----- labels ----- */

  label {
    color: var(--stsv-common__color);
    transition: color 250ms;
    font: inherit;
  }

  .off-label,
  .on-label {
    padding-top: var(--stsv-button__border-width);
  }

  /* ----- switch colorful ----- */

  .sterling-switch.colorful .switch {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
    color: var(--stsv-input--colorful__color);
  }

  .sterling-switch.colorful:hover .switch {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
    color: var(--stsv-input_--colorful_color--hover);
  }

  .sterling-switch.colorful input:focus-visible ~ .switch {
    background-color: var(--stsv-input--colorful__background-color--focus);
    border-color: var(--stsv-input--colorful__border-color--focus);
    color: var(--stsv-input--colorful__color--focus);
  }

  /* ----- thumb ----- */

  .thumb {
    background-color: var(--stsv-button__background-color);
    border-color: var(--stsv-button__border-color);
    border-radius: 10000px;
    border-style: var(--stsv-button__border-style);
    border-width: var(--stsv-button__border-width);
    box-sizing: border-box;
    color: var(--stsv-button__color);
    display: block;
    font: inherit;
    height: 1.25em;
    position: absolute;
    transition: background-color 250ms, color 250ms, border-color 250ms, transform 250ms;
    width: 1.25em;
  }

  .sterling-switch:hover .thumb {
    background-color: var(--stsv-button__background-color--hover);
    border-color: var(--stsv-button__border-color--hover);
    color: var(--stsv-button__color--hover);
  }

  .sterling-switch:active .thumb {
    background-color: var(--stsv-button__background-color--active);
    border-color: var(--stsv-button__border-color--active);
    color: var(--stsv-button__color--hover);
  }

  /* ----- thumb colorful ----- */

  .sterling-switch.colorful .thumb {
    background-color: var(--stsv-button--colorful__background-color);
    border-color: var(--stsv-button--colorful__border-color);
    color: var(--stsv-button--colorful__color);
  }

  .sterling-switch.colorful:hover .thumb {
    background-color: var(--stsv-button--colorful__background-color--hover);
    border-color: var(--stsv-button--colorful__border-color--hover);
    color: var(--stsv-button--colorful__color--hover);
  }

  .sterling-switch.colorful:active .thumb {
    background-color: var(--stsv-button--colorful__background-color--active);
    border-color: var(--stsv-button--colorful__border-color--active);
    color: var(--stsv-button--colorful__color--hover);
  }

  /* ----- thumb disabled ----- */

  .sterling-switch .thumb::after {
    background: repeating-linear-gradient(
      var(--stsv-common--disabled__stripe-angle),
      var(--stsv-common--disabled__stripe-color),
      var(--stsv-common--disabled__stripe-color) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt)
        calc(2 * var(--stsv-common--disabled__stripe-width))
    );
    bottom: 0;
    border-radius: 10000px;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }

  .sterling-switch.disabled .thumb::after {
    opacity: 1;
  }

  /* ----- thumb vertical ----- */

  .sterling-switch:not(.vertical) .thumb {
    top: calc(-1 * var(--stsv-button__border-width));
    transform: translateX(calc(var(--thumb-offset) - var(--stsv-button__border-width)));
  }

  .sterling-switch.vertical .thumb {
    left: calc(-1 * var(--stsv-button__border-width));
    transform: translateY(calc(var(--thumb-offset) - var(--stsv-button__border-width)));
  }

  /* ----- reduced motion ----- */

  @media (prefers-reduced-motion) {
    .switch,
    .thumb,
    .thumb::after,
    label {
      transition: none;
    }
  }
</style>
