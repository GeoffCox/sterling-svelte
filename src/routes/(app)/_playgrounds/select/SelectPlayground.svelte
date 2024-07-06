<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';

  import Playground from '../Playground.svelte';

  import { countries } from '../../_shared/sampleData/countries';
  import { random } from 'lodash-es';
  import Button from '$lib/Button.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';

  let open = false;
  let items = countries;

  let selectedValue: string | undefined = items[random(0, items.length - 1)];
  let disabled = false;
  let listVariant = '';
  let variant = '';

  $: code = getPlaygroundCode({ disabled, open, listVariant, variant });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Select
      {disabled}
      {listVariant}
      {variant}
      bind:open
      bind:selectedValue
      on:select={(event) => {
        console.log(`select:${event.detail.value}`);
      }}
      on:pending={(event) => {
        console.log(`pending:${event.detail.value}`);
      }}
    >
      {#each items as item}
        <ListItem value={item} />
      {/each}
    </Select>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} />
    </Label>
    <Button on:click={() => (selectedValue = undefined)}>selectedValue = undefined</Button>
    <Button on:click={() => (selectedValue = items[random(0, items.length - 1)])}
      >selectedValue = random()</Button
    >

    <VariantInput bind:variant={listVariant} availableVariants={[]} labelText="listVariant" />
    <VariantInput bind:variant availableVariants={['colorful', 'composed']} />
  </svelte:fragment>
  <!-- <svelte:fragment slot="status">
    <div>open: {open}</div>
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment> -->
</Playground>
