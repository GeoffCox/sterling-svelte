<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Checkbox">
  <div class="layout">
    <Checkbox>Item 1</Checkbox>
    <Checkbox>Item 2</Checkbox>
    <Checkbox>Item 3</Checkbox>
  </div>
</PictureFrame>

<style>
  .layout {
    align-content: flex-start;
    align-items: center;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(auto);
    row-gap: 0.5em;
  }
</style>
