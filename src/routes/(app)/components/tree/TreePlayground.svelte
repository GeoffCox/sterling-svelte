<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';

  import { coffeeTree } from '../../_sampleData/coffeeTree';

  import Button from '$lib/Button.svelte';
  import CoffeeTreeItem from './CoffeeTreeItem.svelte';
  import Label from '$lib/Label.svelte';
  import Tree from '$lib/Tree.svelte';

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
    <Label text="expandedValues (comma separated)">
      <Input bind:value={expandedValuesText} />
    </Label>
    <div class="edit-toggled">
      <Button shape="circular" on:click={getExpandedValues}>Get</Button>
      <Button shape="circular" on:click={setExpandedValues}>Set</Button>
    </div>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} />
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
    display: flex;
    justify-items: flex-end;
    justify-self: flex-end;
    align-items: center;
    column-gap: 1em;
  }
  .toggled-status {
    max-width: 300px;
    overflow: hidden;
  }
</style>
