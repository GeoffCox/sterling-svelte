<script lang="ts">
  import TreeItem from '$lib/TreeItem.svelte';
  import { sortBy } from 'lodash-es';
  import type { ThemeNode } from './types';

  export let node: ThemeNode;
</script>

<!-- {#if node.values}
    {@const keys = sortBy(Object.keys(node.values))}
    {#each keys as key}
      <TreeItem value={`${node.bem}.${key}`}>
        <span slot="label">{node.values[key]}</span>
      </TreeItem>
    {/each}
  {/if} -->

{#if node.children.length > 0}
  <TreeItem value={`${node.bem}.${node.name}`}>
    <span slot="label">{node.name}</span>
    {@const children = sortBy(node.children, 'name')}
    {#each children as child}
      <svelte:self node={child} />
    {/each}
  </TreeItem>
{:else}
  <TreeItem value={`${node.bem}.${node.name}`}>
    <span slot="label">{node.name}</span>
  </TreeItem>
{/if}
