<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import Slider from '$lib/inputs/Slider.svelte';

  import TreeNodeItem from '$lib/containers/TreeNodeItem.svelte';

  let exampleRef: any;

  let label = 'sterling-svelte';
  let disabled = false;
  let expanded = false;
  let hasChildren = true;
  let selected = false;
  let depth = 0;
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeNodeItem {depth} {disabled} {expanded} {hasChildren} {selected}>
      <svelte:fragment>{label}</svelte:fragment>
    </TreeNodeItem>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={expanded}><span slot="label">expanded</span></Checkbox>
    <Checkbox bind:checked={hasChildren}><span slot="label">hasChildren</span></Checkbox>
    <Checkbox bind:checked={selected}><span slot="label">selected</span></Checkbox>
    <div class="slider">
      <Slider maxValue="20" bind:value={depth}><span slot="label">depth</span></Slider>
    </div>
    <Input bind:value={label}><span slot="label">label slot</span></Input>
  </svelte:fragment>
</Example>

<style>
  .slider {
    width: 350px;
  }
</style>
