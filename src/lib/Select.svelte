<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';
  import List from './List.svelte';
  import Popover from './Popover.svelte';

  const popupId = idGenerator.nextId('Select-popup');

  // ----- Props ----- //

  export let disabled: boolean = false;

  /** When true, allows the container to handle borders and focus borders.  */
  export let composed: boolean = false;

  /** When true, the dropdown is open. */
  export let open = false;

  /** The value of the selected item.*/
  export let selectedValue: string | undefined = undefined;

  /** Additional class names to apply. */
  export let variant: string = '';

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

  const onSelectClick = (event: MouseEvent) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onSelectKeydown = (event: KeyboardEvent) => {
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

  const onListKeydown = (event: KeyboardEvent) => {
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

  const onListClick = (event: MouseEvent) => {
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
  class={`sterling-select ${variant}`}
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
  on:wheel|passive
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
  <Popover reference={selectRef} bind:open id={popupId} conditionalRender={false}>
    <div class="sterling-select-popup-content">
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
    </div>
  </Popover>
</div>
