<svelte:options runes={true} />

<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Slider from '$lib/Slider.svelte';
  import AutoModeIcon from './icons/AutoModeIcon.svelte';
  import DarkModeIcon from './icons/DarkModeIcon.svelte';
  import LightModeIcon from './icons/LightModeIcon.svelte';

  type Props = {
    mode: 'auto' | 'light' | 'dark';
  };

  let { mode = $bindable('auto') }: Props = $props();

  let value = $state(mode === 'auto' ? 1 : mode === 'light' ? 0 : 2);

  $effect(() => {
    mode = value === 1 ? 'auto' : value === 0 ? 'light' : 'dark';
  });
</script>

<div class="mode-select">
  <div class="icon light">
    <Button class="square tool" onclick={() => (value = 0)}>
      <LightModeIcon width="1em" height="1em" fill="hsl(39, 100%, 45%)" />
    </Button>
  </div>
  <div class="icon auto">
    <Button class="square tool" onclick={() => (value = 1)}>
      <AutoModeIcon width="1em" height="1em" />
    </Button>
  </div>
  <div class="icon dark">
    <Button class="square tool" onclick={() => (value = 2)}>
      <DarkModeIcon width="1em" height="1em" fill="hsl(198, 100%, 40%)" />
    </Button>
  </div>

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
  }

  /* .light :global(svg) {
    grid-area: light;
    color: hsl(39, 100%, 45%);
  } */

  .auto {
    grid-area: auto;
  }

  .dark {
    grid-area: dark;
  }

  /* .dark :global(svg) {
    color: hsl(198, 100%, 40%);
  } */

  .slider {
    grid-area: slider;
    justify-self: stretch;
    margin: 0 0.85em;
  }
</style>
