<script lang="ts">
  import type { MenuItemContext } from './MenuItem.types';

  import { getContext } from 'svelte';
  import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';

  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { isElementEnabledMenuItem, isElementMenuItem } from './MenuItem.utils';
  import { prefersReducedMotion } from './stores/prefersReducedMotion';

  let menuRef: HTMLDivElement;
  let menuItemsRef: HTMLDivElement;

  // ----- Media Queries ----- //

  const slidNoOp = (node: Element, params?: SlideParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  $: slideMotion = !$prefersReducedMotion ? slide : slidNoOp;

  // ----- Get Context ----- //

  const { rootValue } = getContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY) || {};

  // ----- Methods ----- //

  export const blur = () => {
    menuRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    menuRef?.focus(options);
  };

  const isElementInThisMenu = (candidate: Element) => {
    return candidate && candidate.closest('[role="menu"]') === menuRef;
  };

  export const focusFirstMenuItem = () => {
    let candidate: Element | undefined | null = menuItemsRef?.firstElementChild;
    while (candidate && !isElementEnabledMenuItem(candidate)) {
      candidate = candidate.nextElementSibling;
    }

    (candidate as HTMLElement)?.focus({ preventScroll: true });
    return !!candidate;
  };

  export const focusPreviousMenuItem = () => {
    let candidate = document.activeElement;

    if (candidate && isElementMenuItem(candidate) && isElementInThisMenu(candidate)) {
      candidate = menuItemsRef?.previousElementSibling;
      while (candidate && !isElementEnabledMenuItem(candidate)) {
        candidate = candidate.previousElementSibling;
      }
      (candidate as HTMLElement)?.focus();
    }
    return !!candidate;
  };

  export const focusNextMenuItem = () => {
    let candidate = document.activeElement;

    if (candidate && isElementMenuItem(candidate) && isElementInThisMenu(candidate)) {
      candidate = menuItemsRef?.nextElementSibling;
      while (candidate && !isElementEnabledMenuItem(candidate)) {
        candidate = candidate.nextElementSibling;
      }
      (candidate as HTMLElement)?.focus();
    }
    return !!candidate;
  };

  export const focusLastMenuItem = () => {
    let candidate: Element | undefined | null = menuItemsRef?.lastElementChild;
    while (candidate && !isElementEnabledMenuItem(candidate)) {
      candidate = candidate.previousElementSibling;
    }

    (candidate as HTMLElement)?.focus({ preventScroll: true });
    return !!candidate;
  };
</script>

<div
  bind:this={menuRef}
  class="sterling-menu"
  role="menu"
  class:open
  data-root-value={rootValue}
  in:slideMotion|global={{ duration: 300 }}
  out:slideMotion|global={{ duration: 100 }}
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
  on:wheel|passive
  on:paste
  {...$$restProps}
>
  <div bind:this={menuItemsRef} class="menu-items">
    <slot />
  </div>
</div>

<style>
  .sterling-menu {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: var(--stsv-common__border-width);
    box-shadow: var(--stsv-common__box-shadow);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: fit-content;
    padding: 0.25em;
  }

  .menu-items {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: calc(2 * var(--stsv-common__outline-width));
  }
</style>
