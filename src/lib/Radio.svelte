<script lang="ts">
  import { onMount } from 'svelte';
  import { idGenerator } from './idGenerator';

  import Label from './Label.svelte';

  // ----- Props ----- //

  /*
   * bind:group doesn't seem to work properly (yet) in a nested radio.
   * The workaround is to export `checked` and `group` properties
   * and implement the same behavior.
   */
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let group: any | undefined | null = undefined;
  export let id: string | undefined = undefined;

  // ----- State ----- //
  let mounted = false;
  let radioRef: HTMLInputElement;

  $: {
    if ($$slots.default && id === undefined) {
      id = idGenerator.nextId('Radio');
    }
  }

  $: {
    if (mounted) {
      checked = group === $$restProps.value;
    }
  }

  // ----- Events ----- //

  const onChange: svelte.JSX.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      group = $$restProps.value;
    }
  };

  // ----- Methods ----- //

  export const blur = () => {
    radioRef?.blur();
  };

  export const click = () => {
    radioRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    radioRef?.focus(options);
  };

  // ----- Event Handlers ----- //

  onMount(() => {
    if (checked) {
      group = $$restProps.value;
    }
    mounted = true;
  });
</script>

<!--
	@component
	A styled HTML input type=radio element with optional label.
-->
<div class="sterling-radio">
  <div class="container">
    <input
      bind:this={radioRef}
      checked={group === $$restProps.value}
      {disabled}
      {id}
      type="radio"
      on:blur
      on:click
      on:change
      on:change={onChange}
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
      {...$$restProps}
    />
    <div class="indicator" />
  </div>
  {#if $$slots.default}
    <div class="label">
      <Label {disabled} for={id}>
        <slot {checked} {disabled} {group} inputId={id} value={$$restProps.value}>
          {$$restProps.value}
        </slot>
      </Label>
    </div>
  {/if}
</div>

<style>
  .sterling-radio {
    display: inline-flex;
    align-content: stretch;
    align-items: stretch;
    box-sizing: border-box;
    font: inherit;
    gap: 0.4em;
    outline: none;
    padding: 0;
    margin: 0;
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
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
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
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
  }

  input:focus-visible + .indicator {
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  input:disabled + .indicator {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv-Common__border-color--disabled);
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
    background-color: var(--stsv-Input__color);
  }

  input:checked:disabled + .indicator::after {
    background-color: var(--stsv-Common__color--disabled);
  }

  .label {
    user-select: none;
    margin-top: 0.25em;
  }

  @media (prefers-reduced-motion) {
    .indicator,
    .indicator::after {
      transition: none;
    }
  }
</style>