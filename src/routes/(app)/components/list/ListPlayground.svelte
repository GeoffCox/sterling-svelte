<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import List from '$lib/List.svelte';
  import Input from '$lib/Input.svelte';
  import { countries } from '../../_shared/sampleData/countries';
  import ListItem from '$lib/ListItem.svelte';
  import { debounce } from 'lodash-es';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;

  let disabled = false;
  let horizontal = false;
  let selectedValue: string | undefined = undefined;
  let selectedValueText: string | undefined = undefined;
  let variant = '';

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
      {disabled}
      {horizontal}
      selectionKeys="tab"
      {variant}
      on:select={(event) => {
        exampleRef.recordEvent(`select:${event.detail.value}`);
      }}
    >
      {#each countries as country}
        <ListItem value={country}>{country}</ListItem>
      {/each}
    </List>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={horizontal}>horizontal</Checkbox>
    <Label text="selectedValue">
      <Input bind:value={selectedValueText} />
    </Label>
    <VariantInput bind:variant availableVariants={['composed']} />
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
