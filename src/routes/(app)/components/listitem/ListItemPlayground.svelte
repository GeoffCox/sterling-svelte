<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { ListContext } from '$lib';
  import { LIST_CONTEXT_KEY } from '$lib/List.constants';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;

  let disabled = false;
  let horizontal = false;
  let selected = false;
  let text = 'Sterling';

  const selectedValueStore = writable<string | undefined>('');
  const horizontalStore = writable<boolean>(horizontal);
  const disabledStore = writable<boolean>(disabled);

  setContext<ListContext>(LIST_CONTEXT_KEY, {
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
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="text">
      <Input bind:value={text} composed />
    </Field>
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={selected}>selected</Checkbox>
  </svelte:fragment>
</Playground>
