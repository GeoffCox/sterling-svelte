<script lang="ts">
  import { idGenerator } from './idGenerator';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  // ----- Props ----- //

  export let checked: boolean = false;
  export let disabled = false;

  /** The text appearing by the off position. Not used when the offLabel slot is filled. */
  export let offText: string | undefined = undefined;

  /** The text appearing near the on position. Not used when the onLabel slot is filled. */
  export let onText: string | undefined = undefined;

  /** Additional class names to apply. */
  export let variant: string = '';

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
<div
  class={`sterling-switch ${variant}`}
  class:checked
  class:disabled
  class:vertical
  class:using-keyboard={$usingKeyboard}
>
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
      <slot name="offLabel" {checked} {disabled} {inputId} {offText} {variant} {vertical}>
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
      <slot name="onLabel" {checked} {disabled} {inputId} {onText} {variant} {vertical}>
        {#if onText}
          <label for={inputId}>{onText}</label>
        {/if}
      </slot>
    </div>
  {/if}
</div>
