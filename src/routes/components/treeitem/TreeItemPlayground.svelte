<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import TreeItem from '$lib/containers/TreeItem.svelte';
  import { writable } from 'svelte/store';
  import { treeContextKey } from '$lib/containers/Tree.constants';
  import { setContext } from 'svelte';

  let exampleRef: any;

  let disabled = false;

  const selectedItemIdStore = writable<string | undefined>();
  const expandedItemIdStore = writable<string[]>([]);

  setContext(treeContextKey, {
    expandedItemIds: expandedItemIdStore,
    selectedItemId: selectedItemIdStore
  });
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeItem treeItemId="Coffee Bean Types">
      <TreeItem treeItemId="Arabica" />
      <TreeItem treeItemId="Robusta" />
      <TreeItem treeItemId="Liberica" />
      <TreeItem treeItemId="Excelsa" />
    </TreeItem>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .component {
    min-height: 250px;
    min-width: 400px;
  }
</style>
