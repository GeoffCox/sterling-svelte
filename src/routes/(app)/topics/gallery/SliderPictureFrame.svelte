<script lang="ts">
  import Slider from '$lib/Slider.svelte';
  import PictureFrame from './PictureFrame.svelte';

  export let value = 35;
  export let verticalValue = 35;
</script>

<PictureFrame name="Slider">
  <div class="layout">
    <Slider bind:value />
    <Slider bind:value={verticalValue} vertical />
  </div>
</PictureFrame>

<style>
  .layout {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    justify-items: center;
    align-items: stretch;
    column-gap: 1em;
    width: 200px;
    height: 100px;
  }
  :global(.layout > :first-child) {
    justify-self: stretch;
    align-self: center;
  }
</style>
