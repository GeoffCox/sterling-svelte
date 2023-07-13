<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';

  import Tree from '$lib/Tree.svelte';
  import Button from '$lib/Button.svelte';
  import CoffeeTreeItem from './CoffeeTreeItem.svelte';
  import { coffeeTree } from '../../_sampleData/coffeeTree';
  import Label from '$lib/Label.svelte';

  let exampleRef: any;

  let colorful = false;
  let composed = false;
  let disabled = false;
  let expandedValues: string[] = [];
  let expandedValuesText: string;
  let selectedValue: string | undefined = undefined;

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
      {colorful}
      {composed}
      {disabled}
      bind:expandedValues
      on:select={() => exampleRef.recordEvent('select')}
      on:expandCollapse={() => exampleRef.recordEvent('expandCollapse')}
    >
      {#each coffeeTree as coffeeItem}
        <CoffeeTreeItem {coffeeItem} />
      {/each}
    </Tree>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={composed}>composed</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <div class="edit-toggled">
      <Label text="expandedValues (comma separated)">
        <Input bind:value={expandedValuesText} composed />
      </Label>
      <Button on:click={getExpandedValues}>Get</Button>
      <Button on:click={setExpandedValues}>Set</Button>
    </div>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} composed />
    </Label>
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
