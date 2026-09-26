<svelte:options runes={true} />

<script lang="ts">
  import { POPOVER2_NONANTS, popoverHover, type Popover2Nonant } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Popover2 from '$lib/Popover2.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  const ANCHOR_ORIGIN_NONANTS = POPOVER2_NONANTS;
  const PLACEMENT_NONANTS = ['auto', ...POPOVER2_NONANTS];

  let _class = $state('callout');
  let anchorOrigin: Popover2Nonant = $state('top-left');
  let disabled = $state(false);
  let delayMilliseconds = $state(1000);
  let placement: 'auto' | Popover2Nonant = $state('auto');
  let text = $state('sterling-svelte');

  let code = $derived(
    getPlaygroundCode({
      _class,
      disabled,
      hoverDelayMilliseconds: delayMilliseconds,
      placement,
      text
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div class="container">
      <div
        class="hover-anchor"
        use:popoverHover={{
          popoverTarget: 'TooltipPopover',
          delayMilliseconds: delayMilliseconds
        }}
      >
        Hover over me
      </div>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label class="slider-label" text={`hoverDelayMilliseconds`}>
      <div class="slider">
        <Slider bind:value={delayMilliseconds} min={0} max={3000} precision={0} />
        <div>{delayMilliseconds}</div>
      </div>
    </Label>
    <Label text="anchorOrigin">
      <Select bind:selectedValue={anchorOrigin}>
        {#each ANCHOR_ORIGIN_NONANTS as anchorOriginItem (anchorOriginItem)}
          <ListItem value={anchorOriginItem}>{anchorOriginItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="placement">
      <Select bind:selectedValue={placement}>
        {#each PLACEMENT_NONANTS as placementItem (placementItem)}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>
    <VariantInput labelText="class" bind:class={_class} />
  {/snippet}
  {#snippet tweaks()}
    <Label text="popover (text)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<Popover2 id="TooltipPopover" class={_class} {anchorOrigin} {placement}>
  <div class="tip-text">{text}</div>
</Popover2>

<style>
  .container {
    padding: 2em;
  }

  .tip-text {
    padding: 0.75em 1.5em;
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

  .hover-anchor {
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
