<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  import TreeItemDisplay from '$lib/TreeItemDisplay.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;

  let label = 'sterling-svelte';
  let disabled = false;
  let expanded = false;
  let hasChildren = true;
  let selected = false;
  let depth = 0;

  let itemDepth = depth;
  let allowDepthChange = false;

  $: {
    if (allowDepthChange) {
      itemDepth = depth;
    }
    allowDepthChange = false;
  }
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeItemDisplay
      value="sterling"
      depth={itemDepth}
      {disabled}
      {expanded}
      {hasChildren}
      {selected}
    >
      {label}
    </TreeItemDisplay>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={expanded}>expanded</Checkbox>
    <Checkbox bind:checked={hasChildren}>hasChildren</Checkbox>
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Field label="depth: {depth}">
      <div class="slider">
        <Slider maxValue="20" bind:value={depth} on:mouseup={() => (allowDepthChange = true)} />
      </div>
    </Field>
    <Field label="default slot">
      <Input bind:value={label} composed />
    </Field>
  </svelte:fragment>
</Playground>

<style>
  .slider {
    width: 350px;
    padding: 0.5em;
  }
</style>
