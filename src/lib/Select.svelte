<script lang="ts">
  import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import { clickOutside } from './actions/clickOutside';
  import Label from './Label.svelte';
  import List from './List.svelte';

  const inputId = uuid();
  const popupId = uuid();

  /*--------------------
		Properties
	  --------------------*/

  /**
   * Disables the list and all items
   */
  export let disabled: boolean = false;

  /**
   * Opens the popup to select from the items
   */
  export let open = false;

  /**
   * The selected value
   */
  export let selectedValue: string | undefined = undefined;

  /*--------------------
		State
	  --------------------*/

  // Tracks the previous open state
  let prevOpen = false;

  // Tracks the pending selected index
  let pendingSelectedValue = selectedValue;

  let selectRef: HTMLDivElement;
  let popupRef: HTMLDivElement;
  let listRef: List;

  let popupPosition: { x?: number; y?: number } = {
    x: undefined,
    y: undefined
  };

  /*--------------------
		Events
	  --------------------*/
  const dispatch = createEventDispatcher();

  const raiseSelect = (value?: string) => {
    dispatch('select', { value });
  };

  const raisePending = (value?: string) => {
    dispatch('pending', { value });
  };

  /*--------------------
		Reactions
	  --------------------*/

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
        listRef?.focus();
        listRef?.scrollToSelectedItem();
      });
    } else if (prevOpen) {
      prevOpen = false;
      tick().then(() => selectRef?.focus());
    }
  }

  /*--------------------
		Event Handlers
	  --------------------*/

  let mounted = false;
  onMount(() => {
    mounted = true;
    const cleanup = autoUpdate(selectRef, popupRef, async () => {
      const { x, y } = await computePosition(selectRef, popupRef, {
        placement: 'bottom-end',
        middleware: [offset({ mainAxis: 2 }), flip(), shift({ padding: 0 })]
      });

      if (open) {
        popupPosition = { x, y };
      }
    });
    return cleanup;
  });

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

<!--
@component
A single item that can be selected from a popup list of items.
  -->
<div
  bind:this={selectRef}
  aria-controls={popupId}
  aria-haspopup="listbox"
  aria-expanded={open}
  class="sterling-select"
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside
  on:blur
  on:click
  on:copy
  on:cut
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
  on:wheel
  on:paste
  on:click={onSelectClick}
  on:click_outside={() => (open = false)}
  on:keydown={onSelectKeydown}
  {...$$restProps}
>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" {disabled} {selectedValue} />
    </Label>
  {/if}
  <div class="input" id={inputId}>
    <div class="value">
      <slot name="value">
        {#if selectedValue}
          {selectedValue}
        {:else}
          <span>&nbsp;</span>
        {/if}
      </slot>
    </div>
    <div class="button">
      <slot name="button" {open}>
        <div class="chevron" />
      </slot>
    </div>
  </div>
  <div
    bind:this={popupRef}
    class="popup"
    class:open
    id={popupId}
    style="left:{popupPosition.x}px; top:{popupPosition.y}px"
  >
    <div class="popup-content">
      <List
        bind:this={listRef}
        {disabled}
        selectedValue={pendingSelectedValue}
        on:click={onListClick}
        on:keydown={onListKeydown}
        on:select={onListSelect}
        tabIndex={open ? 0 : -1}
      >
        <slot />
      </List>
    </div>
  </div>
</div>

<style>
  .sterling-select {
    background-color: var(--stsv-Input__background-color);
    border-color: var(--stsv-Input__border-color);
    border-radius: var(--stsv-Input__border-radius);
    border-style: var(--stsv-Input__border-style);
    border-width: var(--stsv-Input__border-width);
    color: var(--stsv-Input__color);
    cursor: pointer;
    padding: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-select:hover {
    background-color: var(--stsv-Input__background-color--hover);
    border-color: var(--stsv-Input__border-color--hover);
    color: var(--stsv-Input__color--hover);
  }

  .sterling-select:focus-visible {
    background-color: var(--stsv-Input__background-color--focus);
    border-color: var(--stsv-Input__border-color--focus);
    color: var(--stsv-Input__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-select.disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
    outline: none;
  }

  .sterling-select > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0 0 0.7em;
  }

  .sterling-select > :global(label):empty {
    margin: 0;
  }

  .input {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    align-content: center;
    align-items: center;
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

  .popup {
    background-color: var(--stsv-Common__background-color);
    box-sizing: border-box;
    display: none;
    overflow: visible;
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

  .popup-content {
    max-height: 15em;
  }

  @media (prefers-reduced-motion) {
    .sterling-select {
      transition: none;
    }
  }
</style>
