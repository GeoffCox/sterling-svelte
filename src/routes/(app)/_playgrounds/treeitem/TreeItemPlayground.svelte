<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';
  import TreeItem from '$lib/TreeItem.svelte';
  import { writable } from 'svelte/store';
  import { TREE_CONTEXT_KEY } from '$lib/Tree.constants';
  import { TREE_ITEM_CONTEXT_KEY } from '$lib/TreeItem.constants';
  import { setContext } from 'svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let depth = 0;
  let disabled = false;
  let hasChildren = true;
  let text = 'sterling-svelte';
  let value = 'item';
  let variant = '';
  let selected = false;

  const depthStore = writable<number>(depth);
  const disabledStore = writable<boolean>(false);
  const expandedValuesStore = writable<string[]>([]);
  const selectedValueStore = writable<string | undefined>();
  const variantStore = writable<string>('');

  $: {
    depthStore.set(depth);
  }

  setContext(TREE_CONTEXT_KEY, {
    disabled: disabledStore,
    expandedValues: expandedValuesStore,
    selectedValue: selectedValueStore,
    variant: variantStore
  });

  setContext(TREE_ITEM_CONTEXT_KEY, {
    depth: depthStore,
    disabled: disabledStore
  });

  $: code = getPlaygroundCode({
    disabled,
    hasChildren,
    text,
    value,
    variant
  });

  selectedValueStore.subscribe((storeValue) => {
    selected = storeValue === value;
  });

  $: selectedValueStore.set(selected ? value : undefined);
</script>

<Playground {code}>
  <div class="component" slot="component">
    {#if hasChildren}
      <TreeItem {disabled} {text} {value} {variant}>
        <TreeItem value="child1" text="Child 1" />
        <TreeItem value="child2" text="Child 2" />
        <TreeItem value="child3" text="Child 3" />
        <TreeItem value="child4" text="Child 4" />
      </TreeItem>
    {:else}
      <TreeItem {disabled} {text} {value} {variant} />
    {/if}
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="depth: {depth}">
      <div class="slider">
        <Slider max={20} step={1} precision={0} bind:value={depth} />
      </div>
    </Label>
    <Checkbox bind:checked={hasChildren}>Has Children</Checkbox>
    <Checkbox bind:checked={selected}>Selected</Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .component {
    min-width: 400px;
  }

  .slider {
    width: 350px;
    padding: 0.5em;
  }
</style>
