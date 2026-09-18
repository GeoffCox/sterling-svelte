<script lang="ts">
  import { onMount } from 'svelte';
  import type { Popover2AnchorOrigin, Popover2Props } from './Popover2.types';
  import { on } from 'svelte/events';
  import { getPopoverOffsets } from './popover2.utils';

  let {
    anchorElement,
    anchorOrigin = 'auto',
    children,
    class: _class,
    horizontalOffset = 0,
    invokerElement,
    lightDismiss = true,
    open = $bindable(),
    placement = 'center-center',
    verticalOffset = 0,
    ...rest
  }: Popover2Props = $props();

  const anchorId = $props.id();
  const anchorIdent = `--anchor-${anchorId}`;

  // anchorOrigin='auto' follows placement
  let _anchorOrigin = $derived<Popover2AnchorOrigin>(
    anchorOrigin === 'auto' ? placement : anchorOrigin
  );

  let popoverElement = $state<HTMLDivElement | undefined>();
  let popoverTranslate = $derived(getPopoverOffsets(_anchorOrigin, placement));

  let popoverClass = $derived([
    'sterling-popover-2',
    lightDismiss ? 'light-dismiss' : undefined,
    _class
  ]);

  let anchorIdentCssVar = $derived(`--anchor-ident:${anchorIdent};`);
  let offsetXCssVar = $derived(`--offset-x:calc(${popoverTranslate.x} + ${horizontalOffset}px);`);
  let offsetYCssVar = $derived(`--offset-y:calc(${popoverTranslate.y} + ${verticalOffset}px);`);
  let popoverStyle = $derived(`${anchorIdentCssVar} ${offsetXCssVar} ${offsetYCssVar}`);

  $effect(() => {
    if (!anchorElement) {
      return;
    }
    anchorElement.style.anchorName = anchorIdent;
  });

  $effect(() => {
    if (popoverElement) {
      if (open) {
        // set the anchorName in case it got cleared
        if (anchorElement && anchorElement.style.anchorName !== anchorIdent) {
          anchorElement.style.anchorName = anchorIdent;
        }
        invokerElement
          ? popoverElement.showPopover({ source: invokerElement })
          : popoverElement.showPopover();
      } else {
        popoverElement?.hidePopover();
      }
    }
  });

  onMount(() => {
    let offToggleEvent: () => void;
    if (popoverElement) {
      // keep open in sync with the popover
      offToggleEvent = on(popoverElement, 'toggle', (event) => {
        open = event.newState === 'open';
      });
    }

    return () => {
      offToggleEvent?.();
    };
  });
</script>

<div
  class={[popoverClass, anchorElement && !invokerElement ? 'with-anchor' : '']}
  style={popoverStyle}
  data-placement={placement}
  data-anchor-origin={_anchorOrigin}
  bind:this={popoverElement}
  popover={lightDismiss ? 'auto' : 'manual'}
  {...rest}
>
  <div class="content">
    {@render children?.()}
  </div>
</div>
