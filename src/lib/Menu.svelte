<script lang="ts">
  import type { MenuItemContext } from './MenuItem.types';

  import { getContext } from 'svelte';
  import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';

  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { isElementEnabledMenuItem, isElementMenuItem } from './MenuItem.utils';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';

  /** Additional class names to apply. */
  export let variant: string = '';

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
  class={`sterling-menu ${variant}`}
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
    <slot {variant} />
  </div>
</div>
