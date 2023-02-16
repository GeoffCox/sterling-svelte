<script lang="ts">
  // import type { Placement } from '@floating-ui/dom';
  import type { Keyborg } from 'keyborg';
  import type { MenuBarContext, MenuItemRegistration, MenuItemContext } from './Menus.types';

  // import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import { createKeyborg } from 'keyborg';
  import { v4 as uuid } from 'uuid';

  import { getContext, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  // import { portal } from '../portal';
  import { clickOutside } from '../clickOutside';
  import { afterUpdate, createEventDispatcher } from 'svelte/internal';
  import MenuItemDisplay from './MenuItemDisplay.svelte';
  import { menuBarContextKey, menuItemContextKey } from './Menus.constants';
  import Menu from './Menu.svelte';
  import {
    focusFirstChild,
    focusLastChild,
    focusNextChild,
    focusPreviousChild
  } from './Menus.utils';

  // ----- Props ----- //

  export let checked = false;
  export let composed = false;
  export let disabled = false;
  export let open = false;
  export let menuItemId: string;
  export let role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem';
  export let text: string | undefined = undefined;

  // ----- Get Context ----- //

  const {
    rootMenuItemId = menuItemId,
    depth = 0,
    register = undefined,
    unregister = undefined,
    closeMenu = undefined,
    focusPrevious = undefined,
    focusNext = undefined,
    onOpen = undefined,
    onClose = undefined,
    onSelect = undefined
  } = getContext<MenuItemContext>(menuItemContextKey) || {};

  console.log({
    rootMenuItemId,
    depth,
    register,
    unregister,
    closeMenu,
    focusPrevious,
    focusNext,
    onOpen,
    onClose,
    onSelect
  });

  const { openPreviousMenu = undefined, openNextMenu = undefined } =
    getContext<MenuBarContext>(menuBarContextKey) || {};

  // ----- State ----- //

  const instanceId = uuid();

  $: displayId = `${menuItemId}-display-${instanceId}`;
  $: menuId = `${menuItemId}-menu-${instanceId}`;

  let menuItemRef: HTMLButtonElement;

  const children = writable<MenuItemRegistration[]>([]);

  let mounted = false;
  let prevOpen = open;

  $: hasChildren = $$slots.default;

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseClose = (menuItemId: string) => {
    dispatch('close', { menuItemId });
    onClose?.(menuItemId);
  };

  const raiseOpen = (menuItemId: string) => {
    dispatch('open', { menuItemId });
    onOpen?.(menuItemId);
  };

  $: {
    if (hasChildren && open !== prevOpen) {
      open ? raiseOpen(menuItemId) : raiseClose(menuItemId);
    }
    prevOpen = open;
  }

  // dispatches the event and bubbles it up the context
  // so that container components can subscribe to select
  // events for children.
  const raiseSelect = (menuItemId: string) => {
    dispatch('select', { menuItemId });
    onSelect?.(menuItemId);
  };

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Focus ----- //

  const autoFocusFirstChild = (open: boolean, insideMenu: boolean) => {
    if (open && insideMenu) {
      setTimeout(() => focusFirstChild($children), 10);
    }
  };

  $: autoFocusFirstChild(open, depth > 0);

  // ----- Event Handlers ----- //

  onMount(() => {
    mounted = true;
    keyborg.subscribe(keyborgHandler);

    const menuItemSelf = {
      id: menuItemId,
      open: () => {
        open = true;
      },
      close: () => {
        open = false;
      },
      focus: () => {
        menuItemRef?.focus();
      }
    };

    register?.(menuItemSelf);
    return () => {
      keyborg.unsubscribe(keyborgHandler);
      unregister?.(menuItemSelf);
    };
  });

  afterUpdate(() => {
    prevOpen = open;
  });

  const onKeyDown: svelte.JSX.KeyboardEventHandler<Element> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'ArrowDown':
          if (depth === 0 && hasChildren) {
            // When a top menu item, open and focus first child.
            open = true;
            setTimeout(() => focusFirstChild($children), 10);
            event.preventDefault();
            return false;
          } else if (depth > 0) {
            // When inside a menu, focus next sibling menu item.
            focusNext?.(menuItemId);
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowLeft':
          if (depth < 2) {
            // When a top menu item, open the previous top-level menu
            open = false;
            closeMenu?.(true);
            openPreviousMenu?.(rootMenuItemId);
          } else {
            // When inside a menu, close the containing menu
            closeMenu?.();
          }
          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (depth > 0 && hasChildren) {
            // When inside a menu, show the submenu
            open = true;
            setTimeout(focusFirstChild, 10);
          } else {
            // Otherwise open the next top-level menu
            open = false;
            closeMenu?.(true);
            openNextMenu?.(rootMenuItemId);
          }
          event.preventDefault();
          return false;
        case 'ArrowUp':
          if (depth === 0 && hasChildren) {
            // When a top menu item, open and focus first child.
            open = true;
            setTimeout(() => focusLastChild($children), 10);
            event.preventDefault();
            return false;
          } else if (depth > 0) {
            // When inside a menu ,focus the previous item
            focusPrevious?.(menuItemId);
            event.preventDefault();
            return false;
          }
        case 'Escape':
          open = false;
          closeMenu?.(true);
          event.preventDefault();
          return false;
      }
    }
  };

  const onMouseEnter = (event: MouseEvent) => {
    setTimeout(() => {
      menuItemRef?.focus();
    }, 10);
  };

  const onMenuItemClick = (event: MouseEvent) => {
    if (!disabled) {
      if (hasChildren) {
        open = !open;
        event.preventDefault();
        event.stopPropagation();
        return false;
      } else {
        raiseSelect(menuItemId);
        closeMenu?.(true);
      }
    }
  };

  const onClickOutside = (event: svelte.JSX.ClickOutsideEvent) => {
    const {
      detail: { mouseEvent }
    } = event;

    let element: HTMLElement | null = mouseEvent.target as HTMLElement;
    while (element) {
      if (element.getAttribute('data-root-menu-item-id') === rootMenuItemId) {
        return;
      }
      element = element.parentElement;
    }
    closeMenu?.(true);
  };

  // ----- Set Context ----- //

  setContext<MenuItemContext>(menuItemContextKey, {
    rootMenuItemId: rootMenuItemId,
    depth: depth + 1,
    register: (menuItem: MenuItemRegistration) => {
      children.set([...$children, menuItem]);
    },
    unregister: (menuItem: MenuItemRegistration) => {
      children.set($children.filter((x) => x.id !== menuItem.id));
    },
    closeMenu: (recursive?: boolean) => {
      open = false;
      if (recursive) {
        closeMenu?.(recursive);
      }

      if (!recursive || depth === 0) {
        menuItemRef?.focus();
      }
    },
    focusPrevious: (fromMenuItemId) => focusPreviousChild($children, fromMenuItemId),
    focusNext: (fromMenuItemId) => focusNextChild($children, fromMenuItemId),
    onOpen: raiseOpen,
    onClose: raiseClose,
    onSelect: raiseSelect
  });
