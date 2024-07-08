<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Slider from '$lib/Slider.svelte';

  import TreeItemDisplay from '$lib/TreeItemDisplay.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let depth = 0;
  let disabled = false;
  let expanded = false;
  let hasChildren = true;
  let selected = false;
  let text = 'sterling-svelte';
  let value = 'item';
  let variant: string = '';

  $: code = getPlaygroundCode({
    depth,
    disabled,
    expanded,
    hasChildren,
    selected,
    text,
    value,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <TreeItemDisplay {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}>
      {text}
    </TreeItemDisplay>
  </svelte:fragment>
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
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  </svelte:fragment>
</Playground>

<style>
  .slider {
    width: 200px;
    padding: 0.5em;
  }
</style>
