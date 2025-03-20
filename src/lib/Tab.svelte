<svelte:options runes={true} />

<script lang="ts">
  import { getContext } from 'svelte';

  import type { TabListContext } from './TabList.types';
  import { TAB_LIST_CONTEXT_KEY } from './TabList.constants';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { mergeClasses } from './mergeClasses';

  type Props = HTMLButtonAttributes & {
    value: string;
  };

  let { children, class: _class, disabled = false, value, ...rest }: Props = $props();

  let tabRef: HTMLButtonElement;

  const tabListContext = getContext<TabListContext>(TAB_LIST_CONTEXT_KEY);

  let selected = $state(tabListContext.selectedValue === value);

  let _disabled = $derived(tabListContext.disabled || disabled);

  // Using $derived would be preferred, but this helps avoid
  // updates to every tab when selectedValue changes.
  // let selected = $derived(tabContext.selectedValue === value);
  $effect(() => {
    if (tabListContext.selectedValue === value && !selected) {
      selected = true;
    } else if (tabListContext.selectedValue !== value && selected) {
      selected = false;
    }
  });

  export const click = () => {
    tabRef?.click();
  };

  export const blur = () => {
    tabRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    tabRef?.focus(options);
  };
</script>

<button
  bind:this={tabRef}
  aria-selected={selected}
  class={mergeClasses('sterling-tab', _class)}
  class:selected
  class:using-keyboard={$usingKeyboard}
  class:vertical={tabListContext.vertical}
  data-value={value}
  disabled={_disabled}
  role="tab"
  type="button"
  tabIndex={selected ? 0 : -1}
  {...rest}
>
  <div class="content">
    {@render children?.()}
  </div>
  <div class="indicator"></div>
</button>
