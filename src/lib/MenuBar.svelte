<script lang="ts">
  import type { MenuItemContext } from './MenuItem.types';

  import { createEventDispatcher, setContext } from 'svelte';

  import { MENU_BAR_CONTEXT_KEY } from './MenuBar.constants';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { writable } from 'svelte/store';
  import type { MenuBarContext } from './MenuBar.types';
  import { isElementEnabledMenuItem } from './MenuItem.utils';
  import { idGenerator } from './idGenerator';
  import { clickOutside } from './actions/clickOutside';

  // ----- State ----- //
  const openValues = writable<string[]>([]);
  const rootValue = idGenerator.nextId('MenuBar');

  let menuBarRef: HTMLDivElement;
  let prevOpenValue: string | undefined = undefined;

  // Remember the last open value
  $: {
    if ($openValues.length > 0) {
      prevOpenValue = $openValues[0];
    }
  }

  // Restore focus to the last open menu bar item when it closes
  $: {
    if ($openValues.length === 0 && prevOpenValue !== undefined) {
      const candidate = menuBarRef.querySelector(`[data-value="${prevOpenValue}"]`);
      (candidate as HTMLElement)?.focus();
      prevOpenValue = undefined;
    }
  }

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

  // ----- Methods ----- //

  export const blur = () => {
    menuBarRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    menuBarRef?.focus(options);
  };

  // ----- Open/Close ----- //

  const getOpenMenuBarItem = () => {
    const value = $openValues[0];
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
    openValues.set([]);
  };

  // ----- Event Handlers ----- //

  const onClickOutside = (event: svelte.JSX.ClickOutsideEvent) => {
    const {
      detail: { mouseEvent }
    } = event;
    let element: HTMLElement | null = mouseEvent.target as HTMLElement;
    while (element) {
      if (element.getAttribute('data-root-value') === rootValue) {
        return;
      }
      element = element.parentElement;
    }
    closeAllMenus?.();
  };

  // ----- Set Context ----- //

  setContext<MenuBarContext>(MENU_BAR_CONTEXT_KEY, {
    openPreviousMenuBarItem,
    openNextMenuBarItem
  });

  setContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY, {
    isMenuBarItem: true,
    openValues,
    rootValue,
    onClose: raiseClose,
    onOpen: raiseOpen,
    onSelect: raiseSelect
  });
</script>

<div
  bind:this={menuBarRef}
  class="sterling-menu-bar"
  role="menubar"
  on:blur
  on:click
  on:copy
  on:cut
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
  on:scroll
  on:wheel
  on:paste
  {...$$restProps}
  use:clickOutside
  on:click_outside={onClickOutside}
>
  <slot />
</div>

<style>
  .sterling-menu-bar {
    background-color: transparent;
    align-items: center;
    align-content: stretch;
    display: flex;
    gap: 1em;
    justify-content: flex-start;
    justify-items: flex-start;
  }
</style>
