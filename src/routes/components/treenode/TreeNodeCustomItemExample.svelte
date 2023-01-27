<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { type CoffeeNode, coffeeTree } from '../../_sampleData/coffeeTree';

  import type { TreeNodeData } from '$lib/containers/Tree.types';
  import TreeNode from '$lib/containers/TreeNode.svelte';

  const nodes = coffeeTree as TreeNodeData<CoffeeNode>[];
  const node = nodes[0];

  const getNodeId = (node: TreeNodeData<CoffeeNode>) => node.name;

  let exampleRef: any;

  const expandedNodeIdsStore = writable<string[]>([]);
  const selectedNodeIdStore = writable<string | undefined>();

  setContext('sterlingTree', {
    getNodeId,
    expandedNodeIds: expandedNodeIdsStore,
    selectedNodeId: selectedNodeIdStore
  });
  setContext('sterlingTreeNode', { parentNodeId: undefined, depth: 0 });
</script>

<TreeNode nodeId={getNodeId(node)} {node}>
  <div slot="item" let:expanded let:hasChildren let:node let:depth>
    {@const padding = Array(depth).fill(' ')}
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
</TreeNode>
