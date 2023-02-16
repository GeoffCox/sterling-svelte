<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/containers/MenuItem.svelte';
  import MenuSeparator from '$lib/containers/MenuSeparator.svelte';
  import MenuButton from '$lib/buttons/MenuButton.svelte';

  let exampleRef: any;
  let disabled = false;

  let renderChoice: 'performance' | 'quality' = 'performance';
  let autoSave: boolean = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <MenuButton menuItemId="file">
      File
      <svelte:fragment slot="items">
        <MenuItem menuItemId="file-new" text="New" />
        <MenuItem menuItemId="file-open" text="Open..." />
        <MenuItem menuItemId="file-save" text="Save" />
        <MenuItem menuItemId="file-save-as" text="Save As..." disabled />
        <MenuSeparator />
        <MenuItem
          menuItemId="auto-save"
          role="menuitemcheckbox"
          text="Auto Save"
          checked={autoSave}
          on:select={() => (autoSave = !autoSave)}
        />
        <MenuSeparator />
        <MenuItem
          menuItemId="prefer-performance"
          role="menuitemradio"
          text="Performance Mode"
          checked={renderChoice === 'performance'}
          on:select={() => (renderChoice = 'performance')}
        />
        <MenuItem
          menuItemId="prefer-quality"
          role="menuitemradio"
          text="Quality Mode"
          checked={renderChoice === 'quality'}
          on:select={() => (renderChoice = 'quality')}
        />
        <MenuSeparator />
        <MenuItem menuItemId="file-share" text="Share">
          <MenuItem menuItemId="file-share-email" text="E-mail" />
          <MenuItem menuItemId="file-share-text" text="Text Messaging" />
          <MenuItem menuItemId="file-share-internet" text="Entire Internet" />
        </MenuItem>

        <MenuSeparator />
        <MenuItem menuItemId="file-quit" text="Quit" />
      </svelte:fragment>
    </MenuButton>
  </svelte:fragment>>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
  </svelte:fragment>
</Playground>
