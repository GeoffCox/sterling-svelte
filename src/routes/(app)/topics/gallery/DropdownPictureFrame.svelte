<script lang="ts">
  import Dropdown from '$lib/Dropdown.svelte';
  import Slider from '$lib/Slider.svelte';
  import PictureFrame from './PictureFrame.svelte';

  let red: number = 0;
  let green: number = 0;
  let blue: number = 0;

  $: value = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue
    .toString(16)
    .padStart(2, '0')}`;
</script>

<PictureFrame name="Dropdown">
  <div class="layout">
    <Dropdown stayOpenOnClickAway>
      <div class="value" slot="value">{value}</div>
      <div class="popup">
        <div class="color-block" style={`background-color:${value};`} />
        <span>R</span>
        <Slider min={0} max={255} bind:value={red} />
        <span>G</span>
        <Slider min={0} max={255} bind:value={green} />
        <span>B</span>
        <Slider min={0} max={255} bind:value={blue} />
      </div>
    </Dropdown>
  </div>
</PictureFrame>

<style>
  .layout {
    width: 12ch;
  }

  .value {
    padding: 0.25em;
  }

  .color-block {
    grid-column: 1 / span 2;
    justify-self: center;
    width: 100%;
    height: 20px;
    border: 1px solid var(--stsv-Common__border-color);
  }

  .popup {
    min-width: 200px;
    height: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    align-items: center;
    column-gap: 0.25em;
  }
</style>
