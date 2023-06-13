<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Popover from './Popover.svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';

  const popupId = idGenerator.nextId('Dropdown-popup');

  // ----- Props ----- //

  export let colorful: boolean = false;
  export let composed: boolean = false;
  export let disabled: boolean = false;
  export let open = false;
  export let stayOpenOnClickAway = false;

  // ----- State ----- //

  let dropdownRef: HTMLDivElement;
  let popupContentRef: HTMLDivElement;

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

  const onClick = (event: MouseEvent) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
      switch (event.key) {
        case ' ':
          open = !open;
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'Escape':
          open = false;
          event.preventDefault();
          event.stopPropagation();
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
  class:colorful
  class:composed
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside={{ ignoreOthers: [popupContentRef] }}
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
  <slot name="value" {colorful} {composed} {disabled} {open} />
  <slot name="button" {colorful} {composed} {disabled} {open}>
    <div class="button">
      <div class="chevron" />
    </div>
  </slot>

  <Popover reference={dropdownRef} open={!disabled && open}>
    <div class="popup-content" class:colorful bind:this={popupContentRef}>
      <slot {colorful} {composed} {disabled} {open} />
    </div>
  </Popover>
</div>

<style>
  .sterling-dropdown {
    align-content: stretch;
    align-items: stretch;
    background-color: var(--stsv-input__background-color);
    border-color: var(--stsv-input__border-color);
    border-radius: var(--stsv-button__border-radius);
    border-style: var(--stsv-input__border-style);
    border-width: var(--stsv-input__border-width);
    color: var(--stsv-input__color);
    display: grid;
    grid-template-columns: 1fr 2em;
    grid-template-rows: auto;
    outline: none;
    padding: 0;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-dropdown:hover {
    background-color: var(--stsv-input__background-color--hover);
    border-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  .sterling-dropdown:focus {
    background-color: var(--stsv-input__background-color--focus);
    border-color: var(--stsv-input__border-color--focus);
    color: var(--stsv-input__color--focus);
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  .sterling-dropdown.colorful {
    background-color: var(--stsv-input--colorful__background-color);
    border-color: var(--stsv-input--colorful__border-color);
    color: var(--stsv-input--colorful__color);
  }

  .sterling-dropdown.colorful:hover {
    background-color: var(--stsv-input--colorful__background-color--hover);
    border-color: var(--stsv-input--colorful__border-color--hover);
    color: var(--stsv-input--colorful__color--hover);
  }

  .sterling-dropdown.colorful:focus {
    background-color: var(--stsv-input--colorful__background-color--focus);
    border-color: var(--stsv-input--colorful__border-color--focus);
    color: var(--stsv-input--colorful__color--focus);
  }

  .sterling-dropdown.disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-dropdown::after {
    background: repeating-linear-gradient(
      45deg,
      var(--stsv-common__background-color1--disabled),
      var(--stsv-common__background-color1--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 6px
    );
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
    min-width: 2em;
    min-height: 2em;
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

  .popup-content {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: var(--stsv-common__border-width);
    color: var(--stsv-common__color);
    padding: 0.25em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
  }

  .popup-content.colorful {
    background-color: var(--stsv-common--colorful__background-color);
    border-color: var(--stsv-common--colorful__border-color);
    color: var(--stsv-common--colorful__color);
  }

  @media (prefers-reduced-motion) {
    .sterling-dropdown,
    .sterling-dropdown::after {
      transition: none;
    }
  }
</style>
