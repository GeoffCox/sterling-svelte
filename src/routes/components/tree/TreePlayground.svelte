<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import Tree from '$lib/containers/Tree.svelte';
  import TreeNode from '$lib/containers/TreeNode.svelte';
  import Button from '$lib/buttons/Button.svelte';

  let exampleRef: any;
  let treeRef: Tree;

  let disabled = false;
  let label = 'Coffee Menu';
  let selectedNodeId: string | undefined = undefined;
  let expandedNodeIds: string[] = [];
  let expandedNodeIdsText: string;

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
      bind:expandedNodeIds
      on:select={() => exampleRef.recordEvent('select')}
      on:expandCollapse={() => exampleRef.recordEvent('expandCollapse')}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
      <TreeNode nodeId="Coffees">
        <TreeNode nodeId="Americano" />
        <TreeNode nodeId="Brewed">
          <TreeNode nodeId="Light roast" />
          <TreeNode nodeId="Medium roast" />
          <TreeNode nodeId="Dark roast" />
          <TreeNode nodeId="House blend" />
        </TreeNode>
        <TreeNode nodeId="Cappuccino" />
        <TreeNode nodeId="Espresso" />
        <TreeNode nodeId="Latte" />
        <TreeNode nodeId="Macchiato" />
        <TreeNode nodeId="Mochas">
          <TreeNode nodeId="Dark Chocolate Mocha" />
          <TreeNode nodeId="White Chocolate Mocha" />
          <TreeNode nodeId="Peppermint Chocolate Mocha" />
        </TreeNode>
        <TreeNode nodeId="Add-ins">
          <TreeNode nodeId="Milks">
            <TreeNode nodeId="Almond Milk" />
            <TreeNode nodeId="Fat Free  Milk" />
            <TreeNode nodeId="Non-dairy Creamer" />
            <TreeNode nodeId="Soy Milk" />
            <TreeNode nodeId="Two percent Milk" />
            <TreeNode nodeId="Whole Milk" />
          </TreeNode>
          <TreeNode nodeId="Syrups">
            <TreeNode nodeId="Almond syrup" />
            <TreeNode nodeId="Hazelnut syrup" />
            <TreeNode nodeId="Irish Creme syrup" />
            <TreeNode nodeId="Vanilla syrup" />
          </TreeNode>
          <TreeNode nodeId="Toppings">
            <TreeNode nodeId="Caramel" />
            <TreeNode nodeId="Cinnamon" />
            <TreeNode nodeId="Vanilla Flakes" />
          </TreeNode>
        </TreeNode>
      </TreeNode>
      <TreeNode nodeId="Teas" />
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
    min-width: 400px;
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
