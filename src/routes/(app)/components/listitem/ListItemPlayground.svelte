<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { setContext } from 'svelte';
  import { readable, writable } from 'svelte/store';
  import type { ListContext } from '$lib';
  import { LIST_CONTEXT_KEY } from '$lib/List.constants';
  import Label from '$lib/Label.svelte';

  let exampleRef: any;

  let colorful = false;
  let disabled = false;
  let selected = false;
  let text = 'Sterling';

  const colorfulStore = writable<boolean>(colorful);
  const disabledStore = writable<boolean>(false);
  const selectedValueStore = writable<string | undefined>('');

  setContext<ListContext>(LIST_CONTEXT_KEY, {
    colorful: colorfulStore,
    disabled: disabledStore,
    selectedValue: selectedValueStore
  });

  $: {
    colorfulStore.set(colorful);
  }

  $: {
    selected ? selectedValueStore.set('sterling') : selectedValueStore.set('');
  }
</script>

<Playground bind:this={exampleRef} noEvents>
  <svelte:fragment slot="component">
    <ListItem {colorful} {disabled} value="sterling">{text}</ListItem>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={selected}>selected</Checkbox>
  </svelte:fragment>
</Playground>
