<svelte:options runes={true} />

<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import { random } from 'lodash-es';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { countries } from '../../_shared/sampleData/countries';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let open: boolean | undefined | null = $state(false);
  let items = countries;
  let selectedValue: string | undefined = $state(items[random(0, items.length - 1)]);
  let disabled: boolean | undefined | null = $state(false);
  let listClass = $state('');
  let _class = $state('');

  let code = $derived(
    getPlaygroundCode({ disabled, open, listVariant: listClass, variant: _class })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <Select
      {disabled}
      {listClass}
      class={_class}
      bind:open
      bind:selectedValue
      onSelect={(value) => {
        console.log(`Select.onSelect value:${value}`);
      }}
      onPending={(value) => {
        console.log(`Select.onPending value:${value}`);
      }}
    >
      {#each items as item}
        <ListItem value={item} />
      {/each}
    </Select>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Label text="selectedValue">
      <Input bind:value={selectedValue} />
    </Label>
    <Button onclick={() => (selectedValue = undefined)}>selectedValue = undefined</Button>
    <Button onclick={() => (selectedValue = items[random(0, items.length - 1)])}
      >selectedValue = random()</Button
    >

    <VariantInput bind:class={listClass} sterlingClasses={[]} labelText="listVariant" />
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
  {/snippet}
</Playground>
