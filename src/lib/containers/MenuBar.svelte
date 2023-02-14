<script lang="ts">
  import type { MenuItemContext, MenuItem, MenuBarContext } from './Menus.types';

  import { createEventDispatcher, setContext } from 'svelte';

  import { menuBarContextKey, menuItemContextKey } from './Menus.constants';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();

  const raiseClose = (menuItemId: string) => {
    dispatch('close', { menuItemId });
  };

  const raiseOpen = (menuItemId: string) => {
    dispatch('open', { menuItemId });
  };

  const raiseSelect = (menuItemId: string) => {
    dispatch('select', { menuItemId });
  };

  const children = writable<MenuItem[]>([]);

  const openPreviousChild = (fromMenuItemId: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
    if (index !== -1) {
      const focusIndex = index === 0 ? $children.length - 1 : index - 1;
      $children[focusIndex].focus();
      $children[focusIndex].open();
    }
  };

  const openNextChild = (fromMenuItemId: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
    if (index !== -1) {
      const focusIndex = (index + 1) % $children.length;
      $children[focusIndex].focus();
      $children[focusIndex].open();
    }
  };

  const focusChild = (menuItemId: string) => {
    const focusIndex = $children?.findIndex((menuItem) => menuItem.id === menuItemId);
    if (focusIndex !== -1) {
      $children[focusIndex].focus();
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
    focusPrevious: openPreviousChild,
    focusNext: openNextChild,
    onClose: raiseClose,
    onOpen: raiseOpen,
    onSelect: raiseSelect
  });

  setContext<MenuBarContext>(menuBarContextKey, {
    openPreviousMenu: openPreviousChild,
    openNextMenu: openNextChild
  });
</script>

<div
  class="sterling-menu-bar"
  role="menubar"
  on:blur
  on:click
  on:copy
  on:cut
  on:dblclick
  on:focus
  on:focusin
  on:focusout
  on:keydown
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:scroll
  on:wheel
  on:paste
  {...$$restProps}
>
  <slot />
</div>

<style>
  .sterling-menu-bar {
    background-color: transparent;
    align-items: center;
    align-content: stretch;
    display: flex;
    gap: 1em;
    justify-content: flex-start;
    justify-items: flex-start;
  }
</style>
