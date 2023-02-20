<script lang="ts">
  import TreeItem from '$lib/containers/TreeItem.svelte';
  import type { CoffeeItem } from '../../_sampleData/coffeeTree';

  export let coffeeItem: CoffeeItem;
</script>

{#if coffeeItem.children}
  <TreeItem treeItemId={coffeeItem.name}>
    {#each coffeeItem.children as child}
      <svelte:self coffeeItem={child} />
    {/each}
  </TreeItem>
{:else}
  <TreeItem treeItemId={coffeeItem.name} />
{/if}
