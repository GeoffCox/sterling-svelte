<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/containers/MenuItem.svelte';
  import MenuBar from '$lib/containers/MenuBar.svelte';

  let exampleRef: any;

  let disabled = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <MenuBar>
      <MenuItem
        menuItemId="file"
        {disabled}
        text="File"
        on:select={(event) => exampleRef.recordEvent(`selected ${event.detail.menuItemId}`)}
      >
        <MenuItem menuItemId="new-file" text="New File..." />
        <MenuItem menuItemId="open-file" text="Open..." />
        <MenuItem menuItemId="open-folder" text="Open Folder..." />
        <MenuItem menuItemId="open-recent" text="Open Recent">
          <MenuItem menuItemId="recent-1" text="My document 1" />
          <MenuItem menuItemId="recent-2" text="My document 2" />
          <MenuItem menuItemId="recent-3" text="My document 3" />
          <MenuItem menuItemId="recent-4" text="My document 4" />
          <MenuItem menuItemId="recent-5" text="My document 5" />
          <MenuItem menuItemId="open-recent-others" text="Open Less Recent">
            <MenuItem menuItemId="recent-6" text="My document 6" />
            <MenuItem menuItemId="recent-7" text="My document 7" />
            <MenuItem menuItemId="open-recent-old" text="Open Ancient">
              <MenuItem menuItemId="recent-1000" text="My document 1000" />
              <MenuItem menuItemId="recent-1001" text="My document 1001" />
            </MenuItem>
            <MenuItem menuItemId="recent-8" text="My document 8" />
            <MenuItem menuItemId="recent-9" text="My document 9" />
          </MenuItem>
        </MenuItem>
        <MenuItem menuItemId="save" text="Save" />
        <MenuItem menuItemId="save-all" text="Save All" />
        <MenuItem menuItemId="close-file" text="Close File" />
        <MenuItem menuItemId="close-folder" text="Close Folder" />
        <MenuItem menuItemId="quit" text="Quit" />
      </MenuItem>
      <MenuItem menuItemId="edit" {disabled} text="Edit">
        <MenuItem menuItemId="undo" text="Undo" role="menuitemcheckbox" checked />
        <MenuItem menuItemId="redo" text="Redo" role="menuitemradio" checked />
        <MenuItem menuItemId="cut" text="Cut" />
        <MenuItem menuItemId="copy" text="Copy" />
        <MenuItem menuItemId="paste" text="Paste" />
      </MenuItem>
    </MenuBar>
  </svelte:fragment>>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
  </svelte:fragment>
</Playground>
