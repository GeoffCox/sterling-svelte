<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Tree from '$lib/containers/Tree.svelte';
  import type { FlatTreeNode, TreeNode } from '$lib';
  import Input from '$lib/inputs/Input.svelte';
  import { treeOfLife } from '../../_sampleData/treeOfLife';

  let exampleRef: any;

  const nodes = treeOfLife;
  let label = 'TREE OF LIFE';
  let selectedIndex = 0;
  let selectedNode: any = undefined;
  let disabled = false;
  let horizontal = false;

  type LifeData = { name: string };

  $: treeNodes = nodes as TreeNode<LifeData>[];

  const getTreeItem = (item: any) => item as FlatTreeNode<LifeData>;
</script>

<Example bind:this={exampleRef}>
  <div class="component" class:horizontal slot="component">
    <Tree
      bind:selectedNode
      nodes={treeNodes}
      {disabled}
      let:item
      let:index
      on:nodeCollapsed={(event) => {
        exampleRef.recordEvent(`nodeCollapsed: ${event.detail.node.name}`);
      }}
      on:nodeExpanded={(event) => {
        exampleRef.recordEvent(`nodeExpanded: ${event.detail.node.name}`);
      }}
      on:nodeSelected={(event) => {
        exampleRef.recordEvent(`nodeSelected: ${event.detail.node.name}`);
      }}
    >
      <div style="padding-top:0.25em">
        {index}
        {item.node.name}
      </div>
      <svelte:fragment slot="label">{label}</svelte:fragment>
    </Tree>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}>label</Input>
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

  .component.horizontal {
    width: 410px;
    height: unset;
    flex-direction: row;
  }
</style>
