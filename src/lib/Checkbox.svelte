<svelte:options runes={true} />

<script lang="ts">
  import type { CheckboxProps } from './Checkbox.types';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  const uuid = $props.id();

  let {
    id,
    children,
    checked = $bindable(false),
    class: _class,
    disabled = false,
    ...rest
  }: CheckboxProps = $props();

  let inputRef: HTMLInputElement;

  $effect(() => {
    if (children && id === undefined) {
      id = `Checkbox-${uuid}`;
    }
  });

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
  class={['sterling-checkbox', _class]}
  class:checked
  class:disabled
  class:using-keyboard={$usingKeyboard}
>
  <div class="container">
    <input bind:this={inputRef} bind:checked {disabled} {id} type="checkbox" {...rest} />
    <div class="indicator"></div>
  </div>
  {#if children}
    <label for={id}>
      {@render children()}
    </label>
  {/if}
</div>
