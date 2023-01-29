<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import List from '$lib/containers/List.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import { countries } from '../../_sampleData/countries';

  let exampleRef: any;

  const items = countries;
  let label = 'COUNTRIES';
  let selectedIndex = 0;
  let selectedItem = items[0];
  let disabled = false;
  let horizontal = false;
  let composed = false;
</script>

<Playground bind:this={exampleRef}>
  <div class="component" class:horizontal slot="component">
    <List
      bind:selectedIndex
      bind:selectedItem
      {composed}
      {disabled}
      {items}
      {horizontal}
      selectionKeys="tab"
      on:itemSelected={(event) => {
        exampleRef.recordEvent(
          `itemSelected index:[${event.detail.index}] item:${event.detail.item}`
        );
      }}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
    </List>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={horizontal}><span slot="label">horizontal</span></Checkbox>
    <Checkbox bind:checked={composed}><span slot="label">composed</span></Checkbox>
    <Input bind:value={label}><span slot="label">label</span></Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedIndex: {selectedIndex}</div>
    <div>selectedItem: {selectedItem}</div>
  </svelte:fragment>
</Playground>

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
