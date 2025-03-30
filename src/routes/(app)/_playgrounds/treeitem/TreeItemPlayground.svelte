<svelte:options runes={true} />

<script lang="ts">
  import type { TreeContext, TreeItemContext } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import { TREE_CONTEXT_KEY } from '$lib/Tree.constants';
  import { TREE_ITEM_CONTEXT_KEY } from '$lib/TreeItem.constants';
  import TreeItem from '$lib/TreeItem.svelte';
  import { setContext } from 'svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let depth = $state(0);
  let disabled: boolean | null | undefined = $state(false);
  let hasChildren: boolean | null | undefined = $state(false);
  let expandedValues: string[] = $state([]);
  let _label: string = $state('sterling-svelte');
  let selectedValue: string | undefined = $state(undefined);
  const value = 'item';

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

  let treeItemContext: TreeItemContext = {
    get disabled() {
      return disabled;
    },
    get depth() {
      return depth;
    }
  };

  setContext<TreeItemContext>(TREE_ITEM_CONTEXT_KEY, treeItemContext);

  let code = $derived(
    getPlaygroundCode({
      disabled,
      hasChildren,
      label: _label,
      value,
      class: _class
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component" role="tree">
      {#if hasChildren}
        <TreeItem {disabled} label={_label} {value} class={_class}>
          <TreeItem value="child1" label="Child 1" />
          <TreeItem value="child2" label="Child 2" />
          <TreeItem value="child3" label="Child 3" />
          <TreeItem value="child4" label="Child 4" />
        </TreeItem>
      {:else if _label}
        <TreeItem {disabled} {value} class={_class}>
          {#snippet label()}
            {_label}
          {/snippet}
        </TreeItem>
      {:else}
        <TreeItem {disabled} {value} class={_class}></TreeItem>
      {/if}
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="label">
      <Input bind:value={_label} />
    </Label>
    <VariantInput bind:class={_class} />
  {/snippet}
  {#snippet tweaks()}
    <Label text="depth: {depth}">
      <div class="slider">
        <Slider max={20} step={1} precision={0} bind:value={depth} />
      </div>
    </Label>
    <Checkbox bind:checked={hasChildren}>Has Children</Checkbox>
  {/snippet}
</Playground>

<style>
  .component {
    min-width: 400px;
  }

  .slider {
    width: 300px;
    padding: 0.5em;
  }
</style>
