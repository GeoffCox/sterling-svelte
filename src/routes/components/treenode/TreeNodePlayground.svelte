<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { type CoffeeNode, coffeeTree } from '../../_sampleData/coffeeTree';

  import Button from '$lib/buttons/Button.svelte';
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import type { TreeNodeData } from '$lib/containers/Tree.types';
  import TreeNode from '$lib/containers/TreeNode.svelte';

  const nodes = coffeeTree as TreeNodeData<CoffeeNode>[];
  const node = nodes[0];

  const getNodeId = (node: TreeNodeData<CoffeeNode>) => node.name;

  let exampleRef: any;

  let disabled = false;
  let expandedNodeIdText: string;
  let selectedNodeId: string | undefined = undefined;

  const expandedNodeIdsStore = writable<string[]>([]);
  const selectedNodeIdStore = writable<string | undefined>();

  setContext('sterlingTree', {
    getNodeId,
    expandedNodeIds: expandedNodeIdsStore,
    selectedNodeId: selectedNodeIdStore
  });
  setContext('sterlingTreeNode', { parentNodeId: undefined, depth: 0 });

  const getExpandedNodeIds = () => {
    expandedNodeIdText = $expandedNodeIdsStore.join(',');
  };

  const setExpandedNodeIds = () => {
    expandedNodeIdsStore.set(expandedNodeIdText.split(',').filter(Boolean));
  };

  $: {
    selectedNodeIdStore.set(selectedNodeId);
  }

  $: {
    selectedNodeId = $selectedNodeIdStore;
  }
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeNode {disabled} nodeId={getNodeId(node)} {node} />
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <div class="edit-expanded">
      <Input bind:value={expandedNodeIdText}
        ><span slot="label">expandedNodeIds (comma separated)</span></Input
      >
      <Button on:click={getExpandedNodeIds}>Get</Button>
      <Button on:click={setExpandedNodeIds}>Set</Button>
    </div>
    <Input bind:value={selectedNodeId}><span slot="label">selectedNodeId</span></Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div class="expanded-status">expandedNodeIds: {$expandedNodeIdsStore.join(',')}</div>
  </svelte:fragment>
</Example>

<style>
  .edit-expanded {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    align-items: center;
    column-gap: 1em;
  }

  .expanded-status {
    max-width: 300px;
  }
</style>
