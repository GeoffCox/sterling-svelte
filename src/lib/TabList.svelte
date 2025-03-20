<svelte:options runes={true} />

<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

  import type { TabListContext } from './TabList.types';
  import { TAB_LIST_CONTEXT_KEY } from './TabList.constants';
  import { mergeClasses } from './mergeClasses';

  type Props = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean | null;
    selectedValue?: string;
    vertical?: boolean | null;
    onSelect?: (value?: string) => void;
  };

  let {
    children,
    class: _class,
    disabled = false,
    onSelect,
    selectedValue = $bindable(),
    vertical = false,
    ...rest
  }: Props = $props();

  let tabListRef: HTMLDivElement;
  let lastSelectedTabRef: HTMLElement;

  let tabListContext: TabListContext = {
    get disabled() {
      return disabled;
    },
    set disabled(value) {
      disabled = value;
    },
    get selectedValue() {
      return selectedValue;
    },
    set selectedValue(value) {
      selectedValue = value;
    },
    get vertical() {
      return vertical;
    },
    set vertical(value) {
      vertical = value;
    }
  };

  $effect(() => {
    tabListContext.disabled = disabled;
  });

  $effect(() => {
    tabListContext.selectedValue = selectedValue;
  });

  $effect(() => {
    tabListContext.vertical = vertical;
  });

  setContext<TabListContext>(TAB_LIST_CONTEXT_KEY, tabListContext);

  $effect(() => {
    onSelect?.(selectedValue);
  });

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
    selectedValue = value;
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

    rest.onclick?.(event);
  };

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    // if using arrows, only move when there are no modifier keys
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'Home':
          selectFirstTab();
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'End':
          selectLastTab();
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'ArrowLeft':
          if (!vertical) {
            selectPreviousTab();
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'ArrowRight':
          if (!vertical) {
            selectNextTab();
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'ArrowUp':
          if (vertical) {
            selectPreviousTab();
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        case 'ArrowDown':
          if (vertical) {
            selectNextTab();
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        default:
          break;
      }
    }

    rest.onkeydown?.(event);
  };
</script>

<div
  aria-orientation={vertical ? 'vertical' : 'horizontal'}
  bind:this={tabListRef}
  class={mergeClasses('sterling-tab-list', _class)}
  class:disabled
  class:vertical
  role="tablist"
  tabindex="-1"
  onclick={onClick}
  onkeydown={onKeydown}
  {...rest}
>
  {@render children?.()}
</div>
