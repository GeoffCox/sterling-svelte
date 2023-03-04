<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import TreeItem from '$lib/TreeItem.svelte';
  import { writable } from 'svelte/store';
  import { treeContextKey } from '$lib/Tree.constants';
  import { setContext } from 'svelte';

  let exampleRef: any;

  let disabled = false;

  const expandedValuesStore = writable<string[]>([]);
  const selectedValueStore = writable<string | undefined>();

  setContext(treeContextKey, {
    expandedValues: expandedValuesStore,
    selectedValue: selectedValueStore
  });
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeItem value="Coffee Bean Types" {disabled}>
      <TreeItem value="Arabica" />
      <TreeItem value="Robusta" />
      <TreeItem value="Liberica" />
      <TreeItem value="Excelsa" />
    </TreeItem>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .component {
    min-height: 250px;
    min-width: 400px;
  }
</style>
