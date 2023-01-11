<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';

  /*--------------------
		Properties
	  --------------------*/

  /**
   * Disables the list and all items
   */
  export let disabled: boolean = false;

  /**
   * The items to put in the list.
   */
  export let items: any[] = [];

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
  export let selectedItem: any = undefined;

  $: {
    selectedItem = items[selectedIndex];
  }

  const inputId = uuid();

  /*--------------------
		State
	  --------------------*/

  let listRef: HTMLDivElement;
  let itemRefs: any = {};

  let focusVisible = false;

  /*--------------------
		Events
	  --------------------*/
  const dispatch = createEventDispatcher();

  const raiseItemSelected = (index: number) => {
    dispatch('itemSelected', { index, item: items[index] });
  };

  /*--------------------
		Methods
	  --------------------*/

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

  /*--------------------
		Reactions
	  --------------------*/

  $: {
    raiseItemSelected(selectedIndex);
  }

  // When the selectedIndex changes, scroll it into view
  $: {
    const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
    selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  /*--------------------
		Event Handlers
	  --------------------*/

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
<div class="sterling-list" class:horizontal class:disabled>
  {#if $$slots.label}
    <div class="label">
      <Label {disabled} for={inputId}>
        <slot name="label" />
      </Label>
    </div>
  {/if}
  <div
    bind:this={listRef}
    class="list labeled"
    class:disabled
    class:focus-visible={focusVisible}
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
        class:selected
        class:disabled
        data-index={index + 1}
        role="option"
        on:click={() => onItemClick(index)}
      >
        <slot {disabled} {index} {item} {selected}>
          {item}
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
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    margin: 0;
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

  .sterling-list:focus-visible,
  .sterling-list.focus-visible {
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

  .list {
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
  }

  .list.horizontal {
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .label {
    font-size: 0.7em;
    margin: 0.5em 0.7em;
  }

  .list-item {
    box-sizing: border-box;
    color: var(--Input__color);
    margin: 0;
    padding: 0.5em;
    outline: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .list-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .list-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .list-item.disabled {
    color: var(--Input__color--disabled);
  }

  @media (prefers-reduced-motion) {
    .sterling-list,
    .list-item {
      transition: none;
    }
  }
</style>
