<svelte:options runes={true} />

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import TreeChevron from './TreeChevron.svelte';

  type Props = HTMLAttributes<HTMLDivElement> & {
    depth?: number;
    disabled?: boolean | null | undefined;
    expanded?: boolean | null | undefined;
    hasChildren?: boolean | null | undefined;
    selected?: boolean | null | undefined;
    value: string;
  };

  let {
    children,
    class: _class,
    depth = 0,
    disabled = false,
    expanded = false,
    hasChildren = false,
    selected = false,
    value,
    ...rest
  }: Props = $props();

  let divRef: HTMLDivElement;

  export const click = () => {
    divRef?.click();
  };

  export const blur = () => {
    divRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    divRef?.focus(options);
  };
</script>

<div
  bind:this={divRef}
  class={`sterling-tree-item-display ${_class}`}
  class:disabled
  class:expanded
  class:selected
  style={`--sterling-tree-item-depth: ${depth}`}
  {...rest}
>
  <TreeChevron {expanded} {hasChildren} />
  {@render children?.()}
</div>
