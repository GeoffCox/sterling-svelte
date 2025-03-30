<svelte:options runes={true} />

<script lang="ts">
  import MenuBar from '$lib/MenuBar.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');

  let code = $derived(getPlaygroundCode({ _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <MenuBar
      onClose={(value) => console.log(`MenuBar.onClose value:${value}`)}
      onOpen={(value) => console.log(`MenuBar.onOpen value:${value}`)}
      onSelect={(value) => console.log(`MenuBar.onSelect value:${value}`)}
      class={_class}
    >
      <MenuItem value="file" text="File">
        <MenuItem value="new-file" text="New..." />
        <MenuSeparator />
        <MenuItem value="open-file" text="Open..." />
        <MenuItem value="open-folder" text="Open Folder..." />
        <MenuItem value="open-recent" text="Open Recent">
          <MenuItem value="recent-1" text="Recent File 1" />
          <MenuItem value="recent-2" text="Recent File 2" />
          <MenuItem value="recent-3" text="Recent File 3" />
          <MenuItem value="recent-4" text="Recent File 4" />
          <MenuItem value="recent-5" text="Recent File 5" />
          <MenuItem value="recent-6" text="Recent File 6" />
          <MenuItem value="open-recent-older" text="Older">
            <MenuItem value="recent-7" text="Recent File 7" />
            <MenuItem value="recent-8" text="Recent File 8" />
            <MenuItem value="recent-9" text="Recent File 9" />
          </MenuItem>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="save" text="Save" />
        <MenuItem value="save-as" text="Save As..." />
        <MenuItem value="save-all" text="Save All" />
        <MenuSeparator />
        <MenuItem value="share" text="Share">
          <MenuItem value="share-email" text="Email" />
          <MenuItem value="share-text" text="Text Message" />
          <MenuItem value="share-other" text="Other..." />
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="close-file" text="Close File" />
        <MenuItem value="close-folder" text="Close Folder" />
      </MenuItem>
      <MenuItem value="edit" text="Edit">
        <MenuItem value="undo" text="Undo" />
        <MenuItem value="redo" text="Redo" />
        <MenuSeparator />
        <MenuItem value="cut" text="Cut" />
        <MenuItem value="copy" text="Copy" />
        <MenuItem value="paste" text="Paste" />
        <MenuSeparator />
        <MenuItem value="find" text="Find" />
        <MenuItem value="replace" text="Replace" />
        <MenuSeparator />
        <MenuItem value="whitespace" role="menuitemcheckbox" text="Show whitespace" />
        <MenuItem value="word-wrap" role="menuitemcheckbox" text="Word wrap" checked />
      </MenuItem>
      <MenuItem value="view" text="View">
        <MenuItem value="explorer" role="menuitemradio" checked text="Explorer" />
        <MenuItem value="search" role="menuitemradio" text="Search" />
        <MenuItem value="source-control" role="menuitemradio" text="Source Control" />
        <MenuItem value="extensions" role="menuitemradio" text="Extensions" />
      </MenuItem>
    </MenuBar>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
</Playground>
