<script lang="ts">
  import type { MenuItemContext, MenuItem, MenuBarContext } from './Menus.types';

  import { createEventDispatcher, setContext } from 'svelte';

  import { menuBarContextKey, menuItemContextKey } from './Menus.constants';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();

  const raiseSelect = (menuItemId: string) => {
    dispatch('select', { menuItemId });
  };

  const children = writable<MenuItem[]>([]);

  const focusPreviousChild = (fromMenuItemId: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
    if (index !== -1) {
      const focusIndex = index === 0 ? $children.length - 1 : index - 1;
      $children[focusIndex].focus();
      $children[focusIndex].open();
    }
  };

  const focusNextChild = (fromMenuItemId: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
    if (index !== -1) {
      const focusIndex = (index + 1) % $children.length;
      $children[focusIndex].focus();
      $children[focusIndex].open();
    }
  };

  setContext<MenuItemContext>(menuItemContextKey, {
    register: (menuItem: MenuItem) => {
      children.set([...$children, menuItem]);
    },
    unregister: (menuItem: MenuItem) => {
      children.set($children.filter((x) => x.id !== menuItem.id));
    },
    closeMenu: (recursive?: boolean) => {},
    focusPrevious: focusPreviousChild,
    focusNext: focusNextChild,
    onSelect: raiseSelect
  });

  setContext<MenuBarContext>(menuBarContextKey, {
    openPreviousMenu: focusPreviousChild,
    openNextMenu: focusNextChild
  });
</script>

<div class="menubar" role="menubar">
  <slot />
</div>

<style>
  .menubar {
    background-color: var(--Button__background-color);
    align-items: center;
    align-content: stretch;
    display: flex;
    gap: 1em;
    justify-content: flex-start;
    justify-items: flex-start;
  }
</style>
