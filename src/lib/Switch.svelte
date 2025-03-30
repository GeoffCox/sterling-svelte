<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { Snippet } from 'svelte';
  import { mergeClasses } from './mergeClasses';

  const uuid = $props.id();

  type LabelSnippet = Snippet<
    [{ checked: boolean | null | undefined; disabled: boolean | null | undefined; inputId: string }]
  >;

  type Props = HTMLInputAttributes & {
    offLabel?: string | LabelSnippet;
    onLabel?: string | LabelSnippet;
    vertical?: boolean | null | undefined;
  };

  let {
    checked = $bindable(false),
    class: _class,
    disabled,
    id,
    offLabel,
    onLabel,
    vertical,
    ...rest
  }: Props = $props();

  const inputId = id || `Switch-${uuid}`;

  let inputRef: HTMLInputElement;

  let switchWidth: number = $state(0);
  let switchHeight: number = $state(0);
  let thumbWidth: number = $state(0);
  let thumbHeight: number = $state(0);

  let switchSize = $derived(vertical ? switchHeight : switchWidth);
  let thumbSize = $derived(vertical ? thumbHeight : thumbWidth);
  let ratio = $derived(vertical ? (checked ? 0 : 1) : checked ? 1 : 0);
  let valueOffset = $derived((switchSize - thumbSize) * ratio);

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

<div
  class={mergeClasses('sterling-switch', _class)}
  class:checked
  class:disabled
  class:vertical
  class:using-keyboard={$usingKeyboard}
>
  <input bind:this={inputRef} bind:checked {disabled} id={inputId} type="checkbox" {...rest} />
  {#if offLabel}
    <div class="off-label">
      {#if typeof offLabel === 'string'}
        {offLabel}
      {:else}
        {@render offLabel({ checked, disabled, inputId })}
      {/if}
    </div>
  {/if}
  <div class="toggle" bind:offsetWidth={switchWidth} bind:offsetHeight={switchHeight}>
    <div
      class="thumb"
      bind:offsetWidth={thumbWidth}
      bind:offsetHeight={thumbHeight}
      style={`--thumb-offset: ${valueOffset}px`}
    ></div>
  </div>
  {#if onLabel}
    <div class="on-label">
      {#if typeof onLabel === 'string'}
        {onLabel}
      {:else}
        {@render onLabel({ checked, disabled, inputId })}
      {/if}
    </div>
  {/if}
</div>
