<svelte:options runes={true} />

<script lang="ts">
  import { getContext } from 'svelte';
  import { LIST_CONTEXT_KEY } from './List.constants';
  import type { ListContext } from './List.types';
  import type { ListItemProps } from './ListItem.types';

  let { children, class: _class, disabled, value, ...rest }: ListItemProps = $props();

  const listContext = getContext<ListContext>(LIST_CONTEXT_KEY);

  let selected = $state(listContext.selectedValue === value);

  // Using $derived would be preferred, but this helps avoid
  // updates to every list item when selectedValue changes.
  $effect(() => {
    if (listContext.selectedValue === value && !selected) {
      selected = true;
    } else if (listContext.selectedValue !== value && selected) {
      selected = false;
    }
  });

  let itemRef: HTMLDivElement;

  export const click = () => {
    itemRef?.click();
  };

  export const blur = () => {
    itemRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    itemRef?.focus(options);
  };
</script>

<!-- svelte-ignore a11y_role_supports_aria_props -->
<div
  aria-selected={selected}
  bind:this={itemRef}
  class={['sterling-list-item', _class]}
  class:disabled={disabled || listContext.disabled}
  class:horizontal={listContext.horizontal}
  class:item-disabled={disabled}
  class:list-disabled={listContext.disabled}
  class:selected
  data-value={value}
  role="listitem"
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    {value}
  {/if}
</div>
