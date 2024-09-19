<script lang="ts">
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/MenuItem.svelte';
  import { setContext } from 'svelte';
  import { MENU_ITEM_CONTEXT_KEY, type MenuItemContext } from '$lib';
  import { writable } from 'svelte/store';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import Menu from '$lib/Menu.svelte';

  let variant = '';

  const openValues: string[] = [];

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
    <Menu class={variant}>
      <MenuItem value="1" text="One" />
      <MenuItem value="2" text="Two" />
      <MenuItem value="3" text="Three" />
    </Menu>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
</Playground>
