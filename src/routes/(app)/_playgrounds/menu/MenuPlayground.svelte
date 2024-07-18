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
  import Menu from '$lib/Menu.svelte';

  let variant = '';

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
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Menu {variant}>
      <MenuItem value="1" text="One" />
      <MenuItem value="2" text="Two" />
      <MenuItem value="3" text="Three" />
    </Menu>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
</Playground>
