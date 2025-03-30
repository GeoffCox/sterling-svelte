<svelte:options runes={true} />

<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import type { HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';
  import { clickOutside } from './actions/clickOutside';
  import List from './List.svelte';
  import Popover from './Popover.svelte';

  const uuid = $props.id();

  type DeprecatedProps = {
    /** @deprecated Use icon instead */
    buttonSnippet?: Snippet;

    /** @deprecated Use value instead */
    valueSnippet?: Snippet<[string | undefined]>;
  };

  type Props = HTMLAttributes<HTMLDivElement> &
    DeprecatedProps & {
      disabled?: boolean | null;
      icon?: Snippet;
      listClass?: string;
      onPending?: (value?: string) => void;
      onSelect?: (value?: string) => void;
      open?: boolean | null;
      selectedValue?: string;
      value?: string | Snippet<[string | undefined]>;
    };

  let {
    children,
    class: _class,
    disabled = false,
    icon,
    listClass,
    open = $bindable(false),
    onSelect,
    onPending,
    selectedValue = $bindable(),
    value,
    buttonSnippet,
    valueSnippet,
    ...rest
  }: Props = $props();

  // backwards compatibility
  icon = icon || buttonSnippet;
  value = value || valueSnippet;

  const popoverId = `Select-Popover-${uuid}`;

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
  aria-controls={popoverId}
  aria-haspopup="listbox"
  aria-expanded={open}
  class={['sterling-select', _class]}
  class:disabled
  role="combobox"
  tabindex="0"
  use:clickOutside={{ onclickoutside: () => (open = false) }}
  {...rest}
  onclick={onSelectClick}
  onkeydown={onSelectKeydown}
>
  <div class="value">
    {#if value}
      {#if typeof value === 'string'}
        {value}
      {:else}
        {@render value(selectedValue)}
      {/if}
    {:else if selectedValue}
      {selectedValue}
    {:else}
      <span>&nbsp;</span>
    {/if}
  </div>
  <!-- button class was initially incorrect, so leaving it here for now -->
  <div class="button icon">
    {#if icon}
      {@render icon()}
    {:else}
      <div class="chevron"></div>
    {/if}
  </div>
  <Popover id={popoverId} reference={selectRef} bind:open conditionalRender={false}>
    <div class={['sterling-select-popup-content', 'sterling-select-content', _class]}>
      <List
        bind:this={listRef}
        {disabled}
        selectedValue={pendingSelectedValue}
        onclick={onListClick}
        onkeydown={onListKeydown}
        onSelect={onListSelect}
        tabindex={open ? 0 : -1}
        class={['composed', listClass]}
      >
        {#if children}
          {@render children()}
        {/if}
      </List>
    </div>
  </Popover>
</div>
