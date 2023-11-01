<script lang="ts">
  import TreeItem from '$lib/TreeItem.svelte';
  import type { CoffeeItem } from '../../_shared/sampleData/coffeeTree';

  export let coffeeItem: CoffeeItem;

  export let variant: string = '';
</script>

{#if coffeeItem.children}
  <TreeItem value={coffeeItem.name} {variant}>
    {#each coffeeItem.children as child}
      <svelte:self coffeeItem={child} {variant} />
    {/each}
  </TreeItem>
{:else}
  <TreeItem value={coffeeItem.name} {variant} />
{/if}
