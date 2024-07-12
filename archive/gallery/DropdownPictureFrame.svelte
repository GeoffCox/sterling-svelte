<script lang="ts">
  import Dropdown from '$lib/Dropdown.svelte';
  import Slider from '$lib/Slider.svelte';
  import PictureFrame from './PictureFrame.svelte';

  let value: number = 0;
</script>

<PictureFrame name="Dropdown">
  <div class="layout">
    <Dropdown>
      <div class="value" slot="value">{value}</div>
      <div class="popup">
        <Slider min={0} max={1000} precision={0} bind:value />
      </div>
    </Dropdown>
  </div>
</PictureFrame>

<style>
  .layout {
    width: 5em;
  }

  .value {
    padding: 0.25em;
  }

  .popup {
    min-width: 200px;
    height: auto;
    display: grid;
    justify-items: stretch;
    align-items: center;
    column-gap: 0.25em;
  }
</style>
