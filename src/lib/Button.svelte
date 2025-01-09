<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Props = HTMLButtonAttributes;

  let { children, class: _class, ...rest }: Props = $props();

  let buttonRef: HTMLButtonElement;

  export const click = () => {
    buttonRef?.click();
  };

  export const blur = () => {
    buttonRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    buttonRef?.focus(options);
  };
</script>

<button
  bind:this={buttonRef}
  class={['sterling-button', _class].filter(Boolean).join(' ')}
  type="button"
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</button>
