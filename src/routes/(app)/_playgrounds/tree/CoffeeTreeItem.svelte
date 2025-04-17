<svelte:options runes={true} />

<script lang="ts">
  import TreeItem from '$lib/TreeItem.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { CoffeeItem } from '../../_shared/sampleData/coffeeTree';
  import CoffeeTreeItem from './CoffeeTreeItem.svelte';

  type Props = HTMLAttributes<HTMLDivElement> & {
    coffeeItem: CoffeeItem;
  };

  let { class: _class, coffeeItem }: Props = $props();
</script>

{#if coffeeItem.children}
  <TreeItem class={_class} value={coffeeItem.name}>
    {#each coffeeItem.children as child}
      <CoffeeTreeItem class={_class} coffeeItem={child} />
    {/each}
  </TreeItem>
{:else}
  <TreeItem class={_class} value={coffeeItem.name} />
{/if}
