<script lang="ts">
  import type { MenuItemContext } from './Menus.types';
  import type { Placement } from '@floating-ui/dom';

  import { getContext } from 'svelte';
  import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

  import { portal } from '../portal';
  import { menuItemContextKey } from './Menus.constants';

  export let reference: HTMLElement;
  export let id: string;
  export let open: boolean = false;

  let popupRef: HTMLDivElement;
  let popupPosition: { x?: number; y?: number } = { x: 0, y: 0 };

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

  // ----- Popup Position ----- //

  const popupPlacement = (depth > 1 ? 'right-start' : 'bottom-start') as Placement;
  const middleware = [offset({ mainAxis: -2 }), flip(), shift({ padding: 0 })];

  const computePopupPosition = async () => {
    if (reference && popupRef) {
      popupPosition = await computePosition(reference, popupRef, {
        placement: popupPlacement,
        middleware
      });
    } else {
      popupPosition = { x: 0, y: 0 };
    }
  };

  // whenever a popup is portaled it needs resubscription to auto-update
  let cleanupAutoUpdate = () => {};
  const autoUpdatePopupPosition = () => {
    cleanupAutoUpdate();
    if (reference && popupRef) {
      cleanupAutoUpdate = autoUpdate(reference, popupRef, computePopupPosition);
    }
  };

  $: open, reference, popupRef, autoUpdatePopupPosition();
</script>

{#if open}
  <div class="portal" data-root-menu-id={rootMenuItemId} use:portal={{ target: portalTarget }}>
    <div
      bind:this={popupRef}
      class="popup"
      class:open
      {id}
      {...$$restProps}
      style="left:{popupPosition.x}px; top:{popupPosition.y}px"
    >
      {#if $$slots.default}
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

  .popup {
    background-color: var(--Common__background-color);
    border-color: var(--Common__border-color);
    border-radius: var(--Common__border-radius);
    border-style: var(--Common__border-style);
    border-width: var(--Common__border-width);
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

  .popup.open {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .children {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: calc(2 * var(--Common__outline-width));
    padding: 0.25em;
  }
</style>
