<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

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

<a bind:this={linkRef} class={`sterling-link ${_class}`} class:disabled {...rest}>
  {#if children}
    {@render children()}
  {/if}
</a>
