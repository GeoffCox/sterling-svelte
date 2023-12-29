<script lang="ts">
  import { onMount } from 'svelte';
  import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    type ComputePositionReturn,
    type Placement
  } from '@floating-ui/dom';
  import { portal } from './actions/portal';
  import type { PopoverPlacement } from './Popover.types';
  import { STERLING_PORTAL_HOST_ID } from './Popover.constants';

  // ----- Props ----- //

  /** When true, content is rendered only when the popover is open. */
  export let conditionalRender: boolean = true;

  /** The offset along the side of the reference element. */
  export let crossAxisOffset = 0;

  /** The offset towards or away from the side of the reference element. */
  export let mainAxisOffset = 0;

  /** When true, the popover is open and visible. */
  export let open: boolean = false;

  /** How the popover should be positioned relative to the reference element. */
  export let placement: PopoverPlacement = 'bottom-start';

  /** The host container for the callout. */
  export let portalHost: HTMLElement | undefined = undefined;

  /** The reference to the element anchoring the position of the popover. */
  export let reference: HTMLElement | undefined;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let popupRef: HTMLDivElement;
  let popupPosition: Partial<ComputePositionReturn> = { x: 0, y: 0 };

  $: floatingUIPlacement = placement as Placement;

  let bodyHeight = 0;
  let resizeObserver: ResizeObserver | undefined = undefined;

  // ----- Portal Host ----- //

  const ensurePortalHost = () => {
    if (globalThis?.document) {
      if (portalHost) {
        return portalHost;
      }

      let host = document.querySelector(`#${STERLING_PORTAL_HOST_ID}`) as HTMLElement;
      if (!host) {
        host = document.createElement('div');
        host.id = STERLING_PORTAL_HOST_ID;
        host.style.overflow = 'visible';
        document.body.append(host);
      }
      portalHost = host;
    }
  };

  // ----- Position ----- //

  $: middleware = [offset({ mainAxis: mainAxisOffset, crossAxis: crossAxisOffset }), flip()];

  const computePopoverPosition = async () => {
    if (reference && popupRef) {
      popupPosition = await computePosition(reference, popupRef, {
        placement: floatingUIPlacement,
        middleware
      });
    } else {
      popupPosition = { x: 0, y: 0 };
    }
  };

  // whenever a positioned element is portaled it needs resubscription to auto-update
  let cleanupAutoUpdate = () => {};
  const autoUpdatePopoverPosition = () => {
    cleanupAutoUpdate();
    if (reference && popupRef) {
      cleanupAutoUpdate = autoUpdate(reference, popupRef, computePopoverPosition);
    }
  };

  $: popupRef, reference, autoUpdatePopoverPosition();
  $: open, bodyHeight, middleware, floatingUIPlacement, computePopoverPosition();

  // ----- EventHandlers ----- //
  onMount(() => {
    ensurePortalHost();

    resizeObserver = new ResizeObserver((entries) => {
      bodyHeight = entries[0].target.clientHeight;
    });

    // start observing a DOM node
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver?.unobserve(document.body);
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  });

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      open = false;
    }
  };

  ensurePortalHost();
</script>

{#if open || !conditionalRender}
  <div
    use:portal={{ target: portalHost ?? globalThis?.document?.body }}
    class="sterling-popover-portal"
  >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      bind:this={popupRef}
      class={`sterling-popover ${variant}`}
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
      <slot {open} {variant} />
    </div>
  </div>
{/if}
