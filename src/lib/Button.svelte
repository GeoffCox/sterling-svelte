<svelte:options runes={true} />

<script lang="ts">
  import type { ButtonProps } from './Button.types';

  let { children, class: _class, ...rest }: ButtonProps = $props();

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

<button bind:this={buttonRef} class={['sterling-button', _class]} type="button" {...rest}>
  {#if children}
    {@render children()}
  {/if}
</button>
