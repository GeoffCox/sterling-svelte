<script lang="ts">
  import type { ButtonShape, ButtonVariant } from './Button.types';
  import type { MenuItem, MenuItemContext } from '../containers/Menus.types';

  import { v4 as uuid } from 'uuid';
  import { createEventDispatcher, getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Button from './Button.svelte';
  import MenuPopup from '../containers/MenuPopup.svelte';
  import { menuItemContextKey } from '../containers/Menus.constants';
  import { focusFirstChild, focusNextChild, focusPreviousChild } from '../containers/Menus.utils';

  // ----- Props ----- //

  export let menuItemId: string;
  export let open = false;
  export let shape: ButtonShape = 'rounded';
  export let variant: ButtonVariant = 'regular';

  // ----- State ----- //

  const instanceId = uuid();

  let reference: HTMLDivElement;
  $: popupId = `${menuItemId}-popup-${instanceId}`;
  $: hasChildren = $$slots.items;

  const children = writable<MenuItem[]>([]);

  // ----- Events ----- //

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

  const onClick = () => {
    open = !open;
    if (open) {
      setTimeout(() => focusFirstChild($children), 10);
    }
  };

  // ----- Set Context ----- //

  setContext<MenuItemContext>(menuItemContextKey, {
    rootMenuItemId: menuItemId,
    depth: 1,
    register: (menuItem: MenuItem) => {
      children.set([...$children, menuItem]);
    },
    unregister: (menuItem: MenuItem) => {
      children.set($children.filter((x) => x.id !== menuItem.id));
    },
    closeMenu: (recursive?: boolean) => {
      open = false;
    },
    focusPrevious: (fromMenuItemId) => focusPreviousChild($children, fromMenuItemId),
    focusNext: (fromMenuItemId) => focusNextChild($children, fromMenuItemId),
    onOpen: raiseOpen,
    onClose: raiseClose,
    onSelect: raiseSelect
  });
</script>

<!--
      @component
      A Button that displays a context menu when clicked.
  -->
<Button
  aria-controls={popupId}
  aria-expanded={open}
  aria-haspopup={hasChildren}
  aria-owns={popupId}
  data-menu-item-id={menuItemId}
  data-root-menu-item-id={menuItemId}
  {variant}
  {shape}
  on:blur
  on:click
  on:click={onClick}
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
  on:pointercancel
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  on:pointerover
  on:pointerout
  on:pointerup
  on:wheel
  {...$$restProps}
>
  <div bind:this={reference}>
    <slot />
    <MenuPopup id={popupId} {reference} {open}>
      <slot name="items" />
    </MenuPopup>
  </div>
</Button>
