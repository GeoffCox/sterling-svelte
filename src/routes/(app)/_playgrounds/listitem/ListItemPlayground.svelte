<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../../components/Playground.svelte';
  import Input from '$lib/Input.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { setContext } from 'svelte';
  import { readable, writable } from 'svelte/store';
  import type { ListContext } from '$lib';
  import { LIST_CONTEXT_KEY } from '$lib/List.constants';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled = false;
  let selected = false;
  let text = 'sterling-svelte';
  let value = 'item-1';
  let variant = '';

  const disabledStore = writable<boolean>(false);
  const selectedValueStore = writable<string | undefined>('');

  setContext<ListContext>(LIST_CONTEXT_KEY, {
    disabled: disabledStore,
    selectedValue: selectedValueStore
  });

  $: {
    selected ? selectedValueStore.set('sterling') : selectedValueStore.set('');
  }

  $: code = getPlaygroundCode({
    disabled,
    selected,
    text,
    value,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <ListItem {disabled} value="sterling" {variant}>{text}</ListItem>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  </svelte:fragment>
</Playground>
