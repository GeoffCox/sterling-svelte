<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';
  import ListItem from './ListItem.svelte';

  type T = $$Generic;

  /**
   * Disables the list and all items
   */
  export let disabled: boolean = false;

  /**
   * The items to put in the list.
   */
  export let items: T[] = [];

  /**
   * Controls if the list is laid out horizontally.
   */
  export let horizontal = false;

  /**
   * The index of the selected item.
   */
  export let selectedIndex = -1;

  /**
   * The selected item (readonly).
   */
  export let selectedItem: T | undefined = undefined;

  /**
   * If the list is composed within another container
   * and should not show borders or background.
   */
  export let composed = false;

  $: {
    selectedItem = items[selectedIndex];
  }

  const inputId = uuid();

  let listRef: HTMLDivElement;
  let itemRefs: Record<number, HTMLDivElement> = {};

  const dispatch = createEventDispatcher();

  const raiseItemSelected = (index: number) => {
    dispatch('itemSelected', { index, item: items[index] });
  };

  export const focusSelectedItem = () => {
    listRef.focus();
    const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
    selectedRef?.focus();
    selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  $: canSelectPreviousItem = items.length > 0 && selectedIndex !== 0;
  $: canSelectNextItem = items.length > 0 && selectedIndex !== items.length - 1;

  export const selectPreviousItem = () => {
    if (canSelectPreviousItem) {
      selectedIndex = Math.max(0, selectedIndex - 1);
    }
  };

  export const selectNextItem = () => {
    if (canSelectNextItem) {
      selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
    }
  };

  export const selectItem = (item: T) => {
    const index = items.indexOf(item);
    if (index !== -1) {
      selectedIndex = index;
    }
  };

  $: {
    raiseItemSelected(selectedIndex);
  }

  // When the selectedIndex changes, scroll it into view
  $: {
    const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
    selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  const onItemClick = (index: number) => {
    if (!disabled) {
      selectedIndex = index;
    }
  };

  const onArrowSelectPrevious: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectPreviousItem();
  };

  const onArrowSelectNext: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectNextItem();
  };

  const onKeydown: svelte.JSX.KeyboardEventHandler<HTMLDivElement> = (event) => {
    // if using arrows, only move when there are no modifier keys
    if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'ArrowLeft':
          if (horizontal) {
            onArrowSelectPrevious(event);
          }
          break;
        case 'ArrowRight':
          if (horizontal) {
            onArrowSelectNext(event);
          }
          break;
        case 'ArrowUp':
          if (!horizontal) {
            onArrowSelectPrevious(event);
          }
          break;
        case 'ArrowDown':
          if (!horizontal) {
            onArrowSelectNext(event);
          }
          break;
        default:
          break;
      }
    }
  };
</script>

<!--
@component
A list of items where a single item can be selected.
  -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="sterling-list" class:horizontal class:disabled class:composed tabindex={0}>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <div
    bind:this={listRef}
    class="list"
    class:disabled
    class:horizontal
    role="listbox"
    tabindex={!disabled ? 0 : undefined}
    on:blur
    on:click
    on:copy
    on:cut
    on:dblclick
    on:focus
    on:focusin
    on:focusout
    on:keydown={onKeydown}
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
    on:scroll
    on:wheel
    on:paste
    {...$$restProps}
  >
    {#each items as item, index (item)}
      {@const selected = selectedIndex === index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        bind:this={itemRefs[index]}
        aria-selected={disabled ? undefined : selected}
        class="list-item"
        data-index={index + 1}
        role="option"
        on:click={() => onItemClick(index)}
      >
        <slot name="item" {disabled} {index} {item} {selected}>
          <ListItem {disabled} {selected}>
            <slot {disabled} {index} {item} {selected}>
              {item}
            </slot>
          </ListItem>
        </slot>
      </div>
    {/each}
  </div>
</div>

<style>
  .sterling-list {
    background-color: var(--Common__background-color);
    border-color: var(--Common__border-color);
    border-radius: var(--Common__border-radius);
    border-style: var(--Common__border-style);
    border-width: var(--Common__border-width);
    box-sizing: border-box;
    color: var(--Common__color);
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
    border-color: var(--Common__border-color--hover);
    color: var(--Common__color--hover);
  }

  .sterling-list:focus-within {
    border-color: var(--Common__border-color--focus);
    color: var(--Common__color--focus);
    outline-color: var(--Common__outline-color);
    outline-offset: var(--Common__outline-offset);
    outline-style: var(--Common__outline-style);
    outline-width: var(--Common__outline-width);
  }

  .sterling-list.disabled {
    background-color: var(--Common__background-color--disabled);
    border-color: var(---Common__border-color--disabled);
    color: var(--Common__color--disabled);
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
