<script lang="ts">
  import type { Keyborg } from 'keyborg';
  import type { ListContext } from './List.types';

  import { createKeyborg } from 'keyborg';
  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';
  import { listContextKey } from './List.constants';

  // ----- Props ----- //

  /**
   * If the list is composed within another container
   * @default false
   */
  export let composed = false;

  /**
   * Disables the list and all items
   * @default false
   */
  export let disabled: boolean = false;

  /**
   * If the list item layout is horizontal.
   * @default false
   */
  export let horizontal = false;

  /**
   * The value of the selected item.
   */
  export let selectedValue: string | undefined = undefined;

  // ----- State ----- //

  const listId = `list-${uuid()}`;

  let listRef: HTMLDivElement;
  let lastSelectedItemRef: HTMLElement;

  const disabledStore = writable<boolean>(disabled);
  const horizontalStore = writable<boolean>(horizontal);
  const selectedValueStore = writable<string | undefined>(selectedValue);

  $: {
    disabledStore.set(disabled);
  }

  $: {
    horizontalStore.set(horizontal);
  }

  $: {
    selectedValueStore.set(selectedValue);
  }

  $: {
    selectedValue = $selectedValueStore;
  }

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseSelect = (value?: string) => {
    dispatch('select', { value });
  };

  $: {
    raiseSelect(selectedValue);
  }

  // ----- Keyborg ----- //

  let keyborg: Keyborg = createKeyborg(window);

  let usingKeyboard = keyborg.isNavigatingWithKeyboard();
  const keyborgHandler = (value: boolean) => {
    usingKeyboard = value;
  };

  // ----- Focus ----- //

  export const focus = () => {
    listRef?.focus();
  };

  export const scrollToSelectedItem = () => {
    const element = getSelectedItemElement();
    element?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  // ----- Selection ----- //

  const isElementListItem = (candidate: Element) => {
    return (
      candidate &&
      candidate.getAttribute('data-value') !== null &&
      candidate.getAttribute('data-value') !== undefined &&
      candidate.getAttribute('role') === 'listitem'
    );
  };
  const getSelectedItemElement = () => {
    if (
      isElementListItem(lastSelectedItemRef) &&
      lastSelectedItemRef?.getAttribute('data-value') === selectedValue &&
      lastSelectedItemRef?.closest('[role="list"]') === listRef
    ) {
      return lastSelectedItemRef;
    } else {
      return listRef?.querySelector('[data-value][aria-selected=true]');
    }
  };

  const selectItem = (value: string, element: HTMLElement) => {
    selectedValueStore.set(value);
    lastSelectedItemRef = element;
    element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  export const selectFirstItem = () => {
    let candidate: Element | undefined | null = listRef?.firstElementChild;
    while (candidate && !isElementListItem(candidate)) {
      candidate = candidate.nextElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectItem(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectPreviousItem = () => {
    let selectedItem = getSelectedItemElement();
    let candidate = selectedItem?.previousElementSibling;
    while (candidate && !isElementListItem(candidate)) {
      candidate = candidate.previousElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectItem(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectNextItem = () => {
    let selectedItem = getSelectedItemElement();
    let candidate = selectedItem?.nextElementSibling;
    while (candidate && !isElementListItem(candidate)) {
      candidate = candidate.nextElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectItem(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectLastItem = () => {
    let candidate: Element | undefined | null = listRef?.lastElementChild;
    while (candidate && !isElementListItem(candidate)) {
      candidate = candidate.previousElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectItem(candidateValue, candidate as HTMLElement);
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
      let candidateValue: string | null | undefined = candidate?.getAttribute('data-value');

      if (candidateValue === undefined || candidateValue === null) {
        candidate = candidate?.closest<HTMLElement>('[data-value]');
        candidateValue = candidate?.getAttribute('data-value');
      }
      if (candidateValue && candidate) {
        selectItem(candidateValue, candidate);
      }
    }
  };

  const onKeydown: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'Home':
          selectFirstItem();
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'End':
          selectLastItem();
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowLeft':
          if (horizontal) {
            selectedValue !== undefined ? selectPreviousItem() : selectLastItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowRight':
          if (horizontal) {
            selectedValue !== undefined ? selectNextItem() : selectFirstItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowUp':
          if (!horizontal) {
            selectedValue !== undefined ? selectPreviousItem() : selectLastItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowDown':
          if (!horizontal) {
            selectedValue !== undefined ? selectNextItem() : selectFirstItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
      }
    }
  };

  // ----- Set Context ----- //

  setContext<ListContext>(listContextKey, {
    disabled: disabledStore,
    selectedValue: selectedValueStore,
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
      <slot name="label" {composed} {disabled} {horizontal} {selectedValue} />
    </Label>
  {/if}
  <div
    aria-activedescendant={selectedValue}
    aria-orientation={horizontal ? 'horizontal' : 'vertical'}
    bind:this={listRef}
    class="list"
    class:disabled
    class:horizontal
    id={listId}
    role="list"
    tabindex={0}
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
    <slot {composed} {disabled} {horizontal} {selectedValue} />
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
