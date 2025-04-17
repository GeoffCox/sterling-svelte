<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import type { TreeChevronProps } from './TreeChevron.types';

  let {
    class: _class,
    expanded = false,
    hasChildren = false,
    ...rest
  }: TreeChevronProps = $props();

  let previousExpanded = expanded;
  let mounted = false;

  onMount(() => {
    setTimeout(() => {
      mounted = true;
    }, 0);
  });

  let animate = $state(false);

  $effect(() => {
    if (expanded !== previousExpanded && mounted) {
      animate = true;
    }
    previousExpanded = expanded;
  });
</script>

<div
  class={['sterling-tree-chevron', _class]}
  class:leaf={!hasChildren}
  class:animate
  class:expanded
  {...rest}
></div>
