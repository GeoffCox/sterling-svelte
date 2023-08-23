<script>
  import Slider from '$lib/Slider.svelte';
  import AutoModeIcon from '../AutoModeIcon.svelte';
  import DarkModeIcon from '../DarkModeIcon.svelte';
  import LightModeIcon from '../LightModeIcon.svelte';

  export let mode = 'auto';

  let value = mode === 'auto' ? 1 : mode === 'light' ? 0 : 2;

  $: {
    mode = value === 1 ? 'auto' : value === 0 ? 'light ' : 'dark';
  }
</script>

<div class="mode-select">
  <div class="icon light"><LightModeIcon width="1em" height="1em" /></div>
  <div class="icon auto"><AutoModeIcon width="1em" height="1em" /></div>
  <div class="icon dark"><DarkModeIcon width="1em" height="1em" /></div>
  <div class="slider">
    <Slider min={0} max={2} step={1} precision={0} bind:value />
  </div>
</div>

<style>
  .mode-select {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'light auto dark' 'slider slider slider';
    align-items: center;
    justify-items: center;
  }

  .light {
    grid-area: light;
    padding-right: 3em;
    color: goldenrod;
  }

  .auto {
    grid-area: auto;
  }

  .dark {
    grid-area: dark;
    padding-left: 3em;
    color: steelblue;
  }

  .slider {
    grid-area: slider;
    justify-self: stretch;
  }
</style>
