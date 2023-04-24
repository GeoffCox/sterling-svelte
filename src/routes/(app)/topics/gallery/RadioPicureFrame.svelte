<script lang="ts">
  import Radio from '$lib/Radio.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Radio">
  <div class="layout">
    <Radio name="radio" value="1">Item 1</Radio>
    <Radio checked name="radio" value="2">Item 2</Radio>
    <Radio name="radio" value="3">Item 3</Radio>
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
