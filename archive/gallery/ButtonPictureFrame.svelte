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
      <Button variant="capsule">Capsule</Button>
      <Button variant="circular">Circular</Button>
      <Button variant="square">Square</Button>
    </div>
    <div class="variants">
      <Button variant="tool">Tool</Button>
      <Button variant="secondary">Secondary</Button>
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
    align-items: center;
  }

  .shapes,
  .variants {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    row-gap: 1em;
  }
</style>
