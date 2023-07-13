<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';

  import { TAB_LIST_CONTEXT_KEY } from '$lib/TabList.constants';
  import Tab from '$lib/Tab.svelte';
  import Label from '$lib/Label.svelte';

  // ----- Context ----- //

  const selectedValueStore = writable<string | undefined>();
  const verticalStore = writable<boolean>(false);
  const disabledStore = writable<boolean>(false);

  setContext(TAB_LIST_CONTEXT_KEY, {
    disabled: disabledStore,
    selectedValue: selectedValueStore,
    vertical: verticalStore
  });

  let exampleRef: any;

  const value = 'example-tab';
  let text = 'sterling-svelte';
  let disabled = false;
  let selected = false;
  let vertical = false;

  $: {
    verticalStore.set(vertical);
  }

  $: {
    selectedValueStore.set(selected ? value : undefined);
  }

  $: {
    selected = $selectedValueStore === value;
  }
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Tab {value} {disabled} {text} />
  </svelte:fragment>>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Label text="text">
      <Input bind:value={text} composed />
    </Label>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
</Playground>
