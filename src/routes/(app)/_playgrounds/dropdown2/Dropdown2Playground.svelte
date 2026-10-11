<svelte:options runes={true} />

<script lang="ts">
  import {
    Dropdown2,
    ListItem,
    POPOVER2_NONANTS,
    Select,
    type Popover2FlipAxis,
    type Popover2Nonant
  } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import Switch from '$lib/Switch.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import AnimatedProgress from './AnimatedProgress.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  const ANCHOR_ORIGIN_NONANTS = POPOVER2_NONANTS;
  const PLACEMENT_NONANTS = ['auto', ...POPOVER2_NONANTS];

  let _class = $state('');

  let allowFlip = $state<Popover2FlipAxis>('both');
  let anchorOrigin: Popover2Nonant = $state('bottom-left');
  let disabled: boolean | null | undefined = $state(false);
  let lightDismiss = $state(true);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let open: boolean | null | undefined = $state(false);
  let placement: 'auto' | Popover2Nonant = $state('bottom-right');

  let progress = $state(50);
  let animate = $state(false);
  let reverse = $state(false);
  let speed = $state(75);

  let code = $derived(getPlaygroundCode({ disabled, lightDismiss, _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <Dropdown2
      {allowFlip}
      {anchorOrigin}
      {disabled}
      {lightDismiss}
      bind:open
      {placement}
      class={_class}
      onOpen={(value) => console.log(`<Dropdown> onOpen value:${value}`)}
    >
      {#snippet value()}
        <div class="value">
          <AnimatedProgress value={progress} {animate} {reverse} {speed} />
        </div>
      {/snippet}
      <div class="popup">
        <div class="settings">
          <Switch bind:checked={animate} onLabel="Animate" />
          <Switch bind:checked={reverse} onLabel="Reverse" />
          <Label text={`Speed: ${speed}`}>
            <Slider bind:value={speed} precision={0} />
          </Label>
        </div>
      </div></Dropdown2
    >
  {/snippet}
  {#snippet props()}
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
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={lightDismiss}>lightDismiss</Checkbox>
    <VariantInput bind:class={_class} />
  {/snippet}
</Playground>

<style>
  .value {
    box-sizing: border-box;
    width: 250px;
    height: 2em;
    padding: 0.5em;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: stretch;
    align-items: center;
  }

  .settings {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-width: 300px;
    padding: 1em;
    row-gap: 1em;
  }
</style>
