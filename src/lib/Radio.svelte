<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

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

  /** Additional class names to apply. */
  export let variant: string = '';

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

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      group = $$restProps.value;
    }
  };
</script>

<!--
	@component
	A styled HTML input type=radio element with optional label.
-->
<div class={`sterling-radio ${variant}`} class:disabled>
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
      <slot {checked} {disabled} {group} inputId={id} value={$$restProps.value} {variant} />
    </label>
  {/if}
</div>
