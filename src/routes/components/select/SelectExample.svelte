<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Select from '$lib/inputs/Select.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import Example from '../Example.svelte';

  import { countries } from '../../_sampleData/countries';

  let exampleRef: any;

  let items = countries;
  let selectedIndex: number;
  let selectedItem: any;
  let disabled = false;
  let label = 'COUNTRIES';
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <Select
      bind:selectedIndex
      bind:selectedItem
      {items}
      {disabled}
      on:itemSelected={(event) => {
        exampleRef.recordEvent(
          `itemSelected index:[${event.detail.index}] item:${items[event.detail.index]}`
        );
      }}
      on:itemSelectPending={(event) => {
        exampleRef.recordEvent(
          `itemSelectPending index:[${event.detail.index}] item:${items[event.detail.index]}`
        );
      }}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
    </Select>
  </div>
  <svelte:fragment slot="options">
    <div />
    <div>
      <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    </div>
    <div />
    <div>
      <Input bind:value={label}><span slot="label">LABEL</span></Input>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedIndex: {selectedIndex}</div>
    <div>selectedItem: {selectedItem}</div>
  </svelte:fragment>
</Example>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    justify-items: stretch;
    min-width: 20ch;
  }
</style>
