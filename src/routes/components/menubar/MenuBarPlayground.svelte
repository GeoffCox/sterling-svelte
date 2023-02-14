<script lang="ts">
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/containers/MenuItem.svelte';
  import MenuBar from '$lib/containers/MenuBar.svelte';
  import MenuSeparator from '$lib/containers/MenuSeparator.svelte';

  let exampleRef: any;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <MenuBar
      on:close={(event) => exampleRef.recordEvent(`close '${event.detail.menuItemId}'`)}
      on:open={(event) => exampleRef.recordEvent(`open '${event.detail.menuItemId}'`)}
      on:select={(event) => exampleRef.recordEvent(`select '${event.detail.menuItemId}'`)}
    >
      <MenuItem menuItemId="file" text="File">
        <MenuItem menuItemId="new-file" text="New..." />
        <MenuSeparator />
        <MenuItem menuItemId="open-file" text="Open..." />
        <MenuItem menuItemId="open-folder" text="Open Folder..." />
        <MenuItem menuItemId="open-recent" text="Open Recent">
          <MenuItem menuItemId="recent-1" text="Recent File 1" />
          <MenuItem menuItemId="recent-2" text="Recent File 2" />
          <MenuItem menuItemId="recent-3" text="Recent File 3" />
          <MenuItem menuItemId="recent-4" text="Recent File 4" />
          <MenuItem menuItemId="recent-5" text="Recent File 5" />
          <MenuItem menuItemId="recent-6" text="Recent File 6" />
          <MenuItem menuItemId="open-recent-older" text="Older">
            <MenuItem menuItemId="recent-7" text="Recent File 7" />
            <MenuItem menuItemId="recent-8" text="Recent File 8" />
            <MenuItem menuItemId="recent-9" text="Recent File 9" />
          </MenuItem>
        </MenuItem>
        <MenuSeparator />
        <MenuItem menuItemId="save" text="Save" />
        <MenuItem menuItemId="save-as" text="Save As..." />
        <MenuItem menuItemId="save-all" text="Save All" />
        <MenuSeparator />
        <MenuItem menuItemId="close-file" text="Close File" />
        <MenuItem menuItemId="close-folder" text="Close Folder" />
      </MenuItem>
      <MenuItem menuItemId="edit" text="Edit">
        <MenuItem menuItemId="undo" text="Undo" />
        <MenuItem menuItemId="redo" text="Redo" />
        <MenuSeparator />
        <MenuItem menuItemId="cut" text="Cut" />
        <MenuItem menuItemId="copy" text="Copy" />
        <MenuItem menuItemId="paste" text="Paste" />
        <MenuSeparator />
        <MenuItem menuItemId="find" text="Find" />
        <MenuItem menuItemId="replace" text="Replace" />
        <MenuSeparator />
        <MenuItem menuItemId="whitespace" role="menuitemcheckbox" text="Show whitespace" />
        <MenuItem menuItemId="word-wrap" role="menuitemcheckbox" text="Word wrap" checked />
      </MenuItem>
      <MenuItem menuItemId="view" text="View">
        <MenuItem menuItemId="explorer" role="menuitemradio" checked text="Explorer" />
        <MenuItem menuItemId="search" role="menuitemradio" text="Search" />
        <MenuItem menuItemId="source-control" role="menuitemradio" text="Source Control" />
        <MenuItem menuItemId="extensions" role="menuitemradio" text="Extensions" />
      </MenuItem>
    </MenuBar>
  </svelte:fragment>>
</Playground>
