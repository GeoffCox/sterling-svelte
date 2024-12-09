<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Playground from '../Playground.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import type { PopoverPlacement } from '$lib/Popover.types';
  import { POPOVER_PLACEMENTS } from '$lib/Popover.constants';
  import Callout from '$lib/Callout.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let crossAxisOffset = $state(0);
  let mainAxisOffset = $state(0);
  let open: boolean | undefined | null = $state(true);
  let placement: PopoverPlacement = $state('top-start');
  let reference: HTMLElement | undefined = $state();
  let text: string = $state('sterling-svelte');
  let _class = $state('');

  let code = $derived(
    getPlaygroundCode({
      crossAxisOffset,
      mainAxisOffset,
      open: open || undefined,
      placement,
      text,
      _class
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div>
      <div class="reference" bind:this={reference}>
        The reference anchor for positioning the callout.
      </div>
      <Callout class={_class} {crossAxisOffset} {mainAxisOffset} bind:open {placement} {reference}>
        <div class="callout-text">{text}</div>
      </Callout>
    </div>
  {/snippet}
  {#snippet props()}
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
    <VariantInput bind:class={_class} availableVariants={['colorful']} />
  {/snippet}
  {#snippet tweaks()}
    <Label text="callout (text)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
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
    margin: 2em;
  }
</style>
