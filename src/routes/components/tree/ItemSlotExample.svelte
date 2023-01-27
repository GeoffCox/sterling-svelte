<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { type CoffeeNode, coffeeTree } from '../../_sampleData/coffeeTree';

  import type { TreeNodeData } from '$lib/containers/Tree.types';
  import Tree from '$lib/containers/Tree.svelte';
  import { treeContextKey, treeNodeContextKey } from '$lib/containers/Tree.constants';

  const nodes = coffeeTree as TreeNodeData<CoffeeNode>[];

  const getNodeId = (node: TreeNodeData<CoffeeNode>) => node.name;

  const expandedNodeIdsStore = writable<string[]>([]);
  const selectedNodeIdStore = writable<string | undefined>();

  setContext(treeContextKey, {
    getNodeId,
    expandedNodeIds: expandedNodeIdsStore,
    selectedNodeId: selectedNodeIdStore
  });
  setContext(treeNodeContextKey, { parentNodeId: undefined, depth: 0 });
</script>

<div class="example">
  <Tree {nodes} {getNodeId}>
    <div slot="item" let:depth let:expanded let:hasChildren let:node let:selected>
      {@const padding = Array(depth).fill(' ')}
      <div class="item" class:selected>
        {#each padding as pad}
          &nbsp;
        {/each}
        {#if hasChildren}
          {#if expanded}
            <span>&#128071;</span>
          {:else}
            <span>&#128073;</span>
          {/if}
        {:else}
          <span>&#9749;</span>
        {/if}
        {node.name}
      </div>
    </div>
  </Tree>
</div>

<style>
  .example {
    width: 350px;
  }

  .item {
    padding: 0.1em;
  }

  .item:hover {
    background-color: rgba(120, 85, 20, 0.2);
  }
  .selected,
  .selected:hover {
    background-color: rgb(120, 85, 20);
  }
</style>
