<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import List from '$lib/List.svelte';
  import Input from '$lib/Input.svelte';
  import { countries } from '../../_sampleData/countries';
  import ListItem from '$lib/ListItem.svelte';
  import { debounce } from 'lodash-es';

  let exampleRef: any;

  let composed = false;
  let disabled = false;
  let horizontal = false;
  let label = 'COUNTRIES';
  let selectedValue: string | undefined = undefined;
  let selectedValueText: string | undefined = '';

  const updateSelectedValue = debounce((value?: string) => {
    selectedValue = value;
  }, 500);

  $: {
    updateSelectedValue(selectedValueText);
  }

  $: {
    selectedValueText = selectedValue;
  }
</script>

<Playground bind:this={exampleRef}>
  <div class="component" class:horizontal slot="component">
    <List
      bind:selectedValue
      {composed}
      {disabled}
      {horizontal}
      selectionKeys="tab"
      on:select={(event) => {
        exampleRef.recordEvent(`select:${event.detail.value}`);
      }}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
      {#each countries as country}
        <ListItem value={country}>{country}</ListItem>
      {/each}
    </List>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={composed}><span slot="label">composed</span></Checkbox>
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={horizontal}><span slot="label">horizontal</span></Checkbox>
    <Input bind:value={label}><span slot="label">label</span></Input>
    <Input bind:value={selectedValueText}><span slot="label">selectedValue</span></Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
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
