<svelte:options runes={true} />

<script lang="ts">
  import type { ButtonProps } from './Button.types';

  let { children, class: _class, ...rest }: ButtonProps = $props();

  let buttonElement = $state<HTMLButtonElement>();

  export const click = () => {
    buttonElement?.click();
  };

  export const blur = () => {
    buttonElement?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    buttonElement?.focus(options);
  };
</script>

<button bind:this={buttonElement} class={['sterling-button', _class]} type="button" {...rest}>
  {#if children}
    {@render children()}
  {/if}
</button>
