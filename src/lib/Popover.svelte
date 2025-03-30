<svelte:options runes={true} />

<script lang="ts">
  import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    type ComputePositionReturn,
    type Placement
  } from '@floating-ui/dom';
  import { getContext, tick } from 'svelte';
  import type { HTMLAttributes, KeyboardEventHandler } from 'svelte/elements';
  import { portal } from './actions/portal';
  import type { PopoverPlacement } from './Popover.types';
  import { STERLING_PORTAL_CONTEXT_ID, STERLING_PORTAL_HOST_ID } from './Portal.constants';
  import type { PortalContext } from './Portal.types';

  // ----- Props ----- //

  type Props = HTMLAttributes<HTMLDivElement> & {
    conditionalRender?: boolean;
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
  let popupPosition: Partial<ComputePositionReturn> = $state({ x: 0, y: 0 });
  let floatingUIPlacement = $derived(placement as Placement);
  let bodyHeight = $state(0);
  let resizeObserver: ResizeObserver | undefined = undefined;

  const { portalHost: contextPortalHost } = getContext<PortalContext>(
    STERLING_PORTAL_CONTEXT_ID
  ) || {
    portalHost: undefined
  };

  // ----- Portal Host ----- //

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

  // ----- Position ----- //

  let middleware = $derived([
    offset({ mainAxis: mainAxisOffset, crossAxis: crossAxisOffset }),
    flip()
  ]);

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

  $effect(() => {
    autoUpdatePopoverPosition();
    return () => {
      cleanupAutoUpdate();
      cleanupAutoUpdate = () => {};
    };
  });

  $effect(() => {
    bodyHeight;
    computePopoverPosition();
  });

  // ----- EventHandlers ----- //
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

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      open = false;
    }
    rest.onkeydown?.(event);
  };

  //TODO: Is this necessary?
  ensurePortalHost();
</script>

{#if open || !conditionalRender}
  <div use:portal={{ target: portalHost }} class="sterling-popover-portal">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      bind:this={popupRef}
      class={['sterling-popover', _class]}
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
      {...rest}
      onkeydown={onKeydown}
      style="left:{popupPosition.x}px; top:{popupPosition.y}px"
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{/if}
