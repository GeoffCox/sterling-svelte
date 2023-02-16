<script lang="ts">
  import type { MenuItemContext } from './Menus.types';
  import type { Placement } from '@floating-ui/dom';

  import { getContext } from 'svelte';
  import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

  import { portal } from '../portal';
  import { menuItemContextKey } from './Menus.constants';

  export let reference: HTMLElement;
  export let open: boolean = false;

  let menuRef: HTMLDivElement;
  let menuPosition: { x?: number; y?: number } = { x: 0, y: 0 };

  // ----- Get Context ----- //

  const { rootMenuItemId, depth = 0 } = getContext<MenuItemContext>(menuItemContextKey) || {};

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

  // ----- Position ----- //

  const menuPlacement = (depth > 1 ? 'right-start' : 'bottom-start') as Placement;
  const middleware = [offset({ mainAxis: -2 }), flip(), shift({ padding: 0 })];

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

  $: open, reference, menuRef, autoUpdateMenuPosition();
</script>

{#if open}
  <div class="portal" data-root-menu-id={rootMenuItemId} use:portal={{ target: portalTarget }}>
    <div
      bind:this={menuRef}
      class="menu"
      class:open
      {...$$restProps}
      style="left:{menuPosition.x}px; top:{menuPosition.y}px"
    >
      {#if $$slots.default}
        <!-- TODO: Remove this extra children div.  Probably not needed -->
        <div class="children" role="menu">
          <slot />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .portal {
    position: relative;
    overflow: visible;
  }

  .menu {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
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

  .menu.open {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .children {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: calc(2 * var(--stsv-Common__outline-width));
    padding: 0.25em;
  }
</style>
