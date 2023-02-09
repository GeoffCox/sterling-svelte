<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/containers/MenuItem.svelte';

  let exampleRef: any;

  let disabled = false;

  const onSelected = (event: any) => {
    const selectedEvent = event as svelte.JSX.MenuItemSelectedEvent;
    exampleRef.recordEvent(`selected ${selectedEvent.detail.menuItemId}`);
  };
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <div class="menu">
      <MenuItem menuItemId="file" {disabled} text="File" on:menuitem_selected={onSelected}>
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
      <MenuItem menuItemId="edit" {disabled} text="Edit">
        <MenuItem menuItemId="undo" text="Undo" />
        <MenuItem menuItemId="redo" text="Redo" />
        <MenuItem menuItemId="cut" text="Cut" />
        <MenuItem menuItemId="copy" text="Copy" />
        <MenuItem menuItemId="paste" text="Paste" />
      </MenuItem>
    </div>
  </svelte:fragment>>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .menu {
    display: flex;
    gap: 1em;
  }
</style>
