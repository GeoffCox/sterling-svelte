<script lang="ts">
  import type { ButtonShape, ButtonVariant } from './Button.types';
  import type { MenuItemRegistration, MenuItemContext } from './MenuItem.types';

  import { createEventDispatcher, getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Button from './Button.svelte';
  import Menu from './Menu.svelte';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { focusFirstChild, focusNextChild, focusPreviousChild } from './MenuItem.utils';
  import { idGenerator } from './idGenerator';

  // ----- Props ----- //

  export let open = false;
  export let shape: ButtonShape = 'rounded';
  export let value: string;
  export let variant: ButtonVariant = 'regular';

  // ----- State ----- //

  const instanceId = idGenerator.nextId('MenuButton');

  let buttonRef: Button;
  let reference: HTMLDivElement;
  let prevOpen = open;

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

  $: {
    if (!open && open !== prevOpen) {
      focus();
    }
    prevOpen = open;
  }

  // ----- Methods ----- //

  export const click = () => {
    buttonRef?.click();
  };

  export const blur = () => {
    buttonRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    buttonRef?.focus(options);
  };

  // ----- Set Context ----- //

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
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
    focusPrevious: (currentValue: string) => focusPreviousChild($children, currentValue),
    focusNext: (currentValue: string) => focusNextChild($children, currentValue),
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
  bind:this={buttonRef}
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
  <div class="reference" bind:this={reference}>
    <slot {shape} {variant} />
  </div>
  <Menu id={menuId} {reference} {open}>
    <slot name="items" />
  </Menu>
</Button>

<style>
  .reference {
    align-content: center;
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
    column-gap: 0.25em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
