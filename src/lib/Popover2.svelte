<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { on } from 'svelte/events';

  import type { Popover2Props } from './Popover2.types';
  import {
    formatNonat,
    getPlacementPercentOffsets,
    getPopoverPosition,
    splitNonant
  } from './popover2.utils';

  let {
    anchor,
    anchorOrigin = 'top-left',
    children,
    class: _class,
    allowFlip = 'both',
    invoker,
    lightDismiss = true,
    offsetX = 0,
    offsetY = 0,
    open = $bindable(),
    placement = 'auto',
    ...rest
  }: Popover2Props = $props();

  const anchorId = $props.id();
  const anchorIdent = `--anchor-${anchorId}`;

  let popoverElement = $state<HTMLDivElement | undefined>();

  let resolvedAnchor = $derived.by(() => {
    open;
    if (anchor) {
      return anchor;
    }
    if (invoker) {
      return invoker;
    }
    if (popoverElement?.id) {
      const foundInvoker =
        document.querySelector<HTMLElement>(`[popovertarget="${popoverElement?.id}"]`) || undefined;
      if (foundInvoker) {
        return foundInvoker;
      }
    }
    return undefined;
  });

  let resolvedAnchorOrigin = $derived(anchorOrigin);
  let resolvedPlacement = $derived(placement === 'auto' ? resolvedAnchorOrigin : placement);
  let allowFlipX = $derived(allowFlip === 'both' || allowFlip === 'x');
  let allowFlipY = $derived(allowFlip === 'both' || allowFlip === 'y');
  let popoverOffsets = $derived(
    getPlacementPercentOffsets(resolvedAnchorOrigin, resolvedPlacement)
  );

  /**
   * Calculates if the popover will fit in the viewport.
   * If not, the anchor origin is flipped to the other side.
   * If the anchor origin is flipped, the placement is flipped inside-to-inside
   * or outside-to-outside.
   */
  const resolvePosition = async () => {
    const realPlacement = placement === 'auto' ? anchorOrigin : placement;

    if (open && popoverElement && resolvedAnchor) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const anchorRect = resolvedAnchor.getBoundingClientRect();
      let { horizontal: anchorOriginX, vertical: anchorOriginY } = splitNonant(anchorOrigin);

      const sizeRect = popoverElement.getBoundingClientRect();
      const popoverSize = { width: sizeRect.width, height: sizeRect.height };
      const popoverOffset = { x: offsetX, y: offsetY };
      const popoverRect = getPopoverPosition(
        anchorOrigin,
        anchorRect,
        realPlacement,
        popoverSize,
        popoverOffset
      );
      let { horizontal: placementX, vertical: placementY } = splitNonant(realPlacement);

      if (allowFlipY) {
        if (popoverRect.top < 0) {
          if (anchorOriginY === 'top') {
            anchorOriginY = 'bottom';
            switch (placementY) {
              case 'top':
                placementY = 'bottom';
                break;
              case 'bottom':
                placementY = 'top';
                break;
            }
          }
        } else if (popoverRect.bottom > viewportHeight) {
          console.log('no space below');
          if (anchorOriginY === 'bottom') {
            anchorOriginY = 'top';
            switch (placementY) {
              case 'top':
                placementY = 'bottom';
                break;
              case 'bottom':
                placementY = 'top';
                break;
            }
          }
        }
      }

      if (allowFlipX) {
        if (popoverRect.left < 0) {
          console.log('no space left');
          if (anchorOriginX === 'left') {
            anchorOriginX = 'right';
            switch (placementX) {
              case 'left':
                placementX = 'right';
                break;
              case 'right':
                placementX = 'left';
                break;
            }
          }
        } else if (popoverRect.right > viewportWidth) {
          console.log('no space right');
          if (anchorOriginX === 'right') {
            anchorOriginX = 'left';
            switch (placementX) {
              case 'left':
                placementX = 'right';
                break;
              case 'right':
                placementX = 'left';
                break;
            }
          }
        }
      }

      resolvedAnchorOrigin = formatNonat({ horizontal: anchorOriginX, vertical: anchorOriginY });
      resolvedPlacement = formatNonat({ horizontal: placementX, vertical: placementY });
    }
  };

  // keep the calculated placement up-to-date
  $effect(() => {
    allowFlip;
    anchor;
    anchorOrigin;
    invoker;
    offsetX;
    offsetY;
    open;
    placement;
    popoverOffsets;
    resolvedAnchor;
    resolvePosition();
  });

  // show/hide the popover
  $effect(() => {
    if (popoverElement) {
      if (open) {
        // in case anchor-name got cleared, set it again
        const untrackedAnchor = untrack(() => anchor);
        setAnchorName(untrackedAnchor);
        invoker ? popoverElement.showPopover({ source: invoker }) : popoverElement.showPopover();
      } else {
        popoverElement?.hidePopover();
      }
    }
  });

  let setAnchorNameElement: HTMLElement | undefined;

  const setAnchorName = (element?: HTMLElement | null) => {
    if (setAnchorNameElement && setAnchorNameElement !== element) {
      setAnchorNameElement.style.removeProperty('anchor-name');
    }
    if (element && element.style.anchorName !== anchorIdent) {
      element.style.anchorName = anchorIdent;
      setAnchorNameElement = element;
    }
  };

  // keep the anchor-name set on the anchor
  $effect(() => {
    setAnchorName(anchor);
  });

  let resizeObserver: ResizeObserver | undefined;
  let observedAnchor: HTMLElement | undefined;

  // keep observing the resolved anchor for resize
  $effect(() => {
    if (observedAnchor) {
      resizeObserver?.unobserve(observedAnchor);
      observedAnchor = undefined;
    }
    if (resolvedAnchor) {
      resizeObserver?.observe(resolvedAnchor);
      observedAnchor = resolvedAnchor;
    }
  });

  onMount(() => {
    resizeObserver = new ResizeObserver(resolvePosition);
    let offToggleEvent: () => void;
    let offScrollEvent: () => void;
    let offResizeEvent: () => void;
    if (popoverElement) {
      // keep open in sync with popover state
      offToggleEvent = on(popoverElement, 'toggle', (event) => {
        open = event.newState === 'open';
      });

      resizeObserver.observe(popoverElement);
    }

    offScrollEvent = on(window, 'scroll', resolvePosition, {
      capture: true,
      passive: true
    });
    offResizeEvent = on(window, 'resize', resolvePosition, { passive: true });

    return () => {
      if (setAnchorNameElement) {
        setAnchorNameElement.style.removeProperty('anchor-name');
      }

      resizeObserver?.disconnect();
      resizeObserver = undefined;
      offResizeEvent?.();
      offScrollEvent?.();
      offToggleEvent?.();
    };
  });

  //#region CSS variables

  let anchorIdentCssVar = $derived(`--anchor-ident:${anchorIdent};`);

  // the offset flips with the placement to position it the same relative distance
  let offsetXCssVar = $derived(`--offset-x:calc(${popoverOffsets.x} + ${offsetX}px);`);
  // the offset flips with the placement to position it the same relative distance
  let offsetYCssVar = $derived(`--offset-y:calc(${popoverOffsets.y} + ${offsetY}px);`);
  let popoverStyle = $derived(`${anchorIdentCssVar} ${offsetXCssVar} ${offsetYCssVar}`);

  //#endregion
</script>

<div
  class={[
    'sterling-popover-2',
    lightDismiss ? 'light-dismiss' : undefined,
    anchor && !invoker ? 'has-anchor-ident' : '',
    _class
  ]}
  style={popoverStyle}
  data-placement={resolvedPlacement}
  data-anchor-origin={resolvedAnchorOrigin}
  bind:this={popoverElement}
  popover={lightDismiss ? 'auto' : 'manual'}
  {...rest}
>
  <div class="content">
    {@render children?.()}
  </div>
</div>
