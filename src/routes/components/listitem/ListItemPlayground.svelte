<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import ListItem from '$lib/containers/ListItem.svelte';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { ListContext } from '$lib/containers/List.types';
  import { listContextKey } from '$lib/containers/List.constants';

  let exampleRef: any;

  let disabled = false;
  let horizontal = false;
  let selected = false;
  let text = 'Sterling';

  const selectedValueStore = writable<string | undefined>('');
  const horizontalStore = writable<boolean>(horizontal);
  const disabledStore = writable<boolean>(disabled);

  setContext<ListContext>(listContextKey, {
    disabled: disabledStore,
    selectedValue: selectedValueStore,
    horizontal: horizontalStore
  });

  $: {
    disabledStore.set(disabled);
  }

  $: {
    selected ? selectedValueStore.set('sterling') : selectedValueStore.set('');
  }
</script>

<Playground bind:this={exampleRef}>
  <div class="component" class:horizontal slot="component">
    <ListItem value="sterling">{text}</ListItem>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value={text}><span slot="label">(text content)</span></Input>
    <Checkbox bind:checked={selected}><span slot="label">selected</span></Checkbox>
  </svelte:fragment>
</Playground>
