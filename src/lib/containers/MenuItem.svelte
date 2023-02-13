<script lang="ts">
  import type { Placement } from '@floating-ui/dom';
  import type { Keyborg } from 'keyborg';
  import type { MenuBarContext, MenuItem, MenuItemContext } from './Menus.types';

  import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import { createKeyborg } from 'keyborg';
  import { getContext, onMount, setContext, tick } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import { portal } from '../portal';
  import { clickOutside } from '../clickOutside';
  import { createEventDispatcher, custom_event } from 'svelte/internal';
  import MenuItemDisplay from './MenuItemDisplay.svelte';
  import { menuBarContextKey, menuItemContextKey } from './Menus.constants';
  import { writable } from 'svelte/store';

  // ----- Props ----- //

  type T = $$Generic;

  export let checked = false;
  export let disabled = false;
  export let open = false;
  export let menuItemId: string;
  export let role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem';
  export let selected = false;
  export let text: string;

  // ----- State ----- //

  const instanceId = uuid();

  $: displayId = `${menuItemId}-display-${instanceId}`;
  $: portalId = `${menuItemId}-portal-${instanceId}`;
  $: popupId = `${menuItemId}-popup-${instanceId}`;

  let menuItemRef: HTMLButtonElement;
  let popupRef: HTMLDivElement;
  let childrenRef: HTMLDivElement;

  let popupPosition: { x?: number; y?: number } = {
    x: undefined,
    y: undefined
  };

  const children = writable<MenuItem[]>([]);

  let mounted = false;
  let insideMenu = false;

  $: hasChildren = $$slots.default;
  $: submenu = insideMenu && hasChildren;

  // ----- Get Context ----- //

  const {
    rootMenuItemId = menuItemId,
    level = 0,
    register = undefined,
    unregister = undefined,
    closeMenu = undefined,
    focusPrevious = undefined,
    focusNext = undefined,
    onOpen = undefined,
    onClose = undefined,
    onSelect = undefined
  } = getContext<MenuItemContext>(menuItemContextKey) || {};

  const { openPreviousMenu = undefined, openNextMenu = undefined } =
    getContext<MenuBarContext>(menuBarContextKey) || {};

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

  // dispatches the event and bubbles it up the context
  // so that higher level components can subscribe to select
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

  // ----- Popup Position ----- //

  $: popupPlacement = (insideMenu ? 'right-start' : 'bottom-start') as Placement;
  const middleware = [offset({ mainAxis: -2 }), flip(), shift({ padding: 0 })];

  const computePopupPosition = async () => {
    popupPosition = await computePosition(menuItemRef, popupRef, {
      placement: popupPlacement,
      middleware
    });
  };

  // whenever a popup is portaled it needs resubscription to auto-update
  let cleanupAutoUpdate = () => {};
  const autoUpdatePopupPosition = () => {
    cleanupAutoUpdate();
    if (menuItemRef && popupRef) {
      cleanupAutoUpdate = autoUpdate(menuItemRef, popupRef, computePopupPosition);
    }
  };

  $: mounted, open, menuItemRef, popupRef, autoUpdatePopupPosition();

  // ----- Focus ----- //

  const focusPreviousChild = (fromMenuItemId: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
    if (index !== -1) {
      const focusIndex = index === 0 ? $children.length - 1 : index - 1;
      $children[focusIndex].focus();
    }
  };

  const focusNextChild = (fromMenuItemId: string) => {
    const index = $children?.findIndex((menuItem) => menuItem.id === fromMenuItemId);
    if (index !== -1) {
      const focusIndex = (index + 1) % $children.length;
      $children[focusIndex].focus();
    }
  };

  const focusFirstChild = () => {
    $children[0]?.focus();
  };

  const focusLastChild = () => {
    $children[$children.length - 1]?.focus();
  };

  const autoFocusFirstChild = (open: boolean, insideMenu: boolean) => {
    if (open && insideMenu) {
      setTimeout(focusFirstChild, 10);
    }
  };

  $: autoFocusFirstChild(open, insideMenu);

  // ----- Event Handlers ----- //

  onMount(() => {
    mounted = true;
    insideMenu = !!menuItemRef.parentElement?.closest('[role="menu"]');
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

  const onKeyDown: svelte.JSX.KeyboardEventHandler<Element> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'ArrowDown':
          if (insideMenu) {
            // When inside a menu, focus next sibling menu item.
            focusNext?.(menuItemId);
            event.preventDefault();
            return false;
          } else if (hasChildren) {
            // When inside a menubar, open and focus first child.
            open = true;
            setTimeout(focusFirstChild, 10);
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowLeft':
          if (level > 1 && insideMenu) {
            // When inside non-top-level menu, close the containing menu
            closeMenu?.();
          } else {
            // When in a top-level menu, open the previous top-level menu
            open = false;
            closeMenu?.(true);
            openPreviousMenu?.(rootMenuItemId);
          }
          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (level > 0 && hasChildren) {
            // When inside a menu, show the subment
            open = true;
            setTimeout(focusFirstChild, 10);
          } else {
            // When not inside a menu, or when there are not children
            // open the next top-level menu
            open = false;
            closeMenu?.(true);
            openNextMenu?.(rootMenuItemId);
          }
          event.preventDefault();
          return false;
        case 'ArrowUp':
          if (insideMenu) {
            // When inside a menu focus the previous item
            focusPrevious?.(menuItemId);
            event.preventDefault();
            return false;
          } else if (hasChildren) {
            // When inside a menubar, open and focus last child.
            open = true;
            setTimeout(focusLastChild, 10);
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

    console.log('clicked outside menu');
    closeMenu?.(true);
  };

  // ----- Portal Host ----- //

  const ensurePortalHost = () => {
    let host = document.querySelector('#SterlingMenuPortal') as HTMLElement;
    if (!host) {
      host = document.createElement('div');
      host.id = 'SterlingMenuPortal';
      host.style.overflow = 'visible';
      document.body.append(host);
    }
    return host;
  };

  const portalTarget = ensurePortalHost();

  // ----- Set Context ----- //

  setContext<MenuItemContext>(menuItemContextKey, {
    rootMenuItemId: rootMenuItemId,
    level: level + 1,
    register: (menuItem: MenuItem) => {
      children.set([...$children, menuItem]);
    },
    unregister: (menuItem: MenuItem) => {
      children.set($children.filter((x) => x.id !== menuItem.id));
    },
    closeMenu: (recursive?: boolean) => {
      open = false;
      if (recursive) {
        closeMenu?.(recursive);
      } else {
        menuItemRef?.focus();
      }
    },
    focusPrevious: focusPreviousChild,
    focusNext: focusNextChild,
    onOpen: raiseOpen,
    onClose: raiseClose,
    onSelect: raiseSelect
  });
</script>

<button
  aria-controls={popupId}
  aria-disabled={disabled}
  aria-expanded={open}
  aria-haspopup={hasChildren}
  aria-owns={popupId}
  bind:this={menuItemRef}
  class="sterling-menu-item"
  class:disabled
  class:submenu
  class:selected
  class:using-keyboard={usingKeyboard}
  data-menu-item-id={menuItemId}
  data-root-menu-item-id={rootMenuItemId}
  {role}
  tabindex={insideMenu ? -1 : 0}
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
    <slot name="item" {disabled} {menuItemId} {text}>
      <MenuItemDisplay {checked} hasChildren={hasChildren && submenu} menuItemRole={role}
        >{text}</MenuItemDisplay
      >
    </slot>
  </div>
  {#if open && $$slots.default}
    <div
      class="portal"
      data-root-menu-id={rootMenuItemId}
      id={portalId}
      use:portal={{ target: portalTarget }}
    >
      <div
        bind:this={popupRef}
        class="popup"
        class:open
        id={popupId}
        style="left:{popupPosition.x}px; top:{popupPosition.y}px"
      >
        {#if $$slots.default}
          <div bind:this={childrenRef} class="children" role="menu">
            <slot />
          </div>
        {/if}
      </div>
    </div>
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

  .sterling-menu-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .sterling-menu-item.disabled {
    color: var(--Input__color--disabled);
  }

  .portal {
    position: relative;
    overflow: visible;
  }

  .popup {
    background-color: var(--Common__background-color);
    border-color: var(--Common__border-color);
    border-radius: var(--Common__border-radius);
    border-style: var(--Common__border-style);
    border-width: var(--Common__border-width);
    box-sizing: border-box;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px -1px;
    overflow: hidden;
    width: max-content;
    height: fit-content;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .popup.open {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .children {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: calc(2 * var(--Common__outline-width));
    padding: 0.25em;
  }

  @media (prefers-reduced-motion) {
    .sterling-menu-item {
      transition: none;
    }
  }
</style>
