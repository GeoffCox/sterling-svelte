<svelte:options runes={true} />

<script lang="ts">
  import { MENU_ITEM_CONTEXT_KEY, type MenuItemContext } from '$lib';
  import Menu from '$lib/Menu.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import { setContext } from 'svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');

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

  let code = $derived(getPlaygroundCode({ _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <Menu class={_class}>
      <MenuItem value="1" text="One" />
      <MenuItem value="2" text="Two" />
      <MenuItem value="3" text="Three" />
    </Menu>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
</Playground>
