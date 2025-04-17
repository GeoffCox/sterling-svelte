<script module lang="ts">
  const defaultFilter = (values: string[], text?: string): string[] => {
    const filtered = values.filter((v) => !text || v.toLowerCase().includes(text.toLowerCase()));

    if (filtered.length === 0) {
      return values;
    }

    return filtered;
  };
</script>

<script lang="ts">
  import type {
    ChangeEventHandler,
    FocusEventHandler,
    KeyboardEventHandler
  } from 'svelte/elements';
  import type { AutocompleteProps } from './Autocomplete.types';
  import { List, Input, Popover, ListItem } from '$lib';

  const uuid = $props.id();
  const popoverId = `Autocomplete-Popover-${uuid}`;

  let {
    filter = defaultFilter,
    item,
    value: inputValue = $bindable(),
    values = [],
    ...rest
  }: AutocompleteProps = $props();

  let autocompleteDiv: HTMLDivElement | undefined = $state();
  let contentDiv: HTMLDivElement | undefined = $state();
  let list: List | undefined = $state();

  let open = $state(false);
  let filteredValues = $state(values);
  let selectedListValue: string | undefined = $state();

  // if the filters items do not include the selectedValue, clear it
  $effect(() => {
    if (selectedListValue && !filteredValues.includes(selectedListValue)) {
      selectedListValue = undefined;
    }
  });

  // if the filter, value, or inputValue changes, update the filteredValues
  $effect(() => {
    filteredValues = filter(values, inputValue);
  });

  const onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    open = true;
    event.stopPropagation();
    rest.onfocus?.(event);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const relatedNode = event.relatedTarget as Node;
    if (!relatedNode || (contentDiv && !contentDiv.contains(relatedNode))) {
      open = false;
    }
    rest.onblur?.(event);
  };

  const onInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    open = true;
    filteredValues = filter(values, event.currentTarget.value);
    rest.oninput?.(event);
  };

  const onKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case ' ':
          event.stopPropagation();
          break;
        case 'Escape':
          open = false;
          event.stopPropagation();
          break;
        case 'Enter':
          if (selectedListValue) {
            inputValue = selectedListValue;
            open = false;
          }
          event.stopPropagation();
          break;
        case 'ArrowUp': {
          if (!open) {
            open = true;
            filteredValues = values;
          }
          if (selectedListValue) {
            list?.selectPreviousItem();
          } else {
            list?.selectLastItem();
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case 'ArrowDown': {
          if (!open) {
            open = true;
            filteredValues = values;
          }
          if (selectedListValue) {
            list?.selectNextItem();
          } else {
            selectedListValue = undefined;
            list?.selectFirstItem();
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        }
      }
    }
    rest.onkeydown?.(event);
  };

  const onListItemClick = (event: MouseEvent, value: string) => {
    inputValue = value;
    open = false;
  };
</script>

<div class="sterling-autocomplete" bind:this={autocompleteDiv}>
  <Input
    bind:value={inputValue}
    {...rest}
    onkeydown={onKeydown}
    oninput={onInput}
    onfocus={onFocus}
    onblur={onBlur}
  />
  <Popover id={popoverId} {open} placement="bottom-start" reference={autocompleteDiv}>
    <div bind:this={contentDiv} class="sterling-autocomplete-content">
      <List bind:this={list} bind:selectedValue={selectedListValue} class="composed">
        {#each filteredValues as itemValue}
          <ListItem value={itemValue} onclick={(event) => onListItemClick(event, itemValue)}>
            {#if item}
              {@render item(itemValue)}
            {:else}
              {itemValue}
            {/if}
          </ListItem>
        {/each}
      </List>
    </div>
  </Popover>
</div>
