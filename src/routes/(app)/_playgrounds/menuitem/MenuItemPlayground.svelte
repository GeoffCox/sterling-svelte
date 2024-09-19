<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/MenuItem.svelte';
  import { setContext } from 'svelte';
  import { MENU_ITEM_CONTEXT_KEY, type MenuItemContext, type MenuItemRole } from '$lib';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Input from '$lib/Input.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked: boolean | undefined | null = $state(false);
  let disabled: boolean | undefined | null = $state(false);
  let menuVariant = $state('');
  let role: string = $state('menuitem');
  let text = $state('sterling-svelte');
  let shortcut: string | undefined = $state(undefined);
  let value = $state('menu-item-1');
  let variant = $state('');

  let hasChildren: boolean | undefined | null = $state(false);

  let openValues: string[] = $state([]);

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
    onOpen: () => {
      console.log('<MenuItem> onOpen');
    },
    onClose: () => {
      console.log('<MenuItem> onClose');
    },
    onSelect: () => {
      console.log('<MenuItem> onSelect');
    }
  });

  let code = $derived(
    getPlaygroundCode({
      checked,
      disabled,
      menuVariant,
      role: role as MenuItemRole,
      text,
      value,
      variant
    })
  );
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    {#if hasChildren}
      <MenuItem
        {checked}
        {disabled}
        menuClass={menuVariant}
        role={role as MenuItemRole}
        {text}
        {shortcut}
        {value}
        class={variant}
        onclose={(value) => console.log(`<MenuItem> onclose value'${value}'`)}
        onopen={(value) => console.log(`<MenuItem> onopen value:'${value}'`)}
        onselect={(value) => console.log(`<MenuItem> onselect value:'${value}'`)}
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
        class={variant}
        menuClass={menuVariant}
        onclose={(value) => console.log(`<MenuItem> onclose value'${value}'`)}
        onopen={(value) => console.log(`<MenuItem> onopen value:'${value}'`)}
        onselect={(value) => console.log(`<MenuItem> onselect value:'${value}'`)}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant={menuVariant} availableVariants={[]} labelText="menuClass" />
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
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={hasChildren}>Add children</Checkbox>
  </svelte:fragment>
</Playground>
