<svelte:options runes={true} />

<script lang="ts">
  import { setContext } from 'svelte';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';
  import { TREE_CONTEXT_KEY } from './Tree.constants';
  import type { TreeContext, TreeProps } from './Tree.types';

  let {
    children,
    class: _class,
    disabled = false,
    expandedValues = $bindable([]),
    onExpandCollapse,
    onSelect,
    selectedValue = $bindable(undefined),
    ...rest
  }: TreeProps = $props();

  let treeRef: HTMLDivElement;

  let treeContext = {
    get disabled() {
      return disabled;
    },
    get expandedValues() {
      return expandedValues;
    },
    set expandedValues(value: string[]) {
      expandedValues = value;
    },
    get selectedValue() {
      return selectedValue;
    },
    set selectedValue(value: string | undefined) {
      selectedValue = value;
    }
  };

  setContext<TreeContext>(TREE_CONTEXT_KEY, treeContext);

  $effect(() => {
    onSelect?.(selectedValue);
  });

  $effect(() => {
    onExpandCollapse?.(expandedValues);
  });

  export const blur = () => {
    treeRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    treeRef?.focus(options);
  };
</script>

<div
  bind:this={treeRef}
  aria-disabled={disabled}
  class={['sterling-tree', _class]}
  class:disabled
  class:using-keyboard={$usingKeyboard}
  role="tree"
  tabindex="0"
  {...rest}
>
  <div class="container">
    {@render children?.()}
  </div>
</div>
