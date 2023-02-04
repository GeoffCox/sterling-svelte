<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import { onMount } from 'svelte';
  import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
    type VirtualElement
  } from '@floating-ui/dom';
  import { portal } from '../portal';

  type T = $$Generic;

  export let disabled = false;

  export let menuItemId: string;
  export let open = false;
  export let selected = false;
  export let text: string;

  let menuItemRef: HTMLDivElement;
  let popupRef: HTMLDivElement;

  const popupId = uuid();
  let popupPosition: { x?: number; y?: number } = {
    x: undefined,
    y: undefined
  };

  // const getPortalRef = () => {
  //   let portalRef = document.querySelector('#SterlingMenuPortal') as HTMLElement;
  //   if (!portalRef) {
  //     const bodyRef = document.querySelector<HTMLElement>('body') || undefined;
  //     let portalRef = document.createElement('div');
  //     portalRef.id = 'SterlingMenuPortal';
  //     portalRef.style.overflow = 'visible';
  //     bodyRef?.append(portalRef);
  //   }
  //   return portalRef;
  // };

  //let portalRef: HTMLElement;

  const computePopupPosition = async () => {
    const inPortal = !!menuItemRef.parentElement?.closest('.popup');

    const { x, y } = await computePosition(menuItemRef, popupRef, {
      placement: inPortal ? 'right-start' : 'bottom',
      middleware: [offset({ mainAxis: 2 }), flip(), shift({ padding: 0 })]
    });

    popupPosition = { x, y };
    console.log('computePopupPosition', x, y);
  };

  let mounted = false;
  onMount(() => {
    mounted = true;
    console.log('mounted');
    // const cleanup = autoUpdate(menuItemRef, popupRef, computePopupPosition);
    // return cleanup;
  });

  let cleanupAutoUpdate = () => {};
  const autoUpdatePopupPosition = () => {
    cleanupAutoUpdate();
    if (menuItemRef && popupRef) {
      cleanupAutoUpdate = autoUpdate(menuItemRef, popupRef, computePopupPosition);
    }
  };

  $: mounted, open, menuItemRef, popupRef, autoUpdatePopupPosition();

  const onMenuItemClick: svelte.JSX.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  let portalRef = document.querySelector('#SterlingMenuPortal') as HTMLElement;
  if (!portalRef) {
    portalRef = document.createElement('div');
    portalRef.id = 'SterlingMenuPortal';
    portalRef.style.overflow = 'visible';
    document.body.append(portalRef);
  }
</script>

<div
  aria-controls={popupId}
  aria-expanded={open}
  aria-haspopup="menu"
  bind:this={menuItemRef}
  class="sterling-menu-item"
  class:disabled
  class:selected
  data-menu-item-id={menuItemId}
  role="menuitem"
  on:blur
  on:click={onMenuItemClick}
  on:click
  on:dblclick
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
  on:wheel
>
  <slot name="text" {disabled} {menuItemId} {text}>
    <div>{text}</div>
  </slot>
  {#if open}
    <div class="portal" use:portal={{ target: portalRef, condition: open }}>
      <div
        bind:this={popupRef}
        class="popup"
        class:open
        id={`${menuItemId}-${popupId}`}
        style="left:{popupPosition.x}px; top:{popupPosition.y}px"
      >
        {#if $$slots.default}
          <div class="children">
            <slot />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .sterling-menu-item {
    background-color: var(--Common__background-color);
    box-sizing: border-box;
    color: var(--Input__color);
    margin: 0;
    padding: 0.5em;
    position: relative;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-menu-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-menu-item.disabled {
    color: var(--Input__color--disabled);
  }

  .sterling-menu-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .portal {
    position: relative;
    overflow: visible;
  }

  .popup {
    background-color: var(--Common__background-color);
    box-sizing: border-box;
    display: none;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px -1px;
    overflow: hidden;
    width: max-content;
    height: fit-content;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .popup.open {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  @media (prefers-reduced-motion) {
    .sterling-menu-item {
      transition: none;
    }
  }
</style>
