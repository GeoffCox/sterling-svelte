<script lang="ts">
  import type { Keyborg } from 'keyborg';

  import { createKeyborg } from 'keyborg';
  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';
  import { listContextKey } from './List.constants';
  import type { ListContext } from './List.types';

  // ----- Props ----- //

  /**
   * If the list is composed within another container
   * and should not show borders or background.
   */
  export let composed = false;

  /**
   * Disables the list and all items
   */
  export let disabled: boolean = false;

  /**
   * Controls if the list is laid out horizontally.
   */
  export let horizontal = false;

  /**
   * The selected item (readonly).
   */
  export let selectedItemId: string | undefined = undefined;

  // ----- State ----- //

  const listId = `list-${uuid()}`;

  let listRef: HTMLDivElement;
  let lastSelectedItemRef: HTMLElement;

  const selectedItemIdStore = writable<string | undefined>(selectedItemId);
  const horizontalStore = writable<boolean>(horizontal);
  const disabledStore = writable<boolean>(disabled);

  $: {
    disabledStore.set(disabled);
  }

  $: {
    horizontalStore.set(horizontal);
  }

  $: {
    selectedItemIdStore.set(selectedItemId);
  }

  $: {
    selectedItemId = $selectedItemIdStore;
  }

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseSelect = (itemId?: string) => {
    dispatch('select', { itemId });
  };

  $: {
    raiseSelect(selectedItemId);
  }

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Selection ----- //

  const getSelectedItemElement = () => {
    if (
      lastSelectedItemRef &&
      lastSelectedItemRef.getAttribute('data-list-item-id') === selectedItemId &&
      lastSelectedItemRef.closest('[role="listbox]') === listRef
    ) {
      return lastSelectedItemRef;
    } else {
      return listRef.querySelector('[data-list-item-id][aria-selected=true]');
    }
  };

  const selectItem = (itemId: string, element: HTMLElement) => {
    selectedItemIdStore.set(itemId);
    lastSelectedItemRef = element;
    element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  export const selectFirstItem = () => {
    let candidate: Element | undefined | null = listRef?.firstElementChild;
    while (candidate && candidate.getAttribute('data-list-item-id') === null) {
      candidate = candidate.nextElementSibling;
    }
    let candidateItemId = candidate?.getAttribute('data-list-item-id');

    if (candidateItemId && candidate) {
      selectItem(candidateItemId, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectPreviousItem = () => {
    let selectedItem = getSelectedItemElement();
    let candidate = selectedItem?.previousElementSibling;
    while (candidate && candidate.getAttribute('data-list-item-id') === null) {
      candidate = candidate.previousElementSibling;
    }
    let candidateItemId = candidate?.getAttribute('data-list-item-id');

    if (candidateItemId && candidate) {
      selectItem(candidateItemId, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectNextItem = () => {
    let selectedItem = getSelectedItemElement();
    let candidate = selectedItem?.nextElementSibling;
    while (candidate && candidate.getAttribute('data-list-item-id') === null) {
      candidate = candidate.nextElementSibling;
    }
    let candidateItemId = candidate?.getAttribute('data-list-item-id');

    if (candidateItemId && candidate) {
      selectItem(candidateItemId, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectLastItem = () => {
    let candidate: Element | undefined | null = listRef?.lastElementChild;
    while (
      candidate &&
      (candidate.getAttribute('data-list-item-id') === null ||
        candidate.classList.contains('disabled'))
    ) {
      candidate = candidate.previousElementSibling;
    }
    let candidateItemId = candidate?.getAttribute('data-list-item-id');

    if (candidateItemId && candidate) {
      selectItem(candidateItemId, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  // ----- Event Handlers ----- //

  onMount(() => {
    keyborg.subscribe(keyborgHandler);

    return () => {
      keyborg.unsubscribe(keyborgHandler);
    };
  });

  const onClick: svelte.JSX.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      let candidate: HTMLElement | null | undefined = event.target as HTMLElement;
      let candidateItemId: string | null | undefined = candidate?.getAttribute('data-list-item-id');

      if (candidateItemId === undefined || candidateItemId === null) {
        candidate = candidate?.closest<HTMLElement>('[data-list-item-id]');
        candidateItemId = candidate?.getAttribute('data-list-item-id');
      }
      if (candidateItemId && candidate) {
        selectItem(candidateItemId, candidate);
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  };

  const onKeydown: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    // if using arrows, only move when there are no modifier keys
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'Home':
          if (selectFirstItem()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'End':
          if (selectLastItem()) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowLeft':
          if (horizontal) {
            selectPreviousItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowRight':
          if (horizontal) {
            selectNextItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowUp':
          if (!horizontal) {
            selectPreviousItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowDown':
          if (!horizontal) {
            selectNextItem();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        default:
          break;
      }
    }
  };

  // ----- Set Context ----- //

  setContext<ListContext>(listContextKey, {
    disabled: disabledStore,
    selectedItemId: selectedItemIdStore,
    horizontal: horizontalStore
  });
</script>

<!--
@component
A list of items where a single item can be selected.
  -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="sterling-list"
  class:horizontal
  class:disabled
  class:composed
  class:using-keyboard={usingKeyboard}
>
  {#if $$slots.label}
    <Label {disabled} for={listId}>
      <slot name="label" {composed} {disabled} {horizontal} {selectedItemId} />
    </Label>
  {/if}
  <div
    aria-activedescendant={selectedItemId}
    aria-orientation={horizontal ? 'horizontal' : 'vertical'}
    bind:this={listRef}
    class="list"
    class:disabled
    class:horizontal
    id={listId}
    role="listbox"
    tabindex={!disabled ? 0 : undefined}
    on:blur
    on:click
    on:click={onClick}
    on:copy
    on:cut
    on:dblclick
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
    on:scroll
    on:wheel
    on:paste
    {...$$restProps}
  >
    <slot {composed} {disabled} {horizontal} {selectedItemId} />
  </div>
</div>

<style>
  .sterling-list {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
    box-sizing: border-box;
    color: var(--stsv-Common__color);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-list.horizontal {
    height: unset;
    width: 100%;
  }

  .sterling-list:hover {
    border-color: var(--stsv-Common__border-color--hover);
    color: var(--stsv-Common__color--hover);
  }

  .sterling-list.using-keyboard:focus-within {
    border-color: var(--stsv-Common__border-color--focus);
    color: var(--stsv-Common__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-list.disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-list.composed,
  .sterling-list:hover.composed,
  .sterling-list:focus-visible.composed,
  .sterling-list.disabled.composed {
    background: none;
    border: none;
    outline: none;
  }

  .list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    grid-row: 2 / span 1;
    overflow-x: hidden;
    overflow-y: scroll;
    outline: none;
    position: relative;
  }

  .list.horizontal {
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .sterling-list > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0.7em;
  }

  .sterling-list > :global(label):empty {
    margin: 0;
  }

  @media (prefers-reduced-motion) {
    .sterling-list {
      transition: none;
    }
  }
</style>
