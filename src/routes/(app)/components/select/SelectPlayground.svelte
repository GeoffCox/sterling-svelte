<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';

  import Playground from '../Playground.svelte';

  import { countries } from '../../_sampleData/countries';
  import { random } from 'lodash-es';
  import Button from '$lib/Button.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;

  let open = false;
  let items = countries;

  let selectedValue: string | undefined = items[random(0, items.length - 1)];
  let disabled = false;
  let variant = '';
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Select
      {disabled}
      {items}
      {variant}
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
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Button on:click={() => (selectedValue = undefined)}>selectedValue = undefined</Button>
    <Button on:click={() => (selectedValue = items[random(0, items.length - 1)])}
      >selectedValue = random()</Button
    >
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>open: {open}</div>
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>
