<script lang="ts">
  import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import type { TabListContext } from './TabList.types';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { TAB_LIST_CONTEXT_KEY } from './TabList.constants';

  // ----- Props ----- //

  /** When true, the tab list and its tabs are disabled. */
  export let disabled = false;

  /** The value of the currently selected tab. */
  export let selectedValue: string | undefined = undefined;

  /** When true, the tab list is displayed vertically. */
  export let vertical = false;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let tabListRef: HTMLDivElement;
  let lastSelectedTabRef: HTMLElement;

  const disabledStore = writable<boolean>(disabled);
  const selectedValueStore = writable<string | undefined>(selectedValue);
  const verticalStore = writable<boolean>(vertical);

  $: disabledStore.set(disabled);

  $: selectedValueStore.set(selectedValue);

  $: {
    selectedValue = $selectedValueStore;
  }

  $: verticalStore.set(vertical);

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
    tabListRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    let selectedItem = getSelectedTabElement();
    if (selectedValue && selectedItem) {
      selectTab(selectedValue, selectedItem as HTMLElement);
    } else {
      selectFirstTab();
    }
  };

  // ----- Selection ----- //

  const isElementTab = (candidate: Element) => {
    return (
      candidate &&
      candidate.getAttribute('data-value') !== null &&
      candidate.getAttribute('data-value') !== undefined &&
      candidate.getAttribute('role') === 'tab'
    );
  };

  const getSelectedTabElement = () => {
    if (
      isElementTab(lastSelectedTabRef) &&
      lastSelectedTabRef?.getAttribute('data-value') === selectedValue &&
      lastSelectedTabRef?.closest('[role="tablist"]') === tabListRef
    ) {
      return lastSelectedTabRef;
    } else {
      return tabListRef?.querySelector('[data-value][aria-selected=true]');
    }
  };

  const selectTab = (value: string, element: HTMLElement) => {
    selectedValueStore.set(value);
    lastSelectedTabRef = element;
    element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    element.focus();
  };

  export const selectFirstTab = () => {
    let candidate: Element | undefined | null = tabListRef?.firstElementChild;
    while (candidate && !isElementTab(candidate)) {
      candidate = candidate.nextElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectTab(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectPreviousTab = () => {
    let selectedTab = getSelectedTabElement();
    let candidate = selectedTab?.previousElementSibling;
    while (candidate && !isElementTab(candidate)) {
      candidate = candidate.previousElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectTab(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectNextTab = () => {
    let selectedTab = getSelectedTabElement();
    let candidate = selectedTab?.nextElementSibling;
    while (candidate && !isElementTab(candidate)) {
      candidate = candidate.nextElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectTab(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  export const selectLastTab = () => {
    let candidate: Element | undefined | null = tabListRef?.lastElementChild;
    while (candidate && !isElementTab(candidate)) {
      candidate = candidate.previousElementSibling;
    }
    let candidateValue = candidate?.getAttribute('data-value');

    if (candidateValue && candidate) {
      selectTab(candidateValue, candidate as HTMLElement);
      return true;
    }

    return false;
  };

  // ----- EventHandlers ----- //

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      let candidate: HTMLElement | null | undefined = event.target as HTMLElement;
      let candidateValue: string | null | undefined = candidate?.getAttribute('data-value');

      if (candidateValue === undefined || candidateValue === null) {
        candidate = candidate?.closest<HTMLElement>('[role=tab]');
        candidateValue = candidate?.getAttribute('data-value');
      }

      if (candidateValue && candidate) {
        selectTab(candidateValue, candidate);
      }
    }
  };

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    // if using arrows, only move when there are no modifier keys
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'Home':
          selectFirstTab();
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'End':
          selectLastTab();
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowLeft':
          if (!vertical) {
            selectPreviousTab();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowRight':
          if (!vertical) {
            selectNextTab();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowUp':
          if (vertical) {
            selectPreviousTab();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        case 'ArrowDown':
          if (vertical) {
            selectNextTab();
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        default:
          break;
      }
    }
  };

  // ----- Set Context ----- //

  setContext<TabListContext>(TAB_LIST_CONTEXT_KEY, {
    disabled: disabledStore,
    selectedValue: selectedValueStore,
    vertical: verticalStore
  });
</script>

<div
  aria-orientation={vertical ? 'vertical' : 'horizontal'}
  bind:this={tabListRef}
  class={`sterling-tab-list ${variant}`}
  class:disabled
  class:vertical
  role="tablist"
  tabindex="-1"
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
  <slot {disabled} {selectedValue} {variant} {vertical} />
</div>
