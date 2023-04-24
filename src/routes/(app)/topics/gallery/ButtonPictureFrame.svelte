<script lang="ts">
  import Button from '$lib/Button.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Button">
  <div class="layout">
    <div class="default">
      <Button>Button</Button>
    </div>
    <div class="shapes">
      <Button shape="circular">Circular</Button>
      <Button shape="square">Square</Button>
    </div>
    <div class="variants">
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  </div>
</PictureFrame>

<style>
  .layout {
    align-items: flex-start;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    column-gap: 1em;
  }

  .default {
    align-self: center;
  }
  .shapes,
  .variants {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    row-gap: 1em;
  }
</style>
