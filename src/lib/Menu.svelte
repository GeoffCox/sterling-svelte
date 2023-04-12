<script lang="ts">
  import type { MenuItemContext } from './MenuItem.types';
  import type { Placement } from '@floating-ui/dom';

  import { getContext, onMount } from 'svelte';
  import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

  import { portal } from './actions/portal';
  import { MENU_ITEM_CONTEXT_KEY } from './MenuItem.constants';

  export let reference: HTMLElement;
  export let open: boolean = false;

  let menuRef: HTMLDivElement;
  let menuPosition: { x?: number; y?: number } = { x: 0, y: 0 };

  // ----- Get Context ----- //

  const { rootValue, depth = 0 } = getContext<MenuItemContext>(MENU_ITEM_CONTEXT_KEY) || {};

  // ----- Methods ----- //

  export const blur = () => {
    menuRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    menuRef?.focus(options);
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

  // ----- Body Height Change ----- //

  let bodyHeight = 0;

  // create an Observer instance
  const resizeObserver = new ResizeObserver((entries) => {
    bodyHeight = entries[0].target.clientHeight;
  });

  // ----- Position ----- //

  const menuPlacement = (depth > 1 ? 'right-start' : 'bottom-start') as Placement;
  const middleware = [
    offset({ mainAxis: -2 }),
    flip(),
    shift({ padding: 0, mainAxis: true, crossAxis: true })
  ];

  const computeMenuPosition = async () => {
    if (reference && menuRef) {
      menuPosition = await computePosition(reference, menuRef, {
        placement: menuPlacement,
        middleware
      });
    } else {
      menuPosition = { x: 0, y: 0 };
    }
  };

  // whenever a menu is portaled it needs resubscription to auto-update
  let cleanupAutoUpdate = () => {};
  const autoUpdateMenuPosition = () => {
    cleanupAutoUpdate();
    if (reference && menuRef) {
      cleanupAutoUpdate = autoUpdate(reference, menuRef, computeMenuPosition);
    }
  };

  $: menuRef, reference, autoUpdateMenuPosition();
  $: open, bodyHeight, computeMenuPosition();

  onMount(() => {
    // start observing a DOM node
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  });
</script>

{#if open}
  <div
    use:portal={{ target: portalTarget }}
    class="sterling-menu-portal"
    data-root-value={rootValue}
  >
    <div
      bind:this={menuRef}
      class="sterling-menu"
      role="menu"
      class:open
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
      style="left:{menuPosition.x}px; top:{menuPosition.y}px"
    >
      <div class="sterling-menu-content">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .sterling-menu-portal {
    position: relative;
    overflow: visible;
    background: rgba(255, 0, 0, 0.1);
  }

  .sterling-menu {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
    box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px -1px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: fit-content;
    left: 0;
    max-height: calc(50vh);
    overflow: auto;
    overscroll-behavior: contain;
    padding: 0.25em;
    position: absolute;
    top: 0;
    width: max-content;
    z-index: 1;
  }

  .sterling-menu-content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: calc(2 * var(--stsv-Common__outline-width));
  }

  .sterling-menu.open {
    display: grid;
  }
</style>
