<script lang="ts">
  import { type CoffeeNode, coffeeTree } from '../../_sampleData/coffeeTree';

  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import Tree from '$lib/containers/Tree.svelte';
  import type { TreeNodeData } from '$lib/containers/Tree.types';
  import Button from '$lib/buttons/Button.svelte';

  let exampleRef: any;
  let treeRef: Tree<CoffeeNode>;

  let disabled = false;
  let label = 'Coffee Menu';
  let selectedNodeId: string | undefined = undefined;
  let expandedNodeIds: string[] = [];
  let expandedNodeIdsText: string;

  const nodes = coffeeTree as TreeNodeData<CoffeeNode>[];

  const getNodeId = (node: TreeNodeData<CoffeeNode>) => node.name;

  const getExpandedNodeIds = () => {
    expandedNodeIdsText = expandedNodeIds.join(',');
  };

  const setExpandedNodeIds = () => {
    expandedNodeIds = expandedNodeIdsText.split(',').filter(Boolean);
  };

  const collapseAll = () => treeRef?.collapseAll();
  const expandAll = () => treeRef?.expandAll();
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Tree
      bind:this={treeRef}
      bind:selectedNodeId
      {disabled}
      {getNodeId}
      {nodes}
      bind:expandedNodeIds
      on:select={() => exampleRef.recordEvent('select')}
      on:expandCollapse={() => exampleRef.recordEvent('expandCollapse')}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
      <svelte:fragment slot="nodeLabel" let:nodeId>{nodeId}</svelte:fragment>
    </Tree>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}><span slot="label">label slot</span></Input>
    <Input bind:value={selectedNodeId}><span slot="label">selectedNodeId</span></Input>
    <div class="edit-toggled">
      <Input bind:value={expandedNodeIdsText}
        ><span slot="label">expandedNodeIds (comma separated)</span></Input
      >
      <Button on:click={getExpandedNodeIds}>Get</Button>
      <Button on:click={setExpandedNodeIds}>Set</Button>
    </div>
    <Button on:click={collapseAll}>Collapse All</Button>
    <Button on:click={expandAll}>Expand All</Button>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedNodeId: {selectedNodeId}</div>
    <div class="toggled-status">
      expandedNodeIds: {expandedNodeIds.join(',')}
    </div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    height: 450px;
  }

  .edit-toggled {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    align-items: center;
    column-gap: 1em;
  }
  .toggled-status {
    max-width: 300px;
    overflow: hidden;
  }
</style>
