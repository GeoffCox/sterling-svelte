<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Select from '$lib/inputs/Select.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import Playground from '../Playground.svelte';

  import { countries } from '../../_sampleData/countries';
  import { random } from 'lodash-es';
  import Button from '$lib/buttons/Button.svelte';
  import ListItem from '$lib/containers/ListItem.svelte';

  let exampleRef: any;

  let open = false;
  let items = countries;

  let selectedValue: string | undefined = items[random(0, items.length - 1)];
  let disabled = false;
  let label = 'COUNTRIES';
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Select
      bind:open
      bind:selectedValue
      {items}
      {disabled}
      on:select={(event) => {
        exampleRef.recordEvent(`select:${event.detail.value}`);
      }}
      on:pending={(event) => {
        exampleRef.recordEvent(`pending:${event.detail.value}`);
      }}
    >
      <svelte:fragment slot="label">{label}</svelte:fragment>
      {#each items as item}
        <ListItem value={item} />
      {/each}
    </Select>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={label}><span slot="label">LABEL</span></Input>
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
