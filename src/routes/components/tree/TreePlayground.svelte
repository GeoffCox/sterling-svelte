<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import Tree from '$lib/containers/Tree.svelte';
  import TreeItem from '$lib/containers/TreeItem.svelte';
  import Button from '$lib/buttons/Button.svelte';
  import CoffeeTreeItem from './CoffeeTreeItem.svelte';
  import { coffeeTree } from '../..//_sampleData/coffeeTree';
  import { each } from 'svelte/internal';

  let exampleRef: any;

  let disabled = false;
  let label = 'Coffee Menu';
  let selectedValue: string | undefined = undefined;
  let expandedValues: string[] = [];
  let expandedValuesText: string;

  const getExpandedValues = () => {
    expandedValuesText = expandedValues.join(',');
  };

  const setExpandedValues = () => {
    expandedValues = expandedValuesText.split(',').filter(Boolean);
  };
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Tree
      bind:selectedValue
      {disabled}
      bind:expandedValues
      on:select={() => exampleRef.recordEvent('select')}
      on:expandCollapse={() => exampleRef.recordEvent('expandCollapse')}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
      {#each coffeeTree as coffeeItem}
        <CoffeeTreeItem {coffeeItem} />
      {/each}
    </Tree>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}><span slot="label">label slot</span></Input>
    <Input bind:value={selectedValue}><span slot="label">selectedValue</span></Input>
    <div class="edit-toggled">
      <Input bind:value={expandedValuesText}
        ><span slot="label">expandedValues (comma separated)</span></Input
      >
      <Button on:click={getExpandedValues}>Get</Button>
      <Button on:click={setExpandedValues}>Set</Button>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
    <div class="toggled-status">
      expandedValues: {expandedValues.join(',')}
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
