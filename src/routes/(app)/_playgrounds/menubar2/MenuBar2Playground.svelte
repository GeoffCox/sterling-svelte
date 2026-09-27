<svelte:options runes={true} />

<script lang="ts">
  import MenuBar2 from '$lib/MenuBar2.svelte';
  import MenuItem2 from '$lib/MenuItem2.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');

  let code = $derived(getPlaygroundCode({ _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <MenuBar2
      onClose={(value) => console.log(`<MenuBar> onClose value:${value}`)}
      onOpen={(value) => console.log(`<MenuBar> onOpen value:${value}`)}
      onSelect={(value) => console.log(`<MenuBar> onSelect value:${value}`)}
      class={_class}
    >
      <MenuItem2 value="file" text="File">
        <MenuItem2 value="new-file" text="New..." />
        <MenuSeparator />
        <MenuItem2 value="open-file" text="Open..." />
        <MenuItem2 value="open-folder" text="Open Folder..." />
        <MenuItem2 value="open-recent" text="Open Recent">
          <MenuItem2 value="recent-1" text="Recent File 1" />
          <MenuItem2 value="recent-2" text="Recent File 2" />
          <MenuItem2 value="recent-3" text="Recent File 3" />
          <MenuItem2 value="recent-4" text="Recent File 4" />
          <MenuItem2 value="recent-5" text="Recent File 5" />
          <MenuItem2 value="recent-6" text="Recent File 6" />
          <MenuItem2 value="open-recent-older" text="Older">
            <MenuItem2 value="recent-7" text="Recent File 7" />
            <MenuItem2 value="recent-8" text="Recent File 8" />
            <MenuItem2 value="recent-9" text="Recent File 9" />
          </MenuItem2>
        </MenuItem2>
        <MenuSeparator />
        <MenuItem2 value="save" text="Save" />
        <MenuItem2 value="save-as" text="Save As..." />
        <MenuItem2 value="save-all" text="Save All" />
        <MenuSeparator />
        <MenuItem2 value="share" text="Share">
          <MenuItem2 value="share-email" text="Email" />
          <MenuItem2 value="share-text" text="Text Message" />
          <MenuItem2 value="share-other" text="Other..." />
        </MenuItem2>
        <MenuSeparator />
        <MenuItem2 value="close-file" text="Close File" />
        <MenuItem2 value="close-folder" text="Close Folder" />
      </MenuItem2>
      <MenuItem2 value="edit" text="Edit">
        <MenuItem2 value="undo" text="Undo" />
        <MenuItem2 value="redo" text="Redo" />
        <MenuSeparator />
        <MenuItem2 value="cut" text="Cut" />
        <MenuItem2 value="copy" text="Copy" />
        <MenuItem2 value="paste" text="Paste" />
        <MenuSeparator />
        <MenuItem2 value="find" text="Find" />
        <MenuItem2 value="replace" text="Replace" />
        <MenuSeparator />
        <MenuItem2 value="whitespace" role="menuitemcheckbox" text="Show whitespace" />
        <MenuItem2 value="word-wrap" role="menuitemcheckbox" text="Word wrap" checked />
      </MenuItem2>
      <MenuItem2 value="view" text="View">
        <MenuItem2 value="explorer" role="menuitemradio" checked text="Explorer" />
        <MenuItem2 value="search" role="menuitemradio" text="Search" />
        <MenuItem2 value="source-control" role="menuitemradio" text="Source Control" />
        <MenuItem2 value="extensions" role="menuitemradio" text="Extensions" />
      </MenuItem2>
    </MenuBar2>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
</Playground>
