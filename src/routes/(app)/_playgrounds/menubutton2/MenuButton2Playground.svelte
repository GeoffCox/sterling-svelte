<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import MenuButton2 from '$lib/MenuButton2.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuItem2 from '$lib/MenuItem2.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null | undefined = $state(false);
  let menuVariant = $state('');
  let variant = $state('');

  let renderChoice: 'performance' | 'quality' = $state('performance');
  let autoSave: boolean | null | undefined = $state(false);

  let code = $derived(
    getPlaygroundCode({
      disabled,
      menuClass: menuVariant,
      open: false,
      _class: variant
    })
  );
</script>

{#snippet menuItems()}
  <MenuItem2 value="file-new" text="New" />
  <MenuItem2 value="file-open" text="Open..." />
  <MenuItem2 value="file-save" text="Save" />
  <MenuItem2 value="file-save-as" text="Save As..." disabled />
  <MenuSeparator />
  <MenuItem2
    value="auto-save"
    role="menuitemcheckbox"
    text="Auto Save"
    checked={autoSave}
    onSelect={() => (autoSave = !autoSave)}
  />
  <MenuSeparator />
  <MenuItem2
    value="prefer-performance"
    role="menuitemradio"
    text="Performance Mode"
    checked={renderChoice === 'performance'}
    onSelect={() => (renderChoice = 'performance')}
  />
  <MenuItem2
    value="prefer-quality"
    role="menuitemradio"
    text="Quality Mode"
    checked={renderChoice === 'quality'}
    onSelect={() => (renderChoice = 'quality')}
  />
  <MenuSeparator />
  <MenuItem2 value="file-share" text="Share">
    <MenuItem2 value="file-share-email" text="E-mail" />
    <MenuItem2 value="file-share-text" text="Text Messaging" />
    <MenuItem2 value="file-share-internet" text="Entire Internet" />
  </MenuItem2>

  <MenuSeparator />
  <MenuItem2 value="file-quit" text="Quit" />
{/snippet}

<Playground {code}>
  {#snippet component()}
    <MenuButton2
      {disabled}
      value="file"
      class={variant}
      menuClass={menuVariant}
      onClose={(value) => console.log(`<MenuButton> onClose value:${value}`)}
      onOpen={(value) => console.log(`<MenuButton> onOpen value:${value}`)}
      onSelect={(value) => console.log(`<MenuButton> onSelect value:${value}`)}
      items={menuItems}
    >
      File
    </MenuButton2>
  {/snippet}
  {#snippet props()}
    <VariantInput
      bind:class={variant}
      sterlingClasses={[
        'capsule',
        'circular ',
        'secondary',
        'square',
        'blue',
        'tool',
        'green',
        'orange',
        'red'
      ]}
    />
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:class={menuVariant} sterlingClasses={[]} labelText="menuClass" />
  {/snippet}
</Playground>
