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

  const ANCHOR_MODES = ['reference', 'popovertarget', 'invoker'];

  const ANCHOR_MODE_NAMES = [
    'Reference element (anchorElement)',
    'Toggle button (popovertarget)',
    'Toggle (invokerElement)'
  ];

  let _class = $state('');
  let horizontalOffset = $state(0);
  let verticalOffset = $state(0);
  let open = $state(false);
  let lightDismiss = $state(true);
  let placement: Popover2Placement = $state('top-left');
  let anchorOrigin: Popover2AnchorOrigin = $state('auto');
  let anchorMode = $state('reference');
  let anchorViaPopoverTarget = $state(false);
  let text = $state('sterling-svelte');

  let referenceElement = $state<HTMLDivElement | undefined>();
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
    <div class="container">
      <div bind:this={referenceElement} class="reference">
        The reference anchor for positioning the popover.
      </div>
      <Button id="PopoverToggleButton" popovertarget="PlaygroundPopover">Toggle</Button>
      <Popover2
        id="PlaygroundPopover"
        anchorElement={anchorMode === 'reference' ? referenceElement : undefined}
        bind:open
        {placement}
        {anchorOrigin}
        {lightDismiss}
        {horizontalOffset}
        {verticalOffset}
        invokerElement={anchorMode === 'invoker' ? toggleButtonElement : undefined}
        class={_class}
      >
        <!-- anchorCssName={anchorToInvoker ? undefined : '--playground-popover-anchor'} -->
        <div class="popover-text">{text}</div>
      </Popover2>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={open} disabled={anchorViaPopoverTarget}>open</Checkbox>
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
    <div class="offset-sliders">
      <Label class="slider-label" text="horizontalOffset" for="HorizontalOffsetSlider" />
      <div class="slider">
        <Slider
          id="HorizontalOffsetSlider"
          min={-100}
          max={100}
          precision={0}
          bind:value={horizontalOffset}
        />
        <div>{horizontalOffset}</div>
      </div>
      <Label class="slider-label" text="verticalOffset" for="VerticalOffsetSlider" />
      <div class="slider">
        <Slider
          id="VerticalOffsetSlider"
          min={-100}
          max={100}
          precision={0}
          bind:value={verticalOffset}
        />
        <div>{verticalOffset}</div>
      </div>
    </div>
    <VariantInput bind:class={_class} sterlingClasses={['callout', 'fade']} />
  {/snippet}
  {#snippet tweaks()}
    <Label text="Anchor To">
      <Select bind:selectedValue={anchorMode}>
        {#snippet value()}
          {ANCHOR_MODE_NAMES[ANCHOR_MODES.indexOf(anchorMode)]}
        {/snippet}
        {#each ANCHOR_MODES as anchorModeItem, index (anchorModeItem)}
          <ListItem value={anchorModeItem}>{ANCHOR_MODE_NAMES[index]}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="popover (text)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<style>
  .container {
    padding: 100px;
  }

  .reference {
    padding: 1em;
    background-color: var(--stsv-common__background-color--secondary);
    width: 300px;
    height: 150px;
    min-width: 300px;
    min-height: 150px;
    display: grid;
    place-items: center;
    align-items: center;
    /* anchor-name: --playground-popover-anchor; */
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

  .offset-sliders {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    align-items: start;
    justify-items: start;
    row-gap: 1em;
  }

  .offset-sliders :global(.slider-label) {
    margin-top: 0.25em;
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
