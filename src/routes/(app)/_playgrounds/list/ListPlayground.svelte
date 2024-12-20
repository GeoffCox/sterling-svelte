<svelte:options runes={true} />

<script lang="ts">
  import { run } from 'svelte/legacy';

  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import List from '$lib/List.svelte';
  import Input from '$lib/Input.svelte';
  import { countries } from '../../_shared/sampleData/countries';
  import ListItem from '$lib/ListItem.svelte';
  import { debounce } from 'lodash-es';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | undefined | null = $state(false);
  let horizontal: boolean | undefined | null = $state(false);
  let selectedValue: string | undefined = $state(undefined);
  let selectedValueText: string | undefined = $state(undefined);
  let variant = $state('');

  let code = $derived(
    getPlaygroundCode({
      disabled,
      horizontal,
      selectedValue,
      variant
    })
  );

  const updateSelectedValue = debounce((value?: string) => {
    selectedValue = value;
  }, 500);

  run(() => {
    updateSelectedValue(selectedValueText);
  });

  run(() => {
    selectedValueText = selectedValue;
  });
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component" class:horizontal>
      <List
        bind:selectedValue
        {disabled}
        {horizontal}
        class={variant}
        onSelect={(value) => {
          console.log(`select:${value}`);
        }}
      >
        {#each countries as country}
          <ListItem value={country}>{country}</ListItem>
        {/each}
      </List>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={horizontal}>horizontal</Checkbox>
    <Label text="selectedValue">
      <Input bind:value={selectedValueText} />
    </Label>
    <VariantInput bind:class={variant} availableVariants={['composed']} />
  {/snippet}
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
