<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';

  import { TAB_LIST_CONTEXT_KEY } from '$lib/TabList.constants';
  import Tab from '$lib/Tab.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  // ----- Context ----- //

  let exampleRef: any;

  const value = 'example-tab';
  let text = 'sterling-svelte';
  let disabled = false;
  let selected = false;
  let variant = '';
  let vertical = false;

  const selectedValueStore = writable<string | undefined>();
  const verticalStore = writable<boolean>(vertical);
  const disabledStore = writable<boolean>(disabled);

  $: {
    selectedValueStore.set(selected ? value : undefined);
  }

  $: {
    selected = $selectedValueStore === value;
  }

  setContext(TAB_LIST_CONTEXT_KEY, {
    disabled: disabledStore,
    selectedValue: selectedValueStore,
    vertical: verticalStore
  });

  $: verticalStore.set(vertical);
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Tab {disabled} {text} {value} {variant} />
  </svelte:fragment>>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
</Playground>
