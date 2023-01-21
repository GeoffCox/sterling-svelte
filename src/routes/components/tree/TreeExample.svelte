<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Tree from '$lib/containers/Tree.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import { treeOfLife } from '../../_sampleData/treeOfLife';

  let exampleRef: any;

  const nodes = treeOfLife;
  let label = 'COUNTRIES';
  let selectedIndex = 0;
  let selectedItem: any = undefined;
  let disabled = false;
  let horizontal = false;

  let itemExpanded = false;
  let itemSelected = false;
</script>

<Example bind:this={exampleRef}>
  <div class="component" class:horizontal slot="component">
    <Tree {nodes} let:item let:index>
      <div style={`padding-left:calc(${item.level} * 5px)`}>
        {index}
        {item?.item?.name}
      </div>
    </Tree>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={itemExpanded}><span slot="label">itemExpanded</span></Checkbox>
    <Checkbox bind:checked={itemSelected}><span slot="label">itemSelected</span></Checkbox>
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={horizontal}><span slot="label">horizontal</span></Checkbox>
    <Input bind:value={label}>label</Input>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedIndex: {selectedIndex}</div>
    <div>selectedItem: {selectedItem}</div>
  </svelte:fragment>
</Example>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 410px;
    justify-items: stretch;
  }

  .component.horizontal {
    width: 410px;
    height: unset;
    flex-direction: row;
  }
</style>
