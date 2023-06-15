<script lang="ts">
  import Switch from '$lib/Switch.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Switch">
  <div class="layout">
    <Switch onText="ON" offText="OFF" />
    <Switch onText="ON" offText="OFF" vertical />
  </div>
</PictureFrame>

<style>
  .layout {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    align-items: center;
    column-gap: 0.5em;
  }
</style>
