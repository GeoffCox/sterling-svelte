<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../../components/Playground.svelte';

  import MenuItem from '$lib/MenuItem.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import MenuButton from '$lib/MenuButton.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled = false;
  let open = false;
  let menuVariant = '';
  let variant = '';

  let renderChoice: 'performance' | 'quality' = 'performance';
  let autoSave: boolean = false;

  $: code = getPlaygroundCode({
    disabled,
    menuVariant,
    open,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <MenuButton
      bind:open
      {disabled}
      value="file"
      {variant}
      {menuVariant}
      on:close={(event) => console.log(`<MenuButton> on:close '${event.detail.value}'`)}
      on:open={(event) => console.log(`<MenuButton> on:open '${event.detail.value}'`)}
      on:select={(event) => console.log(`<MenuButton> on:select '${event.detail.value}'`)}
    >
      File
      <svelte:fragment slot="items">
        <MenuItem value="file-new" text="New" />
        <MenuItem value="file-open" text="Open..." />
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
      </svelte:fragment>
    </MenuButton>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <VariantInput bind:variant={menuVariant} availableVariants={[]} labelText="menuVariant" />
    <VariantInput
      bind:variant
      availableVariants={['capsule', 'circular ', 'colorful', 'secondary', 'square', 'tool']}
      labelText="variant (Button)"
    />
  </svelte:fragment>
</Playground>
