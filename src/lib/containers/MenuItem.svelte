<script lang="ts">
  import type { Placement } from '@floating-ui/dom';
  import type { Keyborg } from 'keyborg';
  import type { MenuItemContext } from './Menus.types';

  import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import { createKeyborg } from 'keyborg';
  import { getContext, onMount, setContext, tick } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import { portal } from '../portal';
  import { clickOutside } from '../clickOutside';
  import { createEventDispatcher, custom_event } from 'svelte/internal';
  import MenuItemDisplay from './MenuItemDisplay.svelte';
  import { menuItemContextKey } from './Menus.constants';

  // ----- Props ----- //

  type T = $$Generic;

  export let checked = false;
  export let disabled = false;
  export let open = false;
  export let menuItemId: string;
  export let role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem';
  export let selected = false;
  export let text: string;

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  // ----- State ----- //

  let menuItemRef: HTMLButtonElement;
  let popupRef: HTMLDivElement;
  let childrenRef: HTMLDivElement;
  let popupPosition: { x?: number; y?: number } = {
    x: undefined,
    y: undefined
  };
  let mounted = false;
  let insideMenu = false;

  $: hasChildren = $$slots.default;
  $: submenu = insideMenu && hasChildren;

  const instanceId = uuid();

  $: displayId = `${menuItemId}-display-${instanceId}`;
  $: portalId = `${menuItemId}-portal-${instanceId}`;
  $: popupId = `${menuItemId}-popup-${instanceId}`;

  const rootMovePreviousMenu = () => {
    console.log('move prev menu', menuItemId, rootMenuItemId);
    open = false;
    focusPreviousItem();
  };

  const rootMoveNextMenu = () => {
    console.log('move next menu', menuItemId, rootMenuItemId);
    open = false;
    focusNextItem();
  };

  const temp = getContext<MenuItemContext>(menuItemContextKey) || {};
  console.log('key', menuItemId, temp.moveNextMenu);

  // ----- Context ----- //

  const {
    closeParent = undefined,
    closeMenu = undefined,
    movePreviousMenu = rootMovePreviousMenu,
    moveNextMenu = rootMoveNextMenu,
    rootMenuItemId = menuItemId,
    onSelect = undefined
  } = getContext<MenuItemContext>(menuItemContextKey) || {};

  console.log('init', menuItemId, rootMenuItemId);

  // dispatches the event and bubbles it up the context
  // so that higher level components can subscribe to select
  // events for children.
  const raiseSelect = (menuItemId: string) => {
    dispatch('select', { menuItemId });
    onSelect?.(menuItemId);
  };

  setContext(menuItemContextKey, {
    rootMenuItemId: rootMenuItemId,
    closeMenu: () => {
      open = false;
      closeMenu?.();
    },
    closeParent: () => {
      open = false;
      menuItemRef.focus();
    },
    movePreviousMenu,
    moveNextMenu,
    onSelect: raiseSelect
  });

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

  const focusPreviousItem = () => {
    // previousSibling or previousElementSibling are not used as other siblings may not be menu items
    const menuItems = menuItemRef?.parentElement?.querySelectorAll('[data-menu-item-id]');
    const menuItemArray = menuItems ? Array.from(menuItems) : [];
    const index = menuItemArray.findIndex(
      (x) => x.getAttribute('data-menu-item-id') === menuItemId
    );
    if (index !== -1) {
      const focusIndex = index === 0 ? menuItemArray.length - 1 : index - 1;
      (<HTMLButtonElement>menuItemArray[focusIndex])?.focus();
    }
  };

  const focusNextItem = (test?: boolean) => {
    // nextSibling or nextElementSibling are not used as other siblings may not be menu items
    const menuItems = menuItemRef?.parentElement?.querySelectorAll('[data-menu-item-id]');
    const menuItemArray = menuItems ? Array.from(menuItems) : [];
    const index = menuItemArray.findIndex(
      (x) => x.getAttribute('data-menu-item-id') === menuItemId
    );
    if (index !== -1) {
      const focusIndex = (index + 1) % menuItemArray.length;
      (<HTMLButtonElement>menuItemArray[focusIndex])?.focus();
      // if (test && menuItemArray[focusIndex]) {
      //   (menuItemArray[focusIndex] as unknown as HTMLButtonElement).setAttribute('open', true);
      // }
    }
  };

  const focusFirstChild = () => {
    const portal = document.querySelector(`#${portalId}`);
    const menuItems = portal?.querySelectorAll('[data-menu-item-id]');
    const menuItemArray = menuItems ? Array.from(menuItems) : [];
    if (menuItemArray.length > 0) {
      (<HTMLButtonElement>menuItemArray[0])?.focus();
    }
  };

  const autoFocusFirstChild = (open: boolean, insideMenu: boolean) => {
    if (open && insideMenu) {
      console.log('focus first child');
      setTimeout(() => {
        focusFirstChild();
      }, 10);
    }
  };

  $: autoFocusFirstChild(open, insideMenu);

  // ----- Event Handlers ----- //

  onMount(() => {
    mounted = true;
    insideMenu = !!menuItemRef.parentElement?.closest('.popup');
    keyborg.subscribe(keyborgHandler);
    return () => {
      keyborg.unsubscribe(keyborgHandler);
    };
  });

  const onKeyDown: svelte.JSX.KeyboardEventHandler<Element> = (event) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'ArrowDown':
          if (insideMenu) {
            focusNextItem();
            event.preventDefault();
            return false;
          } else if (hasChildren) {
            open = true;
            setTimeout(focusFirstChild, 10);
            event.preventDefault();
            return false;
          }
        case 'ArrowLeft':
          if (insideMenu) {
            if (open) {
              open = false;
            } else {
              closeParent?.();
            }
          } else {
            movePreviousMenu();
          }

          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (insideMenu && hasChildren) {
            open = true;
            setTimeout(focusFirstChild, 10);
          } else {
            moveNextMenu();
          }
          event.preventDefault();
          return false;
          break;
        case 'ArrowUp':
          focusPreviousItem();
          event.preventDefault();
          return false;
        case 'Escape':
          closeMenu?.();
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
        closeMenu?.();
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

    closeMenu?.();
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
    <div class="portal" id={portalId} use:portal={{ target: portalTarget }}>
      <div
        bind:this={popupRef}
        class="popup"
        class:open
        id={popupId}
        style="left:{popupPosition.x}px; top:{popupPosition.y}px"
      >
        {#if $$slots.default}
          <div bind:this={childrenRef} class="children" role="group">
            <slot />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</button>

<style>
  .sterling-menu-item {
    background-color: var(--Common__background-color);
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
