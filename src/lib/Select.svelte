<svelte:options runes={true} />

<script lang="ts">
  import { tick, type Snippet } from 'svelte';

  import { clickOutside } from './actions/clickOutside';
  import { idGenerator } from './idGenerator';
  import List from './List.svelte';
  import Popover from './Popover.svelte';
  import type { HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean | null;
    listClass?: string;
    open?: boolean | null;
    selectedValue?: string;
    onSelect?: (value?: string) => void;
    onPending?: (value?: string) => void;
    valueSnippet?: Snippet<[string | undefined]>;
    buttonSnippet?: Snippet;
  };

  let {
    buttonSnippet,
    children,
    class: _class,
    disabled = false,
    open = $bindable(false),
    onSelect,
    onPending,
    selectedValue = $bindable(),
    listClass,
    valueSnippet,
    ...rest
  }: Props = $props();

  const popupId = idGenerator.nextId('Select-popup');

  // ----- State ----- //

  // Tracks the pending selected index
  let pendingSelectedValue: string | undefined = $state(selectedValue);

  // svelte-ignore non_reactive_update
  let selectRef: HTMLElement | undefined = $state(undefined);
  let listRef: List;

  // ----- Reactions ----- //

  $effect(() => {
    pendingSelectedValue = selectedValue;
  });

  $effect(() => {
    onSelect?.(selectedValue);
  });

  $effect(() => {
    if (open) {
      onPending?.(pendingSelectedValue);
    }
  });

  $effect(() => {
    if (open) {
      tick().then(() => {
        setTimeout(() => {
          listRef?.focus();
          listRef?.scrollToSelectedItem();
        }, 10);
      });
    }
  });

  $effect(() => {
    if (!open) {
      tick().then(() => selectRef?.focus());
    }
  });

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

  const onSelectClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      open = !open;
      event.preventDefault();
      event.stopPropagation();
    }
    rest.onclick?.(event);
  };

  const onSelectKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
              listRef?.selectPreviousItem();
            } else {
              listRef?.selectLastItem();
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
        case 'ArrowDown':
          {
            if (selectedValue) {
              listRef?.selectNextItem();
            } else {
              listRef?.selectFirstItem();
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          break;
      }
    }
    rest.onkeydown?.(event);
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

  const onListSelect = (value?: string) => {
    pendingSelectedValue = value;
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
  class={['sterling-select', _class].filter(Boolean).join(' ')}
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside={{ onclickoutside: () => (open = false) }}
  {...rest}
  onclick={onSelectClick}
  onkeydown={onSelectKeydown}
>
  <div class="value">
    {#if valueSnippet}
      {@render valueSnippet(selectedValue)}
    {:else if selectedValue}
      {selectedValue}
    {:else}
      <span>&nbsp;</span>
    {/if}
  </div>
  <div class="button">
    {#if buttonSnippet}
      {@render buttonSnippet()}
    {:else}
      <div class="chevron"></div>
    {/if}
  </div>
  <Popover reference={selectRef} bind:open id={popupId} conditionalRender={false}>
    <div class={['sterling-select-popup-content', _class].filter(Boolean).join(' ')}>
      <List
        bind:this={listRef}
        {disabled}
        selectedValue={pendingSelectedValue}
        onclick={onListClick}
        onkeydown={onListKeydown}
        onSelect={onListSelect}
        tabindex={open ? 0 : -1}
        class={`composed ${listClass}`}
      >
        {#if children}
          {@render children()}
        {/if}
      </List>
    </div>
  </Popover>
</div>
