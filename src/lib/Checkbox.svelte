<script lang="ts">
  import { idGenerator } from './idGenerator';
  import Label from './Label.svelte';

  // ----- Props ----- //

  export let checked: boolean = false;
  export let colorful: boolean = false;
  export let disabled: boolean = false;
  export let id: string | undefined = undefined;

  // ----- State ----- //

  let inputRef: HTMLInputElement;

  $: {
    if ($$slots.default && id === undefined) {
      id = idGenerator.nextId('Checkbox');
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
    inputRef?.focus(options);
  };
</script>

<!--
	@component
	A styled HTML input type=checkbox element.
-->
<div class="sterling-checkbox" class:colorful class:disabled>
  <div class="container">
    <input
      bind:this={inputRef}
      bind:checked
      {disabled}
      {id}
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
      on:wheel
      {...$$restProps}
    />
    <div class="indicator" />
  </div>
  {#if $$slots.default}
    <Label for={id}>
      <slot {checked} {disabled} inputId={id} value={$$restProps.value}>
        {$$restProps.value}
      </slot>
    </Label>
  {/if}
</div>

<style>
  .sterling-checkbox {
    align-content: center;
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    font: inherit;
    margin: 0;
    outline: none;
    padding: 0;
  }

  /* 
		The container 
		- allows the input to be hidden
		- avoids input participating in layout
		- prevents collisions with surrounding slots
	 */
  .container {
    font: inherit;
    position: relative;
    display: grid;
    align-items: center;
    margin-right: 0.25em;
  }

  /*
		The input is hidden since the built-in browser checkbox cannot be customized
	*/
  input {
    font: inherit;
    margin: 0;
    padding: 0;
    position: absolute;
    opacity: 0;
    height: 20px;
    width: 20px;
  }

  /*
	 	The indicator handles both the box and the checkmark.
	 	The box cannot be on the container since the adjacent sibling selector is needed
		and there is not a parent CSS selector.
	*/
  .indicator {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
    box-sizing: border-box;
    display: inline-block;
    height: 20px;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    width: 20px;
    pointer-events: none;
  }

  input:checked + .indicator {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
  }

  .sterling-checkbox:not(.disabled):hover .indicator {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
  }

  input:focus-visible + .indicator {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  /*
		The checkmark is a rotated L centered in the box.
	*/
  .indicator::after {
    border-color: var(--stsv-input__color);
    border-style: solid;
    border-width: 0 3px 3px 0;
    box-sizing: border-box;
    content: '';
    height: 14px;
    left: 50%;
    position: absolute;
    top: 45%;
    transform: translate(-50%, -50%) rotate(45deg);
    transform-origin: center;
    transition: border-color 250ms, opacity 150ms;
    width: 7px;
    opacity: 0;
  }

  input:checked + .indicator::after {
    opacity: 1;
  }

  .sterling-checkbox:not(.disabled):hover input:checked + .indicator::after {
    border-color: var(--stsv-input__color--hover);
  }

  .sterling-checkbox.colorful .indicator {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
  }

  .sterling-checkbox.colorful:not(.disabled):hover .indicator {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
  }

  .sterling-checkbox.colorful .indicator::after {
    border-color: var(--stsv-input--colorful__color);
  }

  .sterling-checkbox.colorful:not(.disabled):hover input:checked + .indicator::after {
    border-color: var(--stsv-input--colorful__color--hover);
  }

  .sterling-checkbox.disabled,
  .sterling-checkbox.disabled input {
    cursor: not-allowed;
  }

  .container::after {
    background: repeating-linear-gradient(
      45deg,
      var(--stsv-common__background-color1--disabled),
      var(--stsv-common__background-color1--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 6px
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

  .sterling-checkbox.disabled .container::after {
    opacity: 1;
  }

  @media (prefers-reduced-motion) {
    .indicator,
    .indicator::after,
    .container::after {
      transition: none;
    }
  }
</style>
