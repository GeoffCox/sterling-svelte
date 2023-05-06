<script lang="ts">
  import type { ListContext } from './List.types';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { LIST_CONTEXT_KEY } from './List.constants';
  import { usingKeyboard } from './stores/usingKeyboard';

  // ----- Props ----- //

  export let composed = false;
  export let disabled: boolean = false;
  export let horizontal = false;
  export let selectedValue: string | undefined = undefined;

  // ----- State ----- //

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

  // ----- Methods ----- //

  export const blur = () => {
    listRef?.blur();
  };

  export const click = () => {
    listRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    listRef?.focus();
  };

  export const scrollToSelectedItem = () => {
    const element = getSelectedItemElement();
    element?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  // ----- Focus ----- //

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

  setContext<ListContext>(LIST_CONTEXT_KEY, {
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
  aria-activedescendant={selectedValue}
  aria-disabled={disabled}
  aria-orientation={horizontal ? 'horizontal' : 'vertical'}
  bind:this={listRef}
  class="sterling-list"
  class:composed
  class:disabled
  class:horizontal
  class:using-keyboard={$usingKeyboard}
  role="list"
  tabindex={0}
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
  on:scroll
  on:wheel
  on:paste
  {...$$restProps}
>
  <div class="container">
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
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-list.horizontal {
    height: unset;
    overflow-x: auto;
    overflow-y: hidden;
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

  .sterling-list.composed,
  .sterling-list.composed:hover,
  .sterling-list.composed.using-keyboard:focus-within,
  .sterling-list.composed.disabled {
    background: none;
    border: none;
    outline: none;
  }

  .sterling-list.disabled * {
    cursor: not-allowed;
  }

  /* ----- container - a layout panel that grows with the items ----- */

  .container {
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .sterling-list.horizontal .container {
    flex-direction: row;
  }

  .container::after {
    background: var(--stsv-Disabled__background);
    content: '';
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    pointer-events: none;
    transition: opacity 250ms;
  }

  .sterling-list.disabled .container::after {
    opacity: 1;
  }

  /* ----- media queries ----- */

  @media (prefers-reduced-motion) {
    .sterling-list,
    .container::after {
      transition: none;
    }
  }
</style>
