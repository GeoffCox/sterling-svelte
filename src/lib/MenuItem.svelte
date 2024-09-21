<svelte:options runes={true} />

<script lang="ts">
  import type { MenuItemContext, MenuItemRole } from './MenuItem.types';

  import { getContext, setContext, tick, type Snippet } from 'svelte';

  import { idGenerator } from './idGenerator';
  import Menu from './Menu.svelte';
  import { MENU_BAR_CONTEXT_KEY } from './MenuBar.constants';
  import type { MenuBarContext } from './MenuBar.types';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { isElementEnabledMenuItem } from './MenuItem.utils';
  import Popover from './Popover.svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type {
    HTMLButtonAttributes,
    KeyboardEventHandler,
    MouseEventHandler
  } from 'svelte/elements';

  type Props = HTMLButtonAttributes & {
    checked?: boolean | null;
    item?: Snippet;
    menuClass?: string;
    onclose?: (value: string) => void;
    onopen?: (value: string) => void;
    onselect?: (value: string) => void;
    role?: MenuItemRole;
    shortcut?: string;
    text?: string;
    value: string;
  };

  let {
    checked,
    children,
    class: _class,
    disabled,
    item,
    menuClass,
    onclose,
    onopen,
    onselect,
    role = 'menuitem',
    text,
    shortcut,
    value,
    ...rest
  }: Props = $props();

  const menuItemContext = getContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY) || {};

  const menuBarContext = getContext<MenuBarContext>(MENU_BAR_CONTEXT_KEY) || {};

  const instanceId = idGenerator.nextId('MenuItem');

  let displayId = $derived(`${value}-display-${instanceId}`);
  let open = $derived(menuItemContext.openValues?.includes(value));
  let prevOpen = $state(menuItemContext.openValues?.includes(value));
  let menuId = $derived(`${value}-menu-${instanceId}`);

  let menuItemRef: HTMLButtonElement | undefined = $state();
  let menuRef: Menu | undefined = $state();

  //#region methods

  export const blur = () => {
    menuItemRef?.blur();
  };

  export const click = () => {
    menuItemRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    menuItemRef?.focus(options);
  };

  //#endregion

  //#region events

  const raiseClose = (value: string) => {
    onclose?.(value);
    menuItemContext.onClose?.(value);
  };

  const raiseOpen = (value: string) => {
    onopen?.(value);
    menuItemContext.onOpen?.(value);
  };

  const raiseSelect = (value: string) => {
    onselect?.(value);
    menuItemContext.onSelect?.(value);
  };

  $effect(() => {
    if (open !== prevOpen) {
      open ? raiseOpen(value) : raiseClose(value);
    }
    prevOpen = open;
  });

  //#endregion

  //#region focus

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

  //#endregion

  //#region open/close

  // opens the menu for this menu item
  const openMenu = () => {
    console.log('MenuItem open menu', value, menuItemContext.depth);
    if (!menuItemContext.openValues.includes(value)) {
      // slice to depth to close any sibling menus that are open
      menuItemContext.openValues = [
        ...menuItemContext.openValues.slice(0, menuItemContext.depth),
        value
      ];
    }
  };

  // closes the menu for this menu item
  const closeMenu = async () => {
    const index = menuItemContext.openValues.indexOf(value);
    if (index !== -1) {
      menuItemContext.openValues = [...menuItemContext.openValues.slice(0, index)];
      await tick();
      menuItemRef?.focus();
    }
  };

  const closeAllMenus = () => {
    menuItemContext.openValues = [];
  };

  //#endregion

  //#region event handlers

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = async (event) => {
    if (!disabled && !event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'ArrowDown':
          // ARIA menubar/menuitem:
          // If the currently focused menuitem has a submenu,
          // opens the submenu and places focus on the first item in the submenu.
          if (menuItemContext.isMenuBarItem && children) {
            openMenu();
            setTimeout(async () => {
              await tick();
              menuRef?.focusFirstMenuItem();
            }, 10);
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          if (!menuItemContext.isMenuBarItem) {
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
          if (menuItemContext.isMenuBarItem) {
            focusPreviousMenuItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menuitem:
          // When focus is in a submenu of an item in a menu,
          // closes the submenu and returns focus to the parent menuitem.
          if (menuItemContext.depth && menuItemContext.depth > 1) {
            menuItemContext.closeContainingMenu?.();
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
          menuBarContext.openPreviousMenuBarItem?.();
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowRight':
          // ARIA menubar:
          // Moves focus to the next item, optionally wrapping from the last to the first.
          if (menuItemContext.isMenuBarItem) {
            focusNextMenuItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }

          // ARIA menuitem:
          // When focus is in a menu and on a menuitem that has a submenu,
          // opens the submenu and places focus on its first item
          if (children) {
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
          if (menuBarContext.openNextMenuBarItem) {
            menuBarContext.openNextMenuBarItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          // ARIA menubar/menuitem:
          // If the currently focused menuitem has a submenu,
          // opens the submenu and places focus on the last item in the submenu.
          if (menuItemContext.isMenuBarItem && children) {
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
          if (!menuItemContext.isMenuBarItem) {
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
          // open = false;
          closeAllMenus();
          event.preventDefault();
          event.stopPropagation();
          return false;
      }
    }
    rest.onkeydown?.(event);
  };

  const onMouseEnter: MouseEventHandler<HTMLButtonElement> = (event) => {
    menuItemRef?.focus();
    rest.onmouseenter?.(event);
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!disabled) {
      if (children) {
        if (!menuItemContext.openValues.includes(value)) {
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
    rest.onclick?.(event);
  };

  //#endregion

  //#region set context
  let menuItemChildContext: MenuItemContext = {
    isMenuBarItem: false,
    get openValues() {
      return menuItemContext.openValues;
    },
    set openValues(value: string[]) {
      menuItemContext.openValues = value;
    },
    rootValue: menuItemContext.rootValue || value,
    depth: menuItemContext.depth ? menuItemContext.depth + 1 : 1,
    closeContainingMenu: closeMenu,
    onOpen: raiseOpen,
    onClose: raiseClose,
    onSelect: raiseSelect
  };

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, menuItemChildContext);

  //#endregion
</script>

{#snippet renderDefaultItem()}
  <div class="sterling-menu-item-display" class:disabled>
    <div
      class="check"
      class:checkmark={role === 'menuitemcheckbox'}
      class:bullet={role === 'menuitemradio'}
      class:checked
    ></div>
    <div class="content">
      {text}
    </div>
    {#if shortcut}
      <div class="shortcut">
        {shortcut}
      </div>
    {/if}
    <div class="chevron" class:has-children={!menuItemContext.isMenuBarItem && !!children}></div>
  </div>
{/snippet}

<button
  bind:this={menuItemRef}
  aria-controls={menuId}
  aria-disabled={disabled}
  aria-expanded={open}
  aria-haspopup={!!children}
  aria-owns={menuId}
  class={`sterling-menu-item ${_class}`}
  class:using-keyboard={usingKeyboard}
  data-value={value}
  data-root-value={menuItemContext.rootValue}
  {disabled}
  {role}
  tabindex={0}
  type="button"
  {...rest}
  onclick={onClick}
  onkeydown={onKeyDown}
  onmouseenter={onMouseEnter}
>
  <div class="item" id={displayId}>
    {#if item}
      {@render item()}
    {:else}
      {@render renderDefaultItem()}
    {/if}
  </div>
  {#if menuItemRef && open && children}
    <Popover
      reference={menuItemRef}
      placement={menuItemContext.isMenuBarItem ? 'bottom-start' : 'right-start'}
      {open}
    >
      <Menu bind:this={menuRef} id={menuId} class={menuClass}>
        {@render children()}
      </Menu>
    </Popover>
  {/if}
</button>
