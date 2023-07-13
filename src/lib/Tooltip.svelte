<script lang="ts">
  import type { ComputePositionReturn } from '@floating-ui/core';
  import { arrow, autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
  import { onMount } from 'svelte';
  import { fade, type FadeParams, type TransitionConfig } from 'svelte/transition';

  import { portal } from './actions/portal';
  import type { TooltipShowOn } from './Tooltip.types';
  import type { FloatingPlacement } from './floating-ui.types';
  import { prefersReducedMotion } from './stores/prefersReducedMotion';

  /** When true, the tooltip is disabled and will not be shown. */
  export let disabled = false;

  /** When to show the tooltip */
  export let showOn: TooltipShowOn = 'hover';

  /** How long the mouse must hover over the item to show the tooltip. */
  export let hoverDelayMilliseconds: number = 1000;

  /** When true, the tooltip is open (i.e. visible) */
  export let open = false;

  /** Where to place the tooltip relative to the content. */
  export let placement: FloatingPlacement = 'top';

  /** An optional portal host for floating the tooltip above other content. Defaults to body.*/
  export let portalTarget: HTMLElement | undefined = undefined;

  let originRef: HTMLDivElement;
  let tooltipRef: HTMLDivElement;
  let arrowRef: HTMLDivElement;
  let position: ComputePositionReturn | undefined = undefined;

  $: reference = $$slots.default ? (originRef?.previousElementSibling as HTMLElement) : undefined;

  // ----- Position ----- //

  const computeTooltipPosition = async () => {
    if (reference && tooltipRef && arrowRef) {
      // Get half the arrow square's hypotenuse length
      const floatingOffset = Math.sqrt(2 * arrowRef.offsetWidth ** 2) / 2;

      const middleware = [
        offset(floatingOffset),
        flip({ fallbackPlacements: ['top', 'bottom', 'right', 'left'] }),
        arrow({
          element: arrowRef
        })
      ];
      position = await computePosition(reference, tooltipRef, {
        placement,
        middleware
      });
    } else {
      position = undefined;
    }
  };

  // whenever a menu is portaled it needs resubscription to auto-update
  let cleanupAutoUpdate = () => {};
  const autoUpdateTooltipPosition = () => {
    cleanupAutoUpdate();
    cleanupAutoUpdate = () => {};

    if (reference && tooltipRef) {
      cleanupAutoUpdate = autoUpdate(reference, tooltipRef, computeTooltipPosition);
    }
  };

  $: reference, tooltipRef, autoUpdateTooltipPosition();
  $: open, placement, computeTooltipPosition();

  $: tipStyle = position ? `left:${position.x}px; top:${position.y}px;` : '';

  const getArrowPlacementStyle = (position?: ComputePositionReturn) => {
    if (position?.placement) {
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

  const getArrowOffsetStyle = (position?: ComputePositionReturn) => {
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

  $: arrowStyle = getArrowPlacementStyle(position) + getArrowOffsetStyle(position);

  // ----- Show/Hide ----- //

  const show = () => {
    if (!disabled) {
      open = true;
    }
  };

  const hide = () => (open = false);

  const toggle = () => {
    if (!disabled) {
      open = !open;
    } else {
      open = false;
    }
  };

  const delayShow = () => {
    hoverDelayMilliseconds === 0
      ? show()
      : setTimeout(() => {
          show();
        }, hoverDelayMilliseconds);
  };

  $: {
    if (disabled) {
      hide();
    }
  }

  let cleanupAutoShowUpdate = () => {};

  const autoShowUpdate = () => {
    cleanupAutoShowUpdate();
    cleanupAutoShowUpdate = () => {};

    const element = reference;
    open = false;

    if (element) {
      switch (showOn) {
        case 'click':
          element.addEventListener('click', toggle);
          cleanupAutoShowUpdate = () => element.removeEventListener('click', toggle);
          break;
        case 'hover':
          element.addEventListener('mouseenter', delayShow);
          element.addEventListener('mouseleave', hide);
          cleanupAutoShowUpdate = () => {
            element.removeEventListener('mouseenter', delayShow);
            element.removeEventListener('mouseleave', hide);
          };
      }
    }
  };

  $: reference, showOn, autoShowUpdate();

  // ----- Animation ----- //

  const fadeNoOp = (node: Element, params?: FadeParams): TransitionConfig => {
    return { delay: 0, duration: 0 };
  };

  $: fadeMotion = !$prefersReducedMotion ? fade : fadeNoOp;

  // ----- EventHandlers ----- //

  let mounted = false;
  onMount(() => {
    mounted = true;
    portalTarget = portalTarget || document.body;
    autoUpdateTooltipPosition();
    computeTooltipPosition();
    autoShowUpdate();
  });
</script>

<slot {disabled} {open} />
<div class="sterling-tooltip-origin" bind:this={originRef} />

{#if open}
  <div
    class="sterling-tooltip-portal"
    use:portal={{ target: document.body }}
    transition:fadeMotion={{ duration: 250 }}
  >
    <div
      bind:this={tooltipRef}
      class="sterling-tooltip"
      style={tipStyle}
      on:blur
      on:click
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
      on:pointercancel
      on:pointerdown
      on:pointerenter
      on:pointerleave
      on:pointermove
      on:pointerover
      on:pointerout
      on:pointerup
      on:wheel|passive
      {...$$restProps}
    >
      <div class="arrow" bind:this={arrowRef} style={arrowStyle} />
      <slot name="tip" />
    </div>
  </div>
{/if}

<style>
  .sterling-tooltip-origin {
    display: none;
    width: 0;
    height: 0;
  }

  .sterling-tooltip-portal {
    position: relative;
    overflow: visible;
  }

  .sterling-tooltip {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: var(--stsv-common__border-width);
    color: var(--stsv-common__color);
    position: absolute;
    overflow: visible;
    box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px -1px;
    z-index: 4;
  }

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: var(--stsv-common__border-width);
    clip-path: polygon(0% 1%, 100% 1%, 100% 100%, 0% 1%);
  }
</style>
