<script lang="ts">
  import type { MenuItemRegistration, MenuItemContext, MenuItemRole } from './MenuItem.types';

  import {
    getContext,
    afterUpdate,
    createEventDispatcher,
    onMount,
    setContext,
    tick
  } from 'svelte';
  import { writable } from 'svelte/store';

  import { idGenerator } from './idGenerator';
  import Menu from './Menu.svelte';
  import { MENU_BAR_CONTEXT_KEY } from './MenuBar.constants';
  import type { MenuBarContext } from './MenuBar.types';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { isElementEnabledMenuItem } from './MenuItem.utils';
  import MenuItemDisplay from './MenuItemDisplay.svelte';
  import Popover from './Popover.svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { KeyboardEventHandler } from 'svelte/elements';

  // ----- Props ----- //

  /**
   * When true, the menu item is checked.
   * Use with role='menuitemcheckbox' or role='menuitemradio'.
   */
  export let checked = false;

  /** When true, the menu item is disabled. */
  export let disabled = false;

  /** The role of the menu item. */
  export let role: MenuItemRole = 'menuitem';

  /** The text of the menu item. Not used when the item slot is filled.*/
  export let text: string | undefined = undefined;

  /** The value uniquely identifying this menu item within the menu hierarchy. */
  export let value: string;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- Get Context ----- //

  const {
    isMenuBarItem,
    openValues = writable([]),
    rootValue = value,
    depth = 0,
    closeContainingMenu = undefined,
    onOpen = undefined,
    onClose = undefined,
    onSelect = undefined
  } = getContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY) || {};

  const { openPreviousMenuBarItem = undefined, openNextMenuBarItem = undefined } =
    getContext<MenuBarContext>(MENU_BAR_CONTEXT_KEY) || {};

  // ----- State ----- //

  const instanceId = idGenerator.nextId('MenuItem');

  $: displayId = `${value}-display-${instanceId}`;
  $: open = $openValues.includes(value);
  $: menuId = `${value}-menu-${instanceId}`;

  let menuItemRef: HTMLButtonElement;
  let menuRef: Menu;

  const children = writable<MenuItemRegistration[]>([]);

  let mounted = false;
  let prevOpen = open;

  $: hasChildren = $$slots.default;

  // ----- Methods ----- //

  export const blur = () => {
    menuItemRef?.blur();
  };

  export const click = () => {
    menuItemRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    menuItemRef?.focus(options);
  };

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseClose = (value: string) => {
    dispatch('close', { value });
    onClose?.(value);
  };

  const raiseOpen = (value: string) => {
    dispatch('open', { value });
    onOpen?.(value);
  };

  $: {
    if (hasChildren && open !== prevOpen) {
      open ? raiseOpen(value) : raiseClose(value);
    }
    prevOpen = open;
  }

  // dispatches the event and bubbles it up the context
  // so that container components can subscribe to select
  // events for children.
  const raiseSelect = (value: string) => {
    dispatch('select', { value });
    onSelect?.(value);
  };

  // ----- Focus ----- //

  const focusPreviousMenuItem = () => {
    let candidate =
      menuItemRef?.previousElementSibling || menuItemRef?.parentElement?.lastElementChild;
    while (candidate && !isElementEnabledMenuItem(candidate)) {
      candidate = candidate.previousElementSibling || menuItemRef?.parentElement?.lastElementChild;

      if (candidate === menuItemRef) {
        return false;
      }
    }
    (candidate as HTMLElement)?.focus();
    return !!candidate;
  };

  const focusNextMenuItem = () => {
    let candidate =
      menuItemRef?.nextElementSibling || menuItemRef?.parentElement?.firstElementChild;
    while (candidate && !isElementEnabledMenuItem(candidate)) {
      candidate = candidate.nextElementSibling || menuItemRef?.parentElement?.firstElementChild;

      if (candidate === menuItemRef) {
        return false;
      }
    }
    (candidate as HTMLElement)?.focus();
    return !!candidate;
  };

  // ----- Open/Close ----- //

  // opens the menu for this menu item
  const openMenu = () => {
    if (!$openValues.includes(value)) {
      // slice to depth to close any sibling menus that are open
      openValues.set([...$openValues.slice(0, depth), value]);
    }
  };

  // closes the menu for this menu item
  const closeMenu = async () => {
    const index = $openValues.indexOf(value);
    if (index !== -1) {
      openValues.set([...$openValues.slice(0, index)]);
      await tick();
      menuItemRef?.focus();
    }
  };

  const closeAllMenus = () => {
    openValues.set([]);
  };

  // ----- Event Handlers ----- //

  onMount(() => {
    mounted = true;
  });

  afterUpdate(() => {
    prevOpen = open;
  });

  const onKeyDown: KeyboardEventHandler<Element> = async (event) => {
    if (!disabled && !event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'ArrowDown':
          // ARIA menubar/menuitem:
          // If the currently focused menuitem has a submenu,
          // opens the submenu and places focus on the first item in the submenu.
          if (isMenuBarItem && hasChildren) {
            openMenu();
            setTimeout(async () => {
              await tick();
              menuRef?.focusFirstMenuItem();
            }, 10);
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          if (!isMenuBarItem) {
            // ARIA menuitem:
            // Moves focus to the next item, optionally wrapping from the last to the first.
            focusNextMenuItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowLeft':
          // ARIA menubar/menuitem:
          // Moves focus to the previous item, optionally wrapping from the first to the last.
          if (isMenuBarItem) {
            focusPreviousMenuItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menuitem:
          // When focus is in a submenu of an item in a menu,
          // closes the submenu and returns focus to the parent menuitem.
          if (depth > 1) {
            closeContainingMenu?.();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menubar/menuitem:
          // When focus is in a submenu of an item in a menubar,
          // closes the submenu,
          // moves focus to the previous item in the menubar,
          // and,
          // if focus is now on a menuitem with a submenu,
          // either opens the submenu of that menuitem without moving focus into the submenu,
          // or opens the submenu of that menuitem and places focus on the first item in the submenu.
          openPreviousMenuBarItem?.();
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowRight':
          // ARIA menubar:
          // Moves focus to the next item, optionally wrapping from the last to the first.
          if (isMenuBarItem) {
            focusNextMenuItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menuitem:
          // When focus is in a menu and on a menuitem that has a submenu,
          // opens the submenu and places focus on its first item
          if (hasChildren) {
            openMenu();
            setTimeout(async () => {
              await tick();
              menuRef?.focusFirstMenuItem();
            }, 10);
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menubar/menuitem:
          // When focus is in a menu and on an item that does not have a submenu,
          // closes the submenu and any parent menus,
          // moves focus to the next item in the menubar,
          // and,
          // if focus is now on a menuitem with a submenu,
          // either opens the submenu of that menuitem without moving focus into the submenu,
          // or opens the submenu of that menuitem and places focus on the first item in the submenu.
          if (openNextMenuBarItem) {
            openNextMenuBarItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          // ARIA menubar/menuitem:
          // If the currently focused menuitem has a submenu,
          // opens the submenu and places focus on the last item in the submenu.
          if (isMenuBarItem && hasChildren) {
            openMenu();
            setTimeout(async () => {
              await tick();
              menuRef?.focusLastMenuItem();
            }, 10);
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menuitem:
          // Moves focus to the previous item, optionally wrapping from the first to the last.
          if (!isMenuBarItem) {
            focusPreviousMenuItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'Escape':
          // ARIA menuitem:
          // Close the menu that contains focus and return focus to the element or context,
          // e.g., menu button or parent menuitem, from which the menu was opened.
          open = false;
          closeAllMenus();
          event.preventDefault();
          event.stopPropagation();
          return false;
      }
    }
  };

  const onMouseEnter = (event: MouseEvent) => {
    menuItemRef?.focus();
  };

  const onClick = (event: MouseEvent) => {
    if (!disabled) {
      if (hasChildren) {
        if (!$openValues.includes(value)) {
          openMenu();
          if ($usingKeyboard) {
            setTimeout(async () => {
              await tick();
              menuRef?.focusFirstMenuItem();
            }, 10);
          }
        } else {
          closeMenu();
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      } else {
        raiseSelect(value);
        closeAllMenus();
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  };

  // ----- Set Context ----- //

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
    isMenuBarItem: false,
    openValues,
    rootValue,
    depth: depth + 1,
    closeContainingMenu: () => {
      closeMenu();
    },
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
  class={`sterling-menu-item ${variant}`}
  class:using-keyboard={usingKeyboard}
  data-value={value}
  data-root-value={rootValue}
  {disabled}
  {role}
  tabindex={0}
  type="button"
  on:blur
  on:click
  on:dblclick
  on:dragend
  on:dragenter
  on:dragleave
  on:dragover
  on:dragstart
  on:drop
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
  on:wheel|passive
  on:click={onClick}
  on:keydown={onKeyDown}
  on:mouseenter={onMouseEnter}
  {...$$restProps}
>
  <div class="item" id={displayId}>
    <slot
      name="item"
      {checked}
      {depth}
      {disabled}
      {hasChildren}
      {isMenuBarItem}
      {open}
      {role}
      {text}
      {value}
      {variant}
    >
      <MenuItemDisplay
        {checked}
        {disabled}
        {hasChildren}
        {isMenuBarItem}
        menuItemRole={role}
        {variant}>{text}</MenuItemDisplay
      >
    </slot>
  </div>
  {#if menuItemRef && open && hasChildren}
    <Popover
      reference={menuItemRef}
      placement={isMenuBarItem ? 'bottom-start' : 'right-start'}
      {open}
    >
      <Menu bind:this={menuRef} id={menuId}>
        <slot {depth} {disabled} />
      </Menu>
    </Popover>
  {/if}
</button>
