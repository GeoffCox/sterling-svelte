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

  let exampleRef: any;

  let depth = 0;
  let disabled = false;
  let variant = '';

  const depthStore = writable<number>(depth);
  const disabledStore = writable<boolean>(disabled);
  const expandedValuesStore = writable<string[]>([]);
  const selectedValueStore = writable<string | undefined>();
  const variantStore = writable<string>('');

  $: {
    depthStore.set(depth);
  }

  $: {
    disabledStore.set(disabled);
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
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeItem value="Coffee Bean Types" {disabled} {variant}>
      <TreeItem value="Arabica" />
      <TreeItem value="Robusta" />
      <TreeItem value="Liberica" />
      <TreeItem value="Excelsa" />
    </TreeItem>
  </div>
  <svelte:fragment slot="props">
    <Label text="depth: {depth}">
      <div class="slider">
        <Slider max={20} step={1} precision={0} bind:value={depth} />
      </div>
    </Label>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant availableVariants={[]} />
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
