<script lang="ts">
  import { onMount } from 'svelte';
  import type { Popover2AnchorOrigin, Popover2Props } from './Popover2.types';
  import { on } from 'svelte/events';
  import { getPopoverOffsets, splitNonant } from './popover2.utils';

  let {
    open = $bindable(),
    lightDismiss = true,
    placement = 'middle-center',
    anchorCssName,
    anchorOrigin = 'auto',
    horizontalOffset = 0,
    verticalOffset = 0,
    class: _class,
    children,
    ...rest
  }: Popover2Props = $props();

  // anchorOrigin='auto' follows placement
  let _anchorOrigin = $derived<Popover2AnchorOrigin>(
    anchorOrigin === 'auto' ? placement : anchorOrigin
  );

  let popoverElement: HTMLDivElement;

  $effect(() => {
    if (open && popoverElement) {
      popoverElement.showPopover();
    } else {
      popoverElement.hidePopover();
    }
  });

  onMount(() => {
    let offToggleEvent: () => void;
    if (popoverElement) {
      offToggleEvent = on(popoverElement, 'toggle', (event) => {
        open = event.newState === 'open';
      });
    }

    return () => {
      offToggleEvent?.();
    };
  });

  let popoverTranslate = $derived(getPopoverOffsets(_anchorOrigin, placement));

  //#region class

  let popoverClass = $derived([
    'sterling-popover-2',
    lightDismiss ? 'light-dismiss' : undefined,
    anchorCssName ? 'with-anchor' : undefined,
    _class
  ]);

  //#endregion

  //#region style

  let anchorIdentCssVar = $derived(anchorCssName ? `--anchor-ident:${anchorCssName};` : '');

  let offsetXCssVar = $derived(`--offset-x:calc(${popoverTranslate.x} + ${horizontalOffset}px);`);
  let offsetYCssVar = $derived(`--offset-y:calc(${popoverTranslate.y} + ${verticalOffset}px);`);

  let popoverStyle = $derived(`${anchorIdentCssVar} ${offsetXCssVar} ${offsetYCssVar}`);

  //#endregion
</script>

<div
  class={popoverClass}
  style={popoverStyle}
  data-placement={placement}
  data-anchor-origin={_anchorOrigin}
  bind:this={popoverElement}
  popover={lightDismiss ? 'auto' : 'manual'}
  {...rest}
>
  {@render children?.()}
</div>
