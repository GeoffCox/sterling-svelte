<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  import TreeItemDisplay from '$lib/TreeItemDisplay.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;

  let label = 'sterling-svelte';
  let disabled = false;
  let expanded = false;
  let hasChildren = true;
  let selected = false;
  let depth = 0;
  let variant: string = '';
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <TreeItemDisplay
      value="tree-item-display"
      {depth}
      {disabled}
      {expanded}
      {hasChildren}
      {selected}
      {variant}
    >
      {label}
    </TreeItemDisplay>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={expanded}>expanded</Checkbox>
    <Checkbox bind:checked={hasChildren}>hasChildren</Checkbox>
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Label text="depth: {depth}">
      <div class="slider">
        <Slider max={20} step={1} precision={0} bind:value={depth} />
      </div>
    </Label>
    <Label text="default slot">
      <Input bind:value={label} />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
</Playground>

<style>
  .slider {
    width: 350px;
    padding: 0.5em;
  }
</style>
