<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { idGenerator } from './idGenerator';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { Snippet } from 'svelte';

  type LabelSnippet = Snippet<
    [{ checked: boolean | null | undefined; disabled: boolean | null | undefined; inputId: string }]
  >;

  type Props = HTMLInputAttributes & {
    // todo: pass input ID to snippets?
    offLabel?: string | LabelSnippet;
    onLabel?: string | LabelSnippet;
    vertical?: boolean | null | undefined;
  };

  let {
    checked = $bindable(false),
    class: _class,
    disabled,
    id,
    offLabel: offLabel,
    onLabel: onLabel,
    vertical,
    ...rest
  }: Props = $props();

  const inputId = id || idGenerator.nextId('Switch');

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

{#snippet renderLabel(item: string | LabelSnippet | null | undefined, _class: string)}
  {#if item}
    <div class={_class}>
      {#if typeof item === 'string'}
        <label for={inputId}>{item}</label>
      {:else}
        {@render item({ checked, disabled, inputId })}
      {/if}
    </div>
  {/if}
{/snippet}

<div
  class={`sterling-switch ${_class}`}
  class:checked
  class:disabled
  class:vertical
  class:using-keyboard={$usingKeyboard}
>
  <input bind:this={inputRef} bind:checked {disabled} id={inputId} type="checkbox" {...rest} />
  {@render renderLabel(offLabel, 'off-label')}
  <div class="switch" bind:offsetWidth={switchWidth} bind:offsetHeight={switchHeight}>
    <div
      class="thumb"
      bind:offsetWidth={thumbWidth}
      bind:offsetHeight={thumbHeight}
      style={`--thumb-offset: ${valueOffset}px`}
    ></div>
  </div>
  {@render renderLabel(onLabel, 'on-label')}
</div>
