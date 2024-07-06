<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';

  import Playground from '../Playground.svelte';

  import Dropdown from '$lib/Dropdown.svelte';
  import Switch from '$lib/Switch.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import AnimatedProgress from './AnimatedProgress.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled = false;
  let open = false;
  let stayOpenOnClickAway = false;
  let variant = '';

  let progress = 50;
  let animate = false;
  let reverse = false;
  let speed = 75;

  $: code = getPlaygroundCode({ disabled, open, stayOpenOnClickAway, variant });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Dropdown
      bind:open
      {disabled}
      {stayOpenOnClickAway}
      {variant}
      on:open={(ev) => console.log(`open: ${ev.detail.open}`)}
    >
      <div class="value" slot="value">
        <AnimatedProgress value={progress} {animate} {reverse} {speed} />
      </div>
      <div class="popup">
        <div class="settings">
          <Switch bind:checked={animate} onText="Animate" />
          <Switch bind:checked={reverse} onText="Reverse" />
          <Label text={`Speed: ${speed}`}>
            <Slider bind:value={speed} precision={0} />
          </Label>
        </div>
      </div></Dropdown
    >
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Checkbox bind:checked={stayOpenOnClickAway}>stayOpenOnClickAway</Checkbox>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
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
    min-width: 250px;
    padding: 1em;
    row-gap: 1em;
  }
</style>
