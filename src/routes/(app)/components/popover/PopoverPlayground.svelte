<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Popover from '$lib/Popover.svelte';
  import type { PopoverPlacement } from '$lib/Popover.types';
  import { POPOVER_PLACEMENTS } from '$lib/Popover.constants';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let crossAxisOffset = 0;
  let mainAxisOffset = 0;
  let open = true;
  let placement: PopoverPlacement = 'top-start';
  let popoverText = 'sterling-svelte';
  let reference: HTMLDivElement;
  let variant = '';
</script>

<Playground noEvents>
  <div slot="component">
    <div class="reference" bind:this={reference}>
      The reference anchor for positioning the popover.
    </div>
    <Popover bind:open {reference} {mainAxisOffset} {crossAxisOffset} {placement} {variant}>
      <div class="popover-text">{popoverText}</div>
    </Popover>
  </div>
  <svelte:fragment slot="props">
    <Label text="crossAxisOffset: {crossAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={crossAxisOffset} />
    </Label>
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
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="popover (text)">
      <Input bind:value={popoverText} />
    </Label>
  </svelte:fragment>
</Playground>

<style>
  .popover-text {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-input__border-color);
    border-style: solid;
    border-width: 2px;
    color: var(--stsv-common__color);
    padding: 1em;
  }

  .reference {
    padding: 1em;
    background-color: var(--stsv-common__background-color--secondary);
    width: 300px;
    height: 150px;
    display: grid;
    place-items: center;
    align-items: center;
  }
</style>
