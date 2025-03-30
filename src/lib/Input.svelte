<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  const uuid = $props.id();

  type Props = HTMLInputAttributes;

  let {
    id,
    children,
    class: _class,
    disabled = false,
    value = $bindable(undefined),
    ...rest
  }: Props = $props();

  let inputRef: HTMLInputElement;

  $effect(() => {
    if (children && id === undefined) {
      id = `Input-${uuid}`;
    }
  });

  export const blur = () => {
    inputRef?.blur();
  };

  export const click = () => {
    inputRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    inputRef?.focus();
  };

  export const select = () => {
    inputRef?.select();
  };

  export const setSelectionRange = (
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  ) => {
    inputRef?.setSelectionRange(start, end, direction);
  };

  export const setRangeText = (
    replacement: string,
    start?: number,
    end?: number,
    selectionMode?: SelectionMode
  ) => {
    if (start && end) {
      inputRef?.setRangeText(replacement, start, end, selectionMode);
    } else {
      inputRef?.setRangeText(replacement);
    }
  };
</script>

{#if children}
  <label class={['sterling-input-label', _class]} class:disabled for={id}>
    {@render children()}
  </label>
{/if}
<div class={['sterling-input', _class]} class:disabled class:using-keyboard={$usingKeyboard}>
  <input
    bind:this={inputRef}
    class:using-keyboard={$usingKeyboard}
    {disabled}
    {id}
    bind:value
    {...rest}
  />
</div>
