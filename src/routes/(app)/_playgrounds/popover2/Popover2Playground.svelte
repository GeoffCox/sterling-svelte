<svelte:options runes={true} />

<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import { POPOVER2_NONANTS } from '$lib/Popover2.constants';
  import Popover2 from '$lib/Popover2.svelte';
  import type { Popover2Nonant } from '$lib/Popover2.types';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import { onMount } from 'svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import Radio from '$lib/Radio.svelte';

  const ANCHOR_NONANTS = ['auto', ...POPOVER2_NONANTS];

  let _class = $state('');
  let anchorOrigin: Popover2Nonant | 'auto' = $state('auto');
  let lightDismiss = $state(false);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let open = $state(false);
  let placement: Popover2Nonant = $state('top-left');
  let text = $state('sterling-svelte');

  let anchorElement = $state<HTMLDivElement | undefined>();
  let toggleButtonElement = $state<HTMLButtonElement | undefined | null>();

  let anchorTo = $state('anchor');

  let code = $derived(
    getPlaygroundCode({
      _class,
      anchorOrigin,
      lightDismiss,
      offsetX,
      offsetY,
      placement,
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
      <div class="anchor" bind:this={anchorElement}>(anchor div)</div>
      <Button id="PopoverToggleButton" popovertarget="PlaygroundPopover">Show/Hide Popover</Button>
      <Popover2
        class={_class}
        id="PlaygroundPopover"
        anchor={anchorTo === 'anchor' ? anchorElement : undefined}
        invoker={anchorTo === 'invoker' ? toggleButtonElement : undefined}
        {anchorOrigin}
        {lightDismiss}
        {offsetX}
        {offsetY}
        bind:open
        {placement}
      >
        <div class="popover-text">{text}</div>
      </Popover2>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={open} disabled={anchorTo === 'popovertarget'}>open</Checkbox>
    <Checkbox bind:checked={lightDismiss}>lightDismiss</Checkbox>
    <Label text="placement">
      <Select bind:selectedValue={placement}>
        {#each POPOVER2_NONANTS as placementItem (placementItem)}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="anchorOrigin">
      <Select bind:selectedValue={anchorOrigin}>
        {#each ANCHOR_NONANTS as anchorOriginItem (anchorOriginItem)}
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
          bind:value={offsetX}
        />
        <div>{offsetX}</div>
      </div>
      <Label class="slider-label" text="verticalOffset" for="VerticalOffsetSlider" />
      <div class="slider">
        <Slider id="VerticalOffsetSlider" min={-100} max={100} precision={0} bind:value={offsetY} />
        <div>{offsetY}</div>
      </div>
    </div>
    <VariantInput bind:class={_class} sterlingClasses={['callout']} />
  {/snippet}
  {#snippet tweaks()}
    <Label class="vertical" text="Anchor to">
      <div class="anchor-radios">
        <Radio name="anchorTo" bind:group={anchorTo} value="anchor">Anchor div (via anchor)</Radio>
        <Radio name="anchorTo" bind:group={anchorTo} value="invoker"
          >Toggle button (via invoker)</Radio
        >
        <Radio name="anchorTo" bind:group={anchorTo} value="popovertarget"
          >Toggle button (via popovertarget)</Radio
        >
      </div>
    </Label>
    <Label text="popover (text)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<style>
  .container {
    overflow: none;
    display: grid;
    grid-template-rows: auto auto 1fr;
    justify-items: center;
    row-gap: 1em;
  }

  .anchor {
    margin: 100px;
    padding: 1em;
    background-color: var(--stsv-common__background-color--secondary);
    width: 300px;
    height: 150px;
    display: grid;
    place-items: center;
    align-items: center;
  }

  .popover-text {
    color: var(--stsv-common__color);
    padding: 0.25em;
    height: fit-content;
    width: 150px;
    justify-items: center;
    align-items: center;
    text-align: center;
  }

  :global(.sterling-popover-2:not(.callout) .popover-text) {
    background-color: var(--stsv-common__background-color);
    border: 1px solid var(--stsv-common__border-color);
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

  .anchor-radios {
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
  }
</style>
