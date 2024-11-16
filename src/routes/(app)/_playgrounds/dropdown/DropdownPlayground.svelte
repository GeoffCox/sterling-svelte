<svelte:options runes={true} />

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

  let disabled: boolean | null | undefined = $state(false);
  let open: boolean | null | undefined = $state(false);
  let stayOpenOnClickAway: boolean | null | undefined = $state(false);
  let variant = $state('');

  let progress = $state(50);
  let animate = $state(false);
  let reverse = $state(false);
  let speed = $state(75);

  let code = $derived(getPlaygroundCode({ disabled, open, stayOpenOnClickAway, variant }));
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Dropdown
      bind:open
      {disabled}
      {stayOpenOnClickAway}
      class={variant}
      onOpen={(value) => console.log(`open: ${value}`)}
    >
      {#snippet valueSnippet()}
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
      </div></Dropdown
    >
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Checkbox bind:checked={stayOpenOnClickAway}>stayOpenOnClickAway</Checkbox>
    <VariantInput bind:class={variant} availableVariants={['colorful']} />
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
