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
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | undefined | null = false;
  let horizontal: boolean | undefined | null = false;
  let selectedValue: string | undefined = undefined;
  let selectedValueText: string | undefined = undefined;
  let variant = '';

  $: code = getPlaygroundCode({
    disabled,
    horizontal,
    selectedValue,
    variant
  });

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

<Playground {code}>
  <div class="component" class:horizontal slot="component">
    <List
      bind:selectedValue
      {disabled}
      {horizontal}
      class={variant}
      onselect={(value) => {
        console.log(`select:${value}`);
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
