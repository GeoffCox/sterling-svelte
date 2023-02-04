<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';

  import { tabListContextKey } from '$lib/containers/Tabs.constants';
  import MenuItem from '$lib/containers/MenuItem.svelte';

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

  const menuItemId = 'tabId';
  let text = 'File';
  let disabled = false;
  let selected = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <MenuItem {menuItemId} {disabled} {text}>
      <MenuItem menuItemId="new-file" text="New File..." />
      <MenuItem menuItemId="open-file" text="Open..." />
      <MenuItem menuItemId="open-folder" text="Open Folder..." />
      <MenuItem menuItemId="open-recent" text="Open Recent">
        <MenuItem menuItemId="recent-1" text="My document 1" />
        <MenuItem menuItemId="recent-2" text="My document 2" />
        <MenuItem menuItemId="recent-3" text="My document 3" />
        <MenuItem menuItemId="recent-4" text="My document 4" />
        <MenuItem menuItemId="recent-5" text="My document 5" />
      </MenuItem>
      <MenuItem menuItemId="save" text="Save" />
      <MenuItem menuItemId="save-all" text="Save All" />
      <MenuItem menuItemId="close-file" text="Close File" />
      <MenuItem menuItemId="close-folder" text="Close Folder" />
      <MenuItem menuItemId="quit" text="Quit" />
    </MenuItem>
  </svelte:fragment>>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={selected}><span slot="label">selected</span></Checkbox>
    <Input bind:value={text}><span slot="label">text</span></Input>
  </svelte:fragment>
</Playground>
