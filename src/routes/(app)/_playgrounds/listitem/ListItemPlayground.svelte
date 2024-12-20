<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { setContext } from 'svelte';
  import type { ListContext } from '$lib';
  import { LIST_CONTEXT_KEY } from '$lib/List.constants';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled: boolean | undefined | null = $state(false);
  let horizontal: boolean | undefined | null = $state(false);
  let selected: boolean | undefined | null = $state(false);
  let selectedValue: string = $state('');
  let text = $state('sterling-svelte');
  let value = $state('item1');

  let listContext: ListContext = $state({
    disabled: false,
    horizontal: false,
    selectedValue: ''
  });

  setContext<ListContext>(LIST_CONTEXT_KEY, listContext);

  $effect(() => {
    selectedValue = selected ? value : '';
  });

  $effect(() => {
    listContext.horizontal = horizontal;
  });

  $effect(() => {
    listContext.selectedValue = selectedValue;
  });

  let code = $derived(
    getPlaygroundCode({
      disabled,
      text,
      value,
      _class: _class
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <ListItem {disabled} {value} class={_class}>{text}</ListItem>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:class={_class} availableVariants={[]} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>
