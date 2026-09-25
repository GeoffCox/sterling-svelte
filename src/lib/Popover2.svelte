<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { on } from 'svelte/events';

  import type { Popover2Props } from './Popover2.types';
  import { formatNonat, getPopoverOffsets, splitNonant } from './popover2.utils';

  let {
    anchor,
    anchorOrigin = 'auto',
    children,
    class: _class,
    invoker,
    lightDismiss = true,
    offsetX = 0,
    offsetY = 0,
    open = $bindable(),
    placement = 'center',
    ...rest
  }: Popover2Props = $props();

  const anchorId = $props.id();
  const anchorIdent = `--anchor-${anchorId}`;

  let popoverElement = $state<HTMLDivElement | undefined>();

  let resolvedAnchor = $derived.by(() => {
    open;

    if (anchor) {
      console.log('anchor = anchor');
      return anchor;
    }
    if (invoker) {
      console.log('resolved anchor = invoker');
      return invoker;
    }
    if (popoverElement?.id) {
      const foundInvoker =
        document.querySelector<HTMLElement>(`[popovertarget="${popoverElement?.id}"]`) || undefined;
      if (foundInvoker) {
        console.log('anchor = popovertarget (maybe)', { foundInvoker });
        return foundInvoker;
      }
    }
    return undefined;
  });

  let resolvedPlacement = $derived(placement);
  let resolvedAnchorOrigin = $derived(anchorOrigin === 'auto' ? resolvedPlacement : anchorOrigin);
  let flippedX = $derived(false);
  let flippedY = $derived(false);
  let popoverTranslate = $derived(getPopoverOffsets(resolvedAnchorOrigin, resolvedPlacement));

  /**
   * Calculates the available space around the anchor and determines
   * if the popover will fit in the desired placement (accounting for offsets).
   * Flips placement on the X or Y axis if there is not enough space and the
   * popover is more likely to fit in a flipped placement.
   */
  const resolvePlacement = () => {
    let newPlacement = placement;
    let newXFlipped = false;
    let newYFlipped = false;

    if (open && popoverElement && resolvedAnchor) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const popoverRect = popoverElement.getBoundingClientRect();
      const anchorRect = resolvedAnchor.getBoundingClientRect();
      const spaceAbove = anchorRect.top;
      const spaceBelow = viewportHeight - anchorRect.bottom;
      const spaceLeft = anchorRect.left;
      const spaceRight = viewportWidth - anchorRect.right;

      let { vertical, horizontal } = splitNonant(placement);

      switch (horizontal) {
        case 'left':
          newXFlipped = popoverRect.width + offsetX > spaceLeft && spaceRight > spaceLeft;
          horizontal = newXFlipped ? 'right' : 'left';
          break;
        case 'right':
          newXFlipped = popoverRect.width + offsetX > spaceRight && spaceLeft > spaceRight;
          horizontal = newXFlipped ? 'left' : 'right';
          break;
      }

      switch (vertical) {
        case 'top':
          newYFlipped = popoverRect.height - offsetY > spaceAbove && spaceBelow > spaceAbove;
          vertical = newYFlipped ? 'bottom' : 'top';
          break;
        case 'bottom':
          newYFlipped = popoverRect.height + offsetY > spaceBelow && spaceAbove > spaceBelow;
          vertical = newYFlipped ? 'top' : 'bottom';
          break;
      }
      newPlacement = formatNonat(vertical, horizontal);
    }

    resolvedPlacement = newPlacement;
    flippedX = newXFlipped;
    flippedY = newYFlipped;
  };

  // keep the calculated placement up-to-date
  $effect(() => {
    open;
    placement;
    anchor;
    resolvedAnchor;
    anchorOrigin;
    invoker;
    offsetX;
    offsetY;
    resolvePlacement();
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
      console.log('clearing anchor name');
      setAnchorNameElement.style.removeProperty('anchor-name');
    }
    if (element && element.style.anchorName !== anchorIdent) {
      console.log('setting anchor name on anchor element', { anchorIdent });
      element.style.anchorName = anchorIdent;
      setAnchorNameElement = element;
    }
  };

  // keep the anchor-name set on the anchor
  $effect(() => {
    setAnchorName(anchor);
  });

  const resizeObserver = new ResizeObserver(resolvePlacement);
  let observedAnchor: HTMLElement | undefined;

  // keep observing the resolved anchor for resize
  $effect(() => {
    if (observedAnchor) {
      resizeObserver.unobserve(observedAnchor);
      observedAnchor = undefined;
    }
    if (resolvedAnchor) {
      resizeObserver.observe(resolvedAnchor);
      observedAnchor = resolvedAnchor;
    }
  });

  onMount(() => {
    let offToggleEvent: () => void;
    let offScrollEvent: () => void;
    let offResizeEvent: () => void;
    if (popoverElement) {
      // keep open in sync with popover state
      offToggleEvent = on(popoverElement, 'toggle', (event) => {
        console.log('event source', event.source);
        open = event.newState === 'open';
      });

      resizeObserver.observe(popoverElement);
    }

    offScrollEvent = on(window, 'scroll', resolvePlacement, {
      capture: true,
      passive: true
    });
    offResizeEvent = on(window, 'resize', resolvePlacement, { passive: true });

    return () => {
      if (setAnchorNameElement) {
        setAnchorNameElement.style.removeProperty('anchor-name');
      }

      resizeObserver.disconnect();
      offResizeEvent?.();
      offScrollEvent?.();
      offToggleEvent?.();
    };
  });

  //#region CSS variables

  let anchorIdentCssVar = $derived(`--anchor-ident:${anchorIdent};`);

  // the offset flips with the placement to position it the same relative distance
  let offsetXCssVar = $derived(
    `--offset-x:calc(${popoverTranslate.x} ${flippedX ? '-' : '+'} ${offsetX}px);`
  );
  // the offset flips with the placement to position it the same relative distance
  let offsetYCssVar = $derived(
    `--offset-y:calc(${popoverTranslate.y} ${flippedY ? '-' : '+'} ${offsetY}px);`
  );
  let popoverStyle = $derived(`${anchorIdentCssVar} ${offsetXCssVar} ${offsetYCssVar}`);

  //#endregion
</script>

<div
  class={[
    'sterling-popover-2',
    lightDismiss ? 'light-dismiss' : undefined,
    anchor && !invoker ? 'with-anchor' : '',
    _class
  ]}
  style={popoverStyle}
  data-placement={resolvedPlacement}
  data-flipped-x={flippedX}
  data-flipped-y={flippedY}
  data-anchor-origin={resolvedAnchorOrigin}
  bind:this={popoverElement}
  popover={lightDismiss ? 'auto' : 'manual'}
  {...rest}
>
  <div class="content">
    {@render children?.()}
  </div>
</div>
