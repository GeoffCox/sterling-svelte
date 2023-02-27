<script lang="ts">
  import type { MenuItemContext, MenuItemRegistration, MenuBarContext } from './Menus.types';

  import { createEventDispatcher, setContext } from 'svelte';

  import { menuBarContextKey, menuItemContextKey } from './Menus.constants';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();

  const raiseClose = (value: string) => {
    dispatch('close', { value });
  };

  const raiseOpen = (value: string) => {
    dispatch('open', { value });
  };

  const raiseSelect = (value: string) => {
    dispatch('select', { value });
  };

  const children = writable<MenuItemRegistration[]>([]);

  const openPreviousChild = (currentValue: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.value === currentValue);
    if (index !== -1) {
      const focusIndex = index === 0 ? $children.length - 1 : index - 1;
      $children[focusIndex].focus();
      $children[focusIndex].open();
    }
  };

  const openNextChild = (currentValue: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.value === currentValue);
    if (index !== -1) {
      const focusIndex = (index + 1) % $children.length;
      $children[focusIndex].focus();
      $children[focusIndex].open();
    }
  };

  const focusChild = (value: string) => {
    const focusIndex = $children?.findIndex((menuItem) => menuItem.value === value);
    if (focusIndex !== -1) {
      $children[focusIndex].focus();
    }
  };

  setContext<MenuItemContext>(menuItemContextKey, {
    register: (menuItem: MenuItemRegistration) => {
      children.set([...$children, menuItem]);
    },
    unregister: (menuItem: MenuItemRegistration) => {
      children.set($children.filter((x) => x.value !== menuItem.value));
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
