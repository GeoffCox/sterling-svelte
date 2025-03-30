<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    expanded?: boolean | null | undefined;
    hasChildren?: boolean | null | undefined;
  };

  let { class: _class, expanded = false, hasChildren = false, ...rest }: Props = $props();

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
