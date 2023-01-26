<script lang="ts">
  import { type CoffeeNode, coffeeTree } from '../../_sampleData/coffeeTree';

  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import Tree from '$lib/containers/Tree.svelte';
  import TreeNode from '$lib/containers/TreeNode.svelte';
  import type { TreeNodeData } from '$lib/containers/Tree.types';

  let exampleRef: any;

  let label = 'Coffee Menu';
  let selectedNode: any = undefined;
  let disabled = false;
  let selectedNodeId: string | undefined = undefined;

  const nodes = coffeeTree as TreeNodeData<CoffeeNode>[];

  const getNodeId = (node: TreeNodeData<CoffeeNode>) => node.name;
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <Tree bind:selectedNodeId {disabled} {getNodeId} {nodes}>
      <svelte:fragment slot="label">{label}</svelte:fragment>
      <svelte:fragment slot="nodeLabel" let:nodeId>{nodeId}</svelte:fragment>
    </Tree>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}><span slot="label">label slot</span></Input>
    <div>
      <Input bind:value={selectedNodeId}><span slot="label">selectedNodeId</span></Input>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedNode: {selectedNode?.name}</div>
  </svelte:fragment>
</Example>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 410px;
    justify-items: stretch;
  }
</style>
