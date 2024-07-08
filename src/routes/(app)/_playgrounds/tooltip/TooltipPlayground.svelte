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
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let crossAxisOffset = 0;
  let disabled = false;
  let hoverDelayMilliseconds = 1000;
  let mainAxisOffset = 0;
  let open = true;
  let placement: PopoverPlacement = 'top-start';
  let text = 'sterling-svelte';
  let variant = '';

  $: code = getPlaygroundCode({
    crossAxisOffset,
    disabled,
    hoverDelayMilliseconds,
    mainAxisOffset,
    open,
    placement,
    text,
    variant
  });
</script>

<Playground {code}>
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
      <div class="reference">The reference anchor for positioning the Tooltip.</div>
      <div class="tip-text" slot="tip">{text}</div>
    </Tooltip>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <div class="delay-slider">
      <Label text={`hoverDelayMilliseconds: ${hoverDelayMilliseconds}ms`}>
        <Slider bind:value={hoverDelayMilliseconds} min={0} max={3000} precision={0} />
      </Label>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="crossAxisOffset (Callout): {crossAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={crossAxisOffset} />
    </Label>
    <Label text="mainAxisOffset (Callout): {mainAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={mainAxisOffset} />
    </Label>
    <Checkbox bind:checked={open}>open (Callout)</Checkbox>
    <Label text="placement (Callout)">
      <Select bind:selectedValue={placement}>
        {#each POPOVER_PLACEMENTS as placementItem}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="tip (Callout)">
      <Input bind:value={text} />
    </Label>
    <VariantInput labelText="variant (Callout)" bind:variant availableVariants={['colorful']} />
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
