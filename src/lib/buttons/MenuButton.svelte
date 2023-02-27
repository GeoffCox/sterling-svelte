<script lang="ts">
  import type { ButtonShape, ButtonVariant } from './Button.types';
  import type { MenuItemRegistration, MenuItemContext } from '../containers/Menus.types';

  import { v4 as uuid } from 'uuid';
  import { createEventDispatcher, getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Button from './Button.svelte';
  import Menu from '../containers/Menu.svelte';
  import { menuItemContextKey } from '../containers/Menus.constants';
  import { focusFirstChild, focusNextChild, focusPreviousChild } from '../containers/Menus.utils';

  // ----- Props ----- //

  export let open = false;
  export let shape: ButtonShape = 'rounded';
  export let value: string;
  export let variant: ButtonVariant = 'regular';

  // ----- State ----- //

  const instanceId = uuid();

  let reference: HTMLDivElement;
  $: menuId = `${value}-menu-${instanceId}`;
  $: hasChildren = $$slots.items;

  const children = writable<MenuItemRegistration[]>([]);

  // ----- Events ----- //

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

  const onClick = () => {
    open = !open;
    if (open) {
      setTimeout(() => focusFirstChild($children), 10);
    }
  };

  // ----- Set Context ----- //

  setContext<MenuItemContext>(menuItemContextKey, {
    rootValue: value,
    depth: 1,
    register: (menuItem: MenuItemRegistration) => {
      children.set([...$children, menuItem]);
    },
    unregister: (menuItem: MenuItemRegistration) => {
      children.set($children.filter((x) => x.value !== menuItem.value));
    },
    closeMenu: (recursive?: boolean) => {
      open = false;
    },
    focusPrevious: (currentValue) => focusPreviousChild($children, currentValue),
    focusNext: (currentValue) => focusNextChild($children, currentValue),
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
  aria-controls={menuId}
  aria-expanded={open}
  aria-haspopup={hasChildren}
  aria-owns={menuId}
  data-value={value}
  data-root-value={value}
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
    <Menu id={menuId} {reference} {open}>
      <slot name="items" />
    </Menu>
  </div>
</Button>
