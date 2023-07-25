<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import type { PopoverPlacement } from '$lib/Popover.types';
  import { POPOVER_PLACEMENTS } from '$lib/Popover.constants';
  import Callout from '$lib/Callout.svelte';

  let colorful = false;
  let crossAxisOffset = 0;
  let mainAxisOffset = 0;
  let open = true;
  let placement: PopoverPlacement = 'top-start';
  let reference: HTMLDivElement;
  let calloutText: string = 'sterling-svelte';
</script>

<Playground noEvents>
  <div slot="component">
    <div class="reference" bind:this={reference}>
      The reference anchor for positioning the popover.
    </div>
    <Callout {colorful} {crossAxisOffset} {mainAxisOffset} bind:open {placement} {reference}>
      <div class="callout-text">{calloutText}</div>
    </Callout>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Label text="crossAxisOffset {crossAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={crossAxisOffset} />
    </Label>
    <Label text="mainAxisOffset: {mainAxisOffset}">
      <Slider min={-25} max={25} precision={0} bind:value={mainAxisOffset} />
    </Label>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Label text="placement">
      <Select bind:selectedValue={placement} composed>
        {#each POPOVER_PLACEMENTS as placementItem}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="callout (text)">
      <Input bind:value={calloutText} composed />
    </Label>
  </svelte:fragment>
</Playground>

<style>
  .callout-text {
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
    text-align: center;
  }
</style>
