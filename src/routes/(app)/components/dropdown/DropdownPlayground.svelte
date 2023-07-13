<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';

  import Playground from '../Playground.svelte';

  import Dropdown from '$lib/Dropdown.svelte';
  import Switch from '$lib/Switch.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import AnimatedProgress from './AnimatedProgress.svelte';

  let exampleRef: any;

  let colorful = false;
  let composed = false;
  let disabled = false;
  let open = false;
  let stayOpenOnClickAway = false;

  let progress = 50;
  let animate = false;
  let reverse = false;
  let speed = 75;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Dropdown
      bind:open
      {colorful}
      {composed}
      {disabled}
      {stayOpenOnClickAway}
      on:open={(ev) => exampleRef.recordEvent(`open: ${ev.detail.open}`)}
    >
      <div class="value" slot="value">
        <AnimatedProgress value={progress} {animate} {reverse} {speed} />
      </div>
      <div class="popup">
        <div class="settings">
          <Switch bind:checked={animate} onText="Animate" />
          <Switch bind:checked={reverse} onText="Reverse" />
          <Label text={`Speed: ${speed}`}>
            <Slider bind:value={speed} composed />
          </Label>
        </div>
      </div></Dropdown
    >
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={composed}>composed</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Checkbox bind:checked={stayOpenOnClickAway}>stayOpenOnClickAway</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>open: {open}</div>
  </svelte:fragment>
</Playground>

<style>
  .value {
    width: 250px;
    height: 2em;
    padding: 0.5em;
    display: grid;
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
