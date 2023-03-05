<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import Label from './Label.svelte';

  // ----- Props ----- //

  export let disabled: boolean = false;
  export let id: string | undefined = undefined;
  export let value: string = '';

  // ----- State ----- //

  $: {
    if ($$slots.default && id === undefined) {
      id = uuid();
    }
  }
</script>

<!--
	@component
	A styled HTML input element with optional label.
-->
<div class="sterling-input">
  {#if $$slots.default}
    <Label {disabled} for={id}>
      <slot {disabled} {value} />
    </Label>
  {/if}
  <input
    bind:value
    {disabled}
    {id}
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
    {...$$restProps}
  />
</div>

<style>
  .sterling-input {
    display: flex;
    flex-direction: column;
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    color: var(--stsv-Input__color);
    font: inherit;
    margin: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-input:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-input:focus-within {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-input:disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-input input {
    font: inherit;
    color: inherit;
    padding: 0.5em;
  }

  .sterling-input input,
  .sterling-input input:hover,
  .sterling-input input:focus-within,
  .sterling-input input:disabled {
    background-color: transparent;
    border: none;
    outline: none;
  }

  .sterling-input input::placeholder {
    color: var(--stsv-Display__color--faint);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-input input:disabled::placeholder {
    color: var(--stsv-Display__color--disabled);
  }

  .sterling-input > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0 0 0.7em;
  }

  .sterling-input > :global(label):empty {
    margin: 0;
  }

  @media (prefers-reduced-motion) {
    .sterling-input,
    .sterling-input input::placeholder {
      transition: none;
    }
  }
</style>
