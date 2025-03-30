<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  const uuid = $props.id();

  type Props = HTMLInputAttributes & {
    group?: any | null;
  };

  let {
    id,
    children,
    checked = $bindable(false),
    class: _class,
    disabled = false,
    group = $bindable(),
    ...rest
  }: Props = $props();

  let inputRef: HTMLInputElement;

  $effect(() => {
    if (children && id === undefined) {
      id = `Radio-${uuid}`;
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
	A styled HTML input type=radio element with optional label.
-->
<div
  class={['sterling-radio', _class]}
  class:checked
  class:disabled
  class:using-keyboard={$usingKeyboard}
>
  <div class="container">
    <input bind:this={inputRef} checked {disabled} bind:group {id} type="radio" {...rest} />
    <div class="indicator"></div>
  </div>
  {#if children}
    <label for={id}>
      {@render children()}
    </label>
  {/if}
</div>
