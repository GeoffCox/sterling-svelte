<script lang="ts">
  import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';
  import { createEventDispatcher, onMount, tick } from 'svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';

  const popupId = idGenerator.nextId('Dropdown-popup');

  // ----- Props ----- //

  export let composed: boolean = false;
  export let disabled: boolean = false;
  export let open = false;
  export let stayOpenOnClickAway = false;

  // ----- State ----- //

  let dropdownRef: HTMLDivElement;
  let popupRef: HTMLDivElement;

  let popupPosition: { x?: number; y?: number } = {
    x: undefined,
    y: undefined
  };

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseOpen = (open?: boolean) => {
    dispatch('open', { open });
  };

  // ----- Reactions ----- //

  $: {
    raiseOpen(open);
  }

  // ----- Methods ----- //

  export const click = () => {
    dropdownRef?.click();
  };

  export const blur = () => {
    dropdownRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    dropdownRef?.focus(options);
  };

  // ----- Event Handlers ----- //

  let mounted = false;
  onMount(() => {
    mounted = true;
    const cleanup = autoUpdate(dropdownRef, popupRef, async () => {
      const { x, y } = await computePosition(dropdownRef, popupRef, {
        placement: 'bottom-end',
        middleware: [offset({ mainAxis: 2 }), flip(), shift({ padding: 0 })]
      });

      if (open) {
        popupPosition = { x, y };
      }
    });
    return cleanup;
  });

  const onClick = (event: MouseEvent) => {
    if (!disabled && mounted) {
      const targetNode = event.target as Node;
      const withinPopup = popupRef?.contains(targetNode);

      if (!withinPopup) {
        open = !open;
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case 'Escape':
          open = false;
          event.preventDefault();
          return false;
      }
    }
  };

  const onClickOutside = (event: svelte.JSX.ClickOutsideEvent) => {
    if (!stayOpenOnClickAway) {
      open = false;
    }
  };
</script>

<div
  bind:this={dropdownRef}
  aria-controls={popupId}
  aria-haspopup={true}
  aria-expanded={open}
  class="sterling-dropdown"
  class:composed
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside
  on:blur
  on:click
  on:click={onClick}
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
  on:keydown={onKeydown}
  on:keypress
  on:keyup
  on:mousedown
  on:mouseenter
  on:mouseleave
  on:mousemove
  on:mouseover
  on:mouseout
  on:mouseup
  on:wheel
  on:paste
  on:click_outside={onClickOutside}
  {...$$restProps}
>
  <slot name="value" {composed} {disabled} {open} />
  <slot name="button" {composed} {disabled} {open}>
    <div class="button">
      <div class="chevron" />
    </div>
  </slot>

  <div
    bind:this={popupRef}
    class="popup"
    class:open={open && !disabled}
    id={popupId}
    style="left:{popupPosition.x}px; top:{popupPosition.y}px"
  >
    <slot {composed} {disabled} {open} />
  </div>
</div>

<style>
  .sterling-dropdown {
    align-content: stretch;
    align-items: stretch;
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    color: var(--stsv-Input__color);
    display: grid;
    grid-template-columns: 1fr 2em;
    grid-template-rows: auto;
    outline: none;
    padding: 0;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-dropdown:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-dropdown:focus {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-dropdown.disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-dropdown::after {
    background: var(--stsv-Disabled__background);
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }

  .sterling-dropdown.disabled::after {
    opacity: 1;
  }

  .sterling-dropdown.composed,
  .sterling-dropdown.composed:hover,
  .sterling-dropdown.composed.focus {
    background: none;
    border: none;
    outline: none;
  }

  .sterling-dropdown.composed.disabled::after {
    opacity: 0;
  }

  .button {
    grid-column-start: 2;
    grid-row-start: 1;
    cursor: pointer;
  }

  .chevron {
    display: block;
    position: relative;
    border: none;
    background: none;
    margin: 0;
    height: 100%;
    width: 32px;
  }

  .chevron::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    border-right: 3px solid currentColor;
    border-top: 3px solid currentColor;
    /* 
			The chevron is a right triangle, rotated to face down.
			It should be moved up so it is centered vertically after rotation.
			The amount to move is the hypotenuse of the right triangle of the chevron.
		    For a right triangle with equal a and b where c=1
			a^2 + b^2 = c^2 	
		    a^2 + a^2 = c^2 
		    2a^2 = c^2
			2a^2 = 1
			a^2 = 0.5
			a = sqrt(0.5)
			a = 0.707
		*/
    transform: translate(-50%, calc(-50% / 0.707)) rotate(135deg);
    transform-origin: 50% 50%;
  }

  .popup {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
    box-sizing: border-box;
    color: var(--stsv-Common__color);
    display: none;
    overflow: visible;
    outline: none;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px -1px;
    width: fit-content;
    height: fit-content;
    z-index: 1;
  }

  .popup.open {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  @media (prefers-reduced-motion) {
    .sterling-dropdown,
    .sterling-dropdown::after {
      transition: none;
    }
  }
</style>
