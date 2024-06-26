<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/MenuItem.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import { setContext } from 'svelte';
  import { MENU_ITEM_CONTEXT_KEY, type MenuItemContext } from '$lib';
  import { writable } from 'svelte/store';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;
  let menuVariant = '';
  let variant = '';
  let disabled = false;

  let renderChoice: 'performance' | 'quality' = 'performance';
  let autoSave: boolean = false;

  const openValues = writable<string[]>([]);

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
    openValues,
    isMenuBarItem: true,
    rootValue: 'root',
    closeContainingMenu: () => {},
    onOpen: () => {},
    onClose: () => {},
    onSelect: () => {}
  });
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <MenuItem
      value="file"
      {disabled}
      text="File"
      {variant}
      {menuVariant}
      on:close={(event) => console.log(`close '${event.detail.value}'`)}
      on:open={(event) => console.log(`open '${event.detail.value}'`)}
      on:select={(event) => console.log(`select '${event.detail.value}'`)}
    >
      <MenuItem value="file-new" text="New" />
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
      <MenuItem value="file-save" text="Save" />
      <MenuItem value="file-save-as" text="Save As..." disabled />
      <MenuSeparator />
      <MenuItem
        value="auto-save"
        role="menuitemcheckbox"
        text="Auto Save"
        checked={autoSave}
        on:select={() => (autoSave = !autoSave)}
      />
      <MenuSeparator />
      <MenuItem
        value="prefer-performance"
        role="menuitemradio"
        text="Performance Mode"
        checked={renderChoice === 'performance'}
        on:select={() => (renderChoice = 'performance')}
      />
      <MenuItem
        value="prefer-quality"
        role="menuitemradio"
        text="Quality Mode"
        checked={renderChoice === 'quality'}
        on:select={() => (renderChoice = 'quality')}
      />
      <MenuSeparator />
      <MenuItem value="file-share" text="Share">
        <MenuItem value="file-share-email" text="E-mail" />
        <MenuItem value="file-share-text" text="Text Messaging" />
        <MenuItem value="file-share-internet" text="Entire Internet" />
      </MenuItem>
      <MenuSeparator />
      <MenuItem value="file-quit" text="Quit" />
    </MenuItem>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant={menuVariant} availableVariants={[]} labelText="menuVariant" />
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
</Playground>
