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
    <div slot="nodeLabel" let:hasChildren let:node>
      {#if hasChildren}
        <span class="category">{node.name}</span>
      {:else}
        <span class="product">{node.name}</span>
      {/if}
    </div>
  </Tree>
</div>

<style>
  .example {
    width: 350px;
  }

  .category {
    font-size: 1.1em;
    font-weight: bold;
  }

  .product {
    font-style: italic;
  }
</style>
