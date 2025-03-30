<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import { mergeClasses } from './mergeClasses';

  const uuid = $props.id();

  type Props = HTMLInputAttributes;

  let {
    id,
    children,
    checked = $bindable(false),
    class: _class,
    disabled = $bindable(false),
    ...rest
  }: Props = $props();

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
  class={mergeClasses('sterling-checkbox', _class)}
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
