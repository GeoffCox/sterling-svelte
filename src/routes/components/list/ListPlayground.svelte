<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import List from '$lib/containers/List.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import { countries } from '../../_sampleData/countries';
  import ListItem from '$lib/containers/ListItem.svelte';
  import { debounce } from 'lodash-es';

  let exampleRef: any;

  let label = 'COUNTRIES';
  let disabled = false;
  let horizontal = false;
  let composed = false;
  let selectedItemIdText = '';
  let selectedItemId = '';

  const updateSelectedItemId = debounce((itemId: string) => {
    selectedItemId = itemId;
  }, 500);

  $: {
    updateSelectedItemId(selectedItemIdText);
  }

  $: {
    selectedItemIdText = selectedItemId;
  }
</script>

<Playground bind:this={exampleRef}>
  <div class="component" class:horizontal slot="component">
    <List
      bind:selectedItemId
      {composed}
      {disabled}
      {horizontal}
      selectionKeys="tab"
      on:select={(event) => {
        exampleRef.recordEvent(`itemSelected:[${event.detail.itemId}]`);
      }}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
      {#each countries as country}
        <ListItem itemId={country}>{country}</ListItem>
      {/each}
    </List>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={horizontal}><span slot="label">horizontal</span></Checkbox>
    <Checkbox bind:checked={composed}><span slot="label">composed</span></Checkbox>
    <Input bind:value={label}><span slot="label">label</span></Input>
    <Input bind:value={selectedItemIdText}><span slot="label">selectedItemId</span></Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedItemId: {selectedItemId}</div>
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
