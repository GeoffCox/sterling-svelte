<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import List from '$lib/List.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { debounce } from 'lodash-es';
  import type { ChangeEventHandler } from 'svelte/elements';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { countries } from '../../_shared/sampleData/countries';
  import Playground from '../Playground.svelte';
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
    if (selectedValue !== value) {
      selectedValue = value;
    }
  }, 500);

  const onSelectedValueInputChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateSelectedValue(event.currentTarget.value);
  };

  $effect(() => {
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
          console.log(`<List> onSelect value:${value}`);
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
      <Input value={selectedValueText} oninput={onSelectedValueInputChanged} />
    </Label>
    <VariantInput bind:class={variant} sterlingClasses={['composed']} />
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
