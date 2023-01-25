<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import TreeItem from '$lib/containers/TreeItem.svelte';

  let exampleRef: any;

  let disabled = false;
  let expanded = false;
  let hasChildren = true;
  let selected = false;
  let value = 'This is a Tree Item';
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeItem {disabled} {expanded} {hasChildren} {selected}
      ><div style="padding-top:0.25em">{value}</div></TreeItem
    >
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={expanded}><span slot="label">expanded</span></Checkbox>
    <Checkbox bind:checked={hasChildren}><span slot="label">hasChildren</span></Checkbox>
    <Checkbox bind:checked={selected}><span slot="label">selected</span></Checkbox>
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Input bind:value><span slot="label">value</span>></Input>
  </svelte:fragment>
</Example>
