<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Tooltip from '$lib/Tooltip.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Label from '$lib/Label.svelte';
  import type { PopoverPlacement } from '$lib/Popover.types';
  import { POPOVER_PLACEMENTS } from '$lib/Popover.constants';

  let crossAxisOffset = 0;
  let disabled = false;
  let hoverDelayMilliseconds = 1000;
  let mainAxisOffset = 0;
  let open = true;
  let placement: PopoverPlacement = 'top-start';
  let tipText = 'sterling-svelte';
  let variant = '';
</script>

<Playground noEvents>
  <div slot="component">
    <Tooltip
      {crossAxisOffset}
      {disabled}
      {hoverDelayMilliseconds}
      {mainAxisOffset}
      bind:open
      {placement}
      {variant}
    >
      <div class="reference">Hover over me</div>
      <div class="tip-text" slot="tip">{tipText}</div>
    </Tooltip>
  </div>
  <svelte:fragment slot="props">
    <Label text="crossAxisOffset: {crossAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={crossAxisOffset} />
    </Label>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <div class="delay-slider">
      <Label text={`hoverDelayMilliseconds: ${hoverDelayMilliseconds}ms`}>
        <Slider bind:value={hoverDelayMilliseconds} min={0} max={3000} precision={0} />
      </Label>
    </div>
    <Label text="mainAxisOffset: {mainAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={mainAxisOffset} />
    </Label>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Label text="placement">
      <Select bind:selectedValue={placement}>
        {#each POPOVER_PLACEMENTS as placementItem}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="variant" forwardClick>
      <Input bind:value={variant} />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="tip (text)">
      <Input bind:value={tipText} />
    </Label>
  </svelte:fragment>
</Playground>

<style>
  .delay-slider {
    width: 300px;
  }

  .tip-text {
    padding: 0.75em 1.5em;
  }
</style>
