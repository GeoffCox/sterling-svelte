<svelte:options runes={true} />

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { RadioProps } from './Radio.types';
  import { onMount } from 'svelte';

  const uuid = $props.id();

  let {
    id,
    children,
    class: _class,
    disabled = false,
    group = $bindable(),
    value,
    ...rest
  }: RadioProps = $props();

  let inputRef: HTMLInputElement;

  $effect(() => {
    if (children && id === undefined) {
      id = `Radio-${uuid}`;
    }
  });

  export const blur = () => {
    inputRef?.blur();
  };

  export const click = () => {
    inputRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    inputRef?.focus(options);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      group = value;
    }
  };
</script>

<!--
	@component
	A styled HTML input type=radio element with optional label.
-->
<div
  class={['sterling-radio', _class]}
  class:checked={group === value}
  class:disabled
  class:using-keyboard={$usingKeyboard}
>
  <div class="container">
    <input
      bind:this={inputRef}
      checked={group === value}
      {disabled}
      {group}
      {id}
      type="radio"
      {value}
      {...rest}
      onchange={onChange}
    />
    <div class="indicator"></div>
  </div>
  {#if children}
    <label for={id}>
      {@render children()}
    </label>
  {/if}
</div>
