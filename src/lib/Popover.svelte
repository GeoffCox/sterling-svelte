<script lang="ts">
  import type { Placement } from '@floating-ui/dom';

  import { onMount } from 'svelte';
  import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
  import { portal } from './actions/portal';
  import type { FloatingOffsetOptions } from './floating-ui.types';

  // ----- Props ----- //

  export let offsetOptions: FloatingOffsetOptions = { mainAxis: 0, crossAxis: 0 };
  export let open: boolean = false;
  export let persistent: boolean = false;
  export let placement: Placement = 'bottom-start';
  export let portalHost: HTMLElement | undefined = undefined;
  export let reference: HTMLElement;

  // ----- State ----- //

  let popupRef: HTMLDivElement;
  let popupPosition: { x?: number; y?: number } = { x: 0, y: 0 };

  // ----- Portal Host ----- //

  const hostId = 'SterlingPopoverPortal';

  const ensurePortalHost = () => {
    if (document) {
      if (portalHost) {
        return portalHost;
      }

      let host = document.querySelector(`#${hostId}`) as HTMLElement;
      if (!host) {
        console.log('creating portal host');
        host = document.createElement('div');
        host.id = hostId;
        host.style.overflow = 'visible';
        document.body.append(host);
      }
      portalHost = host;
    }
  };

  // ----- Body Height Change ----- //

  let bodyHeight = 0;

  // create an Observer instance
  const resizeObserver = new ResizeObserver((entries) => {
    bodyHeight = entries[0].target.clientHeight;
  });

  // ----- Position ----- //

  $: middleware = [offset(offsetOptions), flip()];

  const computePopupPosition = async () => {
    if (reference && popupRef) {
      popupPosition = await computePosition(reference, popupRef, {
        placement,
        middleware
      });
    } else {
      popupPosition = { x: 0, y: 0 };
    }
  };

  // whenever a positioned element is portaled it needs resubscription to auto-update
  let cleanupAutoUpdate = () => {};
  const autoUpdateMenuPosition = () => {
    cleanupAutoUpdate();
    if (reference && popupRef) {
      cleanupAutoUpdate = autoUpdate(reference, popupRef, computePopupPosition);
    }
  };

  $: popupRef, reference, autoUpdateMenuPosition();
  $: open, bodyHeight, middleware, placement, computePopupPosition();

  // ----- EventHandlers ----- //
  onMount(() => {
    ensurePortalHost();

    // start observing a DOM node
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  });

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      open = false;
    }
  };

  ensurePortalHost();
</script>

{#if open || persistent}
  <div use:portal={{ target: portalHost ?? document.body }} class="sterling-popover-portal">
    <div
      bind:this={popupRef}
      class="sterling-popover"
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
      on:wheel|passive
      on:paste
      on:keydown={onKeydown}
      {...$$restProps}
      style="left:{popupPosition.x}px; top:{popupPosition.y}px"
    >
      <slot />
    </div>
  </div>
{/if}

<style>
  .sterling-popover-portal {
    position: relative;
    overflow: visible;
    background: rgba(255, 0, 0, 0.1);
  }

  .sterling-popover {
    box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px -1px;
    box-sizing: border-box;
    display: none;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: fit-content;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: max-content;
    z-index: 1;
  }

  .sterling-popover.open {
    display: grid;
  }
</style>
