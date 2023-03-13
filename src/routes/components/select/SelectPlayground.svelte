<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';

  import Playground from '../Playground.svelte';

  import { countries } from '../../_sampleData/countries';
  import { random } from 'lodash-es';
  import Button from '$lib/Button.svelte';
  import ListItem from '$lib/ListItem.svelte';

  let exampleRef: any;

  let composed = false;
  let open = false;
  let items = countries;

  let selectedValue: string | undefined = items[random(0, items.length - 1)];
  let disabled = false;
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Select
      {composed}
      {disabled}
      {items}
      bind:open
      bind:selectedValue
      on:select={(event) => {
        exampleRef.recordEvent(`select:${event.detail.value}`);
      }}
      on:pending={(event) => {
        exampleRef.recordEvent(`pending:${event.detail.value}`);
      }}
    >
      {#each items as item}
        <ListItem value={item} />
      {/each}
    </Select>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={composed}>composed</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Button on:click={() => (selectedValue = undefined)}>selectedValue = undefined</Button>
    <Button on:click={() => (selectedValue = items[random(0, items.length - 1)])}
      >selectedValue = random()</Button
    >
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>open: {open}</div>
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    justify-items: stretch;
    min-width: 25ch;
  }
</style>
