<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { mergeClasses } from './mergeClasses';

  type Props = HTMLAnchorAttributes & {
    disabled?: boolean | null;
  };

  let { children, class: _class, disabled, ...rest }: Props = $props();

  let linkRef: HTMLAnchorElement;

  export const blur = () => {
    linkRef?.blur();
  };

  export const click = () => {
    linkRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    linkRef?.focus();
  };
</script>

<a bind:this={linkRef} class={mergeClasses('sterling-link', _class)} class:disabled {...rest}>
  {#if children}
    {@render children()}
  {/if}
</a>
