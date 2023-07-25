<script lang="ts">
  import { onMount } from 'svelte';
  import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    type ComputePositionReturn,
    type Placement
  } from '@floating-ui/dom';
  import { portal } from './actions/portal';
  import type { PopoverPlacement } from './Popover.types';
  import { POPOVER_PORTAL_ID } from './Popover.constants';
  import { type FadeParams, type TransitionConfig, fade } from 'svelte/transition';
  import { prefersReducedMotion } from './stores/prefersReducedMotion';

  // ----- Props ----- //

  /** When true, applies colorful theme styles. */
  export let colorful: boolean = false;

  /** Conditionally renders content based on open. */
  export let conditionalRender: boolean = true;

  /** The offset along the side of the reference element. */
  export let crossAxisOffset = 0;

  /** The offset towards or away from the side of the reference element. */
  export let mainAxisOffset = 0;

  /** When true, the callout is open and visible. */
  export let open: boolean = false;

  /** How the callout should be positioned relative to the reference element. */
  export let placement: PopoverPlacement = 'bottom-start';

  /** The host container for the callout. */
  export let portalHost: HTMLElement | undefined = undefined;

  /** The reference to the element anchoring the position of the callout. */
  export let reference: HTMLElement | undefined;

  // ----- State ----- //

  let popupRef: HTMLDivElement;
  let arrowRef: HTMLDivElement;
  let popupPosition: Partial<ComputePositionReturn> = { x: 0, y: 0 };

  $: floatingUIPlacement = placement as Placement;

  // ----- Portal Host ----- //

  const ensurePortalHost = () => {
    if (document) {
      if (portalHost) {
        return portalHost;
      }

      let host = document.querySelector(`#${POPOVER_PORTAL_ID}`) as HTMLElement;
      if (!host) {
        host = document.createElement('div');
        host.id = POPOVER_PORTAL_ID;
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

  $: middleware = [
    offset({ mainAxis: mainAxisOffset, crossAxis: crossAxisOffset }),
    flip(),
    arrow({ element: arrowRef, padding: 8 })
  ];

  const computeCalloutPosition = async () => {
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
  const autoUpdateCalloutPosition = () => {
    cleanupAutoUpdate();
    if (reference && popupRef) {
      cleanupAutoUpdate = autoUpdate(reference, popupRef, computeCalloutPosition);
    }
  };

  $: popupRef, reference, autoUpdateCalloutPosition();
  $: open, bodyHeight, middleware, placement, computeCalloutPosition();

  // ----- Arrow ----- //

  const getArrowPlacementStyle = (position?: Partial<ComputePositionReturn>) => {
    if (position?.placement && arrowRef) {
      switch (position.placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return (
            `bottom: -${arrowRef.offsetWidth}px;` +
            `filter: drop-shadow(-1px -2px 1px rgba(0,0,0,0.2));` +
            `transform:translate(0, -50%) rotate(135deg);`
          );
        case 'right':
        case 'right-start':
        case 'right-end':
          return (
            `left: -${arrowRef.offsetWidth}px;` + `transform:translate(50%, 0) rotate(225deg);`
          );
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          return `top: -${arrowRef.offsetWidth}px;` + `transform:translate(0, 50%) rotate(-45deg);`;
        case 'left':
        case 'left-start':
        case 'left-end':
          return (
            `right: -${arrowRef.offsetWidth}px;` +
            `filter: drop-shadow(2px 2px 1px rgba(0,0,0,0.2));` +
            `transform:translate(-50%, 0) rotate(45deg);`
          );
      }
    }
    return '';
  };

  const getArrowOffsetStyle = (position?: Partial<ComputePositionReturn>) => {
    const arrow = position?.middlewareData?.arrow;
    if (arrow) {
      if (arrow.x !== null && arrow.x !== undefined) {
        return `left: ${arrow.x}px;`;
      } else if (arrow.y !== null && arrow.y !== undefined) {
        return `top: ${arrow.y}px;`;
      }
    }
    return '';
  };

  $: arrowStyle = getArrowPlacementStyle(popupPosition) + getArrowOffsetStyle(popupPosition);

  // ----- Animation ----- //

  const fadeNoOp = (node: Element, params?: FadeParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  $: fadeMotion = !$prefersReducedMotion ? fade : fadeNoOp;

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

{#if open || !conditionalRender}
  <div
    use:portal={{ target: portalHost ?? document.body }}
    class="sterling-callout-portal"
    transition:fadeMotion|global={{ duration: 250 }}
  >
    <div
      bind:this={popupRef}
      class="sterling-callout"
      class:open
      class:colorful
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
      <div class="arrow" bind:this={arrowRef} style={arrowStyle} />
    </div>
  </div>
{/if}

<style>
  .sterling-callout-portal {
    position: relative;
    overflow: visible;
  }

  .sterling-callout {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: var(--stsv-common__border-width);
    box-shadow: var(--stsv-common__box-shadow);
    box-sizing: border-box;
    color: var(--stsv-common__color);
    display: none;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: fit-content;
    left: 0;
    overflow: visible;
    position: absolute;
    top: 0;
    width: max-content;
    z-index: 0;
  }

  .sterling-callout.open {
    display: grid;
  }

  .sterling-callout.colorful {
    background-color: var(--stsv-button--colorful__background-color);
    border-color: var(--stsv-button--colorful__border-color);
    color: var(--stsv-button--colorful__color);
  }

  .arrow {
    position: absolute;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: inherit;
    border-color: inherit;
    border-style: inherit;
    border-width: inherit;
    /* This clip path clips 1/2 the square to create a triangle */
    /* The -100% and 200% allow for the drop-shadow to not be clipped */
    clip-path: polygon(-100% -100%, 200% -100%, 200% 200%, -100% -100%);
  }
</style>