</script>

<button
  aria-controls={menuId}
  aria-disabled={disabled}
  aria-expanded={open}
  aria-haspopup={hasChildren}
  aria-owns={menuId}
  bind:this={menuItemRef}
  class="sterling-menu-item"
  class:composed
  class:disabled
  class:using-keyboard={usingKeyboard}
  data-menu-item-id={menuItemId}
  data-root-menu-item-id={rootMenuItemId}
  {role}
  tabindex={0}
  type="button"
  use:clickOutside
  on:blur
  on:click
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
  on:click={onMenuItemClick}
  on:click_outside={onClickOutside}
  on:keydown={onKeyDown}
  on:mouseenter={onMouseEnter}
  {...$$restProps}
>
  <div class="item" id={displayId}>
    <slot name="item" {checked} {disabled} {hasChildren} {depth} {menuItemId} {open} {role} {text}>
      <MenuItemDisplay {checked} hasChildren={depth > 0 && hasChildren} menuItemRole={role}
        >{text}</MenuItemDisplay
      >
    </slot>
  </div>
  {#if menuItemRef && open && $$slots.default}
    <Menu id={menuId} {open} reference={menuItemRef}>
      <slot />
    </Menu>
  {/if}
</button>

<style>
  .sterling-menu-item {
    background-color: transparent;
    border-color: transparent;
    border-radius: var(--Button__border-radius);
    border-style: none;
    border-width: 0;
    box-sizing: border-box;
    color: var(--Common__color);
    cursor: pointer;
    font: inherit;
    margin: 0;
    padding: 0;
    position: relative;
    outline: none;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
    user-select: none;
  }

  .sterling-menu-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-menu-item:focus {
    outline: none;
  }

  .sterling-menu-item.using-keyboard:focus {
    border-color: var(--Button__border-color--focus);
    outline-color: var(--Common__outline-color);
    outline-offset: var(--Common__outline-offset);
    outline-style: var(--Common__outline-style);
    outline-width: var(--Common__outline-width);
  }

  .sterling-menu-item:focus {
    background-color: var(--Input__background-color--selected);
  }

  .sterling-menu-item.disabled {
    color: var(--Input__color--disabled);
  }

  .sterling-menu-item.composed,
  .sterling-menu-item.composed:focus,
  .sterling-menu-item.composed:hover {
    border-width: 0;
    border-color: transparent;
    outline: none;
    background-color: transparent;
  }

  @media (prefers-reduced-motion) {
    .sterling-menu-item {
      transition: none;
    }
  }
</style>
