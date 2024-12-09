<svelte:options runes={true} />

<script lang="ts">
  import { getContext, tick } from 'svelte';
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
  import { type FadeParams, type TransitionConfig, fade } from 'svelte/transition';
  import { prefersReducedMotion } from './mediaQueries/prefersReducedMotion';
  import type { PortalContext } from './Portal.types';
  import { STERLING_PORTAL_HOST_ID, STERLING_PORTAL_CONTEXT_ID } from './Portal.constants';
  import type { HTMLAttributes, KeyboardEventHandler } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    conditionalRender?: boolean | null;
    crossAxisOffset?: number;
    mainAxisOffset?: number;
    open?: boolean | null;
    placement?: PopoverPlacement;
    portalHost?: HTMLElement;
    reference?: HTMLElement;
  };

  let {
    children,
    conditionalRender = $bindable(true),
    crossAxisOffset = $bindable(0),
    mainAxisOffset = $bindable(0),
    open = $bindable(false),
    placement = $bindable('top-start'),
    portalHost,
    reference,
    class: _class,
    ...rest
  }: Props = $props();

  let popupRef: HTMLDivElement | undefined = $state(undefined);
  let arrowRef: HTMLDivElement | undefined = $state(undefined);
  let popupPosition: Partial<ComputePositionReturn> = $state({ x: 0, y: 0 });
  let floatingUIPlacement = $derived(placement as Placement);
  let bodyHeight = $state(0);
  let resizeObserver: ResizeObserver | undefined = undefined;

  const { portalHost: contextPortalHost } = getContext<PortalContext>(
    STERLING_PORTAL_CONTEXT_ID
  ) || {
    portalHost: undefined
  };

  const ensurePortalHost = async () => {
    await tick();

    // use the host set from context, usually set from a Dialog
    let host = $contextPortalHost;

    // use or create the sterling portal host
    if (!host && globalThis?.document) {
      host = globalThis.document.querySelector(`#${STERLING_PORTAL_HOST_ID}`) as HTMLElement;

      // fallback to creating the sterling portal host
      if (!host) {
        host = globalThis.document.createElement('div');
        host.id = STERLING_PORTAL_HOST_ID;
        host.style.overflow = 'visible';
        globalThis.document.body.append(host);
      }
    }

    portalHost = host;
  };

  let middleware = $derived([
    offset({ mainAxis: mainAxisOffset, crossAxis: crossAxisOffset }),
    flip(),
    arrowRef && arrow({ element: arrowRef, padding: 8 })
  ]);

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
    cleanupAutoUpdate = () => {};
    if (reference && popupRef) {
      cleanupAutoUpdate = autoUpdate(reference, popupRef, computeCalloutPosition);
    }
  };

  $effect(() => {
    autoUpdateCalloutPosition();
    return () => {
      cleanupAutoUpdate();
      cleanupAutoUpdate = () => {};
    };
  });

  $effect(() => {
    bodyHeight;
    computeCalloutPosition();
  });

  // ----- Arrow ----- //

  const getArrowPlacementStyle = (position?: Partial<ComputePositionReturn>) => {
    if (position?.placement && arrowRef) {
      switch (position.placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return (
            `bottom: -${arrowRef.offsetWidth}px;` + `transform:translate(0, -50%) rotate(135deg);`
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
            `right: -${arrowRef.offsetWidth}px;` + `transform:translate(-50%, 0) rotate(45deg);`
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

  let arrowStyle = $derived(
    getArrowPlacementStyle(popupPosition) + getArrowOffsetStyle(popupPosition)
  );

  // ----- Animation ----- //

  const fadeNoOp = (node: Element, params?: FadeParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  let fadeMotion = $derived(!$prefersReducedMotion ? fade : fadeNoOp);

  // ----- EventHandlers ----- //

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      open = false;
    }
    rest.onkeydown?.(event);
  };

  $effect(() => {
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

  ensurePortalHost();
</script>

{#if open || !conditionalRender}
  <div
    use:portal={{ target: portalHost }}
    class="sterling-callout-portal"
    transition:fadeMotion|global={{ duration: 250 }}
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      bind:this={popupRef}
      class={['sterling-callout', _class].filter(Boolean).join(' ')}
      class:open
      class:top={popupPosition.placement === 'top'}
      class:top-start={popupPosition.placement === 'top-start'}
      class:top-end={popupPosition.placement === 'top-end'}
      class:right={popupPosition.placement === 'right'}
      class:right-start={popupPosition.placement === 'right-start'}
      class:right-end={popupPosition.placement === 'right-end'}
      class:bottom={popupPosition.placement === 'bottom'}
      class:bottom-start={popupPosition.placement === 'bottom-start'}
      class:bottom-end={popupPosition.placement === 'bottom-end'}
      class:left={popupPosition.placement === 'left'}
      class:left-start={popupPosition.placement === 'left-start'}
      class:left-end={popupPosition.placement === 'left-end'}
      role="tooltip"
      {...rest}
      onkeydown={onKeydown}
      style="left:{popupPosition.x}px; top:{popupPosition.y}px"
    >
      {#if children}
        {@render children()}
      {/if}
      <div class="arrow" bind:this={arrowRef} style={arrowStyle}></div>
    </div>
  </div>
{/if}
