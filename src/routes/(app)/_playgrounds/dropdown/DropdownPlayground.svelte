<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Dropdown from '$lib/Dropdown.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import Switch from '$lib/Switch.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import AnimatedProgress from './AnimatedProgress.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null | undefined = $state(false);
  let open: boolean | null | undefined = $state(false);
  let stayOpenOnClickAway: boolean | null | undefined = $state(false);
  let _class = $state('');

  let progress = $state(50);
  let animate = $state(false);
  let reverse = $state(false);
  let speed = $state(75);

  let code = $derived(getPlaygroundCode({ disabled, stayOpenOnClickAway, _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <Dropdown
      bind:open
      {disabled}
      {stayOpenOnClickAway}
      class={_class}
      onOpen={(value) => console.log(`open: ${value}`)}
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
      </div></Dropdown
    >
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={stayOpenOnClickAway}>stayOpenOnClickAway</Checkbox>
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
