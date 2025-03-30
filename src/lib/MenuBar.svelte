<svelte:options runes={true} />

<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { clickOutside } from './actions/clickOutside';
  import { MENU_BAR_CONTEXT_KEY } from './MenuBar.constants';
  import type { MenuBarContext } from './MenuBar.types';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import type { MenuItemContext } from './MenuItem.types';
  import { isElementEnabledMenuItem } from './MenuItem.utils';

  const uuid = $props.id();

  type Props = HTMLAttributes<HTMLDivElement> & {
    onClose?: (value: string) => void;
    onOpen?: (value: string) => void;
    onSelect?: (value: string) => void;
  };

  let { class: _class, children, onClose, onOpen, onSelect, ...rest }: Props = $props();

  const rootValue = `MenuBar-${uuid}`;
  let openValues: string[] = $state([]);
  let prevOpenValue: string | undefined = $state();

  let menuBarRef: HTMLDivElement;

  $effect(() => {
    prevOpenValue = openValues[0];
  });

  // Restore focus to the last open menu bar item when it closes
  $effect(() => {
    if (openValues.length === 0 && prevOpenValue !== undefined) {
      const candidate = menuBarRef.querySelector(`[data-value="${prevOpenValue}"]`);
      (candidate as HTMLElement)?.focus();
      prevOpenValue = undefined;
    }
  });

  export const blur = () => {
    menuBarRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    menuBarRef?.focus(options);
  };

  const getOpenMenuBarItem = () => {
    const value = openValues[0];
    if (value) {
      return menuBarRef.querySelector(`[data-value="${value}"]`);
    }
    return null;
  };

  const openPreviousMenuBarItem = () => {
    const openItem = getOpenMenuBarItem() || menuBarRef.firstElementChild;
    let candidate = openItem?.previousElementSibling || menuBarRef.lastElementChild;

    while (candidate && !isElementEnabledMenuItem(candidate)) {
      candidate = candidate.previousElementSibling || menuBarRef.lastElementChild;
      if (candidate === openItem) {
        return false;
      }
    }

    if (!candidate) {
      candidate = menuBarRef.lastElementChild;
      candidate = candidate && isElementEnabledMenuItem(candidate) ? candidate : null;
    }

    (candidate as HTMLElement)?.click();
    return !!candidate;
  };

  const openNextMenuBarItem = () => {
    const openItem = getOpenMenuBarItem() || menuBarRef.lastElementChild;
    let candidate = openItem?.nextElementSibling || menuBarRef.firstElementChild;

    while (candidate && !isElementEnabledMenuItem(candidate)) {
      candidate = candidate.nextElementSibling || menuBarRef.firstElementChild;
      if (candidate === openItem) {
        return false;
      }
    }

    if (!candidate) {
      candidate = menuBarRef.firstElementChild;
      candidate = candidate && isElementEnabledMenuItem(candidate) ? candidate : null;
    }

    (candidate as HTMLElement)?.click();
    return !!candidate;
  };

  const closeAllMenus = () => {
    openValues = [];
  };

  const onClickOutside = (event: MouseEvent) => {
    let element: HTMLElement | null = event.target as HTMLElement;
    while (element) {
      if (element.getAttribute('data-root-value') === rootValue) {
        return;
      }
      element = element.parentElement;
    }
    closeAllMenus?.();
  };

  let menuBarContext: MenuBarContext = { openPreviousMenuBarItem, openNextMenuBarItem };

  setContext<MenuBarContext>(MENU_BAR_CONTEXT_KEY, menuBarContext);

  let menuItemContext: MenuItemContext = {
    isMenuBarItem: true,
    depth: 0,
    get openValues() {
      return openValues;
    },
    set openValues(value: string[]) {
      openValues = value;
    },
    rootValue,
    onClose,
    onOpen,
    onSelect
  };

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, menuItemContext);
</script>

<div
  bind:this={menuBarRef}
  class={['sterling-menu-bar', _class]}
  role="menubar"
  tabindex="-1"
  {...rest}
  use:clickOutside={{ onclickoutside: onClickOutside }}
>
  {@render children?.()}
</div>
