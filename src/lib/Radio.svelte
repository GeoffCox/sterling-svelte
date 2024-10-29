<svelte:options runes={true} />

<script lang="ts">
  import type { ChangeEventHandler, HTMLInputAttributes } from 'svelte/elements';

  import { idGenerator } from './idGenerator';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  type Props = HTMLInputAttributes & {
    group: any | undefined | null;
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
      id = idGenerator.nextId('Radio');
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

  // ----- Event Handlers ----- //

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log('onChange', e);
    // if ((e.currentTarget && e.currentTarget.checked) || (e.target && e.target.checked)) {
    //   group = value;
    // }
  };

  $effect(() => {
    console.log(id, '-checked', checked);
  });
</script>

<!--
	@component
	A styled HTML input type=radio element with optional label.
-->
<div
  class={`sterling-radio ${_class}`}
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
