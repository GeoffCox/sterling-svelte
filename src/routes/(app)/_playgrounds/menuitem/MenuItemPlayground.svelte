<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/MenuItem.svelte';
  import { setContext } from 'svelte';
  import { MENU_ITEM_CONTEXT_KEY, type MenuItemContext, type MenuItemRole } from '$lib';
  import { writable } from 'svelte/store';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Input from '$lib/Input.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked = false;
  let disabled = false;
  let menuVariant = '';
  let role: MenuItemRole = 'menuitem';
  let text = 'sterling-svelte';
  let value = 'menu-item-1';
  let variant = '';

  let hasChildren = false;

  const openValues = writable<string[]>([]);

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
    openValues,
    isMenuBarItem: false,
    rootValue: 'root',
    closeContainingMenu: () => {},
    onOpen: () => {},
    onClose: () => {},
    onSelect: () => {}
  });

  $: code = getPlaygroundCode({
    checked,
    disabled,
    menuVariant,
    role,
    text,
    value,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    {#if hasChildren}
      <MenuItem
        {checked}
        {disabled}
        {menuVariant}
        {role}
        {text}
        {value}
        {variant}
        on:close={(event) => console.log(`close '${event.detail.value}'`)}
        on:open={(event) => console.log(`open '${event.detail.value}'`)}
        on:select={(event) => console.log(`select '${event.detail.value}'`)}
      >
        <MenuItem value="1" text="One" />
        <MenuItem value="2" text="Two" />
        <MenuItem value="3" text="Three" />
      </MenuItem>
    {:else}
      <MenuItem
        {checked}
        {value}
        {disabled}
        {role}
        {text}
        {variant}
        {menuVariant}
        on:close={(event) => console.log(`<MenuItem> on:close value'${event.detail.value}'`)}
        on:open={(event) => console.log(`<MenuItem> on:open value:'${event.detail.value}'`)}
        on:select={(event) => console.log(`<MenuItem> on:select value:'${event.detail.value}'`)}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant={menuVariant} availableVariants={[]} labelText="menuVariant" />
    <Label text="role">
      <Select bind:selectedValue={role}>
        <ListItem value="menuitem">menuitem</ListItem>
        <ListItem value="menuitemcheckbox">menuitemcheckbox</ListItem>
        <ListItem value="menuitemradio">menuitemradio</ListItem>
      </Select>
    </Label>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={hasChildren}>Add children</Checkbox>
  </svelte:fragment>
</Playground>
