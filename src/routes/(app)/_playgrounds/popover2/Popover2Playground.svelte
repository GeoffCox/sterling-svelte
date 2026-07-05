<svelte:options runes={true} />

<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { POPOVER2_ANCHOR_ORIGINS, POPOVER2_PLACEMENTS } from '$lib/Popover2.constants';
  import Popover2 from '$lib/Popover2.svelte';
  import type { Popover2AnchorOrigin, Popover2Placement } from '$lib/Popover2.types';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import { onMount } from 'svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let horizontalOffset = $state(0);
  let verticalOffset = $state(0);
  let open = $state(false);
  let lightDismiss = $state(true);
  let placement: Popover2Placement = $state('top-left');
  let anchorOrigin: Popover2AnchorOrigin = $state('auto');
  let anchorToInvoker = $state(false);
  let text = $state('sterling-svelte');

  let toggleButtonElement = $state<HTMLButtonElement | undefined | null>();

  let code = $derived(
    getPlaygroundCode({
      _class,
      lightDismiss,
      placement,
      anchorOrigin,
      horizontalOffset: horizontalOffset,
      verticalOffset: verticalOffset,
      text
    })
  );

  onMount(() => {
    toggleButtonElement = document.querySelector('#PopoverToggleButton');
  });
</script>

<Playground {code}>
  {#snippet component()}
    <div>
      <div class="reference">The reference anchor for positioning the popover.</div>
      <Button id="PopoverToggleButton" popovertarget="PlaygroundPopover">Toggle</Button>
      <Popover2
        id="PlaygroundPopover"
        bind:open
        {placement}
        {anchorOrigin}
        {lightDismiss}
        {horizontalOffset}
        {verticalOffset}
        anchorCssName={anchorToInvoker ? undefined : '--playground-popover-anchor'}
        invokerElement={anchorToInvoker ? toggleButtonElement : undefined}
        class={_class}
      >
        <div class="popover-text">{text}</div>
      </Popover2>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={open}>open</Checkbox>
    <Checkbox bind:checked={lightDismiss}>lightDismiss</Checkbox>
    <Label text="placement">
      <Select bind:selectedValue={placement}>
        {#each POPOVER2_PLACEMENTS as placementItem (placementItem)}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="anchorOrigin">
      <Select bind:selectedValue={anchorOrigin}>
        {#each POPOVER2_ANCHOR_ORIGINS as anchorOriginItem (anchorOriginItem)}
          <ListItem value={anchorOriginItem}>{anchorOriginItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label class="slider-label" text="horizontalOffset">
      <div class="slider">
        <Slider min={-100} max={100} precision={0} bind:value={horizontalOffset} />
        <div>{horizontalOffset}</div>
      </div>
    </Label>
    <Label class="slider-label" text="verticalOffset">
      <div class="slider">
        <Slider min={-100} max={100} precision={0} bind:value={verticalOffset} />
        <div>{verticalOffset}</div>
      </div>
    </Label>
    <VariantInput bind:class={_class} sterlingClasses={['callout']} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={anchorToInvoker}>Anchor to invoker (toggle button)</Checkbox>
    <Label text="popover (text)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<style>
  .reference {
    padding: 1em;
    background-color: var(--stsv-common__background-color--secondary);
    width: 300px;
    height: 150px;
    display: grid;
    place-items: center;
    align-items: center;
    margin: 2em;
    anchor-name: --playground-popover-anchor;
  }

  .popover-text {
    color: var(--stsv-common__color);
    padding: 0.25em;
    height: fit-content;
  }

  :global(.sterling-popover-2:not(.callout) .popover-text) {
    background-color: var(--stsv-common__background-color);
    border-color: var(--stsv-common__border-color);
    border-style: dashed;
    border-width: var(--stsv-common__border-width);
    color: var(--stsv-common__color);
  }

  :global(.sterling-label.slider-label) {
    align-items: start;
  }

  .slider {
    display: grid;
    grid-template-rows: auto auto;
    justify-items: center;
    font-size: 0.8em;
  }

  .slider :global(.sterling-slider) {
    width: 200px;
  }
</style>
