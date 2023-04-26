<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';
  import List from './List.svelte';
  import Popup from './Popover.svelte';

  const popupId = idGenerator.nextId('Select-popup');

  // ----- Props ----- //

  export let composed: boolean = false;
  export let disabled: boolean = false;
  export let open = false;
  export let selectedValue: string | undefined = undefined;

  // ----- State ----- //

  // Tracks the previous open state
  let prevOpen = false;

  // Tracks the pending selected index
  let pendingSelectedValue = selectedValue;

  let selectRef: HTMLDivElement;
  let listRef: List;

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseSelect = (value?: string) => {
    dispatch('select', { value });
  };

  const raisePending = (value?: string) => {
    dispatch('pending', { value });
  };

  // ----- Reactions ----- //

  $: {
    pendingSelectedValue = selectedValue;
  }

  $: {
    raiseSelect(selectedValue);
  }

  $: {
    if (open) {
      raisePending(pendingSelectedValue);
    }
  }

  $: {
    if (open && !prevOpen) {
      prevOpen = true;
      tick().then(() => {
        setTimeout(() => {
          listRef?.focus();
          listRef?.scrollToSelectedItem();
        }, 10);
      });
    } else if (prevOpen) {
      prevOpen = false;
      tick().then(() => selectRef?.focus());
    }
  }

  // ----- Methods ----- //

  export const blur = () => {
    selectRef?.blur();
  };

  export const click = () => {
    selectRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    selectRef?.focus();
  };

  export const scrollToSelectedItem = () => {
    if (open) {
      listRef?.scrollToSelectedItem();
    }
  };

  // ----- Event Handlers ----- //

  const onSelectClick: svelte.JSX.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onSelectKeydown: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case ' ':
          {
            if (!open) {
              open = true;
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          {
            if (selectedValue) {
              listRef.selectPreviousItem();
            } else {
              listRef.selectLastItem();
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowDown':
          {
            if (selectedValue) {
              listRef.selectNextItem();
            } else {
              listRef.selectFirstItem();
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
      }
    }
  };

  const onListKeydown: svelte.JSX.KeyboardEventHandler<any> = (event) => {
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'Enter':
          {
            selectedValue = pendingSelectedValue;
            open = !open;
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'Escape':
          {
            pendingSelectedValue = selectedValue;
            open = !open;
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
      }
    }
  };

  const onListClick: svelte.JSX.MouseEventHandler<any> = (event) => {
    open = false;
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  const onListSelect = (event: CustomEvent<{ value: string }>) => {
    pendingSelectedValue = event.detail.value;
    if (!open) {
      selectedValue = pendingSelectedValue;
    }
  };
</script>

<div
  bind:this={selectRef}
  aria-controls={popupId}
  aria-haspopup="listbox"
  aria-expanded={open}
  class="sterling-select"
  class:composed
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside
  on:blur
  on:click
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
  on:click={onSelectClick}
  on:click_outside={() => (open = false)}
  on:keydown={onSelectKeydown}
  {...$$restProps}
>
  <div class="value">
    <slot name="value" {disabled} {open} {selectedValue}>
      {#if selectedValue}
        {selectedValue}
      {:else}
        <span>&nbsp;</span>
      {/if}
    </slot>
  </div>
  <div class="button">
    <slot name="button" {disabled} {open} {selectedValue}>
      <div class="chevron" />
    </slot>
  </div>
  <Popup reference={selectRef} bind:open id={popupId}>
    <List
      bind:this={listRef}
      composed
      {disabled}
      selectedValue={pendingSelectedValue}
      on:click={onListClick}
      on:keydown={onListKeydown}
      on:select={onListSelect}
      tabIndex={open ? 0 : -1}
    >
      <slot />
    </List>
  </Popup>
</div>

<style>
  .sterling-select {
    align-content: center;
    align-items: center;
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    color: var(--stsv-Input__color);
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    outline: none;
    padding: 0;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-select:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-select:focus {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-select.disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-select::after {
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

  .sterling-select.disabled::after {
    opacity: 1;
  }

  .sterling-select.composed,
  .sterling-select.composed:hover,
  .sterling-select.composed.focus,
  .sterling-select.composed.disabled {
    background: none;
    border: none;
    outline: none;
  }

  .sterling-select.composed.disabled::after {
    opacity: 0;
  }

  .value {
    padding: 0.5em;
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

  .popup-content {
    max-height: 15em;
  }

  @media (prefers-reduced-motion) {
    .sterling-select,
    .sterling-select::after {
      transition: none;
    }
  }
</style>
