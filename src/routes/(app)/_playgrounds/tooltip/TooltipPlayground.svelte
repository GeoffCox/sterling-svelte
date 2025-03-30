<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { POPOVER_PLACEMENTS } from '$lib/Popover.constants';
  import type { PopoverPlacement } from '$lib/Popover.types';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Tooltip from '$lib/Tooltip.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let crossAxisOffset = $state(0);
  let disabled = $state(false);
  let hoverDelayMilliseconds = $state(1000);
  let mainAxisOffset = $state(0);
  let open = $state(true);
  let placement: PopoverPlacement = $state('top-start');
  let text = $state('sterling-svelte');

  let code = $derived(
    getPlaygroundCode({
      _class,
      crossAxisOffset,
      disabled,
      hoverDelayMilliseconds,
      mainAxisOffset,
      open,
      placement,
      text
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div>
      <Tooltip
        class={_class}
        {crossAxisOffset}
        {disabled}
        {hoverDelayMilliseconds}
        {mainAxisOffset}
        bind:open
        {placement}
      >
        <div class="reference">The reference anchor for positioning the Tooltip.</div>
        {#snippet tip()}
          <div class="tip-text">{text}</div>
        {/snippet}
      </Tooltip>
    </div>
  {/snippet}
  {#snippet props()}
    <Label text="crossAxisOffset">
      <div class="slider">
        <Slider min={-25} max={25} precision={0} bind:value={crossAxisOffset} />
        <div>{crossAxisOffset}</div>
      </div>
    </Label>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text={`hoverDelayMilliseconds`}>
      <div class="slider">
        <Slider bind:value={hoverDelayMilliseconds} min={0} max={3000} precision={0} />
        <div>{hoverDelayMilliseconds}</div>
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

    <VariantInput labelText="class" bind:class={_class} />
  {/snippet}
  {#snippet snippets()}
    <Label text="children">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<style>
  .tip-text {
    padding: 0.75em 1.5em;
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
    text-align: center;
    margin: 2em;
  }
</style>
