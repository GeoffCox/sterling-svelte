<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { POPOVER_PLACEMENTS } from '$lib/Popover.constants';
  import Popover from '$lib/Popover.svelte';
  import type { PopoverPlacement } from '$lib/Popover.types';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let crossAxisOffset = $state(0);
  let mainAxisOffset = $state(0);
  let open: boolean | undefined | null = $state(true);
  let placement: PopoverPlacement = $state('top-start');
  let text = $state('sterling-svelte');
  let reference: HTMLDivElement | undefined = $state();
  let _class = $state('');

  let code = $derived(
    getPlaygroundCode({
      _class,
      crossAxisOffset,
      mainAxisOffset,
      placement,
      text
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div>
      <div class="reference" bind:this={reference}>
        The reference anchor for positioning the popover.
      </div>
      <Popover bind:open {reference} {mainAxisOffset} {crossAxisOffset} {placement} class={_class}>
        <div class="popover-text">{text}</div>
      </Popover>
    </div>
  {/snippet}
  {#snippet props()}
    <Label text="crossAxisOffset">
      <div class="slider">
        <Slider min={-25} max={25} precision={0} bind:value={crossAxisOffset} />
        <div>{crossAxisOffset}</div>
      </div>
    </Label>
    <Label text="mainAxisOffset">
      <div class="slider">
        <Slider min={-25} max={25} precision={0} bind:value={mainAxisOffset} />
        <div>{mainAxisOffset}</div>
      </div>
    </Label>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Label text="placement">
      <Select bind:selectedValue={placement}>
        {#each POPOVER_PLACEMENTS as placementItem}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
  {#snippet tweaks()}
    <Label text="popover (text)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<style>
  .popover-text {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-style: dotted;
    border-width: var(--stsv-common__border-width);
    color: var(--stsv-common__color);
    padding: 1em;
  }

  .slider {
    display: grid;
    grid-template-rows: auto auto;
    justify-items: center;
    font-size: 0.8em;
  }

  .reference {
    padding: 1em;
    background-color: var(--stsv-common__background-color--secondary);
    width: 300px;
    height: 150px;
    display: grid;
    place-items: center;
    align-items: center;
    margin: 2em;
  }
</style>
