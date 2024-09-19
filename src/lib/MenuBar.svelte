<svelte:options runes={true} />

<script lang="ts">
  import type { MenuBarContext } from './MenuBar.types';
  import type { MenuItemContext } from './MenuItem.types';

  import { setContext } from 'svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';

  import { MENU_BAR_CONTEXT_KEY } from './MenuBar.constants';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { isElementEnabledMenuItem } from './MenuItem.utils';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    onclose?: (value: string) => void;
    onopen?: (value: string) => void;
    onselect?: (value: string) => void;
  };

  let { class: _class, children, onclose, onopen, onselect, ...rest }: Props = $props();

  let openValues: string[] = $state([]);
  const rootValue = idGenerator.nextId('MenuBar');

  let menuBarRef: HTMLDivElement;
  let prevOpenValue: string | undefined = $derived(openValues?.[0]);

  // Restore focus to the last open menu bar item when it closes
  $effect(() => {
    if (openValues.length === 0 && prevOpenValue !== undefined) {
      const candidate = menuBarRef.querySelector(`[data-value="${prevOpenValue}"]`);
      (candidate as HTMLElement)?.focus();
      //prevOpenValue = undefined;
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

  const onclickoutside = (event: MouseEvent) => {
    let element: HTMLElement | null = event.target as HTMLElement;
    while (element) {
      if (element.getAttribute('data-root-value') === rootValue) {
        return;
      }
      element = element.parentElement;
    }
    closeAllMenus?.();
  };

  let menuBarContext: MenuBarContext = $state({ openPreviousMenuBarItem, openNextMenuBarItem });

  setContext<MenuBarContext>(MENU_BAR_CONTEXT_KEY, menuBarContext);

  $inspect(openValues);

  let menuItemContext: MenuItemContext = $state({
    isMenuBarItem: true,
    get openValues() {
      return openValues;
    },
    set openValues(value: string[]) {
      openValues = value;
    },
    rootValue,
    onClose: onclose,
    onOpen: onopen,
    onSelect: onselect
  });

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, menuItemContext);
</script>

<div
  bind:this={menuBarRef}
  class={`sterling-menu-bar ${_class}`}
  role="menubar"
  tabindex="-1"
  {...rest}
  use:clickOutside={{ onclickoutside }}
>
  {#if children}
    {@render children()}
  {/if}
</div>
