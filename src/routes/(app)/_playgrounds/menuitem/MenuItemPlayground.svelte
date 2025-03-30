<svelte:options runes={true} />

<script lang="ts">
  import { MENU_ITEM_CONTEXT_KEY, type MenuItemContext, type MenuItemRole } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import Select from '$lib/Select.svelte';
  import { setContext } from 'svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked: boolean | undefined | null = $state(false);
  let _class = $state('');
  let disabled: boolean | undefined | null = $state(false);
  let hasChildren: boolean | undefined | null = $state(false);
  let menuClass = $state('');
  let openValues: string[] = $state([]);
  let role: string = $state('menuitem');
  let text = $state('sterling-svelte');
  let shortcut: string | undefined = $state(undefined);
  let value = 'menu-item-1';

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
    get openValues() {
      return openValues;
    },
    set openValues(value: string[]) {
      openValues = value;
    },
    isMenuBarItem: false,
    rootValue: 'root',
    closeContainingMenu: () => {},
    onOpen: (value) => {
      console.log(`MenuItem.onOpen value:${value}`);
    },
    onClose: (value) => {
      console.log(`MenuItem.onClose value:${value}`);
    },
    onSelect: (value) => {
      console.log(`MenuItem.onSelect value:${value}`);
    }
  });

  let code = $derived(
    getPlaygroundCode({
      checked,
      disabled,
      menuClass: menuClass,
      role: role as MenuItemRole,
      text,
      value,
      _class
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    {#if hasChildren}
      <MenuItem
        {checked}
        {disabled}
        {menuClass}
        role={role as MenuItemRole}
        {text}
        {shortcut}
        {value}
        class={_class}
        onClose={(value) => console.log(`<MenuItem> onclose value'${value}'`)}
        onOpen={(value) => console.log(`<MenuItem> onopen value:'${value}'`)}
        onSelect={(value) => console.log(`<MenuItem> onselect value:'${value}'`)}
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
        role={role as MenuItemRole}
        {shortcut}
        {text}
        class={_class}
        {menuClass}
        onClose={(value) => console.log(`<MenuItem> onclose value'${value}'`)}
        onOpen={(value) => console.log(`<MenuItem> onopen value:'${value}'`)}
        onSelect={(value) => console.log(`<MenuItem> onselect value:'${value}'`)}
      />
    {/if}
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked>checked (based on role)</Checkbox>
    <VariantInput bind:class={_class} sterlingClasses={[]} />
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:class={menuClass} sterlingClasses={[]} labelText="menuClass" />
    <Label text="role">
      <Select bind:selectedValue={role}>
        <ListItem value="menuitem">menuitem</ListItem>
        <ListItem value="menuitemcheckbox">menuitemcheckbox</ListItem>
        <ListItem value="menuitemradio">menuitemradio</ListItem>
      </Select>
    </Label>
    <Label text="shortcut">
      <Input bind:value={shortcut} />
    </Label>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={hasChildren}>Add children</Checkbox>
  {/snippet}
</Playground>
