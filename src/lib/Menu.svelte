<svelte:options runes={true} />

<script lang="ts">
  import type { MenuItemContext } from './MenuItem.types';

  import { getContext } from 'svelte';
  import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';

  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';
  import { isElementEnabledMenuItem, isElementMenuItem } from './MenuItem.utils';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement>;

  let { children, class: _class, ...rest }: Props = $props();

  let menuRef: HTMLDivElement;
  let menuItemsRef: HTMLDivElement;

  const noSlide = (node: Element, params?: SlideParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  let slideMotion = $derived(!$prefersReducedMotion ? slide : noSlide);

  const { rootValue = undefined } = getContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY);

  const isElementInThisMenu = (candidate: Element) => {
    return candidate && candidate.closest('[role="menu"]') === menuRef;
  };

  //#region focus
  export const focus = (options?: FocusOptions) => {
    menuRef?.focus(options);
  };

  export const blur = () => {
    menuRef?.blur();
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

  //#endregion
</script>

<div
  bind:this={menuRef}
  class={['sterling-menu', _class]}
  role="menu"
  class:open
  data-root-value={rootValue}
  tabindex="-1"
  in:slideMotion|global={{ duration: 300 }}
  out:slideMotion|global={{ duration: 100 }}
  {...rest}
>
  <div bind:this={menuItemsRef} class="menu-items">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
