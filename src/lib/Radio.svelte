<script lang="ts">
  import { idGenerator } from './idGenerator';

  // ----- Props ----- //

  export let checked: boolean = false;
  export let disabled: boolean = false;
  /*
   * bind:group doesn't seem to work properly (yet) in a nested radio.
   * The workaround is to export `checked` and `group` properties
   * and implement the same behavior.
   */
  export let group: any | undefined | null = undefined;
  export let id: string | undefined = undefined;

  /** When true, applies colorful theme styles. */
  export let colorful = false;

  // ensure initial state is consistent
  if (checked && $$restProps.value !== group) {
    group = $$restProps.value;
  } else if (!checked && $$restProps.value === group) {
    checked = true;
  }

  // ----- State ----- //

  let inputRef: HTMLInputElement;
  let previousChecked = checked;
  let previousGroup = group;

  const reconcile = () => {
    if (checked !== previousChecked) {
      // when checked, set group to value
      if (checked && $$restProps.value) {
        group = $$restProps.value;
        previousGroup = $$restProps.value;
      }
      previousChecked = checked;
    } else if (group !== previousGroup) {
      // when group changes, update checked
      if ($$restProps.value) {
        checked = $$restProps.value === group;
        previousChecked = checked;
      }
      previousGroup = group;
    }
  };

  $: checked, group, $$restProps.value, reconcile();

  $: {
    if (inputRef && checked && !inputRef.checked) {
      // setting checked doesn't cause raise on:change,
      // so we click the radio to cause it to be checked.
      inputRef.click();
    }
  }

  $: {
    if ($$slots.default && id === undefined) {
      id = idGenerator.nextId('Radio');
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

  // ----- Event Handlers ----- //

  const onChange: svelte.JSX.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      group = $$restProps.value;
    }
  };
</script>

<!--
	@component
	A styled HTML input type=radio element with optional label.
-->
<div class="sterling-radio" class:colorful class:disabled>
  <div class="container">
    <input
      bind:this={inputRef}
      {checked}
      {disabled}
      {group}
      {id}
      type="radio"
      on:blur
      on:click
      on:change
      on:change={onChange}
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
    <div class="indicator" />
  </div>
  {#if $$slots.default}
    <label for={id}>
      <slot {colorful} {checked} {disabled} {group} inputId={id} value={$$restProps.value} />
    </label>
  {/if}
</div>

<style>
  .sterling-radio {
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
    box-sizing: border-box;
    position: relative;
    font: inherit;
    display: flex;
    align-items: center;
    margin-right: 0.25em;
  }

  /*
		The input is hidden since the built-in browser radio cannot be customized
	*/
  input {
    font: inherit;
    margin: 0;
    padding: 0;
    position: absolute;
    opacity: 0;
    height: 21px;
    width: 21px;
  }

  /*
	 	The indicator handles both the radio box and circle mark.
	 	The box cannot be on the container since the adjacent sibling selector is needed
		and there is not a parent CSS selector.
	*/
  .indicator {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
    border-radius: 10000px;
    box-sizing: border-box;
    display: inline-block;
    height: 21px;
    position: relative;
    pointer-events: none;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    width: 21px;
  }

  input:checked + .indicator {
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
  }

  .sterling-radio:not(.disabled):hover .indicator {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
  }

  input:focus-visible + .indicator {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  .indicator::after {
    background-color: transparent;
    border-radius: 10000px;
    content: '';
    height: 9px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 250ms;
    width: 9px;
  }

  input:checked + .indicator::after {
    background-color: var(--stsv-input__color);
  }

  .sterling-radio.colorful .indicator {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
  }

  .sterling-radio.colorful input:checked + .indicator {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
  }

  .sterling-radio.colorful:not(.disabled):hover .indicator {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
  }

  .sterling-radio.colorful input:checked + .indicator::after {
    background-color: var(--stsv-input--colorful__color);
  }

  .sterling-radio.disabled * {
    cursor: not-allowed;
  }

  .container::after {
    background: repeating-linear-gradient(
      var(--stsv-common--disabled__stripe-angle),
      var(--stsv-common--disabled__stripe-color),
      var(--stsv-common--disabled__stripe-color) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt)
        calc(2 * var(--stsv-common--disabled__stripe-width))
    );
    border-radius: 10000px;
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

  label {
    color: var(--stsv-common__color);
    transition: color 250ms;
    font: inherit;
  }

  .sterling-radio.disabled .container::after {
    opacity: 1;
  }

  @media (prefers-reduced-motion) {
    .indicator,
    .indicator::after,
    .container::after,
    label {
      transition: none;
    }
  }
</style>
