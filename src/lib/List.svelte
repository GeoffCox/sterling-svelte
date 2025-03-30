<svelte:options runes={true} />

<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import { LIST_CONTEXT_KEY } from './List.constants';
  import type { ListContext } from './List.types';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  type Props = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean | null;
    horizontal?: boolean | null;
    selectedValue?: string;
    onSelect?: (value?: string) => void;
  };

  let {
    children,
    class: _class,
    disabled = false,
    horizontal = false,
    selectedValue = $bindable(),
    onSelect,
    ...rest
  }: Props = $props();

  let listRef: HTMLDivElement;
  let lastSelectedItemRef: HTMLElement;

  let listContext = $state({
    disabled,
    selectedValue,
    horizontal
  });

  $effect(() => {
    listContext.disabled = disabled;
  });

  $effect(() => {
    listContext.horizontal = horizontal;
  });

  $effect(() => {
    listContext.selectedValue = selectedValue;
  });

  setContext<ListContext>(LIST_CONTEXT_KEY, listContext);

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

  $effect(() => {
    onSelect?.(selectedValue);
  });

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
    selectedValue = value;
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
    rest.onclick?.(event);
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
    rest.onkeydown?.(event);
  };
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_role_supports_aria_props -->
<div
  aria-activedescendant={selectedValue}
  aria-disabled={disabled}
  aria-orientation={horizontal ? 'horizontal' : 'vertical'}
  bind:this={listRef}
  class={['sterling-list', _class]}
  class:disabled
  class:horizontal
  class:using-keyboard={$usingKeyboard}
  role="list"
  tabindex={0}
  {...rest}
  onclick={onClick}
  onkeydown={onKeydown}
>
  <div class="container">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
