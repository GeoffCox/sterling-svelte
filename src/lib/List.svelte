<script lang="ts">
  import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import type { ListContext } from './List.types';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { LIST_CONTEXT_KEY } from './List.constants';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  // ----- Props ----- //

  /** If the list and all its items are disabled. */
  export let disabled: boolean = false;

  /** When true, items are arranged horizontally. */
  export let horizontal = false;

  /** The value of the currently selected item. */
  export let selectedValue: string | undefined = undefined;

  /** Additional class names to apply. */
  export let variant: string = '';

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
    let candidate: Element | undefined | null = listRef?.querySelector(
      '[data-value][role=listitem]'
    );
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
    let candidate: Element | undefined | null = listRef?.querySelector(
      '[data-value][role=listitem]:last-of-type'
    );
    console.log('in selectLastItem', candidate);
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

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
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

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
            selectedValue !== undefined && selectedValue.length > 0
              ? selectPreviousItem()
              : selectLastItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowRight':
          if (horizontal) {
            selectedValue !== undefined && selectedValue.length > 0
              ? selectNextItem()
              : selectFirstItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowUp':
          if (!horizontal) {
            selectedValue !== undefined && selectedValue.length > 0
              ? selectPreviousItem()
              : selectLastItem();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowDown':
          if (!horizontal) {
            selectedValue !== undefined && selectedValue.length > 0
              ? selectNextItem()
              : selectFirstItem();
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
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-role-supports-aria-props -->
<div
  aria-activedescendant={selectedValue}
  aria-disabled={disabled}
  aria-orientation={horizontal ? 'horizontal' : 'vertical'}
  bind:this={listRef}
  class={`sterling-list ${variant}`}
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
  on:wheel|passive
  on:paste
  {...$$restProps}
>
  <div class="container">
    <slot {disabled} {horizontal} {selectedValue} {variant} />
  </div>
</div>
