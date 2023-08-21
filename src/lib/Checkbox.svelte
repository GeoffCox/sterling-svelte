<script lang="ts">
  import { idGenerator } from './idGenerator';

  // ----- Props ----- //

  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let id: string | undefined = undefined;
  export let variant: string = '';

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
<div class={`sterling-checkbox ${variant}`} class:disabled>
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
      on:wheel|passive
      {...$$restProps}
    />
    <div class="indicator" />
  </div>
  {#if $$slots.default}
    <label for={id}>
      <slot {checked} {disabled} inputId={id} value={$$restProps.value} {variant} />
    </label>
  {/if}
</div>
