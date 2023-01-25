<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Tree2 from '$lib/containers/Tree2.svelte';
  import TreeItem2 from '$lib/containers/TreeItem2.svelte';
  import type { FlatTreeNode, TreeNode } from '$lib';
  import Input from '$lib/inputs/Input.svelte';
  import { treeOfLife } from '../../_sampleData/treeOfLife';

  let exampleRef: any;

  const nodes = treeOfLife;
  let label = 'TREE OF LIFE';
  let selectedNode: any = undefined;
  let disabled = false;

  type LifeData = { name: string };

  $: treeNodes = nodes as TreeNode<LifeData>[];

  const getTreeItem = (item: any) => item as FlatTreeNode<LifeData>;
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <Tree2>
      <TreeItem2 nodeId="A">
        <svelte:fragment slot="label">Tree Node A</svelte:fragment>
        <svelte:fragment slot="children">
          <TreeItem2 nodeId="A1">
            <svelte:fragment slot="label">Tree Node A1</svelte:fragment>
          </TreeItem2>
          <TreeItem2 nodeId="A2">
            <svelte:fragment slot="label">Tree Node A2</svelte:fragment>
          </TreeItem2>
          <TreeItem2 nodeId="A3">
            <svelte:fragment slot="label">Tree Node A3</svelte:fragment>
          </TreeItem2>
          <TreeItem2 nodeId="A4">
            <svelte:fragment slot="label">Tree Node A4</svelte:fragment>
          </TreeItem2>
        </svelte:fragment>
      </TreeItem2>
      <TreeItem2 nodeId="B">
        <svelte:fragment slot="label">Tree Node B</svelte:fragment>
        <svelte:fragment slot="children">
          <TreeItem2 nodeId="B1">
            <svelte:fragment slot="label">Tree Node B1</svelte:fragment>
            <svelte:fragment slot="children">
              <TreeItem2 nodeId="B1A">
                <svelte:fragment slot="label">Tree Node B1A</svelte:fragment>
                <svelte:fragment slot="children">
                  <TreeItem2 nodeId="B1A1">
                    <svelte:fragment slot="label">Tree Node B1A1</svelte:fragment>
                  </TreeItem2>
                  <TreeItem2 nodeId="B1A2">
                    <svelte:fragment slot="label">Tree Node B1A2</svelte:fragment>
                  </TreeItem2>
                  <TreeItem2 nodeId="B1A3">
                    <svelte:fragment slot="label">Tree Node B1A3</svelte:fragment>
                  </TreeItem2>
                  <TreeItem2 nodeId="B1A4">
                    <svelte:fragment slot="label">Tree Node B1A4</svelte:fragment>
                  </TreeItem2>
                </svelte:fragment>
              </TreeItem2>
            </svelte:fragment>
          </TreeItem2>
          <TreeItem2 nodeId="B2">
            <svelte:fragment slot="label">Tree Node B2</svelte:fragment>
          </TreeItem2>
          <TreeItem2 nodeId="B3">
            <svelte:fragment slot="label">Tree Node B3</svelte:fragment>
          </TreeItem2>
          <TreeItem2 nodeId="B4">
            <svelte:fragment slot="label">Tree Node B4</svelte:fragment>
          </TreeItem2>
        </svelte:fragment>
      </TreeItem2>
    </Tree2>
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
</style>
