<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import { tabListContextKey } from '$lib/containers/Tabs.constants';
  import Tab from '$lib/containers/Tab.svelte';

  // ----- Context ----- //

  const selectedTabIdStore = writable<string | undefined>();
  const selectionFollowsFocusStore = writable<boolean>(false);
  const verticalStore = writable<boolean>(false);
  const disabledStore = writable<boolean>(false);

  setContext(tabListContextKey, {
    disabled: disabledStore,
    selectedTabId: selectedTabIdStore,
    selectionFollowsFocus: selectionFollowsFocusStore,
    vertical: verticalStore
  });

  let exampleRef: any;

  const tabId = 'tabId';
  let text = 'sterling-svelte';
  let disabled = false;
  let selected = false;
  let vertical = false;

  $: {
    verticalStore.set(vertical);
  }

  $: {
    selectedTabIdStore.set(selected ? tabId : undefined);
  }

  $: {
    selected = $selectedTabIdStore === tabId;
  }
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Tab {tabId} {disabled} {text} />
  </svelte:fragment>>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={selected}><span slot="label">selected</span></Checkbox>
    <Input bind:value={text}><span slot="label">text</span></Input>
    <Checkbox bind:checked={vertical}><span slot="label">vertical</span></Checkbox>
  </svelte:fragment>
</Playground>
