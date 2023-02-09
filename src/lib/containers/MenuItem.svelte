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
  import { custom_event } from 'svelte/internal';
  import { forwardEvents } from '$lib/forwardEvents';

  // ----- Props ----- //

  type T = $$Generic;

  export let disabled = false;
  export let open = false;
  export let menuItemId: string;
  export let selected = false;
  export let text: string;

  // ----- Events ----- //

  const raiseSelected = (targetMenuItemId: string) => {
    console.log('raiseSelected', targetMenuItemId, menuItemId);
    menuItemRef.dispatchEvent(
      custom_event<svelte.JSX.MenuItemSelectedEventDetail>(
        'menuitem_selected',
        { menuItemId: targetMenuItemId },
        { bubbles: true, cancelable: true }
      )
    );
  };

  // ----- State ----- //
  const popupId = uuid();

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

  const context = getContext<MenuItemContext>('sterlingMenuItem');

  const {
    closeParent = undefined,
    closeMenu = undefined,
    rootMenuItemId = menuItemId
  } = getContext<MenuItemContext>('sterlingMenuItem') || {};

  setContext('sterlingMenuItem', {
    rootMenuItemId: rootMenuItemId,
    closeMenu: () => {
      open = false;
      closeMenu?.();
    },
    closeParent: () => {
      open = false;
      menuItemRef.focus();
    }
  });

  let usingKeyboard = false;
  let keyborg: Keyborg = createKeyborg(window);

  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  onMount(() => {
    mounted = true;
    insideMenu = !!menuItemRef.parentElement?.closest('.popup');
    keyborg.subscribe(keyborgHandler);
    return () => {
      keyborg.unsubscribe(keyborgHandler);
    };
  });

  $: submenu = insideMenu && $$slots.default;

  // ----- Popup Position ----- //

  $: popupPlacement = (insideMenu ? 'right-start' : 'bottom-start') as Placement;
  const middleware = [offset({ mainAxis: -5 }), flip(), shift({ padding: 0 })];

  const computePopupPosition = async () => {
    popupPosition = await computePosition(menuItemRef, popupRef, {
      placement: popupPlacement,
      middleware
    });
  };

  let cleanupAutoUpdate = () => {};
  const autoUpdatePopupPosition = () => {
    cleanupAutoUpdate();
    if (menuItemRef && popupRef) {
      cleanupAutoUpdate = autoUpdate(menuItemRef, popupRef, computePopupPosition);
    }
  };

  $: mounted, open, menuItemRef, popupRef, autoUpdatePopupPosition();

  // ----- Selection ----- //

  const focusPreviousItem = () => {
    // previousSibling or previousElementSibling are not used as other siblings may not be menu items
    const menuItemCollection =
      menuItemRef?.parentElement?.getElementsByClassName('sterling-menu-item');

    const menuItems = menuItemCollection ? Array.from(menuItemCollection) : [];
    const index = menuItems.findIndex((x) => x.getAttribute('data-menu-item-id') === menuItemId);
    if (index !== -1) {
      const focusIndex = index === 0 ? menuItems.length - 1 : index - 1;
      (<HTMLButtonElement>menuItems[focusIndex])?.focus();
    }
  };

  const focusNextItem = () => {
    // nextSibling or nextElementSibling are not used as other siblings may not be menu items
    const menuItemCollection =
      menuItemRef?.parentElement?.getElementsByClassName('sterling-menu-item');

    const menuItems = menuItemCollection ? Array.from(menuItemCollection) : [];
    const index = menuItems.findIndex((x) => x.getAttribute('data-menu-item-id') === menuItemId);
    if (index !== -1) {
      const focusIndex = (index + 1) % menuItems.length;
      (<HTMLButtonElement>menuItems[focusIndex])?.focus();
    }
  };

  const focusFirstChild = () => {
    const portal = document.querySelector(`#${menuItemId}-portal`);
    const children = portal?.querySelector('.children');
    const menuItemCollection = children?.getElementsByClassName('sterling-menu-item');
    const menuItems = menuItemCollection ? Array.from(menuItemCollection) : [];
    const firstChild = menuItems[0] as HTMLButtonElement;
    console.log(
      'focusFirstChild',
      !!portal,
      !!children,
      !!menuItemCollection,
      !!menuItems,
      !!firstChild
    );
    firstChild?.focus();
  };

  // $: {
  //   if (open && $$slots.default) {
  //     setTimeout(() => {
  //       focusFirstChild();
  //     }, 10);
  //   }
  // }

  // ----- Event Handlers ----- //

  const onKeyDown: svelte.JSX.KeyboardEventHandler<Element> = (event) => {
    console.log(event.key);
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Escape':
          closeMenu?.();
          event.preventDefault();
          return false;
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
          if (open) {
            open = false;
          } else {
            closeParent?.();
          }
          event.preventDefault();
          return false;
        case 'ArrowRight':
          if (hasChildren) {
            open = true;
            setTimeout(focusFirstChild, 10);
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowUp':
          focusPreviousItem();
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
        raiseSelected(menuItemId);
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
  aria-expanded={open}
  aria-haspopup="menu"
  bind:this={menuItemRef}
  class="sterling-menu-item"
  class:disabled
  class:submenu
  class:selected
  class:using-keyboard={usingKeyboard}
  data-menu-item-id={menuItemId}
  data-root-menu-item-id={rootMenuItemId}
  role="menuitem"
  tabindex="0"
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
  on:menuitem_selected
  {...$$restProps}
>
  <div class="item">
    <slot name="text" {disabled} {menuItemId} {text}>
      <div>{text}</div>
    </slot>
    <div class="chevron" />
  </div>
  {#if open && $$slots.default}
    <div class="portal" id={`${menuItemId}-portal`} use:portal={{ target: portalTarget }}>
      <div
        bind:this={popupRef}
        class="popup"
        class:open
        id={`${menuItemId}-${popupId}`}
        style="left:{popupPosition.x}px; top:{popupPosition.y}px"
        use:forwardEvents={{ target: menuItemRef, customEvents: ['menuitem_selected'] }}
      >
        {#if $$slots.default}
          <div class="children" bind:this={childrenRef}>
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
    padding: 0.5em;
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

  .sterling-menu-item.using-keyboard:focus-visible {
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

  .item {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: flex-start;
    justify-items: flex-start;
    column-gap: 0.25em;
  }

  .chevron {
    position: relative;
    border: none;
    background: none;
    height: 1em;
    width: 1em;
    transform-origin: 50% 50%;
    visibility: hidden;
  }

  .chevron::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    border-right: 3px solid currentColor;
    border-top: 3px solid currentColor;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .sterling-menu-item.submenu .chevron {
    visibility: visible;
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
